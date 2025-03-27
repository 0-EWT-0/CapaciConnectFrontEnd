export interface Reporte {
    id_Report: number
    tittle: string
    content: string
    created_at: string
    id_workshop_id: number
    id_user_id: number
    workshop_name? : string
}
