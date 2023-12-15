export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const accessToken = useCookie("accessToken", {
    domain: config.public.rootDomain,
  });

  if (!accessToken.value)
    window.location.replace(
      config.public.authBaseUrl + "?redirect=" + window.location.href
    );
});
