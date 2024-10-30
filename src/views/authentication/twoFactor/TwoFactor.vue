<script setup lang="ts"> 

import {ref, defineProps} from 'vue';


const props = defineProps({
    show: Boolean || false,
});

const dialog = ref(props.show)

</script>

