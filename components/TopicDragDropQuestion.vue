<script setup lang="ts">
    import shuffleArray from "shuffle-array";

    import type { FormExpose } from "~/widget.types";
    import type { Choice, DragDropQuestion } from '~/lib/api/models/question.model';

    interface TopicDragDropQuestionProps {
        question: DragDropQuestion,
        submitting: boolean,
    };

    interface TopicDragDropQuestionEmits {
        (event: "change", value: Choice): void;
        (event: "submit", options: string[][]): Promise<void>;
        (event: 'update:submitting', value: boolean): void;
    };

    const props = defineProps<TopicDragDropQuestionProps>();

    const questionFragment = ref<HTMLDivElement>();
    const selectedOptions = ref<Set<Choice>>(new Set());
    const options = ref<Choice[]>(shuffleArray(props.question.choices));

    const optionPlaceholders = computed(() => questionFragment.value!.querySelectorAll("div[aria-hidden-value]"));

    const onSelected = function(option: Choice){
        for(const placeholder of optionPlaceholders.value){
            if(placeholder){
                if(placeholder.innerHTML.trim().length === 0){
                    const div = window.document.createElement("div");
                    div.innerText = option.name;
                    div.setAttribute("aria-hidden-value", `%${option.name}%`);
                    div.classList.add("cursor-pointer", "px-4", "py-2");

                    div.onclick = () => {
                        if(props.submitting)
                            emit('update:submitting', false);
                    
                        selectedOptions.value.delete(option);
                        placeholder.innerHTML = "";
                        emit('change', option);
                    };
                    placeholder.appendChild(div);
                    selectedOptions.value.add(option);
                    break;
                }
            }
        }
    };

    const emit = defineEmits<TopicDragDropQuestionEmits>();
    defineExpose<FormExpose>({
        get changed(){
            return Array.from(optionPlaceholders.value).every((placeholder) => {
                return placeholder.children.length > 0;
            });
        } ,
        get isCorrect(){
            return Array.from(optionPlaceholders.value).every((placeholder) => {
                const token = placeholder.getAttribute("aria-hidden-value");
                const value = placeholder.firstElementChild?.getAttribute("aria-hidden-value");
                return token === value;
            });
        },
        async submit(){
            if(this.changed){
                const values = Array.from(optionPlaceholders.value).map((placeholder) => {
                    const token = placeholder.getAttribute("aria-hidden-value");
                    const value = placeholder.firstElementChild!.getAttribute("aria-hidden-value");
                    return [token!, value!];
                });

                emit("update:submitting", true);
                setTimeout(async () => {
                    await emit('submit', values);
                }, 500);
            }
        },
        reset(){},
    });
</script>
<template>
    <div class="flex flex-col space-y-8">
        <div 
            ref="questionFragment" 
            class="flex flex-col space-y-1">
            <div 
                v-for="line in question.question.split(/\n/)" 
                class="flex items-center">
                <template 
                    v-for="token in line.split(/(\s+)/).map(element => element.replace(/\;/, ''))">
                    <TopicDragDropTemplate
                        v-if="/^%.*?%?$/.test(token)"
                        :token="token" 
                        :submitting="submitting" />
                    <span v-else>{{ token }} </span>
                </template>
            </div>
        </div>
        <div class="flex space-x-2 gap-y-2 center flex-wrap">
            <template                
                v-for="option in options"
                :key="option">
                <ElevatedButton
                    v-if="!selectedOptions.has(option)"
                    class="cursor-pointer"
                    :aria-hidden-value="option"
                    @click="() => {
                        if(selectedOptions.size < optionPlaceholders.length){
                            if(submitting)
                                $emit('update:submitting', false);

                            onSelected(option);
                            $emit('change', option);
                        }
                    }">
                    {{ option.name.replace(/^%|%$/g, "") }}
                </ElevatedButton>
            </template>
        </div>
    </div>
</template>
