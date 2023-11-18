<script setup lang="ts">
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

    const userStore = useUserStore();
    const user = computed(() => userStore.user);

    const navigationMenu = ref<HTMLDivElement>();
    const navigationButton = ref<HTMLButtonElement>();


    
</script>
<template>
    <header class="flex items-center space-x-4 bg-white px-4 py-2">
        <Popover class="relative">
            <PopoverButton 
                ref="navigationButton" 
                aria-describedby="tooltip">
                <UnoIcon class="i-mdi:menu text-2xl" />
            </PopoverButton>
            <Transition 
                enter-active-class="animate-bounce-in"
                leave-active-class="animate-fade-out animate-duration-200">
                <PopoverPanel 
                    ref="navigationMenu" 
                    role="tooltip" 
                    class="tooltip absolute w-56 flex flex-col bg-white p-2 rounded-xl z-30 shadow border">
                    <button class="inline-flex space-x-2 px-2 py-3">
                        <UnoIcon class="i-mdi:notifications text-2xl" />
                        <span>Notifications</span>
                    </button>
                    <button class="inline-flex space-x-2 px-2 py-3">
                        <UnoIcon class="i-mdi:heart text-2xl" />
                        <span>Favorites</span>
                    </button>
                    <button class="inline-flex space-x-2 px-2 py-3">
                        <UnoIcon class="i-mdi:account text-2xl" />
                        <span>Profile</span>
                    </button>
                </PopoverPanel>
            </Transition>
        </Popover>
        <div class="flex-1 flex items-center space-x-2">
            <NuxtLink to="/" class="text-xl font-black text-violet-700">Beelearn</NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
            <UnoIcon class="i-mdi:search text-2xl" />
            <NuxtLink to="/profile">
                <img :src="user?.avatar" class="w-10 h-10 rounded-full" />
            </NuxtLink>
        </div>
    </header>
</template>
