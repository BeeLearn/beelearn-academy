<script setup lang="ts">
    import { TabList } from "@headlessui/vue";

    import courseTabs from '~/data/courseTab';
</script>
<template>
    <TabList 
        class="flex space-x-2 justify-center bg-white px-2 overflow-x-scroll border-b"
        md="w-1/4 flex-col justify-start space-x-0 shrink-0 py-4 border-b-0 border-r"
        lg="w-1/5">
        <HomeTabRoute
            v-for="tab in courseTabs"
            :key="tab.name"
            :tab="tab"
            class="capitalize md:flex-none" />
    </TabList>
</template>