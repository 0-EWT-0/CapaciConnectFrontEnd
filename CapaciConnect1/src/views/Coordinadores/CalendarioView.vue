<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useCalendarStore } from '@/stores/calendarStore'
import { useWorkshopStore } from '@/stores/adminWorkshopStore'
import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'
import type { Workshop } from '@/interfaces/Workshop'
import Swal from 'sweetalert2'
import BaseButton from '@/components/common/BaseButton.vue'
import Loading from '@/components/common/Loading.vue'

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
const editingActivity = ref<
  UpdateCalendarDTO & { id_calendar: number; originalData: Calendar | null }
>({
  id_calendar: 0,
  date_start: '',
  date_end: '',
  id_workshop_id: 0,
  originalData: null,
})

// Cargar datos iniciales
onMounted(async () => {
  try {
    await Promise.all([calendarStore.fetchAllCalendars(), workshopStore.fetchWorkshops()])
  } catch (error: any) {
    console.error('Error al cargar datos:', error)
    await Swal.fire({
      title: 'Error',
      text: 'Error al cargar datos: ' + (error.message || 'Error desconocido'),
      icon: 'error',
    })
  }
})

// Validar fechas
const validateDates = async (start: string, end: string): Promise<boolean> => {
  if (!start || !end) {
    await Swal.fire('Error', 'Ambas fechas son requeridas', 'error')
    return false
  }

  const startDate = new Date(start)
  const endDate = new Date(end)
  const now = new Date()

  if (startDate >= endDate) {
    await Swal.fire('Error', 'La fecha de inicio debe ser anterior a la fecha de fin', 'error')
    return false
  }

  if (startDate < now) {
    await Swal.fire('Error', 'No puedes programar actividades en el pasado', 'error')
    return false
  }

  return true
}

// Crear nuevo calendario
const createCalendar = async () => {
  if (!validateDates(newCalendar.value.date_start, newCalendar.value.date_end)) return

  if (!newCalendar.value.id_workshop_id) {
    Swal.fire({
      title: 'Error',
      text: 'Debes de seleccionar un taller',
      icon: 'error',
      confirmButtonColor: '#2563EB',
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
    return
  }

  try {
    await calendarStore.createNewCalendar(newCalendar.value)
    newCalendar.value = { date_start: '', date_end: '', id_workshop_id: 0 }
    Swal.fire({
      icon: 'success',
      title: 'Fechas asignadas',
      showConfirmButton: false,
      timer: 1500,
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Error al crear actividad'
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
    originalData: activity,
  }
  isEditing.value = true
}

// Verificar si hay cambios en la edición
const hasChanges = computed(() => {
  if (!editingActivity.value.originalData) return false

  return (
    editingActivity.value.date_start !==
      editingActivity.value.originalData.date_start.slice(0, 16) ||
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
    title: '¿Quieres eliminar estas fechas?',
    text: 'Esta acción es irreversible',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#BCCCDC',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#059669',
    confirmButtonText: 'Confirmar',
    backdrop: 'rgba(4, 2, 115, 0.7)',
  })

  if (result.isConfirmed) {
    try {
      await calendarStore.deleteExistingCalendar(activity.id_calendar)
      await Swal.fire({
        title: 'Fechas eliminadas',
        text: 'Las fechas del taller han sido eliminadas correctamente',
        icon: 'success',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
      await calendarStore.fetchAllCalendars()
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al eliminar'
      await Swal.fire({
        title: 'Error',
        text: 'No se pudieron eliminar las fechas del taller',
        icon: 'error',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
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
    const updateData = {
      date_start: editingActivity.value.date_start,
      date_end: editingActivity.value.date_end,
      id_workshop_id: editingActivity.value.id_workshop_id,
    }

    await calendarStore.updateExistingCalendar(editingActivity.value.id_calendar, updateData)
    isEditing.value = false
    Swal.fire({
      icon: 'success',
      title: 'Fechas actualizadas',
      showConfirmButton: false,
      timer: 1500,
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
    await calendarStore.fetchAllCalendars()
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
  document.getElementById(id).showPicker()
}
</script>

<template>
  <div class="p-16">
    <div class="">
      <h2 class="text-[#212122] pb-4">Asignar fechas por taller</h2>

      <!-- Formulario para crear nueva actividad -->
      <div class="bg-[#F2F5FA] p-8 rounded-lg">
        <form @submit.prevent="createCalendar" class="space-y-4">
          <div class="flex flex-col gap-4">
            <div>
              <label class="text-[#212122]"><h3 class="pb-2">Taller</h3></label>

              <div class="flex relative">
                <select
                  v-model.number="newCalendar.id_workshop_id"
                  id="workshop_id"
                  class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0 appearance-none"
                  required
                >
                  <option value="0" disabled>Seleccionar</option>
                  <option
                    v-for="workshop in workshopStore.workshops"
                    :key="workshop.id_workshop"
                    :value="workshop.id_workshop"
                  >
                    {{ workshop.title }}
                  </option>
                </select>
                <div
                  class="absolute right-0 inset-y-0 p-4 cursor-pointer rounded-lg pointer-events-none"
                >
                  <span class="pi pi-chevron-down text-4xl text-[#2563EB]"></span>
                </div>
              </div>
            </div>

            <div class="relative">
              <label class="text-[#212122]"><h3 class="pb-2">Fecha de inicio</h3></label>
              <div class="flex relative">
                <input
                  type="datetime-local"
                  v-model="newCalendar.date_start"
                  :min="minDate"
                  id="date_start"
                  class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                />
                <button
                  type="button"
                  @click="openDatePicker('date_start')"
                  class="absolute right-0 inset-y-0 p-4 cursor-pointer rounded-lg"
                >
                  <span class="pi pi-calendar text-4xl text-[#2563EB]"></span>
                </button>
              </div>
            </div>

            <div class="relative">
              <label class="text-[#212122]"><h3 class="pb-2">Fecha de cierre</h3></label>
              <div class="flex relative">
                <input
                  type="datetime-local"
                  v-model="newCalendar.date_end"
                  :min="newCalendar.date_start || minDate"
                  id="date_end"
                  class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                />
                <button
                  type="button"
                  @click="openDatePicker('date_end')"
                  class="absolute right-0 inset-y-0 p-4 cursor-pointer rounded-lg"
                >
                  <span class="pi pi-calendar text-4xl text-[#2563EB]"></span>
                </button>
              </div>
            </div>
          </div>

          <div v-if="calendarStore.error" class="p-3 bg-red-50 text-red-700 rounded-lg">
            <p class="font-medium">Error:</p>
            <p>{{ calendarStore.error }}</p>
          </div>

          <BaseButton variant="green" type="submit" :disabled="calendarStore.isLoading">
            <template v-if="calendarStore.isLoading" class="inline-flex items-center">
              <span class="pi pi-spinner text-4xl animate-spin"></span>
            </template>
            <template v-else>Confirmar</template>
          </BaseButton>
        </form>
      </div>

      <!-- Lista de actividades programadas -->
      <div class="bg-[#F2F5FA] mt-19 p-8 rounded-lg max-w-6xl mx-auto">
        <h2 class="text-[#212122] pb-4">Lista de fechas asignadas</h2>

        <div v-if="calendarStore.isLoading && calendarStore.activities.length === 0">
          <Loading />
        </div>

        <h3 v-else-if="calendarStore.activities.length === 0" class="text-gray-500">
          No hay fechas asignadas
        </h3>

        <div v-else class="space-y-4">
          <div
            v-for="activity in calendarStore.activities"
            :key="activity.id_calendar"
            class="bg-white shadow-lg p-4 rounded-lg"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-[#212122] pb-2">{{ getWorkshopTitle(activity.id_workshop_id) }}</h3>

                <div class="pb-2">
                  <p class="text-[#212122]">Fecha de inicio</p>
                  <h3 class="text-[#059669]">{{ formatDate(activity.date_start) }}</h3>
                </div>

                <p class="text-[#212122]">Fecha de cierre</p>
                <h3 class="text-[#DC2626]">{{ formatDate(activity.date_end) }}</h3>
              </div>
            </div>
            <div class="flex space-x-2">
              <BaseButton
                variant="orange"
                :disabled="calendarStore.isLoading"
                @click="editActivity(activity)"
                >Editar</BaseButton
              >
              <BaseButton
                variant="red"
                :disabled="calendarStore.isLoading"
                @click="deleteActivity(activity)"
                >Eliminar</BaseButton
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para editar actividad -->
      <div
        v-if="isEditing"
        class="fixed inset-0 bg-[#040273] bg-opacity-75 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-[#212122] pb-4">Editar fechas</h2>
          <form @submit.prevent="updateActivity" class="space-y-4">
            <div class="relative">
              <label class="text-[#212122]"><h3 class="pb-2">Fecha de inicio</h3></label>

              <div class="flex relative">
                <input
                  type="datetime-local"
                  v-model="editingActivity.date_start"
                  id="edit_date_start"
                  class="bg-[#F2F5FA] text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                  required
                />
                <button
                  type="button"
                  @click="openDatePicker('edit_date_start')"
                  class="absolute right-0 inset-y-0 p-4 cursor-pointer rounded-lg"
                >
                  <span class="pi pi-calendar text-4xl text-[#2563EB]"></span>
                </button>
              </div>
            </div>

            <div class="relative">
              <label class="text-[#212122]"><h3 class="pb-2">Fecha de cierre</h3></label>
              <div class="flex relative">
                <input
                  type="datetime-local"
                  v-model="editingActivity.date_end"
                  id="edit_date_end"
                  class="bg-[#F2F5FA] text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                  required
                />
                <button
                  type="button"
                  @click="openDatePicker('edit_date_end')"
                  class="absolute right-0 inset-y-0 p-4 cursor-pointer rounded-lg"
                >
                  <span class="pi pi-calendar text-4xl text-[#2563EB]"></span>
                </button>
              </div>
            </div>

            <div>
              <label class="text-[#212122]"><h3 class="pb-2">Taller</h3></label>
              <div class="flex relative">
                <select
                  v-model.number="editingActivity.id_workshop_id"
                  id="edit_workshop_id"
                  class="bg-[#F2F5FA] text-[#565656] rounded-lg w-full p-4 focus:outline-0 appearance-none"
                  required
                >
                  <option value="0" disabled>Seleccionar</option>
                  <option
                    v-for="workshop in workshopStore.workshops"
                    :key="workshop.id_workshop"
                    :value="workshop.id_workshop"
                  >
                    {{ workshop.title }}
                  </option>
                </select>
                <div
                  class="absolute right-0 inset-y-0 p-4 cursor-pointer rounded-lg pointer-events-none"
                >
                  <span class="pi pi-chevron-down text-4xl text-[#2563EB]"></span>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-2">
              <BaseButton
                variant="gray"
                :disabled="calendarStore.isLoading"
                @click="isEditing = false"
              >
                <template v-if="calendarStore.isLoading" class="inline-flex items-center">
                  <span class="pi pi-spinner text-4xl animate-spin"></span>
                </template>
                <template v-else>Cancelar</template>
              </BaseButton>

              <BaseButton variant="green" type="submit"  :disabled="!hasChanges">
                <template v-if="calendarStore.isLoading" class="inline-flex items-center">
                  <span class="pi pi-spinner text-4xl animate-spin"></span>
                </template>
                <template v-else>Guardar</template>
              </BaseButton>
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

<style scoped>
button:disabled {
  background-color: #bcccdc;
  cursor: not-allowed;
}
</style>
