import { c as createComponent, d as createAstro, m as maybeRenderHead, e as addAttribute, b as renderScript, a as renderTemplate, f as renderHead, r as renderComponent, g as renderSlot } from './astro/server_BB4gczNh.mjs';
import 'piccolore';
/* empty css                          */
import 'clsx';
/* empty css                          */

const $$Astro$2 = createAstro();
const $$Menu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Menu;
  const {
    home,
    about,
    testimonials,
    menu,
    appointments,
    orderLink,
    languajes,
    links,
    lang,
    alternateLinks
  } = Astro2.props;
  const currentLang = lang || Astro2.params.lang || "es";
  const getLink = (key) => {
    if (links && links[key]) return links[key];
    const base = `/${currentLang}`;
    if (key === "home") return `${base}/#hero`;
    if (key === "about") return `${base}/#about`;
    if (key === "menu") return `${base}/#platillos`;
    if (key === "testimonials") return `${base}/#testimonials`;
    if (key === "appointments") return `${base}/citas`;
    return `${base}/#`;
  };
  return renderTemplate`${maybeRenderHead()}<header class="menu"> <div class="container"> <a${addAttribute(getLink("home"), "href")} class="menu__logo"> <img src="/logo.png" alt="Bacon Love Logo - Bar & Grill en Madrid"> </a> <div class="menu__right"> <nav> <ul class="menu__list"> <li><a${addAttribute(getLink("home"), "href")}> ${home} </a></li> <li><a${addAttribute(getLink("about"), "href")}> ${about} </a></li> <li><a${addAttribute(getLink("menu"), "href")}> ${menu} </a></li> <li><a${addAttribute(getLink("testimonials"), "href")}> ${testimonials} </a></li> <li><a${addAttribute(getLink("appointments"), "href")}> ${appointments} </a></li> ${links?.contact && renderTemplate`<li><a${addAttribute(links.contact, "href")}> Contacto </a></li>`} <!-- Add Contact if available --> ${orderLink && renderTemplate`<li> <a href="https://pedidos.delitbee.shop/bacon-love" target="_blank" rel="noopener noreferrer" class="nav-order__link"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path> <line x1="3" y1="6" x2="21" y2="6"></line> <path d="M16 10a4 4 0 0 1-8 0"></path> </svg> ${orderLink} </a> </li>`} </ul> </nav> <div class="menu__actions"> <div class="menu__languajes"> <span class="menu__languaje">${currentLang}</span> <ul> ${languajes.map((res) => renderTemplate`<li class="languajes__selectors"> <a${addAttribute(alternateLinks && alternateLinks[res] ? alternateLinks[res] : `/${res}/`, "href")}> ${res} </a> </li>`)} </ul> </div> <button class="menu__btn" aria-label="Toggle Menu"> <span></span> <span></span> <span></span> </button> </div> </div> </div> </header> ${renderScript($$result, "C:/Users/admin/Desktop/baconlove/bacon-love/src/components/Menu.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/components/Menu.astro", void 0);

const $$Astro$1 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const size = 20;
  const { brand, contact, hours, quickLinks, rights } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="container footer__grid" data-astro-cid-sz7xmlte> <!-- Column 1: Brand & SEO --> <div class="footer__col brand-col" data-astro-cid-sz7xmlte> <a href="/" class="footer__logo" data-astro-cid-sz7xmlte> <img src="/logo.png" alt="Bacon Love Logo" width="120" height="auto" data-astro-cid-sz7xmlte> </a> <p class="brand-desc" data-astro-cid-sz7xmlte>${brand?.description}</p> <!-- Social Media (Kept from original) --> <ul class="footer__media" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a target="_blank" rel="noreferrer" aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61584836737450" data-astro-cid-sz7xmlte> <svg${addAttribute(size, "width")}${addAttribute(size, "height")} data-astro-cid-sz7xmlte> <use xlink:href="/sprite.svg#facebook-icon" data-astro-cid-sz7xmlte></use> </svg> </a> </li> <li data-astro-cid-sz7xmlte> <a target="_blank" rel="noreferrer" aria-label="Instagram" href="https://www.instagram.com/baconlove.es/" data-astro-cid-sz7xmlte> <svg${addAttribute(size, "width")}${addAttribute(size, "height")} data-astro-cid-sz7xmlte> <use xlink:href="/sprite.svg#instagram-icon" data-astro-cid-sz7xmlte></use> </svg> </a> </li> <li data-astro-cid-sz7xmlte> <a target="_blank" rel="noreferrer" aria-label="X / Twitter" href="https://x.com/EsBaconLove" data-astro-cid-sz7xmlte> <svg${addAttribute(size, "width")}${addAttribute(size, "height")} data-astro-cid-sz7xmlte> <use xlink:href="/sprite.svg#x-icon" data-astro-cid-sz7xmlte></use> </svg> </a> </li> <li data-astro-cid-sz7xmlte> <a target="_blank" rel="noreferrer" aria-label="TikTok" href="https://www.tiktok.com/@es.baconlove" data-astro-cid-sz7xmlte> <svg${addAttribute(size, "width")}${addAttribute(size, "height")} data-astro-cid-sz7xmlte> <use xlink:href="/sprite.svg#tiktok-icon" data-astro-cid-sz7xmlte></use> </svg> </a> </li> <li data-astro-cid-sz7xmlte> <a target="_blank" rel="noreferrer" aria-label="YouTube" href="https://www.youtube.com/channel/UCYy9GuEjuek-51CRmxHPNiw" data-astro-cid-sz7xmlte> <svg${addAttribute(size, "width")}${addAttribute(size, "height")} data-astro-cid-sz7xmlte> <use xlink:href="/sprite.svg#youtube-icon" data-astro-cid-sz7xmlte></use> </svg> </a> </li> </ul> </div> <!-- Column 2: Contact (NAP) --> <div class="footer__col contact-col" data-astro-cid-sz7xmlte> <h3 class="footer__title" data-astro-cid-sz7xmlte>${contact?.title}</h3> <address class="footer__address" data-astro-cid-sz7xmlte> <p class="address-line" data-astro-cid-sz7xmlte> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" data-astro-cid-sz7xmlte></path><circle cx="12" cy="10" r="3" data-astro-cid-sz7xmlte></circle></svg> <a href="https://maps.app.goo.gl/62kHoXTb3MuFTTqN8" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte> ${contact?.address} </a> </p> <p class="phone-line" data-astro-cid-sz7xmlte> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-sz7xmlte></path></svg> <a${addAttribute(contact?.phoneLink, "href")} class="phone-link" data-astro-cid-sz7xmlte> ${contact?.phone} </a> </p> </address> </div> <!-- Column 3: Hours --> <div class="footer__col hours-col" data-astro-cid-sz7xmlte> <h3 class="footer__title" data-astro-cid-sz7xmlte>${hours?.title}</h3> <ul class="hours-list" data-astro-cid-sz7xmlte> ${hours?.schedule?.map((item) => renderTemplate`<li data-astro-cid-sz7xmlte>${item}</li>`)} </ul> </div> <!-- Column 4: Links --> <div class="footer__col links-col" data-astro-cid-sz7xmlte> <h3 class="footer__title" data-astro-cid-sz7xmlte>${quickLinks?.title}</h3> <nav class="footer__nav" data-astro-cid-sz7xmlte> <ul data-astro-cid-sz7xmlte> ${quickLinks?.items?.map((link) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(link.url, "href")} data-astro-cid-sz7xmlte>${link.label}</a></li>`)} </ul> </nav> </div> </div> <div class="footer__bottom" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <small data-astro-cid-sz7xmlte>${rights}</small> </div> </div> </footer> `;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Bacon Love - Amor al bacon",
    home,
    about,
    testimonials,
    menu,
    appointments,
    orderLink,
    languajes,
    rights,
    address,
    brand,
    contact,
    hours,
    quickLinks,
    // Receives footer quickLinks
    description = "Somos un restaurante emergente que fusiona la alta cocina con platos cotidianos. Descubre una experiencia gastron\xF3mica artesanal \xFAnica.",
    lang = "es",
    // Recibimos el idioma por prop o lo detectamos
    links,
    // Receives the navigation links object
    alternateLinks
    // { es: "/es/...", en: "/en/..." }
  } = Astro2.props;
  const baseUrl = "https://baconlove.es";
  const canonicalURL = new URL(Astro2.url.pathname, baseUrl);
  const path = Astro2.url.pathname.replace(/^\/(es|en)/, "");
  return renderTemplate`<html${addAttribute(lang, "lang")}> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/a.png"><meta name="viewport" content="width=device-width"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><meta name="robots" content="index,follow"><link rel="alternate" hreflang="es"${addAttribute(alternateLinks?.es ? `https://baconlove.es${alternateLinks.es}` : `${baseUrl}/es${path}`, "href")}><link rel="alternate" hreflang="en"${addAttribute(alternateLinks?.en ? `https://baconlove.es${alternateLinks.en}` : `${baseUrl}/en${path}`, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(alternateLinks?.es ? `https://baconlove.es${alternateLinks.es}` : `${baseUrl}/es${path}`, "href")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="https://baconlove.es/og.png"><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(canonicalURL, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image" content="https://baconlove.es/og.png">${renderHead()}</head> <body> ${renderComponent($$result, "Menu", $$Menu, { "languajes": languajes, "home": home, "about": about, "testimonials": testimonials, "menu": menu, "appointments": appointments, "orderLink": orderLink, "links": links, "lang": lang, "alternateLinks": alternateLinks })} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "rights": rights, "address": address, "brand": brand, "contact": contact, "hours": hours, "quickLinks": quickLinks })} </body></html>`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/components/Layout.astro", void 0);

export { $$Layout as $ };
