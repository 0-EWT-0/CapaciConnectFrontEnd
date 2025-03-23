import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { LoginService, RegisterService, LogoutService } from '@/services/AuthService'
import router from '@/router'
import type { User } from '@/interfaces/User'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({} as User)
  const token = ref('')
  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined)

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      if (response?.status === 200) {
        user.value = response.data
        const token = response.data.token // almacena el tocken de la respuesta
        router.push('/')
      }
    } catch (error: any) {
      console.error('Error in login:', error)
    }
  }

  async function register(
    name: string,
    last_names: string,
    phone: string,
    email: string,
    password: string,
    confirmpassword: string,
  ) {
    try {
      const response = await RegisterService(
        name,
        last_names,
        phone,
        email,
        password,
        confirmpassword,
      )
      if (response?.status === 200) {
        user.value = response.data
        router.push('/login')
      }
    } catch (error: any) {
      console.error('Error in register:', error)
    }
  }

  async function logout() {
    try {
      const response = await LogoutService()
      if (response?.status === 200) {
        user.value = {} as User
        router.push('/')
      }
    } catch (error: any) {
      console.error('Error in logout:', error)
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    login,
    register,
    logout,
  }
})
