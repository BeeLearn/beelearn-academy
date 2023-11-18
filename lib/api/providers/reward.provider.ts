import type Reward from "../models/reward.model";

import ApiProvider from "./api.provider";

export default class RewardProvider extends ApiProvider<Reward> {
  protected apiPath: string = "/api/reward/rewards/";
}
