import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BeU4Xodg.mjs';
import { $ as $$About$1, a as $$Testimonials } from '../../chunks/Testimonials_D8nNftRp.mjs';
import { e as en } from '../../chunks/en_D2ksRItz.mjs';
export { renderers } from '../../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
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
    es: "/es/nosotros",
    en: "/en/about"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...content.footer, ...content.menu, "languajes": languajes, "title": "About Us | Bacon Love Bar & Grill in San Blas-Canillejas", "description": "Learn the story behind Bacon Love. A passion for artisanal food, great times, and the authentic taste of a real Madrid Bar & Grill.", "lang": "en", "links": links, "alternateLinks": alternateLinks }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="padding-top: 50px;"> <div style="text-align: center; margin-bottom: -40px; padding-top: 40px; position: relative; z-index: 10;"> <h1 style="color: white; font-family: 'stella'; font-size: 3rem;">The Story of Bacon Love</h1> </div> ${renderComponent($$result2, "About", $$About$1, { ...content.about, "title": "" })} <div id="testimonials"> ${renderComponent($$result2, "Testimonials", $$Testimonials, { "testimonials": content.testimonials })} </div> </div> ` })}`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/about.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/about.astro";
const $$url = "/en/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
