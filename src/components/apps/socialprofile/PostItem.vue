<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { usePostsStore } from '@/stores/apps/posts';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import Comments from './CommentBox.vue';
import uniqueId from 'lodash/uniqueId';
import type { Comment, Reply } from '@/types/user/post';

const store = usePostsStore();
const props = defineProps({
  post: Object || Array
});

const showCommentBox = ref(!(props.post?.comments && props.post?.comments.length > 0));
const searchValue = ref('');
const items = shallowRef([{ title: 'Edit' }, { title: 'Delete' }]);
const shareitems = shallowRef([
  { title: 'Share Now', icon: 'custom-hierarchy-outline' },
  { title: 'Share to Friends', icon: 'custom-multi-users' },
  { title: 'Send in Messanger', icon: 'custom-message-outline' },
  { title: 'Copy Link', icon: 'custom-copy' }
]);

const toggleCommentbox = () => {
  return (showCommentBox.value = !showCommentBox.value);
};

const handlePostLikes = async (postId: string) => {
  await store.likePost(postId);
};

const onSubmit = async (id: string, comment: Comment | string) => {
  const commentId = uniqueId('#COMMENT_');
  const newComment: Reply = {
    id: commentId,
    profile: {
      id: uniqueId('#COMMENT_'),
      avatar: props.post?.profile.avatar,
      name: props.post?.profile.name,
      time: 'now'
    },
    data: {
      comment: typeof comment === 'string' ? comment : (comment?.data?.comment ?? ''), // Add a null check for comment.data
      likes: {
        like: false,
        value: 0
      },
      replies: []
    }
  };
  store.addComment(id, newComment);
  searchValue.value = '';
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface pa-5" rounded="lg">
    <div class="d-flex ga-4 align-center">
      <img :src="post?.profile.avatar" width="40" class="rounded-md" alt="avatar" />
      <div class="d-block d-sm-flex align-center ga-4">
        <h5 class="text-h5 mb-0">{{ post?.profile.name }}</h5>
        <span class="text-subtitle-2 opacity-50 d-flex align-center">
          <v-badge dot color="secondary" size="small" inline> </v-badge>
          {{ post?.profile.time }}
        </span>
      </div>
      <v-menu rounded="md">
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" aria-label="menu" rounded="md" variant="text" color="secondary" class="ms-auto" v-bind="props">
            <SvgSprite name="custom-more-outline" style="width: 18px; height: 18px; transform: rotate(90deg)" />
          </v-btn>
        </template>

        <v-list elevation="24" aria-label="menu" aria-busy="true" density="compact" rounded="md" class="py-0">
          <v-list-item v-for="(item, index) in items" :key="index" :value="index">
            <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="py-4 text-body-1">
      {{ post?.data.content }}
    </div>
    <!---If Images-->
    <v-row v-if="post?.data.images">
      <v-col :md="photo.featured ? '12' : '6'" v-for="photo in post?.data.images" :key="photo.img">
        <v-img :src="photo.img" alt="photo" class="h-100" />
      </v-col>
    </v-row>
    <!--If Video-->
    <div v-if="post?.data.video" class="rounded-md overflow-hidden my-5">
      <iframe
        :src="`https://www.youtube.com/embed/${post?.data.video}`"
        class="rounded-md"
        title="video"
        frameborder="0"
        width="100%"
        height="400"
      ></iframe>
    </div>
    <!---Like and comment count-->
    <div class="my-4 mt-5 d-flex ga-4">
      <v-btn
        @click="handlePostLikes(`${post?.id}`)"
        :color="post?.data && post?.data.likes && post?.data.likes.like ? 'primary' : 'inherit'"
        variant="text"
        rounded="md"
        size="small"
      >
        <template v-slot:prepend>
          <SvgSprite name="custom-like-outline" style="width: 16px; height: 16px" />
        </template>
        {{ post?.data && post?.data.likes && post?.data.likes.value }} <span class="d-none d-sm-inline-block ms-1">Like</span>
      </v-btn>
      <v-btn color="secondary" rounded="md" variant="text" size="small" @click="toggleCommentbox">
        <template v-slot:prepend>
          <SvgSprite name="custom-message-outline" style="width: 16px; height: 16px" />
        </template>
        {{ post?.data.comments ? post?.data.comments.length : 0 }}
        <span class="d-none d-sm-inline-block ms-1">Comment</span>
      </v-btn>
      <v-menu rounded="md">
        <template v-slot:activator="{ props }">
          <v-btn icon class="ms-auto" aria-label="menu" rounded="md" variant="text" size="small" v-bind="props">
            <SvgSprite name="custom-hierarchy-outline" style="width: 16px; height: 16px" />
          </v-btn>
        </template>

        <v-list elevation="24" density="compact" aria-label="menu" aria-busy="true" class="py-0" rounded="md">
          <v-list-item v-for="(item, index) in shareitems" :key="index" :value="index">
            <template v-slot:prepend>
              <SvgSprite :name="item.icon || ''" style="width: 18px; height: 18px" />
            </template>
            <v-list-item-title class="ms-3 text-h6">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <!---Comment Form-->
    <div class="d-block d-sm-flex ga-4 align-center mb-5" v-if="showCommentBox">
      <img :src="post?.profile.avatar" width="40" class="flex-shrink-0 d-none d-sm-block rounded-md" alt="avatar" />
      <v-text-field
        variant="outlined"
        single-line
        color="primary"
        density="comfortable"
        v-model="searchValue"
        placeholder="Write Comment"
        hide-details
      ></v-text-field>
      <v-btn
        color="secondary"
        variant="flat"
        rounded="md"
        :disabled="searchValue === ''"
        class="mt-3 mt-sm-0"
        size="large"
        @click="onSubmit(post?.id, searchValue)"
      >
        Comment
      </v-btn>
    </div>
    <!--If Comment-->
    <div v-if="post?.data.comments">
      <div v-for="comments in post?.data.comments" :key="comments.id">
        <Comments :comments="comments" :postId="post?.id" />
      </div>
    </div>
  </v-card>
</template>
