import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'
import { calendarService } from '@/services/CalendarService'
import router from '@/router'

export const useCalendarStore = defineStore('calendar', () => {
  const activities = ref<Calendar[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const handleError = (err: unknown, context: string): string => {
    const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
    error.value = `Error al ${context}: ${errorMessage}`

    console.error(error.value, err)

    if (errorMessage.includes('401')) {
      router.push('/login')
    }

    return error.value
  }

  const withLoading = async <T>(action: () => Promise<T>): Promise<T> => {
    try {
      isLoading.value = true
      error.value = null
      return await action()
    } finally {
      isLoading.value = false
    }
  }

  const fetchAllCalendars = async (): Promise<void> => {
    await withLoading(async () => {
      activities.value = await calendarService.getAll()
    }).catch((err) => {
      throw handleError(err, 'obtener calendarios')
    })
  }

  const createNewCalendar = async (data: CalendarDTO): Promise<Calendar> => {
    return withLoading(async () => {
      const newCalendar = await calendarService.create(data)
      activities.value.push(newCalendar)
      return newCalendar
    }).catch((err) => {
      throw handleError(err, 'crear calendario')
    })
  }

  const updateExistingCalendar = async (id: number, data: UpdateCalendarDTO): Promise<Calendar> => {
    return withLoading(async () => {
      const updated = await calendarService.update(id, data)
      const index = activities.value.findIndex((a) => a.Id_calendar === id)

      if (index !== -1) {
        activities.value[index] = updated
      }

      return updated
    }).catch((err) => {
      throw handleError(err, 'actualizar calendario')
    })
  }

  const deleteExistingCalendar = async (id: number): Promise<void> => {
    await withLoading(async () => {
      await calendarService.delete(id)
      activities.value = activities.value.filter((a) => a.Id_calendar !== id)
    }).catch((err) => {
      throw handleError(err, 'eliminar calendario')
    })
  }

  return {
    activities,
    isLoading,
    error,
    fetchAllCalendars,
    createNewCalendar,
    updateExistingCalendar,
    deleteExistingCalendar,
  }
})
