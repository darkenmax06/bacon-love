import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    settings: { findUnique: vi.fn() },
    closedDate: { findFirst: vi.fn() },
    appointment: { findMany: vi.fn() },
  },
}));

import { prisma } from '../../src/lib/prisma';
const mockPrisma = prisma as any;

// ─── Fixtures ─────────────────────────────────────────────────────────────────

// 2030-12-16 es un Martes (day 2)
const FUTURE_DATE = '2030-12-16';

const mockSettings = {
  id: 'default',
  maxSeatsTotal: 50,
  maxSeatsPerReservation: 10,
  openDays: '["0","1","2","3","4","5","6"]',
  openTimes: '["12:00","13:00","14:00","20:00","21:00","22:00"]',
  daySchedules: null,
  reservationDuration: 120,
  advanceBookingDays: 365,
  adminEmail: '',
  updatedAt: new Date(),
};

function makeURL(date?: string): URL {
  const url = new URL('http://localhost/api/appointments/availability');
  if (date) url.searchParams.set('date', date);
  return url;
}

// ─── GET /api/appointments/availability ──────────────────────────────────────

describe('GET /api/appointments/availability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.settings.findUnique.mockResolvedValue(mockSettings);
    mockPrisma.closedDate.findFirst.mockResolvedValue(null);
    mockPrisma.appointment.findMany.mockResolvedValue([]);
  });

  it('retorna 400 si no se proporciona fecha', async () => {
    const { GET } = await import('../../src/pages/api/appointments/availability');
    const res = await GET({ url: makeURL() } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/requerida/i);
  });

  it('retorna available: true con horarios para un día abierto', async () => {
    const { GET } = await import('../../src/pages/api/appointments/availability');
    const res = await GET({ url: makeURL(FUTURE_DATE) } as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.available).toBe(true);
    expect(Array.isArray(data.availability)).toBe(true);
    expect(data.availability.length).toBeGreaterThan(0);
  });

  it('retorna available: false cuando la fecha está cerrada', async () => {
    const { GET } = await import('../../src/pages/api/appointments/availability');
    mockPrisma.closedDate.findFirst.mockResolvedValue({
      id: 'closed-1',
      date: new Date(FUTURE_DATE),
      reason: 'Feriado Nacional',
    });
    const res = await GET({ url: makeURL(FUTURE_DATE) } as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.available).toBe(false);
    expect(data.message).toMatch(/cerrado/i);
  });

  it('retorna available: false cuando el día está deshabilitado', async () => {
    const { GET } = await import('../../src/pages/api/appointments/availability');
    mockPrisma.settings.findUnique.mockResolvedValue({
      ...mockSettings,
      openDays: '["1","2","3","4","5"]', // Sin domingo ni sábado
      daySchedules: null,
    });
    const res = await GET({ url: makeURL('2030-12-15') } as any); // Domingo = day 0
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.available).toBe(false);
  });

  it('calcula los asientos disponibles correctamente', async () => {
    const { GET } = await import('../../src/pages/api/appointments/availability');
    // 3 reservas de 5 personas en el slot de las 12:00
    mockPrisma.appointment.findMany.mockResolvedValue([
      { time: '12:00', guests: 5, status: 'confirmed' },
      { time: '12:00', guests: 5, status: 'pending' },
      { time: '12:00', guests: 5, status: 'confirmed' },
    ]);
    const res = await GET({ url: makeURL(FUTURE_DATE) } as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    const slot1200 = data.availability.find((s: any) => s.time === '12:00');
    expect(slot1200).toBeDefined();
    expect(slot1200.availableSeats).toBe(35); // 50 - 15
    expect(slot1200.isAvailable).toBe(true);
  });

  it('marca un slot como no disponible cuando no quedan asientos', async () => {
    const { GET } = await import('../../src/pages/api/appointments/availability');
    // maxSeatsTotal=50, llenar 13:00 con 10 reservas de 5 personas (total=50)
    mockPrisma.appointment.findMany.mockResolvedValue(
      Array.from({ length: 10 }, () => ({ time: '13:00', guests: 5, status: 'confirmed' }))
    );
    const res = await GET({ url: makeURL(FUTURE_DATE) } as any);
    const data = await res.json();
    const slot1300 = data.availability.find((s: any) => s.time === '13:00');
    expect(slot1300.availableSeats).toBe(0); // 50 - 50 = 0
    expect(slot1300.isAvailable).toBe(false);
  });

  it('retorna 500 si la configuración no existe', async () => {
    const { GET } = await import('../../src/pages/api/appointments/availability');
    mockPrisma.settings.findUnique.mockResolvedValue(null);
    const res = await GET({ url: makeURL(FUTURE_DATE) } as any);
    expect(res.status).toBe(500);
  });

  it('incluye maxSeatsPerReservation en la respuesta', async () => {
    const { GET } = await import('../../src/pages/api/appointments/availability');
    const res = await GET({ url: makeURL(FUTURE_DATE) } as any);
    const data = await res.json();
    expect(data.maxSeatsPerReservation).toBe(10);
  });
});
