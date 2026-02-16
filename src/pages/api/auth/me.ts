import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const token = cookies.get('auth_token')?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'No autenticado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar token
    const payload = await verifyToken(token);

    if (!payload) {
      return new Response(
        JSON.stringify({ error: 'Token inválido' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener usuario
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Usuario no encontrado' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
