<template>
  <Navbar />

  <CarouselComponent />
  <main class="p-10">
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

    <div class="flex flex-col items-center m-5">
      <h1 class="text-black text-2xl font-bold mb-6 text-center">Talleres destacados</h1>

      <!-- Contenedor de tarjetas en formato grid -->
      <div v-if="workshops && workshops.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div
          v-for="workshop in workshops"
            :key="workshop.id_workshop"
          class="bg-white rounded-lg m-10 shadow-lg overflow-hidden"
        >
          <img src="../assets/logo.svg" alt="Taller de arte" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h2 class="text-lg text-black font-bold p-2">{{ workshop.title }}</h2>
            <p class="text-gray-600 p-3">{{ workshop.description }}</p>
            <p class="text-base text-gray-600">{{ workshop.id_user_id }}</p>
            <!-- <a href="/contenidoTalleres" class="text-blue-600 font-semibold mt-2 block p-4"
              >Tipo de taller</a
            > -->
          </div>
        </div>
      </div>
      <div class="flex-justify-start">
        <RouterLink to="/Talleres">
          <button class="bg-white text-[#2563EB] px-10 py-6 rounded-md border border-[#2563EB]">
            Mostrar Más
          </button>
        </RouterLink>
      </div>
    </div>

    <div class="flex flex-col items-center m-10">
      <h1 class="text-black text-2xl font-bold mb-6 text-center">Temas</h1>

      <!-- Contenedor de tarjetas en formato grid -->
      <div v-if="types && types.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-10">
        <div
        v-for="type in types"
          :key="type.id_type"
          class="flex justify-center items-center h-[5rem] w-[20rem] bg-[#33415C] text-white font-bold text-xl rounded-lg shadow-md"
        >
          <div class="text-center p-12">{{ type.type_name }}</div>
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

import { useWorkshopStore, useTypeStore  } from '@/stores/user'
import { onMounted, computed } from 'vue'

const workshopStore = useWorkshopStore();
const typeStore = useTypeStore()

onMounted(async () => {
  await workshopStore.fetchWorkshops();
  await typeStore.fetchType();
})

const workshops = computed(() => workshopStore.workshops);
const types = computed(() => typeStore.types);

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
