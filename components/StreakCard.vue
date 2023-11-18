<script setup lang="ts">
    import { groupStreaks } from '~/lib/date';
    import type Streak from '~/lib/api/models/streak.model';

    interface StreakCardProps {
        streaks: Streak[],
    }

    defineProps<StreakCardProps>();
</script>
<template>
    <div class="card !p-4">
        <header>
            <h1 class="text-2xl font-extrabold">Monthly streaks</h1>
            <p class="text-stone-700">
                Your monthly streak overview for 
                {{ new Date().toLocaleString("default", {month: "long"}) }}
            </p>
        </header>
        <VCalender 
            expanded 
            borderless
            :attributes="[
                {
                    highlight: 'red',
                    dates: groupStreaks(streaks,  streak => streak.is_expired),
                },
                {
                    highlight: 'green',
                    dates: groupStreaks(streaks, streak => streak.is_complete),
                }
            ]" />
    </div>
</template>