<script setup lang="ts">
	import type Thread from '~/lib/api/models/thread.model';
	import type Comment from '~/lib/api/models/comment.model';

	type ThreadCommentListProps = {
		threads: Thread[],
	}

	export type ThreadEmits = {
		(event: 'reply', value: Comment, thread: Thread): void,
		(event: 'fetchReplies', thread: Thread, next?: string | null): Promise<void>,
		(event: 'updateComment', comment: Comment, data: Record<string, any>) : Promise<void>,
	}

	defineEmits<ThreadEmits>();
	defineProps<ThreadCommentListProps>();
</script>
<template>
	<div class="flex-1 flex flex-col p-4 overflow-y-scroll">
		<ThreadListItem
			v-for="thread in threads"
			:key="thread.id"
			:thread="thread"
			@update-comment="(comment, data) => $emit('updateComment', comment, data)"
			@fetch-replies="(thread, next) => $emit('fetchReplies', thread, next)"
			@reply="(comment, thread) => $emit('reply', comment, thread)" />
	</div>
</template>
