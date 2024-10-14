<script setup>
import { ref, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { useRoute } from 'vue-router';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import product1 from '@/assets/images/e-commerce/prod-1.png';
import product2 from '@/assets/images/e-commerce/prod-2.png';
import product3 from '@/assets/images/e-commerce/prod-3.png';
import product4 from '@/assets/images/e-commerce/prod-4.png';
import product5 from '@/assets/images/e-commerce/prod-5.png';
import product6 from '@/assets/images/e-commerce/prod-6.png';

const store = useEcomStore();
const route = useRoute();

const getDetailImage = computed(() => {
  return store.products[route.params.id - 1].image;
});

const slideShow = [
  {
    image: getDetailImage.value,
    id: 1
  },
  {
    image: product1,
    id: 2
  },
  {
    image: product2,
    id: 3
  },
  {
    image: product3,
    id: 4
  },
  {
    image: product4,
    id: 5
  },
  {
    image: product5,
    id: 6
  },
  {
    image: product6,
    id: 7
  }
];

const currentSlide = ref(2);
function slideTo(val) {
  currentSlide.value = val;
}
</script>

<template>
  <div>
    <Carousel
      id="gallery"
      class="bg-gray100 rounded-md mb-4"
      aria-hidden="true"
      :items-to-show="1"
      :wrap-around="false"
      v-model="currentSlide"
    >
      <Slide v-for="(slide, i) in slideShow" :key="i">
        <div class="carousel__item w-100" aria-hidden="true">
          <img alt="product" :src="slide.image" class="w-100 rounded-md" />
          <v-btn variant="text" icon class="wishlistIcon" rounded="md" aria-hidden="true">
            <SvgSprite name="custom-heart-outline" class="text-lightText" style="width: 18px; height: 18px" />
          </v-btn>
        </div>
      </Slide>
    </Carousel>

    <Carousel
      id="thumbnails"
      class="thumbnail-carousel"
      :currentSlide="currentSlide"
      :transition="500"
      :items-to-show="6"
      :wrap-around="true"
      v-model="currentSlide"
      ref="carousel"
    >
      <Slide v-for="(slide, i) in slideShow" :key="i">
        <div class="carousel__item cursor-pointer" @click="slideTo(slide.id - 1)">
          <v-card variant="outlined">
            <img alt="product" :src="slide.image" class="w-100" />
          </v-card>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
<style lang="scss">
#thumbnails {
  .carousel__slide {
    border: 2px solid transparent;
    line-height: 0px;
    margin-inline: 6px;
    border-radius: 4px;
  }
  .carousel__slide--active {
    border: 2px solid rgb(var(--v-theme-primary));
  }
}
.wishlistIcon {
  position: absolute;
  right: 15px;
  top: 15px;
}
.thumbnail-carousel {
  .carousel__viewport {
    margin: 0 30px;
  }
}

.carousel__prev {
  margin-left: 0;
}
.carousel__next {
  margin-right: 0;
}
</style>
