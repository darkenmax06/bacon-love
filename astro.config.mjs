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
      prefixDefaultLocale: false, // Esto obliga a que siempre aparezca /es/
      fallbackType: "rewrite", // Esto es lo que está creando la página que ves
    },
  },
});
