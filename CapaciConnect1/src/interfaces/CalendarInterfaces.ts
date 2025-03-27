// En tus interfaces (CalendarInterfaces.ts)
export interface Calendar {
  Id_calendar: number;  // Ahora coincide con la BD
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
  date_start?: string;
  date_end?: string;
  id_workshop_id?: number;
}
