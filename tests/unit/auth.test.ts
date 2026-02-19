import { describe, it, expect } from 'vitest';
import {
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
} from '../../src/lib/auth';

// ─── hashPassword ────────────────────────────────────────────────────────────

describe('hashPassword', () => {
  it('devuelve un hash distinto a la contraseña original', async () => {
    const password = 'mi-contraseña-segura';
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
  });

  it('genera hashes diferentes para la misma contraseña (salt único)', async () => {
    const password = 'misma-contraseña';
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);
    expect(hash1).not.toBe(hash2);
  });

  it('produce un hash con formato bcrypt', async () => {
    const hash = await hashPassword('test');
    expect(hash).toMatch(/^\$2[aby]\$\d{2}\$.{53}$/);
  });
});

// ─── verifyPassword ──────────────────────────────────────────────────────────

describe('verifyPassword', () => {
  it('retorna true para contraseña correcta', async () => {
    const password = 'contraseña-correcta';
    const hash = await hashPassword(password);
    const result = await verifyPassword(password, hash);
    expect(result).toBe(true);
  });

  it('retorna false para contraseña incorrecta', async () => {
    const hash = await hashPassword('contraseña-real');
    const result = await verifyPassword('contraseña-incorrecta', hash);
    expect(result).toBe(false);
  });

  it('retorna false para string vacío', async () => {
    const hash = await hashPassword('alguna-contraseña');
    const result = await verifyPassword('', hash);
    expect(result).toBe(false);
  });
});

// ─── createToken ─────────────────────────────────────────────────────────────

describe('createToken', () => {
  it('devuelve un string no vacío', async () => {
    const token = await createToken({ userId: 'user-1', email: 'test@test.com' });
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('genera un JWT con tres partes separadas por puntos', async () => {
    const token = await createToken({ userId: 'user-1', email: 'test@test.com' });
    const parts = token.split('.');
    expect(parts).toHaveLength(3);
  });

  it('genera tokens distintos para payloads distintos', async () => {
    const token1 = await createToken({ userId: 'user-1', email: 'a@test.com' });
    const token2 = await createToken({ userId: 'user-2', email: 'b@test.com' });
    expect(token1).not.toBe(token2);
  });
});

// ─── verifyToken ─────────────────────────────────────────────────────────────

describe('verifyToken', () => {
  it('decodifica el payload correctamente', async () => {
    const payload = { userId: 'abc-123', email: 'admin@baconlove.com' };
    const token = await createToken(payload);
    const decoded = await verifyToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
  });

  it('retorna null para un token inválido', async () => {
    const result = await verifyToken('esto.no.es.un.token.valido');
    expect(result).toBeNull();
  });

  it('retorna null para un string vacío', async () => {
    const result = await verifyToken('');
    expect(result).toBeNull();
  });

  it('retorna null para un token con firma incorrecta', async () => {
    const token = await createToken({ userId: 'x', email: 'x@x.com' });
    // Tamper the signature
    const parts = token.split('.');
    const tampered = `${parts[0]}.${parts[1]}.invalidsignature`;
    const result = await verifyToken(tampered);
    expect(result).toBeNull();
  });
});
