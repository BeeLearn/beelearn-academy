<script setup lang="ts">
    import type Course from '~/lib/api/models/course.model';

    type HomeSingleCategoryTabProps  = {
        loading: boolean,
        courses: Course[],
    };

    defineProps<HomeSingleCategoryTabProps>();
</script>
<template>  
	<div 
		v-if="loading" 
		class="m-auto progress progress-primary" />
	<div 
		v-else-if="courses.length === 0"
		class="m-auto flex flex-col space-y-4 items-center text-center">
		<slot />
	</div>
    <template v-else>
        <div 
            class="flex-1 grid grid-cols-2 p-4 gap-x-2"
            md="flex flex-wrap">
            <CourseItem 
                v-for="course in courses" 
                :key="course.id" 
                :course="course" />
        </div>
    </template>
</template>
