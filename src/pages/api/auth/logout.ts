import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies }) => {
  // Eliminar la cookie de autenticación
  cookies.delete('auth_token', { path: '/' });

  return new Response(
    JSON.stringify({ message: 'Sesión cerrada exitosamente' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
