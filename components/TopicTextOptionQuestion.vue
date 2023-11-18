<script setup lang="ts">
	import type { FormExpose } from '~/widget.types';
	import type { TextOptionQuestion } from '~/lib/api/models/question.model';

	interface TopicTextOptionQuestionProps {
		question: TextOptionQuestion,
		submitting: boolean,
	};

	interface TopicSingleChoiceQuestionEmits {
		(event: "change", value: string): void;
		(event: "submit", values: string[][]): Promise<void>;
		(event: 'update:submitting', value: boolean): void;
	}

	const values = ref<Record<string, string>>({});
	const fragment = ref<HTMLDivElement>();

	const textEdits = computed(() => fragment.value!.querySelectorAll("div[contenteditable='true']"));

	defineProps<TopicTextOptionQuestionProps>();
	const emit = defineEmits<TopicSingleChoiceQuestionEmits>();
	defineExpose<FormExpose>({
		get changed() {
			return Array.from(textEdits.value).every(textEdit => {
				const value = textEdit.textContent!;

				return value.trim().length > 0;
			});
		},
		async submit() {
			if(this.changed){
				const options = Array.from(textEdits.value).map(textEdit => {
					const value = textEdit.textContent!;
					const defaultValue = textEdit.getAttribute("aria-hidden-value")!;

					return [defaultValue, value];
				});

				emit("update:submitting", true);
				await emit("submit", options);
			}
		},
		reset() { },
	});
</script>
<template>
	<div 
		ref="fragment" 
		class="flex flex-col space-y-1">
		<div 
			v-for="line in question.question.split(/\n/)" 
			class="flex items-center whitespace-pre-wrap">
			<template 
				v-for="token in line.split(/(\s+)/).map(element => element.replace(/\;/, ''))">
				<div 
					v-if="/^%.*?%?$/.test(token)"
					class="border-2 px-6 py-2 rounded-md outline-none max-w-48 transition duration-150" 
					:class="{
						'not-empty:!border-green-500 not-empty:!bg-green-100': submitting && `%${values[token]}%` == token,
						'not-empty:!border-red-500 not-empty:!bg-red-100': submitting && `%${values[token]}%` != token,
					}" 
					not-empty="border-purple-700 bg-purple-100" 
					:aria-hidden-value="token" 
					contenteditable 
					@keyup="(event) => {
						emit('update:submitting', false);

						const value = (event.currentTarget as HTMLDivElement).textContent!;
						values[token] = value;
					}" />
				<span v-else>{{ token }} </span>
			</template>
		</div>
	</div>
</template>
