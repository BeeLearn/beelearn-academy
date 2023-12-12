import type Lesson from "./lesson.model";
import type Module from "./module.model";
import type ModuleBreadcrumb from "./module_breadcrumb.model";

export default interface TopicBreadcrumb extends ModuleBreadcrumb {
  module: Pick<Module, "id" | "name">;
  lesson: Pick<Lesson, "id" | "name" | "is_completed">;
}
