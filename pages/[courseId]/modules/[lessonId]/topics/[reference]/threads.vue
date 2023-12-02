<script setup lang="ts">
	const route = useRoute()
	const threadStore = useThreadStore();

	const threads = computed(() => threadStore.threads);

	useAsyncData(async () => {
		const reference = route.params.reference as string;
		if(threadStore.state === "idle")
			await threadStore.fetchThreads({
				reference,
			});
	})
</script>
<template>
	<div 
		class="fixed inset-0 flex bg-black/50 z-10"
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
			<ThreadList 
				:threads="threads"
				@update-comment="threadStore.updateComment"
				@fetch-replies="threadStore.fetchReplies" />
			<footer class="flex px-2 items-center border-t">
				<input 
					class="text-base flex-1 p-3 placeholder-text-stone-700"
					placeholder="Write a comment..." />
				<button class="w-8 h-8 flex center bg-emerald-700 rounded-full text-white">
					<UnoIcon class="i-mdi:arrow-up text-2xl" />
				</button>
			</footer>
		</div>
	</div>
</template>
