import { genericRequest, genericRequestAuth } from '@/utils/genericRequest'

const base_url = 'https://localhost:44368/api'

export const getAllReports = async () => {
  try {
    const result = await genericRequestAuth(`${base_url}/Report/AllReports`, 'GET')
    return result
  } catch (error: any) {
    await handleError(error, 'getAllReports')
  }
}

export const getReportsByWorkshopId = async (workshopId: number) => {
  try {
    const result = await genericRequestAuth(
      `${base_url}/Report/ReportsByWorkshopId/${workshopId}`,
      'GET'
    )
    return result
  } catch (error: any) {
    await handleError(error, 'getReportsByWorkshopId')
  }
}

export const createReport = async (reportData: {
  tittle: string
  content: string
  id_user_id: number
  id_workshop_id: number
}) => {
  try {
    const result = await genericRequestAuth(
      `${base_url}/Report/CreateReport`,
      'POST',
      reportData
    )
    return result
  } catch (error: any) {
    await handleError(error, 'createReport')
  }
}

export const deleteReport = async (reportId: number) => {
  try {
    const result = await genericRequestAuth(
      `${base_url}/Report/DeleteReport/${reportId}`,
      'DELETE'
    )
    return result
  } catch (error: any) {
    await handleError(error, 'deleteReport')
  }
}
