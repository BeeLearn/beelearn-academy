<template>
    <div class="flex flex-col p-4">
        <div 
            class="relative p-4 bg-violet-100 border-1 rounded-lg"
            md="max-w-sm">
            <div class="space-y-4 max-w-56">
                <h1 class="text-4xl font-black font-noto-sans">Let's Practice together</h1>
                <button class="px-8 py-3 bg-white text-violet-700 rounded-full">Practice now</button>
            </div>
            <div class="absolute -top-2 right-0">
                <div class="relative flex flex-col center">
                    <img 
                        src="@/assets/illustrations/trophy.svg"
                        class="w-32"
                        oncontextmenu="return false;" />
                    <UnoIcon class="i-mdi:star-circle absolute text-5xl text-white" />
                </div>
            </div>
        </div>
    </div>
</template>