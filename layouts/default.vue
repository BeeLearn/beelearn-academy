<script setup lang="ts">
    const userStore = useUserStore();
    const user = computed(() => userStore.user);

    useAsyncData(async () => {
        await userStore.getCurrentUser();
    });
</script>
<template>
    <div 
        class="fixed inset-0 flex flex-col overflow-y-scroll text-[14px]"
        md="overflow-y-auto">
        <template v-if="user">
            <LayoutHeader 
                :user="user"
                class="shadow md:z-10" />
            <slot />
        </template>
        <div 
            v-else 
            class="m-auto w-10 h-10 border-4 border-emerald-500 border-t-white rounded-full animate-spin" />
    </div>
</template>
