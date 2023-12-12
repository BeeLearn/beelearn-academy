<script setup lang="ts">
	import { homeMenus } from '~/data/menus';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

	const route = useRoute();
	const menus = ref(homeMenus);
</script>
<template>
	<Menu 
		as="div" 
		class="relative">
		<MenuButton class="p-4">
			<UnoIcon class="i-mdi:menu text-2xl" />
		</MenuButton>
		<Transition 
			enter-active-class="animate-bounce-in" 
			leave-active-class="animate-fade-out animate-duration-200">
			<MenuItems 
				as="div"
				class="tooltip absolute left-2 w-56 flex flex-col bg-white p-2 rounded-xl z-20 shadow border  text-stone-600">
				<MenuItem 
					v-for="menu, index in menus"
					:key="index"
					@click="$router.push(menu.path)">
					<button 
						class="inline-flex items-center space-x-2 px-2 py-3"
						:class="{ 'bg-violet-200 text-violet-900 rounded': route.path === menu.path }">
						<UnoIcon 
							class="text-2xl"
							:class="menu.icon" />
						<span>{{ menu.name }}</span>
					</button>
				</MenuItem>
			</MenuItems>
		</Transition>
	</Menu>
</template>
