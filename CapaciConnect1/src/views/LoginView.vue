<template>
  <div class="w-screen h-screen flex">
    <div class="w-1/2">
      <img :src="img" class="object-cover w-full h-full" />
    </div>
    <div class="bg-[#040273] w-1/2 p-19 flex flex-col justify-center">
      <Form :validation-schema="validationUserLogin" @submit="handleLogin">
        <div class="py-4">
          <h2 class="text-white">Iniciar sesión</h2>
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Correo electrónico</h3></label>
          <Field
            v-model="email"
            name="email"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="email"
            placeholder="correo@gmail.com"
          />
          <ValidationMessage prop="email" />
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Contraseña</h3></label>
          <Field
            v-model="password"
            name="password"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="password"
            placeholder="••••••••"
          />
          <ValidationMessage prop="password" />
        </div>

        <div class="pb-4 w-auto">
          <BaseButton variant="blue" :disabled="isLoading">
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </BaseButton>
        </div>

        <div class="pb-4 text-center">
          <p class="text-white">
            ¿No tienes una cuenta? Crea una
            <router-link :to="'/register'" class="text-[#2563EB]">aquí</router-link>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/imgs/imgLogin.webp'
import BaseButton from '@/components/common/BaseButton.vue'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import { validationUserLogin } from '@/schemas/validations'
import { useAuthStore } from '@/stores/auth'
import { Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'
import Swal from 'sweetalert2'

const loadingStore = useLoadingStore()
const isLoading = ref(false)

const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const showLoadingAlert = () => {
  Swal.fire({
    title: 'Iniciando sesión',
    html: 'Por favor espere...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

const handleLogin = async () => {
  try {
    isLoading.value = true
    showLoadingAlert()

    await authStore.login(email.value, password.value)

    // Cerrar alerta de carga y mostrar éxito
    Swal.fire({
      title: '¡Bienvenido!',
      text: 'Has iniciado sesión correctamente',
      icon: 'success',
      confirmButtonColor: '#2563EB',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      // Redirección después del login exitoso
      // (esto debería manejarlo tu store de auth probablemente)
      window.location.href = '/dashboard'
    })

  } catch (error) {
    console.error('Error during login:', error)

    let errorMessage = 'Ocurrió un error al iniciar sesión'

    // Personalizar mensajes según el tipo de error
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = 'Credenciales incorrectas'
          break
        case 403:
          errorMessage = 'Cuenta no verificada'
          break
        case 404:
          errorMessage = 'Usuario no encontrado'
          break
        case 500:
          errorMessage = 'Error del servidor, intente más tarde'
          break
      }
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonColor: '#DC2626'
    })

  } finally {
    isLoading.value = false
    loadingStore.stopLoading()
  }
}
</script>
