<template>
  <Navbar />
  <main class="p-10 min-h-screen">
    <div class="max-w-[90rem] mx-auto p-10">
      <h2 class="mb-6 text-[#212122]">Todos nuestros talleres</h2>
      <Loading v-if="loadingStore.isLoading" />

      <div v-else>
        <!-- Buscador -->
        <div class="mb-6">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar talleres..."
            class="text-[#212122] w-full p-3 bg-[#F2F5FA] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
          />
        </div>

        <div
          v-if="filteredWorkshops && filteredWorkshops.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="workshop in filteredWorkshops"
            :key="workshop.id_workshop"
            class="bg-white h-auto rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <router-link
              :to="{ name: 'contenidoTalleres', params: { id_workshop: workshop.id_workshop } }"
            >
              <div class="h-2/3">
                <img
                  :src="'data:image/jpeg;base64,' + workshop.image"
                  alt="Imagen"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="h-1/3 p-4">
                <h3 class="text-[#212122]">{{ workshop.title }}</h3>
                <p class="text-[#212122]">{{ workshop.description }}</p>
                <h3 class="text-[#2563EB]">{{ getTypeName(workshop.id_type_id) }}</h3>
              </div>
            </router-link>
          </div>
        </div>
        <h3 v-else class="text-gray-500">No hay talleres disponibles</h3>
      </div>
    </div>
  </main>

  <Footer />
</template>

<script setup>
import Loading from '@/components/common/Loading.vue'
import Footer from '@/components/global/Footer.vue'
import Navbar from '@/components/global/Navbar.vue'
import { useLoadingStore } from '@/stores/loadingStore'

import { useWorkshopStore } from '@/stores/userStore'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'
import { onMounted, computed, ref } from 'vue'

const loadingStore = useLoadingStore()

const workshopStore = useWorkshopStore()
const searchQuery = ref('')

const store = useWorkshopTypeStore()

const getTypeName = (id_type_id) => {
  const type = store.types.find((tipo) => tipo.id_type === id_type_id)
  return type ? type.type_name : 'Tipo desconocido'
}

onMounted(async () => {
  await workshopStore.fetchWorkshops()
  await store.fetchAllTypes()
})

const filteredWorkshops = computed(() => {
  if (!searchQuery.value) {
    return workshopStore.workshops
  }

  return workshopStore.workshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>
