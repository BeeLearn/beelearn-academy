<script setup lang="ts">
    import Api from "~/lib/api";
    import type Course from '~/lib/api/models/course.model';

    type CourseItemProps = {
        course: Course,
    }

    defineProps<CourseItemProps>();

    const userStore = useUserStore();
    const user = computed(() => userStore.user!);
</script>
<template>
    <NuxtLink
        :to="`/${course.id}/modules/`" 
        class="w-44 flex flex-col space-y-2 rounded shrink-0 snap-center"
        @click="() => {
            if(!course.is_enrolled)
                Api.instance.courseProvider.update({
                    path: course.id,
                    data: {
                        course_enrolled_users: {
                            add: [user.id],
                        },
                    },
                });
        }">
        <div class="relative max-w-48 h-56">
            <img 
                :src="course.illustration" 
                class="w-full h-full object-cover rounded-lg shadow" />
            <button 
                v-if="course.is_new"
                class="absolute top-0 right-0 m-2  flex space-x-1 bg-amber-500 shadow text-white px-2 py-1 rounded-full">
                <UnoIcon class="i-mdi:star-box text-xl" />
                <span>New</span>
            </button>
        </div>
        <p>{{ course.name }}</p>
    </NuxtLink>
</template>
