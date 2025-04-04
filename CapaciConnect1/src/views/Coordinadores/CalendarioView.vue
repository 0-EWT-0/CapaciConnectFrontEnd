<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useCalendarStore } from '@/stores/calendarStore'
import { useWorkshopStore } from '@/stores/adminWorkshopStore'
import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'
import type { Workshop } from '@/interfaces/Workshop'
import Swal from 'sweetalert2'

const calendarStore = useCalendarStore()
const workshopStore = useWorkshopStore()

// Datos para nuevo calendario
const newCalendar = ref<CalendarDTO>({
  date_start: '',
  date_end: '',
  id_workshop_id: 0,
})

// Estado para edición
const isEditing = ref(false)
const editingActivity = ref<UpdateCalendarDTO & { id_calendar: number; originalData: Calendar | null }>({
  id_calendar: 0,
  date_start: '',
  date_end: '',
  id_workshop_id: 0,
  originalData: null
})

// Cargar datos iniciales
onMounted(async () => {
  try {
    await Promise.all([calendarStore.fetchAllCalendars(), workshopStore.fetchWorkshops()])
    await Swal.fire({
      title: 'Datos cargados',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error: any) {
    console.error('Error al cargar datos:', error)
    await Swal.fire({
      title: 'Error',
      text: 'Error al cargar datos: ' + (error.message || 'Error desconocido'),
      icon: 'error'
    })
  }
})

// Validar fechas
const validateDates = async (start: string, end: string): Promise<boolean> => {
  if (!start || !end) {
    await Swal.fire('Error', 'Ambas fechas son requeridas', 'error');
    return false;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  const now = new Date();

  if (startDate >= endDate) {
    await Swal.fire('Error', 'La fecha de inicio debe ser anterior a la fecha de fin', 'error');
    return false;
  }

  if (startDate < now) {
    await Swal.fire('Error', 'No puedes programar actividades en el pasado', 'error');
    return false;
  }

  return true;
};


// Crear nuevo calendario
const createCalendar = async () => {
  if (!validateDates(newCalendar.value.date_start, newCalendar.value.date_end)) return

  if (!newCalendar.value.id_workshop_id) {
    await Swal.fire('Error', 'Debes seleccionar un taller', 'error')
    return
  }

  try {
    const result = await Swal.fire({
      title: '¿Crear nueva actividad?',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      await calendarStore.createNewCalendar(newCalendar.value)
      newCalendar.value = { date_start: '', date_end: '', id_workshop_id: 0 }
      await Swal.fire('Creado!', 'La actividad se creó correctamente', 'success')
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Error al crear actividad'
    await Swal.fire('Error', errorMessage, 'error')
  }
}

// Editar actividad
const editActivity = (activity: Calendar) => {
  if (!activity?.id_calendar) {
    Swal.fire('Error', 'Actividad sin ID válido', 'error')
    return
  }

  editingActivity.value = {
    id_calendar: activity.id_calendar,
    date_start: activity.date_start.slice(0, 16),
    date_end: activity.date_end.slice(0, 16),
    id_workshop_id: activity.id_workshop_id,
    originalData: activity
  }
  isEditing.value = true
}

// Verificar si hay cambios en la edición
const hasChanges = computed(() => {
  if (!editingActivity.value.originalData) return false

  return (
    editingActivity.value.date_start !== editingActivity.value.originalData.date_start.slice(0, 16) ||
    editingActivity.value.date_end !== editingActivity.value.originalData.date_end.slice(0, 16) ||
    editingActivity.value.id_workshop_id !== editingActivity.value.originalData.id_workshop_id
  )
})

// Eliminar actividad
const deleteActivity = async (activity: Calendar) => {
  if (!activity?.id_calendar) {
    Swal.fire('Error', 'Actividad sin ID válido', 'error')
    return
  }

  const result = await Swal.fire({
    title: '¿Eliminar actividad?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    try {
      await calendarStore.deleteExistingCalendar(activity.id_calendar)
      await Swal.fire('Eliminado!', 'La actividad fue eliminada', 'success')
      await calendarStore.fetchAllCalendars();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al eliminar'
      await Swal.fire('Error', errorMessage, 'error')
    }
  }
}

// Actualizar actividad
const updateActivity = async () => {
  if (!hasChanges.value) {
    await Swal.fire('Info', 'No hay cambios para guardar', 'info')
    isEditing.value = false
    return
  }

  if (!validateDates(editingActivity.value.date_start, editingActivity.value.date_end)) return

  try {
    const result = await Swal.fire({
      title: '¿Guardar cambios?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      const updateData = {
        date_start: editingActivity.value.date_start,
        date_end: editingActivity.value.date_end,
        id_workshop_id: editingActivity.value.id_workshop_id
      }

      await calendarStore.updateExistingCalendar(editingActivity.value.id_calendar, updateData)
      isEditing.value = false
      await Swal.fire('Actualizado!', 'Los cambios se guardaron', 'success')
      await calendarStore.fetchAllCalendars();
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Error al actualizar'
    await Swal.fire('Error', errorMessage, 'error')
  }
}

// Formatear fecha para mostrar
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Obtener nombre del taller
const getWorkshopTitle = (id: number): string => {
  const workshop = workshopStore.workshops.find((w) => w.id_workshop === id)
  return workshop ? workshop.title : `Taller #${id}`
}

// Fecha mínima para inputs (hoy)
const minDate = computed(() => {
  return new Date().toISOString().slice(0, 16)
})

// Función para abrir el selector de fecha
const openDatePicker = (id) => {
  document.getElementById(id).showPicker();
};
</script>

<template>
  <div>
    <div class="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 p-6">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">
        Gestión del Calendario de Actividades
      </h1>

      <!-- Formulario para crear nueva actividad -->
      <div class="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Crear Nueva Actividad</h2>
        <form @submit.prevent="createCalendar" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="relative">
  <label for="date_start" class="block text-sm font-medium text-gray-700">
    Fecha de Inicio
  </label>
  <input
    type="datetime-local"
    v-model="newCalendar.date_start"
    :min="minDate"
    id="date_start"
    class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 pr-10 cursor-pointer"
    required
  />
  <button
    type="button"
    @click="openDatePicker('date_start')"
    class="absolute inset-y-0 right-2 flex items-center px-3 bg-indigo-500 text-white rounded-md"
  >
    📅
  </button>
</div>

<div class="relative ">
  <label for="date_end" class="block text-sm font-medium text-gray-700">
    Fecha de Fin
  </label>
  <input
    type="datetime-local"
    v-model="newCalendar.date_end"
    :min="newCalendar.date_start || minDate"
    id="date_end"
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500 p-2 pr-10 cursor-pointer"
    required
  />
  <button
    type="button"
    @click="openDatePicker('date_end')"
    class="absolute inset-y-0 right-2 flex items-center px-3 bg-indigo-500 text-white rounded-md"
  >
    📅
  </button>
</div>
            <div>
              <label for="workshop_id" class="block text-sm font-medium text-gray-700">
                Taller
              </label>
              <select
                v-model.number="newCalendar.id_workshop_id"
                id="workshop_id"
                class="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              >
                <option value="0" disabled>Seleccione un taller</option>
                <option
                  v-for="workshop in workshopStore.workshops"
                  :key="workshop.id_workshop"
                  :value="workshop.id_workshop"
                >
                  {{ workshop.title }}
                </option>
              </select>
            </div>
          </div>

          <div v-if="calendarStore.error" class="p-3 bg-red-50 text-red-700 rounded-lg">
            <p class="font-medium">Error:</p>
            <p>{{ calendarStore.error }}</p>
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all"
            :disabled="calendarStore.isLoading"
          >
            <span v-if="calendarStore.isLoading" class="inline-flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creando...
            </span>
            <span v-else>Crear Calendario</span>
          </button>
        </form>
      </div>

      <!-- Lista de actividades programadas -->
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Actividades Programadas</h2>

        <div
          v-if="calendarStore.isLoading && calendarStore.activities.length === 0"
          class="text-center py-4"
        >
          Cargando actividades...
        </div>

        <div v-else-if="calendarStore.activities.length === 0" class="text-center py-4">
          No hay actividades programadas
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="activity in calendarStore.activities"
            :key="activity.id_calendar"
            class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ getWorkshopTitle(activity.id_workshop_id) }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ formatDate(activity.date_start) }} - {{ formatDate(activity.date_end) }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="editActivity(activity)"
                  class="text-indigo-600 hover:text-indigo-900"
                  :disabled="calendarStore.isLoading"
                >
                  Editar
                </button>
                <button
                  @click="deleteActivity(activity)"
                  class="text-red-600 hover:text-red-900"
                  :disabled="calendarStore.isLoading"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para editar actividad -->
      <div
        v-if="isEditing"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
  <h2 class="text-xl font-semibold text-gray-700 mb-4">Editar Actividad</h2>
  <form @submit.prevent="updateActivity" class="space-y-4">
    <div class="relative">
      <label for="edit_date_start" class="block text-sm font-medium text-gray-700">
        Fecha de Inicio
      </label>
      <input
        type="datetime-local"
        v-model="editingActivity.date_start"
        id="edit_date_start"
        class="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 pr-10 cursor-pointer"
        required
      />
      <button
        type="button"
        @click="openDatePicker('edit_date_start')"
        class="absolute inset-y-0 right-2 flex items-center px-3 bg-indigo-500 text-white rounded-md"
      >
        📅
      </button>
    </div>

    <div class="relative">
      <label for="edit_date_end" class="block text-sm font-medium text-gray-700">
        Fecha de Fin
      </label>
      <input
        type="datetime-local"
        v-model="editingActivity.date_end"
        id="edit_date_end"
        class="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 pr-10 cursor-pointer"
        required
      />
      <button
        type="button"
        @click="openDatePicker('edit_date_end')"
        class="absolute inset-y-0 right-2 flex items-center px-3 bg-indigo-500 text-white rounded-md"
      >
        📅
      </button>
    </div>

    <div>
      <label for="edit_workshop_id" class="block text-sm font-medium text-gray-700">
        Taller
      </label>
      <select
        v-model.number="editingActivity.id_workshop_id"
        id="edit_workshop_id"
        class="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
        required
      >
        <option value="0" disabled>Seleccione un taller</option>
        <option
          v-for="workshop in workshopStore.workshops"
          :key="workshop.id_workshop"
          :value="workshop.id_workshop"
        >
          {{ workshop.title }}
        </option>
      </select>
    </div>

    <div class="flex justify-end space-x-2">
      <button
        type="button"
        @click="isEditing = false"
        class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
        :disabled="calendarStore.isLoading"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all"
        :disabled="calendarStore.isLoading"
      >
        <span v-if="calendarStore.isLoading">Guardando...</span>
        <span v-else>Guardar Cambios</span>
      </button>
    </div>

    <div v-if="calendarStore.error" class="p-3 bg-red-50 text-red-700 rounded-lg">
      <p>{{ calendarStore.error }}</p>
    </div>
  </form>
</div>
</div>

    </div>
  </div>
</template>
