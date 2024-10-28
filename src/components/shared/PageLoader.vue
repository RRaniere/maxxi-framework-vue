<template>
<div class="loader-container">
      <v-progress-circular
          aria-label="circular progressbar"
          size="300"
          indeterminate
          color="primary"
          bg-opacity="1"
          bg-color="borderLight"
      >
      </v-progress-circular>
</div>
</template>

<style>
.loader-container {
  height: 50vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>