<template>
  <v-container>
    <v-row>
      <div class="bg-blur">
        <div class="round-1"></div>
        <div class="round-2"></div>
      </div>
      <v-col cols="12" lg="5" md="6" class="d-flex align-center justify-center position-relative">
        <div>
          <h4 class="text-h4">Coming Soon</h4>
          <h2 class="text-h2 mb-2 mt-sm-7"><span class="text-primary">Able Pro</span> - The Bootstrap Admin Template</h2>
          <small class="text-h6 text-lightText"
            >Presenting Vuetify-UI based Vue Dashboard Template to build performance centric websites and applications.</small
          >
          <v-row>
            <v-col cols="12" lg="8" class="d-sm-flex ga-2 align-center pt-12">
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
      <v-col cols="12" lg="7" md="6">
        <div class="ComingsoonWrapper my-6">
          <v-row class="align-end">
            <v-col cols="6" class="text-end">
              <img src="@/assets/images/maintenance/img-soon-1-1.png" alt="maintenance" />
            </v-col>
            <v-col cols="6">
              <img src="@/assets/images/maintenance/img-soon-1-2.png" alt="maintenance" />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.ComingsoonWrapper {
  position: relative;
  img {
    height: 812px;
    @media (max-width: 1279px) {
      height: 630px;
    }
    @media (max-width: 500px) {
      height: 440px;
    }
  }
}
</style>
