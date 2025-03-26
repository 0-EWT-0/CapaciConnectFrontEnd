<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavbarCoord from '@/components/global/Coordinador/NavbarCoord.vue'
import { useCalendarStore } from '@/stores/calendarStore'
import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'

const calendarStore = useCalendarStore()

const newCalendar = ref<CalendarDTO>({
  date_start: '',
  date_end: '',
  workshop_id: 0,
})

const isEditing = ref(false)
const editingActivity = ref<UpdateCalendarDTO & { id: number }>({
  id: 0,
  date_start: '',
  date_end: '',
  workshop_id: 0,
})

onMounted(() => {
  calendarStore.fetchAllCalendars()
})

const createCalendar = async () => {
  try {
    await calendarStore.createNewCalendar(newCalendar.value)
    newCalendar.value = { date_start: '', date_end: '', workshop_id: 0 }
  } catch (error) {
    // El error ya está manejado en el store
  }
}

const editActivity = (activity: Calendar) => {
  editingActivity.value = {
    id: activity.id,
    date_start: activity.date_start,
    date_end: activity.date_end,
    workshop_id: activity.workshop_id,
  }
  isEditing.value = true
}

const updateActivity = async () => {
  try {
    if (editingActivity.value.id) {
      const { id, ...updateData } = editingActivity.value
      await calendarStore.updateExistingCalendar(id, updateData)
      isEditing.value = false
    }
  } catch (error) {
    // El error ya está manejado en el store
  }
}

const deleteActivity = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
    try {
      await calendarStore.deleteExistingCalendar(id)
    } catch (error) {
      // El error ya está manejado en el store
    }
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>

<template>
  <div>
    <!-- Sidebar -->
    <NavbarCoord />

    <!-- Contenido principal con margen izquierdo -->
    <div class="ml-[20rem] min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 p-6">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">
        Gestión del Calendario de Actividades
      </h1>

      <!-- Formulario para crear una nueva actividad -->
      <div class="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Crear Nueva Actividad</h2>
        <form @submit.prevent="createCalendar" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="date_start" class="block text-sm font-medium text-gray-700"
                >Fecha de Inicio</label
              >
              <input
                type="datetime-local"
                v-model="newCalendar.date_start"
                id="date_start"
                class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="date_end" class="block text-sm font-medium text-black"
                >Fecha de Fin</label
              >
              <input
                type="datetime-local"
                v-model="newCalendar.date_end"
                id="date_end"
                class="mt-1 block w-full rounded-md border-gray-800 shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="workshop_id" class="block text-sm font-medium text-black">Taller</label>
              <input
                type="number"
                v-model="newCalendar.workshop_id"
                id="workshop_id"
                class="mt-1 block w-full rounded-md border-gray-800 shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="Ingresa el ID del taller"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all"
            :disabled="calendarStore.isLoading"
          >
            <span v-if="calendarStore.isLoading">Creando...</span>
            <span v-else>Crear Calendario</span>
          </button>
          <p v-if="calendarStore.error" class="text-red-500 text-sm">{{ calendarStore.error }}</p>
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
            :key="activity.id"
            class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  Taller {{ activity.workshop_id }}
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
                  @click="deleteActivity(activity.id)"
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
              <label for="edit_date_start" class="block text-sm font-medium text-gray-700"
                >Fecha de Inicio</label
              >
              <input
                type="datetime-local"
                v-model="editingActivity.date_start"
                id="edit_date_start"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="edit_date_end" class="block text-sm font-medium text-gray-700"
                >Fecha de Fin</label
              >
              <input
                type="datetime-local"
                v-model="editingActivity.date_end"
                id="edit_date_end"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="edit_workshop_id" class="block text-sm font-medium text-gray-700"
                >ID del Taller</label
              >
              <input
                type="number"
                v-model="editingActivity.workshop_id"
                id="edit_workshop_id"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="Ingresa el ID del taller"
                required
              />
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
            <p v-if="calendarStore.error" class="text-red-500 text-sm">{{ calendarStore.error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
