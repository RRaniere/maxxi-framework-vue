<script setup>
import { ref, onMounted, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useChatStore } from '@/stores/apps/chat';

const store = useChatStore();

onMounted(() => {
  store.fetchChats();
});

const getChats = computed(() => {
  return store.getChats;
});

const chatItem = getChats;
const searchValue = ref('');
const filteredChats = computed(() => {
  return chatItem.value.filter((chat) => {
    return chat.name.toLowerCase().includes(searchValue.value.toLowerCase());
  });
});
</script>
<template>
  <div class="py-3 mt-2">
    <v-text-field variant="outlined" v-model="searchValue" persistent-placeholder placeholder="Search Contact" hide-details>
      <template v-slot:prepend-inner>
        <SvgSprite name="custom-search" class="text-lightText" style="width: 20px; height: 20px" />
      </template>
    </v-text-field>
  </div>
  <perfect-scrollbar class="mb-3" style="height: 430px">
    <v-list aria-label="chat list" aria-busy="true" border>
      <!---Single Item-->
      <v-list-item
        :value="chat.id"
        color="secondary"
        class="text-no-wrap chatItem"
        v-for="chat in filteredChats"
        :key="chat.id"
        lines="two"
        rounded="md"
        :active="store.chatContent === chat.id - 1"
        @click="store.SelectChat(chat.id)"
      >
        <!---Avatar-->
        <template v-slot:prepend>
          <v-avatar>
            <img :src="chat.thumb" alt="pro" width="40" />
          </v-avatar>
          <SvgSprite
            class="badg-dot"
            :name="
              chat.status === 'away'
                ? 'custom-away-fill'
                : chat.status === 'do not disturb'
                  ? 'custom-disturb-fill'
                  : chat.status === 'active'
                    ? 'custom-check-circle-fill'
                    : 'containerBg'
            "
            :class="
              chat.status === 'away'
                ? 'text-warning'
                : chat.status === 'do not disturb'
                  ? 'text-secondary'
                  : chat.status === 'active'
                    ? 'text-success'
                    : 'text-containerBg'
            "
            style="width: 14px; height: 14px"
          />
        </template>
        <!---Name-->
        <v-list-item-title class="text-h5 pe-2 mb-1">{{ chat.name }}</v-list-item-title>
        <!---Subtitle-->
        <v-list-item-subtitle class="text-caption mt-n1 text-lightText" style="opacity: 1">
          {{ chat.excerpt }}
        </v-list-item-subtitle>
        <!---Last seen--->
        <template v-slot:append>
          <div class="d-flex flex-column text-end">
            <small class="text-lightText text-caption mb-1">{{ chat.lastMessage }}</small>
            <v-badge dot color="primary" :content="chat.unReadChatCount" inline v-if="chat.unReadChatCount"></v-badge>
            <SvgSprite v-else name="custom-circle-check-outline" class="ms-auto text-lightText" style="width: 16px; height: 16px" />
          </div>
        </template>
      </v-list-item>
    </v-list>
  </perfect-scrollbar>
</template>
<style>
.chatItem {
  padding: 16px !important;
}
.badg-dot {
  position: relative;
  top: -14px;
  left: -11px;
  background-color: rgb(var(--v-theme-surface));
  border-radius: 100%;
  [dir='rtl'] & {
    left: unset;
    right: -11px;
  }
}
</style>
