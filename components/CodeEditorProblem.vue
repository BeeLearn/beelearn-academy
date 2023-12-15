<script setup lang="ts">
const test = `
Let's code for real!

The given program should output the text: \`Solving my first JavaScript Code Coach!\`. But something is wrong.

Task
Complete the code to generate the required output.

> After fixing the code, tap the RUN button to see the result.`
</script>
<template>
    <div>
        <h1 class="text-3xl font-black">Your First JavaScript Program</h1>
        <MarkdownStringRenderer 
            :value="test" 
            class="text-stone-700" />
    </div>
</template>