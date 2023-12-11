<script setup lang="ts">
	import { TabGroup, TabPanels, TabPanel } from "@headlessui/vue";

	import courseTabs from "@/data/courseTab";

	const categoryStore = useCategoryStore();
	const courseNewInStore = useCourseNewInStore();
	const courseInProgressStore = useCourseInProgressStore();
	const courseCompletedStore = useCourseCompletedStore();

	const newIn = computed(() => courseNewInStore.courses);
	const inProgress = computed(() => courseInProgressStore.courses);
	const completed = computed(() => courseCompletedStore.courses);
	const categories = computed(() => categoryStore.categories);

	const categoryIsLoading = computed(() => categoryStore.isLoading);
	const newInIsLoading = computed(() => courseNewInStore.isLoading);
	const inProgressIsLoading = computed(() => courseInProgressStore.isLoading);
	const completedIsLoading = computed(() => courseCompletedStore.isLoading);

	useAsyncData(async () => {
		const actions: Promise<void>[] = [];

		if (categoryStore.state === "idle")
			actions.push(categoryStore.getCategories());
		if (courseNewInStore.state === "idle")
			actions.push(courseNewInStore.getNewIn());
		if (courseInProgressStore.state === "idle")
			actions.push(courseInProgressStore.getInProgress());
		if (courseCompletedStore.state === "idle")
			actions.push(courseCompletedStore.getCompleted());

		await Promise.all(actions);
	});
</script>
<template>
	<div 
		class="flex-1 flex flex-col" 
		md="flex-row overflow-hidden">
		<TabGroup vertical>
			<HomeTab class="sticky top-0 z-10 md:z-0" />
			<TabPanels class="flex-1 flex flex-col bg-slate-50 overflow-x-scroll">
				<TabPanel 
					v-for="tab in courseTabs" 
					:key="tab.name" 
					class="flex-1 flex flex-col space-y-2">
					<HomeCategoryTab 
						v-if="tab.name === 'categories'" 
						:categories="categories" 
						:loading="categoryIsLoading" />
					<HomeSingleCategoryTab 
						v-else-if="tab.name === 'new-in'" 
						:courses="newIn" 
						:loading="newInIsLoading">
						<img 
							src="@/assets/illustrations/il_note.svg"
							class="w-32 h-32" />
						<div class="flex flex-col space-y-2">
							<div>
								<h1 class="text-xl">No new course yet!</h1>
								<p class="text-stone-700">You will find all newly add content here</p>
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
					</HomeSingleCategoryTab>
					<HomeSingleCategoryTab 
						v-else-if="tab.name === 'in-progress'" 
						:courses="inProgress"
						:loading="inProgressIsLoading">
						<img 
							src="@/assets/illustrations/il_timer.svg"
							class="w-32 h-32" />
						<div class="flex flex-col space-y-2">
							<div>
								<h1 class="text-xl">No pending course found!</h1>
								<p class="text-stone-700">Enroll a new course now to get experience with fun.</p>
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
					</HomeSingleCategoryTab>
					<HomeSingleCategoryTab 
						v-else-if="tab.name === 'completed'" 
						:courses="completed"
						:loading="completedIsLoading">
						<img 
							src="@/assets/illustrations/il_complete.svg"
							class="w-56 h56" />
						<div class="flex flex-col space-y-2">
							<div>
								<h1 class="text-xl">No completed course yet!</h1>
								<p class="text-stone-700">Take on a new challenge by completing a course.</p>
							</div>
						</div>
					</HomeSingleCategoryTab>
				</TabPanel>
			</TabPanels>
		</TabGroup>
		<Teleport to="#__nuxt">
			<NuxtPage />
		</Teleport>
	</div>
</template>
