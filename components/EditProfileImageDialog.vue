<script setup lang="ts">
	import { svgToBlob } from '~/lib/image';
	import type User from '~/lib/api/models/user.model';
import e from '~/lib/e';

	type EditProfileImageDialogProps = {
		user: User,
	}

	type EditProfileImageDialogEmits = {
		(event: 'close'): void,
	}

	const prop = defineProps<EditProfileImageDialogProps>();
	defineEmits<EditProfileImageDialogEmits>();

	const selected = ref<string | null>();
	const blob = ref <File | Blob | null>(null);

	const avatars = computed(() => Array.from({ length: 8}).map((_, index) => `/avatars/${index + 1}.svg`));

	const snackbar = useSnackbar();
	const userStore = useUserStore();

	const isLoading = ref(false);

	const onSave = async function(){
		isLoading.value = true;
		await userStore.updateCurrentUser({
			avatar: selected.value ? [blob.value, prop.user.uid + '.svg'] : blob.value,
		}, true)
		.then(() => {
			snackbar.show(
				e("span", {
					className: "i-mdi:check-circle text-2xl text-green-500",
				}), 
				e("p", { textContent: "Profile picture updated successfully."}),
			);

			selected.value = null;
			blob.value = null;
		})
		.catch(() => {
			snackbar.show(
				e("span", {
					className: "i-mdi:information text-2xl text-red-500",
				}), 
				e("p", { textContent: "Profile picture upload failed. Try again!"}),
			);
		})
		.finally(() => isLoading.value = false);
	}
</script>
<template>
	<div class="fixed inset-0 flex center bg-black/50">
		<div class="w-xs h-xs flex flex-col bg-violet-50 rounded-[1.5rem]">
			<header class="p-4">
				<h1 class="text-2xl">Select An Avatar</h1>
			</header>
			<section class="flex-1 grid grid-cols-4 gap-2 p-4 overflow-y-scroll">
				<div class="relative">
					<ImagePreviewInput 
						:value="user.avatar"
						className="w-16 h-16 border shadow rounded-full"
						@change="(file) => {
							selected = null;
							blob = file ? file : null;
						}" />
					<div class="absolute top-0 right-0 bg-violet-200 p-1.5 rounded-full">
						<UnoIcon class=" i-mdi:image-plus  text-xl text-violet-900" />
					</div>
				</div>
				<ToggleButton
					v-for="url in avatars"
					:checked="selected === url"
					@update:checked="async (event, value) => {
						selected = url;
						blob = await svgToBlob((event.currentTarget as HTMLElement).querySelector('img')!);
					}">
					<img
						:src="url"
						class="w-16 h-16 object-cover border shadow rounded-full" />
				</ToggleButton>
			</section>
			<footer class="flex space-x-2 p-4">
				<button 
					class="flex-1 btn btn-outline-primary rounded-full"
					@click="$emit('close')">Cancel</button>
				<button
					:disabled="isLoading || blob === null"
					class="flex-1 btn btn-primary rounded-full"
					@click="onSave">
					<div
						v-if="isLoading" 
						class="w-6 h-6 progress border-violet" />
					<span v-else>Save</span>
				</button>
			</footer>
		</div>
	</div>
</template>