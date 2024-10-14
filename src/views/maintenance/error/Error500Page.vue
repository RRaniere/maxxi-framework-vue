<script setup lang="ts"></script>

<template>
  <v-row no-gutters class="overflow-hidden bg-containerBg" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="errorMedia">
          <img src="@/assets/images/maintenance/img-error-500.svg" alt="404" />
        </div>
        <h1 class="text-md-h1 text-h2 mt-6 mb-1">Internal Server Error</h1>
        <p class="text-caption text-lightText">Server error 500. we fixing the problem. please try <br />again at a later stage.</p>
        <v-btn variant="flat" color="primary" rounded="md" class="mt-4" to="/dashboard/default"> Back To Home</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.errorMedia {
  > img {
    @media (min-width: 0px) {
      width: 310px;
    }
    @media (min-width: 768px) {
      width: 396px;
    }
  }
}
</style>
