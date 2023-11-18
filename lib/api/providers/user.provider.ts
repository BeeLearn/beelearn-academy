import type User from "../models/user.model";

import ApiProvider, { type TApiPatchOption } from "./api.provider";

export default class UserProvider extends ApiProvider<User> {
  protected apiPath: string = "/api/account/users/";

  getCurrentUser() {
    return this.get<User>({ path: "current-user" });
  }

  updateCurrentUser({ data }: Pick<TApiPatchOption, "data">) {
    return this.patch<User>({ path: "current-user", data });
  }
}
