<script setup lang="ts">
	const userStore = useUserStore();
	const categories = computed(() => userStore.user!.categories);
</script>
<template>
	<div class="flex flex-col">
		<h1 class="text-xl font-extrabold p-4 ">Categories you're interested in</h1>
		<div class="flex space-x-2 px-4 snap-x snap-mandatory overflow-scroll">
			<NuxtLink
				v-for="category in categories" 
				:key="category.id"
				:to="`/categories/${category.id}/?tagName=${category.name}`"
				class="flex space-x-2 items-center shrink-0 bg-white border p-2 rounded-md">
				<img
					:src="category.icon"
					class="w-6 h-6" />
				<span>{{category.name}}</span>
			</NuxtLink>
		</div>
	</div>
</template>