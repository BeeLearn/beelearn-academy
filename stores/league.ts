import type League from "~/lib/api/models/league.model";

import Api from "~/lib/api";
import type { PaginateState, LoadingState } from "./types";

const leagueAdapter = createEntityAdapter<League>({
  getSelectorId: (instance) => instance.id,
});

type LeagueState = {} & PaginateState & LoadingState;

export const useLeagueStore = defineStore("league", {
  state: () =>
    leagueAdapter.getInitialState<LeagueState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    fetchLeagues() {
      return reducer(Api.instance.leagueProvider.list())
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

          leagueAdapter.setMany(this, data.results);
        })
        .execute();
    },
  },
  getters: {
    isLoading: (state) => ["idle", "pending"].includes(state.state),
    leagues: (state) => leagueAdapter.getSelector(state).selectAll(),
  },
});
