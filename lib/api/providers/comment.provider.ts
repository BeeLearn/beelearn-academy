import type Comment from "../models/comment.model";
import ApiProvider from "./api.provider";

export default class CommentProvider extends ApiProvider<Comment> {
  protected apiPath: string = "/api/messaging/comments/";
}
