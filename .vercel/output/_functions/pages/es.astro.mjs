import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BeU4Xodg.mjs';
import { $ as $$Hero, a as $$Orders } from '../chunks/Orders_Dfun3Jr_.mjs';
import { e as es } from '../chunks/es_MVWlAjRS.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
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
    en: "/en",
    es: "/es"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...content.footer, ...content.menu, "languajes": languajes, "title": "Bacon Love | Bar & Grill y Cocina Artesanal en Las Rosas, Madrid", "description": "Disfruta de la mejor cocina artesanal y hamburguesas en Bacon Love, tu Bar & Grill en San Blas-Canillejas (Las Rosas). \xA1Reserva tu mesa hoy!", "lang": "es", "links": links, "alternateLinks": alternateLinks }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { ...content.hero, "title1": "Bacon Love", "title2": "Bar & Grill y Cocina Artesanal en Madrid" })} ${maybeRenderHead()}<div style="display:none"> <h1>Bacon Love: Bar & Grill y Cocina Artesanal en Madrid</h1> <h2>Nuestras Hamburguesas Artesanales</h2> <h2>Ambiente Bar & Grill</h2> </div> ${renderComponent($$result2, "Orders", $$Orders, { ...content.orders })} ` })}
\`\`\``;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/index.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/index.astro";
const $$url = "/es";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
