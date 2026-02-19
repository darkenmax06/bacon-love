import { p as prisma } from '../../../chunks/prisma_DvNDnCKU.mjs';
import { i as isDayEnabled, g as getAvailableTimesForDay } from '../../../chunks/schedule-utils_FO8jfudb.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const date = url.searchParams.get("date");
    if (!date) {
      return new Response(
        JSON.stringify({ error: "Fecha es requerida" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const settings = await prisma.settings.findUnique({
      where: { id: "default" }
    });
    if (!settings) {
      return new Response(
        JSON.stringify({ error: "Configuración no encontrada" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const appointmentDate = /* @__PURE__ */ new Date(date + "T00:00:00.000Z");
    const dayOfWeek = appointmentDate.getUTCDay().toString();
    if (!isDayEnabled(dayOfWeek, settings)) {
      return new Response(
        JSON.stringify({
          available: false,
          message: "El restaurante no está disponible ese día"
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const startDate = /* @__PURE__ */ new Date(date + "T00:00:00.000Z");
    const endDate = /* @__PURE__ */ new Date(date + "T23:59:59.999Z");
    const closedDate = await prisma.closedDate.findFirst({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    });
    if (closedDate) {
      return new Response(
        JSON.stringify({
          available: false,
          message: `Restaurante cerrado: ${closedDate.reason}`
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    let openTimes = getAvailableTimesForDay(dayOfWeek, settings);
    const now = /* @__PURE__ */ new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    if (appointmentDate.getTime() === todayUTC.getTime()) {
      const nowTotalMinutes = now.getHours() * 60 + now.getMinutes();
      openTimes = openTimes.filter((t) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m > nowTotalMinutes;
      });
      if (openTimes.length === 0) {
        return new Response(
          JSON.stringify({
            available: false,
            message: "No quedan horarios disponibles para hoy"
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        },
        status: {
          not: "cancelled"
        }
      }
    });
    const availability = openTimes.map((time) => {
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
        isAvailable: availableSeats > 0
      };
    });
    return new Response(
      JSON.stringify({
        available: true,
        date: appointmentDate,
        availability,
        maxSeatsPerReservation: settings.maxSeatsPerReservation
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error verificando disponibilidad:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
