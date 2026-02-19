import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BeU4Xodg.mjs';
import { $ as $$Hero, a as $$Orders } from '../chunks/Orders_Dfun3Jr_.mjs';
import { e as en } from '../chunks/en_D2ksRItz.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const content = en;
  const languajes = ["es", "en"];
  const links = {
    home: "/en",
    about: "/en/about",
    menu: "/en/menu",
    testimonials: "/en/about#testimonials",
    appointments: "/en/appointments",
    contact: "/en/contact"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...content.footer, ...content.menu, "languajes": languajes, "title": "Bacon Love | Bar & Grill and Artisanal Burgers in Las Rosas, Madrid", "description": "Enjoy the best artisanal burgers and craft kitchen at Bacon Love, your premier Bar & Grill in San Blas-Canillejas (Las Rosas). Book your table today!", "lang": "en", "links": links, "alternateLinks": alternateLinks }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { ...content.hero, "title1": "Bacon Love", "title2": "Bar & Grill & Artisanal Kitchen in Madrid" })} ${maybeRenderHead()}<div style="display:none"> <h1>Bacon Love: Bar & Grill & Artisanal Kitchen in Madrid</h1> <h2>Artisanal Burgers</h2> <h2>Bar & Grill Atmosphere</h2> </div> ${renderComponent($$result2, "Orders", $$Orders, { ...content.orders })} ` })}`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/index.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
