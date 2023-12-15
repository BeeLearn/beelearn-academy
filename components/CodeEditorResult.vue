<script setup lang="ts">
    import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
</script>
<template>
    <section class="flex flex-col space-y-4 overflow-y-scroll">
        <Disclosure
            as="div"
            v-for="i in 5" 
            class="flex flex-col space-y-4 bg-white shadow rounded-md">
            <DisclosureButton 
                class="flex space-x-2 items-center text-start p-4"
                v-slot="{open}">
                <UnoIcon class="i-mdi:check-circle text-green-500 text-xl" />
                <p class="flex-1 text-base">Test Case #1</p>
                <UnoIcon 
                    class="text-2xl text-stone-700"
                    :class="open ? 'i-mdi:chevron-up' : 'i-mdi:chevron-down'" />
            </DisclosureButton>
            <DisclosurePanel class="flex flex-col space-y-4 p-4">
                <div class="flex flex-col space-y-1">
                    <p class="text-base">Output</p>
                    <div class="px-4 py-2 bg-black text-white rounded">4</div>
                </div>
                <div class="flex flex-col space-y-1">
                    <p class="text-base">Expected output</p>
                    <div class="px-4 py-2 bg-slate-200/60 rounded">4</div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </section>
</template>