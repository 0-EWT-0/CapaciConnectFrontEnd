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
        v-model="searchQuery"
        placeholder="Buscar talleres..."
        class="text-black w-full p-3 bg-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Filtros -->
    <!-- <div class="flex gap-4 mb-6">
      <button class="w-1/2 bg-gray-200 p-3 text-lg font-semibold rounded-lg shadow-md text-black">
        Filtrar por tipos
      </button>
      <button class="w-1/2 bg-gray-200 p-3 text-lg font-semibold rounded-lg shadow-md text-black">
        Filtrar por fecha
      </button>
    </div> -->

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
       <Loading v-if="loadingStore.isLoading"/>
       <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="progress in filteredProgressions"
          :key="progress.id_progression"
          class="bg-white rounded-lg shadow-lg"
        >
          <div class="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-t-lg">
            Cierra el {{ progress.dateEnd }}
          </div>

          <img
            :src="'data:image/jpeg;base64,' + progress.workshopImage"
            alt="Imagen del taller"
            class="w-full h-40 object-cover"
          />

          <div class="p-4">
            <!-- <h2 class="text-lg text-black font-bold">Title</h2>
            <p class="text-gray-600 text-sm">Descripcion</p> -->

            <h3 class="text-blue-600 font-semibold mt-2">{{ progress.workshopTitle }}</h3>
            <!-- <RouterLink :to="'/panel-Taller/' + progress.id_workshop_id">
              <button class="bg-blue-700 rounded-lg shadow-lg font-bold m-2 h-12 w-40 text-sm">
                Ver Contenido
              </button>
            </RouterLink> -->
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
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Footer from '@/components/global/Footer.vue'
// import Select from 'primevue/select'
import { ref, onMounted, computed } from 'vue'
import { useWorkshopStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loadingStore'
import Navbar from '@/components/global/Navbar.vue'
import Loading from '@/components/common/Loading.vue'

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

const searchQuery = ref("");
const workshopStore = useWorkshopStore()
const loadingStore = useLoadingStore()
const progressions = ref([])
const calendars = ref([])

const progressionWhithWorkshop = computed(() => {
  return progressions.value.map((progress) => {
    const relateWorkshop = workshopStore.workshops.find(
    (workshop) => workshop.id_workshop === progress.id_workshop_id
    )
    const relatedCalendar = calendars.value.find(
      (calendar) => calendar.id_workshop_id === progress.id_workshop_id
    )
    return {
      ...progress,
      workshopTitle: relateWorkshop ? relateWorkshop.title : 'Taller no encontrado',
      workshopImage: relateWorkshop ? relateWorkshop.image : 'Imagen no encontrado',
      dateEnd: relatedCalendar?.date_end ? formatDate(relatedCalendar.date_end) : 'Sin fecha de cierra'
    }
  })
})

onMounted(async () => {
  try {
    loadingStore.startLoading();
    const progressionResponse  = await workshopStore.fetchProgression()
    progressions.value = progressionResponse 

    if(workshopStore.workshops.length === 0) {
      await workshopStore.fetchWorkshops()
    }
    const calendarsResponse = await Promise.all(
      progressions.value.map((process) =>
      workshopStore.fetchCalendarsByWorkshopId(process.id_workshop_id)
     )
    )

    calendars.value = calendarsResponse.flat()
    
    console.log('Progreso con talleres', progressionWhithWorkshop.value)
  } catch (error) {
    console.log('Error al cargar progreso:', error)
  } finally {
    loadingStore.stopLoading();
  }
})

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

const filteredProgressions = computed(() => {
  return progressionWhithWorkshop.value.filter((progress) =>
    progress.workshopTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
