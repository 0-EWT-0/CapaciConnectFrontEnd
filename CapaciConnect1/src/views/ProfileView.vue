<template>
  <Navbar />

  <div class="bg-[#F2F5FA] p-19">
    <h2 class="text-[#212122]">Perfil</h2>
    <p class="text-[#212122]">Actualiza tu información personal</p>

    <div>
      <Form :validationSchema="validationUserProfile" @submit="guardarCambios" class="mt-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Columna de imagen de perfil -->
          <div class="flex flex-col items-center gap-6 bg-white rounded-lg p-4">
            <div class="relative">
              <img
                src="../assets/imgs/userAvatar.webp"
                alt="UserImage"
                class="w-32 h-32 object-cover rounded-full"
              />
            </div>
            <div class="space-y-2 w-[15rem] text-center">
              <div class="field">
                <label class="text-white"><h3 class="pb-2 text-[#212122]">Nombre(s)</h3></label>
                <Field
                  name="name"
                  v-model="usuario.nombre"
                  class="bg-[#F2F5FA] text-center text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                />
                <ValidationMessage prop="name" />
              </div>
              <div class="field">
                <label class="text-white"><h3 class="pb-2 text-[#212122]">Apellidos</h3></label>
                <Field
                  name="last_names"
                  v-model="usuario.apellido"
                  class="bg-[#F2F5FA] text-center text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                />
                <ValidationMessage prop="last_names" />
              </div>
              <div class="field">
                <label class="text-white"><h3 class="pb-2 text-[#212122]">Correo</h3></label>
                <Field
                  name="email"
                  v-model="usuario.email"
                  type="email"
                  class="bg-[#F2F5FA] text-center text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                />
                <ValidationMessage prop="email" />
              </div>
              <div class="field">
                <!-- <label class="text-white"><h3 class="pb-2 text-[#212122]">Teléfono</h3></label>
                <input
                  mask="(999) 999-9999"
                  v-model="usuario.telefono"
                  placeholder="998 144 1712"
                  class="bg-[#F2F5FA] text-center text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                /> -->
                <label class="text-white"><h3 class="pb-2 text-[#212122]">Teléfono</h3></label>
                <input
                  class="bg-[#F2F5FA] text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                  v-model="usuario.phone"
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
            <!-- <p class="text-center">
                <span class="text-blue-600 font-semibold">{{ usuario.id_rol_id }}</span>
              </p> -->
          </div>

          <!-- Columna de descripción -->
          <div class="col-span-2 bg-white rounded-lg p-4">
            <div class="p-1">
              <div class="field">
                <label class="text-white"><h3 class="pb-2 text-[#212122]">Descripción</h3></label>
                <Field
                  as="textarea"
                  name="description"
                  rows="6"
                  v-model="usuario.descripcion"
                  autoResize
                  class="bg-[#F2F5FA] text-[#565656] rounded-lg w-full p-4 focus:outline-0"
                  placeholder="Cuéntanos un poco sobre ti..."
                />
                <ValidationMessage prop="description" />
              </div>
              <p class="text-[#212122] mt-4">
                Se unió el
                <span class="text-[#2563EB]">{{ formatDate(usuario.created_at) }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <!-- <BaseButton class="text-white" variant="gray" @click="cancelarEdicion"
            >Cancelar</BaseButton
          > -->
          <BaseButton variant="green" @click="validatePhone">Actualizar información</BaseButton>
        </div>
      </Form>
    </div>
  </div>

  <div class="p-19">
    <h2 class="text-xl font-bold mt-10 text-black">Talleres completados</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      <div v-for="index in 6" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Cinta de cerrado -->
        <div class="bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-t-lg">Cerrado</div>

        <!-- Imagen -->
        <img
          src="../assets/imgs/workshopBanner.webp"
          alt="Imagen del taller"
          class="w-full h-40 object-cover"
        />

        <!-- Contenido -->
        <div class="p-4">
          <h2 class="text-lg font-bold">Título del taller</h2>
          <p class="text-gray-600 text-sm">Descripción del taller de manera resumida</p>
          <p class="text-blue-600 font-semibold mt-2">Tipo de taller</p>

          <!-- Barra de progreso -->
          <div class="bg-gray-200 h-6 rounded-full mt-4 flex items-center">
            <div
              class="bg-green-500 text-white text-xs font-bold text-center px-2 rounded-full"
              style="width: 100%"
            >
              100% Completado
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import Footer from '@/components/global/Footer.vue'
import { reactive, onMounted, watchEffect, ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import { useAuthStore } from '@/stores/authStore.js'
import Navbar from '@/components/global/Navbar.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Swal from 'sweetalert2'
import { Field, Form } from 'vee-validate'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import { validationUserProfile } from '@/schemas/validations'

import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'

const iti = ref({})
const phoneError = ref('')
const error = ref('')

const userStore = useUserStore()
const authStore = useAuthStore()

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  await userStore.getUserInfo()
  const userInfo = userStore.user
  const userId = userStore.user.id_user
  console.log('user', userInfo)
  console.log('userId', userId)

  const input = document.querySelector('#phone')
  iti.value = intlTelInput(input, {
    loadUtils: () => import('../../node_modules/intl-tel-input/build/js/utils.js'),
    initialCountry: 'MX',
    containerClass: 'w-full text-[#565656]',
  })
})

// Estado del usuario
const usuario = reactive({
  Id: undefined,
  nombre: '',
  apellido: '',
  email: '',
  phone: '',
  descripcion: '',
  id_rol_id: '',
  created_at: '',
})

watchEffect(() => {
  if (userStore.user) {
    usuario.Id = userStore.user.id_user || undefined
    usuario.nombre = userStore.user.name || ''
    usuario.apellido = userStore.user.last_names || ''
    usuario.email = userStore.user.email || ''
    usuario.phone = userStore.user.phone || ''
    usuario.descripcion = userStore.user.description || ''
    usuario.id_rol_id = userStore.user.id_rol_id || ''
    usuario.created_at = userStore.user.created_at || ''
  }
})

const guardarCambios = async () => {
  validatePhone()

  if (phoneError.value) {
    Swal.fire({
      title: 'Error',
      text: 'Ingresa un número de teléfono válido',
      icon: 'error',
      confirmButtonColor: '#2563EB',
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
    return
  }

  if (!usuario.nombre || !usuario.apellido || !usuario.email || !usuario.phone) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, completa todos los campos requeridos',
      icon: 'error',
      confirmButtonColor: '#2563EB',
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
    return
  }

  try {
    const IDuser = usuario.Id
    const response = await userStore.updateUser(IDuser, {
      name: usuario.nombre,
      last_names: usuario.apellido,
      email: usuario.email,
      phone: usuario.phone,
      description: usuario.descripcion,
    })

    if (response && response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Información actualizada',
        showConfirmButton: false,
        timer: 1500,
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
    } else {
      console.log('Error al actualizar: ' + (response.message || 'Respuesta inesperada'))
    }
  } catch (error) {
    console.error('Error al guardar cambios:', error)
    Swal.fire({
      title: 'Error',
      text: 'No se pudo actualizar tu información',
      icon: 'error',
      confirmButtonColor: '#2563EB',
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
  }
}

const validatePhone = () => {
  phoneError.value = ''
  error.value = ''

  if (!iti.value.isValidNumber()) {
    error.value = iti.value.getValidationError()

    if (error.value == 2) {
      phoneError.value = 'Demasaido corto'
    } else if (error.value == 3) {
      phoneError.value = 'Demasiado largo'
    } else {
      phoneError.value = 'Número inválido'
    }
  }
}

const cancelarEdicion = () => {
  if (userStore.user) {
    usuario.nombre = userStore.user.name || ''
    usuario.apellido = userStore.user.last_names || ''
    usuario.email = userStore.user.email || ''
    usuario.phone = userStore.user.phone || ''
    usuario.descripcion = userStore.user.description || ''
  }
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
