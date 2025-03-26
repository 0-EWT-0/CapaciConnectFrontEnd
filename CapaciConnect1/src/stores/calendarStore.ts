import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Calendar, CalendarDTO, UpdateCalendarDTO } from '@/interfaces/CalendarInterfaces';
import { calendarService } from '@/services/CalendarService';

export const useCalendarStore = defineStore('calendar', () => {
  const activities = ref<Calendar[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchAllCalendars = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      activities.value = await calendarService.getAllCalendars();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  const createNewCalendar = async (calendarData: CalendarDTO) => {
    try {
      isLoading.value = true;
      error.value = null;
      const newCalendar = await calendarService.createCalendar(calendarData);
      activities.value.push(newCalendar);
      return newCalendar;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create calendar';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateExistingCalendar = async (calendarId: number, updateData: UpdateCalendarDTO) => {
    try {
      isLoading.value = true;
      error.value = null;
      const updatedCalendar = await calendarService.updateCalendar(calendarId, updateData);
      const index = activities.value.findIndex(a => a.id === calendarId);
      if (index !== -1) {
        activities.value[index] = updatedCalendar;
      }
      return updatedCalendar;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update calendar';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteExistingCalendar = async (calendarId: number) => {
    try {
      isLoading.value = true;
      error.value = null;
      await calendarService.deleteCalendar(calendarId);
      activities.value = activities.value.filter(activity => activity.id !== calendarId);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete calendar';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    activities,
    isLoading,
    error,
    fetchAllCalendars,
    createNewCalendar,
    updateExistingCalendar,
    deleteExistingCalendar
  };
});
