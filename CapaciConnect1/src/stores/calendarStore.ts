import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'
import { calendarService } from '@/services/CalendarService'
import router from '@/router'

export const useCalendarStore = defineStore('calendar', () => {
  const activities = ref<Calendar[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchAllCalendars = async (): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null
      activities.value = await calendarService.getAllCalendars()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar calendarios'

      if (err instanceof Error && err.message.includes('401')) {
        router.push('/login')
      }
    } finally {
      isLoading.value = false
    }
  }

  const createNewCalendar = async (calendarData: CalendarDTO): Promise<Calendar> => {
    try {
      isLoading.value = true
      error.value = null

      const newCalendar = await calendarService.createCalendar(calendarData)
      activities.value.push(newCalendar)
      return newCalendar
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al crear evento'

      if (err instanceof Error && err.message.includes('401')) {
        router.push('/login')
      }

      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateExistingCalendar = async (
    calendarId: number,
    updateData: UpdateCalendarDTO,
  ): Promise<Calendar> => {
    try {
      isLoading.value = true
      error.value = null

      const updatedCalendar = await calendarService.updateCalendar(calendarId, updateData)
      const index = activities.value.findIndex((a) => a.Id_calendar === calendarId)

      if (index !== -1) {
        activities.value[index] = updatedCalendar
      }

      return updatedCalendar
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al actualizar evento'

      if (err instanceof Error && err.message.includes('401')) {
        router.push('/login')
      }

      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteExistingCalendar = async (Id_calendar: number): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null

      console.log('Store - ID recibido para eliminar:', Id_calendar)

      await calendarService.deleteCalendar(Id_calendar)
      activities.value = activities.value.filter((activity) => activity.Id_calendar !== Id_calendar)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al eliminar evento'
      console.error('Error en store al eliminar:', {
        Id_calendar,
        error: err,
      })
      throw err
    } finally {
      isLoading.value = false
    }
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
