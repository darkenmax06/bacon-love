import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BeU4Xodg.mjs';
import { e as es } from '../chunks/es_MVWlAjRS.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const languajes = ["es", "en"];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - P\xE1gina no encontrada | Bacon Love", "description": "La p\xE1gina que buscas no existe.", "lang": "es", ...es.menu, ...es.footer, "languajes": languajes, "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="not-found" data-astro-cid-zetdm5md> <p class="error-code" data-astro-cid-zetdm5md>404</p> <h1 data-astro-cid-zetdm5md>Página no encontrada</h1> <p class="message" data-astro-cid-zetdm5md>La página que buscas no existe o fue movida.</p> <a href="/es/" class="back-btn" data-astro-cid-zetdm5md>Volver al inicio</a> </section> ` })} `;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/404.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
