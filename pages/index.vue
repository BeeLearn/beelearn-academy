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
    const categories = computed(()=> categoryStore.categories);

    const categoryIsLoading = computed(() => categoryStore.isLoading);
    const newInIsLoading = computed(() => courseNewInStore.isLoading);
    const inProgressIsLoading = computed(() => courseInProgressStore.isLoading);
    const completedIsLoading = computed(() => courseCompletedStore.isLoading);

    useAsyncData(async () => {
        const actions: Promise<void>[] = [];
        
        if(categoryStore.state === "idle")
            actions.push(categoryStore.getCategories());
        if(courseNewInStore.state === "idle")
            actions.push(courseNewInStore.getNewIn());
        if(courseInProgressStore.state === "idle")
            actions.push(courseInProgressStore.getInProgress());
        if(courseCompletedStore.state === "idle")
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
                        :loading="newInIsLoading" />
                    <HomeSingleCategoryTab 
                        v-else-if="tab.name === 'in-progress'"
                        :courses="inProgress"
                        :loading="inProgressIsLoading" />
                    <HomeSingleCategoryTab 
                        v-else-if="tab.name === 'completed'"
                        :courses="completed"
                        :loading="completedIsLoading" />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>
