import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createToken } from '../../src/lib/auth';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    settings: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
  },
}));

import { prisma } from '../../src/lib/prisma';
const mockPrisma = prisma as any;

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const mockSettings = {
  id: 'default',
  maxSeatsTotal: 50,
  maxSeatsPerReservation: 10,
  openDays: '["1","2","3","4","5","6"]',
  openTimes: '["12:00","13:00","20:00","21:00"]',
  daySchedules: null,
  reservationDuration: 120,
  advanceBookingDays: 30,
  adminEmail: 'admin@test.com',
  updatedAt: new Date(),
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
  return { get: vi.fn().mockReturnValue(undefined), set: vi.fn(), delete: vi.fn() };
}

function makePutRequest(body: object): Request {
  return new Request('http://localhost/api/settings', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

// ─── GET /api/settings ────────────────────────────────────────────────────────

describe('GET /api/settings', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retorna 200 con la configuración serializada', async () => {
    const { GET } = await import('../../src/pages/api/settings/index');
    mockPrisma.settings.findUnique.mockResolvedValue(mockSettings);

    const res = await GET({} as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.settings).toBeDefined();
    // openDays y openTimes deben ser arrays (no strings JSON)
    expect(Array.isArray(data.settings.openDays)).toBe(true);
    expect(Array.isArray(data.settings.openTimes)).toBe(true);
    expect(data.settings.maxSeatsTotal).toBe(50);
  });

  it('retorna 404 si no existe configuración', async () => {
    const { GET } = await import('../../src/pages/api/settings/index');
    mockPrisma.settings.findUnique.mockResolvedValue(null);

    const res = await GET({} as any);
    expect(res.status).toBe(404);
  });

  it('parsea daySchedules como objeto cuando no es null', async () => {
    const { GET } = await import('../../src/pages/api/settings/index');
    const schedules = { '1': { enabled: true, times: ['12:00'] } };
    mockPrisma.settings.findUnique.mockResolvedValue({
      ...mockSettings,
      daySchedules: JSON.stringify(schedules),
    });

    const res = await GET({} as any);
    const data = await res.json();
    expect(data.settings.daySchedules).toEqual(schedules);
  });

  it('retorna daySchedules como null cuando no existe', async () => {
    const { GET } = await import('../../src/pages/api/settings/index');
    mockPrisma.settings.findUnique.mockResolvedValue(mockSettings);

    const res = await GET({} as any);
    const data = await res.json();
    expect(data.settings.daySchedules).toBeNull();
  });
});

// ─── PUT /api/settings ────────────────────────────────────────────────────────

describe('PUT /api/settings', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retorna 401 sin autenticación', async () => {
    const { PUT } = await import('../../src/pages/api/settings/index');
    const res = await PUT({
      request: makePutRequest({ maxSeatsTotal: 60 }),
      cookies: makeUnauthCookies(),
    } as any);
    expect(res.status).toBe(401);
  });

  it('actualiza la configuración correctamente', async () => {
    const { PUT } = await import('../../src/pages/api/settings/index');
    const updatedSettings = { ...mockSettings, maxSeatsTotal: 60 };
    mockPrisma.settings.upsert.mockResolvedValue(updatedSettings);

    const res = await PUT({
      request: makePutRequest({ maxSeatsTotal: 60, maxSeatsPerReservation: 10 }),
      cookies: await makeAuthCookies(),
    } as any);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.settings.maxSeatsTotal).toBe(60);
  });

  it('retorna 400 si maxSeatsPerReservation > maxSeatsTotal', async () => {
    const { PUT } = await import('../../src/pages/api/settings/index');
    const res = await PUT({
      request: makePutRequest({ maxSeatsTotal: 5, maxSeatsPerReservation: 10 }),
      cookies: await makeAuthCookies(),
    } as any);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/mayor/i);
  });
});
