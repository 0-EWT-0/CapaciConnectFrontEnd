import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'
import { genericRequestAuth } from '@/utils/genericRequest'
import { getToken } from '@/utils/tokenStorage' // Asegúrate de importar getToken

export class CalendarService {
  private baseUrl = 'https://localhost:44368/api/Calendar'

  private formatDateForAPI(dateString: string): string {
    if (!dateString) throw new Error('Fecha no proporcionada')
    const date = new Date(dateString)
    return date.toISOString()
  }

  async getAllCalendars(): Promise<Calendar[]> {
    try {
      const response = await genericRequestAuth(`${this.baseUrl}/AllCalendars`, 'GET')
      return response.data || []
    } catch (error: unknown) {
      console.error('Error fetching calendars:', error)
      throw new Error('No se pudieron obtener los calendarios')
    }
  }

  async createCalendar(calendarData: CalendarDTO): Promise<Calendar> {
    try {
      const payload = {
        date_start: this.formatDateForAPI(calendarData.date_start),
        date_end: this.formatDateForAPI(calendarData.date_end),
        id_workshop_id: Number(calendarData.id_workshop_id),
      }

      const response = await genericRequestAuth(`${this.baseUrl}/CreateCalendar`, 'POST', payload)
      return response.data
    } catch (error: unknown) {
      console.error('Error creating calendar:', {
        error,
        payload: calendarData,
      })
      throw error
    }
  }
  async deleteCalendar(Id_calendar: number): Promise<void> {
    console.log('Servicio - ID recibido para eliminar:', Id_calendar)

    if (Id_calendar === undefined || Id_calendar === null || isNaN(Id_calendar)) {
      throw new Error('ID de calendario no válido')
    }

    try {
      const response = await genericRequestAuth(
        `${this.baseUrl}/DeleteCalendar/${Id_calendar}`,
        'DELETE',
        {},
      )

      if (response.status !== 200 && response.status !== 204) {
        throw new Error(`Error al eliminar: ${response.statusText}`)
      }
    } catch (error: any) {
      console.error('Error en servicio al eliminar:', {
        Id_calendar,
        status: error.response?.status,
        errorData: error.response?.data,
      })
      throw error
    }
  }
  async updateCalendar(calendarId: number, updateData: UpdateCalendarDTO): Promise<Calendar> {
    if (!calendarId || isNaN(calendarId)) {
      throw new Error('ID de calendario no válido')
    }

    try {
      const payload: Record<string, any> = {}

      // Validación y formato de fechas
      if (updateData.date_start) {
        payload.date_start = new Date(updateData.date_start).toISOString()
      }

      if (updateData.date_end) {
        payload.date_end = new Date(updateData.date_end).toISOString()
      }

      if (updateData.id_workshop_id) {
        payload.id_workshop_id = Number(updateData.id_workshop_id)
      }

      console.log('Payload para actualizar:', payload) // Para depuración

      const response = await genericRequestAuth(
        `${this.baseUrl}/UpdateCalendar/${calendarId}`,
        'PUT',
        payload,
      )

      return response.data
    } catch (error: any) {
      console.error('Error detallado al actualizar:', {
        calendarId,
        payload: updateData,
        status: error.response?.status,
        errorData: error.response?.data,
      })
      throw error
    }
  }
}

export const calendarService = new CalendarService()
