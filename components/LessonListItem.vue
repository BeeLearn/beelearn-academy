<script setup lang="ts">
    import type Lesson from '~/lib/api/models/lesson.model';

    interface LessonListItemProps {
        lesson: Lesson,
        unlocked: boolean,
    }

    const props = defineProps<LessonListItemProps>();
    const isUnlocked = computed(() => props.unlocked || props.lesson.is_unlocked);
</script>
<template>
    <NuxtLink
        class="flex flex-col space-y-2 bg-white shadow-sm p-4 rounded-md"
        :class="{'opacity-90 text-slate-500': !isUnlocked}"
        :to="isUnlocked ? `${lesson.id}/topics/` : undefined">
        <div class="flex space-x-4">
            <UnoIcon 
                class="i-mdi:book-outline text-4xl"
                :class="isUnlocked ? 'text-violet-700' : 'text-violet'" />
            <div class="flex-1">
                <div class="flex">
                    <p class="flex-1 text-sm text-slate-500">Lesson</p>
                    <UnoIcon
                        v-if="lesson.is_completed" 
                        class="i-mdi:check text-2xl text-green-500" />
                </div>
                <h1 class="text-base">{{ lesson.name }}</h1>
                <button
                    v-if="!lesson.is_completed"
                    :disabled="true" 
                    class="text-sm text-slate-500 border rounded-full px-2 py-0.5 cursor-none">
                    <b class="text-xs font-semibold">XP </b>
                    <span>+10</span>
                </button>
            </div>
            <UnoIcon
                v-if="!isUnlocked" 
                class="i-mdi:lock text-xl" />
        </div>
        <button
            v-if="isUnlocked && !lesson.is_completed" 
            class="flex center bg-violet-700 py-3 rounded text-white">
            Learn
        </button>
    </NuxtLink>
</template>
