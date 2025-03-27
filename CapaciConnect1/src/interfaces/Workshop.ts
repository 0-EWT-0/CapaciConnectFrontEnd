export interface Workshop {
  id_workshop: number
  title: string
  description: string
  content: string
  image: string | null
  id_user_id: number
  id_type_id: number
  created_at: Date
}
