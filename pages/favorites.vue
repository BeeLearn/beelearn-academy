<script setup lang="ts">
	const userStore = useUserStore();
	const favoriteCourseStore = useFavoriteCourseStore();

	const user = computed(() => userStore.user!);
	const isLoading = computed(() => favoriteCourseStore.isLoading);
	const favoriteCourses = computed(() => favoriteCourseStore.favoriteCourses);

	useAsyncData(async () => {
		if(favoriteCourseStore.state === "idle")
			favoriteCourseStore.fetchFavoriteCourses();
	});
</script>
<template>
	<div 
		class="flex-1 flex flex-col"
		md="w-1/2 place-self-center"
		lg="w-1/2">
		<header class="p-4">
			<h1 class="text-2xl font-extrabold">Favorites</h1>
			<p class="text-stone-700">When you like a topic they will be available as a collection</p>
		</header>
		<div
			v-if="isLoading" 
			class="m-auto progress progress-primary" />
		<div 
			v-else-if="true"
			class="m-auto flex flex-col space-y-4 items-center">
			<img 
				src="@/assets/illustrations/il_book_collection.svg"
				class="w-64 h-48" />
			<div class="flex flex-col items-center space-y-1 text-center">
				<h1 class="text-xl">No collection yet!</h1>
				<p class="text-stone-700">Browse our exclusive course and try adding to your collection.</p>
				<NuxtLink 
					to="/" 
					class="btn btn-primary">Home</NuxtLink>
			</div>
		</div>
		<div 
			v-else
			class="flex-1 flex flex-col p-4">
			<NuxtLink
				v-for="favoriteCourse in favoriteCourses"
				:key="favoriteCourse.id" 
				:to="`/favorites/topics?likes=${user.id}&lesson__module__course=${favoriteCourse.id}`"
				class="flex space-x-2 items-center border bg-white px-4 py-2 rounded-xl">
				<img
					:src="favoriteCourse.illustration" 
					class="w-12 h-16 border shadow rounded-lg object-cover" />
				<div class="flex-1 flex flex-col space-y-1">
					<p>{{ favoriteCourse.name }}</p>
				</div>
				<div class="flex center w-8 h-8 bg-slate-200 rounded-full">
					{{ favoriteCourse.liked_topic_count }}
				</div>
			</NuxtLink>
		</div>
		<NuxtPage />
	</div>
</template>
