<script setup lang="ts">
	type LoadMoreProps = {
		loadMore: (event: 'loadMore') => Promise <void>,
	}

	const prop = defineProps<LoadMoreProps>();

	const toast = useToast();
	const isLoading  = ref(false);

	const onLoadMore = async function(){
		isLoading.value = true;

		try {
			await prop.loadMore('loadMore');
		} catch(error){
			toast.error("Can't load next page. Try again!");
		} finally{
			isLoading.value = false;
		}
	}
</script>
<template>
	<button
		:disabled="isLoading"
		class="btn btn-primary w-36" 
		@click="onLoadMore">
			<div
				v-if="isLoading" 
				class="w-6 h-6 progress border-white" />
			<span v-else>Load more</span>
		</button>
</template>
