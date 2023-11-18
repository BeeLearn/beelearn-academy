<script setup lang="ts">
    const userStore = useUserStore();
    const rewardStore = useRewardStore();
    const streakStore = useStreakStore();

    const profile = computed(() => userStore.profile);
    const rewards = computed(() => rewardStore.rewards);
    const streaks = computed(() => streakStore.streaks);

    const weeklyStreaks = computed(() => streakStore.weeklyStreaks);

    useAsyncData(async () => {
        if(rewardStore.state === "idle")
            await rewardStore.getRewards();
        if(streakStore.state === "idle")
            await streakStore.getStreaks();
    });
</script>
<template>
    <section class="flex-1 bg-stone-100 pb-8 overflow-y-scroll">
        <header class="flex space-x-4 items-center p-4">
            <h1 class="flex-1 text-2xl font-black">Profile</h1>
            <NuxtLink to="/profile/settings">
                <UnoIcon class="i-mdi:settings-outline text-2xl" />
            </NuxtLink>
        </header>
        <section class="flex-1 flex flex-col">
            <div 
                class="flex-1 grid grid-cols-1 gap-y-4"
                md="grid-cols-2 grid-rows-1 gap-y-0">
                <div class="flex flex-col space-y-2">
                    <RewardCard :rewards="rewards" />
                    <div 
                        class="flex flex-col px-4"
                        md="flex-row">
                        <GoalCard 
                            class="md:max-w-sm lg:max-w-md"
                            :profile="profile"
                            :weekly-streaks="weeklyStreaks" />
                    </div>
                </div>
                <div 
                    class="flex flex-col space-y-2 px-4"
                    md="px-0">
                    <StreakCard 
                        :streaks="streaks"/>
                    <LifeLineCard :profile="profile" />
                </div>
            </div>
        </section>
        <NuxtPage />
    </section>
</template>
