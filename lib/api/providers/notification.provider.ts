import ApiProvider from "./api.provider";

import type Notification from "../models/notification.model";

export default class NotificationProvider extends ApiProvider<Notification> {
  protected apiPath: string = "/api/account/notifications/";
}
