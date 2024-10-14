<script setup lang="ts">

import { ref } from 'vue';

const emit = defineEmits(['loading','loaded']);

const props = defineProps({
  color: {
    type: String,
    default: 'primary', 
  },
  rounded: {
    type: String,
    default: 'md', 
  },
  size: {
    type: String,
    default: 'default', 
  },
  block: {
    type: Boolean,
    default: false, 
  },
  icon: {
    type: String,
    default: '', 
  },
  timeout: {
    type: Number,
    default: 3000, 
  },
  text: {
    type: String,
    default: '', 
  },
  textInLoading: {
    type: String,
    default: '', 
  },
  
});


const loading = ref(false);

const text = ref(props.text);


function load() {

    if(loading.value == false) { 

        emit('loading');


        loading.value = true;
        text.value = props.textInLoading;

        setTimeout(() => {
            
            loading.value = false;
            text.value = props.text;

            emit('loaded');

        }, 3000);


    }

}

</script>

<template>
    <v-btn 
    :loading="false" 
    :disabled="loading"
    :rounded="rounded" 
    :color="color" 
    :size="size" 
    :block="block" 
    @click="load" 
    class="loader-btn"
    >
    <template v-if="loading">
        <span class="loader"></span> 
    </template>
    <template v-if="!loading" v-slot:prepend>
        <SvgSprite :name="icon" style="width: 18px; height: 18px" v-if="icon" />
    </template>

        {{ text }}
    
    </v-btn>
</template>


<style scoped>

.loader-btn:disabled{
  position: relative;
  overflow: hidden;
}

.loader-btn:disabled {
  opacity: 1; 
}

.loader-btn {
  position: relative;
  overflow: hidden;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); 
  animation: fillAnimation 3s ease-out forwards; 
}

@keyframes fillAnimation {
  0% {
    width: 0;
  }
  50% {
    width: 50%;
    background-color: rgba(255, 255, 255, 0.4); 
  }
  100% {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8); 
  }
}

.loader {
  animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1); 
}
</style>
