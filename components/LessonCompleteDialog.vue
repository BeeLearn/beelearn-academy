<script setup lang="ts">
    interface LessonCompleteDialogProps {
        visible: boolean,
        lessonName: string,
    }

    defineProps<LessonCompleteDialogProps>();
</script>
<template>
    <Transition 
        enter-active-class="animate-bounce-in" 
        leave-active-class="animate-bounce-out">
        <main 
            v-if="visible" 
            class="fixed inset-0 flex flex-col bg-white z-20">
            <section class="flex-1 flex flex-col center space-y-8 text-center">
                <UnoIcon 
                    class="i-mdi:check-circle text-6xl text-green-500"
                    :class="visible ? 'animate-bounce-in' : 'animate-bounce-out'" />
                <div class="flex flex-col space-y-2 px-8">
                    <h1 class="text-xl font-bold">Lesson completed!</h1>
                    <p class="text-stone-700">
                        <span>You completed </span>
                        <code class="text-sm bg-stone-100 p-1 rounded-md">{{ lessonName }}</code>. 
                        <span>You're one step closer to reaching your goal!</span></p>
                </div>
                <div 
                    class="flex flex-col space-y-2 center bg-bluegray-200 w-4/6 p-2 rounded-md"
                    md="w-1/6">
                    <h1 class="text-base font-medium">Your rewards</h1>
                    <div class="flex center space-x-2">
                        <UnoIcon class="i-material-symbols:bolt text-lg text-amber-500" />
                        <span class="text-sm">+10xp</span>
                    </div>
                    <div class="flex center space-x-2">
                        <UnoIcon class="i-mdi:gift text-lg text-cyan-500" />
                        <span class="text-sm">+8bits</span>
                    </div>
                </div>
            </section>
            <footer class="flex center p-4 border-t border-slate">
                <button 
                    class="bg-violet-700 text-white px-12 py-3 rounded" 
                    @click="$router.back()">
                    Continue
                </button>
            </footer>
        </main>
    </Transition>
</template>
