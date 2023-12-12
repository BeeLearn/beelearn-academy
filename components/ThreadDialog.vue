<script setup lang="ts">
	const route = useRoute();
	
  	const isVisible = computed(() => route.hash === "#thread");
</script>
<template>
	<Transition 
		enter-active-class="animate-fade-in animate-duration-200"
		leave-active-class="animate-fade-out animate-duration-200">
		<ThreadDialogFragment v-if="isVisible" />	
	</Transition>
</template>
