<script setup lang="ts">
  import e from '~/lib/e';
  import type Topic from '~/lib/api/models/topic.model';

  const route = useRoute();
  const router = useRouter();
  const snackbar = useSnackbar();
  const userStore = useUserStore();
  const topicStore = useTopicStore();
  const threadStore = useThreadStore();


  const user = computed(() => userStore.user!);
  const profile = computed(() => userStore.profile);
  const topics = computed(() => topicStore.topics);
  const breadcrumb = computed(() => topicStore.breadcrumb);
  const loadingState = computed(() => topicStore.state);

  const topic = computed<Topic>(() => topics.value[page.value]);

  const page = computed<number>({
    get(){
      return Number(route.query.page ?? 0);
    },
    set(value: number){
      router.replace({ query: { page: value }});
    },
  });

  const currentProgress = computed(() => (page.value / (topics.value.length - 1)) * 100);

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

  useAsyncData(async () => {    
    if(topicStore.state === "idle")
      await topicStore.getTopics(route.query);
  });

  onBeforeRouteLeave(async () => {
    threadStore.$reset();
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
              class="w-1/3 flex"
              md="place-content-end">
              <button class="flex space-x-2 items-center">
                <UnoIcon class="i-mdi:heart text-red-500 text-xl" />
                <span>{{ profile.lives }}</span>
              </button>
              <div class="flex-1" />
              <button 
                :disabled="isBookmarkLoading"
                @click="toggleBookmark">
                <UnoIcon 
                  class="i-mdi:bookmark text-2xl self-end"
                  :class="topic.is_liked ? 'text-violet-700' : 'text-stone-300'" />
              </button>
            </div>
          </div>
          <template
            v-for="topic, index in topics"
            :key="topic.id">
            <Transition 
              enter-active-class="animate-slide-in-right animate-duration-200"
              leave-active-class="animate-slide-in-left animate-duration-200">
              <TopicDynamicContent
                v-if="index === page"
                :topic="topic"/>
            </Transition>
          </template>
        </div>
      </div>
      <TopicFooter
        :can-back="page > 1"
        @next="page++"
        @back="page--"
        @continue="async () => {
            if(page < topics.length - 1)  page++;
            else router.back();
        }" />
    </template>
    <NuxtPage />
  </section>
</template>
