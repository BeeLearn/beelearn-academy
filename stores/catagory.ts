import Api from "~/lib/api";
import type Category from "~/lib/api/models/category.model";
import type { PaginateState, LoadingState } from "./types";

type CategoryState = PaginateState & LoadingState;

const categoryAdapter = createEntityAdapter<Category>({
  getSelectorId: (category) => category.id,
  sortBy: (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
});

export const useCategoryStore = defineStore("category", {
  state: () =>
    categoryAdapter.getInitialState<CategoryState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    async getCategories() {
      return reducer(Api.instance.categoryProvider.list())
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
          categoryAdapter.setMany(this, data.results);
        }).execute();
    },
  },
  getters: {
    categories: (state) => categoryAdapter.getSelector(state).selectAll(),
    isLoading: (state) => ["idle", "pending"].includes(state.state),
  },
});
