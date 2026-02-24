import { c as createComponent, d as createAstro, m as maybeRenderHead, a as renderTemplate, e as addAttribute } from './astro/server_BB4gczNh.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro$1 = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About;
  const { subtitle, title, text1, text2, text3, text4 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="about" id="about"> <div class="container"> <picture class="about__imgbox"> <img src="/tacos.avif" alt="Deliciosos tacos artesanales en Bacon Love Madrid"> </picture> <div class="about__textbox"> <div class="about__titles"> <h3 class="about__subtitle"> ${subtitle} </h3> <h1 class="about__title"> ${title} </h1> </div> <p> ${text1} <br><br> ${text2} <br><br> ${text3} <br><br> ${text4} </p> </div> </div> </section>`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/components/About.astro", void 0);

const $$Astro = createAstro();
const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Testimonials;
  const { testimonials } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="testimonials" id="testimonials"> <div class="container"> <h2 class="testimonials__title"> Testimonios </h2> <div class="testimonials__container"> ${testimonials.map((res) => {
    return renderTemplate`<article class="testimonial"> <div class="testimonial__info"> <img${addAttribute(res.avatar, "src")}${addAttribute(`Avatar de cliente satisfecho: ${res.name}`, "alt")}> <h4 class="testimonial__name"> ${res.name} </h4> </div> <div class="testimonial__stars"> ${new Array(5).fill("a").map((r, i) => {
      return renderTemplate`<svg${addAttribute(i < res.starts ? "star active" : "star", "class")}> <use xlink:href="/sprite.svg#star-icon"></use> </svg>`;
    })} </div> <p> ${res.comment} </p> </article>`;
  })} </div> </div> </section>`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/components/Testimonials.astro", void 0);

export { $$About as $, $$Testimonials as a };
