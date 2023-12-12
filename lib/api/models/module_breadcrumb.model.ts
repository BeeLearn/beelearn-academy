import type Course from "./course.model";

export default interface ModuleBreadcrumb {
    course: Pick<Course, "id" | "name" | "description" | "illustration">,
}
