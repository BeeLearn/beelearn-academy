<script setup lang="ts">
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
</script>
<template>
    <Popover class="relative">
        <PopoverButton class="p-4">
            <UnoIcon class="i-mdi:menu text-2xl" />
        </PopoverButton>
        <Transition 
            enter-active-class="animate-bounce-in" 
            leave-active-class="animate-fade-out animate-duration-200">
            <PopoverPanel class="tooltip absolute left-2 w-56 flex flex-col bg-white p-2 rounded-xl z-30 shadow border  text-stone-600">
                <NuxtLink 
                    to="/notifications" 
                    class="inline-flex space-x-2 px-2 py-3">
                    <UnoIcon class="i-mdi:notifications text-2xl" />
                    <span>Notifications</span>
                </NuxtLink>
                <NuxtLink
                    to="/favorites"  
                    class="inline-flex space-x-2 px-2 py-3">
                    <UnoIcon class="i-mdi:heart text-2xl" />
                    <span>Favorites</span>
                </NuxtLink>
                <NuxtLink
                    to="/leaderboard" 
                    class="inline-flex space-x-2 px-2 py-3">
                    <UnoIcon class="i-mdi:medal text-2xl" />
                    <span>Leader board</span>
                </NuxtLink>
            </PopoverPanel>
        </Transition>
    </Popover>
</template>
