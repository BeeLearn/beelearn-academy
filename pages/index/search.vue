<script setup lang="ts">
	import Api from '~/lib/api';
	import type Course from '~/lib/api/models/course.model';

	const query = ref<string|null>(null);

	const next = ref<string|null>(null);
	const courses = ref<Course[] | null>(null);

	watch(query, async (value, oldValue) => {
		const { data } =  await Api.instance.courseProvider.list({
			query: {
				search: value,
			}
		});

		next.value = data.next;
		courses.value = data.results;
	});
</script>
<template>
	<div 
		class="fixed inset-0 flex flex-col bg-black/50"
		md="items-end">
		<div 
			class="flex-1 flex flex-col bg-white"
			md="w-1/2"
			lg="w-1/3">
			<header class="flex space-x-2 py-2 shadow">
				<button 
					class="btn text-stone-500"
					@click="$router.back()">
					<UnoIcon class="i-mdi:close text-lg" />
				</button>
				<Search v-model:search="query" />
				<button 
					class="btn text-emerald-500"
					@click="$router.back()">Close</button>
			</header>
			<main class="flex-1 flex flex-wrap p-4 gap-4">
				<div
					v-if="courses === null" 
					class="m-auto flex flex-col space-y-4">
					<button class="m-auto w-10 h-10 flex center bg-emerald-500 text-white rounded-full">
						<UnoIcon class="i-mdi:search text-xl" />
					</button>
					<div>
						<h1 class="text-center text-xl">Search for a courses</h1>
						<p class="text-stone-500">Search for course, categories</p>
					</div>
				</div>
				<CourseItem
					v-else 
					v-for="course in courses"
					:key="course.id"
					:course="course" />
			</main>
		</div>
	</div>
</template>
