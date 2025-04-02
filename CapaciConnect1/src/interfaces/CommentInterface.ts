export interface Comment {
  id_comment: number
  comment: string
  created_at: Date | string
  id_user_id: number
  id_workshop_id: number
  user?: User
  workshop?: IWorkshop
}

export interface IWorkshop {
  id?: number
  title: string
  description: string
  content: string
  image: string
  id_type_id: number
  comments?: Comment[]
}

export interface User {
  id_user: number
  name: string
  last_names: string
  phone: string
  email: string
  password: string
  comfirmPassword: string
  profile_img: string | null
  description: string
  created_at: string | Date
  id_rol_id: string | number
  workshops?: IWorkshop[]
  comments?: Comment[]
}
