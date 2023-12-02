import type Thread from "../models/thread.model";
import ApiProvider from "./api.provider";

export default class ThreadProvider extends ApiProvider<Thread> {
  protected apiPath: string = "/api/messaging/threads/";
}
