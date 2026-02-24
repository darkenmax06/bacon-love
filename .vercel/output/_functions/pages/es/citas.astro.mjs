import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BeU4Xodg.mjs';
import { $ as $$DatePicker } from '../../chunks/DatePicker_DATbuels.mjs';
import { e as es } from '../../chunks/es_MVWlAjRS.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Citas = createComponent(async ($$result, $$props, $$slots) => {
  const content = es.appointments;
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
    es: "/es/citas",
    en: "/en/appointments"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Reservas - Bacon Love", "description": content.description, "lang": "es", ...es.menu, ...es.footer, "languajes": languajes, "links": links, "alternateLinks": alternateLinks, "data-astro-cid-3ncy7tfy": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="appointments-page" data-astro-cid-3ncy7tfy> <div class="appointments-hero" data-astro-cid-3ncy7tfy> <h1 data-astro-cid-3ncy7tfy>${content.title}</h1> <p class="subtitle" data-astro-cid-3ncy7tfy>${content.subtitle}</p> </div> <div class="form-wrapper" data-astro-cid-3ncy7tfy> <form id="appointmentForm" class="appointment-form" data-astro-cid-3ncy7tfy> <div class="form-group" data-astro-cid-3ncy7tfy> <label for="name" data-astro-cid-3ncy7tfy>${content.form.name} *</label> <input type="text" id="name" name="name" required placeholder="Juan Pérez" data-astro-cid-3ncy7tfy> </div> <div class="form-group" data-astro-cid-3ncy7tfy> <label for="email" data-astro-cid-3ncy7tfy>${content.form.email} *</label> <input type="email" id="email" name="email" required placeholder="juan@ejemplo.com" data-astro-cid-3ncy7tfy> </div> <div class="form-group" data-astro-cid-3ncy7tfy> <label for="phone" data-astro-cid-3ncy7tfy>${content.form.phone} *</label> <input type="tel" id="phone" name="phone" required${addAttribute(content.form.phonePlaceholder, "placeholder")} data-astro-cid-3ncy7tfy> </div> <div class="form-group" data-astro-cid-3ncy7tfy> <label for="date" data-astro-cid-3ncy7tfy>${content.form.date} *</label> ${renderComponent($$result2, "DatePicker", $$DatePicker, { "id": "date", "name": "date", "required": true, "lang": "es", "placeholder": "Seleccionar fecha", "data-astro-cid-3ncy7tfy": true })} </div> <div class="form-group" data-astro-cid-3ncy7tfy> <label for="time" data-astro-cid-3ncy7tfy>${content.form.time} *</label> <select id="time" name="time" required data-astro-cid-3ncy7tfy> <option value="" data-astro-cid-3ncy7tfy>Seleccionar horario</option> </select> </div> <div class="form-group" data-astro-cid-3ncy7tfy> <label for="guests" data-astro-cid-3ncy7tfy>${content.form.guests} *</label> <input type="number" id="guests" name="guests" required min="1" max="10" value="2" data-astro-cid-3ncy7tfy> </div> <div class="form-group full-width" data-astro-cid-3ncy7tfy> <label for="notes" data-astro-cid-3ncy7tfy>${content.form.notes}</label> <textarea id="notes" name="notes" rows="4"${addAttribute(content.form.notesPlaceholder, "placeholder")} data-astro-cid-3ncy7tfy></textarea> </div> <div id="formMessage" class="form-message" data-astro-cid-3ncy7tfy></div> <button type="submit" class="submit-btn" data-astro-cid-3ncy7tfy> ${content.form.submit} </button> </form> </div> </main> ` })} ${renderScript($$result, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/citas.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/citas.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/citas.astro";
const $$url = "/es/citas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Citas,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
