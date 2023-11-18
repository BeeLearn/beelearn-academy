<script setup lang="ts">
    import { Tab } from "@headlessui/vue";

    import type CourseTabs from "@/data/courseTab";

    type HomeTabRouteProps = {
        tab: typeof CourseTabs[number]
    }

    const props = defineProps<HomeTabRouteProps>();

    const name = computed(() => props.tab.name.replace("-", " "))
</script>
<template>
    <Tab 
        as="template"
        v-slot="{ selected }">
        <div
            v-if="selected"
            class="flex space-x-2 px-2 py-3 text-nowrap border-b-4 border-violet-700 text-violet-700 rounded-b cursor-pointer" 
            md="border-0 rounded-t bg-violet-100">
            <UnoIcon 
                class="text-xl hidden md:block"
                :class="tab.activeIcon" />
            <span>{{name}}</span>
        </div>
        <div
            v-else 
            class="flex space-x-2 px-2 py-3 text-stone-700 text-nowrap cursor-pointer">
            <UnoIcon 
                class="text-xl hidden md:block"
                :class="tab.icon" />
            <span>{{name}}</span>
        </div>
    </Tab>
</template>
