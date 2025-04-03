<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <div class="w-1/2">
      <img :src="img" class="object-cover w-full h-full" />
    </div>
    <div class="bg-[#040273] w-1/2 p-19 flex flex-col justify-center">
      <Form v-bind:validation-schema="validationUser" @submit="handleRegister">
        <div class="py-4">
          <h2 class="text-white">Crear cuenta</h2>
        </div>

        <div class="flex gap-2">
          <div class="py-4 w-1/2">
            <label class="text-white"><h3 class="pb-2">Nombre(s)</h3></label>
            <Field
              v-model="name"
              name="name"
              class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              type="text"
              placeholder="Juan Carlos"
            />
            <ValidationMessage prop="name" />
          </div>

          <div class="py-4 w-1/2">
            <label class="text-white"><h3 class="pb-2">Apellidos</h3></label>
            <Field
              v-model="last_names"
              name="last_names"
              class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              type="text"
              placeholder="Torrez Zapata"
            />
            <ValidationMessage prop="last_names" />
          </div>
        </div>

        <div class="flex gap-2">
          <div class="pb-4 w-1/2">
            <label class="text-white"><h3 class="pb-2">Correo</h3></label>
            <Field
              v-model="email"
              name="email"
              class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              type="email"
              placeholder="correo@gmail.com"
            />
            <ValidationMessage prop="email" />
          </div>
          <div class="pb-4 w-1/2">
            <label class="text-white"><h3 class="pb-2">Teléfono</h3></label>
            <input
              class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              v-model="phone"
              type="tel"
              name="phone"
              id="phone"
              aria-describedby="phone-description"
            />
            <h3 class="text-[#DC2626] font-bold" id="phone-description" v-if="phoneError">
              {{ phoneError }}
            </h3>
          </div>
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

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Confirmar contraseña</h3></label>
          <Field
            v-model="confirmpassword"
            name="confirmpassword"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="password"
            placeholder="••••••••"
          />
          <ValidationMessage prop="confirmpassword" />
        </div>

        <div class="pb-4 w-auto">
          <BaseButton variant="blue" @click="validatePhone" :disabled="isLoading">
            {{ isLoading ? 'Creando cuenta...' : 'Crear cuenta' }}
          </BaseButton>
        </div>

        <div class="pb-4 text-center">
          <p class="text-white">
            ¿Ya tienes una cuenta? Inicia sesión
            <router-link :to="'/login'" class="text-[#2563EB]">aquí</router-link>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/imgs/imgRegister.webp'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import { validationUser } from '@/schemas/validations'
import { Form, Field } from 'vee-validate'
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const last_names = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()

const iti = ref({})
const phoneError = ref('')
const error = ref('')

const showLoadingAlert = () => {
  Swal.fire({
    title: 'Creando cuenta',
    html: 'Por favor espere...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

const handleRegister = async () => {
  try {
    isLoading.value = true
    showLoadingAlert()

    // Validar teléfono primero
    validatePhone()
    if (phoneError.value) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor corrige el número de teléfono',
        icon: 'error',
        confirmButtonColor: '#DC2626'
      })
      return
    }

    await authStore.register(
      name.value,
      last_names.value,
      phone.value,
      email.value,
      password.value,
      confirmpassword.value
    )

    // Registro exitoso
    Swal.fire({
      title: '¡Cuenta creada!',
      text: 'Tu cuenta ha sido creada exitosamente',
      icon: 'success',
      confirmButtonColor: '#2563EB',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      // Redirigir al login o dashboard según tu flujo
      router.push('/login')
    })

  } catch (error) {
    console.error('Error during register:', error)

    let errorMessage = 'Ocurrió un error al crear la cuenta'

    // Personalizar mensajes según el tipo de error
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = error.response.data.message || 'Datos inválidos'
          break
        case 409:
          errorMessage = 'El correo electrónico ya está registrado'
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
    Swal.close()
  }
}

onMounted(() => {
  const input = document.querySelector('#phone')
  iti.value = intlTelInput(input, {
    loadUtils: () => import('../../node_modules/intl-tel-input/build/js/utils.js'),
    initialCountry: 'MX',
    containerClass: 'w-full text-[#565656]',
  })
})

const validatePhone = () => {
  phoneError.value = ''
  error.value = ''

  if (!iti.value.isValidNumber()) {
    error.value = iti.value.getValidationError()

    if (error.value == 2) {
      phoneError.value = 'Número demasiado corto'
    } else if (error.value == 3) {
      phoneError.value = 'Número demasiado largo'
    } else {
      phoneError.value = 'Número de teléfono inválido'
    }
    return false
  }
  return true
}
</script>

<style scoped>
.iti {
  --iti-path-flags-1x: url('../../node_modules/intl-tel-input/build/img/flags.webp');
  --iti-path-flags-2x: url('../../node_modules/intl-tel-input/build/img/flags@2x.webp');
  --iti-path-globe-1x: url('../../node_modules/intl-tel-input/build/img/globe.webp');
  --iti-path-globe-2x: url('../../node_modules/intl-tel-input/build/img/globe@2x.webp');
}
</style>
