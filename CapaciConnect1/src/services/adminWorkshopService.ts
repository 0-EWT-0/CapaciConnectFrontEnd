import { genericRequestAuth } from '@/utils/genericRequest'
import type { Workshop } from '@/interfaces/Workshop'

const base_url = 'https://localhost:44368/api'


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

export const WorkshopService = {
  async getAllWorkshops(): Promise<Workshop[]> {
    try {
      const response = await genericRequestAuth(
        `${base_url}/Workshop/AllWorkshops`,
        'GET'
      )
      return response.data
    } catch (error: any) {
      await handleError(error, 'getAllWorkshops')
      throw error
    }
  },

  async createWorkshop(formData: FormData): Promise<Workshop> {
    try {
      const response = await genericRequestAuth(
        `${base_url}/Workshop/CreateWorkshop`,
        'POST',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data
    } catch (error: any) {
      await handleError(error, 'createWorkshop')
      throw error
    }
  },

  async updateWorkshop(workshopId: number, formData: FormData): Promise<Workshop> {
    try {
      const response = await genericRequestAuth(
        `${base_url}/Workshop/UpdateWorkshop/${workshopId}`,
        'PUT',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data
    } catch (error: any) {
      await handleError(error, 'updateWorkshop')
      throw error
    }
  },

  async deleteWorkshop(workshopId: number): Promise<void> {
    try {
      await genericRequestAuth(
        `${base_url}/Workshop/DeleteWorkshop/${workshopId}`,
        'DELETE'
      )
    } catch (error: any) {
      await handleError(error, 'deleteWorkshop')
      throw error
    }
  }
}
