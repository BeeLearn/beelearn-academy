<script setup lang="ts">
    const leagueStore = useLeagueStore();
    const userLeagueStore = useUserLeagueStore();

    const leagues = computed(() => leagueStore.leagues);
    const userLeagueCount = computed(() => userLeagueStore.count);
    const userLeagues = computed(() => userLeagueStore.userLeagues);

    useAsyncData(async () => {
        await leagueStore.fetchLeagues();
        await userLeagueStore.fetchUserLeagues();
    });
</script>
<template>
    <main 
        class="flex-1 flex flex-col bg-slate-100 overflow-scroll"
        md="items-center">
        <main  
            class="flex-1 grid gap-4 p-4"
            md="grid-cols-2 grid-rows-1"
            lg="">
            <LeaderBoardUserList 
                :count="userLeagueCount"
                :user-leagues="userLeagues"/>
            <LeaderBoardLeague :leagues="leagues" />
            <LeaderBoardEarn class="max-w-sm max-h-xs" />
        </main>
    </main>
</template>
