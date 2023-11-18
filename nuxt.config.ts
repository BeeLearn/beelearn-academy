import type { FirebaseOptions } from "firebase/app";

export default defineNuxtConfig({
  ssr: false,
  extends: "@nuxt-themes/typography",
  devtools: { enabled: true },
  css: [
    "@unocss/reset/tailwind.css",
    "v-calendar/style.css",
    "~/assets/css/font.css",
    "~/global.css",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  modules: [
    "@unocss/nuxt",
    "@nuxt/content",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    public: {
      iosBundleId: "",
      androidPackageName: "",
      firebaseConfig: {} as FirebaseOptions,
    },
  },
  googleFonts: {
    families: {
      "Albert+Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Noto+Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    base64: true,
    outputDir: "assets",
    fontsDir: "fonts",
    stylePath: "css/font.css",
  },
  content: {
    highlight: {
      theme: "github-light",
    },
  },
  components: [{ path: "~/components" }, { path: "~/components/widgets" }],
});
