<template>
  <Navbar />

  <!-- Video -->
  <Card class="mb-6">
    <template #content>
      <div class="flex justify-center">
        <video controls class="w-[90rem] max-w-8xl rounded-lg shadow-lg m-3">
          <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
    </template>
  </Card>

  <!-- Título y progreso -->
  <div class="mx-auto max-w-7xl p-8 font-bold bg-white shadow-2xl rounded-2xl text-center">
    <h1 class="text-2xl md:text-3xl text-gray-800 mb-4">{{ workshop.title }}</h1>
    <div class="p-6">
      <!-- Checkbox para completar -->
      <div class="flex items-center gap-4 mb-6">
        <input
          type="checkbox"
          id="completion"
          v-model="isCompleted"
          @change="updateCompletion"
          class="h-6 w-6 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
        />
        <label for="completion" class="text-lg text-gray-800 font-semibold"
          >¿Completar progreso?</label
        >
      </div>

      <!-- Indicador de progreso -->
      <div
        class="bg-green-500 text-white text-xl md:text-2xl font-semibold text-center px-8 py-4 rounded-full shadow-lg w-4/4 mx-auto"
      >
        ✅ {{ progressPercentage }}% Completado
      </div>
    </div>
  </div>

  <!-- Contenido del Taller -->
  <div class="flex justify-center items-center">
    <div class="mt-8 bg-white m-10 p-10 rounded-xl shadow-xl w-[80rem]">
      <h2 class="text-2xl font-bold text-gray-800">Contenido del taller</h2>
      <span class="text-black">{{ workshop.content }}</span>
      <!-- <div v-for="(clase, index) in clases" :key="index" class="border-b py-3">
        <button
          @click="toggleClase(index)"
          class="flex justify-between items-center w-full text-left text-lg font-medium"
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
      </div> -->
    </div>
  </div>

  <!-- Botones de Acción -->
  <div class="flex justify-center gap-6 my-8">
    <RouterLink to="/MisTalleres">
      <button
        class="px-15 py-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        ⬅ Regresar
      </button>
    </RouterLink>
    <button
      class="px-15 py-6 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
    >
      🚪 Abandonar
    </button>
    <RouterLink to="/Reportar">
      <button
        class="px-15 py-6 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-700 transition"
      >
        ⚠ Reportar
      </button>
    </RouterLink>
  </div>

  <Footer />
</template>

<script setup>
import Footer from '@/components/global/Footer.vue'
import Header from '@/components/global/Header.vue'
import Navbar from '@/components/global/Navbar.vue'
import { useWorkshopStore } from '@/stores/user'

import { Card } from 'primevue'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const isCompleted = ref(false)
const progressPercentage = ref(0)
const route = useRoute()

const id_workshop = Number(route.params.id_workshop_id)
const workshopStore = useWorkshopStore()

const workshop = computed(() => {
  return (
    workshopStore.workshops.find((w) => w.id_workshop === id_workshop) || {
      title: 'No encontrado',
      description: 'No se encontró el taller.',
      content: '',
      image: '',
    }
  )
})

onMounted(async () => {
  try {
    if (workshopStore.workshops.length === 0) {
      await workshopStore.fetchWorkshops()
    }
    console.log('Datos del Taller:', workshop.value)
  } catch (error) {
    console.error('Error al cargar datos del taller:', error)
  }
})

const updateCompletion = () => {
  progressPercentage.value = isCompleted.value ? 100 : 0
}

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
