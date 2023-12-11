<script setup lang="ts">
	import Api from "~/lib/api";
	import type { Course } from "~/lib/api/models/course.model.ts";

	const route = useRoute();

	const next = ref<string|null>();
	const state = ref<LoadingState>("idle");
	const courses = ref<Course[] | null>(null);


	const loadMore = function(){
		return Api.instance.courseProvider.list({ url: next.value })
		.then(({ data }) => {
			next.value = data.next;
			courses.value = courses.value.concat(data.results);
		});
	}

	useAsyncData(async () => {
		state.value = "loading";
		const tagId = route.params.tagId;

		Api.instance.courseProvider.list({
			query: {
				tags: tagId,
			},
		})
		.then(({ data }) => {
			state.value = "success";
			next.value = data.next;
			courses.value = data.results;
		}).catch(() => state.value = "failed");
	});
</script>
<template>
  <div 
		class="fixed inset-0 flex flex-col bg-black/50 z-10"
		md="items-end">
		<div 
			class="flex-1 flex flex-col bg-white overflow-y-scroll"
			md="w-md">
			<header class="flex space-x-2 items-center shadow p-2">
				<button 
					class="p-2"
					@click="$router.back()">
					<UnoIcon class="i-mdi:close text-xl text-stone-700" />
				</button>
				<h1 class="text-xl font-extrabold">{{ route.query.tagName }}</h1>
			</header>
			<div
				v-if="state === 'loading'" 
				class="m-auto progress progress-primary" />
			<div
				v-else-if="courses && courses.length === 0" 
				class="m-auto flex flex-col space-y-2 items-center">
				<img 
					src="@/assets/illustrations/books.svg"
					class="w-40 h-40" />
					<div class="text-center">
						<h1 class="text-xl">Empty category</h1>
						<p class="text-stone-700">We are sorry. No course added to this category.</p>
					</div>
					<div>
						<NuxtLink 
							to="/" 
							class="btn btn-primary space-x-2">
							<UnoIcon class="i-material-symbols:explore text-xl" />
							<span>Explore</span>
						</NuxtLink>
					</div>
			</div>
			<div 
				v-else
				class="flex-1 flex flex-col items-center py-4">
				<div
					class="flex gap-4 flex-wrap justify-center overflow-y-scroll">
					<CourseItem 
						v-for="course in courses" 
						:key="course.id" 
						:course="course" />
				</div>
				<LoadMoreButton
					v-if="next !== null"
					:load-more="loadMore" />
			</div>
		</div>
	</div>
</template>