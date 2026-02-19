import { p as prisma } from '../../chunks/prisma_DvNDnCKU.mjs';
import { r as requireAuth } from '../../chunks/middleware_BvOuL8dj.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const closedDates = await prisma.closedDate.findMany({
      orderBy: { date: "asc" }
    });
    return new Response(
      JSON.stringify({ closedDates }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error obteniendo fechas cerradas:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const POST = async ({ request, cookies }) => {
  const auth = await requireAuth(cookies);
  if ("error" in auth) {
    return new Response(
      JSON.stringify({ error: auth.error }),
      { status: auth.status, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const body = await request.json();
    const { date, reason } = body;
    if (!date || !reason) {
      return new Response(
        JSON.stringify({ error: "Fecha y razón son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const closedDate = /* @__PURE__ */ new Date(date + "T00:00:00.000Z");
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (closedDate < today) {
      return new Response(
        JSON.stringify({ error: "No se pueden agregar fechas pasadas" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const existing = await prisma.closedDate.findFirst({
      where: {
        date: {
          gte: /* @__PURE__ */ new Date(date + "T00:00:00.000Z"),
          lte: /* @__PURE__ */ new Date(date + "T23:59:59.999Z")
        }
      }
    });
    if (existing) {
      return new Response(
        JSON.stringify({ error: "Ya existe una fecha cerrada para ese día" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const newClosedDate = await prisma.closedDate.create({
      data: {
        date: closedDate,
        reason
      }
    });
    return new Response(
      JSON.stringify({ closedDate: newClosedDate }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creando fecha cerrada:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
