import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';
import { getAvailableTimesForDay, isDayEnabled } from '../../../lib/schedule-utils';

// GET - Verificar disponibilidad para una fecha específica
export const GET: APIRoute = async ({ url }) => {
  try {
    const date = url.searchParams.get('date');

    if (!date) {
      return new Response(
        JSON.stringify({ error: 'Fecha es requerida' }),
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

    const appointmentDate = new Date(date + 'T00:00:00.000Z');
    const dayOfWeek = appointmentDate.getUTCDay().toString();

    // Verificar si el día está disponible
    if (!isDayEnabled(dayOfWeek, settings)) {
      return new Response(
        JSON.stringify({
          available: false,
          message: 'El restaurante no está disponible ese día',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar si la fecha está cerrada
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
        JSON.stringify({
          available: false,
          message: `Restaurante cerrado: ${closedDate.reason}`,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener horarios disponibles para este día específico
    let openTimes = getAvailableTimesForDay(dayOfWeek, settings);

    // Si la fecha es hoy, filtrar horarios que ya han pasado
    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    if (appointmentDate.getTime() === todayUTC.getTime()) {
      const nowTotalMinutes = now.getHours() * 60 + now.getMinutes();
      openTimes = openTimes.filter((t: string) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m > nowTotalMinutes;
      });

      if (openTimes.length === 0) {
        return new Response(
          JSON.stringify({
            available: false,
            message: 'No quedan horarios disponibles para hoy',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Obtener reservas existentes para esa fecha
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          not: 'cancelled',
        },
      },
    });

    // Calcular disponibilidad por horario
    const availability = openTimes.map((time: string) => {
      const appointmentsAtTime = existingAppointments.filter(
        (apt) => apt.time === time
      );
      const seatsBooked = appointmentsAtTime.reduce(
        (sum, apt) => sum + apt.guests,
        0
      );
      const availableSeats = settings.maxSeatsTotal - seatsBooked;

      return {
        time,
        availableSeats,
        isAvailable: availableSeats > 0,
      };
    });

    return new Response(
      JSON.stringify({
        available: true,
        date: appointmentDate,
        availability,
        maxSeatsPerReservation: settings.maxSeatsPerReservation,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error verificando disponibilidad:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
