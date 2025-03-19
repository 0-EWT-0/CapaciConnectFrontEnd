<template>
    <Header />
    <div class="p-8 bg-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Reproductor de video -->
        <div class="col-span-2">
          <div class="bg-black text-white flex items-center justify-center h-[27rem] rounded">
            <p>Reproductor de Video</p>
          </div>
          <div class="mt-4">
            <button class="p-2 bg-blue-500 text-white rounded">Descripción</button>
            <button class="p-2 bg-gray-300 text-black rounded ml-2">Reseñas</button>
          </div>
        </div>
  
        <!-- Contenido del taller -->
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-xl text-white font-semibold mb-4 bg-blue-500 p-2 rounded-lg">Contenido del taller</h3>
          <div v-for="(clase, index) in clases" :key="index" class="border-b py-3">
            <button @click="toggleClase(index)" class="flex justify-between items-center w-full text-left text-lg font-medium">
                <span>{{ clase.titulo }}</span>
                <span>{{ activeIndex === index ? '▲' : '▼' }}</span>
            </button>
            <ul v-if="activeIndex === index" class="pl-6 mt-2">
                <li v-for="(recurso, i) in clase.recursos" :key="i" class="flex justify-between items-center">
                    <span>{{ recurso }}</span>
                    <span>📁</span>
                </li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Secciones de comentarios -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-xl font-semibold mb-4">¿Qué te pareció el taller?</h3>
          <textarea class="w-full border-gray-300 border rounded p-2" rows="4" placeholder="Escribe tu comentario aquí..."></textarea>
          <button class="mt-2 p-2 bg-blue-500 text-white rounded">Enviar</button>

          <div class="mt-4">
            <h4 class="font-semibold mb-2">Comentarios:</h4>
            <ul class="space-y-4">
                
                <li class="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
                <img src="../assets/logo.svg" class="w-10 h-10 rounded-full" alt="Juan">
                <div>
                    <p class="text-gray-700"><strong>Juan:</strong> "Me encantó el contenido, fue muy útil."</p>
                </div>
                </li>

            </ul>
    </div>

     </div>
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-xl font-semibold mb-4">Nombre del instructor</h3>
          <textarea class="w-full border-gray-300 border rounded p-2" rows="4" placeholder="Escribe tu comentario aquí..."></textarea>
          <button class="mt-2 p-2 bg-blue-500 text-white rounded">Enviar</button>

          <div class="mt-4">
            <h4 class="font-semibold mb-2">Comentarios:</h4>
            <ul class="space-y-4">
                
                <li class="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
                <img src="../assets/logo.svg" class="w-10 h-10 rounded-full" alt="María">
                <div>
                    <p class="text-gray-700"><strong>María:</strong> "El instructor explicó todo con claridad."</p>
                </div>
                </li>

            </ul>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/global/Header.vue';

  import { ref } from 'vue';
  
  const activeIndex = ref(null);
  
  const toggleClase = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
  };
  
  const clases = ref([
    { titulo: "Bienvenida al taller", recursos: ["Bienvenida.mp4"] },
    { titulo: "Clase 1", recursos: ["Recursos.mp4", "Recursos.mp4", "Recursos.mp4"] },
    { titulo: "Clase 2", recursos: ["Recursos.mp4", "Archivos.pdf"] },
    { titulo: "Clase 3", recursos: [] },
  ]);
  </script>
  