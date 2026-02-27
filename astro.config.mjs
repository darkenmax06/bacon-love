// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://baconlove.es",
  output: 'server', // Para soportar API endpoints y SSR
  adapter: vercel(),
  integrations: [
    sitemap({
      // SSR pages (citas/appointments) need to be added manually
      // since they use prerender: false and are excluded from auto-detection
      customPages: [
        "https://baconlove.es/es/citas",
        "https://baconlove.es/en/appointments",
      ],
      // Priority mapping for all routes
      serialize(item) {
        // ES routes — primary SEO focus
        if (item.url === "https://baconlove.es/es/") return { ...item, priority: 1.0 };
        if (item.url === "https://baconlove.es/es/carta") return { ...item, priority: 0.9 };
        if (item.url === "https://baconlove.es/es/contacto") return { ...item, priority: 0.8 };
        if (item.url === "https://baconlove.es/es/nosotros") return { ...item, priority: 0.7 };
        if (item.url === "https://baconlove.es/es/citas") return { ...item, priority: 0.7 };
        // EN routes — secondary
        if (item.url === "https://baconlove.es/en/") return { ...item, priority: 0.5 };
        if (item.url === "https://baconlove.es/en/menu") return { ...item, priority: 0.4 };
        if (item.url === "https://baconlove.es/en/about") return { ...item, priority: 0.3 };
        if (item.url === "https://baconlove.es/en/contact") return { ...item, priority: 0.3 };
        if (item.url === "https://baconlove.es/en/appointments") return { ...item, priority: 0.3 };
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true, // Esto nos permite tener rutas explícitas como /es/ y /en/ sin conflictos
      fallbackType: "redirect", // Cambiamos a redirect para que / redirija a /es/ si es necesario
    },
  },
});
