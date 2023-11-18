import type Lesson from "../models/lesson.model";
import ApiProvider from "./api.provider";

export default class LessonProvider extends ApiProvider<Lesson> {
  protected apiPath: string = "/api/catalogue/lessons/";
}
