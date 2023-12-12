<script setup lang="ts">
	import { Schema } from "yup";
 	import {Field, ErrorMessage } from "vee-validate";

	type TextInputProps = {
		name: string,
		type?: string,
		rules?: Schema,
		placeholder?: string,
	}

	defineProps<TextInputProps>();
</script>
<template>
	<div class="flex flex-col space-y-2">
		<div 
			class="flex items-center border px-2 text-stone rounded"
			focus-within="border-violet-700 ring-3 ring-violet text-violet-700">
			<slot name="prefix" />
			<Field 
				:name="name"
				:type="type"
				:rules="rules"
				:placeholder="placeholder"
				class="flex-1 px-2 p-4 bg-transparent text-black"
				autocomplete="off" />
			<slot name="suffix" />
		</div>
		<ErrorMessage 
			:name="name"
			class="text-red-500 first-letter:uppercase" />
	</div>
</template>
