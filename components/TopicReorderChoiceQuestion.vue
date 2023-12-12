<script setup lang="ts">
    import VueDraggable from 'vuedraggable';
    import shuffleArray from 'shuffle-array';

    import type { FormExpose } from '~/widget.types';
    import type { ReorderChoiceQuestion, ReorderOption } from '~/lib/api/models/question.model';

    interface TopicReorderChoiceQuestionProps {
        submitting: boolean,
        question: ReorderChoiceQuestion,
    }

    interface FormChange<T, U = T> {
        (event: "change", value: T): void;
        (event: "submit", options: U): Promise<void>;
        (event: "update:submitting", value: boolean) : void,
    };


    const props = defineProps<TopicReorderChoiceQuestionProps>();
    const emit = defineEmits<FormChange<ReorderOption, ReorderOption[]>>();

    const options = ref(shuffleArray(props.question.choices, { copy: true }));
    const isCorrect  = computed(() => options.value.every((option, index) => option.position === index));

    defineExpose<FormExpose>({
        get changed(){
            return true;
        },
        get isCorrect(){
            return isCorrect.value;
        },
        async submit() {
            if(this.changed){                       
                emit("update:submitting", true);
                await emit("submit", options.value);
            }
        },
        reset() {},
    });
</script>
<template>
    <VueDraggable
        v-model="options"
        itemKey="id"
        ghostClass="ghost"
        class="flex flex-col space-y-2"
        :animation="150"
        :disable="submitting"
        @update="(value) => emit('change', value)"
        @start="() => emit('update:submitting', false)">
        <template #item="{element, index}">
            <ElevatedButton
                class="cursor-move bg-white"
                :state="submitting ? index === element.position && isCorrect ? 'success' : 'error' : null">
                {{ element.name }}
            </ElevatedButton>
        </template>
      </VueDraggable>
</template>
  <style scoped>
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
</style>
  