<script setup lang="ts">
    import {
        DisclosurePanel,
    } from '@headlessui/vue';
    import type Lesson from '~/lib/api/models/lesson.model';

    interface LessonListProps  {
        lessons: Lesson[],
        moduleIndex: number,
    }

    defineProps<LessonListProps>();
</script>
<template>
    <Transition
        enter-active-class="animate-fade-in animate-duration-200"
        leave-active-class="animate-fade-out animate-duration-150">
        <DisclosurePanel class="flex flex-col space-y-4">
            <LessonListItem
                v-for="lesson, index in lessons"
                :key="lesson.id"
                :lesson="lesson"
                :unlocked="moduleIndex ===0 && index === 0" />
        </DisclosurePanel>
    </Transition>
</template>