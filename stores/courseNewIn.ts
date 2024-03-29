import Api from "~/lib/api";
import type Course from "~/lib/api/models/course.model";
import type { PaginateState, LoadingState } from "./types";

type CourseNewInState = PaginateState & LoadingState;

const courseAdapter = createEntityAdapter<Course>({
  getSelectorId: (course) => course.id,
  sortBy: (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at),
});

export const useCourseNewInStore = defineStore("courseNewIn", {
  state: () =>
    courseAdapter.getInitialState<CourseNewInState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    async getNewIn() {
      const today = new Date(Date.now() + 60 * 60 * 24 * 1000);
      const sevenDaysAgo = new Date(Date.now() - 7 * 60 * 60 * 24 * 1000);

      const range = `${sevenDaysAgo.toLocaleDateString()},${today.toLocaleDateString()}`;

      return reducer(
        Api.instance.courseProvider.list({
          query: {
            created_at__range: range,
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
          this.count = data.count;
          this.next = data.next;
          this.previous = data.previous;
          courseAdapter.setMany(this, data.results);
        })
        .execute();
    },
  },
  getters: {
    courses: (state) => courseAdapter.getSelector(state).selectAll(),
    isLoading: (state) => ["idle", "pending"].includes(state.state),
  },
});
