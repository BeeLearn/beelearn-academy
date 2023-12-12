import Api from "~/lib/api";

export default defineNuxtPlugin(async () => {
  const accessToken = useCookie("accessToken");
  const config = useRuntimeConfig();

  if (accessToken.value) {
    Api.accessToken = accessToken.value;
  } else window.location.replace(config.public.authBaseUrl + '?redirect=' + window.location.href);
});
