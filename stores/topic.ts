import Api from "~/lib/api";
import type Topic from "~/lib/api/models/topic.model";
import type TopicQuestion from "~/lib/api/models/topic_question.model";
import type TopicBreadcrumb from "~/lib/api/models/topic_breadcrumb.model";

import type { LoadingState, PaginateState } from "./types";

type TopicState = {
  breadcrumb: TopicBreadcrumb | null;
} & LoadingState &
  PaginateState;

const topicAdapter = createEntityAdapter<Topic>({
  getSelectorId: (topic) => topic.id,
  sortBy: (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at),
});

export const useTopicStore = defineStore("topic", {
  state: () =>
    topicAdapter.getInitialState<TopicState>({
      state: "idle",
      count: 0,
      next: null,
      previous: null,
      breadcrumb: null,
    }),
  actions: {
    getTopics(lessonId: string) {
      return reducer(
        Api.instance.topicProvider.list({
          query: {
            lesson: lessonId,
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
          const { response, breadcrumb } = data;
          this.state = "success";
          this.count = response.count;
          this.next = response.next;
          this.previous = response.previous;
          this.breadcrumb = breadcrumb;

          topicAdapter.setMany(this, response.results);
        })
        .execute();
    },
    async updateTopic(topic: Topic, data: Record<string, any>) {
      const response = await Api.instance.topicProvider.update({
        path: topic.id,
        data,
      });

      topicAdapter.updateOne(this, { id: topic.id, changes: response.data });
    },
    async updateTopicQuestion(
      topicQuestion: TopicQuestion,
      data: Record<string, any>
    ) {
      const response = await Api.instance.topicQuestionProvider.update({
        data: data,
        path: topicQuestion.id,
      });

      this.setTopicQuestion(topicQuestion.topic!, response.data);
    },
    setTopicQuestion(topic: Topic, topicQuestion: TopicQuestion) {
      const index = topic.topic_questions.findIndex(
        (element) => element.id === topicQuestion.id
      );

      if (index > -1) {
        topic.topic_questions[index] = topicQuestion;
        topicAdapter.setOne(this, topic);
      }
    },
  },
  getters: {
    isLoading: (state) => ["idle", "pending"].includes(state.state),
    topics: (state) => topicAdapter.getSelector(state).selectAll(),
  },
});
