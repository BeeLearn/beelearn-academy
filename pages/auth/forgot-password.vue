<script setup lang="ts">
    const onSubmit = async function(event: Event) {
        const { value } = event.currentTarget as HTMLInputElement;
        
    };
</script>
<template>
    <section class="flex flex-col space-y-4  items-center">
        <div class="flex flex-col text-center">
            <h1 class="text-2xl font-bold">Password Reset</h1>
            <p class="text-stone-700">Enter your email to get a password reset link</p>
        </div>
        <form 
            class="flex flex-col space-y-4 items-center justify-center"
            @submit.prevent="onSubmit">
            <div className="w-xs md:w-sm flex space-x-2 input border-2 rounded-md">
                <UnoIcon class="i-material-symbols-mail-rounded" />
                <input 
                    placeholder="Email address" />
            </div>
            <button class="w-xs md:w-sm btn bg-emerald-500 text-white">Get a password link</button>
        </form>
    </section>
</template>