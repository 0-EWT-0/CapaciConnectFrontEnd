import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WorkshopType, WorkshopTypeDTO } from '@/interfaces/workshopTypesInterface'
import { workshopTypeService } from '@/services/WorkshopTypeService'
import router from '@/router'

export const useWorkshopTypeStore = defineStore('workshopType', () => {
  const types = ref<WorkshopType[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const handleError = (err: unknown, context: string): void => {
    error.value = err instanceof Error ? err.message : `Error al ${context}`

    if (error.value.includes('401')) {
      router.push('/login')
    }
  }

  const withLoading = async <T>(action: () => Promise<T>): Promise<T> => {
    try {
      isLoading.value = true
      error.value = null
      return await action()
    } finally {
      isLoading.value = false
    }
  }

  const fetchAllTypes = async (): Promise<void> => {
    await withLoading(async () => {
      types.value = await workshopTypeService.getAllTypes()
    }).catch(err => {
      handleError(err, 'cargar tipos de taller')
    })
  }

  const createType = async (typeData: WorkshopTypeDTO): Promise<WorkshopType> => {
    if (!typeData.type_name?.trim()) {
      throw new Error('El nombre del tipo es requerido')
    }

    return withLoading(async () => {
      const newType = await workshopTypeService.createType(typeData)
      await fetchAllTypes() // Actualizar la lista
      return newType
    }).catch(err => {
      handleError(err, 'crear tipo de taller')
      throw err
    })
  }

  const deleteType = async (id: number): Promise<void> => {
    await withLoading(async () => {
      await workshopTypeService.deleteType(id)
      await fetchAllTypes() // Actualizar la lista
    }).catch(err => {
      handleError(err, 'eliminar tipo de taller')
      throw err
    })
  }

  return {
    types,
    isLoading,
    error,
    fetchAllTypes,
    createType,
    deleteType,
  }
})
