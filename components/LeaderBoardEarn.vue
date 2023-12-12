<script setup lang="ts">
import EarnPointList from "~/data/earn";
</script>
<template>
	<div class="flex flex-col space-y-4 card p-4">
		<header>
			<h1 class="text-xl font-bold">Earn XP</h1>
		</header>
		<div class="flex flex-col space-y-2">
			<div v-for="earnPoint in EarnPointList" class="flex bg-slate-100 p-3 rounded-md">
				<div class="flex-1">
					<p class="text-base">{{ earnPoint.name }}</p>
				</div>
				<button class="relative flex bg-violet-700/50  rounded-full">
					<div class="top-1 -left-1 absolute bg-red">
						<div class="relative flex center">
							<UnoIcon class="absolute i-mdi:play-circle text-3xl text-violet-700" />
							<div class="w-4 h-4 bg-white" />
						</div>
					</div>
					<p class="text-xs text-white pl-4.5 pr-2 font-light place-self-center">+{{ earnPoint.point }} XP</P>
				</button>
			</div>
		</div>
	</div>
</template>