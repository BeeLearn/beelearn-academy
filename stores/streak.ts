import Api from "~/lib/api";
import type Streak from "~/lib/api/models/streak.model";
import { getMonthStartAndEnd, getWeekStartAndEnd } from "~/lib/date";

import type { LoadingState } from "./types";

const streakAdapter = createEntityAdapter<Streak>({
  getSelectorId: (streak) => streak.id,
  sortBy(a, b) {
    const first = new Date(a.date);
    const second = new Date(b.date);

    return first.getTime() - second.getTime();
  },
});

export const useStreakStore = defineStore("streak", {
  state: () =>
    streakAdapter.getInitialState<LoadingState>({
      state: "idle",
    }),
  actions: {
    async getStreaks() {
      const [monthStart, monthEnd] = getMonthStartAndEnd();
      const range = `${monthStart.toLocaleDateString()},${monthEnd.toLocaleDateString()}`;

      return reducer(
        Api.instance.streakProvider.list({
          query: {
            no_page: true,
            date__range: range,
          },
        })
      )
        .addCase(PromiseStatus.pending, () => {
          this.state = "pending";
        })
        .addCase(PromiseStatus.rejected, () => {
          this.state = "failed";
        })
        .addCase(PromiseStatus.resolved, ({ data }) => {
          this.state = "success";
          streakAdapter.setMany(this, data);
        })
        .execute();
    },
  },
  getters: {
    weeklyStreaks(state) {
      const [weekStart, weekEnd] = getWeekStartAndEnd();

      return streakAdapter
        .getSelector(state)
        .selectAll()
        .filter((streak) => {
          const date = new Date(streak.date);
          return (
            date.getMonth() >= weekStart.getMonth() &&
            date.getDate() >= weekStart.getDate() &&
            date.getFullYear() >= weekStart.getFullYear() &&
            date.getMonth() <= weekEnd.getMonth() &&
            date.getDate() <= weekEnd.getDate() &&
            date.getFullYear() <= weekEnd.getFullYear()
          );
        });
    },
    streaks: (state) => streakAdapter.getSelector(state).selectAll(),
    isLoading: (state) => ["idle", "pending"].includes(state.state),
  },
});
