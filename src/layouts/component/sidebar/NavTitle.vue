<script setup>
const props = defineProps({ item: Object });
</script>

<template>
  <h5 class="text-h5 text-darkText my-5">{{ $t(props.item.header) }}</h5>
</template>
