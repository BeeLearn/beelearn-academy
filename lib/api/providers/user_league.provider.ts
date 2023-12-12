import type UserLeague from "../models/user_league.model";

import ApiProvider from "./api.provider";

export default class UserLeagueProvider extends ApiProvider<UserLeague> {
  protected apiPath: string ='/api/leaderboard/user-leagues/';
}
