import { defineStore } from 'pinia'
import { ref } from 'vue'
import { WorkshopService } from '@/services/adminWorkshopService'
import type { Workshop } from '@/interfaces/Workshop'


export const useWorkshopStore = defineStore('workshop', () => {
  const workshops = ref<Workshop[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchWorkshops = async () => {
    isLoading.value = true
    try {
      const data = await WorkshopService.getAllWorkshops()
      workshops.value = data
      console.log(data)
      error.value = null
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const createWorkshop = async (formData: FormData) => {
    isLoading.value = true
    try {
      const newWorkshop = await WorkshopService.createWorkshop(formData)
      workshops.value.push(newWorkshop)
      error.value = null
      return newWorkshop
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateWorkshop = async (id: number, formData: FormData) => {
    isLoading.value = true
    try {
      const updatedWorkshop = await WorkshopService.updateWorkshop(id, formData)
      const index = workshops.value.findIndex(w => w.Id_workshop === id)
      if (index !== -1) {
        workshops.value.splice(index, 1, updatedWorkshop)
      }
      error.value = null
      return updatedWorkshop
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteWorkshop = async (id: number) => {
    isLoading.value = true
    try {
      await WorkshopService.deleteWorkshop(id)
      workshops.value = workshops.value.filter(w => w.Id_workshop !== id)
      error.value = null
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    workshops,
    isLoading,
    error,
    fetchWorkshops,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop
  }
})
