<script setup lang="ts">
	import Timer from '~/lib/timer';
	import type Profile from '~/lib/api/models/profile.model';
	import type Streak from '~/lib/api/models/streak.model';

	interface GoalCardProps {
		profile: Profile,
		weeklyStreaks: Streak[],
	}

	const props = defineProps<GoalCardProps>();
	const isGoalEditDialogVisible = ref(false);
	const currentStreakMinutes = computed(() => Math.floor(Timer.value/60));
	const currentProgress = computed(() => (currentStreakMinutes.value / props.profile.daily_streak_minutes) * 100);
</script>
<template>
	<div class="flex flex-col card">
		<header class="p-4">
			<h1 class="text-2xl font-extrabold">Daily goals</h1>
			<p class="text-stone-700">Read and practice every day to achieve your goals</p>
		</header>
		<div class="flex-1 flex center mt-4 mb-8">
			<div class="relative  flex center">
				<VCircleProgress 
					fill-color="#22c55e" 
					empty-color="#e5e5e5" 
					:percent="currentProgress" />
				<div class="absolute text-center">
					<h1 class="text-4xl font-medium">{{ currentStreakMinutes }}</h1>
					<p>Of {{ profile.daily_streak_minutes }} min goal</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col space-y-4">
			<div class="flex space-x-4 px-4">
				<button 
					class="flex-1 btn btn-inverse rounded-full"
					@click="isGoalEditDialogVisible = true">Adjust goal</button>
				<button class="flex-1 btn btn-outline-primary rounded-full">Share</button>
			</div>
			<WeeklyStreak :streaks="weeklyStreaks" />
		</div>
		<Teleport to="#__nuxt">
			<Transition
				enter-active-class="animate-bounce-in animate-duration-200"
				leave-active-class="animate-fade-out animate-duration-200">
				<GoalEditDialog 
					v-if="isGoalEditDialogVisible"
					:daily-streak-minutes="profile.daily_streak_minutes"
					@close="isGoalEditDialogVisible = false" />
			</Transition>
		</Teleport>
	</div>
</template>
