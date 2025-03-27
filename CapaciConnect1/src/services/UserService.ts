import { genericRequest, genericRequestAuth } from '@/utils/genericRequest'

const base_url = 'https://localhost:44368/api'
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}

const handleError = async (error: any, context: string) => {
  const errorMessage = `Error during ${context}: ${error.message}`
  console.error(errorMessage)

  const errorDetails = {
    response: error.response
      ? {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        }
      : null,
    request: error.request || null,
    message: error.message,
  }

  await console.error('error', errorMessage, errorDetails)
  throw error
}

export const getUserByIdService = async (userId: number) => {
  try {
    const result = await genericRequestAuth(`${base_url}/User/UserById/${userId}`, 'GET')
    return result
  } catch (error: any) {
    await handleError(error, 'getUserByIdService')
  }
}

export const   getUserInfoService = async () => {
  try {
    const result = await genericRequestAuth(`${base_url}/User/UserInfo`, 'GET')
    return result
  } catch (error: any) {
    await handleError(error, 'getUserByIdService')
  }
}

export const updateUserService = async (userId: number, userData: any) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/User/UpdateUser/${userId}`,
      'PATCH',
      userData,
    )
    return response
  } catch (error: any) {
    await handleError(error, 'updateUserService')
  }
}

//Servicion para obtener Workshop
export const getWorkshopsService = async () => {
  try {
    const response = await genericRequestAuth(`${base_url}/Workshop/AllWorkshops`, 'GET')
    return response.data
  } catch (error: any) {
    await handleError(error, 'getWorkshopsService')
  }
}

//Servicios Para los comentarios
export const getCommentsByWorkshopIdService = async (id_workshop_id: number) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/Comment/CommentByWorkshopId/${id_workshop_id}`,
      'GET',
    )
    console.log('datos de respuetas', response.data)
    return response.data
  } catch (error: any) {
    await handleError(error, 'getCommentsByWorkshopIdService')
  }
}

//crear comentario
export const createCommentService = async (commentData: {
  comment: string
  id_workshop_id: number
}) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/Comment/CreateComment`,
      'POST',
      commentData,
    )
    return response.data
  } catch (error: any) {
    await handleError(error, 'createCommentService')
  }
}

//Editar Comentario
export const updateCommentService = async (
  id_comment: number,
  updatedComment: { comment: string },
) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/Comment/UpdateComment/${id_comment}`,
      'PUT',
      updatedComment,
    )
    return response.data
  } catch (error: any) {
    await handleError(error, 'updateCommentService')
  }
}

//Eliminar Comentario
export const deleteCommentService = async (id_comment: number) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/Comment/DeleteComment/${id_comment}`,
      'DELETE',
    )
    return response.data
  } catch (error: any) {
    await handleError(error, 'deleteCommentService')
  }
}

export const subscribeWorkshopService = async (subscriptionData: { id_workshop_id: number }) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/Subscription/Subscribe`,
      'POST',
      subscriptionData,
    )
    return response.data
  } catch (error: any) {
    await handleError(error, 'subscribeWorkshopService')
  }
}

export const fetchCalendarsByWorkshopIdService = async (id_workshop_id: number) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/Calendar/CalendarsByWorkshopId/${id_workshop_id}`,
      'GET',
    )
    return response.data || []
  } catch (error: any) {
    await handleError(error, 'subscribeWorkshopService')
  }
}

//Services de mis Talleres
export const fetchProgressionService = async () => {
  try {
    const response = await genericRequestAuth(`${base_url}/Progression/ProgressionsByUserId`, 'GET',)
    return response.data
  } catch (error) {
    await handleError(error, 'fetchProgressionService')
  }
}

//Servicios para Los tipos de Talleres
export const getTypeService = async () => {
  try {
    const response = await genericRequestAuth(`${base_url}/Type/AllTypes`, 'GET')
    return response.data
  } catch (error: any) {
    await handleError(error, 'getTypeService')
  }
}
