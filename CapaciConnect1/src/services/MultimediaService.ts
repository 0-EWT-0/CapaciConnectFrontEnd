import type { IMultimedia } from '@/interfaces/IMultimedia'
import { genericRequestAuth } from '@/utils/genericRequest'

const base_url =
  import.meta.env.VITE_ENDPOINT_API_MULTIMEDIA || 'https://localhost:44368/api/Multimedia'

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

export const createMultimedia = async (multimediaData: IMultimedia) => {
  try {
    const response = await genericRequestAuth(
      `${base_url}/CreateMultimedia`,
      'POST',
      multimediaData,
    )
    return response.data
  } catch (error: any) {
    await handleError(error, 'createMultimedia')
  }
}

export const getAllMultimedia = async (): Promise<any> => {
  return await genericRequestAuth(`${base_url}/AllMultimedia`, 'GET')
}

export const deleteMultimedia = async (id_multimedia: number): Promise<any> => {
  return await genericRequestAuth(`${base_url}/DeleteMultimedia/${id_multimedia}`, 'DELETE')
}
