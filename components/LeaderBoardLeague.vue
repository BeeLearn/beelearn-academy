<script setup lang="ts">
	import type League from '~/lib/api/models/league.model';

	type LeaderBoardLeagueProps = {
		leagues: League[],
	}

	const props = defineProps<LeaderBoardLeagueProps>();

	const currentLeague = computed(() => props.leagues.find(league => league.is_completed && league.is_unlocked));
</script>
<template>
	<div 
		class="order-first flex flex-col space-y-4 card pb-0 rounded-xl overflow-scroll"
		md="w-sm order-none col-start-2 row-end-1">
		<header class="flex items-center space-x-4 p-4">
			<h1 class="flex-1 text-xl font-bold">{{currentLeague?.name}}</h1>
			<div class="flex space-x-1 items-center text-stone-700">
				<p class="font-medium text-stone-500">Ends in 6d 22h</p>
			</div>
		</header>
		<div class="flex space-x-4 overflow-x-scroll flex-nowrap px-4">
			<template v-for="league in leagues" >
				<div
					class="shrink-0 w-12 h-12 flex center rounded-md"
					:class="{'bg-slate-200': !league.is_unlocked}"
					:style="{ background: league.is_unlocked ? league.color : undefined }">
					<img 
						v-if="league.is_completed && league.is_unlocked"
						:src="league.icon" 
						class="w-12 h-12 object-cover" />
					<UnoIcon 
						v-else="!league.is_unlocked"
						class="i-mdi:lock text-2xl text-stone-500" />
				</div>
			</template>
		</div>
	</div>
</template>
