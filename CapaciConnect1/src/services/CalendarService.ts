import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces'
import { genericRequestAuth } from '@/utils/genericRequest'

const BASE_URL = `${import.meta.env.VITE_ENDPOINT_API}/Calendar`

const handleError = async (error: any, context: string, details?: Record<string, unknown>) => {
  const errorMessage = `Error en CalendarService.${context}: ${error.message}`
  console.error(errorMessage, {
    ...details,
    response: error.response ? {
      status: error.response.status,
      data: error.response.data,
    } : undefined,
  })
  throw error
}

export const calendarService = {
  async getAll(): Promise<Calendar[]> {
    try {
      const response = await genericRequestAuth(`${BASE_URL}/AllCalendars`, 'GET')
      return response.data || []
    } catch (error: any) {
      await handleError(error, 'getAll')
      throw error
    }
  },

  async create(data: CalendarDTO): Promise<Calendar> {
    try {
      const payload = {
        date_start: this.formatDateForAPI(data.date_start),
        date_end: this.formatDateForAPI(data.date_end),
        id_workshop_id: Number(data.id_workshop_id),
      }

      const response = await genericRequestAuth(`${BASE_URL}/CreateCalendar`, 'POST', payload)
      return response.data
    } catch (error: any) {
      await handleError(error, 'create', { inputData: data })
      throw error
    }
  },

  async update(id: number, data: UpdateCalendarDTO): Promise<Calendar> {
    try {
      this.validateId(id)

      const payload: Partial<UpdateCalendarDTO> = {}
      if (data.date_start) payload.date_start = this.formatDateForAPI(data.date_start)
      if (data.date_end) payload.date_end = this.formatDateForAPI(data.date_end)
      if (data.id_workshop_id) payload.id_workshop_id = Number(data.id_workshop_id)

      const response = await genericRequestAuth(
        `${BASE_URL}/UpdateCalendar/${id}`,
        'PUT',
        payload
      )
      return response.data
    } catch (error: any) {
      await handleError(error, 'update', { calendarId: id, updateData: data })
      throw error
    }
  },

  async delete(id: number): Promise<void> {
    try {
      this.validateId(id)

      const response = await genericRequestAuth(
        `${BASE_URL}/DeleteCalendar/${id}`,
        'DELETE'
      )

      if (![200, 204].includes(response.status)) {
        throw new Error(`Respuesta inesperada: ${response.status}`)
      }
    } catch (error: any) {
      await handleError(error, 'delete', { calendarId: id })
      throw error
    }
  },

  // Métodos privados como funciones dentro del objeto
  formatDateForAPI(dateString: string): string {
    if (!dateString?.trim()) {
      throw new Error('Fecha no proporcionada')
    }

    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      throw new Error(`Fecha no válida: ${dateString}`)
    }
    return date.toISOString()
  },

  validateId(id: number): void {
    if (id === undefined || id === null || isNaN(id) || id <= 0) {
      throw new Error(`ID no válido: ${id}`)
    }
  }
}
