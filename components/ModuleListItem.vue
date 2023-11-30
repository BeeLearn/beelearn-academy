<script setup lang="ts">
    import {
        Disclosure,
        DisclosureButton,
    } from '@headlessui/vue';
    
    import type Module from '~/lib/api/models/module.model';

    interface ModuleListItemProps {
        module: Module,
        index: number,
        unlocked: boolean,
    }

    const props = defineProps<ModuleListItemProps>();

    const isUnlocked = computed(() => props.module.is_unlocked || props.unlocked);
</script>
<template>
    <Disclosure v-slot="{ open }">
        <DisclosureButton 
            as="div" 
            class="flex space-x-2 items-center p-4 cursor-pointer"
            :class="{
                'border-none': open,
                'border-b border-neutral-300 last:border-none': !open,
             }">
            <div 
                class="text-white rounded p-2"
                :class="{
                    'bg-emerald-500': isUnlocked,
                    'bg-slate': !isUnlocked,
                }">
                <UnoIcon 
                    class="text-2xl"
                    :class="isUnlocked ? 'i-material-symbols:play-arrow-rounded ' : 'i-mdi:lock'" />
            </div>
            <h1 class="flex-1 text-xl">{{ module.name }}</h1>
            <button>
                <UnoIcon class="text-2xl" :class="open ? 'i-mdi:chevron-up' : 'i-mdi:chevron-down'" />
            </button>
        </DisclosureButton>
        <LessonList 
            :lessons="module.lessons"
            :moduleIndex="index" />
    </Disclosure>
</template>
