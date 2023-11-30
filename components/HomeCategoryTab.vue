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
        <template                 
            v-for="category, index in categories" 
            :key="category.id">
            <HomeChallengeAction v-if="index === 1" />
            <div
                class="flex flex-col">
                <div class="flex flex-col px-4 py-2">
                    <h1 class="text-xl font-extrabold">{{ category.name }}</h1>
                    <p class="text-stone-700">{{ category.description }}</p>
                </div>
                <div class="flex space-x-2 px-4 snap-x snap-mandatory overflow-x-scroll">
                    <CourseItem
                        v-for="course in category.courses" 
                        :key="course.id"
                        :course="course" />
                </div>
            </div>
        </template>
    </template>
</template>
