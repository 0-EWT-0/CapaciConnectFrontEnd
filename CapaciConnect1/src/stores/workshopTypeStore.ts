import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WorkshopType, WorkshopTypeDTO } from '@/interfaces/workshopTypesInterface'
import { workshopTypeService } from '@/services/WorkshopTypeService'

export const useWorkshopTypeStore = defineStore('workshopType', () => {
  const types = ref<WorkshopType[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAllTypes() {
    try {
      isLoading.value = true
      error.value = null
      types.value = await workshopTypeService.getAllTypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load types'
      console.error('Error fetching types:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function createType(typeName: string) {
    try {
      isLoading.value = true
      error.value = null
      const newType = await workshopTypeService.createType({
        type_name: typeName
      })
      await fetchAllTypes()
      return newType
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create type'
      console.error('Error creating type:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function deleteType(id: number) {
    try {
      isLoading.value = true
      error.value = null
      await workshopTypeService.deleteType(id)
      await fetchAllTypes() 
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete type'
      console.error('Error deleting type:', err)
      throw err
    } finally {
      isLoading.value = false
    }
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
