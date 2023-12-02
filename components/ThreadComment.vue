<script setup lang="ts">
	import type User from '~/lib/api/models/user.model';
	import type Comment from '~/lib/api/models/comment.model';

	type ThreadCommentProps = {
		comment: Comment,
		user: User,
		hasReplies: boolean,
	}

	defineProps<ThreadCommentProps>();

	const emits = defineEmits<{ 
		(change:'reply'): Promise<void>,
		(change:'fetchReplies'): Promise<void>,
		(change:'like', comment: Comment): Promise<void>,
		(change:'delete', comment: Comment): Promise<void>,
	}>();

	const loadingReplies = ref(false);

	const fetchReplies = async function(){
		loadingReplies.value = true;
		try {
			await emits('fetchReplies');
		}catch(error){

		}finally {
			loadingReplies.value = false;
		}
	}
</script>
<template>
	<div class="flex space-x-2 items-start mb-2">
		<div class="flex flex-col">
			<img 
				:src="comment.user.avatar" 
				class="w-10 h-10 rounded-full object-cover" />
		</div>
		<div class="flex-1 flex flex-col space-y-2">
			<div class="flex items-center">
				<div class="flex-1 flex space-x-2">
					<p class="text-base font-medium">{{ comment.user.full_name }}</p>
					<p class="flex-1 text-stone-500 truncate max-w-32">@{{ comment.user.username }}</p>
				</div>
				<ThreadCommentMenu
					:user="user"
					:comment="comment"
					@delete="comment => $emit('delete', comment)" />
			</div>
			<div
				v-if="comment.is_deleted" 
				class="flex center h-18 p-4 bg-stone-100 rounded-xl">
				<p class="text-stone-500">This comment have been removed by moderators or the creator.</p>
			</div>
			<template v-else>
				<div class="flex-1 flex flex-col bg-stone-100 px-4 py-2  rounded-md">
					<p class="text-stone-700">{{ comment.content }}</p>
				</div>
				<div class="flex space-x-4">
					<button 
						class="flex space-x-1 items-center"
						@click="$emit('like', comment)">
						<UnoIcon 
							class="text-lg" 
							:class="comment.is_liked ?
							'i-mdi:heart text-red-500' :
							'i-mdi:heart-outline text-stone-500'" />
						<span class="text-sm">{{ comment.like_count }} likes</span>
					</button>
					<button 
						v-if="hasReplies"
						class="flex space-x-2 items-center text-xs"
						:disabled="loadingReplies"
						@click="fetchReplies">
						<UnoIcon class="i-mdi:comment-outline text-lg text-stone-500" />
						<span class="text-sm">{{ comment.reply_count }} replies</span>
					</button>
					<button 
						class="text-emerald-500 text-sm"
						@click="$emit('reply')">Reply</button>
				</div>
				<div 
					v-if="hasReplies" 
					class="flex-1 sub__comment flex flex-col space-y-4 py-2">
					<slot />
				</div>
			</template>
		</div>
	</div>
</template>
