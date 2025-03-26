import { ref } from "vue";
import { defineStore } from "pinia";
import { getUserByIdService, updateUserService, getWorkshopsService, getTypeService, getCommentsByWorkshopIdService, createCommentService, updateCommentService, deleteCommentService, subscribeWorkshopService, fetchCalendarsByWorkshopIdService,} from "@/services/UserService";

interface Workshop {
    id_workshop: number;
    title: string;
    description: string;
    content: string;
    image: string | null;
    id_user_id: number;
    id_type_id: number;
    created_at: Date
  }

  interface Type {
    id_type: number;
    type_name: string;
    workshops: []
  }

//   interface progressions {
//     id_progression: number
//     progression_status: number
//     id_user_id: number
//     user: string
//     id_workshop_id: number
//     workshop: string
//   }

  interface Comments {
  id_comment: number;
  comment: string;
  created_at: Date;
  id_user_id: number;
  id_workshop_id: number;
  workshop: string;
}


export const useUserStore = defineStore('user', () => {
    interface User {
            Id_user: number
            Name: string
            Last_names: string
            Phone: string
            Email: string
            Description: string
            Id_rol_id: string
            created_at: Date
    }
    
    const user = ref<User| null>(null)

    async function getUserById(userId: number) {
        try {
            const response = await getUserByIdService(userId)
            user.value = response?.data
        } catch (error: unknown) {
            const errorMessage = 'Error during getUsers'
            console.error(errorMessage, error)
        }
    }

    async function updateUser(userId: number, userData: Partial<User>) {
        try {
            const response = await updateUserService(userId, userData);
            if(response?.status === 200 && response.data) {
                await getUserById(userId);
                return { success: true, data: response.data }
            } else {
                return { success: false, message: 'Error inesperado en la respuesta de la API' };
            }
        } catch (error: unknown) {
            console.error('Error al actualizar usuario:', error);
            return { success: false, message: 'Error al actualizar el usuario' };
        }
    }
    return { user, getUserById, updateUser }
})

export const useWorkshopStore = defineStore('workshop', () => {
    const workshops = ref<Workshop[]>([])
    const comments = ref<Comments[]>([])
    const progressions = ref({})
    const calendars = ref([]);
  
    // Acción para cargar workshops desde el servicio
    async function fetchWorkshops() {
      try {
        const data = await getWorkshopsService();
        workshops.value = data;
      } catch (error) {
        console.error("Error en fetchWorkshops:", error);
      }
    }

    //Crear Comentario, obtener comentarios por Talleres, eliminar comentarios y editar
    async function fetchCommentsByWorkshop(id_workshop_id: number) {
        try {
            const data = await getCommentsByWorkshopIdService(id_workshop_id);
            comments.value = data;
        } catch (error) {
            console.error("Error en fetchCommentsByWorkshop:", error);
        }
    }
    //Create
    async function createComment(commentData: { comment: string; id_workshop_id: number}) {
        try {
            const newComment  = await createCommentService(commentData)
            comments.value.push(newComment);
        } catch (error) {
            console.error("Error en createComment:", error);
        }
    }
    //Editar
    async function updatedComment(id_comment: number, updatedComment: { comment: string }) {
        try {
            const updatedData = await updateCommentService(id_comment, updatedComment)
            const index = comments.value.findIndex((comments) => comments.id_comment === id_comment)
            if (index !== -1) {
                comments.value[index].comment = updatedData.comment;
            }
        } catch (error) {
            console.error("Error en updatedComment:", error);
        }
    }
    //Eliminar
    async function deleteComment(id_comment: number) {
        try {
            const response = await deleteCommentService(id_comment);
            comments.value = comments.value.filter((comment) => comment.id_comment !== id_comment);
        } catch (error) {
            console.error("Error en DeleteComment:", error);
        }
    }

    //Inscripciones a Talleres
    async function subscribeToWorkshop(subscriptionData: { id_workshop_id: number }) {
        try {
            const response = await subscribeWorkshopService(subscriptionData);
            return response.data;
        } catch (error: any) {
            if(error.response?.status === 409) {
                throw new Error('Ya estás inscrito en este taller.');
            }
            console.error("Error en subscribeToWorkshop:", error);
        }
    }

    async function fetchCalendarsByWorkshopId(id_workshop_id: number) {
        try {
            const response = await fetchCalendarsByWorkshopIdService(id_workshop_id)
            calendars.value = response || [];
            return calendars.value;
        } catch (error) {
            console.error("Error en fetchSubscriptions:", error);
        }
    }

    //Funcion para obtener progreso de un taller especifico
    // async function fetchProgression(id_workshop_id: number) {
    //     try {
    //         const response = await fetchProgressionService(id_workshop_id);
    //         progressions.value[id_workshop_id] = response.progression || 0;
    //         return response;
    //     } catch (error) {
    //         console.error("Error en fetchProgression:", error);
    //     }
    // }

    return {
      workshops,
      fetchWorkshops,
      comments,
      fetchCommentsByWorkshop,
      createComment,
      updatedComment,
      deleteComment,
      subscribeToWorkshop,
      fetchCalendarsByWorkshopId
    };
  });

  export const useTypeStore = defineStore('type', () => {
    const types = ref<Type[]>([])

    async function fetchType() {
        try {
            const data = await getTypeService();
            types.value = data;
        } catch (error) {
            console.error("Error en fetchType:", error);
        }
    }

    return { types, fetchType}
  })