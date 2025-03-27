<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div
      class="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200"
    >
      <h2 class="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Tipos de talleres</h2>
    </div>

    <!-- Mensajes de estado -->
    <div v-if="store.error" class="mx-6 p-4 bg-red-100 text-red-700 rounded-lg">
      {{ store.error }}
    </div>
    <div v-if="successMessage" class="mx-6 p-4 bg-green-100 text-green-700 rounded-lg">
      {{ successMessage }}
    </div>

    <div class="p-6">
      <div v-if="store.isLoading && store.types.length === 0" class="text-center py-8">
        Cargando tipos de taller...
      </div>
      <div v-else-if="store.types.length === 0" class="text-center py-8 text-gray-500">
        No hay tipos de taller registrados
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="tipo in store.types"
          :key="tipo.id_type"
          class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-5 sm:p-6">
            <!-- Icono y Nombre -->
            <div class="flex flex-col items-center text-center">
              <div
                class="mb-4 w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center"
              >
                <svg
                  class="w-10 h-10 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 14.25M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.984 24.984 0 016.518 3.458M9.75 3.104v5.714c0 .597.237 1.17.659 1.591L14.25 14.25M4.5 14.25l5.159-5.159a2.25 2.25 0 011.591-.659h5.714m-9.036 9.036l5.159-5.159M19.5 14.25l-5.159 5.159a2.25 2.25 0 01-1.591.659H6.636"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ tipo.type_name }}</h3>
            </div>

            <!-- Acciones -->
            <div class="flex justify-center gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                @click="eliminarTipo(tipo.id_type)"
                :disabled="store.isLoading"
                class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-2 disabled:bg-gray-100 disabled:text-gray-400"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'

const store = useWorkshopTypeStore()
const successMessage = ref('')

onMounted(async () => {
  await store.fetchAllTypes()
})

const eliminarTipo = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este tipo de taller?')) {
    try {
      await store.deleteType(id)
      successMessage.value = 'Tipo de taller eliminado correctamente'
      setTimeout(() => successMessage.value = '', 3000)
    } catch {
      // El error ya está manejado en el store
    }
  }
}
</script>
