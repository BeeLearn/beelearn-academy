<script setup lang="ts">
    import type { FormExpose } from '~/widget.types';
    import type { MultiChoiceQuestion, Option } from '~/lib/api/models/question.model';

    interface TopicMultiChoiceQuestionProps  {
        question: MultiChoiceQuestion,
        submitting: boolean,
    }

    interface TopicMultiChoiceQuestionEmits  {
        (event: "change", value: Option): void;
        (event: "submit", options: Option[]): Promise<void>;
        (event: 'update:submitting', value: boolean): void;
    }

    const isSubmit = ref(false);
    const selectedOptions = ref<Map<Option["id"], Option>>(new Map());
    const isCorrect = computed(() => Array.from(selectedOptions.value.values()).every((option) => option.is_answer));
    const emit = defineEmits<TopicMultiChoiceQuestionEmits>();


    const  reset = () => {
        emit("update:submitting", false);
        selectedOptions.value = new Map();
    }

    defineProps<TopicMultiChoiceQuestionProps>();
    defineExpose<FormExpose>({
        reset,
        get changed(){
            return selectedOptions.value.size > 0;
        },
        get isCorrect(){
            return isCorrect.value;
        },
        async submit(){
            if(this.changed){
                emit("update:submitting", true);
                await emit("submit", Array.from(selectedOptions.value.values()));
            }
        },
    });
</script>
<template>
    <div class="flex flex-col space-y-2">
        <ElevatedButton 
            v-for="option in question.choices"
            :key="option.id"
            :state="selectedOptions.has(option.id) ? 
                submitting ? option.is_answer && isCorrect ? 'success' : 'error' : 'selected' 
                : null"
            class="transition"
            @click="() => {
                if(submitting)
                    $emit('update:submitting', false);

                if(selectedOptions.has(option.id)){
                    selectedOptions.delete(option.id);
                } else {
                    selectedOptions.set(option.id, option);
                }
                $emit('change', option);
            }">
            {{ option.name }}
        </ElevatedButton>
    </div>
</template>
