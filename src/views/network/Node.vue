<script setup lang="ts">

import { defineProps } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();
const dialog = ref(false);

const emit = defineEmits(['search', 'informations']);

const props = defineProps({
    root: Boolean || false,
    username: String || null,
    parentUsername: String || null,
    sponsorUsername: String || null,
    level: Number || null,
    position: Number || null,
    status: String || null,
});



function network() {

    if (props.username == authStore.user.user.username) {
        return false
    }

    if (!props.username) {
        return false
    }

    if (!props.root) {
        emit('search', props.username);
    } else if (props.root && props.parentUsername) {
        emit('search', props.parentUsername);
    } else {
        emit('search', props.username);
    }

}

function informations() {

    if (props.username == authStore.user.user.username) {
        return false
    }

    emit('informations', props.username);

}

</script>

<template>

    <a class="node" :class="{'user-background': props.username}" @click="network">

        
        <div class="name" :class="{ 'd-none': props.level === 4}">
            <p>{{ props.username }}</p>
        </div>

        <!-- <v-menu activator="parent" offset-y v-if="props.username">
            <template v-slot:activator="{ attrs }">
                <div :class="{ 'd-none': props.level === 4 }" v-bind="attrs" ></div>
            </template>
            <v-list>
            <v-list-item >
                <v-list-item-title @click="network" class="cursor-pointer">Network</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="props.username != authStore.user.user.username">
                <v-list-item-title @click="informations" class="cursor-pointer">Informations</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu> -->
    </a>

    

</template> 


<style>
.name {
    font-size: 15px;
    color: white;
    position: absolute;
    margin-top: -25px;
    margin-left: -20px;
    width: 100px;
}

.user-background {
    background-image: url('@/assets/images/users/user.svg');
    background-size: cover;
    background-position: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
</style>