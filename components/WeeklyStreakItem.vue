<script setup lang="ts">
    import type Streak from '~/lib/api/models/streak.model';

    interface WeeklyStreakItemProps {
        streak: Streak,
    }

    const props = defineProps<WeeklyStreakItemProps>();
    const date = computed(() => new Date(props.streak.date));
</script>
<template>
    <div 
        class="flex center w-10 h-10 border-1 rounded-full shrink-0 snap-center"
        :class="streak.is_complete ? 'border-green-500 text-green-500' : streak.is_expired ? 'border-stone-300 text-stone-300' : 'border-stone-300'">
        {{ date.getDate() }}
    </div>
</template>
