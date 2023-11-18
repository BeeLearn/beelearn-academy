import type Streak from "../models/streak.model";

import { ApiProviderImpl, type TApiOption } from "./api.provider";

export default class StreakProvider extends ApiProviderImpl {
  protected apiPath: string = "/api/reward/streaks/";

  list(options?: Pick<TApiOption, "query" | "url">) {
    return this.get<Streak[]>(options);
  }
}
