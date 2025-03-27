import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getAllReports,
  getReportsByWorkshopId,
  createReport as createReportService,
  deleteReport as deleteReportService
} from '@/services/adminReportService'
import type { Reporte } from '@/interfaces/Report'
import { workshopTypeService, WorkshopTypeService } from '@/services/WorkshopTypeService'

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
        reports.value = response.data.map((dbReport: any) => ({
          id_Report: dbReport.id_Report,
          tittle: dbReport.tittle,
          content: dbReport.content,
          created_at: new Date(dbReport.created_at).toLocaleDateString(),
          id_workshop_id: dbReport.id_workshop_id, // Asegurar que el backend incluya estos datos
          workshop_name: dbReport.Workshop?.type_name || 'Taller no disponible'
        }))
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

  const createReport = async (reportData: Omit<Reporte, 'id_Report' | 'created_at'>) => {
    isLoading.value = true
    error.value = null
    try {
      // Transformar a formato del API
      const transformedData = {
        tittle: reportData.tittle,
        content: reportData.content,
        id_workshop_id: reportData.id_workshop_id,
        id_user_id: reportData.id_user_id
      }

      const response = await createReportService(transformedData)

      if (response?.status === 200) {
        await fetchAllReports()
        await workshopTypeService.getAllTypes()
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al crear el reporte'
    } finally {
      isLoading.value = false
    }
  }


  const deleteReport = async (reportId: number) => {
    isLoading.value = true
    try {
      const response = await deleteReportService(reportId)
      if (response?.status === 200) {
        reports.value = reports.value.filter(r => r.Id_Report !== reportId)
        workshopReports.value = workshopReports.value.filter(r => r.Id_Report !== reportId)
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
    deleteReport
  }
})
