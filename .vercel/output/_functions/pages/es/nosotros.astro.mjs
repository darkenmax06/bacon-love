import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BeU4Xodg.mjs';
import { $ as $$About, a as $$Testimonials } from '../../chunks/Testimonials_D8nNftRp.mjs';
import { e as es } from '../../chunks/es_MVWlAjRS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Nosotros = createComponent(($$result, $$props, $$slots) => {
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
    es: "/es/nosotros",
    en: "/en/about"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...content.footer, ...content.menu, "languajes": languajes, "title": "Sobre Nosotros | Bacon Love Bar & Grill en San Blas-Canillejas", "description": "Conoce la historia detr\xE1s de Bacon Love. Pasi\xF3n por la cocina artesanal, los buenos momentos y el aut\xE9ntico sabor de un buen Bar & Grill en Madrid.", "lang": "es", "links": links, "alternateLinks": alternateLinks }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="padding-top: 50px;"> <div style="text-align: center; margin-bottom: -40px; padding-top: 40px; position: relative; z-index: 10;"> <h1 style="color: white; font-family: 'stella'; font-size: 3rem;">La Historia de Bacon Love</h1> </div> ${renderComponent($$result2, "About", $$About, { ...content.about, "title": "" })} <div id="testimonials"> ${renderComponent($$result2, "Testimonials", $$Testimonials, { "testimonials": content.testimonials })} </div> </div> ` })}`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/nosotros.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/nosotros.astro";
const $$url = "/es/nosotros";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nosotros,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
