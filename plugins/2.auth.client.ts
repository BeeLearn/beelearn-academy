import Api from "~/lib/api";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  if (!Api.accessToken.value)
    window.location.replace(
      config.public.authBaseUrl + "?redirect=" + window.location.href
    );
});
