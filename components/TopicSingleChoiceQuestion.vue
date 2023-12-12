<script setup lang="ts">
    import type { FormExpose } from '~/widget.types';
    import type { SingleChoiceQuestion, Option } from '~/lib/api/models/question.model';

    interface TopicSingleChoiceQuestionProps  {
        question: SingleChoiceQuestion,
        submitting: boolean,
    }

    interface TopicSingleChoiceQuestionEmits  {
        (event: "change", value: Option): void;
        (event: "submit", options: Option): Promise<void>;
        (event: 'update:submitting', value: boolean): void;
    }

    const selectedOption = ref<Option | null>(null);

    defineProps<TopicSingleChoiceQuestionProps>();
    const emit = defineEmits<TopicSingleChoiceQuestionEmits>();
    defineExpose<FormExpose>({
        get changed(){
            return selectedOption.value !== null;
        },
        get isCorrect(){
            return selectedOption.value?.is_answer;
        },
        async submit(){
            if(this.changed){
                emit("update:submitting", true);
                await emit("submit", selectedOption.value!);
            }
        },
        reset(){
            selectedOption.value = null;
        }
    });
</script>
<template>
    <div class="flex flex-col space-y-2">
        <ElevatedButton 
            v-for="option in question.choices"
            :key="option.id"
            :state="selectedOption?.id === option.id ? 
                submitting ? option.is_answer ? 'success' : 'error' : 'selected' 
            : null"
            class="transition"
            @click="() => {
                if(submitting && selectedOption?.id !== option.id)
                    $emit('update:submitting', false);

                if(selectedOption?.id === option.id)
                    return

                selectedOption = option;
                emit('change', option);
            }">
            {{ option.name }}
        </ElevatedButton>
    </div>
</template>
