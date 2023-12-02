import type ID from "./_id.model";
import type Timestamp from "./_timestamp.model";
import type Comment from "./comment.model";

type Reply = {
  comment: Comment;
  parent?: Comment;
} & ID &
  Timestamp;
  
export default Reply;