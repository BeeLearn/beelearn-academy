<script setup lang="ts">
    import type Topic from '~/lib/api/models/topic.model';

    interface TopicDynamicContentProps {
        topic: Topic
    }

    defineProps<TopicDynamicContentProps>();
</script>
<template>
    <div 
        class="flex-1 flex flex-col overflow-y-scroll"
        md="px-8">
        <h1 class="text-4xl font-semibold">{{ topic.title }}</h1>
        <MarkdownStringRenderer
            :value="topic.content" 
            class="text-[14px] text-stone-700" />
    </div>
</template>
