import Api from "~/lib/api";

export default defineNuxtPlugin(async () => {

  Api.accessToken = "deef201a44a705fadf794a884685d25c705daaa9";
  console.log("Fucking plugin")
  const streakStore = useStreakStore();
  await streakStore.getStreaks().catch(console.log);
});
