<template>
    <div class="flex flex-col space-y-2">
        <h1 class="text-2xl font-extrabold p-2">Collections made for you</h1>
        <div class="flex flex-nowrap space-x-4 px-2 snap-x snap-mandatory overflow-x-scroll">
            <div 
                v-for="i in 8" 
                :key="i" class="shrink-0 w-64 h-64 bg-emerald rounded-xl snap-center" />
        </div>
    </div>
</template>