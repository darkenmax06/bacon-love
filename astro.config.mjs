// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false, // Esto obliga a que siempre aparezca /es/
      fallbackType: "rewrite", // Esto es lo que está creando la página que ves
    },
  },
});
