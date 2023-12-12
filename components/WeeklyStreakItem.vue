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
        class="flex center w-8 h-8 border-1 rounded-full shrink-0 snap-center"
        :class="streak.is_complete ? 'border-green-500 text-green-500' : streak.is_expired ? 'text-slate-300' : 'border-slate text-slate-700'">
        {{ date.getDate() }}
    </div>
</template>
