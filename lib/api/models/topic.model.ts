import type ID from "./_id.model";
import type Timestamp from "./_timestamp.model";
import type TopicQuestion from "./topic_question.model";

type Topic = {
    title: string;
    description?: string;
    content: string;
    is_liked: boolean;
    is_completed: boolean;
    is_unlocked: boolean;
    thread_count: number;
    thread_reference: string;
    topic_questions: TopicQuestion[];
} & ID & Timestamp;

export default Topic;
