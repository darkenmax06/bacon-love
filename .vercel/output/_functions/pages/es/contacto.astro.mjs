import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BeU4Xodg.mjs';
import { e as es } from '../../chunks/es_MVWlAjRS.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Contacto = createComponent(($$result, $$props, $$slots) => {
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
    es: "/es/contacto",
    en: "/en/contact"
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Bacon Love",
    "image": "https://baconlove.es/og.png",
    "description": "Bacon Love: Alta cocina y sabores artesanales en Madrid.",
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
    "servesCuisine": "Hamburguesas, Americana, Grill",
    "priceRange": "$$"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...content.footer, ...content.menu, "languajes": languajes, "title": "Ubicaci\xF3n y Contacto | Bacon Love Madrid (Las Rosas)", "description": "Visita Bacon Love en C. de Sof\xEDa, 177i, San Blas-Canillejas, Madrid. Encuentra nuestros horarios, tel\xE9fono de contacto y mapa para llegar f\xE1cilmente.", "lang": "es", "links": links, "alternateLinks": alternateLinks, "data-astro-cid-slukfhwc": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", `<main class="contact-page" data-astro-cid-slukfhwc> <div class="container" data-astro-cid-slukfhwc> <h1 data-astro-cid-slukfhwc>Ubicaci\xF3n y Contacto</h1> <div class="contact-grid" data-astro-cid-slukfhwc> <div class="contact-info" data-astro-cid-slukfhwc> <h2 data-astro-cid-slukfhwc>Informaci\xF3n</h2> <p data-astro-cid-slukfhwc><strong data-astro-cid-slukfhwc>Direcci\xF3n:</strong> <br data-astro-cid-slukfhwc> C. de Sof\xEDa, 177i, San Blas-Canillejas, 28022 Madrid</p> <p data-astro-cid-slukfhwc><strong data-astro-cid-slukfhwc>Tel\xE9fono:</strong> <br data-astro-cid-slukfhwc> <a href="tel:+34677063060" data-astro-cid-slukfhwc>677 06 30 60</a></p> <p data-astro-cid-slukfhwc><strong data-astro-cid-slukfhwc>Email:</strong> <br data-astro-cid-slukfhwc> <a href="mailto:hola@baconlove.es" data-astro-cid-slukfhwc>hola@baconlove.es</a></p> <div class="hours" data-astro-cid-slukfhwc> <h3 data-astro-cid-slukfhwc>Horario</h3> <p data-astro-cid-slukfhwc>Lunes - Domingo: 13:00 - 23:00</p> </div> </div> <div class="map-container" data-astro-cid-slukfhwc> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.5772477383066!2d-3.603192623966567!3d40.42373797143896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f9ec6c35b8b%3A0x1c8b3f8f1a8e1b0!2sC.%20de%20Sof%C3%ADa%2C%20177%2C%20San%20Blas-Canillejas%2C%2028022%20Madrid!5e0!3m2!1ses!2ses!4v1709220000000!5m2!1ses!2ses" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de ubicaci\xF3n de Bacon Love en Madrid" data-astro-cid-slukfhwc>
          </iframe> <div class="location-details" style="margin-top: 20px; color: rgba(243, 238, 238, 0.8);" data-astro-cid-slukfhwc> <h2 style="font-family: 'jost', sans-serif; color: #ffd700; font-size: 1.5rem; margin-bottom: 10px; font-weight: 700;" data-astro-cid-slukfhwc>C\xF3mo Llegar</h2> <p style="font-family: 'jost'; line-height: 1.6;" data-astro-cid-slukfhwc>
Estamos ubicados en el coraz\xF3n de Las Rosas, perfectamente comunicados para que vengas a disfrutar. 
              Si vienes desde <strong data-astro-cid-slukfhwc>Moratalaz</strong>, <strong data-astro-cid-slukfhwc>Vic\xE1lvaro</strong> o <strong data-astro-cid-slukfhwc>Coslada</strong>, llegar\xE1s en pocos minutos en coche o transporte p\xFAblico. 
              \xA1Te esperamos para ofrecerte la mejor experiencia Bar & Grill de la zona!
</p> </div> </div> </div> </div> </main> `])), unescapeHTML(JSON.stringify(schema)), maybeRenderHead()) })} `;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/contacto.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/es/contacto.astro";
const $$url = "/es/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacto,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
