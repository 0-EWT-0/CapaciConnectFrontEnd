import { ref } from "vue";
import { defineStore } from "pinia";
import { getUserByIdService, updateUserService, getWorkshopsService, getTypeService, getCommentsByWorkshopIdService, createCommentService, updateCommentService, deleteCommentService, subscribeWorkshopService, fetchCalendarsByWorkshopIdService, fetchProgressionService} from "@/services/UserService";
import type { Type } from '@/interfaces/Type'
import type { Progressions } from '@/interfaces/Progressions'
import type { Comments } from '@/interfaces/Comments'
import type { Workshop } from '@/interfaces/Workshop'


export const useUserStore = defineStore('user', () => {
//     interface User {
//             Id_user: number
//             Name: string
//             Last_names: string
//             Phone: string
//             Email: string
//             Description: string
//             Id_rol_id: string
//             created_at: Date
//     }
//   }
//   return { user, getUserById, updateUser, getUserInfo }
// })

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
  async function fetchProgression(id_workshop_id: number) {
    try {
      const response = await fetchProgressionService(id_workshop_id)
      console.log(`Progreso obtenido para el taller ${id_workshop_id}:`, response)

      // Inicializa progressions si es necesario
      if (!progressions.value) {
        progressions.value = {}
      }

      // Verifica si la respuesta contiene datos válidos
      if (response && response.length > 0) {
        progressions.value[id_workshop_id] = response[0].progression_status || 0
      } else {
        console.warn(`No se encontraron progresos para el taller ${id_workshop_id}`)
        progressions.value[id_workshop_id] = 0 // Asigna un valor predeterminado
      }

      return response
    } catch (error) {
      console.error(`Error en fetchProgression para taller ${id_workshop_id}:`, error)
      progressions.value[id_workshop_id] = 0 // Valor predeterminado en caso de error
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
// ice();
//             types.value = data;
//         } catch (error) {
//             console.error("Error en fetchType:", error);
//         }
//     }

//     return { types, fetchType}
//   })ice();
//             types.value = data;
//         } catch (error) {
//             console.error("Error en fetchType:", error);
//         }
//     }

//     return { types, fetchType}
//   })