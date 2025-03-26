import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'
import { genericRequestAuth } from '@/utils/genericRequest'
import router from '@/router'

export class CalendarService {
  private baseUrl = 'https://localhost:44368/api/Calendar'

  private formatDateForAPI(dateString: string): string {
    if (!dateString) throw new Error('Fecha no proporcionada')
    const date = new Date(dateString)
    return date.toISOString()
  }

  private validateCalendarData(data: CalendarDTO | UpdateCalendarDTO): void {
    if (!data.date_start || !data.date_end) {
      throw new Error('Las fechas son requeridas')
    }

    const startDate = new Date(data.date_start)
    const endDate = new Date(data.date_end)

    if (startDate >= endDate) {
      throw new Error('La fecha de inicio debe ser anterior a la fecha de fin')
    }

    if (!data.id_workshop_id || data.id_workshop_id <= 0) {
      throw new Error('Debe seleccionar un taller válido')
    }
  }

  async getAllCalendars(): Promise<Calendar[]> {
    try {
      const response = await genericRequestAuth(`${this.baseUrl}/AllCalendars`, 'GET')
      return response.data || []
    } catch (error) {
      console.error('Error fetching calendars:', error)
      throw new Error('No se pudieron obtener los calendarios')
    }
  }

  async createCalendar(calendarData: CalendarDTO): Promise<Calendar> {
    try {
      this.validateCalendarData(calendarData)

      const formattedData = {
        ...calendarData,
        date_start: this.formatDateForAPI(calendarData.date_start),
        date_end: this.formatDateForAPI(calendarData.date_end),
        workshop_id: Number(calendarData.id_workshop_id)
      }

      const response = await genericRequestAuth(
        `${this.baseUrl}/CreateCalendar`,
        'POST',
        formattedData
      )
      return response.data
    } catch (error) {
      console.error('Error creating calendar:', {
        error,
        payload: calendarData
      })
      throw error
    }
  }

  async updateCalendar(calendarId: number, updateData: UpdateCalendarDTO): Promise<Calendar> {
    try {
      // Validación para actualización
      if (updateData.date_start || updateData.date_end) {
        const validationData = {
          date_start: updateData.date_start ?? '',
          date_end: updateData.date_end ?? '',
          id_workshop_id: updateData.id_workshop_id ?? 0
        }
        this.validateCalendarData(validationData)
      }

      const payload: any = {}

      if (updateData.date_start) {
        payload.date_start = this.formatDateForAPI(updateData.date_start)
      }

      if (updateData.date_end) {
        payload.date_end = this.formatDateForAPI(updateData.date_end)
      }

      if (updateData.id_workshop_id) {
        payload.workshop_id = Number(updateData.id_workshop_id)
      }

      const response = await genericRequestAuth(
        `${this.baseUrl}/UpdateCalendar/${calendarId}`,
        'PUT',
        payload
      )
      return response.data
    } catch (error) {
      console.error('Error updating calendar:', {
        error,
        payload: updateData
      })
      throw error
    }
  }

  async deleteCalendar(calendarId: number): Promise<void> {
    try {
      const response = await genericRequestAuth(
        `${this.baseUrl}/DeleteCalendar/${calendarId}`,
        'DELETE',
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw new Error('Error al eliminar el calendario')
      }
    } catch (error) {
      console.error('Error deleting calendar:', error)
      throw new Error('No se pudo eliminar el calendario. Verifica que exista y vuelve a intentar.')
    }
  }
}

export const calendarService = new CalendarService()
