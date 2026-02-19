import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware';

// GET - Obtener todas las fechas cerradas (público para validation del frontend)
export const GET: APIRoute = async () => {
  try {
    const closedDates = await prisma.closedDate.findMany({
      orderBy: { date: 'asc' },
    });

    return new Response(
      JSON.stringify({ closedDates }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error obteniendo fechas cerradas:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST - Agregar nueva fecha cerrada (requiere autenticación)
export const POST: APIRoute = async ({ request, cookies }) => {
  const auth = await requireAuth(cookies);

  if ('error' in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { date, reason } = body;

    // Validación
    if (!date || !reason) {
      return new Response(
        JSON.stringify({ error: 'Fecha y razón son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Convertir fecha a UTC midnight
    const closedDate = new Date(date + 'T00:00:00.000Z');

    // Verificar que la fecha no esté en el pasado
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (closedDate < today) {
      return new Response(
        JSON.stringify({ error: 'No se pueden agregar fechas pasadas' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar que no exista ya una fecha cerrada para ese día
    const existing = await prisma.closedDate.findFirst({
      where: {
        date: {
          gte: new Date(date + 'T00:00:00.000Z'),
          lte: new Date(date + 'T23:59:59.999Z'),
        },
      },
    });

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Ya existe una fecha cerrada para ese día' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear la fecha cerrada
    const newClosedDate = await prisma.closedDate.create({
      data: {
        date: closedDate,
        reason,
      },
    });

    return new Response(
      JSON.stringify({ closedDate: newClosedDate }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creando fecha cerrada:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
