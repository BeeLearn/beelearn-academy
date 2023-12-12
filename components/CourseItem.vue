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
    <div
        class="w-40 flex flex-col space-y-2 rounded shrink-0 snap-center cursor-pointer"
        @click="() => {
            if(course.is_new && !user.is_premium){
                $router.push({hash: '#subscribe'});
                return;
            }

            if(!course.is_enrolled)
                Api.instance.courseProvider.update({
                    path: course.id,
                    data: {
                        course_enrolled_users: {
                            add: [user.id],
                        },
                    },
                });
            
                $router.push(`/${course.id}/modules/`);
        }">
        <div class="relative max-w-48 h-56">
            <img 
                :src="course.illustration" 
                class="w-full h-full object-cover rounded-lg shadow"
                oncontextmenu="return false;" />
            <button 
                v-if="course.is_new"
                class="absolute top-0 right-0 m-2  flex space-x-1 bg-amber-500 shadow text-white px-2 py-1 rounded-full">
                <UnoIcon class="i-mdi:star-box text-xl" />
                <span>New</span>
            </button>
        </div>
        <p>{{ course.name }}</p>
    </div>
</template>
