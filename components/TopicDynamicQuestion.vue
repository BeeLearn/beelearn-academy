<script setup lang="ts">
    import type { FormExpose } from '~/widget.types';
    import type TopicQuestion from '~/lib/api/models/topic_question.model';
    import type { ReorderChoiceQuestion, MultiChoiceQuestion, SingleChoiceQuestion, TextOptionQuestion, DragDropQuestion } from '~/lib/api/models/question.model';

    interface TopicQuestionProps {
        changed: boolean,
        submitting: boolean,
        topicQuestion: TopicQuestion,
        innerRef?: FormExpose | null,
    }

    const innerRef = ref<FormExpose | null>(null);

    defineProps<TopicQuestionProps>();
    const emit = defineEmits<{
        (event: "update:changed", value: boolean) : void,
        (event: "update:submitting", value: boolean) : void,
        (event: "update:innerRef", value: FormExpose): void,
        (event: "submit", changed: boolean): void,
    }>();

    onMounted(() => {
        setTimeout(() => emit('update:innerRef', innerRef.value!));
    });
</script>
<template>
    <h1 class="text-base">{{ topicQuestion.question.title }}</h1>
    <TopicReorderChoiceQuestion 
        v-if="topicQuestion.question_content_type == 'reorderchoicequestion'" 
        ref="innerRef"
        :question="topicQuestion.question as ReorderChoiceQuestion" 
        :submitting="submitting" 
        @update:submitting="value => $emit('update:submitting', value)"
        @change="$emit('update:changed', innerRef!.changed)"
        @submit="$emit('submit', innerRef!.changed)"/>
    <TopicMultiChoiceQuestion 
        v-else-if="topicQuestion.question_content_type == 'multichoicequestion'" 
        ref="innerRef"
        :submitting="submitting"
        :question="topicQuestion.question as MultiChoiceQuestion" 
        @update:submitting="value => $emit('update:submitting', value)" 
        @change="$emit('update:changed', innerRef!.changed)"
        @submit="$emit('submit', innerRef!.changed)" />
    <TopicSingleChoiceQuestion 
        v-else-if="topicQuestion.question_content_type == 'singlechoicequestion'" 
        ref="innerRef"
        :question="topicQuestion.question as SingleChoiceQuestion" 
        :submitting="submitting" 
        @update:submitting="value => $emit('update:submitting', value)"
        @change="$emit('update:changed', innerRef!.changed)"
        @submit="$emit('submit', innerRef!.changed)" />
    <TopicTextOptionQuestion 
        v-else-if="topicQuestion.question_content_type == 'textoptionquestion'" 
        ref="innerRef"
        :submitting="submitting"
        :question="topicQuestion.question as TextOptionQuestion" 
        @update:submitting="value => $emit('update:submitting', value)"
        @change="$emit('update:changed', innerRef!.changed)"
        @submit="$emit('submit', innerRef!.changed)"  />
    <TopicDragDropQuestion 
        v-else-if="topicQuestion.question_content_type == 'dragdropquestion'" 
        ref="innerRef"
        :question="topicQuestion.question as DragDropQuestion" 
        :submitting="submitting" 
        @update:submitting="value => $emit('update:submitting', value)"
        @change="$emit('update:changed', innerRef!.changed)"
        @submit="$emit('submit', innerRef!.changed)" />
</template>
