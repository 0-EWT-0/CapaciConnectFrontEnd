import { genericRequest, genericRequestAuth } from '@/utils/genericRequest'


const base_url = 'https://localhost:44368/api'

export interface User {
  Id_user: number
  Name: string
  Last_names: string
  Phone: string
  Email: string
  Profile_img: string | null
  Description: string | null
  Created_at: string
  Id_rol_id: number
  Password?: string // Solo para creación/actualización
}

const handleError = async (error: any, context: string) => {
    const errorMessage = `Error during ${context}: ${error.message}`
    console.error(errorMessage)
 
    const errorDetails = {
      response: error.response
        ? {
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers,
          }
        : null,
      request: error.request || null,
      message: error.message,
    }
 
    await console.error('error', errorMessage, errorDetails)
    throw error
  }

export const adminUserService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await genericRequestAuth(`${base_url}/User/AllUsers`, 'GET')
      return response.data
    } catch (error: any) {
      await handleError(error, 'getUsers')
      throw error
    }
  },

  async getUserById(userId: number): Promise<User> {
    try {
      const response = await genericRequestAuth(`${base_url}/User/UserById/${userId}`, 'GET')
      return response.data
    } catch (error: any) {
      await handleError(error, 'getUserById')
      throw error
    }
  },

  async getCurrentUserInfo(): Promise<User> {
    try {
      const response = await genericRequestAuth(`${base_url}/User/UserInfo`, 'GET')
      return response.data
    } catch (error: any) {
      await handleError(error, 'getCurrentUserInfo')
      throw error
    }
  },

  async updateAdminUser(userId: number, roleId: number): Promise<User> {
    try {
      const response = await genericRequestAuth(
        `${base_url}/User/UpdateUserAdmin/${userId}`,
        'PUT',
        { Id_rol_id: roleId }
      )
      return response.data
    } catch (error: any) {
      await handleError(error, 'updateAdminUser')
      throw error
    }
  },

  async createUser(userData: FormData): Promise<User> {
    try {
      const response = await genericRequest(`${base_url}/Auth/register`, 'POST', userData)
      return response.data
    } catch (error: any) {
      await handleError(error, 'createUser')
      throw error
    }
  },

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await genericRequestAuth(
        `${base_url}/User/UpdateUser/${userId}`,
        'PATCH',
        userData
      )
      return response.data
    } catch (error: any) {
      await handleError(error, 'updateUser')
      throw error
    }
  },

  async deleteUser(userId: number): Promise<void> {
    try {
      await genericRequestAuth(
        `${base_url}/User/DeleteUser/${userId}`,
        'DELETE'
      )
    } catch (error: any) {
      await handleError(error, 'deleteUser')
      throw error
    }
  }
}