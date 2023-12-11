<script setup lang="ts">
	type ToggleCheckProps = {
		value?: boolean,
		type: "checkbox" | "radio",
	}

	type ToggleCheckEmits = {
		(ev: 'update:value', value: boolean) : void,
	}

	defineProps<ToggleCheckProps>();
	defineEmits<ToggleCheckEmits>();
</script>
<template>
	<div class="relative inline-flex items-center cursor-pointer">
		<input 
			:type="type" 
			:checked="value"
			class="sr-only peer"
			@change="$emit('update:value',  ($event.target as HTMLInputElement).checked)">
		<div
			class="w-14 h-8 bg-gray-200 rounded-full dark:border-gray-600 after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark"
			peer-focus="outline-none ring-4 ring-violet-300 dark:ring-violet-800"
			peer-checked="dark:bg-gray-700 bg-violet-700  after:translate-x-full after:border-white"
			rtl:peer-checked="after:-translate-x-full">
		</div>
	</div>
</template>
