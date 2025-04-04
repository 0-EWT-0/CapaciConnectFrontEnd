<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div
      class="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200"
    >
      <h2 class="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Reportes Pendientes</h2>
    </div>

    <div class="p-6">
      <div v-if="reportStore.isLoading" class="text-center py-4">
        <span class="animate-pulse">Cargando reportes...</span>
      </div>

      <div v-else-if="reportStore.error" class="text-red-500 p-4 text-center">
        ⚠️ {{ reportStore.error }}
      </div>

      <div v-else>
        <div
          v-if="reportStore.reports.length > 0"
          class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          <div
            v-for="reporte in reportStore.reports"
            :key="reporte.id_Report"
            class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div class="p-5 sm:p-6">
              <h3 class="text-lg font-semibold text-gray-900 truncate">
                {{ reporte.tittle }}
              </h3>
              <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                {{ reporte.content }}
              </p>

              <div class="mt-4 space-y-2">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span class="font-medium">Taller:</span>
                  <span class="truncate">{{ getWorkshopTypeName(reporte.id_workshop_id) }}</span>
                </div>

                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    class="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{{ formatDate(reporte.created_at) }}</span>
                </div>
              </div>

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

        <!-- Mensaje cuando no hay reportes -->
        <div v-else class="text-center py-12">
          <div class="max-w-md mx-auto">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 class="mt-2 text-lg font-medium text-gray-900">No hay reportes disponibles</h3>
            <p class="mt-1 text-sm text-gray-500">No se han encontrado reportes pendientes.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useReportStore } from '@/stores/adminReportStore'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'

const reportStore = useReportStore()
const workshopTypeStore = useWorkshopTypeStore()

// Función para formatear fechas
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

onMounted(async () => {
  await reportStore.fetchAllReports()
  if (workshopTypeStore.types.length === 0) {
    await workshopTypeStore.fetchAllTypes()
  }
})

const getWorkshopTypeName = (id_type: number) => {
  const type = workshopTypeStore.types.find((t) => t.id_type === id_type)
  return type ? type.type_name : 'Taller desconocido'
}

const handleFinalizar = async (id: number) => {
  if (confirm('¿Estás seguro de marcar este reporte como finalizado?')) {
    await reportStore.deleteReport(id)
    await reportStore.fetchAllReports()
  }
}
</script>
