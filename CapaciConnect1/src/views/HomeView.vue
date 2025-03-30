<template>
  <Navbar />

  <CarouselComponent />
  <main>
    <div class="max-w-md mx-auto m-10">
      <label for="search" class="sr-only">Buscar</label>
      <div class="relative">
        <svg
          class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 pl-3 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
          />
        </svg>
      </div>
    </div>

    <div class="mt-19 px-19 pb-11 bg-[#F2F5FA]">
      <h2 class="text-[#212122] py-11">Talleres destacados</h2>
      <Loading v-if="loadingStore.isLoading" />

      <div v-else>
        <div
          v-if="workshops.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="workshop in workshops"
            :key="workshop.id_workshop"
            class="shadow-lg rounded-lg flex flex-col overflow-hidden"
          >
            <div class="flex-1 h-40 md:h-auto">
              <img
                :src="'data:image/jpeg;base64,' + workshop.image"
                alt="Imagen"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="p-4">
              <h3 class="text-[#212122]">{{ workshop.title }}</h3>
              <p class="text-[#212122]">{{ workshop.description }}</p>
              <h3 class="text-[#2563EB]">{{ getTypeName(workshop.id_type_id) }}</h3>
              >
            </div>
          </div>
        </div>

        <h3 v-else class="text-gray-500">No hay talleres creados</h3>
      </div>
    </div>

    <div class="flex flex-col items-center my-19 px-19 pb-11">
      <div class="flex items-start w-full">
        <h2 class="text-[#212122] text-start pb-4 items-start">Tipos de talleres</h2>
      </div>

      <!-- Contenedor de tarjetas en formato grid -->
      <div v-if="types && types.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        <div
          v-for="type in types"
          :key="type.id_type"
          class="flex justify-center items-center h-[5rem] w-[20rem] bg-[#33415C] text-white font-bold text-xl rounded-lg shadow-md"
        >
          <div class="text-cente">{{ type.type_name }}</div>
        </div>

        <!-- <button
          class="bg-gray-600 text-white px-8 py-4 rounded-md hover:bg-gray-700 transition m-10"
        >
          Ver mas
        </button> -->
      </div>
    </div>
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Footer from '@/components/global/Footer.vue'
import Navbar from '@/components/global/Navbar.vue'
import Carousel from 'primevue/carousel'
import CarouselComponent from '@/components/common/CarouselComponent.vue'

import { useWorkshopStore, useTypeStore } from '@/stores/user'
import { onMounted, computed } from 'vue'
import Loading from '@/components/common/Loading.vue'
import { useLoadingStore } from '@/stores/loadingStore'
import BaseButton from '@/components/common/BaseButton.vue'

const loadingStore = useLoadingStore()
const workshopStore = useWorkshopStore()
const typeStore = useTypeStore()

const getTypeName = (id_type_id: number): string => {
  const type = typeStore.types.find((tipo) => tipo.id_type === id_type_id)
  return type ? type.type_name : 'Tipo desconocido'
}

onMounted(async () => {
  await workshopStore.fetchWorkshops()
  await typeStore.fetchType()
})

const workshops = computed(() => workshopStore.workshops)
const types = computed(() => typeStore.types)

//DATOS PRETERMINADO
const images = [
  {
    src: 'https://imgs.search.brave.com/StHMYfoGPw7_H4IYi7bvMOksuzhx6Ep9_qpq0cup9iE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb25j/ZXB0by5kZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNS8wMy9u/YXR1cmFsZXphLW1l/ZGlvLWFtYmllbnRl/LWUxNTA1NDA3MDkz/NTMxLmpwZWc',
    alt: 'Naturaleza',
    title: 'Naturaleza',
    description: 'Disfruta de la serenidad de la naturaleza.',
  },
  {
    src: 'https://imgs.search.brave.com/1fwxmvz9BVGu2yQtBK9wCEmyku0jKEz3FUdsRZzsLZc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWV4aWNvZGVzY29u/b2NpZG8uY29tLm14/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEw/LzA1L2NpdWRhZC1k/ZS1tZXhpY28tYW5n/ZWwtaW5kZXBlbmRl/bmNpYS1kZXBvc2l0/cGhvdG9zLmpwZw',
    alt: 'Ciudad',
    title: 'Ciudad',
    description: 'Explora las luces y sombras de las ciudades.',
  },
  {
    src: 'https://imgs.search.brave.com/g_Nd3jCJ5ofrHIgjuhUYp2ordkrPdBMZiIxh39R0jxE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb25j/ZXB0by5kZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNC8wOC90/ZWNub2xvZ2lhLWUx/NTUxMzg2NzI2NDM1/LmpwZw',
    description: 'El futuro está aquí, con tecnología avanzada.',
  },
]
</script>
