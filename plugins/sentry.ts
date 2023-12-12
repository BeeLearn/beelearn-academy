import {
  init,
  BrowserTracing,
  vueRouterInstrumentation,
  Replay,
  createTracingMixins,
  attachErrorHandler,
} from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const config = useRuntimeConfig();

  init({
    app: nuxtApp.vueApp,
    dsn: config.public.sentryDns,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: vueRouterInstrumentation(router),
      }),
      new Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  nuxtApp.vueApp.mixin(
    createTracingMixins({
      trackComponents: true,
      timeout: 2000,
      hooks: ["activate", "mount", "update"],
    })
  );
  
  attachErrorHandler(nuxtApp.vueApp, {
    logErrors: false,
    attachProps: true,
    trackComponents: true,
    timeout: 2000,
    hooks: ["activate", "mount", "update"],
  });
});
