<template>
  <Header />
  <main class="p-10">
    <Carousel
      :value="images"
      :numVisible="1"
      :numScroll="1"
      :circular="true"
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div class="flex justify-center items-center">
          <img
            :src="slotProps.data.src"
            :alt="slotProps.data.alt"
            class="w-[110rem] h-[30rem] rounded-lg shadow-xl"
          />
          <h1 class="absolute text-white text-6xl font-bold drop-shadow-xl">Capacitate</h1>
        </div>
      </template>
    </Carousel>

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
        <input
          type="text"
          id="search"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="¿Qué quieres aprender hoy?"
        />
      </div>
    </div>

    <div class="flex flex-col items-center m-5">
      <h1 class="text-black text-2xl font-bold mb-6 text-center">Talleres destacados</h1>

      <!-- Contenedor de tarjetas en formato grid -->
      <div class="flex flex-col items-center">
        <div
          v-if="workshops && workshops.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center p-5"
        >
          <!-- Tarjeta 1 -->
          <div
            v-for="workshop in workshops"
            :key="workshop.id_workshop"
            class="flex flex-col justify-between h-[20rem] w-[25rem] bg-white text-black font-bold text-2xl rounded-lg shadow-md overflow-hidden"
          >
            <img src="../assets/logo.svg" class="w-full h-52 object-cover rounded-t-lg" />
            <div class="p-5 text-center">
              <p class="text-2xl">{{ workshop.title }}</p>
              <p class="text-base text-gray-600">{{ workshop.id_user_id }}</p>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-500">No hay workshops disponibles.</p>
      </div>

      <RouterLink to="/Talleres">
        <button class="bg-white text-[#2563EB] px-10 py-6 rounded-md mt-10 border border-[#2563EB]">
          Mostrar Más
        </button>
      </RouterLink>
    </div>

    <!-- Contenedor principal -->
    <div class="flex flex-col items-center m-10">
      <h1 class="text-black text-2xl font-bold mb-6 text-center">Temas</h1>

      <!-- Grid de 3 columnas y 2 filas -->
      <div
        v-if="types && types.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-10"
      >
        <!-- Tarjeta 1 -->
        <div
          v-for="type in types"
          :key="type.id_type"
          class="flex justify-center items-center h-[5rem] w-[20rem] bg-[#33415C] text-white font-bold text-xl rounded-lg shadow-md"
        >
          <p class="text-center">{{ type.type_name }}</p>
        </div>
      </div>

      <!-- Botón -->
      <!-- <button class="bg-white text-[#2563EB] px-10 py-6 rounded-md mt-10 border border-[#2563EB]">
        Mostrar Más
      </button> -->
    </div>

    <div class="flex flex-col items-center m-10">
      <h1 class="text-black text-2xl font-bold mb-6 text-center">Proximas Fechas</h1>

      <!-- Contenedor de tarjetas en formato grid -->
      <div class="flex flex-col items-center">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center p-5">
          <!-- Tarjeta 1 -->
          <div
            v-for="index in 3"
            :key="index"
            class="flex flex-col items-center justify-center h-[25rem] w-[15rem] bg-gray-200 text-black font-bold text-2xl rounded-lg shadow-md overflow-hidden"
          >
            <div class="flex flex-col items-center justify-center p-5 text-center">
              <p class="text-xl">Título Taller</p>
              <p class="text-base text-[#2563EB] my-2">Tipo de Taller</p>
              <p class="text-2xl">Enero</p>
              <span
                class="h-12 w-12 rounded-full bg-[#059669] flex items-center justify-center text-white text-xl mt-2"
                >01</span
              >
              <p class="text-base text-gray-600 mt-2">2025</p>
            </div>
          </div>
        </div>
      </div>

      <button class="bg-white text-[#2563EB] px-10 py-6 rounded-md mt-10 border border-[#2563EB]">
        Mostrar Más
      </button>
    </div>
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Footer from '@/components/global/Footer.vue'
import Header from '@/components/global/Header.vue'
import Carousel from 'primevue/carousel'
import { useWorkshopStore, useTypeStore } from '@/stores/user'
import { onMounted, computed } from 'vue'

const workshopStore = useWorkshopStore()
const typeStore = useTypeStore()

onMounted(async () => {
  await workshopStore.fetchWorkshops()
  await typeStore.fetchType()
})

const workshops = computed(() => workshopStore.workshops)
const types = computed(() => typeStore.types)

const images = [
  {
    src: 'src/assets/imgs/banner1.jpg',
  },
  {
    src: 'src/assets/imgs/banner2.jpg',
  },
  {
    src: 'src/assets/imgs/banner3.jpg',
  },
]
</script>
