<script setup lang="ts">
     type SearchProps = {
        search?: string | null,
    };

    type SearchEmit = {
        (event: 'update:search', value: string): void,
    }

    defineProps<SearchProps>();
    const emit = defineEmits<SearchEmit>();

    let timer: number | null = null;

    const onChange = function(event: KeyboardEvent){
        const value = (event.currentTarget as HTMLInputElement).value;

        if(timer)
            window.clearTimeout(timer);

        timer = window.setTimeout(() => {
            if(value.trim().length > 0)
                emit('update:search', value);
        }, 500);
    }
</script>
<template>
    <div class="flex-1 flex space-x-2 pl-2 items-center bg-stone-100 rounded-md border">
        <UnoIcon class="i-mdi:search text-xl text-stone-500" />
        <input 
            class="flex-1 py-2 bg-transparent" 
            placeholder="Type title, category or keyword"
            @keyup="onChange" />
    </div>
</template>