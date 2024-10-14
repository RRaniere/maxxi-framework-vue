<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import profileBg from '@/assets/images/profile/img-profile-bg.png';
import UserImage from '@/assets/images/profile/img-user.png';

const tab = ref(null);
const items = shallowRef([
  { tab: 'Profile', icon: 'custom-note-outline', href: '/app/user/social/posts' },
  { tab: 'Followers', icon: 'custom-multi-users', href: '/app/user/social/followers' },
  { tab: 'Friends', icon: 'custom-status-outline', href: '/app/user/social/friends' },
  { tab: 'Gallery', icon: 'custom-picture-outline', href: '/app/user/social/gallery' },
  { tab: 'Friend Request', icon: 'custom-user-add-outline', href: '/app/user/social/friendsrequest' }
]);
</script>

<template>
  <v-card elevation="0" variant="outlined" class="bg-surface overflow-hidden" rounded="lg">
    <div class="pb-0">
      <img :src="profileBg" alt="profile" class="w-100" />
      <v-row class="mt-4">
        <v-col lg="3" md="3" cols="12" class="text-center text-md-end">
          <div class="userImage"><img :src="UserImage" alt="profile" class="rounded-md" /></div
        ></v-col>
        <v-col lg="9" md="9" cols="12">
          <v-row class="me-0">
            <v-col md="5" cols="12" class="text-center text-md-start">
              <h5 class="text-h5">John Doe</h5>
              <small class="opacity-50">Android Developer</small>
            </v-col>
            <v-col md="7" cols="12">
              <div class="text-center text-md-end">
                <v-btn color="secondary" rounded="md" variant="outlined" class="me-2">Message</v-btn>
                <v-btn color="primary" rounded="md" variant="flat">
                  <template v-slot:prepend>
                    <SvgSprite name="custom-plus" style="width: 18px; height: 18px" />
                  </template>
                  Send Request
                </v-btn>
              </div>
            </v-col>
            <v-col md="12">
              <v-tabs v-model="tab" color="primary" class="profiletab">
                <v-tab v-for="item in items" :key="item.tab" :to="item.href">
                  <SvgSprite :name="item.icon || ''" class="me-2" style="width: 18px; height: 18px" />
                  {{ item.tab }}
                </v-tab>
              </v-tabs>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<style lang="scss">
.userImage {
  margin: -70px 0px 0px auto;
}
.profiletab .v-slide-group__content {
  justify-content: end;
  .v-btn--variant-text .v-btn__overlay {
    background: transparent;
  }
}

@media (max-width: 600px) {
  .userImage img {
    width: 72px;
    height: 72px;
  }
}
</style>
