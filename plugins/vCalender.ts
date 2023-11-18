import { setupCalendar, Calendar, DatePicker } from "v-calendar";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VCalender", Calendar);
});
