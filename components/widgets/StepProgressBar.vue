<script setup lang="ts">
    interface StepProgressBarProps {
        progress?: number,
        max?: number,
        min?: number,
    };

    defineProps<StepProgressBarProps>();
</script>
<template>
    <div class="flex-1 h-2.5 bg-slate-100 rounded-xl">
        <div 
            ref="progress"
            class="flex items-center place-content-end h-full bg-green-500 rounded-xl transition-width"
            :style="{width: Math.max(Math.min(progress ?? 0, max ?? 100), min ?? 6) + '%'}">
            <div class="w-2 h-2 bg-white rounded-full mr-0.5" />
        </div>
    </div>
</template>
