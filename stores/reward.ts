import Api from "~/lib/api";
import type Reward from "~/lib/api/models/reward.model";
import type { LoadingState, PaginateState } from "./types";

type RewardState = LoadingState & PaginateState;

const rewardAdapter = createEntityAdapter<Reward>({
  getSelectorId: (reward) => reward.id,
  sortBy(a, b) {
    return a.is_unlocked == b.is_unlocked ? 0 : a.is_unlocked ? -1 : 1;
  },
});

export const useRewardStore = defineStore("Reward", {
  state: () =>
    rewardAdapter.getInitialState<RewardState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    async getRewards() {
      return reducer(Api.instance.rewardProvider.list())
        .addCase(PromiseStatus.pending, () => {
          this.state = "pending";
        })
        .addCase(PromiseStatus.rejected, () => {
          this.state = "failed";
        })
        .addCase(PromiseStatus.resolved, ({ data }) => {
          this.state = "success";
          this.count = data.count;
          this.next = data.next;
          this.previous = data.previous;
          rewardAdapter.setMany(this, data.results);
        })
        .execute();
    },
  },
  getters: {
    rewards: (state) => rewardAdapter.getSelector(state).selectAll(),
    isLoading: (state) => ["idle", "pending"].includes(state.state),
  },
});
