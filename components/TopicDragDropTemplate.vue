<script setup lang="ts">
    interface TopicDragDropTemplateProps {
        token: string;
        submitting: boolean;
    }

    const placeholder = ref <HTMLDivElement>();
    const props = defineProps<TopicDragDropTemplateProps>();

    const isCorrect = () => {
        const childElement = placeholder.value!.firstElementChild!;
        const value = childElement!.getAttribute("aria-hidden-value");
        return props.token === value;
    };
</script>
<template>
    <div 
        v-if="/^%.*?%?$/.test(token)" 
        ref="placeholder"
        class="flex flex-col border-2 px-6 py-4 rounded-md outline-none transition duration-150 cursor-text"
        not-empty="border-purple-700 bg-purple-100 p-0" 
        :class="{
			'not-empty:!border-green-500 not-empty:!bg-green-100': submitting && isCorrect(),
			'not-empty:!border-red-500 not-empty:!bg-red-100': submitting && !isCorrect(),
		}" 
        :aria-hidden-value="token" />
</template>