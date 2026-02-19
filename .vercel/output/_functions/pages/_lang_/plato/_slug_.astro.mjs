import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../../chunks/astro/server_BB4gczNh.mjs';
import 'piccolore';
import { r as renderEntry, g as getCollection } from '../../../chunks/_astro_content_BAUBG7XN.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_BeU4Xodg.mjs';
/* empty css                                        */
import { e as es } from '../../../chunks/es_MVWlAjRS.mjs';
import { e as en } from '../../../chunks/en_D2ksRItz.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const langs = ["es", "en"];
  const platos = await getCollection("platos");
  let arr = [];
  for (let i = 0; i < langs.length; i++) {
    const currentLang = langs[i];
    for (let j = 0; j < platos.length; j++) {
      const plato = platos[j];
      const params = { lang: currentLang, slug: plato.slug };
      const props = { plato };
      arr.push({ params, props });
    }
  }
  return arr;
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { plato } = Astro2.props;
  Astro2.params.lang;
  const { data: { lang, img, title } } = plato;
  const { Content } = await renderEntry(plato);
  const translations = { en, es };
  const content = translations[lang];
  const languajes = Object.keys(translations);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "languajes": languajes, ...content.footer, "title": title, ...content.menu }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="plato"> <div class="plato__price">
EUR ${plato.data.price} €
</div> <div class="container"> <picure class="plato__imgbox"> <img${addAttribute(`/content/${img}`, "src")} alt=""> </picure> <div class="plato__textbox"> ${renderComponent($$result2, "Content", Content, {})} </div> </div> </section> ` })}`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/[lang]/plato/[slug].astro", void 0);

const $$file = "C:/Users/admin/Desktop/baconlove/bacon-love/src/pages/[lang]/plato/[slug].astro";
const $$url = "/[lang]/plato/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
