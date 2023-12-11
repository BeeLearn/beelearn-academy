<script setup lang="ts">
	import e from '~/lib/e';

  	type GoalEditProps = {
    	dailyStreakMinutes: number,
  	}

	type GoalEditEmits = {
		(event: 'close', value: boolean) : void,
	}

  defineEmits<GoalEditEmits>();
  const prop = defineProps<GoalEditProps>();

  const isLoading = ref(false);
	const goal = ref(prop.dailyStreakMinutes);
  
  const snackbar = useSnackbar();
  const userStore = useUserStore();

  const onSave = async function(){
    isLoading.value = true;

    await userStore.updateCurrentUser({
      profile: {
        daily_streak_minutes: goal.value,
      }
    })
    .then(() => {
      snackbar.show(
        e("span", { className: "i-mdi:check-circle text-2xl text-green-500"}),
        e("p", { textContent: "Daily goal updated successfully." })
      );
    })
    .catch(() => {
      snackbar.show(
        e("span", { className: "i-mdi:information text-2xl text-red-500"}),
        e("p", { textContent: "An unexpected error occurred. Try again!" })
      );
    })
    .finally(() => isLoading.value = false);
  }
</script>
<template>
	<div
		class="fixed inset-0 flex items-end bg-black/50 z-10" 
		md="justify-center">
		<div 
			class="w-full h-sm flex flex-col bg-white p-2 rounded-t-2xl" 
			md="w-lg h-xs">
			<header class="flex items-center space-x-4 p-2">
				<button>
					<UnoIcon 
						class="i-mdi:close text-2xl text-stone-700"
						@click="$emit('close', false)" />
				</button>
				<p class="flex-1 text-xl">Daily goal</p>
				<button
					:disabled="goal === dailyStreakMinutes" 
					class="w-28 btn btn-primary rounded-full"
          @click="onSave">
          <div
            v-if="isLoading" 
            class="w-6 h-6 progress border-white" />
          <span v-else>Save</span>
        </button>
		</header>
			<div class="flex-1 flex center">
				<div class="relative w-56 h-56 flex">
					<VCircularSlider
						v-model="goal"
            			:min="2"
						:height="16" 
						:handle-scale="2" 
						:always-show-handle="true"
						track-color="#e7e5e4"
						color="#22c55e" 
						orientation="circular" />
					<h1 class="text-4xl absolute top-25 left-16">{{ goal }} min</h1>
				</div>
			</div>
		</div>
	</div>
</template>