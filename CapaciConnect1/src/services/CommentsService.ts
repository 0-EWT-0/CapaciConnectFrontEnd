// src/services/CommentsService.ts
import axios from 'axios'
import type { Comment } from '@/interfaces/CommentInterface'

const apiUrl = 'https://localhost:44368/api/Comment'

// Configuración de axios con interceptores para manejar tokens
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para añadir el token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default {
  async getAllComments(): Promise<Comment[]> {
    const response = await apiClient.get<Comment[]>('/AllComments')
    return response.data
  },

  async deleteComment(id: number): Promise<void> {
    await apiClient.delete(`/DeleteComment/${id}`)
  },

  async deleteAllWorkshopComments(workshopId: number): Promise<void> {
    await apiClient.delete(`/DeleteAllWorkshopComments/${workshopId}`)
  },
}
