import type ID from "./_id.model";
import type Topic from "./topic.model";
import type QuestionMixin from "./question.model";
import { QuestionContentType } from "./question.model";

type TopicQuestion = {
  topic?: Topic,
  question: QuestionMixin;
  is_answered: boolean;
  question_content_type: keyof typeof QuestionContentType;
} & ID;

export default TopicQuestion;
