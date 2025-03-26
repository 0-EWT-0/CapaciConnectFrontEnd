<template>
  <Header />
  <div class="bg-gray-100  p-8">
    <!-- Barra superior -->
    <div class="text-white flex flex-col justify-between p-2">
      <span class="bg-green-500 p-2 mb-2 rounded-lg h-10 w-[20rem] text-center"
        >Inicio el 01 Enero 2023</span
      >
      <span class="bg-red-500 p-2 rounded-lg h-10 w-[20rem] text-center"
        >Cierre el 01 Enero 2025</span
      >
    </div>

    <!-- Imagen principal y título -->
    <div class="text-center mt-4">
      <img src="../assets/logo.svg" alt="Pinceles" class="mx-auto w-96" />
      <h1 class="text-4xl font-bold mt-4 text-black">Taller de Programación con Python</h1>
      <p class="text-gray-700 mt-2">
        Aprenda a programar y analizar datos con Python. Desarrolle programas para recopilar,
        limpiar, analizar y visualizar datos.
      </p>
    </div>

    <!-- Información del instructor -->
    <div class="mt-4 text-gray-600">
      <p>Instructor: <span class="text-[#2563EB]">Juan Carlos</span></p>
      <p>Fecha de creación: <span class="text-[#2563EB]">01 Enero 2025</span></p>
    </div>

    <!-- Botón de inscripción -->
    <div class="mt-6 text-center flex justify-between mx-10">
      <button class="bg-blue-500 text-white py-5 px-15 rounded-lg hover:bg-blue-600 text-xl">
        Inscribirse
      </button>
    </div>

    <!-- Contenido del taller -->
    <div class="mt-8 bg-gray-200 m-10 p-10 rounded-xl">
      <h2 class="text-2xl font-bold text-gray-800">Contenido del taller</h2>
      <div v-for="(clase, index) in clases" :key="index" class="border-b py-3">
        <button
          @click="toggleClase(index)"
          class="flex justify-between text-gray-800 items-center w-full text-left text-lg font-medium"
        >
          <span> {{ clase.titulo }} </span>
          <span> {{ activeIndex === index ? '▲' : '▼' }} </span>
        </button>
        <ul v-if="activeIndex === index" class="pl-6 mt-2">
          <li
            v-for="(recurso, i) in clase.recursos"
            :key="i"
            class="flex justify-between items-center"
          >
            <span>{{ recurso }}</span>
            <span>📁</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sección de comentarios -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-gray-800">Comentarios</h2>

      <div class="mt-4 flex ">
        <img
        src="../assets/logo.svg"
        class="h-15 w-15 rounded-full m-20 flex items-center justify-center text-xl mt-2"
      />
        <textarea
          class="w-full p-2  text-gray-500 shadow-md bg-white rounded"
          placeholder="Escriba su comentario aquí..."
        ></textarea>
        <div class="mt-2 flex gap-2">
          <button class="bg-gray-300  text-gray-800 py-1 px-4 rounded-lg hover:bg-gray-400">
            Cancelar
          </button>
          <button class="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600">
            Comentar
          </button>
        </div>
      </div>

      <!-- Comentarios de ejemplo -->
      <div class="mt-5">
        <div class="bg-white shadow-md text-black rounded-md p-5 flex justify-between items-center">
          <img
            src="../assets/logo.svg"
            class="h-15 w-15 rounded-full flex items-center justify-center mt-2"
          />
          <span
            >Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit
            amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit
            amet...</span
          >
          <div class="flex gap-2">
            <button class="bg-red-500 text-white p-5 m-5 rounded-xl">Editar</button>
            <button class="text-red-500 hover:text-red-800">Eliminar</button>
          </div>
        </div>
        <div class="bg-white shadow-md text-black rounded-md  p-5 flex justify-between items-center mt-2">
          <img
            src="../assets/logo.svg"
            class="h-15 w-15 rounded-full flex items-center justify-center mt-2"
          />
          <span
            >Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit
            amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit
            amet...</span
          >
          <div class="flex gap-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/global/Header.vue'
import { ref } from 'vue'

const activeIndex = ref(null)

const toggleClase = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const clases = ref([
  { titulo: 'Bienvenida al taller', recursos: ['Bienvenida.mp4'] },
  { titulo: 'Clase 1', recursos: ['Recursos.mp4', 'Recursos.mp4', 'Recursos.mp4'] },
  { titulo: 'Clase 2', recursos: [] },
  { titulo: 'Clase 3', recursos: [] },
])
</script>
