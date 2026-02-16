import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware';

// GET - Obtener todas las citas (requiere autenticación)
export const GET: APIRoute = async ({ cookies, url }) => {
  const auth = await requireAuth(cookies);

  if ('error' in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const status = url.searchParams.get('status');
    const date = url.searchParams.get('date');

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (date) {
      // Usar UTC para comparaciones de fecha
      const startDate = new Date(date + 'T00:00:00.000Z');
      const endDate = new Date(date + 'T23:59:59.999Z');

      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: [
        { date: 'asc' },
        { time: 'asc' },
      ],
    });

    return new Response(
      JSON.stringify({ appointments }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error obteniendo citas:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST - Crear nueva cita (público)
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests, notes } = body;

    // Validación
    if (!name || !email || !phone || !date || !time || !guests) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar teléfono
    if (!/^\+?[0-9\s-]+$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: 'Número de teléfono inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener configuración
    const settings = await prisma.settings.findUnique({
      where: { id: 'default' },
    });

    if (!settings) {
      return new Response(
        JSON.stringify({ error: 'Configuración no encontrada' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar número de comensales
    if (guests > settings.maxSeatsPerReservation) {
      return new Response(
        JSON.stringify({
          error: `Máximo ${settings.maxSeatsPerReservation} personas por reserva`
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar fecha - usar formato ISO con hora UTC para evitar problemas de zona horaria
    const appointmentDate = new Date(date + 'T00:00:00.000Z');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      return new Response(
        JSON.stringify({ error: 'No se pueden hacer reservas en fechas pasadas' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + settings.advanceBookingDays);

    if (appointmentDate > maxDate) {
      return new Response(
        JSON.stringify({
          error: `Solo se pueden hacer reservas con ${settings.advanceBookingDays} días de anticipación`
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar día de la semana - usar UTC
    const dayOfWeek = appointmentDate.getUTCDay().toString();
    const openDays = JSON.parse(settings.openDays);

    if (!openDays.includes(dayOfWeek)) {
      return new Response(
        JSON.stringify({ error: 'El restaurante no está disponible ese día' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar horario
    const openTimes = JSON.parse(settings.openTimes);

    if (!openTimes.includes(time)) {
      return new Response(
        JSON.stringify({ error: 'Horario no disponible' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar disponibilidad de sillas - usar UTC para comparaciones
    const startDate = new Date(date + 'T00:00:00.000Z');
    const endDate = new Date(date + 'T23:59:59.999Z');

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        time,
        status: {
          not: 'cancelled',
        },
      },
    });

    const totalSeatsBooked = existingAppointments.reduce(
      (sum, apt) => sum + apt.guests,
      0
    );

    if (totalSeatsBooked + guests > settings.maxSeatsTotal) {
      return new Response(
        JSON.stringify({
          error: 'No hay suficientes mesas disponibles para ese horario',
          availableSeats: settings.maxSeatsTotal - totalSeatsBooked,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear la cita
    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        date: appointmentDate,
        time,
        guests: parseInt(guests),
        notes: notes || '',
        status: 'pending',
      },
    });

    return new Response(
      JSON.stringify({ appointment }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creando cita:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
