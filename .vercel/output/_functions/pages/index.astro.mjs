import { c as createComponent, f as renderHead, b as renderScript, a as renderTemplate } from '../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=/es/"><link rel="canonical" href="/es/"><title>Bacon Love</title>${renderHead()}</head> <body> ${renderScript($$result, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/index.astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
