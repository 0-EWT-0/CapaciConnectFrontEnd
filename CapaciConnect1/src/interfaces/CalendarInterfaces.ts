// src/types/calendar.ts
export interface Calendar {
  id: number
  date_start: string
  date_end: string
  workshop_id: number
}

export interface CalendarDTO {
  date_start: string
  date_end: string
  workshop_id: number // No puede ser null
}

export interface UpdateCalendarDTO {
  date_start?: string
  date_end?: string
  workshop_id?: number // Puede ser undefined pero no null
}
