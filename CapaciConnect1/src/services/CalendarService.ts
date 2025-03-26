import type { Calendar, CalendarDTO, UpdateCalendarDTO } from "@/interfaces/CalendarInterfaces";
import { genericRequestAuth } from "@/utils/genericRequest";

export class CalendarService {
  private baseUrl = 'https://localhost:44368/api/Calendar';

  async getAllCalendars(): Promise<Calendar[]> {
    try {
      const response = await genericRequestAuth(`${this.baseUrl}/AllCalendars`, 'GET');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching calendars:', error);
      throw new Error('No se pudieron obtener los calendarios');
    }
  }

  async createCalendar(calendarData: CalendarDTO): Promise<Calendar> {
    try {
      const response = await genericRequestAuth(`${this.baseUrl}/CreateCalendar`, 'POST', calendarData);
      return response.data;
    } catch (error) {
      console.error('Error creating calendar:', error);
      throw new Error(error.response?.data?.message || 'Error al crear el calendario');
    }
  }

  async updateCalendar(calendarId: number, updateData: UpdateCalendarDTO): Promise<Calendar> {
    try {
      const response = await genericRequestAuth(
        `${this.baseUrl}/UpdateCalendar/${calendarId}`,
        'PUT',
        updateData
      );
      return response.data;
    } catch (error) {
      console.error('Error updating calendar:', error);
      throw new Error(error.response?.data?.message || 'Error al actualizar el calendario');
    }
  }

  async deleteCalendar(calendarId: number): Promise<void> {
    try {
      await genericRequestAuth(`${this.baseUrl}/DeleteCalendar/${calendarId}`, 'DELETE');
    } catch (error) {
      console.error('Error deleting calendar:', error);
      throw new Error(error.response?.data?.message || 'Error al eliminar el calendario');
    }
  }
}

export const calendarService = new CalendarService();
