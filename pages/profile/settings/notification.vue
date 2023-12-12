<script setup lang="ts">
import e from '~/lib/e';

	const userStore = useUserStore();
	const snackbar = useSnackbar();

	const user = computed(() => userStore.user!);

	const updateSettings =  function(data: Record<string, any>){
		return userStore.updateCurrentUser({
			settings: data,
		})
		.then(() => {
			snackbar.show(
				e("span", { className: "i-mdi:check-circle text-2xl text-green-500"}),
				e("p", { textContent: "Notifications settings updated successfully"}),
			);
		})
		.catch(() => {
			snackbar.show(
				e("span", { className: "i-mdi:information text-2xl text-red-500"}),
				e("p", { textContent: "Notifications settings updated failed. Try again!"}),
			);
		});
	}
</script>
<template>
	<div 
		class="fixed inset-0 flex flex-col bg-black/50"
		md="items-end">
		<div 
			class="flex-1 bg-white"
			md="w-md">
			<header class="flex space-x-2 items-center shadow p-2">
				<button 
					class="p-2"
					@click="$router.back()">
					<UnoIcon class="i-mdi:close text-stone-700 text-2xl" />
				</button>
				<h1 class="text-2xl">Notifications</h1>
			</header>
			<div class="flex-1 flex flex-col divide-y">
				<label class="flex space-x-2 p-4 items-center">
					<div>
						<p class="text-lg font-medium">News Letter</p>
						<p class="text-stone-500">Receive promotional emails, news letters and social media post updates</p>
					</div>
					<ToggleCheck 
						:value="user.settings.is_promotional_email_enabled"
						type="checkbox"
						@update:value="state => updateSettings({ is_promotional_email_enabled: state })" />
				</label>
				<label class="flex space-x-2 items-center p-4">
					<div>
						<p class="text-lg font-medium">Push Notifications</p>
						<p class="text-stone-500">Receive new content alert and recommendations, following and mentions updates and more</p>
					</div>
					<ToggleCheck 
						:value="user.settings.is_push_notifications_enabled"
						type="checkbox"
						@update:value="state => updateSettings({ is_push_notifications_enabled: state })"/>
				</label>
			</div>
		</div>
	</div>
</template>
