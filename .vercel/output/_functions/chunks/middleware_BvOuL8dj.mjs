import { a as verifyToken } from './auth_3n09hOjh.mjs';

async function requireAuth(cookies) {
  const token = cookies.get("auth_token")?.value;
  if (!token) {
    return { error: "No autenticado", status: 401 };
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return { error: "Token inválido", status: 401 };
  }
  return { user: payload };
}

export { requireAuth as r };
