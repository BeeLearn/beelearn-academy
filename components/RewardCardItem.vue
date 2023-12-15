<script setup lang="ts">
    import type Reward from '~/lib/api/models/reward.model';

    type RewardCardItemProps = {
        reward: Reward,
    };

    defineProps<RewardCardItemProps>();
</script>
<template>
    <div class=" w-28 flex flex-col items-center space-y-2 snap-center shrink-0">
        <div 
            class="flex center w-24 h-24 rounded-full bg-gray-300"
            :style="{ background: reward.is_unlocked ? reward.color.replace('0xFF', '#') : ' rgb(209,213,219)'}">
            <img 
                :src="reward.icon" 
                class="w-16 object-cover" />
        </div>
        <p class="text-center text-wrap">{{ reward.title }}</p>
    </div>
</template>
