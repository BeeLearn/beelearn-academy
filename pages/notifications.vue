<script setup lang="ts">
	const notificationStore = useNotificationStore();

	const hasNext = computed(() => Boolean(notificationStore.next));
	const isLoading = computed(() => notificationStore.isLoading);
	const notifications = computed(() => notificationStore.notifications);

	useAsyncData(async () => {
		if(notificationStore.state === "idle")
			notificationStore.fetchNotifications();
	});
</script>
<template>
	<div class="flex-1 flex flex-col overflow-y-scroll">
		<header class="p-4">
			<h1 class="text-xl font-extrabold">Notifications</h1>
			<p class="text-stone-700">All your notifications and activity will be found here</p>
		</header>
		<div
			v-if="isLoading" 
			class="m-auto progress progress-primary" />
		<template v-else>
			<div 
				class="flex-1 flex flex-col divide-y"
				md="grid grid-cols-2 gap-x-4"
				lg="grid-cols-3">
				<div 
					v-for="notification in notifications"
					:key="notification.id"
					class="flex space-x-2 items-center px-4 py-2">
					<img 
						:src="notification.image"
						class="w-10 h-10 object-cover" />
					<div>
						<p class="text-base font-medium">{{ notification.title }}</p>
						<p class="text-stone-500 text-sm line-clamp-3">{{ notification.body }}</p>
					</div>
				</div>
			</div>
			<div class="flex-1 flex flex-col p-4">
				<LoadMoreButton 
					v-if="hasNext"
					class="mx-auto"
					:load-more="notificationStore.fetchNextNotifications" />
			</div>
		</template>
	</div>
</template>
