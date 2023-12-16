import Client from "djira-client";

import e from "~/lib/e";
import type Streak from "~/lib/api/models/streak.model";
import type Course from "~/lib/api/models/course.model";
import type Module from "~/lib/api/models/module.model";
import type Lesson from "~/lib/api/models/lesson.model";
import type Notification from "~/lib/api/models/notification.model";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const accessToken = useCookie("accessToken", {
    domain: config.public.rootDomain,
  });

  if (!accessToken.value) return;

  const client = new Client(config.public.apiBaseUrl, {
    auth: {
      token: accessToken.value,
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

          if (response.type === "added") {
            notificationStore.addOne(response.data.notification);
          } else if (response.type === "removed") {
            notificationStore.removeOne(response.data.notification.id);
          }
        },
      }
    );

    client.subscribe<Course>(
      { event: "courses" },
      {
        onSuccess(response) {
          const course = response.data;
          const courseInProgress = useCourseInProgressStore();
          const courseCompleted = useCourseCompletedStore();

          if (course.is_completed) {
            // course.is_completed && course.is_enrolled
            courseInProgress.removeOne(course.id);
            courseCompleted.setOne(course);
          } else if (course.is_enrolled) {
            // course.is_enrolled
            courseInProgress.setOne(course);
          }
        },
      }
    );

    client.subscribe<Module>(
      { event: "modules" },
      {
        onSuccess(response) {
          const module = response.data;
          const moduleStore = useModuleStore();
          moduleStore.updateOne({ id: module.id, changes: module });
        },
      }
    );

    client.subscribe<Course>(
      { event: "favorites" },
      {
        onSuccess(response) {
          const course = response.data;
          const favoriteStore = useFavoriteCourseStore();

          if (response.type === "modified") {
            favoriteStore.addOne(course);
          } else if (response.type === "removed") {
            favoriteStore.removeOne(course.id);
          }
        },
      }
    );

    client.subscribe<Lesson>(
      { event: "lessons" },
      {
        onSuccess(response) {
          const lesson = response.data;
          const moduleStore = useModuleStore();
          moduleStore.updateLessons(lesson.module_id, lesson);
        },
      }
    );
  });
});
