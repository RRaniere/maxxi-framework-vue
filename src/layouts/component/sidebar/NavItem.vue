<script setup>
const props = defineProps({ item: Object, level: Number });
</script>

<template>
  <!---Single Item-->
  <v-list-item
    :to="item.type === 'external' ? '' : item.to"
    :href="item.type === 'external' ? item.to : ''"
    rounded-sm
    class="mb-1"
    color="primary"
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''"
  >
    <v-list-item-title class="text-h6 font-weight-medium text-lightText">
      {{ $t(props.item.title) }}
      <!---If any chip or label-->
      <v-chip
        v-if="item.chip"
        :color="item.chipColor"
        :border="item.chipVariant === 'tonal' ? `${item.chipColor} solid thin opacity-50` : ''"
        class="sidebarchip hide-menu ms-2"
        size="small"
        :variant="item.chipVariant"
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </v-list-item-title>
  </v-list-item>
</template>
