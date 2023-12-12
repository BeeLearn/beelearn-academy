<script setup lang="ts">
	type ImagePreviewInputProps = {
		value?: string,
		className?: string,
	}

	type ImagePreviewInputEmits = {
		(event: 'change', value?: File | null) : void
	}

	defineProps<ImagePreviewInputProps>();
	const emit = defineEmits<ImagePreviewInputEmits>();

	const fileEl = ref<HTMLInputElement>();
	const preview = ref<File | null>();

	const getPreview = function(blob: File){
		return URL.createObjectURL(blob);
	}

	watch(preview, (value) => {
		emit('change', value);
	});
</script>
<template>
	<img 
		:src="preview ? getPreview(preview) : value"
		:class="className"
		@click="fileEl?.click()" />
	<input 
		ref="fileEl"
		type="file" 
		accept="image/*" 
		hidden 
		@change="event => {
			const files = (event.currentTarget as HTMLInputElement).files;
			const file = files?.item(0);
			preview = file;
		}"/>
</template>
