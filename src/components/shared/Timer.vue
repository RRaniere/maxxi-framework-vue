<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    endDate: String,
});

const hours = ref('00');
const minutes = ref('00');
const seconds = ref('00');

function calculateTimeLeft() {
    if(props.endDate) { 
        const end = new Date(props.endDate).getTime();
        const now = new Date().getTime();
        const timeLeft = end - now;

        if (timeLeft > 0) {
            hours.value = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, '0'); // Total de horas
            minutes.value = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
            seconds.value = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
        } else {
            hours.value = '00';
            minutes.value = '00';
            seconds.value = '00';
            clearInterval(timer);
        }
    }
}

let timer: ReturnType<typeof setInterval>;

onMounted(() => {
    calculateTimeLeft(); 
    timer = setInterval(calculateTimeLeft, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
  <div class="timer text-center text-h2 d-flex justify-space-around mt-4 mb-8">
      <span>{{ hours }}H</span>
      <span>{{ minutes }}M</span>
      <span>{{ seconds }}S</span>
  </div>
</template>

<style scoped>

</style>
