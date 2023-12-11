<script setup lang="ts">
	type ToggleButtonProps = {
		checked: boolean,
	}

	type ToggleButtonEmits = {
		(ev: 'update:checked', event: MouseEvent, value: boolean): void ,
	}

	defineProps<ToggleButtonProps>();
	defineEmits<ToggleButtonEmits>();
</script>
<template>
	<div
		role="checkbox" 
		:aria-pressed="checked"
		class="relative"
		@click="$emit('update:checked', $event, !checked)">
		<slot />
		<Transition
			enter-active-class="animate-fade-in animate-duration-200"
			leave-active-class="animate-fade-out animate-duration-200">
			<div 
				v-if="checked"
				class="absolute top-2 right-4 flex center">
				<div class="absolute w-4 h-4 bg-white rounded-full" />
				<UnoIcon 
					type="checkbox" 
					class="absolute i-pepicons-pencil:checkmark-filled text-3xl text-violet-700" />
			</div>
		</Transition>
	</div>
</template>
