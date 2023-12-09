<script setup lang="ts">
	import e from '~/lib/e';
	import type Profile from '~/lib/api/models/profile.model';

	interface LifelineCardProps {
		profile: Profile,
	}

	const snackbar = useSnackbar();
	const userStore = useUserStore();

	const props = defineProps<LifelineCardProps>();

	const hasLive = computed(() => props.profile.lives > 0);
	const canRefill = computed(() => props.profile.lives < 3);

	const isLoading = ref(false);

	const onRefillHeart = async function () {
		if(props.profile.bits < 60)
			return snackbar.show(
				e("span", { className: "i-mdi:information text-2xl text-red-500" }),
				e("p", { textContent: "You don't have enough bits to make refill." }),
			);

		isLoading.value = true;

		await userStore.updateCurrentUser({
			profile: {
				lives: props.profile.lives + 1,
				bits: props.profile.bits - 60,
			}
		})
		.then(() => {
			snackbar.show(
				e("span", { className: "i-mdi:check-circle text-2xl text-green-500" }),
				e("p", { textContent: "One heart refill purchased successfully." }),
			);
		})
		.catch(() => {
			snackbar.show(
				e("span", { className: "i-mdi:information text-2xl text-red-500" }),
				e("p", { textContent: "An unexpected error occur. Try again!" }),
			);
		}).finally(() => isLoading.value = false);
	}
</script>
<template>
	<div class="flex flex-col space-y-4 card !p-4">
		<header class="flex flex-col">
			<h1 class="text-2xl font-extrabold">
				{{
					hasLive ?
					"Keeps you learning!" :
					"You ran out of hearts"
				}}
			</h1>
			<p class="text-stone-700">
				{{
					hasLive ?
					`You have ${profile.lives} hearts. Take on your next challenge.` :
					'You have to refill your hearts to continue learning'
				}}
			</p>
		</header>
		<div class="flex center space-x-2">
			<UnoIcon 
				v-for="i in profile.lives" 
				:key="i" 
				class="i-mdi:heart text-5xl text-red-500" />
			<UnoIcon 
				v-for="i in 3 - profile.lives" 
				:key="i" 
				class="i-mdi:heart text-5xl text-slate-300" />
		</div>
		<section class="flex flex-col space-y-4">
			<div class="flex space-x-2 items-start card p-2 border-t">
				<UnoIcon class="i-tabler:infinity text-6xl text-amber-500" />
				<div class="inline-flex-col">
					<p>Become a pro to unlock unlimited learning</p>
					<NuxtLink
						to="#subscribe" 
						class="btn btn-primary">Try for free</NuxtLink>
				</div>
			</div>
			<div class="flex space-x-2 items-start card p-2 border-t">
				<div class="stack center">
					<UnoIcon class="i-mdi:heart text-6xl text-red-500" />
					<UnoIcon class="absolute i-mdi:replay text-xl text-white" />
				</div>
				<div class="inline-flex-col">
					<p>Become a pro to unlock unlimited learning</p>
					<button 
						:disabled="!canRefill" 
						class="btn btn-outline-primary" 
						@click="onRefillHeart">
						Refill for 60 bits
					</button>
				</div>
			</div>
		</section>
	</div>
</template>
