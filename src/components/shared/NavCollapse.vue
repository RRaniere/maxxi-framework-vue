<script setup>
import NavItem from '../NavItem/NavItem.vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
const props = defineProps({ item: Object, level: Number });
</script>

<template>
  <!---Dropdown  -->
  <a class="navItemLink rounded-md cursor-pointer">
    <!---Icon  -->
    <i class="navIcon">
      <SvgSprite :name="props.item.icon || ''" :level="level" />
    </i>
    <!---Title  -->
    <span class="me-auto">{{ item.title }}</span>
    <!---If Caption-->
    <small v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ item.subCaption }}
    </small>
    <i class="ddIcon ms-2">
      <SvgSprite name="custom-chevron-outline" style="width: 14px; height: 14px" />
    </i>
  </a>
  <!---Sub Item-->
  <ul :class="`ddMenu ddLevel-${level + 1}`">
    <li v-for="(subitem, i) in item.children" :key="i" class="navItem rounded-0">
      <NavCollapse :item="subitem" v-if="subitem.children" :level="props.level + 1" />
      <NavItem :item="subitem" :level="props.level + 1" v-else></NavItem>
    </li>
  </ul>
  <!---End Item Sub Header -->
</template>
