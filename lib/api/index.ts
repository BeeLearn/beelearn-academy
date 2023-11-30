import axios from "axios";
import type { AxiosInstance } from "axios";

import UserProvider from "../api/providers/user.provider";
import RewardProvider from "../api/providers/reward.provider";
import StreakProvider from "../api/providers/streak.provider";
import CategoryProvider from "../api/providers/category.provider";
import CourseProvider from "./providers/course.provider";
import LessonProvider from "./providers/lesson.provider";
import ModuleProvider from "./providers/module.provider";
import TopicProvider from "./providers/topic.provider";
import LeagueProvider from "./providers/league.provider";
import TopicQuestionProvider from "./providers/topic_question.provider";
import UserLeagueProvider from "./providers/user_league.provider";

class ApiImpl {
  private axios: AxiosInstance;

  readonly userProvider: UserProvider;
  readonly rewardProvider: RewardProvider;
  readonly streakProvider: StreakProvider;
  readonly categoryProvider: CategoryProvider;
  readonly courseProvider: CourseProvider;
  readonly moduleProvider: ModuleProvider;
  readonly lessonProvider: LessonProvider;
  readonly topicProvider: TopicProvider;
  readonly leagueProvider: LeagueProvider;
  readonly userLeagueProvider: UserLeagueProvider;
  readonly topicQuestionProvider: TopicQuestionProvider;

  constructor(accessToken: string) {
    this.axios = axios.create({
      baseURL: "http://localhost:8000/",
      headers: {
        Authorization: "Token " + accessToken,
      },
    });

    this.userProvider = new UserProvider(this.axios);
    this.rewardProvider = new RewardProvider(this.axios);
    this.streakProvider = new StreakProvider(this.axios);
    this.categoryProvider = new CategoryProvider(this.axios);
    this.courseProvider = new CourseProvider(this.axios);
    this.moduleProvider = new ModuleProvider(this.axios);
    this.lessonProvider = new LessonProvider(this.axios);
    this.topicProvider = new TopicProvider(this.axios);
    this.leagueProvider = new LeagueProvider(this.axios);
    this.userLeagueProvider = new UserLeagueProvider(this.axios);
    this.topicQuestionProvider = new TopicQuestionProvider(this.axios);
  }
}

export default class Api {
  static instance: ApiImpl;

  private constructor() {}

  static set accessToken(accessToken: string) {
    Api.instance = new ApiImpl(accessToken);
  }
}
