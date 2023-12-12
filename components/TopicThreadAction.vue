<script setup lang="ts">
	import type Topic from '~/lib/api/models/topic.model';

	type TopicThreadActionProps = {
		topic: Topic,
	};

	defineProps<TopicThreadActionProps>();
</script>
<template>
	<div 
		class="order-2 col-start-3 py-4" 
		md="order-last flex-1 flex items-start justify-end p-0">
		<button
			class="flex items-center space-x-2 p-4"
			@click="$router.push({ 
				query: { reference: topic.thread_reference }, 
				hash: '#thread'
			})">
			<UnoIcon class="i-mdi:chevron-left text-xl" />
			<p class="text-nowrap">
				{{ topic.thread_count }} 
				{{ topic.thread_count > 1 ? 'Threads' : 'Thread' }}
			</p>
		</button>
	</div>
</template>
