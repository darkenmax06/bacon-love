import { p as prisma } from '../../../chunks/prisma_DvNDnCKU.mjs';
import { r as requireAuth } from '../../../chunks/middleware_BvOuL8dj.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params, cookies }) => {
  const auth = await requireAuth(cookies);
  if ("error" in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const { id } = params;
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    });
    if (!appointment) {
      return new Response(
        JSON.stringify({ error: "Cita no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ appointment }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error obteniendo cita:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const PATCH = async ({ params, request, cookies }) => {
  const auth = await requireAuth(cookies);
  if ("error" in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const { id } = params;
    const body = await request.json();
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    });
    if (!appointment) {
      return new Response(
        JSON.stringify({ error: "Cita no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: body
    });
    return new Response(
      JSON.stringify({ appointment: updatedAppointment }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error actualizando cita:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const DELETE = async ({ params, cookies }) => {
  const auth = await requireAuth(cookies);
  if ("error" in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const { id } = params;
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    });
    if (!appointment) {
      return new Response(
        JSON.stringify({ error: "Cita no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    await prisma.appointment.delete({
      where: { id }
    });
    return new Response(
      JSON.stringify({ message: "Cita eliminada exitosamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error eliminando cita:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
