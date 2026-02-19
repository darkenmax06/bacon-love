import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BeU4Xodg.mjs';
import { $ as $$Platillos } from '../../chunks/Platillos_DIn-S7EC.mjs';
import { e as en } from '../../chunks/en_D2ksRItz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Menu = createComponent(($$result, $$props, $$slots) => {
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
  const alternateLinks = {
    es: "/es/carta",
    en: "/en/menu"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...content.footer, ...content.menu, "languajes": languajes, "title": "Menu | Artisanal Burgers & Grill in Madrid | Bacon Love", "description": "Discover our menu. Handcrafted burgers, starters, and fresh grill options prepared to order in San Blas-Canillejas. View our full menu.", "lang": "en", "links": links, "alternateLinks": alternateLinks }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="padding-top: 100px;"> <h1 style="text-align: center; color: white; font-family: 'stella'; font-size: 3rem; margin-bottom: 2rem;">Our Menu: Grill & Artisanal Kitchen</h1> ${renderComponent($$result2, "Platillos", $$Platillos, { ...content.platillos, "title": "" })} </div> ` })}`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/menu.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/menu.astro";
const $$url = "/en/menu";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Menu,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
