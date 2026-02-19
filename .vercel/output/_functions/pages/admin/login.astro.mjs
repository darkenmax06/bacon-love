import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_1WyvZ02v.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Acceso Admin - Bacon Love", "variant": "login", "data-astro-cid-rf56lckb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="login-container" data-astro-cid-rf56lckb> <div class="login-card" data-astro-cid-rf56lckb> <div class="login-header" data-astro-cid-rf56lckb> <img src="/logo.png" alt="Bacon Love Logo" class="login-logo" data-astro-cid-rf56lckb> <h1 data-astro-cid-rf56lckb>Panel Administrativo</h1> <p data-astro-cid-rf56lckb>Iniciar sesion</p> </div> <form id="loginForm" class="login-form" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="email" data-astro-cid-rf56lckb>Correo electronico</label> <input type="email" id="email" name="email" required placeholder="Correo electronico" data-astro-cid-rf56lckb> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Contrasena</label> <input type="password" id="password" name="password" required placeholder="••••••••" data-astro-cid-rf56lckb> </div> <div id="loginMessage" class="login-message" data-astro-cid-rf56lckb></div> <button type="submit" class="login-btn" data-astro-cid-rf56lckb>
Iniciar sesion
</button> </form> </div> </div> ` })} ${renderScript($$result, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
