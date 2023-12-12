<script setup lang="ts">
import { UserType } from '~/lib/api/models/user.model';

const router = useRouter();

const userStore = useUserStore();

const user = computed(() => userStore.user!);
</script>
<template>
	<div class="fixed inset-0 flex justify-right bg-black/50 z-10">
		<div 
			class="flex-1 flex flex-col space-y-4 bg-white" 
			md="flex-none w-md">
			<header class="flex space-x-4 items-center p-4">
				<button @click="() => router.back()">
					<UnoIcon class="i-mdi:close text-2xl" />
				</button>
				<h1 class="text-2xl font-medium">Settings</h1>
			</header>
			<section class="flex-1 flex flex-col space-y-4 px-4">
				<NuxtLink
					to="/profile/settings/edit"
					class="flex space-x-4">
					<img 
						:src="user.avatar" 
						class="w-10 h-10 rounded-full" />
					<div class="flex-1">
						<p>{{ user.full_name }}</p>
						<p class="text-sm text-stone-700">{{ UserType[user.user_type] }}</p>
						<p class="text-sm text-stone-700">{{ user.email }}</p>
					</div>
					<UnoIcon class="i-mdi:chevron-right text-2xl" />
				</NuxtLink>
				<div class="flex space-x-4 items-center bg-violet-100 px-4 py-2 rounded-md">
					<p class="flex-1 text-xl">
						You're not <b>Premium</b>
					</p>
					<button class="flex center w-12 h-12 bg-violet-700 rounded-full">
						<UnoIcon class="i-tabler:diamond text-white text-4xl" />
					</button>
				</div>
				<div>
					<h1 class="text-xl">Customize</h1>
					<div class="flex flex-col divide-y">
						<NuxtLink
							to="/profile/settings/notification/" 
							class="flex py-4">
							<p class="flex-1">Notifications</p>
							<UnoIcon class="i-mdi:chevron-right text-2xl" />
						</NuxtLink>
						<div class="flex py-4">
							<p class="flex-1">Terms and Conditions</p>
							<UnoIcon class="i-mdi:export text-2xl" />
						</div>
						<div class="flex py-4">
							<p class="flex-1">Report content</p>
							<UnoIcon class="i-mdi:export text-2xl" />
						</div>
						<div class="flex py-4">
							<p class="flex-1">FAQ</p>
							<UnoIcon class="i-mdi:export text-2xl" />
						</div>
					</div>
				</div>
			</section>
		</div>
		<NuxtPage />
	</div>
</template>
