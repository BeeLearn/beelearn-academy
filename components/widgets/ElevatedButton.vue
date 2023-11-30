<script setup lang="ts">
    const ButtonState = {
        error:'!border-b-3 !border-red-500 !bg-red-100',
        success: 'border-b-3 !border-green-500 !bg-green-100',
        selected: '!border-b-3 !border-emerald-500 !bg-emerald-100',
    }

    interface ElevatedButtonProps {
        state?: 'error' | 'success' | 'selected' | null
    }

    defineProps<ElevatedButtonProps>();
</script>
<template>
    <div
        class="flex border-3 border-b-6 px-4 py-2 rounded-md"
        :class="state ? ButtonState[state] : null">
        <slot />
    </div>
</template>
