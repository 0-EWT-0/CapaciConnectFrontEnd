import type { WorkshopType, WorkshopTypeDTO } from '@/interfaces/workshopTypesInterface'

const BASE_URL = 'https://localhost:44368/api/Type'

export class WorkshopTypeService {
  async getAllTypes(): Promise<WorkshopType[]> {
    const response = await fetch(`${BASE_URL}/AllTypes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch workshop types')
    }

    return await response.json()
  }
  async createType(typeData: WorkshopTypeDTO): Promise<WorkshopType> {
    const token = localStorage.getItem('token') // Asegúrate de obtener el token válido

    const response = await fetch(`${BASE_URL}/CreateType`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agrega el token aquí
      },
      body: JSON.stringify(typeData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create type')
    }

    return await response.json()
  }

  async deleteType(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/DeleteType/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete type')
    }
  }
}

export const workshopTypeService = new WorkshopTypeService()
