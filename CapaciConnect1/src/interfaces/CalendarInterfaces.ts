
export interface Calendar {
  id_calendar: number;
  date_start: string;
  date_end: string;
  id_workshop_id: number;
}

export interface CalendarDTO {
  date_start: string;
  date_end: string;
  id_workshop_id: number;
}

export interface UpdateCalendarDTO {
  id_calendar: number;
  date_start?: string;
  date_end?: string;
  id_workshop_id?: number;
}
