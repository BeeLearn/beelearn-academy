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
        :class="{'opacity-90': !isUnlocked}"
        :to="isUnlocked ? `${lesson.id}/topics/` : undefined">
        <div class="flex space-x-4">
            <UnoIcon 
                class="i-mdi:book-outline text-4xl"
                :class="isUnlocked ? 'text-violet-700' : 'text-violet'" />
            <div class="flex-1">
                <small>Lesson</small>
                <h1>{{ lesson.name }}</h1>
                <button
                    :disabled="true" 
                    class="text-sm border rounded-full px-2 py-0.5 cursor-none">
                    <b class="text-xs">XP</b>
                    <span>+10</span>
                </button>
            </div>
            <UnoIcon
                v-if="!isUnlocked" 
                class="i-mdi:lock text-xl text-stone" />
        </div>
        <button
            v-if="isUnlocked && !lesson.is_completed" 
            class="flex center bg-violet-700 py-3 rounded text-white">
            Learn
        </button>
    </NuxtLink>
</template>
