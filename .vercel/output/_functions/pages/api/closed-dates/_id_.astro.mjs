import { p as prisma } from '../../../chunks/prisma_DvNDnCKU.mjs';
import { r as requireAuth } from '../../../chunks/middleware_BvOuL8dj.mjs';
export { renderers } from '../../../renderers.mjs';

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
    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const closedDate = await prisma.closedDate.findUnique({
      where: { id }
    });
    if (!closedDate) {
      return new Response(
        JSON.stringify({ error: "Fecha cerrada no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    await prisma.closedDate.delete({
      where: { id }
    });
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error eliminando fecha cerrada:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
