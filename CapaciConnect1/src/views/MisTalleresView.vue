<template>
  <Navbar />
  <div class="max-w-[90rem] mx-auto p-10 min-h-screen">
    <!-- Contenedor flex para alinear título y buscador -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-black text-3xl font-bold">Talleres en curso</h1>
    </div>
    <div class="mb-6">
      <input
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

    <!-- Controles de filtros -->
    <div class="flex justify-between items-center mb-6 rounded-lg mx-10">
      <!-- <div class="flex gap-4">
        <label class="text-lg font-semibold">Ordenar por:</label>
        <Select
          v-model="selectedOrder"
          :options="order"
          optionLabel="name"
          placeholder="Ordenado por:"
          class="border border-gray-300 rounded p-2"
        />
      </div> -->

      <!-- Grid de talleres -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="progress in progressions"
          :key="progress.id_progression"
          class="bg-white rounded-lg shadow-lg"
        >
          <div class="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-t-lg">
            Cierra el 01 de Febrero
          </div>

          <img
            src="../assets/imgs/capacityLogo.png"
            alt="Imagen del taller"
            class="w-full h-40 object-cover"
          />

          <div class="p-4">
            <!-- <h2 class="text-lg text-black font-bold">Title</h2>
            <p class="text-gray-600 text-sm">Descripcion</p> -->

            <p class="text-blue-600 font-semibold mt-2">{{ progress.id_workshop_id }}</p>
            <RouterLink to="/panel-Taller">
              <button class="bg-blue-700 rounded-lg shadow-lg font-bold m-2 h-12 w-40 text-sm">
                Ver Contenido
              </button>
            </RouterLink>
            <div class="bg-gray-200 h-6 rounded-full mt-4 flex items-center">
              <div class="bg-green-500 text-white text-xs font-bold text-center px-2 rounded-full">
                Progreso: {{ progress.progression_status }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '@/components/global/Footer.vue'
// import Select from 'primevue/select'
import { ref, onMounted } from 'vue'
import { useWorkshopStore } from '@/stores/user'
import Navbar from '@/components/global/Navbar.vue'

// const selectedOrder = ref()
// const order = ref([
//   { name: 'Título A-Z' },
//   { name: 'Título Z-A' },
//   { name: 'Inscrito recientemente' },
// ])

// const selectedCursos = ref()
// const cursos = ref([
//   { name: 'Categoría 1', teacher: 'Instructor 1' },
//   { name: 'Categoría 2', teacher: 'Instructor 2' },
//   { name: 'Categoría 3', teacher: 'Instructor 3' },
// ])

const workshopStore = useWorkshopStore()
const progressions = ref([])

onMounted(async () => {
  try {
    const response = await workshopStore.fetchProgression()
    progressions.value = response
  } catch (error) {
    console.log('Error al cargar progreso:', error)
  }
})
</script>
