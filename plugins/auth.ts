import Api from "~/lib/api";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const accessToken = useCookie("accessToken", {
    domain: config.public.rootDomain,
});
  
  if (accessToken.value) {
    Api.accessToken = accessToken.value;
  } else window.location.replace(config.public.authBaseUrl + '?redirect=' + window.location.href);
});
