<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCalendarStore } from '@/stores/calendarStore'
import { useWorkshopStore } from '@/stores/adminWorkshop'
import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'
import type { Workshop } from '@/interfaces/Workshop'

const calendarStore = useCalendarStore()
const workshopStore = useWorkshopStore()

const newCalendar = ref<CalendarDTO>({
  date_start: '',
  date_end: '',
  id_workshop_id: 0,
})

const isEditing = ref(false)
const editingActivity = ref<UpdateCalendarDTO & { id_calendar: number }>({
  id_calendar: 0,
  date_start: '',
  date_end: '',
  id_workshop_id: 0,
})

onMounted(async () => {
  try {
    await Promise.all([
      calendarStore.fetchAllCalendars(),
      workshopStore.fetchWorkshops()
    ])
  } catch (error: any) {
    console.error('Error al cargar datos:', error)
    alert('Error al cargar datos: ' + (error.message || 'Error desconocido'))
  }
})

const createCalendar = async () => {
  try {
    await calendarStore.createNewCalendar(newCalendar.value)
    newCalendar.value = { date_start: '', date_end: '', id_workshop_id: 0 }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Error al crear actividad'
    alert(errorMessage)
    console.error('Error al crear actividad:', {
      payload: newCalendar.value,
      error: error.response?.data || error.message
    })
  }
}

const editActivity = (activity: Calendar) => {
  if (!activity?.id_calendar) {
    console.error('Actividad sin ID válido:', activity)
    alert('No se puede editar: actividad sin ID válido')
    return
  }

  editingActivity.value = {
    id_calendar: activity.id_calendar,
    date_start: activity.date_start.slice(0, 16),
    date_end: activity.date_end.slice(0, 16),
    id_workshop_id: activity.id_workshop_id,
  }
  isEditing.value = true
}

const deleteActivity = async (activity: Calendar) => {
  if (!activity?.id_calendar) {
    console.error('Actividad sin ID válido:', activity)
    alert('No se puede eliminar: actividad sin ID válido')
    return
  }

  if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
    try {
      await calendarStore.deleteExistingCalendar(activity.id_calendar)
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ||
                       error.message ||
                       'Error al eliminar la actividad'
      alert(errorMessage)
      console.error('Error al eliminar actividad:', {
        Id_calendar: activity.id_calendar,
        error: error.response?.data || error.message
      })
    }
  }
}

const updateActivity = async () => {
  try {
    if (editingActivity.value.id_calendar) {
      const updateData = { ...editingActivity.value }
      await calendarStore.updateExistingCalendar(updateData.id_calendar, updateData)
      isEditing.value = false
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Error al actualizar'
    alert(errorMessage)
    console.error('Error al actualizar actividad:', {
      Id_calendar: editingActivity.value.id_calendar,
      error: error.response?.data || error.message
    })
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getWorkshopTitle = (id: number): string => {
  const workshop = workshopStore.workshops.find(w => w.id_workshop === id)
  return workshop ? workshop.title : `Taller #${id}`
}

const minDate = computed(() => {
  return new Date().toISOString().slice(0, 16)
})
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
            <div>
              <label for="date_start" class="block text-sm font-medium text-gray-700">
                Fecha de Inicio
              </label>
              <input
                type="datetime-local"
                v-model="newCalendar.date_start"
                :min="minDate"
                id="date_start"
                class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="date_end" class="block text-sm font-medium text-gray-700">
                Fecha de Fin
              </label>
              <input
                type="datetime-local"
                v-model="newCalendar.date_end"
                :min="newCalendar.date_start || minDate"
                id="date_end"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
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
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

        <div v-if="calendarStore.isLoading && calendarStore.activities.length === 0" class="text-center py-4">
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
            <div>
              <label for="edit_date_start" class="block text-sm font-medium text-gray-700">
                Fecha de Inicio
              </label>
              <input
                type="datetime-local"
                v-model="editingActivity.date_start"
                id="edit_date_start"
                class="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="edit_date_end" class="block text-sm font-medium text-gray-700">
                Fecha de Fin
              </label>
              <input
                type="datetime-local"
                v-model="editingActivity.date_end"
                id="edit_date_end"
                class="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
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
