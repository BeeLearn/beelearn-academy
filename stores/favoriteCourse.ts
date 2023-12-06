import Api from "~/lib/api";
import type Course from "~/lib/api/models/course.model";

import type { PaginateState, LoadingState } from "./types";

const favoriteCourseAdapter = createEntityAdapter<Course>({
  getSelectorId: (instance) => instance.id,
  sortBy: (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at),
});

type FavoriteCourseState = {} & PaginateState & LoadingState;

export const useFavoriteCourseStore = defineStore("favorite", {
  state: () =>
    favoriteCourseAdapter.getInitialState<FavoriteCourseState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    fetchFavoriteCourses() {
      const { user } = useUserStore();

      return reducer(
        Api.instance.courseProvider.list({
          query: {
            modules__lessons__topics__likes: user!.id,
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
          this.next = data.next;
          this.count = data.count;
          this.previous = data.previous;

          favoriteCourseAdapter.setMany(this, data.results);
        })
        .execute();
    },
    async fetchNextFavoriteCourses() {
      if (!this.next) return;

      const { data } = await Api.instance.courseProvider.list({
        url: this.next,
      });
      this.next = data.next;
      this.previous = data.previous;
      favoriteCourseAdapter.addMany(this, data.results);
    },
  },
  getters: {
    isLoading: (state) => ["idle", "pending"].includes(state.state),
    favoriteCourses: (state) =>
      favoriteCourseAdapter.getSelector(state).selectAll(),
  },
});
