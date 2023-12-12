import type League from "../models/league.model";
import ApiProvider from "./api.provider";

export default class LeagueProvider extends ApiProvider<League> {
  protected apiPath: string = "/api/leaderboard/leagues/";

  group() {}
}
