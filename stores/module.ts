import Api from "~/lib/api";
import type Module from "~/lib/api/models/module.model";
import type { LoadingState, PaginateState } from "./types";
import type ModuleBreadcrumb from "~/lib/api/models/module_breadcrumb.model";
import type Lesson from "~/lib/api/models/lesson.model";

type ModuleState = {
  breadcrumb: ModuleBreadcrumb | null;
} & LoadingState &
  PaginateState;

const moduleAdapter = createEntityAdapter<Module>({
  getSelectorId: (module) => module.id,
});

export const useModuleStore = defineStore("module", {
  state: () =>
    moduleAdapter.getInitialState<ModuleState>({
      state: "idle",
      count: 0,
      next: null,
      previous: null,
      breadcrumb: null,
    }),
  actions: {
    async getModules(courseId: string) {
      return reducer(
        Api.instance.moduleProvider.list({
          query: {
            course: courseId,
          },
        })
      )
        .addCase(PromiseStatus.pending, () => {})
        .addCase(PromiseStatus.resolved, ({ data }) => {
          const { response, breadcrumb } = data;

          this.state = "success";
          this.count = response.count;
          this.next = response.next;
          this.previous = response.previous;
          this.breadcrumb = breadcrumb;

          moduleAdapter.setMany(this, response.results);
        })
        .addCase(PromiseStatus.rejected, () => {
          this.state = "failed";
        })
        .execute();
    },
    updateOne(data: EntityChangePayload<Module>) {
      return moduleAdapter.updateOne(this, data);
    },
    updateLessons(moduleId: number, lesson: Lesson) {
      const module = moduleAdapter.getSelector(this).selectOne(moduleId);
      if (module) {
        const index = module.lessons.findIndex(
          (element) => element.id === lesson.id
        );

        if (index > -1) {
          module.lessons[index] = lesson;
          moduleAdapter.updateOne(this, {
            id: moduleId,
            changes: { lessons: module.lessons },
          });
        }
      }
    },
  },
  getters: {
    modules: (state) => moduleAdapter.getSelector(state).selectAll(),
  },
});
