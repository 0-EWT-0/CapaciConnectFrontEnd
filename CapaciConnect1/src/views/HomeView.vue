<template>
        <Navbar/>
    <main class="p-10">
      <Carousel :value="images" :numVisible="1" :numScroll="1" :circular="true" :autoplayInterval="3000">
        <template #item="slotProps">
          <div class="relative text-center p-10">
            <img :src="slotProps.data.src" :alt="slotProps.data.alt" class="w-[20rem] h-[20rem] justify-center items-center rounded-lg shadow-lg">
            <div class="flex justify-center items-center absolute bottom-5 left-5 bg-black bg-opacity-50 text-white p-3 rounded-lg">
              <h3 class="text-lg font-bold">{{ slotProps.data.title }}</h3>
              <p class="text-sm">{{ slotProps.data.description }}</p>
            </div>
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

      <div class="flex flex-col items-center m-10">
        <h1 class="text-black text-2xl font-bold mb-6 text-center">Talleres destacados</h1>

        <!-- Contenedor de tarjetas en formato grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div class="flex flex-col justify-between h-[15rem] w-[20rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md">
            <div class="bg-gray-300 text-center p-17 rounded-t-lg">Ilustración</div>
            <div class="p-4">
              <p class="text-lg">Nombre del Taller</p>
              <p class="text-sm text-gray-600">Instructor</p>
            </div>
          </div>

          <div class="flex flex-col justify-between h-[15rem] w-[20rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md">
            <div class="bg-gray-300 text-center p-17 rounded-t-lg">Ilustración</div>
            <div class="p-4">
              <p class="text-lg">Nombre del Taller</p>
              <p class="text-sm text-gray-600">Instructor</p>
            </div>
          </div>

          <div class="flex flex-col justify-between h-[15rem] w-[20rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md">
            <div class="bg-gray-300 text-center p-17 rounded-t-lg">Ilustración</div>
            <div class="p-4">
              <p class="text-lg">Nombre del Taller</p>
              <p class="text-sm text-gray-600">Instructor</p>
            </div>
          </div>

          <div class="flex flex-col justify-between h-[15rem] w-[20rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md">
            <div class="bg-gray-300 text-center p-17 rounded-t-lg">Ilustración</div>
            <div class="p-4">
              <p class="text-lg">Nombre del Taller</p>
              <p class="text-sm text-gray-600">Instructor</p>
            </div>
          </div>

          <div class="flex flex-col justify-between h-[15rem] w-[20rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md">
            <div class="bg-gray-300 text-center p-17 rounded-t-lg">Ilustración</div>
            <div class="p-4">
              <p class="text-lg">Nombre del Taller</p>
              <p class="text-sm text-gray-600">Instructor</p>
            </div>
          </div>

          <RouterLink to="/talleres">
            <button class="bg-gray-600 text-white px-8 py-4 rounded-md hover:bg-gray-700 transition m-10">
              Ver mas
            </button>
          </RouterLink>
        </div>
      </div>

      <div class="flex flex-col items-center m-10">
        <h1 class="text-black text-2xl font-bold mb-6 text-center">Temas</h1>

        <!-- Contenedor de tarjetas en formato grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-10 py-10">

          <div class="flex flex-col justify-between h-[8rem] w-[14rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md m-4">
            <div class="text-center p-12">tema</div>
          </div>

          <div class="flex flex-col justify-between h-[8rem] w-[14rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md m-4">
            <div class="text-center p-12">tema</div>
          </div>

          <div class="flex flex-col justify-between h-[8rem] w-[14rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md m-4">
            <div class="text-center p-12">tema</div>
          </div>

          <div class="flex flex-col justify-between h-[8rem] w-[14rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md m-4">
            <div class="text-center p-12">tema</div>
          </div>

          <div class="flex flex-col justify-between h-[8rem] w-[14rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md m-4">
            <div class="text-center p-12">tema</div>
          </div>

          <button class="bg-gray-600 text-white px-8 py-4 rounded-md hover:bg-gray-700 transition m-10">
              Ver mas
            </button>
        </div>
      </div>

    <Footer/>
    </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Footer from '@/components/global/Footer.vue';
import Navbar from '@/components/global/Navbar.vue';
import Carousel from 'primevue/carousel';

//DATOS PRETERMINADO
const images = [
{ src: 'https://imgs.search.brave.com/StHMYfoGPw7_H4IYi7bvMOksuzhx6Ep9_qpq0cup9iE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb25j/ZXB0by5kZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNS8wMy9u/YXR1cmFsZXphLW1l/ZGlvLWFtYmllbnRl/LWUxNTA1NDA3MDkz/NTMxLmpwZWc', alt: 'Naturaleza', title: 'Naturaleza', description: 'Disfruta de la serenidad de la naturaleza.' },
  { src: 'https://imgs.search.brave.com/1fwxmvz9BVGu2yQtBK9wCEmyku0jKEz3FUdsRZzsLZc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWV4aWNvZGVzY29u/b2NpZG8uY29tLm14/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEw/LzA1L2NpdWRhZC1k/ZS1tZXhpY28tYW5n/ZWwtaW5kZXBlbmRl/bmNpYS1kZXBvc2l0/cGhvdG9zLmpwZw', alt: 'Ciudad', title: 'Ciudad', description: 'Explora las luces y sombras de las ciudades.' },
  { src: 'https://imgs.search.brave.com/g_Nd3jCJ5ofrHIgjuhUYp2ordkrPdBMZiIxh39R0jxE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb25j/ZXB0by5kZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNC8wOC90/ZWNub2xvZ2lhLWUx/NTUxMzg2NzI2NDM1/LmpwZw', description: 'El futuro está aquí, con tecnología avanzada.' }
];

</script>
