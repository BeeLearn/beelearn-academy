import CircleProgress from "vue3-circle-progress";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component("VCircleProgress", CircleProgress);
});
