import Client from "djira-client";

import e from '~/lib/e';
import type Streak from "~/lib/api/models/streak.model";
import type Notification from "~/lib/api/models/notification.model";

export default defineNuxtPlugin(() => {
  const client = new Client("http://localhost:8000", {
    auth: {
      token: "deef201a44a705fadf794a884685d25c705daaa9",
    },
  });

  client.socket.on("connect", async () => {
    client.subscribe<Streak>(
      { event: "streaks" },
      {
        onSuccess(response) {
          const streakStore = useStreakStore();
          streakStore.setOne(response.data);

          const snackbar = useSnackbar();

          if (response.data.is_today && response.data.is_complete) {
            snackbar.show(
              e("span", {
                className: "i-mdi:fire text-4xl text-green-500",
              }),
              e("div", {
                textContent: "You achieved a new streak. Way to go!",
              })
            );
          }
        },
      }
    );

    client.subscribe<{ unread: number; notification: Notification }>(
      { event: "notifications" },
      {
        onSuccess(response) {
          const notificationStore = useNotificationStore();
          const userStore = useUserStore();
          if (userStore.user)
            userStore.user.unread_notifications = response.data.unread;

          if (response.action === "added") {
            notificationStore.addOne(response.data.notification);
          } else if (response.action === "delete") {
            notificationStore.removeOne(response.data.notification.id);
          }
        }
      }
    );
  });
});
