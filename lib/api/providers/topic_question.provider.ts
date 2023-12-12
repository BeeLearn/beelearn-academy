import type TopicQuestion from "../models/topic_question.model";
import ApiProvider from "./api.provider";

export default class TopicQuestionProvider extends ApiProvider<TopicQuestion> {
  protected apiPath: string = "/api/catalogue/topic-questions/";
}
