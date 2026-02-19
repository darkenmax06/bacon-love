import { p as prisma } from '../../../chunks/prisma_DvNDnCKU.mjs';
import { v as verifyPassword, c as createToken } from '../../../chunks/auth_3n09hOjh.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email y contraseña son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const token = await createToken({
      userId: user.id,
      email: user.email
    });
    cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      // 7 días
      path: "/"
    });
    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error en login:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
