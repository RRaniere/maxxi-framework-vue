<script setup lang="ts">
import { shallowRef } from 'vue';

// icons
import { CheckIcon } from 'vue-tabler-icons';

const messages = shallowRef([
  {
    color: 'success',
    icon: CheckIcon,
    title: 'You’re getting more and more followers, keep it up!',
    time: '8:50'
  },
  {
    color: 'primary',
    title: 'Design mobile Application',
    time: 'Sat, 5 Mar'
  },
  {
    color: 'error',
    name: 'Jenny',
    title: ' assign you a task ',
    link: 'Mockup Design.',
    time: 'Sun, 17 Feb'
  },
  {
    color: 'warning',
    title: 'Design logo',
    time: 'Sat, 18 Mar '
  },
  {
    color: 'success',
    title: 'Design mobile Application',
    time: 'Sat, 22 Mar'
  }
]);
</script>

<template>
  <div class="py-6">
    <v-timeline align="start" line-color="borderLight" side="end" truncate-line="both" class="justify-start oppositeRemove px-5">
      <v-timeline-item
        :size="message.icon ? 'small' : '14'"
        v-for="(message, i) in messages"
        :key="i"
        :dot-color="message.color"
        line-inset="0"
        fill-dot
      >
        <template v-slot:icon>
          <div v-if="message.icon">
            <component :is="message.icon" size="14" class="text-surface" style="vertical-align: text-bottom" />
          </div>
          <v-avatar v-else size="10" :color="message.color" variant="flat"> </v-avatar>
        </template>
        <v-card elevation="0" rounded="0">
          <span class="text-body-1">{{ message.time }}</span>
          <h5 class="text-h5 text-lightText text-wrap mb-0">
            <router-link to="/widget/data" class="text-primary link-hover" v-if="message.name">{{ message.name }}</router-link>
            {{ message.title }}
            <router-link to="/widget/data" class="text-primary link-hover" v-if="message.link">{{ message.link }}</router-link>
          </h5>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
<style lang="scss">
.oppositeRemove {
  .v-timeline-item__opposite {
    display: none;
  }
  &.v-timeline--vertical.v-timeline.v-timeline--side-end {
    .v-timeline-item {
      .v-timeline-item__body {
        padding-inline-start: 16px;
      }
    }
  }
}
</style>
