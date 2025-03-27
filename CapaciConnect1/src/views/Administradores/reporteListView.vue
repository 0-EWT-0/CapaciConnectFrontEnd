<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <!-- Cabecera mantenida igual -->
    <div class="p-6">
      <div v-if="reportStore.isLoading" class="text-center py-4">Cargando reportes...</div>
      <div v-else-if="reportStore.error" class="text-red-500 p-4">{{ reportStore.error }}</div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div
          v-for="reporte in reportStore.reports"
          :key="reporte.id_Report"
          class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-5 sm:p-6">
            <!-- Mantener misma estructura de template -->
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ reporte.tittle }}
            </h3>
            <p class="mt-1 text-sm text-gray-600 line-clamp-2">
              {{ reporte.content }}
            </p>

            <!-- Detalles actualizados con datos reales -->
            <div class="mt-4 space-y-2">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <!-- Icono mantenido -->
                <span class="font-medium">Taller:</span>
                <span class="truncate">{{ getWorkshopTypeName(reporte.id_workshop_id) }}</span>
              </div>


              <div class="flex items-center gap-2 text-sm text-gray-500">
                <!-- Icono mantenido -->
                <span>{{ reporte.created_at }}</span>
              </div>
            </div>

            <!-- Botón de acción actualizado -->
            <div class="mt-6 pt-4 border-t border-gray-100">
              <button
                @click="handleFinalizar(reporte.id_Report)"
                class="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#1a2e4c] rounded-lg hover:bg-[#15243d] transition-colors"
              >
                Marcar como finalizado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useReportStore } from '@/stores/adminReport'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'

const reportStore = useReportStore()
const workshopTypeStore = useWorkshopTypeStore()

onMounted(async () => {
  await reportStore.fetchAllReports()
  if (workshopTypeStore.types.length === 0) {
    await workshopTypeStore.fetchAllTypes()
  }
})

// Función para obtener el nombre del tipo de taller
const getWorkshopTypeName = (id_type: number) => {
  const type = workshopTypeStore.types.find(t => t.id_type === id_type)
  return type ? type.type_name : 'Tipo no especificado'
}
const handleFinalizar = async (id: number) => {
  if (confirm('¿Estás seguro de eliminar este reporte?')) {
    await reportStore.deleteReport(id)
    await reportStore.fetchAllReports()
  }
}
</script>
