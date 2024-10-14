<script>
import { ref } from 'vue';
export default {
  name: 'CounterCards',
  setup() {
    const years = ref(0);
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const lunchDate = new Date('30 August 2024');

    setInterval(() => {
      const currentDate = new Date();
      const lunchTime = lunchDate - currentDate;
      seconds.value = parseInt(lunchTime / 1000);
      minutes.value = parseInt(seconds.value / 60);
      hours.value = parseInt(minutes.value / 60);
      days.value = parseInt(hours.value / 24);
      years.value = parseInt(days.value / 365);
    }, 1000);
    return { years, days, hours, minutes, seconds };
  }
};
</script>

<template>
  <v-container fluid class="bg-containerBg">
    <v-container style="height: calc(100vh - 32px); display: flex; align-items: center">
      <v-row no-gutters>
        <v-col cols="12" md="5">
          <div class="ComingsoonWrapper my-6">
            <img src="@/assets/images/maintenance/img-soon-2.svg" alt="maintenance" />
          </div>
        </v-col>
        <v-col cols="12" md="7" class="d-flex align-center justify-center">
          <div class="text-center">
            <h1 class="text-md-h1 text-h2 mb-2 mt-sm-12">Coming Soon</h1>
            <small class="text-h6 text-lightText">Something new is on it's way</small>
            <div class="max380 align-center mt-5">
              <v-row class="ma-0 comingsoon-timer overflow-hidden">
                <v-col cols="3" sm="3">
                  <v-card variant="outlined" class="bg-surface">
                    <v-card-text class="pa-0">
                      <v-sheet rounded="md" class="Timeblock text-h2 py-3 px-1">{{ days % 365 }} </v-sheet>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="3" sm="3">
                  <v-card variant="outlined" class="bg-surface">
                    <v-card-text class="pa-0">
                      <v-sheet rounded="md" class="Timeblock text-h2 py-3 px-1">{{ hours % 24 }}</v-sheet>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="3" sm="3">
                  <v-card variant="outlined" class="bg-surface">
                    <v-card-text class="pa-0">
                      <v-sheet rounded="md" class="Timeblock text-h2 py-3 px-1">{{ minutes % 60 }}</v-sheet>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="3" sm="3">
                  <v-card variant="outlined" class="bg-surface">
                    <v-card-text class="pa-0">
                      <v-sheet rounded="md" class="Timeblock text-h2 py-3 px-1">{{ seconds % 60 }}</v-sheet>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <v-row class="ma-0">
              <v-col cols="12" lg="12" class="d-sm-flex ga-2 align-center pt-8">
                <v-text-field
                  variant="outlined"
                  density="comfortable"
                  single-line
                  placeholder="Email Address"
                  color="primary"
                  hide-details
                ></v-text-field>
                <v-btn color="primary" elevation="0" size="large" rounded="md" class="mt-4 mt-sm-0">
                  <template v-slot:prepend>
                    <SvgSprite name="custom-notification" style="width: 18px; height: 18px" />
                  </template>
                  Notify Me
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn variant="text" aria-label="facebook" icon color="secondary">
                  <SvgSprite name="custom-facebook" style="width: 18px; height: 18px" />
                </v-btn>
                <v-btn variant="text" aria-label="google" icon color="secondary">
                  <SvgSprite name="custom-google" style="width: 18px; height: 18px" />
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<style lang="scss">
.ComingsoonWrapper {
  display: flex;
  justify-content: center;
  img {
    height: 440px;
    @media (max-width: 1280px) {
      height: 350px;
    }
    @media (max-width: 600px) {
      height: 280px;
    }
  }
}
.max380 {
  max-width: 380px;
  margin: 0 auto;
}
.Timeblock {
  @media (max-width: 768px) {
    font-size: 1.25rem !important;
    line-height: 1.4;
  }
}
.comingsoon-timer {
  > div {
    padding: 10px;
    position: relative;
    @media (max-width: 768px) {
      padding: 8px;
    }
  }
}
</style>
