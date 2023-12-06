<script setup lang="ts">
  const test = `
Let's code for real!

The given program should output the text: \`Solving my first JavaScript Code Coach!\`. But something is wrong.

Task
Complete the code to generate the required output.

> After fixing the code, tap the RUN button to see the result.`
</script>
<template>
    <main class="fixed inset-0 flex flex-col bg-white">
        <header class="flex space-x-2 p-4 shadow">
            <div class="flex-1 flex space-x-2 max-w-56 items-center">
                <UnoIcon class="i-mdi:close text-3xl" />
                <p class="text-base">My first code couch! </p>
            </div>
            <div class="flex space-x-2 items-center">
                <button class="flex space-x-2 center py-1 px-4 bg-sky-500 text-white rounded">
                    <img src="@/assets/illustrations/ai.svg" />
                    <span>Use AI</span>
                </button>
                <button class="flex space-x-2 center py-1 px-4 btn-inverse rounded">
                    <span>Run</span>
                    <UnoIcon class="i-mdi:play text-xl" />
                </button>
            </div>
        </header>
        <section class="flex-1 flex flex-col">
            <div class="flex space-x-4 px-4">
                <button class="border-b-3 border-emerald-500 text-emerald-500 p-4">Problem</button>
                <button class="p-2">Solution</button>
                <button class="p-2">Result</button>
            </div>
            <div class="flex-1 bg-slate-100 p-4">
                <h1 class="text-3xl font-black">Your First JavaScript Program</h1>
                <MarkdownStringRenderer 
                    :value="test" 
                    class="text-stone-700" />
            </div>
        </section>
    </main>
</template>