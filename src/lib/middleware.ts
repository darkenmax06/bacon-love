import type { AstroCookies } from 'astro';
import { verifyToken } from './auth';

export async function requireAuth(cookies: AstroCookies) {
  const token = cookies.get('auth_token')?.value;

  if (!token) {
    return { error: 'No autenticado', status: 401 };
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return { error: 'Token inválido', status: 401 };
  }

  return { user: payload };
}
