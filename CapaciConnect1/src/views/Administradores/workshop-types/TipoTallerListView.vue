<template>
  <div class="bg-[#F2F5FA] rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="flex flex-col sm:flex-row items-center justify-between p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Lista de categorías</h2>
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
        Cargando categorías...
      </div>
      <div v-else-if="store.types.length === 0" class="text-center py-8 text-gray-500">
        No hay categorías registradas
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="tipo in store.types"
          :key="tipo.id_type"
          class="bg-white shadow-lg rounded-lg"
        >
          <div class="p-5 sm:p-6">
            <!-- Icono y Nombre -->
            <div class="flex flex-col items-center text-center">
              <div class="mb-4 w-20 h-20 flex items-center justify-center">
                <img src="@/assets/imgs/capacityLogo.png"/>
              </div>
              <h3 class="text-[#212122]">{{ tipo.type_name }}</h3>
            </div>

            <!-- Acciones -->
            <div class="flex justify-center gap-3 mt-6 pt-4 border-t border-[#F2F5FA]">
              <!-- <button
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
              </button> -->

              <BaseButton
                variant="red"
                @click="eliminarTipo(tipo.id_type)"
                :disabled="store.isLoading"
                >Eliminar</BaseButton
              >
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
import BaseButton from '@/components/common/BaseButton.vue'
import Swal from 'sweetalert2'

const store = useWorkshopTypeStore()
const successMessage = ref('')

onMounted(async () => {
  await store.fetchAllTypes()
})

// const eliminarTipo = async (id: number) => {
//   if (confirm('¿Estás seguro de que deseas eliminar este tipo de taller?')) {
//     try {
//       await store.deleteType(id)
//       successMessage.value = 'Tipo de taller eliminado correctamente'
//       setTimeout(() => (successMessage.value = ''), 3000)
//     } catch {
//       // El error ya está manejado en el store
//     }
//   }
// }

const eliminarTipo = async (id: number) => {
  const confirm = await Swal.fire({
    title: '¿Quieres eliminar esta categoría?',
    text: 'Esta acción es irreversible',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#BCCCDC',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#059669',
    confirmButtonText: 'Confirmar',
    backdrop: 'rgba(4, 2, 115, 0.7)',
  })

  if (confirm.isConfirmed) {
    try {
      await store.deleteType(id)
      Swal.fire({
        title: 'Categoría eliminada',
        text: 'La categoría ha sido eliminada correctamente',
        icon: 'success',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
      // setTimeout(() => (successMessage.value = ''), 3000)
    } catch {
      // El error ya está manejado en el store
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la categoría',
        icon: 'error',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
    }
  }
}
</script>
