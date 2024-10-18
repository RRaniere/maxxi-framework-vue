<script setup lang="ts">

import { defineProps } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const emit = defineEmits(['search']);

const props = defineProps({
  root: Boolean || false,
  username: String || null,
  parentUsername: String || null,
  sponsorUsername: String || null,
  level: Number || null,
  position: Number || null,
  status: String || null,
});



function handleClick() {

    if(props.username == authStore.user.user.username) { 
        return false
    }

    if(!props.root) { 
        emit('search', props.username);
    }else if(props.root && props.parentUsername){ 
        emit('search', props.parentUsername);
    }else{
        emit('search', props.username);
    }

}

</script>

<template> 

<a @click="handleClick"> 

    <div class="name text-center" >
        <p>{{ props.username }}</p>
    </div>

</a>

</template>

<style>

.name { 
    font-size: 12px;
    color: white;
    position: absolute;
    margin-top: -20px;
    margin-left: -20px;
    width: 100px;
}

</style>