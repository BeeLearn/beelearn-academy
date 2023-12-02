import type { PaginateState } from "@/stores/types";

import type ID from "./_id.model";
import type Timestamp from "./_timestamp.model";
import type Comment from "./comment.model";
import type Reply from "./reply.model";

type Thread = {
  reference: string;
  comment: Comment;
  subThread: {
    replies: Reply[];
  } & PaginateState;
} & ID &
  Timestamp;

export default Thread;
