  import axios from 'axios'
  import type { Comment } from '@/interfaces/CommentInterface'
  import { getToken, clearToken } from '@/utils/tokenStorage'
  import router from '@/router'

  // Configuración base de axios
  const apiClient = axios.create({
    baseURL: 'https://localhost:44368/api/Comment',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Interceptor para añadir el token de autenticación
  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Interceptor para manejar respuestas no autorizadas
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearToken()
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )

  export default {
    async getAllComments(): Promise<Comment[]> {
      try {
        const response = await apiClient.get<Comment[]>('/AllComments')
        return response.data
      } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
      }
    },

    async deleteComment(id: number): Promise<void> {
      try {
        await apiClient.delete(`/DeleteComment/${id}`)
      } catch (error) {
        console.error('Error deleting comment:', error)
        throw error
      }
    },

    async deleteAllWorkshopComments(workshopId: number): Promise<void> {
      try {
        await apiClient.delete(`/DeleteAllWorkshopComments/${workshopId}`)
      } catch (error) {
        console.error('Error deleting workshop comments:', error)
        throw error
      }
    },
  }
