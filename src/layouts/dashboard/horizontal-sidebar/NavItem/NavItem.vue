<script setup>
const props = defineProps({ item: Object, level: Number });
import SvgSprite from '@/components/shared/SvgSprite.vue';
</script>

<template>
  <!---Single Item-->
  <router-link :to="`${item.to}`" class="navItemLink rounded-md" :disabled="item.disabled">
    <!---If icon-->
    <i class="navIcon">
      <SvgSprite :name="props.item.icon || ''" :level="props.level" />
    </i>
    <span>{{ item.title }}</span>
    <!---If Caption-->
    <small v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ item.subCaption }}
    </small>
    <!---If any chip or label-->
    <template v-if="item.chip">
      <v-chip
        :color="item.chipColor"
        class="sidebarchip hide-menu ms-auto"
        :size="item.chipIcon ? 'small' : 'small'"
        :variant="item.chipVariant"
        :prepend-icon="item.chipIcon"
        :border="item.chipVariant === 'tonal' ? `${item.chipColor} solid thin opacity-50` : ''"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </router-link>
</template>
