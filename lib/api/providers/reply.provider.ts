import type Reply from "../models/reply.model";
import ApiProvider from "../providers/api.provider";

export default class ReplyProvider extends ApiProvider<Reply> {
  protected apiPath: string = "/api/messaging/replies/";
}
