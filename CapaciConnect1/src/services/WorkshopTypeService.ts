import { genericRequestAuth } from '@/utils/genericRequest'
import router from '@/router'
import type { AxiosError } from 'axios'
import type { WorkshopType, WorkshopTypeDTO } from '@/interfaces/workshopTypesInterface'

const API_BASE_URL = import.meta.env.VITE_ENDPOINT_API

export class WorkshopTypeService {
  private readonly baseUrl: string

  constructor() {
    if (!API_BASE_URL) {
      throw new Error('VITE_ENDPOINT_API no está definido en las variables de entorno')
    }
    this.baseUrl = `${API_BASE_URL}/Type`
  }

  private handleError(error: unknown, defaultMessage: string): never {
    const axiosError = error as AxiosError

    if (axiosError.response?.status === 401) {
      router.push('/login')
    }

    throw new Error((axiosError.response?.data as { message?: string })?.message || defaultMessage)
  }

  async getAllTypes(): Promise<WorkshopType[]> {
    try {
      const response = await genericRequestAuth(`${this.baseUrl}/AllTypes`, 'GET')
      return response.data
    } catch (error) {
      this.handleError(error, 'Error al obtener los tipos de taller')
    }
  }

  async createType(typeData: WorkshopTypeDTO): Promise<WorkshopType> {
    try {
      const response = await genericRequestAuth(`${this.baseUrl}/CreateType`, 'POST', typeData)
      return response.data
    } catch (error) {
      this.handleError(error, 'Error al crear el tipo de taller')
    }
  }

  async deleteType(id: number): Promise<void> {
    try {
      await genericRequestAuth(`${this.baseUrl}/DeleteType/${id}`, 'DELETE')
    } catch (error) {
      this.handleError(error, 'Error al eliminar el tipo de taller')
    }
  }
}

export const workshopTypeService = new WorkshopTypeService()
