import Api from "~/lib/api";
import type Thread from "~/lib/api/models/thread.model";
import type Comment from "~/lib/api/models/comment.model";

import type { PaginateState, LoadingState } from "./types";

const threadAdapter = createEntityAdapter<Thread>({
  getSelectorId: (instance) => instance.id,
  sortBy: (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
});

type ThreadState = {} & PaginateState & LoadingState;

export const useThreadStore = defineStore("thread", {
  state: () =>
    threadAdapter.getInitialState<ThreadState>({
      count: 0,
      next: null,
      previous: null,
      state: "idle",
    }),
  actions: {
    fetchThreads(query: Record<string, string>) {
      return reducer(
        Api.instance.threadProvider.list({
          query,
        })
      )
        .addCase(PromiseStatus.pending, () => {
          this.state = "pending";
        })
        .addCase(PromiseStatus.rejected, () => {
          this.state = "failed";
        })
        .addCase(PromiseStatus.resolved, ({ data }) => {
          this.state = "success";
          this.next = data.next;
          this.count = data.count;
          this.previous = data.previous;

          threadAdapter.setMany(
            this,
            data.results.map((result) => {
              /// Make state manager trigger change when update
              /// Pinia use proxy which mask each properties
              /// We need to make sure these key exist for pinia to mask it
              result.subThread = {
                count: 0,
                next: null,
                previous: null,
                replies: [],
              };

              return result;
            })
          );
        })
        .execute();
    },
    async fetchReplies(
      thread: Thread,
      url?: string,
      query?: Record<string, string>
    ) {
      const { data } = await Api.instance.replyProvider.list({
        url,
        query: Object.assign(
          {
            parent: thread.comment.id,
          },
          query
        ),
      });

      thread.subThread.count = data.count;
      thread.subThread.next = data.next;
      thread.subThread.previous = data.previous;

      if (url)
        thread.subThread.replies = thread.subThread.replies.concat(
          data.results
        );
      else thread.subThread.replies = data.results;
    },
    async updateComment(comment: Comment, body: Record<string, any>) {
      const { data } = await Api.instance.commentProvider.update({
        path: comment.id,
        data: body,
      });

      Object.assign(comment, data);
    },
    async createComment(comment: Record<string, any>, parent: Thread | null) {
      if (parent) {
        const { data } = await Api.instance.replyProvider.create({
          data: {
            comment,
            parent: parent.comment.id,
          },
        });

        parent.subThread.replies.push(data);

        return data;
      }

      const { data } = await Api.instance.threadProvider.create({
        data: {
          comment,
          reference: comment.reference,
        },
      });

      data.subThread = {
        count: 0,
        next: null,
        previous: null,
        replies: [],
      };

      threadAdapter.addOne(this, data);

      return data;
    },
  },
  getters: {
    isLoading: (state) => ["idle", "pending"].includes(state.state),
    threads: (state) => threadAdapter.getSelector(state).selectAll(),
  },
});
