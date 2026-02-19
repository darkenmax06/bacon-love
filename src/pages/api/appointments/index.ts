import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware';
import { getAvailableTimesForDay, isDayEnabled } from '../../../lib/schedule-utils';
import { sendConfirmationEmail, sendAdminNotification } from '../../../lib/email';

// GET - Obtener todas las reservas (requiere autenticación)
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
    console.error('Error obteniendo reservas:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST - Crear nueva reserva (público)
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

    // Validar fecha - comparar en UTC para evitar problemas de zona horaria
    const appointmentDate = new Date(date + 'T00:00:00.000Z');
    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    if (appointmentDate < todayUTC) {
      return new Response(
        JSON.stringify({ error: 'No se pueden hacer reservas en fechas pasadas' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Si la reserva es para hoy, validar que la hora no haya pasado ya
    if (appointmentDate.getTime() === todayUTC.getTime()) {
      const [slotHours, slotMinutes] = time.split(':').map(Number);
      const nowHours = now.getHours();
      const nowMinutes = now.getMinutes();
      const slotTotalMinutes = slotHours * 60 + slotMinutes;
      const nowTotalMinutes = nowHours * 60 + nowMinutes;

      if (slotTotalMinutes <= nowTotalMinutes) {
        return new Response(
          JSON.stringify({ error: 'Ese horario ya ha pasado hoy' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
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

    if (!isDayEnabled(dayOfWeek, settings)) {
      return new Response(
        JSON.stringify({ error: 'El restaurante no está disponible ese día' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar que la fecha no esté cerrada
    const startDate = new Date(date + 'T00:00:00.000Z');
    const endDate = new Date(date + 'T23:59:59.999Z');

    const closedDate = await prisma.closedDate.findFirst({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (closedDate) {
      return new Response(
        JSON.stringify({ error: `Restaurante cerrado: ${closedDate.reason}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar horario - usar horarios específicos del día
    const availableTimes = getAvailableTimesForDay(dayOfWeek, settings);

    if (!availableTimes.includes(time)) {
      return new Response(
        JSON.stringify({ error: 'Horario no disponible' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar disponibilidad de sillas
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

    // Crear la reserva
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

    // Send emails (fire-and-forget — don't block the response)
    const aptForEmail = {
      id: appointment.id,
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      date,
      time: appointment.time,
      guests: appointment.guests,
      notes: appointment.notes || undefined,
    };

    Promise.all([
      sendConfirmationEmail(aptForEmail),
      settings.adminEmail ? sendAdminNotification(aptForEmail, settings.adminEmail) : Promise.resolve(),
    ]).catch(err => console.error('Error sending emails:', err));

    return new Response(
      JSON.stringify({ appointment }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creando reserva:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
