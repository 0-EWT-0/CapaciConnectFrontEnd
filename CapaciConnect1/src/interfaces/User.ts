export interface User {
  Id_user: number
  Name: string
  Last_names: string
  Phone: string
  Email: string
  Password: string
  Profile_img: string
  Description: string
  Created_at: string
  Id_rol_id: string
  Workshops: []
  Comments: []
  Logs: []
  Progressions: []
  Sessions: []
  Subscriptions: []
  Reports: []
}
