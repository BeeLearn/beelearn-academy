<script setup lang="ts">
	import type UserLeague from '~/lib/api/models/user_league.model';

	type LeaderBoardUserListProps = {
		count: number,
		userLeagues: UserLeague[],
	}

	defineProps<LeaderBoardUserListProps>();
</script>
<template>
  <section 
		class="max-h-lg flex-1 bg-white card p-4 divide-y overflow-y-scroll"
		md="max-h-5xl col-start-1 col-end-2 row-span-2">
		<div
			v-for="userLeague, index in userLeagues">
			<div class="flex space-x-4 items-center p-3">
				<h1 class="text-lg font-semibold text-green-500">{{ index + 1 }}</h1>
				<div class="flex-1 flex space-x-2 items-center">
					<img 
						:src="userLeague.user.avatar"
						:alt="userLeague.user.username"
						class="w-8 h-8" />
					<h1 class="flex-1 text-base font-medium">{{  userLeague.user.full_name }}</h1>
				</div>
				<p class="text-sm text-stone-500">{{ userLeague.xp }} XP</p>
			</div>
			<div 
				v-if="index === Math.round(count * 0.7) &&  Math.round(count * 0.7) !== userLeagues.length - 1" 
				class="flex items-center justify-center p-4 space-x-6 text-red-500">
				<UnoIcon class="i-mdi:chevron-double-down text-2xl" />
				<h1 class="text-lg font-medium">Danger zone</h1>
				<UnoIcon class="i-mdi:chevron-double-down text-2xl" />
			</div>
			<div 
				v-else-if="index === Math.round(count * 0.3)" 
				class="flex items-center justify-center p-4 space-x-6 text-green-500">
				<UnoIcon class="i-mdi:chevron-double-up text-2xl" />
				<h1 class="text-lg font-medium">Level-up zone</h1>
				<UnoIcon class="i-mdi:chevron-double-up text-2xl" />
			</div>
		</div>
	</section>
</template>