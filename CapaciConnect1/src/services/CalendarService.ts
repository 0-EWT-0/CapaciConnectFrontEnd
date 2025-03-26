import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces';

export class CalendarService {
  private baseUrl = 'https://localhost:44368/api/Calendar';

  async getAllCalendars(): Promise<Calendar[]> {
    const response = await fetch(`${this.baseUrl}/AllCalendars`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch calendars');
    }

    return await response.json();
  }

  async createCalendar(calendarData: CalendarDTO): Promise<Calendar> {
    const response = await fetch(`${this.baseUrl}/CreateCalendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(calendarData),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create calendar');
    }

    return await response.json();
  }

  async updateCalendar(calendarId: number, updateData: UpdateCalendarDTO): Promise<Calendar> {
    const response = await fetch(`${this.baseUrl}/UpdateCalendar/${calendarId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update calendar');
    }

    return await response.json();
  }

  async deleteCalendar(calendarId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/DeleteCalendar/${calendarId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete calendar');
    }
  }
}

export const calendarService = new CalendarService();
