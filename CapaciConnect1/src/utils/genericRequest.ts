import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const genericRequest = async (url: string, method: string, body?: any) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    })
    return response
  } catch (error: any) {
    console.error('Error in genericRequest:', error)
    throw error
  }
}

export const genericRequestAuth = async (url: string, method: string, body?: any) => {
  const authStore = useAuthStore()
  const token = authStore.token // obtiene el token del authStore de la repsuesta del login

  try {
    const response = await axios({
      url: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, //pasa el token
      },
      data: body,
    })
    return response
  } catch (error: any) {
    console.error('Error in genericRequestAuth:', error)
    throw error
  }
}
