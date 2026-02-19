import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BeU4Xodg.mjs';
import { e as en } from '../../chunks/en_D2ksRItz.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Contact = createComponent(($$result, $$props, $$slots) => {
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
    es: "/es/contacto",
    en: "/en/contact"
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Bacon Love",
    "image": "https://baconlove.es/og.png",
    "description": "Bacon Love: High cuisine and artisanal flavors in Madrid.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C. de Sof\xEDa, 177i",
      "addressLocality": "Madrid",
      "addressRegion": "Madrid",
      "postalCode": "28022",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.4237379,
      "longitude": -3.6006177
    },
    "url": "https://baconlove.es/",
    "telephone": "+34677063060",
    "servesCuisine": "Burgers, American, Grill",
    "priceRange": "$$"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...content.footer, ...content.menu, "languajes": languajes, "title": "Location & Contact | Bacon Love Madrid (Las Rosas)", "description": "Visit Bacon Love at C. de Sof\xEDa, 177i, San Blas-Canillejas, Madrid. Find our opening hours, contact number, and map for easy directions.", "lang": "en", "links": links, "alternateLinks": alternateLinks, "data-astro-cid-v7lftu2i": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", `<main class="contact-page" data-astro-cid-v7lftu2i> <div class="container" data-astro-cid-v7lftu2i> <h1 data-astro-cid-v7lftu2i>Location & Contact</h1> <div class="contact-grid" data-astro-cid-v7lftu2i> <div class="contact-info" data-astro-cid-v7lftu2i> <h2 data-astro-cid-v7lftu2i>Information</h2> <p data-astro-cid-v7lftu2i><strong data-astro-cid-v7lftu2i>Address:</strong> <br data-astro-cid-v7lftu2i> C. de Sof\xEDa, 177i, San Blas-Canillejas, 28022 Madrid</p> <p data-astro-cid-v7lftu2i><strong data-astro-cid-v7lftu2i>Phone:</strong> <br data-astro-cid-v7lftu2i> <a href="tel:+34677063060" data-astro-cid-v7lftu2i>677 06 30 60</a></p> <p data-astro-cid-v7lftu2i><strong data-astro-cid-v7lftu2i>Email:</strong> <br data-astro-cid-v7lftu2i> <a href="mailto:hola@baconlove.es" data-astro-cid-v7lftu2i>hola@baconlove.es</a></p> <div class="hours" data-astro-cid-v7lftu2i> <h3 data-astro-cid-v7lftu2i>Hours</h3> <p data-astro-cid-v7lftu2i>Monday - Sunday: 13:00 - 23:00</p> </div> </div> <div class="map-container" data-astro-cid-v7lftu2i> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.5772477383066!2d-3.603192623966567!3d40.42373797143896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f9ec6c35b8b%3A0x1c8b3f8f1a8e1b0!2sC.%20de%20Sof%C3%ADa%2C%20177%2C%20San%20Blas-Canillejas%2C%2028022%20Madrid!5e0!3m2!1ses!2ses!4v1709220000000!5m2!1ses!2ses" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Location Map of Bacon Love in Madrid" data-astro-cid-v7lftu2i>
          </iframe> <div class="location-details" style="margin-top: 20px; color: rgba(243, 238, 238, 0.8);" data-astro-cid-v7lftu2i> <h2 style="font-family: 'stella'; color: #ffd700; font-size: 1.5rem; margin-bottom: 10px;" data-astro-cid-v7lftu2i>How to Get Here</h2> <p style="font-family: 'jost'; line-height: 1.6;" data-astro-cid-v7lftu2i>
We are located in the heart of Las Rosas, easily accessible for you to come and enjoy. 
              If you are coming from <strong data-astro-cid-v7lftu2i>Moratalaz</strong>, <strong data-astro-cid-v7lftu2i>Vic\xE1lvaro</strong>, or <strong data-astro-cid-v7lftu2i>Coslada</strong>, you will arrive in just a few minutes by car or public transport. 
              We look forward to offering you the best Bar & Grill experience in the area!
</p> </div> </div> </div> </div> </main> `])), unescapeHTML(JSON.stringify(schema)), maybeRenderHead()) })} `;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/contact.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/en/contact.astro";
const $$url = "/en/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
