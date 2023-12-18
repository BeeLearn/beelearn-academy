<script setup lang="ts">
  import e from '~/lib/e';
  import Timer from '~/lib/timer';
  import type Topic from '~/lib/api/models/topic.model';
  import type TopicQuestion from '~/lib/api/models/topic_question.model';

  import type { FormExpose } from '~/widget.types';

  enum ViewType {
    topicView,
    questionView,
  }

  const route = useRoute();
  const router = useRouter();
  const snackbar = useSnackbar();

  const userStore = useUserStore();
  const topicStore = useTopicStore();

  const isLoading = ref(false);
  const isChanged = ref(false);
  const isCompleted = ref(false);
  const isSubmitting = ref(false);
  const questionRef = ref<FormExpose | null>(null);

  const user = computed(() => userStore.user!);
  const profile = computed(() => userStore.profile);
  const topics = computed(() => topicStore.topics);
  const breadcrumb = computed(() => topicStore.breadcrumb);
  const loadingState = computed(() => topicStore.state);

  const viewTypes = computed(
    () => topics.value.flatMap((topic) => {
      const viewTypes: Array<[ViewType, any]> = topic.topic_questions.map<[ViewType, any]>(
        question => {
          question.topic = topic;
          return [ViewType.questionView, question];
        }
      );

      return [[ViewType.topicView, topic]].concat(viewTypes) as [ViewType, any];
    })
  );


  const topic = computed<Topic>(() => {
    const element = viewTypes.value[page.value];
    if (!element) return;

    const [viewType, value] = element;
    if (viewType === ViewType.questionView) return value.topic;
    return value;
  });

  const page = computed<number>({
    get() {
      return Number(route.query.page ?? 0);
    },
    set(value: number) {
      questionRef.value = null;
      isChanged.value = false;
      isCompleted.value = false;
      isSubmitting.value = false;

      router.replace({ query: { page: value } });
    },
  });

  const currentProgress = computed(() => (page.value / (viewTypes.value.length - 1)) * 100);

  const onQuestionSubmit = async function () {
    isLoading.value = true;
    const value = viewTypes.value[page.value][1] as TopicQuestion;

    try {
      if (questionRef.value!.isCorrect) {
        await topicStore.updateTopicQuestion(value, {
          answered_users: {
            add: [user.value.id],
          },
        });
        page.value++;
      } else {
        await userStore.updateCurrentUser({
          profile: {
            lives: profile.value.lives - 1
          }
        });
      }
    } catch(error){
      snackbar.show(
        e("span", { className: "i-mdi:information text-xl text-red-500"}), 
        e("p", { textContent: "An unexpected error occur. Try again!"})
      );
    } finally {
      isLoading.value = false;
    }
  }

  const onTopicComplete = async function () {
    if (topic.value.is_completed && topic.value.is_unlocked) return;

    isLoading.value = true;

    try {
      await topicStore.updateTopic(topic.value, {
        topic_complete_users: {
          add: [user.value.id],
        },
        entitled_users: {
          add: [user.value.id],
        }
      });
    } catch (error) {
      snackbar.show(
        e("span", { className: "i-mdi:information text-xl text-red-500"}), 
        e("p", { textContent: "An unexpected error occur. Try again!"})
      );
    } finally {
      isLoading.value = false;
    }
  }

  const isBookmarkLoading = ref(false);

  const toggleBookmark = async function(){
    isBookmarkLoading.value = true;
    const payload  = {
      add: [] as number[],
      remove: [] as number[],
    };

    if(topic.value.is_liked) payload.remove.push(user.value.id);
    else payload.add.push(user.value.id);

    return topicStore.updateTopic(topic.value, {
      likes: payload,
    })
    .catch((error) => {
      snackbar.show(
        e("span", { className: "i-mdi:information text-xl text-red-500"}), 
        e("p", { 
          textContent: topic.value.is_liked ? 
          "Fail to remove topic from bookmarks" : 
          "Fail to add to bookmark. Try again!"
        })
      );

      return Promise.reject(error);
    })
    .finally(() => isBookmarkLoading.value = false);
  }

  const timer = new Timer();
  const streakStore = useStreakStore();

  const todayStreak = computed(() => streakStore.todayStreak);

  onMounted(() => {
  if (todayStreak.value && !todayStreak.value.is_complete) {
      timer.start(async () => {
        await streakStore.updateStreak(todayStreak.value!.id, {
          streak_complete_users: {
            add: [user.value.id],
          }
        });
      }, user.value.profile.daily_streak_minutes * 60);
    }
  });

  onUnmounted(() => {
    timer.stop();
  });

  useAsyncData(async () => {
    const lessonId = route.params.lessonId as string;

    if (topicStore.state === "idle")
      topicStore.getTopics(lessonId);
  });

  onBeforeRouteLeave(() => {
    topicStore.$reset();
  });
</script>
<template>
  <section class="fixed inset-0 flex flex-col bg-white z-10">
    <div 
      v-if="['idle', 'pending'].includes(loadingState)" 
      class="m-auto progress progress-primary" />
    <template v-else>
      <div 
        class="flex-1 grid grid-cols-2 grid-row-1 overflow-y-scroll" 
        md="flex p-4">
        <div 
          class="order-first col-start-1 col-end-3 py-4" 
          md="flex-1 p-0">
          <div class="flex items-center space-x-2">
            <button 
              class="p-4" 
              @click="$router.back()">
              <UnoIcon class="i-mdi:close text-xl" />
            </button>
            <p class="text-nowrap truncate">{{ breadcrumb?.lesson.name }}</p>
          </div>
        </div>
        <TopicThreadAction 
          v-if="topic" 
          :topic="topic" />
        <div 
          class="order-3 flex-1 flex flex-col space-y-4 col-span-100 row-span-100 px-6 overflow-y-scroll"
          md="order-2 flex-none w-md py-4" 
          lg="w-2xl">
          <div class="flex items-center space-x-6">
            <StepProgressBar :progress="currentProgress" />
            <div 
              class="w-1/3 flex items-center" 
              md="place-content-end">
              <button class="flex space-x-2">
                <UnoIcon class="i-mdi:heart text-red-500 text-xl" />
                <span>{{ profile.lives }}</span>
              </button>
              <div class="flex-1" />
              <button 
                v-if="viewTypes[page][0] === ViewType.topicView"
                :disabled="isBookmarkLoading"
                @click="toggleBookmark">
                <UnoIcon 
                  class="i-mdi:bookmark text-2xl self-end"
                  :class="topic.is_liked ? 'text-violet-700' : 'text-stone-300'" />
              </button>
            </div>
          </div>
          <template 
            v-for="[viewType, value], index in viewTypes" 
            :key="value.id">
            <Transition enter-active-class="animate-slide-in-right animate-duration-200">
              <div v-if="viewType === ViewType.questionView && index === page"
                class="flex-1 flex flex-col space-y-4 overflow-y-scroll">
                <TopicDynamicQuestion 
                  :topic-question="value" 
                  v-model:inner-ref="questionRef" 
                  v-model:changed="isChanged"
                  v-model:submitting="isSubmitting" 
                  @submit="onQuestionSubmit" />
              </div>
              <TopicDynamicContent 
                v-else-if="viewType === ViewType.topicView && index === page" 
                :topic="value" />
            </Transition>
          </template>
        </div>
      </div>
      <TopicFooter 
        :loading="isLoading" :can-back="page > 0" 
        :is-question-view="Boolean(questionRef)"
        :action-disabled="!isChanged && Boolean(questionRef)"
        :topic-question="(viewTypes.at(page)?.at(1) as TopicQuestion | undefined)" 
        @next="page++" 
        @back="page--"
        @continue="async () => {
          if (questionRef)
            await questionRef.submit();
          else {
            if (page < viewTypes.length - 1) {
              await onTopicComplete();
              page++;
            }
            else {
              await onTopicComplete();
              if (breadcrumb?.lesson.is_completed)
                return $router.back();

              isCompleted = true;
            }
          }
        }" />
      <Teleport to="#__nuxt">
        <LessonCompleteDialog 
          :visible="isCompleted" 
          :lessonName="breadcrumb!.lesson.name" />
      </Teleport>
    </template>
    <NuxtPage />
  </section>
</template>
