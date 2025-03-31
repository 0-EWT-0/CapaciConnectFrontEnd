import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getUserByIdService,
  updateUserService,
  getWorkshopsService,
  getTypeService,
  getCommentsByWorkshopIdService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
  subscribeWorkshopService,
  fetchCalendarsByWorkshopIdService,
  fetchProgressionService,
  getUserInfoService,
  createProgressionServices,
} from '@/services/UserService'

import type { Workshop } from '@/interfaces/Workshop'
import type { Type } from '@/interfaces/Type'
import type { Progressions } from '@/interfaces/Progressions'
import type { Comments } from '@/interfaces/Comments'
import type { User } from '@/interfaces/User'
// esto esta hecho de la patada

export const useUserStore = defineStore('user', () => {

  const user = ref<User | null>(null)

  async function getUserById(userId: number) {
    console.log(userId)
    try {
      const response = await getUserByIdService(userId)
      if (response?.status === 200) {
        user.value = response?.data
        console.log('usuario', user.value)
      }
    } catch (error: unknown) {
      const errorMessage = 'Error during getUsers'
      console.error(errorMessage, error)
    }
  }

  async function getUserInfo() {
    try {
      const response = await getUserInfoService()
      if (response?.status === 200) {
        user.value = response.data[0] ?? ({} as User)
        console.log('user info', user.value)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async function updateUser(userId: number, userData: Partial<User>) {
    try {
      const response = await updateUserService(userId, userData)
      if (response?.status === 200 && response.data) {
        await getUserById(userId)
        return { success: true, data: response.data }
      } else {
        return { success: false, message: 'Error inesperado en la respuesta de la API' }
      }
    } catch (error: unknown) {
      console.error('Error al actualizar usuario:', error)
      return { success: false, message: 'Error al actualizar el usuario' }
    }
  }
  return { user, getUserById, updateUser, getUserInfo }
})

export const useWorkshopStore = defineStore('workshop', () => {
  const workshops = ref<Workshop[]>([])
  const comments = ref<Comments[]>([])
  const progressions = ref<Progressions[]>([])
  const calendars = ref([])

  // Acción para cargar workshops desde el servicio
  async function fetchWorkshops() {
    try {
      const data = await getWorkshopsService()
      workshops.value = data
    } catch (error) {
      console.error('Error en fetchWorkshops:', error)
    }
  }

  //Crear Comentario, obtener comentarios por Talleres, eliminar comentarios y editar
  async function fetchCommentsByWorkshop(id_workshop_id: number) {
    try {
      const data = await getCommentsByWorkshopIdService(id_workshop_id)
      comments.value = data
    } catch (error) {
      console.error('Error en fetchCommentsByWorkshop:', error)
    }
  }
  //Create
  async function createComment(commentData: { comment: string; id_workshop_id: number }) {
    try {
      const newComment = await createCommentService(commentData)
      comments.value.push(newComment)
    } catch (error) {
      console.error('Error en createComment:', error)
    }
  }
  //Editar
  async function updatedComment(id_comment: number, updatedComment: { comment: string }) {
    try {
      const updatedData = await updateCommentService(id_comment, updatedComment)
      const index = comments.value.findIndex((comments) => comments.id_comment === id_comment)
      if (index !== -1) {
        comments.value[index].comment = updatedData.comment
      }
    } catch (error) {
      console.error('Error en updatedComment:', error)
    }
  }
  //Eliminar
  async function deleteComment(id_comment: number) {
    try {
      const response = await deleteCommentService(id_comment)
      comments.value = comments.value.filter((comment) => comment.id_comment !== id_comment)
    } catch (error) {
      console.error('Error en DeleteComment:', error)
    }
  }

  //Inscripciones a Talleres
  async function subscribeToWorkshop(subscriptionData: { id_workshop_id: number }) {
    try {
      const response = await subscribeWorkshopService(subscriptionData)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error('Ya estás inscrito en este taller.')
      }
      console.error('Error en subscribeToWorkshop:', error)
    }
  }

  async function fetchCalendarsByWorkshopId(id_workshop_id: number) {
    try {
      const response = await fetchCalendarsByWorkshopIdService(id_workshop_id)
      calendars.value = response || []
      return calendars.value
    } catch (error) {
      console.error('Error en fetchSubscriptions:', error)
    }
  }

  //Funcion para obtener progreso de un taller especifico
  async function fetchProgression() {
    try {
      const response = await fetchProgressionService()
      console.log(response)
      return response
    } catch (error) {
      console.error(`Error en fetchProgression para taller:`, error)
    }
  }

  async function createProgression(progressionData: any) {
    try {
      const response = await createProgressionServices(progressionData)
      console.log(response)
      return response
    } catch (error) {
      console.error(`Error en createProgression para taller:`, error)
    }
  }
  
  return {
    workshops,
    fetchWorkshops,
    comments,
    fetchCommentsByWorkshop,
    createComment,
    updatedComment,
    deleteComment,
    subscribeToWorkshop,
    fetchCalendarsByWorkshopId,
    fetchProgression,
    createProgression,
  }
})

export const useTypeStore = defineStore('type', () => {
  const types = ref<Type[]>([])

  async function fetchType() {
    try {
      const data = await getTypeService()
      types.value = data
    } catch (error) {
      console.error('Error en fetchType:', error)
    }
  }

  return { types, fetchType }
})
