import Api from "~/lib/api";
import type Module from "~/lib/api/models/module.model";
import type { LoadingState, PaginateState } from "./types";
import type ModuleBreadcrumb from "~/lib/api/models/module_breadcrumb.model";

type ModuleState = {
  breadcrumb: ModuleBreadcrumb | null,
}  & LoadingState & PaginateState;

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
  },
  getters: {
    modules: (state) => moduleAdapter.getSelector(state).selectAll(),
  },
});
