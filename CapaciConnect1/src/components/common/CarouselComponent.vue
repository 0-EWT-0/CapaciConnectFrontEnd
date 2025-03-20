<template>
  <div class="relative w-full overflow-hidden shadow-lg">
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="w-full flex-shrink-0 relative">
        <img :src="slide.image" :alt="slide.text" class="w-full h-[500px] object-cover" />
        <div class="absolute inset-0 bg-opacity-40 flex items-center justify-center">
          <h1>{{ slide.text }}</h1>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 pb-4">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        class="p-4 rounded-full cursor-pointer"
        :class="currentIndex === index ? 'bg-[#F2F5FA]' : 'bg-white'"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import img1 from '@/assets/imgs/banner1.jpg'
import img2 from '@/assets/imgs/banner2.jpg'
import img3 from '@/assets/imgs/banner3.jpg'

const slides = ref([
  { image: img1, text: 'Capacítate' },
  { image: img2, text: 'Aprende' },
  { image: img3, text: 'Prepárate' },
])

const currentIndex = ref(0)
const intervalTime = 5000
let interval = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

onMounted(() => {
  interval = setInterval(nextSlide, intervalTime)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped></style>
