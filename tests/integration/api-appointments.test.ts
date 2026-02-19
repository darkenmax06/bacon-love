import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createToken } from '../../src/lib/auth';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    settings: { findUnique: vi.fn() },
    appointment: { findMany: vi.fn(), create: vi.fn() },
    closedDate: { findFirst: vi.fn() },
  },
}));

vi.mock('../../src/lib/email', () => ({
  sendConfirmationEmail: vi.fn().mockResolvedValue(undefined),
  sendAdminNotification: vi.fn().mockResolvedValue(undefined),
}));

import { prisma } from '../../src/lib/prisma';
const mockPrisma = prisma as any;

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const FUTURE_DATE = '2030-12-15'; // Lunes (day 1)

const mockSettings = {
  id: 'default',
  maxSeatsTotal: 50,
  maxSeatsPerReservation: 10,
  openDays: '["0","1","2","3","4","5","6"]',
  openTimes: '["12:00","13:00","14:00","20:00","21:00","22:00"]',
  daySchedules: null,
  reservationDuration: 120,
  advanceBookingDays: 9999,
  adminEmail: '',
  updatedAt: new Date(),
};

const validBody = {
  name: 'Juan Pérez',
  email: 'juan@example.com',
  phone: '+34666777888',
  date: FUTURE_DATE,
  time: '20:00',
  guests: 2,
};

async function makeAuthCookies() {
  const token = await createToken({ userId: 'admin-1', email: 'admin@test.com' });
  return {
    get: vi.fn((name: string) =>
      name === 'auth_token' ? { value: token } : undefined
    ),
    set: vi.fn(),
    delete: vi.fn(),
  };
}

function makeUnauthCookies() {
  return {
    get: vi.fn().mockReturnValue(undefined),
    set: vi.fn(),
    delete: vi.fn(),
  };
}

// ─── GET /api/appointments ────────────────────────────────────────────────────

describe('GET /api/appointments', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retorna 401 sin autenticación', async () => {
    const { GET } = await import('../../src/pages/api/appointments/index');
    const res = await GET({
      cookies: makeUnauthCookies(),
      url: new URL('http://localhost/api/appointments'),
    } as any);
    expect(res.status).toBe(401);
  });

  it('retorna 200 con lista de citas autenticado', async () => {
    const { GET } = await import('../../src/pages/api/appointments/index');
    mockPrisma.appointment.findMany.mockResolvedValue([]);
    const res = await GET({
      cookies: await makeAuthCookies(),
      url: new URL('http://localhost/api/appointments'),
    } as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.appointments)).toBe(true);
  });

  it('filtra por status cuando se proporciona el parámetro', async () => {
    const { GET } = await import('../../src/pages/api/appointments/index');
    mockPrisma.appointment.findMany.mockResolvedValue([]);
    await GET({
      cookies: await makeAuthCookies(),
      url: new URL('http://localhost/api/appointments?status=pending'),
    } as any);
    expect(mockPrisma.appointment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ status: 'pending' }) })
    );
  });
});

// ─── POST /api/appointments ───────────────────────────────────────────────────

describe('POST /api/appointments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.settings.findUnique.mockResolvedValue(mockSettings);
    mockPrisma.closedDate.findFirst.mockResolvedValue(null);
    mockPrisma.appointment.findMany.mockResolvedValue([]);
    mockPrisma.appointment.create.mockResolvedValue({
      id: 'apt-1',
      ...validBody,
      date: new Date(FUTURE_DATE + 'T00:00:00.000Z'),
      notes: '',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  function makeRequest(body: object): Request {
    return new Request('http://localhost/api/appointments', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  it('crea una cita con datos válidos y retorna 201', async () => {
    const { POST } = await import('../../src/pages/api/appointments/index');
    const res = await POST({ request: makeRequest(validBody) } as any);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.appointment).toBeDefined();
    expect(data.appointment.name).toBe('Juan Pérez');
  });

  it('retorna 400 si faltan campos requeridos', async () => {
    const { POST } = await import('../../src/pages/api/appointments/index');
    const { name: _, ...incomplete } = validBody;
    const res = await POST({ request: makeRequest(incomplete) } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/requeridos/i);
  });

  it('retorna 400 si el teléfono tiene formato inválido', async () => {
    const { POST } = await import('../../src/pages/api/appointments/index');
    const res = await POST({
      request: makeRequest({ ...validBody, phone: 'no-es-un-teléfono' }),
    } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/teléfono/i);
  });

  it('retorna 400 si los comensales exceden el máximo por reserva', async () => {
    const { POST } = await import('../../src/pages/api/appointments/index');
    const res = await POST({
      request: makeRequest({ ...validBody, guests: 99 }),
    } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/máximo/i);
  });

  it('retorna 400 para fecha pasada', async () => {
    const { POST } = await import('../../src/pages/api/appointments/index');
    const res = await POST({
      request: makeRequest({ ...validBody, date: '2020-01-01' }),
    } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/pasadas/i);
  });

  it('retorna 400 cuando el restaurante está cerrado esa fecha', async () => {
    const { POST } = await import('../../src/pages/api/appointments/index');
    mockPrisma.closedDate.findFirst.mockResolvedValue({
      id: 'closed-1',
      date: new Date(FUTURE_DATE),
      reason: 'Feriado',
    });
    const res = await POST({ request: makeRequest(validBody) } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/cerrado/i);
  });

  it('retorna 400 si no hay suficientes sillas disponibles', async () => {
    const { POST } = await import('../../src/pages/api/appointments/index');
    // Llenar todas las sillas (50)
    mockPrisma.appointment.findMany.mockResolvedValue(
      Array.from({ length: 5 }, (_, i) => ({
        id: `apt-${i}`,
        guests: 10,
        time: '20:00',
        status: 'confirmed',
      }))
    );
    const res = await POST({ request: makeRequest(validBody) } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/mesas/i);
  });

  it('retorna 500 si no se encuentra la configuración', async () => {
    const { POST } = await import('../../src/pages/api/appointments/index');
    mockPrisma.settings.findUnique.mockResolvedValue(null);
    const res = await POST({ request: makeRequest(validBody) } as any);
    expect(res.status).toBe(500);
  });
});
