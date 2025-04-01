<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <!-- Cabecera con selector de talleres -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Reportes de Talleres</h2>
      </div>

      <!-- Integración del componente WorkshopSelector -->
      <WorkshopSelector
        :allWorkshops="workshopStore.workshops"
        :userSubscriptions="getUserWorkshopIds()"
        :isAdmin="isUserAdmin"
        @workshop-selected="handleWorkshopSelected"
      />
    </div>

    <!-- Contenido de reportes - Mantiene estructura original -->
    <div class="p-6">
      <div v-if="reportStore.isLoading" class="text-center py-4">Cargando reportes...</div>
      <div v-else-if="reportStore.error" class="text-red-500 p-4">{{ reportStore.error }}</div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div
          v-for="reporte in filteredReports"
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
import { onMounted, ref, computed } from 'vue'
import { useReportStore } from '@/stores/adminReport'
import { useWorkshopStore } from '@/stores/adminWorkshop'
import { useAuthStore } from '@/stores/auth'

const reportStore = useReportStore()
const workshopStore = useWorkshopStore()
const authStore = useAuthStore()

// Estado para el taller seleccionado
const selectedWorkshopId = ref<string | number>('all')

// Determinar si el usuario es administrador
const isUserAdmin = computed(() => {
  return authStore.user?.role === 'admin' || authStore.user?.isAdmin || false
})

// Obtener los IDs de los talleres asociados al usuario
const getUserWorkshopIds = () => {
  if (!authStore.user) return []
  if (isUserAdmin.value) {
    return workshopStore.workshops.map(w => w.id_workshop)
  }
  return authStore.user.Workshops?.map(w =>
    typeof w === 'object' ? w.id_workshop : w
  ) || []
}

// Filtrar reportes según el taller seleccionado
const filteredReports = computed(() => {
  if (selectedWorkshopId.value === 'all') {
    return reportStore.reports
  } else {
    return reportStore.reports.filter(report =>
      report.id_workshop_id === selectedWorkshopId.value
    )
  }
})

// Cargar datos al montar el componente - Mantiene la lógica original
onMounted(async () => {
  await reportStore.fetchAllReports()
  if (workshopStore.workshops.length === 0) {
    await workshopStore.fetchWorkshops()
  }
})

// Función para obtener el nombre del tipo de taller - Se mantiene igual
const getWorkshopTypeName = (id_workshop: number) => {
  const workshop = workshopStore.workshops.find((w) => w.id_workshop === id_workshop)
  return workshop ? workshop.title : 'Taller no especificado'
}

// Manejar la selección de taller
const handleWorkshopSelected = (workshopId: string | number) => {
  selectedWorkshopId.value = workshopId
}

// Manejar finalización de reporte - Se mantiene igual
const handleFinalizar = async (id: number) => {
  if (confirm('¿Estás seguro de eliminar este reporte?')) {
    await reportStore.deleteReport(id)
    await reportStore.fetchAllReports()
  }
}
</script>
