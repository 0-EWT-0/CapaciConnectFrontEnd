import { genericRequestAuth } from '@/utils/genericRequest'
import router from '@/router'
import type { AxiosError } from 'axios'
import type { WorkshopType, WorkshopTypeDTO } from '@/interfaces/workshopTypesInterface'

export class WorkshopTypeService {
  private baseUrl = 'https://localhost:44368/api/Type'

  async getAllTypes(): Promise<WorkshopType[]> {
    try {
      const response = await genericRequestAuth(`${this.baseUrl}/AllTypes`, 'GET')
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response?.status === 401) {
        router.push('/login')
      }

      throw new Error(
        (axiosError.response?.data as { message?: string })?.message ||
          'Error al obtener los tipos de taller',
      )
    }
  }

  async createType(typeData: WorkshopTypeDTO): Promise<WorkshopType> {
    try {
      const response = await genericRequestAuth(`${this.baseUrl}/CreateType`, 'POST', typeData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response?.status === 401) {
        router.push('/login')
      }

      throw new Error(
        (axiosError.response?.data as { message?: string })?.message ||
          'Error al crear el tipo de taller',
      )
    }
  }

  async deleteType(id: number): Promise<void> {
    try {
      await genericRequestAuth(`${this.baseUrl}/DeleteType/${id}`, 'DELETE')
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response?.status === 401) {
        router.push('/login')
      }

      throw new Error(
        (axiosError.response?.data as { message?: string })?.message ||
          'Error al eliminar el tipo de taller',
      )
    }
  }
}

export const workshopTypeService = new WorkshopTypeService()
