<script setup lang="ts">
	const userStore = useUserStore();
	const streakStore = useStreakStore();
	const user = computed(() => userStore.user);

	const loadingState = ref<LoadingState>("idle");

	useAsyncData(async () => {
		const promises = [streakStore.getStreaks(),
		userStore.getCurrentUser()];

		loadingState.value = "pending";

		await Promise.all(promises)
		.then(() => loadingState.value = "success")
		.catch(() => loadingState.value = "error");
	});
</script>
<template>
	<div 
		class="fixed inset-0 flex flex-col overflow-y-scroll text-[14px] bg-stone-50" 
		md="overflow-y-auto">
		<div 
			v-if="['idle', 'pending'].includes(loadingState)"
			class="m-auto w-10 h-10 border-4 border-violet-700 border-t-white rounded-full animate-spin" />
		<template v-else>
			<LayoutHeader 
				:user="user" 
				class="shadow md:z-10" />
			<slot />
		</template>
		<Teleport to="#__nuxt">
			<ThreadDialog />
			<PremiumSubscribeDialog />
		</Teleport>
	</div>
</template>
