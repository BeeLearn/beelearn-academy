<script setup lang="ts">
	import type Comment from '~/lib/api/models/comment.model';
	import type Thread from '~/lib/api/models/thread.model';

	const route = useRoute()
	const threadStore = useThreadStore();

	const threads = computed(() => threadStore.threads);
	const isLoading = computed(() => threadStore.isLoading);

	const content = ref<string>();
	const isReplying = ref(false);
	const parent = ref<Thread | null>(null);

	const onReply = function(){
		isReplying.value = true;

		return threadStore.createComment({
			content: content.value,
			reference: route.query.reference,
		}, parent.value)
		.then(() => {
			parent.value = null;
			content.value = "";
		})
		.finally(() => isReplying.value = false);
	}

	watch(content, (value) => {
		/// Don't account for d++b users 
		if(value?.trim().length === 0)
			parent.value = null;
	});

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
		class="fixed inset-0 flex bg-black/50 z-20"
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
			<div class="flex-1 flex flex-col overflow-y-scroll">
				<div
					v-if="isLoading" 
					class="w-8 h-8 m-auto progress progress-primary" />
				<ThreadList 
					v-else
					:threads="threads"
					@update-comment="threadStore.updateComment"
					@fetch-replies="threadStore.fetchReplies"
					@reply="(comment, thread) => {
						parent = thread;
						content = `@${comment.user.username} `;
					}" />
			</div>
			<footer class="flex px-2 items-center border-t">
				<input 
					v-model="content"
					class="text-base flex-1 p-3 placeholder-text-stone-700"
					placeholder="Write a comment..." />
				<button 
					:disabled="!(content && content?.trim().length > 0) || isReplying"
					class="w-8 h-8 flex center rounded-full"
					:class="
						content && content?.trim().length > 0 ? 
						'bg-violet-700 text-white' :
						'bg-stone-200 text-stone-700/30'"
					@click="onReply">
					<div
						v-if="isReplying" 
						class="w-4 h-4 !border-2 progress border-stone" />
					<UnoIcon
						v-else
						class="i-mdi:arrow-up text-2xl" />
				</button>
			</footer>
		</div>
	</div>
</template>
