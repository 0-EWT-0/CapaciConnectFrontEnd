<template>
  <Navbar />
  <main class="p-10 min-h-screen">
    <div class="max-w-[90rem] mx-auto p-10">
      <h2 class="mb-6 text-[#212122]">Talleres en curso</h2>
      <Loading v-if="loadingStore.isLoading" />

      <div v-else>
        <div class="mb-6">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar talleres..."
            class="text-[#212122] w-full p-3 bg-[#F2F5FA] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <div
            v-for="progress in filteredProgressions"
            :key="progress.id_progression"
            class="bg-white h-auto rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 relative"
          >
            <router-link
              :to="{ name: 'contenidoTalleres', params: { id_workshop: progress.id_workshop_id } }"
            >
              <h3 class="bg-[#DC2626] p-2 rounded-t-lg text-center w-full absolute">
                Cierra el {{ progress.dateEnd }}
              </h3>

              <div class="h-2/3">
                <img
                  :src="'data:image/jpeg;base64,' + progress.workshopImage"
                  alt="Imagen"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="h-1/3 p-4">
                <h3 class="text-[#212122]">{{ progress.workshopTitle }}</h3>
                <p class="text-[#212122]">{{ progress.workshopDescription }}</p>
                <h3 class="text-[#2563EB]">{{ getTypeName(progress.workshopType) }}</h3>

                <!-- <div class="bg-gray-200 h-6 rounded-full mt-4 flex items-center">
                <div
                  class="bg-green-500 text-white text-xs font-bold text-center px-2 rounded-full"
                >
                  Progreso: {{ progress.progression_status }}%
                </div>
              </div> -->
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Footer from '@/components/global/Footer.vue'
// import Select from 'primevue/select'
import { ref, onMounted, computed } from 'vue'
import { useWorkshopStore } from '@/stores/userStore'
import { useLoadingStore } from '@/stores/loadingStore'
import Navbar from '@/components/global/Navbar.vue'
import Loading from '@/components/common/Loading.vue'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'

const store = useWorkshopTypeStore()

const getTypeName = (id_type_id: number) => {
  const type = store.types.find((tipo) => tipo.id_type === id_type_id)
  return type ? type.type_name : 'Tipo desconocido'
}

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

const searchQuery = ref('')
const workshopStore = useWorkshopStore()
const loadingStore = useLoadingStore()
const progressions = ref([])
const calendars = ref([])

const progressionWhithWorkshop = computed(() => {
  return progressions.value.map((progress) => {
    const relateWorkshop = workshopStore.workshops.find(
      (workshop) => workshop.id_workshop === progress.id_workshop_id,
    )
    const relatedCalendar = calendars.value.find(
      (calendar) => calendar.id_workshop_id === progress.id_workshop_id,
    )
    return {
      ...progress,
      workshopTitle: relateWorkshop ? relateWorkshop.title : 'Taller no encontrado',
      workshopType: relateWorkshop ? relateWorkshop.id_type_id : 'Categoria no encontrada',
      workshopDescription: relateWorkshop
        ? relateWorkshop.description
        : 'Descripcion no encontrada',
      workshopImage: relateWorkshop ? relateWorkshop.image : 'Imagen no encontrada',
      dateEnd: relatedCalendar?.date_end
        ? formatDate(relatedCalendar.date_end)
        : 'Sin fecha de cierra',
    }
  })
})

onMounted(async () => {
  await store.fetchAllTypes()

  try {
    loadingStore.startLoading()
    const response = await workshopStore.fetchProgression()
    progressions.value = response

    if (workshopStore.workshops.length === 0) {
      await workshopStore.fetchWorkshops()
    }
    const calendarsResponse = await Promise.all(
      progressions.value.map((process) =>
        workshopStore.fetchCalendarsByWorkshopId(process.id_workshop_id),
      ),
    )

    calendars.value = calendarsResponse.flat()
  } catch (error) {
    console.log('Error al cargar progreso:', error)
  } finally {
    loadingStore.stopLoading()
  }
})

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

const filteredProgressions = computed(() => {
  return progressionWhithWorkshop.value.filter((progress) =>
    progress.workshopTitle.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>
