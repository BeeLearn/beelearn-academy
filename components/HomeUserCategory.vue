<script setup lang="ts">

	// type HomeUserCategoryProps = {
	// };

	const userStore = useUserStore();
	const categories = computed(() => userStore.user!.categories);

	// defineProps<HomeUserCategoryProps>();
	const onClick = function() {

	}
</script>
<template>
	<div>
		<h1 class="text-xl font-extrabold p-4 ">Categories you're interested in</h1>
		<div class="flex space-x-2 flex-nowrap overflow-x-scroll px-4">
			<button
				v-for="category in categories" 
				:key="category.id"
				class="flex space-x-2 items-center shrink-0 bg-white border p-2 rounded-md"
				@click="onClick">
				<img
					:src="category.icon"
					class="w-6 h-6" />
				<span>{{category.name}}</span>
			</button>
		</div>
	</div>
</template>