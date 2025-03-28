import type { IWorkshop } from '@/interfaces/IWorkshop'
import { genericRequestAuth } from '@/utils/genericRequest'

const base_url =
  import.meta.env.VITE_ENDPOINT_API_WORKSHOP || 'https://localhost:44368/api/Workshop'

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

export const createWorkshop = async (workshopData: IWorkshop) => {
  try {
    const response = await genericRequestAuth(`${base_url}/CreateWorkshop`, 'POST', workshopData)
    return response.data
  } catch (error: any) {
    await handleError(error, 'createWorkshop')
  }
}

export const getAllWorkshop = async (): Promise<any> => {
  return await genericRequestAuth(`${base_url}/AllWorkshops`, 'GET')
}

export const deleteWorkshop = async (id_workshop: number): Promise<any> => {
  return await genericRequestAuth(`${base_url}/DeleteWorkshop/${id_workshop}`, 'DELETE')
}


export const updateWorkshop = async (id_workshop: number, workshopData: IWorkshop) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/UpdateWorkshop/${id_workshop}`,
      'PUT',
      workshopData
    )
    return response.data
  } catch (error: any) {
    await handleError(error, 'updateWorkshop')
  }
}
