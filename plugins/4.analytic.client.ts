import {
  getAnalytics,
  setUserId,
  setUserProperties,
  logEvent,
} from "firebase/analytics";

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();
  const analytics = getAnalytics();

  userStore.$subscribe((_, state) => {
    if (state.user) {
      setUserId(analytics, state.user.uid);
      setUserProperties(analytics, {
        userId: state.user.id,
        email: state.user.email,
        username: state.user.username,
        user_type: state.user.user_type,
        last_name: state.user.last_name,
        first_name: state.user.first_name,
        is_premium: state.user.is_premium,
        categories: state.user.categories,
      });
    }
  });

  return {
    provide: {
      logEvent,
    },
  };
});
