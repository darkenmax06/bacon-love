import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createToken } from '../../src/lib/auth';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    closedDate: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { prisma } from '../../src/lib/prisma';
const mockPrisma = prisma as any;

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

function makePostRequest(body: object): Request {
  return new Request('http://localhost/api/closed-dates', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

const FUTURE_DATE = '2030-12-20';

// ─── GET /api/closed-dates ────────────────────────────────────────────────────

describe('GET /api/closed-dates', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retorna 200 con lista de fechas cerradas (público)', async () => {
    const { GET } = await import('../../src/pages/api/closed-dates/index');
    const closedDates = [
      { id: '1', date: new Date('2030-12-20'), reason: 'Navidad' },
      { id: '2', date: new Date('2030-12-31'), reason: 'Fin de año' },
    ];
    mockPrisma.closedDate.findMany.mockResolvedValue(closedDates);

    const res = await GET({} as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.closedDates)).toBe(true);
    expect(data.closedDates).toHaveLength(2);
  });

  it('retorna array vacío si no hay fechas cerradas', async () => {
    const { GET } = await import('../../src/pages/api/closed-dates/index');
    mockPrisma.closedDate.findMany.mockResolvedValue([]);

    const res = await GET({} as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.closedDates).toHaveLength(0);
  });
});

// ─── POST /api/closed-dates ───────────────────────────────────────────────────

describe('POST /api/closed-dates', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retorna 401 sin autenticación', async () => {
    const { POST } = await import('../../src/pages/api/closed-dates/index');
    const res = await POST({
      request: makePostRequest({ date: FUTURE_DATE, reason: 'Test' }),
      cookies: makeUnauthCookies(),
    } as any);
    expect(res.status).toBe(401);
  });

  it('retorna 400 si faltan date o reason', async () => {
    const { POST } = await import('../../src/pages/api/closed-dates/index');
    const res = await POST({
      request: makePostRequest({ date: FUTURE_DATE }),
      cookies: await makeAuthCookies(),
    } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/requeridos/i);
  });

  it('retorna 400 para fecha en el pasado', async () => {
    const { POST } = await import('../../src/pages/api/closed-dates/index');
    const res = await POST({
      request: makePostRequest({ date: '2020-01-01', reason: 'Pasado' }),
      cookies: await makeAuthCookies(),
    } as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/pasadas/i);
  });

  it('retorna 400 si la fecha ya está cerrada', async () => {
    const { POST } = await import('../../src/pages/api/closed-dates/index');
    mockPrisma.closedDate.findFirst.mockResolvedValue({
      id: 'existing',
      date: new Date(FUTURE_DATE),
      reason: 'Ya existe',
    });

    const res = await POST({
      request: makePostRequest({ date: FUTURE_DATE, reason: 'Duplicado' }),
      cookies: await makeAuthCookies(),
    } as any);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/ya existe/i);
  });

  it('crea la fecha cerrada correctamente y retorna 201', async () => {
    const { POST } = await import('../../src/pages/api/closed-dates/index');
    mockPrisma.closedDate.findFirst.mockResolvedValue(null);
    mockPrisma.closedDate.create.mockResolvedValue({
      id: 'new-1',
      date: new Date(FUTURE_DATE),
      reason: 'Vacaciones',
    });

    const res = await POST({
      request: makePostRequest({ date: FUTURE_DATE, reason: 'Vacaciones' }),
      cookies: await makeAuthCookies(),
    } as any);

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.closedDate.reason).toBe('Vacaciones');
  });
});

// ─── DELETE /api/closed-dates/[id] ───────────────────────────────────────────

describe('DELETE /api/closed-dates/[id]', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retorna 401 sin autenticación', async () => {
    const { DELETE } = await import('../../src/pages/api/closed-dates/[id]');
    const res = await DELETE({
      params: { id: 'closed-1' },
      cookies: makeUnauthCookies(),
    } as any);
    expect(res.status).toBe(401);
  });

  it('retorna 404 si la fecha no existe', async () => {
    const { DELETE } = await import('../../src/pages/api/closed-dates/[id]');
    mockPrisma.closedDate.findUnique.mockResolvedValue(null);

    const res = await DELETE({
      params: { id: 'no-existe' },
      cookies: await makeAuthCookies(),
    } as any);
    expect(res.status).toBe(404);
  });

  it('elimina la fecha y retorna 200', async () => {
    const { DELETE } = await import('../../src/pages/api/closed-dates/[id]');
    mockPrisma.closedDate.findUnique.mockResolvedValue({
      id: 'closed-1',
      date: new Date(FUTURE_DATE),
      reason: 'Navidad',
    });
    mockPrisma.closedDate.delete.mockResolvedValue({ id: 'closed-1' });

    const res = await DELETE({
      params: { id: 'closed-1' },
      cookies: await makeAuthCookies(),
    } as any);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });
});
