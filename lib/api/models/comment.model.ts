import type ID from "./_id.model";
import type User from "./user.model";

type Comment = {
    user: Partial<User>,
    content: string,
    like_count: number,
    reply_count: number,
    is_deleted: boolean,
    is_liked: boolean,
    replies: Comment[],
} & ID;

export default Comment;