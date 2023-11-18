<script setup lang="ts">
    import type Reward from '~/lib/api/models/reward.model';

    interface RewardCardProps  {
        rewards: Reward[],
    }
    defineProps<RewardCardProps>();
</script>
<template>
    <div class="flex space-x-4 overflow-x-scroll snap-x snap-mandatory p-4">
        <RewardCardItem
            v-for="reward in rewards" 
            :key="reward.id" 
            :reward="reward"/>
    </div>
</template>