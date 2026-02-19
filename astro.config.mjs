// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: 'server', // Para soportar API endpoints y SSR
  adapter: vercel(),
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true, // Esto nos permite tener rutas explícitas como /es/ y /en/ sin conflictos
      fallbackType: "redirect", // Cambiamos a redirect para que / redirija a /es/ si es necesario
    },
  },
});
