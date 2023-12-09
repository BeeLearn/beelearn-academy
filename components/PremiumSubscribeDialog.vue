<script setup lang="ts">
	import { benefits as benefitList } from '~/data/premium';

	const route = useRoute();
	const benefits = ref(benefitList);

	const isVisible = computed(() => route.hash === "#subscribe");
</script>
<template>
	<Transition 
		enter-active-class="animate-bounce-in animate-duration-500"
		leave-active-class="animate-bounce-out animate-duration-200">
		<div
			v-if="isVisible" 
			class="fixed inset-0 flex flex-col bg-black/50 z-20"
			md="items-end">
			<div 
				class="flex-1 flex flex-col bg-violet-50"
				md="w-1/2"
				lg="w-1/3">
				<header class="flex text-stone-500">
					<button 
						class="p-4"
						@click="$router.back()">
						<UnoIcon class="i-mdi:close text-2xl" />
					</button>
					<div class="flex-1" />
					<button class="p-4">
						<UnoIcon class="i-mdi:dots-vertical text-2xl" />
					</button>
				</header>
				<section class="flex-1 flex flex-col space-y-6 p-4">
					<div class="text-center">
						<h1 class="text-2xl font-extrabold">You're not premium</h1>
						<p>What's included?</p>
					</div>
					<div class="flex-1">
						<div 
							v-for="benefit, index in benefits" 
							:key="index" 
							class="flex space-x-4 items-center p-2">
							<UnoIcon class="i-mdi:check-circle text-2xl text-violet-900" />
							<p class="text-base">{{ benefit }}</p>
						</div>
					</div>
					<footer class="flex flex-col space-y-2 px-4 py-8">
						<button class="btn btn-primary p-3">Subscribe</button>
					</footer>
				</section>
			</div>
		</div>
	</Transition>
</template>
