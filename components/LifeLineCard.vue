<script setup lang="ts">
    import type Profile from '~/lib/api/models/profile.model';

    interface LifelineCardProps {
        profile: Profile,
    }

    const props = defineProps<LifelineCardProps>();

    const hasLive = computed(() => props.profile.lives > 0);
    const canRefill = computed(() => props.profile.lives < 3);
</script>
<template>
    <div class="flex flex-col space-y-4 card !p-4">
        <header class="flex flex-col">
            <h1 class="text-2xl font-extrabold">
                {{ 
                    hasLive ?
                    "Keeps you learning!" : 
                    "You ran out of hearts"
                }}
            </h1>
            <p class="text-stone-700">
                {{ 
                    hasLive ? 
                    `You have ${profile.lives} hearts. Take on your next challenge.` :
                    'You have to refill your hearts to continue learning' 
                }}
            </p>
        </header>
        <div class="flex center space-x-2">
            <UnoIcon
                v-for="i in profile.lives"
                :key="i" 
                class="i-mdi:heart text-5xl text-red-500" />
            <UnoIcon
                v-for="i in 3 - profile.lives"
                :key="i" 
                class="i-mdi:heart text-5xl text-stone-500" />
        </div>
        <section class="flex flex-col space-y-4">
            <div class="flex space-x-2 items-start card p-2 border-t">
                <UnoIcon class="i-tabler:infinity text-6xl text-amber-500" />
                <div class="inline-flex-col">
                    <p>Become a pro to unlock unlimited learning</p>
                    <button class="btn btn-primary">Try for free</button>
                </div>
            </div>
            <div class="flex space-x-2 items-start card p-2 border-t">
                <div class="stack center">
                    <UnoIcon class="i-mdi:heart text-6xl text-red-500" />
                    <UnoIcon class="absolute i-mdi:replay text-xl text-white" />
                </div>
                <div class="inline-flex-col">
                    <p>Become a pro to unlock unlimited learning</p>
                    <button 
                        :disabled="!canRefill"
                        class="btn btn-outline-primary">Refill for 60 bits</button>
                </div>
            </div>
        </section>
    </div>
</template>
