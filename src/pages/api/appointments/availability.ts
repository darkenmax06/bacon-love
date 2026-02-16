import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';

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
    const openDays = JSON.parse(settings.openDays);

    // Verificar si el día está disponible
    if (!openDays.includes(dayOfWeek)) {
      return new Response(
        JSON.stringify({
          available: false,
          message: 'El restaurante no está disponible ese día',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener horarios disponibles
    const openTimes = JSON.parse(settings.openTimes);

    // Obtener citas existentes para esa fecha - usar UTC para comparaciones
    const startDate = new Date(date + 'T00:00:00.000Z');
    const endDate = new Date(date + 'T23:59:59.999Z');

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
