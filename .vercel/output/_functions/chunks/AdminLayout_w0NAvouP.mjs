import { c as createComponent, d as createAstro, e as addAttribute, f as renderHead, b as renderScript, g as renderSlot, a as renderTemplate } from './astro/server_BB4gczNh.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */
/* empty css                             */

const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const {
    title = "Bacon Love Admin",
    description = "Panel de administraci\xF3n",
    variant = "dashboard"
    // "dashboard" | "login"
  } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/a.png"><meta name="viewport" content="width=device-width"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="robots" content="noindex, nofollow">${renderHead()}</head> <body${addAttribute(`admin-body admin-body--${variant}`, "class")}> ${variant === "dashboard" ? renderTemplate`<div class="admin-layout"> <!-- Sidebar --> <aside class="admin-sidebar" id="adminSidebar"> <div class="sidebar__top"> <a href="/es/" class="sidebar__logo"> <img src="/logo.png" alt="Bacon Love"> </a> <span class="sidebar__badge">Admin</span> </div> <nav class="sidebar__nav"> <span class="sidebar__nav-label">Navegacion</span> <a href="#" class="sidebar__nav-item active" data-admin-tab="appointments"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> <line x1="16" y1="2" x2="16" y2="6"></line> <line x1="8" y1="2" x2="8" y2="6"></line> <line x1="3" y1="10" x2="21" y2="10"></line> </svg>
Reservas
</a> <a href="#" class="sidebar__nav-item" data-admin-tab="settings"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="3"></circle> <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path> </svg>
Configuracion
</a> <a href="#" class="sidebar__nav-item" data-admin-tab="help"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle> <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path> <line x1="12" y1="17" x2="12.01" y2="17"></line> </svg>
Ayuda
</a> </nav> <div class="sidebar__footer"> <a href="/es/" class="sidebar__site-link"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> <polyline points="9 22 9 12 15 12 15 22"></polyline> </svg>
Ver sitio
</a> <button id="adminLogoutBtn" class="sidebar__logout-btn"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" y1="12" x2="9" y2="12"></line> </svg>
Cerrar sesion
</button> </div> </aside> <!-- Mobile topbar --> <div class="admin-topbar"> <div class="topbar__left"> <button class="topbar__menu-btn" id="topbarMenuBtn" aria-label="Abrir menú"> <span></span> <span></span> <span></span> </button> <a href="/es/" class="topbar__logo"> <img src="/logo.png" alt="Bacon Love"> </a> <span class="topbar__badge">Admin</span> </div> <a href="/es/" class="topbar__site-link">← Sitio</a> </div> <!-- Overlay for mobile sidebar --> <div class="sidebar__overlay" id="sidebarOverlay"></div> <!-- Main content --> <main class="admin-main"> ${renderSlot($$result, $$slots["default"])} </main> </div>` : renderTemplate`<!-- Login layout: centered, no sidebar -->
      <div class="admin-login-shell"> <div class="login-shell__header"> <a href="/es/" class="sidebar__logo login-shell__logo"> <img src="/logo.png" alt="Bacon Love"> </a> <a href="/es/" class="login-shell__back">← Volver al sitio</a> </div> <main class="login-shell__main"> ${renderSlot($$result, $$slots["default"])} </main> </div>`} ${renderScript($$result, "C:/Users/admin/Desktop/baconlove/bacon-love/src/components/admin/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body></html>`;
}, "C:/Users/admin/Desktop/baconlove/bacon-love/src/components/admin/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
