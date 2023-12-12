<script setup lang="ts">
	import { object, string } from "yup";
	import { Form, type GenericObject } from "vee-validate";
	
	import e from "~/lib/e";

	const userStore = useUserStore();
	const snackbar = useSnackbar();

	const showEditProfileImageDialog = ref(false);

	const user = computed(() => userStore.user!);

	const validationSchema = object().shape({
		email: string().email().required(),
		last_name: string().min(3).max(16).label("last name").required(),
		first_name: string().min(3).max(16).label("first name").required(),
		username: string().min(2).max(16).required(),
	});

	const isLoading = ref(false);

	const onSave = async function(values: GenericObject){
		isLoading.value = true;
		
		await userStore.updateCurrentUser(values)
		.then(() => {
			snackbar.show(
				e("span", {
					className: "i-mdi:check-circle text-2xl text-green-500",
				}), 
				e("p", { textContent: "Profile updated successfully."}),
			);
		})
		.catch(() => {
			snackbar.show(
				e("span", {
					className: "i-mdi:information text-2xl text-red-500",
				}), 
				e("p", { textContent: "Profile update fail. Try again!"}),
			);
		})
		.finally(() => isLoading.value = false);
	}
</script>
<template>
	<div 
		class="fixed inset-0 flex flex-col bg-black/50"
		md="items-end">
		<Form
			class="flex-1 flex flex-col space-y-4 bg-white"
			md="w-md"
			:initial-values="{
				email: user.email,
				username: user.username,
				last_name: user.last_name,
				first_name: user.first_name,
			}"
			:validation-schema="validationSchema"
			@submit="onSave">
			<header class="flex items-center space-x-2 p-4 shadow">
				<button 
					type="button"
					@click="$router.back()">
					<UnoIcon class="i-mdi:close text-2xl text-stone-700" />					
				</button>
				<p class="flex-1 text-xl text-center">Edit Profile</p>
				<button
					:disabled="isLoading"
					type="submit" 
					class="w-24 btn btn-primary">
					<div
						v-if="isLoading" 
						class="w-5 h-5 progress border-violet" />
					<span v-else>Save</span>
				</button>
			</header>
			<section class="flex-1 flex flex-col space-y-4">
				<div class="flex flex-col space-y-2 items-center">
					<img
						:src="user.avatar" 
						class="w-24 h-24 bg-violet rounded-full" />
					<button 
						type="button"
						class="btn text-violet-700"
						@click="showEditProfileImageDialog = true">
						Change Profile Picture
					</button>
				</div>
				<div class="flex flex-col space-y-4 p-4">
					<TextInput
						name="email"
						placeholder="Email address">
						<template #prefix>
							<UnoIcon class="i-mdi:email text-2xl" />
						</template>
					</TextInput>
					<TextInput
						name="first_name"
						placeholder="First Name">
						<template #prefix>
							<UnoIcon class="i-mdi:account text-2xl" />
						</template>
					</TextInput>
					<TextInput
						name="last_name"
						placeholder="LastName">
						<template #prefix>
							<UnoIcon class="i-mdi:account text-2xl" />
						</template>
					</TextInput>
					<TextInput
						name="username"
						placeholder="Username">
						<template #prefix>
							<UnoIcon class="i-mdi:at text-2xl" />
						</template>
					</TextInput>
				</div>
			</section>
		</Form>
		<Transition
			enter-active-class="animate-bounce-in animate-duration-200"
			leave-active-class="animate-fade-out animate-duration-200">
			<EditProfileImageDialog 
				v-if="showEditProfileImageDialog"
				:user="user"
				@close="showEditProfileImageDialog = false" />
		</Transition>
	</div>
</template>