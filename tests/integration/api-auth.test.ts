import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createToken } from '../../src/lib/auth';

// Mock the Prisma module
vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

import { prisma } from '../../src/lib/prisma';
const mockPrisma = prisma as any;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeRequest(body: object): Request {
  return new Request('http://localhost/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

const mockCookies = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
  has: vi.fn(),
};

const mockContext = (body: object) => ({
  request: makeRequest(body),
  cookies: mockCookies,
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna 400 si faltan email o password', async () => {
    const { POST } = await import('../../src/pages/api/auth/login');

    const res = await POST(mockContext({ email: 'test@test.com' }) as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it('retorna 401 si el usuario no existe', async () => {
    const { POST } = await import('../../src/pages/api/auth/login');
    mockPrisma.user.findUnique.mockResolvedValue(null);

    const res = await POST(mockContext({
      email: 'noexiste@test.com',
      password: 'pass',
    }) as any);

    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe('Credenciales inválidas');
  });

  it('retorna 401 si la contraseña es incorrecta', async () => {
    const { POST } = await import('../../src/pages/api/auth/login');
    const { hashPassword } = await import('../../src/lib/auth');
    const hashedPass = await hashPassword('contraseña-correcta');

    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'admin@test.com',
      password: hashedPass,
      name: 'Admin',
    });

    const res = await POST(mockContext({
      email: 'admin@test.com',
      password: 'contraseña-incorrecta',
    }) as any);

    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe('Credenciales inválidas');
  });

  it('retorna 200 y setea cookie con credenciales correctas', async () => {
    const { POST } = await import('../../src/pages/api/auth/login');
    const { hashPassword } = await import('../../src/lib/auth');
    const hashedPass = await hashPassword('mipassword');

    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'admin@test.com',
      password: hashedPass,
      name: 'Admin Test',
    });

    const res = await POST(mockContext({
      email: 'admin@test.com',
      password: 'mipassword',
    }) as any);

    expect(res.status).toBe(200);
    expect(mockCookies.set).toHaveBeenCalledWith(
      'auth_token',
      expect.any(String),
      expect.objectContaining({ httpOnly: true })
    );
    const data = await res.json();
    expect(data.user.email).toBe('admin@test.com');
    expect(data.user.name).toBe('Admin Test');
    expect(data.user.id).toBe('user-1');
  });
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────

describe('POST /api/auth/logout', () => {
  it('retorna 200 y elimina la cookie', async () => {
    const { POST } = await import('../../src/pages/api/auth/logout');

    const res = await POST({ cookies: mockCookies } as any);

    expect(res.status).toBe(200);
    expect(mockCookies.delete).toHaveBeenCalledWith('auth_token', expect.any(Object));
  });
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

describe('GET /api/auth/me', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna 401 si no hay token', async () => {
    const { GET } = await import('../../src/pages/api/auth/me');
    mockCookies.get.mockReturnValue(undefined);

    const res = await GET({ cookies: mockCookies } as any);
    expect(res.status).toBe(401);
  });

  it('retorna 401 si el token es inválido', async () => {
    const { GET } = await import('../../src/pages/api/auth/me');
    mockCookies.get.mockReturnValue({ value: 'token.invalido.xxx' });

    const res = await GET({ cookies: mockCookies } as any);
    expect(res.status).toBe(401);
  });

  it('retorna 200 con usuario si el token es válido', async () => {
    const { GET } = await import('../../src/pages/api/auth/me');
    const token = await createToken({ userId: 'user-1', email: 'admin@test.com' });
    mockCookies.get.mockReturnValue({ value: token });
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'admin@test.com',
      name: 'Admin',
    });

    const res = await GET({ cookies: mockCookies } as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.user.email).toBe('admin@test.com');
  });

  it('retorna 404 si el usuario del token no existe en la BD', async () => {
    const { GET } = await import('../../src/pages/api/auth/me');
    const token = await createToken({ userId: 'ghost-user', email: 'ghost@test.com' });
    mockCookies.get.mockReturnValue({ value: token });
    mockPrisma.user.findUnique.mockResolvedValue(null);

    const res = await GET({ cookies: mockCookies } as any);
    expect(res.status).toBe(404);
  });
});
