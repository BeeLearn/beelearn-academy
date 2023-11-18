<script setup lang="ts">
    const route = useRoute();
    const moduleStore  = useModuleStore();

    const modules = computed(() => moduleStore.modules);   
    const breadcrumb = computed(() => moduleStore.breadcrumb);
    const isLoading = computed(() => ["idle", "pending"].includes(moduleStore.state));

    useAsyncData(async () => {
        const courseId = route.params.courseId as string;
        moduleStore.getModules(courseId);
    });

    onUnmounted(() => {
        moduleStore.$reset();
    });
</script>
<template>
    <section 
        class="flex-1 flex flex-col bg-slate-50 overflow-y-scroll py-4"
        md="items-center px-0">
        <div
            v-if="isLoading" 
            class="m-auto progress progress-primary" />
        <div 
            v-else
            class="flex-1 flex flex-col space-y-4"
            md="w-4/6"
            lg="w-1/2">
            <div class="flex space-x-2 card p-4 mx-4">
                <div class="w-28 h-36">
                    <img 
                        class="w-full h-full rounded-xl object-cover" 
                        :src="breadcrumb?.course.illustration"/>
                </div>
                <div class="flex-1">
                    <h1 class="text-xl font-semibold">{{breadcrumb?.course.name}}</h1>
                    <p 
                        class="text-sm text-stone-700"
                        md="text-base">{{ breadcrumb?.course.description }}</p>
                </div>
            </div>
            <ModuleList :modules="modules" />
        </div>
        <NuxtPage />
    </section>
</template>