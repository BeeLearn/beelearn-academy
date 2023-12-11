import Api from "~/lib/api";
import type Course from "~/lib/api/models/course.model";
import type { PaginateState, LoadingState } from "./types";

type CourseInProgressState = PaginateState & LoadingState;

const courseAdapter = createEntityAdapter<Course>({
  getSelectorId: (course) => course.id,
  sortBy: (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at),
});

export const useCourseInProgressStore = defineStore("courseInProgress", {
  state: () =>
    courseAdapter.getInitialState<CourseInProgressState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    async getInProgress() {
      const { user } = useUserStore();

      return reducer(
        Api.instance.courseProvider.list({
          query: {
            course_enrolled_users: user!.id,
            'course_complete_users!': user!.id,
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
    removeOne(id: number) {
      return courseAdapter.removeOne(this, id);
    },
    setOne(course: Course) {
      return courseAdapter.setOne(this, course);
    },
  },
  getters: {
    courses: (state) => courseAdapter.getSelector(state).selectAll(),
    isLoading: (state) => ["idle", "pending"].includes(state.state),
  },
});
