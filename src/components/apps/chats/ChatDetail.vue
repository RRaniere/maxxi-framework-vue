<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useChatStore } from '@/stores/apps/chat';
import type { ChatDetailType, ChatHistory } from '@/types/chats/ChatTypes';
import ChatSendMsg from './ChatSendMsg.vue';
import ChatInfo from './ChatInfo.vue';

import user1 from '@/assets/images/users/avatar-1.png';

const items = shallowRef([
  {
    title: 'Archive',
    icon: 'custom-document-2'
  },
  {
    title: 'Muted',
    icon: 'custom-speaker-outline'
  },
  {
    title: 'Delete',
    icon: 'custom-trash'
  }
]);

const replyitems = shallowRef([
  {
    title: 'Reply',
    icon: 'custom-reply-outline'
  },
  {
    title: 'Forward',
    icon: 'custom-play-outline'
  },
  {
    title: 'Copy',
    icon: 'custom-copy'
  },
  {
    title: 'Delete',
    icon: 'custom-trash'
  }
]);

const infodrawer = ref(false);

const store = useChatStore();
onMounted(() => {
  store.fetchChats();
});

const chatDetail = computed<ChatDetailType | null>(() => {
  const chat = store.chats[store.chatContent];
  if (chat) {
    // Ensure chatHistory follows the correct structure
    const chatHistory: ChatHistory[] = [];
    for (let i = 0; i < chat.chatHistory.length; i++) {
      const historyItem = chat.chatHistory[i];
      // Ensure each history item has the required id property
      const formattedHistoryItem: ChatHistory = {
        from: { from: historyItem.from.from, to: historyItem.from.to, id: 0 },
        to: { from: historyItem.to.from, to: historyItem.to.to, id: 1 }
      };

      chatHistory.push(formattedHistoryItem);
    }
    return { ...chat, chatHistory };
  } else {
    return null;
  }
});
</script>
<template>
  <div v-if="chatDetail" class="customHeight">
    <div class="d-sm-flex align-center ga-4 pa-4">
      <!---Toggle Button-->
      <v-btn icon @click="$emit('sToggle')" aria-label="menu" variant="text" rounded="md" class="d-none d-md-flex">
        <SvgSprite name="custom-menu-outline" class="text-lightText" style="width: 20px; height: 20px" />
      </v-btn>

      <!---Topbar Row-->
      <div class="d-flex align-center">
        <!---User Avatar-->
        <v-avatar>
          <img :src="chatDetail.thumb" alt="pro" width="40" />
        </v-avatar>

        <SvgSprite
          class="badg-Detail"
          :name="
            chatDetail.status === 'away'
              ? 'custom-away-fill'
              : chatDetail.status === 'do not disturb'
                ? 'custom-disturb-fill'
                : chatDetail.status === 'active'
                  ? 'custom-check-circle-fill'
                  : 'containerBg'
          "
          :class="
            chatDetail.status === 'away'
              ? 'text-warning'
              : chatDetail.status === 'do not disturb'
                ? 'text-secondary'
                : chatDetail.status === 'active'
                  ? 'text-success'
                  : 'text-containerBg'
          "
          style="width: 14px; height: 14px"
        />
        <!---Name & Last seen-->
        <div>
          <h5 class="text-subtitle-1 mb-0">{{ chatDetail.name }}</h5>
          <small class="text-lightText"> Active {{ chatDetail.lastMessage }} </small>
        </div>
      </div>
      <!---Topbar Icons-->
      <div class="ms-auto ga-2 d-flex">
        <v-btn icon variant="text" aria-label="phone" rounded="md">
          <SvgSprite name="custom-phone-outline" class="text-lightText" style="width: 20px; height: 20px" />
        </v-btn>
        <v-btn icon variant="text" aria-label="camera" rounded="md">
          <SvgSprite name="custom-camera-outline" class="text-lightText" style="width: 20px; height: 20px" />
        </v-btn>
        <v-btn icon variant="text" aria-label="info" rounded="md" @click.stop="infodrawer = !infodrawer">
          <SvgSprite name="custom-info-circle-outline" class="text-lightText" style="width: 20px; height: 20px" />
        </v-btn>
        <v-menu rounded="md">
          <template v-slot:activator="{ props }">
            <v-btn icon variant="text" aria-label="menu" rounded="md" v-bind="props">
              <SvgSprite name="custom-more-outline" class="text-lightText" style="width: 20px; height: 20px" />
            </v-btn>
          </template>

          <v-list rounded="md" elevation="24" aria-label="menu" aria-busy="true" width="110" density="compact" class="py-0">
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <template v-slot:prepend>
                <SvgSprite :name="item.icon || ''" class="me-2" style="width: 16px; height: 16px" />
              </template>
              <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!---Topbar Icons-->
    </div>
    <v-divider />
    <!---Chat History-->
    <perfect-scrollbar style="min-height: calc(100vh - 495px); height: 430px">
      <div v-for="(chat, index) in chatDetail.chatHistory" :key="index" class="pa-5 bg-containerBg">
        <div v-for="(from, index) in chat" :key="index">
          <div v-for="ch in from.from" :key="ch" class="d-flex position-relative">
            <v-avatar size="40" variant="flat" class="me-2">
              <img :src="chatDetail.thumb" width="40" alt="vector" />
            </v-avatar>
            <SvgSprite
              class="detail-badg-dot"
              :name="
                chatDetail.status === 'away'
                  ? 'custom-away-fill'
                  : chatDetail.status === 'do not disturb'
                    ? 'custom-disturb-fill'
                    : chatDetail.status === 'active'
                      ? 'custom-check-circle-fill'
                      : 'containerBg'
              "
              :class="
                chatDetail.status === 'away'
                  ? 'text-warning'
                  : chatDetail.status === 'do not disturb'
                    ? 'text-secondary'
                    : chatDetail.status === 'active'
                      ? 'text-success'
                      : 'text-containerBg'
              "
              style="width: 14px; height: 14px"
            />
            <div class="mb-3">
              <v-sheet class="bg-surface rounded-md pa-3 mb-1 text-end">
                <p class="text-body-1 mb-0">{{ ch }}</p>
              </v-sheet>
              <small class="text-subtitle-2 text-lightText">{{ chatDetail.lastMessage }}</small>
            </div>
          </div>
          <div v-for="chTo in from.to" :key="chTo" class="text-end">
            <div class="d-flex flex-end userReply position-relative">
              <v-avatar size="40" variant="flat" class="ms-2">
                <img :src="user1" width="40" alt="vector" />
              </v-avatar>
              <SvgSprite name="custom-check-circle-fill" class="detail-badg-dot text-success" style="width: 14px; height: 14px" />
              <div class="mb-3">
                <v-sheet class="bg-primary rounded-md pa-3 mb-1 d-inline-block">
                  <p class="text-body-1 mb-0">{{ chTo }}</p>
                </v-sheet>
                <small class="text-subtitle-2 text-lightText d-block">
                  {{ chatDetail.lastMessage }}
                </small>
              </div>
              <div style="min-width: 80px">
                <v-menu rounded="md">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="text" aria-label="menu" size="small" rounded="md" v-bind="props">
                      <SvgSprite name="custom-more-outline" class="text-lightText" style="width: 16px; height: 16px" />
                    </v-btn>
                  </template>

                  <v-list elevation="24" width="120" aria-label="menu" aria-busy="true" rounded="md" density="compact" class="py-0">
                    <v-list-item v-for="(item, index) in replyitems" :key="index" :value="index">
                      <template v-slot:prepend>
                        <SvgSprite :name="item.icon || ''" class="me-2" style="width: 16px; height: 16px" />
                      </template>
                      <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn size="small" variant="text" aria-label="edit" class="me-2" rounded="md" icon>
                  <SvgSprite name="custom-edit-outline" class="text-lightText" style="width: 16px; height: 16px" />
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
    <!---Chat send-->
    <ChatSendMsg />
    <!-- Info Sidebar -->
    <v-navigation-drawer v-model="infodrawer" temporary location="end" width="300">
      <ChatInfo @s-Toggle="infodrawer = !infodrawer" />
    </v-navigation-drawer>
  </div>
</template>
<style lang="scss">
.customHeight {
  min-height: calc(100vh - 300px);
}
.badg-dotDetail {
  left: -16px;
  position: relative;
  top: -16px;
  [dir='rtl'] & {
    left: unset;
    right: -16px;
  }
}
.detail-badg-dot {
  position: absolute;
  top: 0;
  left: 28px;
  background-color: rgb(var(--v-theme-surface));
  border-radius: 100%;
  [dir='rtl'] & {
    left: unset;
    right: 28px;
  }
}
.userReply {
  flex-flow: row-reverse;
  .detail-badg-dot {
    right: 0;
    left: unset;
    [dir='rtl'] & {
      left: 0;
      right: unset;
    }
  }
}
.badg-Detail {
  left: -12px;
  position: relative;
  top: -15px;
  background-color: rgb(var(--v-theme-surface));
  border-radius: 100%;
  [dir='rtl'] & {
    left: unset;
    right: -12px;
  }
}
</style>
