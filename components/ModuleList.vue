<script setup lang="ts">
    import type Module from '~/lib/api/models/module.model';

    interface ModuleListProps {
        modules: Module[],  
    }

    defineProps<ModuleListProps>();
</script>
<template>
    <div class="flex-1 flex flex-col p-4">
        <ModuleListItem
            v-for="module, index in modules"
            :key="module.id"
            :module="module"
            :index="index"
            :unlocked="index === 0" />
    </div>
</template>