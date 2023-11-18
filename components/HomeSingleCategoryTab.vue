<script setup lang="ts">
    import type Course from '~/lib/api/models/course.model';

    type HomeSingleCategoryTabProps  = {
        courses: Course[],
    };

    defineProps<HomeSingleCategoryTabProps>();
</script>
<template>
    <div 
        class="flex-1 grid grid-cols-2 px-2 py-4 gap-2"
        md="flex flex-wrap">
        <CourseItem 
            v-for="course in courses" 
            :key="course.id" 
            :course="course" />
    </div>
</template>
