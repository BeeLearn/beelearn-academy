<script setup lang="ts">
	const userStore = useUserStore();

	const user = computed(() => userStore.user);
</script>
<template>
	<header class="flex items-center space-x-4 bg-white pr-4">
		<LayoutNavigationPopup />
		<div class="flex-1 flex items-center space-x-2">
			<NuxtLink 
				to="/" 
				class="text-xl font-black text-emerald-500">Beelearn</NuxtLink>
		</div>
		<div class="flex items-center space-x-4">
			<NuxtLink to="/search">
				<UnoIcon class="i-mdi:search text-2xl" />
			</NuxtLink>
			<NuxtLink to="/profile">
				<img 
					:src="user?.avatar" 
					class="w-8 h-8 rounded-full" />
			</NuxtLink>
		</div>
	</header>
</template>
