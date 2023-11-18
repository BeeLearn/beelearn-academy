import { initializeApp, type FirebaseOptions } from "firebase/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const firebaseConfig: FirebaseOptions = config.public.firebaseConfig;
  
  initializeApp(firebaseConfig);
});
