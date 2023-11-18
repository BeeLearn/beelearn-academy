<script setup lang="ts">
    import type TopicQuestion from '~/lib/api/models/topic_question.model';

    interface TopicFooterProps {
        loading: boolean,
        canBack: boolean,
        actionDisabled: boolean,
        isQuestionView: boolean,
        topicQuestion?: TopicQuestion,
    }

    interface TopicFooterEmits {
        (event: "back"): void,
        (event: "next"): void,
        (event: "continue"): void,
        (event: "unlock"): void,
    }

    defineProps<TopicFooterProps>();
    defineEmits<TopicFooterEmits>();
</script>
<template>
    <footer 
        class="grid gap-2 bg-white border-t border-gray-300 p-4" 
        md="flex space-x-8 place-content-center"
        :class="isQuestionView && topicQuestion?.is_answered ? 'grid-cols-3 grid-rows-2' : 'grid-cols-3'">
        <button 
            v-if="canBack" 
            class="px-8 py-3 flex center btn-outline-primary rounded" 
            @click="$emit('back')">Back</button>
        <button 
            v-if="isQuestionView" 
            class="btn text-violet-700"
            @click="$emit('unlock')">
            <UnoIcon class="i-mdi:lock-open text-xl" />
        </button>
        <button 
            v-if="isQuestionView && topicQuestion?.is_answered" 
            class="btn text-violet-700"
            @click="$emit('next')">Skip</button>
        <button 
            :disabled="loading || actionDisabled" 
            class="px-8 py-3 flex space-x-2 center btn-inverse rounded col-start-3"
            @click="$emit('continue')">
            <div 
                v-if="loading" 
                class="grid-start-3 w-6 h-6 border-4 border-t-transparent rounded-full animate-spin" />
            <span v-else>{{ isQuestionView ? 'Check' : 'Continue' }}</span>
        </button>
    </footer>
</template>
