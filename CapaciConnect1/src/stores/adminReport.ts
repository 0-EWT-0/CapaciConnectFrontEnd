import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getAllReports,
  getReportsByWorkshopId,
  createReport as createReportService,
  deleteReport as deleteReportService,
} from '@/services/adminReportService'
//import type { Reporte } from '@/interfaces/Report'
interface Report {
  Id_Report: number
  Tittle: string
  Content: string
  Created_at: string
  Id_user_id: number
  Id_workshop_id: number
}

export const useReportStore = defineStore('report', () => {
  const reports = ref<Reporte[]>([])
  const workshopReports = ref<Report[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchAllReports = async () => {
    isLoading.value = true
    try {
      const response = await getAllReports()
      if (response?.status === 200) {
        reports.value = response.data
      }
    } catch (error: any) {
      error.value = error.message
    } finally {
      isLoading.value = false
    }
  }

  const fetchReportsByWorkshopId = async (workshopId: number) => {
    isLoading.value = true
    try {
      const response = await getReportsByWorkshopId(workshopId)
      if (response?.status === 200) {
        workshopReports.value = response.data
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const createReport = async (reportData: Omit<Report, 'Id_Report' | 'Created_at'>) => {
    isLoading.value = true
    try {
      const response = await createReportService({
        ...reportData,
        Created_at: new Date().toISOString(),
      })
      if (response?.status === 200) {
        reports.value.push(response.data)
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const deleteReport = async (reportId: number) => {
    isLoading.value = true
    try {
      const response = await deleteReportService(reportId)
      if (response?.status === 200) {
        reports.value = reports.value.filter((r) => r.Id_Report !== reportId)
        workshopReports.value = workshopReports.value.filter((r) => r.Id_Report !== reportId)
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    reports,
    workshopReports,
    isLoading,
    error,
    fetchAllReports,
    fetchReportsByWorkshopId,
    createReport,
    deleteReport,
  }
})
