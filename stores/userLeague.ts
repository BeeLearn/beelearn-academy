import Api from "~/lib/api";
import type UserLeague from "~/lib/api/models/user_league.model";

import type { PaginateState, LoadingState } from "./types";

const userLeagueAdapter = createEntityAdapter<UserLeague>({
  getSelectorId: (instance) => instance.id,
  sortBy: (a, b) => a.xp - b.xp,
});

type UserLeagueState = {} & PaginateState & LoadingState;

export const useUserLeagueStore = defineStore("userLeague", {
  state: () =>
    userLeagueAdapter.getInitialState<UserLeagueState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    fetchUserLeagues(query: Record<string, any>) {
      return reducer(
        Api.instance.userLeagueProvider.list({
          query,
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
          this.next = data.next;
          this.count = data.count;
          this.previous = data.previous;

          userLeagueAdapter.setMany(this, data.results);
        })
        .execute();
    },
  },
  getters: {
    isLoading: (state) => ["idle", "pending"].includes(state.state),
    userLeagues: (state) => userLeagueAdapter.getSelector(state).selectAll(),
  },
});
