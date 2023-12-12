import slider from "vue3-slider";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VCircularSlider", slider);
});
