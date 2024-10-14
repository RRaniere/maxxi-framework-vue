<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import user1 from '@/assets/images/users/avatar-1.png';
import user2 from '@/assets/images/users/avatar-2.png';
import user3 from '@/assets/images/users/avatar-3.png';

type commentsType = {
  name: string;
  desc: string;
  avatar: string;
  date: string;
  ratings: number;
};
const rating = ref(4);
const comments = shallowRef<commentsType[]>([
  {
    name: 'Amy Woods',
    desc: 'Zucej uko mipivohit ibir sobak jeci geeho kefaz ve rusel vucacku lonkiso ene rocuhuh cezfeg lut. Ipi bod gaare veohu jududuc bog ajifaag ej neewcaj bicgo suzag ta idnecu mofsimij woc tos ifco wohnukgah.',
    avatar: user1,
    date: '02/11, 2023 3:02:24 PM',
    ratings: 3.5
  },
  {
    name: 'Emily Greene',
    desc: 'Binu dud ca pulrog imcim nekuiga osita uga do lofug bod iw. Jazuba fi bulacil ufi sejed vud dobe meiga jef terabe bac opve tum woajovog kam wicibeb jed bo.',
    avatar: user2,
    date: '28/10, 2023 4:28:24 AM',
    ratings: 1.5
  },
  {
    name: 'Martin Vargas',
    desc: 'Zazsa def rozo vuko himecfo licema dil popwilfo desawniz givu zo surfok etvul. Oganumo di til verujan jodezu ew uw huzvuguv ijnu hil ruz vob medretuta ehilamuf.',
    avatar: user3,
    date: '25/10, 2023 11:25:24 AM',
    ratings: 5
  }
]);
</script>

<template>
  <v-row>
    <v-col lg="12" cols="12">
      <v-card variant="outlined" elevation="0" rounded="lg" class="h-100 d-flex align-center justify-center">
        <v-row class="mx-0 align-center">
          <v-col cols="12" md="7" sm="4" class="pa-sm-4">
            <div class="pt-sm-0 pt-5">
              <h2 class="text-h2 mb-2 d-flex align-center">
                4
                <h4 class="text-h4 text-lightText mb-0 ms-1">/5</h4>
              </h2>
              <p class="text-h6 text-lightText mb-1">Based on 275 reviews</p>
              <div class="text-medium-emphasis align-center d-flex ga-2">
                <v-rating color="inputBorder" active-color="warning" half-increments v-model="rating" density="compact"> </v-rating>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" sm="8" class="pa-sm-4">
            <div class="pa-sm-4">
              <div class="d-flex align-center ga-4 my-2">
                <v-progress-linear
                  model-value="100"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  bg-opacity="1"
                  rounded
                ></v-progress-linear>
                <div class="text-no-wrap text-caption text-lightText">5 Stars</div>
              </div>
              <div class="d-flex align-center ga-4 my-2">
                <v-progress-linear
                  model-value="80"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  bg-opacity="1"
                  rounded
                ></v-progress-linear>
                <div class="text-no-wrap text-caption text-lightText">4 Stars</div>
              </div>
              <div class="d-flex align-center ga-4 my-2">
                <v-progress-linear
                  model-value="60"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  bg-opacity="1"
                  rounded
                ></v-progress-linear>
                <div class="text-no-wrap text-caption text-lightText">3 Stars</div>
              </div>
              <div class="d-flex align-center ga-4 my-2">
                <v-progress-linear
                  model-value="40"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  bg-opacity="1"
                  rounded
                ></v-progress-linear>
                <div class="text-no-wrap text-caption text-lightText">2 Stars</div>
              </div>
              <div class="d-flex align-center ga-4 my-2">
                <v-progress-linear
                  model-value="20"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  bg-opacity="1"
                  rounded
                ></v-progress-linear>
                <div class="text-no-wrap text-caption text-lightText">1 Stars</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col lg="12">
      <v-card variant="flat" class="d-flex align-center mb-7 bg-containerBg" rounded="lg" v-for="(comment, i) in comments" :key="i">
        <div class="d-flex align-start ga-2 pa-4">
          <v-avatar size="40">
            <img :src="comment.avatar" alt="users" width="40" />
          </v-avatar>
          <div>
            <h6 class="text-subtitle-1 mb-0">{{ comment.name }}</h6>
            <span class="text-caption text-lightText">{{ comment.date }}</span>
            <div class="v-col-lg-2 px-0 py-0">
              <v-rating
                size="small"
                half-increments
                v-model="comment.ratings"
                density="compact"
                color="inputBorder"
                active-color="warning"
              />
            </div>
            <p class="text-caption mt-2">{{ comment.desc }}</p>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <div class="text-center mb-6">
    <v-btn variant="text" rounded="md" color="primary">View more comments</v-btn>
  </div>
  <div class="position-relative">
    <v-textarea density="comfortable" hide-details placeholder="Add comment" variant="outlined"></v-textarea>
    <div class="comment-panel d-flex justify-space-between align-center pa-3">
      <div>
        <v-btn icon rounded="md" aria-label="attach" color="primary" variant="text">
          <SvgSprite name="custom-paper-clip-2" style="width: 20px; height: 20px" />
        </v-btn>
        <v-btn icon rounded="md" aria-label="picture" color="primary" variant="text">
          <SvgSprite name="custom-picture-outline" style="width: 20px; height: 20px" />
        </v-btn>
        <v-btn icon rounded="md" aria-label="emoji" color="primary" variant="text">
          <SvgSprite name="custom-smile-outline" style="width: 20px; height: 20px" />
        </v-btn>
      </div>
      <v-btn color="primary" rounded="md" variant="flat" size="small">Comment</v-btn>
    </div>
  </div>
</template>
<style lang="scss">
.comment-panel {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
