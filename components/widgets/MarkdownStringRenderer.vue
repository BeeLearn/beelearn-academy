<script setup>
    import markdownParser from "@nuxt/content/transformers/markdown"

    const props = defineProps({
        value: {
            type: String,
            required: true,
        }
    });

    const record = ref();

    useAsyncData(async () => {
        record.value = await markdownParser.parse("custom.md", props.value);
    })
</script>

<template>
    <ContentRendererMarkdown 
        v-if="record"
        :value="record" />
    <div
        v-else
        class="flex-1 flex center">
        <div class="progress progress-primary m-auto" />
    </div>
</template>
