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
import ThreadProvider from "./providers/thread.provider";
import CommentProvider from "./providers/comment.provider";
import ReplyProvider from "./providers/reply.provider";
import NotificationProvider from "./providers/notification.provider";

/// Todo do add an interceptor to axios to redirect when token throws an Unauthorized error
/// Or show a dialog with unauthorized, token scope doesn't include the requested permission
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

  readonly replyProvider: ReplyProvider;
  readonly threadProvider: ThreadProvider;
  readonly commentProvider: CommentProvider;

  readonly notificationProvider: NotificationProvider;

  constructor(public readonly accessToken: string) {
    const config = useRuntimeConfig();

    this.axios = axios.create({
      baseURL: config.public.apiBaseUrl,
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

    this.replyProvider = new ReplyProvider(this.axios);
    this.threadProvider = new ThreadProvider(this.axios);
    this.commentProvider = new CommentProvider(this.axios);

    this.notificationProvider = new NotificationProvider(this.axios);
  }
}

export default class Api {
  static #instance: ApiImpl;
  static firebaseInstance: ApiImpl;

  private constructor() {}

  static get accessToken() {
    const config = useRuntimeConfig();
    const accessToken = useCookie("accessToken", {
      domain: config.public.rootDomain,
    });

    return accessToken;
  }

  static get instance() {
    if (!this.accessToken.value) throw new Error("accessToken is not defined");

    if (!this.#instance) {
      this.#instance = new ApiImpl(this.accessToken.value);
    }

    return this.#instance;
  }
}
