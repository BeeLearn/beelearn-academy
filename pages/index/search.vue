<script setup lang="ts">
	import Api from '~/lib/api';
	import type Course from '~/lib/api/models/course.model';

	const toast = useToast();

	const isLoading = ref(false);
	const oldQuery = ref<string|null>();
	const query = ref<string|null>(null);

	const next = ref<string|null>();
	const courses = ref<Course[] | null>(null);

	const fetchCourses = async function(...args: Parameters<typeof Api.instance.courseProvider.list>){
		const { data } =  await Api.instance.courseProvider.list(...args);

		next.value = data.next;

		return data.results;
	}

	watch(query, async (value) => {
		if(!value || value === oldQuery.value) return;

		isLoading.value = true;
		const results = await fetchCourses({
				query: {
					search: value,
				}
		})
		.then(data => {
				courses.value = data;
				oldQuery.value = query.value;
		})
		.catch((error) => {
			toast.error('An unexpected error occur. Try again!');
			
			throw error;
		})
		.finally(() => {
			isLoading.value = false;
		})
	});

	const loadMore = async function(){
		const results = await fetchCourses({ url: next.value });
		courses.value = courses.value!.concat(results);
	}
</script>
<template>
	<div 
		class="fixed inset-0 flex flex-col bg-black/50"
		md="items-end">
		<div 
			class="flex-1 flex flex-col bg-white overflow-y-scroll"
			md="w-1/2"
			lg="w-md"
			xl="w-lg">
			<header class="flex space-x-2 py-2 shadow">
				<button 
					class="btn text-stone-500"
					@click="$router.back()">
					<UnoIcon class="i-mdi:close text-lg" />
				</button>
				<Search v-model:search="query" />
				<button 
					class="btn text-violet-700"
					@click="$router.back()">Close</button>
			</header>
			<main class="flex-1 flex flex-col space-y-2 pb-4 overflow-y-scroll">
				<div
					v-if="isLoading" 
					class="m-auto progress progress-primary" />
				<div
					v-else-if="query === null || courses === null" 
					class="m-auto flex flex-col space-y-4">
					<button class="m-auto w-10 h-10 flex center bg-violet-700 text-white rounded-full">
						<UnoIcon class="i-mdi:search text-xl" />
					</button>
					<div>
						<h1 class="text-center text-xl">Search for a courses</h1>
						<p class="text-stone-500">Search for course, categories</p>
					</div>
				</div>
				<div
					v-else-if="courses && courses.length < 1" 
					class="m-auto flex flex-col space-y-4">
					<img 
						src="@/assets/illustrations/books.svg"
						class="m-auto w-32 h-24" />
					<div>
						<h1 class="text-center text-xl">No result found</h1>
						<p class="text-stone-500">Try another keyword again!</p>
					</div>
				</div>
				<template v-else>
					<div class="flex-1 flex flex-wrap p-4 gap-4">
						<CourseItem
							v-for="course in courses"
							:key="course.id"
							:course="course" />
					</div>
					<LoadMoreButton
						v-if="next"
						class="mx-auto" 
						:load-more="loadMore"/>
				</template>
			</main>
		</div>
	</div>
</template>
