<script setup lang="ts">
	import type Thread from '~/lib/api/models/thread.model';
	import type Comment from '~/lib/api/models/comment.model';

	import type { ThreadEmits } from './ThreadList.vue';

	type ThreadListItemProps = {
		thread: Thread,
	}

	const emit = defineEmits<ThreadEmits>();
	const props = defineProps<ThreadListItemProps>();

	const userStore = useUserStore();
	
	const user = computed(() => userStore.user!);
	const comment = computed(() => props.thread.comment);
	const replies = computed(() => props.thread.subThread.replies);
	const hasNext = computed(() => props.thread.subThread.next !== null);

	const likeComment = async function(comment: Comment){		
		const payload = {
			likes: {
				add: [] as number[],
				remove: [] as number[],
			}
		};

		if(comment.is_liked)
			payload.likes.remove = [user.value.id];
		else 
			payload.likes.add = [user.value.id];

		await emit('updateComment', comment, payload);
	}

	const deleteComment = async function(comment: Comment){
		await emit('updateComment', comment, { is_deleted: true });
	}
</script>
<template>
	<ThreadComment 
		:user="user"
		:comment="comment" 
		:has-replies="true"
		@like="likeComment"
		@delete="deleteComment"
		@fetch-replies="$emit('fetchReplies', thread)">
		<ThreadComment 
			v-for="reply in replies" 
			:key="reply.id" 
			:user="user"
			:comment="reply.comment" 
			:has-replies="false"
			@delete="deleteComment"
			@like="likeComment" />
		<button 
			v-if="hasNext" 
			class="mx-auto btn bg-violet-700 text-white" 
			@click="$emit('fetchReplies', thread, thread.subThread.next)">
			Load more
		</button>
	</ThreadComment>
</template>
