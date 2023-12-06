<script setup lang="ts">
	const route = useRoute()
	const threadStore = useThreadStore();

	const threads = computed(() => threadStore.threads);
	const isLoading = computed(() => threadStore.isLoading);

	onMounted(() => {
		const reference = route.query.reference as string;
		threadStore.fetchThreads({reference});
	});

	onUnmounted(async () => {
    threadStore.$reset();
  });
</script>
<template>
	<div 
		class="fixed inset-0 flex bg-black/50 z-100"
		md="justify-end">
		<div 
			class="flex-1 flex flex-col bg-white"
			md="flex-none w-1/3">
			<header class="flex items-center p-2 pl-0 shadow">
				<div class="flex-1">
					<button 
						class="flex space-x-2 p-2 text-stone-700"
						@click="$router.back()">
						<UnoIcon class="i-mdi:chevron-left text-2xl" />
						<p class="text-base">Back</p>
					</button>
				</div>
			</header>
			<div class="flex-1 flex flex-col">
				<div
					v-if="isLoading" 
					class="w-8 h-8 m-auto progress progress-primary" />
				<ThreadList 
					v-else
					:threads="threads"
					@update-comment="threadStore.updateComment"
					@fetch-replies="threadStore.fetchReplies" />
			</div>
			<footer class="flex px-2 items-center border-t">
				<input 
					class="text-base flex-1 p-3 placeholder-text-stone-700"
					placeholder="Write a comment..." />
				<button class="w-8 h-8 flex center bg-violet-700 rounded-full text-white">
					<UnoIcon class="i-mdi:arrow-up text-2xl" />
				</button>
			</footer>
		</div>
	</div>
</template>
