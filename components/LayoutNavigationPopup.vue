<script setup lang="ts">
    import { Popover, PopoverPanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
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
                class="tooltip absolute left-2 w-56 flex flex-col bg-white p-2 rounded-xl z-30 shadow border  text-stone-600">
                <MenuItem @click="$router.push('/notifications')">
                    <button class="inline-flex space-x-2 px-2 py-3">
                        <UnoIcon class="i-mdi:notifications text-2xl" />
                        <span>Notifications</span>
                    </button>
                </MenuItem>
                <MenuItem @click="$router.push('/favorites')">
                    <button class="inline-flex space-x-2 px-2 py-3">
                        <UnoIcon class="i-mdi:heart text-2xl" />
                        <span>Favorites</span>
                    </button>
                </MenuItem>
                <MenuItem @click="$router.push('/leaderboard')">
                    <button class="inline-flex space-x-2 px-2 py-3">
                        <UnoIcon class="i-mdi:medal text-2xl" />
                        <span>Leader board</span>
                    </button>
                </MenuItem>
            </MenuItems>
        </Transition>
    </Menu>
</template>
