import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_zcacHMZh.mjs';
import { manifest } from './manifest_D86y15_K.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/api/appointments/availability.astro.mjs');
const _page5 = () => import('./pages/api/appointments/_id_.astro.mjs');
const _page6 = () => import('./pages/api/appointments.astro.mjs');
const _page7 = () => import('./pages/api/auth/login.astro.mjs');
const _page8 = () => import('./pages/api/auth/logout.astro.mjs');
const _page9 = () => import('./pages/api/auth/me.astro.mjs');
const _page10 = () => import('./pages/api/closed-dates/_id_.astro.mjs');
const _page11 = () => import('./pages/api/closed-dates.astro.mjs');
const _page12 = () => import('./pages/api/settings.astro.mjs');
const _page13 = () => import('./pages/en/about.astro.mjs');
const _page14 = () => import('./pages/en/appointments.astro.mjs');
const _page15 = () => import('./pages/en/contact.astro.mjs');
const _page16 = () => import('./pages/en/menu.astro.mjs');
const _page17 = () => import('./pages/en.astro.mjs');
const _page18 = () => import('./pages/es/carta.astro.mjs');
const _page19 = () => import('./pages/es/citas.astro.mjs');
const _page20 = () => import('./pages/es/contacto.astro.mjs');
const _page21 = () => import('./pages/es/nosotros.astro.mjs');
const _page22 = () => import('./pages/es.astro.mjs');
const _page23 = () => import('./pages/_lang_/plato/_slug_.astro.mjs');
const _page24 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/api/appointments/availability.ts", _page4],
    ["src/pages/api/appointments/[id].ts", _page5],
    ["src/pages/api/appointments/index.ts", _page6],
    ["src/pages/api/auth/login.ts", _page7],
    ["src/pages/api/auth/logout.ts", _page8],
    ["src/pages/api/auth/me.ts", _page9],
    ["src/pages/api/closed-dates/[id].ts", _page10],
    ["src/pages/api/closed-dates/index.ts", _page11],
    ["src/pages/api/settings/index.ts", _page12],
    ["src/pages/en/about.astro", _page13],
    ["src/pages/en/appointments.astro", _page14],
    ["src/pages/en/contact.astro", _page15],
    ["src/pages/en/menu.astro", _page16],
    ["src/pages/en/index.astro", _page17],
    ["src/pages/es/carta.astro", _page18],
    ["src/pages/es/citas.astro", _page19],
    ["src/pages/es/contacto.astro", _page20],
    ["src/pages/es/nosotros.astro", _page21],
    ["src/pages/es/index.astro", _page22],
    ["src/pages/[lang]/plato/[slug].astro", _page23],
    ["src/pages/index.astro", _page24]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0e6df4b6-bf76-41ed-864b-18336850ecb2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
