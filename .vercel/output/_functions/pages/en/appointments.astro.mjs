import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BeU4Xodg.mjs';
import { $ as $$DatePicker } from '../../chunks/DatePicker_DATbuels.mjs';
import { e as en } from '../../chunks/en_D2ksRItz.mjs';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Appointments = createComponent(async ($$result, $$props, $$slots) => {
  const content = en.appointments;
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
    es: "/es/citas",
    en: "/en/appointments"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Reservations - Bacon Love", "description": content.description, "lang": "en", ...en.menu, ...en.footer, "languajes": languajes, "links": links, "alternateLinks": alternateLinks, "data-astro-cid-lpligl4r": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="appointments-page" data-astro-cid-lpligl4r> <div class="appointments-hero" data-astro-cid-lpligl4r> <h1 data-astro-cid-lpligl4r>${content.title}</h1> <p class="subtitle" data-astro-cid-lpligl4r>${content.subtitle}</p> </div> <div class="form-wrapper" data-astro-cid-lpligl4r> <form id="appointmentForm" class="appointment-form" data-astro-cid-lpligl4r> <div class="form-group" data-astro-cid-lpligl4r> <label for="name" data-astro-cid-lpligl4r>${content.form.name} *</label> <input type="text" id="name" name="name" required placeholder="John Doe" data-astro-cid-lpligl4r> </div> <div class="form-group" data-astro-cid-lpligl4r> <label for="email" data-astro-cid-lpligl4r>${content.form.email} *</label> <input type="email" id="email" name="email" required placeholder="john@example.com" data-astro-cid-lpligl4r> </div> <div class="form-group" data-astro-cid-lpligl4r> <label for="phone" data-astro-cid-lpligl4r>${content.form.phone} *</label> <input type="tel" id="phone" name="phone" required${addAttribute(content.form.phonePlaceholder, "placeholder")} data-astro-cid-lpligl4r> </div> <div class="form-group" data-astro-cid-lpligl4r> <label for="date" data-astro-cid-lpligl4r>${content.form.date} *</label> ${renderComponent($$result2, "DatePicker", $$DatePicker, { "id": "date", "name": "date", "required": true, "lang": "en", "placeholder": "Select date", "data-astro-cid-lpligl4r": true })} </div> <div class="form-group" data-astro-cid-lpligl4r> <label for="time" data-astro-cid-lpligl4r>${content.form.time} *</label> <select id="time" name="time" required data-astro-cid-lpligl4r> <option value="" data-astro-cid-lpligl4r>Select time</option> </select> </div> <div class="form-group" data-astro-cid-lpligl4r> <label for="guests" data-astro-cid-lpligl4r>${content.form.guests} *</label> <input type="number" id="guests" name="guests" required min="1" max="10" value="2" data-astro-cid-lpligl4r> </div> <div class="form-group full-width" data-astro-cid-lpligl4r> <label for="notes" data-astro-cid-lpligl4r>${content.form.notes}</label> <textarea id="notes" name="notes" rows="4"${addAttribute(content.form.notesPlaceholder, "placeholder")} data-astro-cid-lpligl4r></textarea> </div> <div id="formMessage" class="form-message" data-astro-cid-lpligl4r></div> <button type="submit" class="submit-btn" data-astro-cid-lpligl4r> ${content.form.submit} </button> </form> </div> </main> ` })} ${renderScript($$result, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/appointments.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/appointments.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/appointments.astro";
const $$url = "/en/appointments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Appointments,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
