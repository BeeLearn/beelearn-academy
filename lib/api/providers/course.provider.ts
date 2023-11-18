import type Course from "../models/course.model";
import ApiProvider from "./api.provider";

export default class CourseProvider extends ApiProvider<Course> {
  protected apiPath: string = "/api/catalogue/courses/";
}
