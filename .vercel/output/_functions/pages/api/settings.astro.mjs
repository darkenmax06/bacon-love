import { p as prisma } from '../../chunks/prisma_DvNDnCKU.mjs';
import { r as requireAuth } from '../../chunks/middleware_BvOuL8dj.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: "default" }
    });
    if (!settings) {
      return new Response(
        JSON.stringify({ error: "Configuración no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        settings: {
          ...settings,
          openDays: JSON.parse(settings.openDays),
          openTimes: JSON.parse(settings.openTimes),
          daySchedules: settings.daySchedules ? JSON.parse(settings.daySchedules) : null
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error obteniendo configuración:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const PUT = async ({ request, cookies }) => {
  const auth = await requireAuth(cookies);
  if ("error" in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { "Content-Type": "application/json" } }
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
      adminEmail
    } = body;
    if (maxSeatsPerReservation > maxSeatsTotal) {
      return new Response(
        JSON.stringify({
          error: "El máximo de sillas por reserva no puede ser mayor que el total"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const settings = await prisma.settings.upsert({
      where: { id: "default" },
      update: {
        maxSeatsTotal: maxSeatsTotal !== void 0 ? maxSeatsTotal : void 0,
        maxSeatsPerReservation: maxSeatsPerReservation !== void 0 ? maxSeatsPerReservation : void 0,
        openDays: openDays ? JSON.stringify(openDays) : void 0,
        openTimes: openTimes ? JSON.stringify(openTimes) : void 0,
        daySchedules: daySchedules ? JSON.stringify(daySchedules) : void 0,
        reservationDuration: reservationDuration !== void 0 ? reservationDuration : void 0,
        advanceBookingDays: advanceBookingDays !== void 0 ? advanceBookingDays : void 0,
        adminEmail: adminEmail !== void 0 ? adminEmail : void 0
      },
      create: {
        id: "default",
        maxSeatsTotal: maxSeatsTotal || 50,
        maxSeatsPerReservation: maxSeatsPerReservation || 10,
        openDays: JSON.stringify(openDays || ["1", "2", "3", "4", "5", "6", "0"]),
        openTimes: JSON.stringify(openTimes || ["12:00", "13:00", "14:00", "20:00", "21:00", "22:00"]),
        daySchedules: daySchedules ? JSON.stringify(daySchedules) : null,
        reservationDuration: reservationDuration || 120,
        advanceBookingDays: advanceBookingDays || 30,
        adminEmail: adminEmail || ""
      }
    });
    return new Response(
      JSON.stringify({
        settings: {
          ...settings,
          openDays: JSON.parse(settings.openDays),
          openTimes: JSON.parse(settings.openTimes),
          daySchedules: settings.daySchedules ? JSON.parse(settings.daySchedules) : null
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error actualizando configuración:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
