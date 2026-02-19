import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BeU4Xodg.mjs';
import { $ as $$Platillos } from '../../chunks/Platillos_DIn-S7EC.mjs';
import { e as es } from '../../chunks/es_MVWlAjRS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Carta = createComponent(($$result, $$props, $$slots) => {
  const content = es;
  const languajes = ["es", "en"];
  const links = {
    home: "/es",
    about: "/es/nosotros",
    menu: "/es/carta",
    testimonials: "/es/nosotros#testimonials",
    appointments: "/es/citas",
    contact: "/es/contacto"
  };
  const alternateLinks = {
    es: "/es/carta",
    en: "/en/menu"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...content.footer, ...content.menu, "languajes": languajes, "title": "Carta y Men\xFA | Hamburguesas Artesanales y Grill en Madrid | Bacon Love", "description": "Descubre nuestra carta. Hamburguesas artesanales, entrantes y opciones de grill preparadas al momento en San Blas-Canillejas. Mira nuestro men\xFA.", "lang": "es", "links": links, "alternateLinks": alternateLinks }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="padding-top: 100px;"> <h1 style="text-align: center; color: white; font-family: 'stella'; font-size: 3rem; margin-bottom: 2rem;">Nuestra Carta: Grill y Cocina Artesanal</h1> ${renderComponent($$result2, "Platillos", $$Platillos, { ...content.platillos, "title": "" })} </div> ` })}`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/carta.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/carta.astro";
const $$url = "/es/carta";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Carta,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
