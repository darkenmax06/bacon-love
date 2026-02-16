import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';
import { verifyPassword, createToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    // Validar datos
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email y contraseña son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Credenciales inválidas' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar contraseña
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: 'Credenciales inválidas' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear token
    const token = await createToken({
      userId: user.id,
      email: user.email,
    });

    // Establecer cookie
    cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    });

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
    console.error('Error en login:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
