import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  safelist: [
    "i-mdi:bell",
    "i-mdi:bell-outline",
    "i-mdi:heart",
    "i-mdi:heart-outline",
    "i-mdi:medal",
    "i-mdi:medal-outline",
    "i-mdi:progress-helper",
    "i-tabler:progress-bolt",
    "i-material-symbols:category-outline",
    "i-material-symbols:category",
    "i-material-symbols:fiber-new",
    "i-material-symbols:fiber-new-outline",
    "i-mdi:new-box-outline",
    "i-mdi:check-circle-outline",
    "i-mdi:check-circle",
  ],
  presets: [presetUno(), presetIcons(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
