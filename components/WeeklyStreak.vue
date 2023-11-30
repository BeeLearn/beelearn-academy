<script setup lang="ts">
    import type Streak from '~/lib/api/models/streak.model';

    interface WeeklyStreakProps {
        streaks: Streak[],
    }

    defineProps<WeeklyStreakProps>();
</script>
<template>
    <div class="flex space-x-1 overflow-x-scroll flex-nowrap snap-x snap-mandatory px-4 py-2">
        <WeeklyStreakItem 
            v-for="streak in streaks" 
            :key="streak.id" 
            :streak="streak" />
    </div>
</template>