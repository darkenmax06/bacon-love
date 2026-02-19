import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';
import { requireAuth } from '../../../lib/middleware';

// GET - Obtener configuración (público para validation del frontend)
export const GET: APIRoute = async () => {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 'default' },
    });

    if (!settings) {
      return new Response(
        JSON.stringify({ error: 'Configuración no encontrada' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        settings: {
          ...settings,
          openDays: JSON.parse(settings.openDays),
          openTimes: JSON.parse(settings.openTimes),
          daySchedules: settings.daySchedules ? JSON.parse(settings.daySchedules) : null,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error obteniendo configuración:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// PUT - Actualizar configuración (requiere autenticación)
export const PUT: APIRoute = async ({ request, cookies }) => {
  const auth = await requireAuth(cookies);

  if ('error' in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const {
      maxSeatsTotal,
      maxSeatsPerReservation,
      openDays,
      openTimes,
      daySchedules,
      reservationDuration,
      advanceBookingDays,
      adminEmail,
    } = body;

    // Validación
    if (maxSeatsPerReservation > maxSeatsTotal) {
      return new Response(
        JSON.stringify({
          error: 'El máximo de sillas por reserva no puede ser mayor que el total',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const settings = await prisma.settings.upsert({
      where: { id: 'default' },
      update: {
        maxSeatsTotal: maxSeatsTotal !== undefined ? maxSeatsTotal : undefined,
        maxSeatsPerReservation:
          maxSeatsPerReservation !== undefined ? maxSeatsPerReservation : undefined,
        openDays: openDays ? JSON.stringify(openDays) : undefined,
        openTimes: openTimes ? JSON.stringify(openTimes) : undefined,
        daySchedules: daySchedules ? JSON.stringify(daySchedules) : undefined,
        reservationDuration:
          reservationDuration !== undefined ? reservationDuration : undefined,
        advanceBookingDays:
          advanceBookingDays !== undefined ? advanceBookingDays : undefined,
        adminEmail: adminEmail !== undefined ? adminEmail : undefined,
      },
      create: {
        id: 'default',
        maxSeatsTotal: maxSeatsTotal || 50,
        maxSeatsPerReservation: maxSeatsPerReservation || 10,
        openDays: JSON.stringify(openDays || ['1', '2', '3', '4', '5', '6', '0']),
        openTimes: JSON.stringify(openTimes || ['12:00', '13:00', '14:00', '20:00', '21:00', '22:00']),
        daySchedules: daySchedules ? JSON.stringify(daySchedules) : null,
        reservationDuration: reservationDuration || 120,
        advanceBookingDays: advanceBookingDays || 30,
        adminEmail: adminEmail || "",
      },
    });

    return new Response(
      JSON.stringify({
        settings: {
          ...settings,
          openDays: JSON.parse(settings.openDays),
          openTimes: JSON.parse(settings.openTimes),
          daySchedules: settings.daySchedules ? JSON.parse(settings.daySchedules) : null,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error actualizando configuración:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
