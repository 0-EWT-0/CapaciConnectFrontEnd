// stores/userStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { adminUserService, type User} from '@/services/adminUserService'

export const useAdminUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Acciones principales
  const fetchUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      users.value = await adminUserService.getUsers()
    } catch (err: any) {
      error.value = err.message || 'Error al cargar usuarios'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchUserById = async (userId: number) => {
    isLoading.value = true
    try {
      const user = await adminUserService.getUserById(userId)
      currentUser.value = user
      return user
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchCurrentUser = async () => {
    isLoading.value = true
    try {
      currentUser.value = await adminUserService.getCurrentUserInfo()
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateAdminUserRole = async (userId: number, roleId: number) => {
    isLoading.value = true
    try {
      const updatedUser = await adminUserService.updateAdminUser(userId, roleId)
      const index = users.value.findIndex(u => u.Id_user === userId)
      if (index !== -1) users.value[index] = updatedUser
      return updatedUser
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateUserProfile = async (userId: number, userData: Partial<User>) => {
    isLoading.value = true
    try {
      const updatedUser = await adminUserService.updateUser(userId, userData)
      if (currentUser.value?.Id_user === userId) {
        currentUser.value = updatedUser
      }
      return updatedUser
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const removeUser = async (userId: number) => {
    isLoading.value = true
    try {
      await adminUserService.deleteUser(userId)
      users.value = users.value.filter(user => user.Id_user !== userId)
      if (currentUser.value?.Id_user === userId) {
        currentUser.value = null
      }
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar usuario'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const registerUser = async (userData: {
    name: string
    last_names: string
    phone: string
    email: string
    password: string
    confirmpassword: string
  }) => {
    isLoading.value = true
    try {
      const newUser = await adminUserService.createUser(userData)
      users.value.push(newUser)
      return newUser
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    users,
    currentUser,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchUsers,
    fetchUserById,
    fetchCurrentUser,
    updateAdminUserRole,
    updateUserProfile,
    registerUser,
    removeUser
  }
})