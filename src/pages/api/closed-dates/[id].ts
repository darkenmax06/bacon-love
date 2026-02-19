import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware';

// DELETE - Eliminar una fecha cerrada (requiere autenticación)
export const DELETE: APIRoute = async ({ params, cookies }) => {
  const auth = await requireAuth(cookies);

  if ('error' in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID requerido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar que la fecha cerrada existe
    const closedDate = await prisma.closedDate.findUnique({
      where: { id },
    });

    if (!closedDate) {
      return new Response(
        JSON.stringify({ error: 'Fecha cerrada no encontrada' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Eliminar la fecha cerrada
    await prisma.closedDate.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error eliminando fecha cerrada:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
