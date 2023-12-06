import Api from "~/lib/api";
import type Notification from "~/lib/api/models/notification.model";

import type { PaginateState, LoadingState } from "./types";

const notificationAdapter = createEntityAdapter<Notification>({
  getSelectorId: (instance) => instance.id,
	sortBy: (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
});

type NotificationState = {} & PaginateState & LoadingState;

export const useNotificationStore = defineStore("notification", {
  state: () =>
    notificationAdapter.getInitialState<NotificationState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    fetchNotifications() {
      return reducer(Api.instance.notificationProvider.list())
        .addCase(PromiseStatus.pending, () => {
          this.state = "pending";
        })
        .addCase(PromiseStatus.rejected, () => {
          this.state = "failed";
        })
        .addCase(PromiseStatus.resolved, ({ data }) => {
          this.state = "success";
          this.next = data.next;
          this.count = data.count;
          this.previous = data.previous;

          notificationAdapter.setMany(this, data.results);
        })
        .execute();
    },
		async fetchNextNotifications(){
			if(!this.next) return;

			const { data } = await Api.instance.notificationProvider.list({ url: this.next});
			this.next = data.next;
			this.previous = data.previous;
			notificationAdapter.addMany(this, data.results);
		}
  },
  getters: {
    isLoading: (state) => ["idle", "pending"].includes(state.state),
    notifications: (state) =>
      notificationAdapter.getSelector(state).selectAll(),
  },
});
