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
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div
          v-for="index in 3"
          :key="index"
          class="bg-white rounded-lg m-10 shadow-lg overflow-hidden"
        >
          <img src="../assets/logo.svg" alt="Taller de arte" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h2 class="text-lg text-black font-bold p-2">Título del taller</h2>
            <p class="text-gray-600 p-3">Descripción del taller de manera resumida</p>
            <a href="/contenidoTalleres" class="text-blue-600 font-semibold mt-2 block p-4"
              >Tipo de taller</a
            >
          </div>
        </div>
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-10">
        <!-- Tarjeta 1 -->
        <div
          v-for="index in 6"
          :key="index"
          class="flex justify-center items-center h-[5rem] w-[20rem] bg-[#33415C] text-white font-bold text-xl rounded-lg shadow-md"
        >
          <p class="text-center">Tema 1</p>
        </div>
      </div>

      <!-- Botón -->
      <button class="bg-white text-[#2563EB] px-10 py-6 rounded-md mt-10 border border-[#2563EB]">
        Mostrar Más
      </button>
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

const images = [
  {
    src: 'https://imgs.search.brave.com/StHMYfoGPw7_H4IYi7bvMOksuzhx6Ep9_qpq0cup9iE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb25j/ZXB0by5kZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNS8wMy9u/YXR1cmFsZXphLW1l/ZGlvLWFtYmllbnRl/LWUxNTA1NDA3MDkz/NTMxLmpwZWc',
  },
  {
    src: 'https://imgs.search.brave.com/1fwxmvz9BVGu2yQtBK9wCEmyku0jKEz3FUdsRZzsLZc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWV4aWNvZGVzY29u/b2NpZG8uY29tLm14/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEw/LzA1L2NpdWRhZC1k/ZS1tZXhpY28tYW5n/ZWwtaW5kZXBlbmRl/bmNpYS1kZXBvc2l0/cGhvdG9zLmpwZw',
  },
  {
    src: 'https://imgs.search.brave.com/g_Nd3jCJ5ofrHIgjuhUYp2ordkrPdBMZiIxh39R0jxE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb25j/ZXB0by5kZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNC8wOC90/ZWNub2xvZ2lhLWUx/NTUxMzg2NzI2NDM1/LmpwZw',
  },
]
</script>
