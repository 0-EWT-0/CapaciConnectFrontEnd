<template>
  <Navbar />
  <main class="p-10">
    <div class="max-w-[90rem] mx-auto p-10">
      <!-- Título -->
      <h2 class="text-3xl font-bold mb-6 text-black">Todos nuestros talleres</h2>

      <!-- Buscador -->
      <div class="mb-6">
        <input
        v-model="searchQuery"
          type="text"
          placeholder="Buscar talleres..."
          class="text-black w-full p-3 bg-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Filtros -->
      <div class="flex gap-4 mb-6">
        <button class="w-1/2 bg-gray-200 p-3 text-lg font-semibold rounded-lg shadow-md text-black">
          Filtrar por tipos
        </button>
        <button class="w-1/2 bg-gray-200 p-3 text-lg font-semibold rounded-lg shadow-md text-black">
          Filtrar por fecha
        </button>
      </div>

      <!-- Grid de talleres -->
      <div v-if="filteredWorkshops && filteredWorkshops.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div v-for="workshop in filteredWorkshops" :key="workshop.id_workshop" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <img :src=" workshop.image || '../assets/logo.svg'" alt="Taller de arte" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h2 class="text-lg text-black font-bold p-2">{{ workshop.title }}</h2>
            <p class="text-gray-600 p-3">{{ workshop.description }}</p>
            <router-link :to="{ name: 'contenidoTalleres', params: { id_workshop: workshop.id_workshop } }"
            class="text-blue-600 font-semibold mt-2 block p-4"
              >Ver Contenido</
              router-link>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500">No hay workshops disponibles.</p>
    </div>
  </main>

  <Footer />
</template>

<script setup>
import Footer from '@/components/global/Footer.vue'
import Header from '@/components/global/Header.vue'
import Navbar from '@/components/global/Navbar.vue'

import { useWorkshopStore } from '@/stores/user'
import { onMounted, computed, ref } from 'vue'

const workshopStore = useWorkshopStore();
const searchQuery = ref('')

onMounted(async () => {
  await workshopStore.fetchWorkshops();
})

const filteredWorkshops = computed(() => {
  if(!searchQuery.value) {
    return workshopStore.workshops;
  }

  return workshopStore.workshops.filter(
    workshop =>
    workshop.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
