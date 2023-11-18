<script setup lang="ts">
    import type Category from "~/lib/api/models/category.model";

    type HomeCategoryTabProps = {
        loading: boolean,
        categories: Category[],
    }

    defineProps<HomeCategoryTabProps>();
</script>
<template>
    <div
        v-if="loading" 
        class="m-auto progress progress-primary" />
    <template v-else>
        <div>
            <h1 class="text-2xl font-extrabold p-4">Categories you're interested in</h1>
            <div class="flex space-x-2 flex-nowrap overflow-x-scroll px-4">
                <button class="flex space-x-2 items-center shrink-0 bg-white p-2 border rounded-xl">
                    <img 
                        src="~/assets/test/money.svg"
                        class="w-8 h-8" />
                    <span>Web development</span>
                </button>
            </div>
        </div>
        <div 
            v-for="category in categories" 
            :key="category.id" 
            class="flex flex-col">
            <div class="flex flex-col px-4 py-2">
                <h1 class="text-xl font-extrabold">{{ category.name }}</h1>
                <p class="text-stone-700">Similar summaries to ones you liked</p>
            </div>
            <div class="flex space-x-2 px-4 snap-x snap-mandatory overflow-x-scroll">
                <CourseItem
                    v-for="course in category.courses" 
                    :key="course.id"
                    :course="course" />
            </div>
        </div>
        <div class="flex flex-col space-y-2 p-4">
            <h1 class="text-xl font-extrabold">Personalized challenges</h1>
            <div class="relative max-w-sm p-4 bg-fuchsia-100 border-1 border-fuchsia-200 rounded-lg">
                <div class="space-y-4 max-w-xs">
                    <h1 class="text-3xl font-extrabold">Let's Practice together</h1>
                    <button class="px-8 py-3 bg-white text-fuchsia-700 rounded-full">Practice now</button>
                </div>
                <UnoIcon class="i-mdi:medal absolute -top-2 right-0 text-8xl text-violet-500" />
            </div>
        </div>
    </template>
</template>
