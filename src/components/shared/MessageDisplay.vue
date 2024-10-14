
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    errorMessage: {
        type: String,
        default: '',
    },
    infoMessage: {
        type: String,
        default: '',
    }
});
</script>

<template>
    <div>
        <div v-if="errorMessage" >
            <v-alert color="error">{{ errorMessage }}</v-alert>
        </div>
        <div v-if="infoMessage">
            <v-alert color="success">{{ infoMessage }}</v-alert>
        </div>
    </div>
</template>
