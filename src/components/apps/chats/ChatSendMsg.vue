<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useChatStore } from '@/stores/apps/chat';

const msg = ref('');
const store = useChatStore();

function addItemAndClear(item: string) {
  if (item.length === 0) {
    return;
  }
  store.sendMsg(store.chatContent + 1, msg.value);
  msg.value = '';
}
</script>

<template>
  <v-divider></v-divider>
  <form class="pa-4" @submit.prevent="addItemAndClear(msg)">
    <v-textarea placeholder="Your message..." v-model="msg" variant="underlined"></v-textarea>
    <div class="d-flex align-center">
      <v-btn icon rounded="md" aria-label="smile" variant="text" size="small">
        <SvgSprite name="custom-smile-outline" class="text-secondary" style="width: 20px; height: 20px; opacity: 0.5" />
      </v-btn>
      <v-btn icon rounded="md" aria-label="clip" variant="text" size="small">
        <SvgSprite name="custom-paper-clip-outline" class="text-secondary" style="width: 20px; height: 20px; opacity: 0.5" />
      </v-btn>
      <v-btn icon rounded="md" aria-label="picture" variant="text" size="small">
        <SvgSprite name="custom-picture-outline" class="text-secondary" style="width: 20px; height: 20px; opacity: 0.5" />
      </v-btn>
      <v-btn icon rounded="md" aria-label="sound" variant="text" size="small">
        <SvgSprite name="custom-sound-outline" class="text-secondary" style="width: 20px; height: 20px; opacity: 0.5" />
      </v-btn>
      <v-btn icon rounded="md" aria-label="send" variant="text" class="ms-auto" color="primary" type="submit">
        <SvgSprite name="custom-send-outline" style="width: 20px; height: 20px" />
      </v-btn>
    </div>
  </form>
</template>
