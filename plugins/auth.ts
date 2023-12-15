export default defineNuxtPlugin(async () => {
  const accessToken = useCookie("accessToken");
  const config = useRuntimeConfig();

  if (!accessToken.value)
    window.location.replace(
      config.public.authBaseUrl + "?redirect=" + window.location.href
    );
});
