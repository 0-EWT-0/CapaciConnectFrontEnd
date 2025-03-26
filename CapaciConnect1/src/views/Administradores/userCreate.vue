<template>
  <div class="bg-white shadow-lg rounded-xl text-gray-900 border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-4 sm:p-6 border-b border-gray-200">
      <h2 class="text-xl sm:text-2xl font-semibold">Crear nuevo usuario</h2>
    </div>

    <form @submit.prevent="" class="p-4 sm:p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <!-- Nombre -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Nombre</label>
          <input
            v-model="formData.Name"
            required
            placeholder="Ej: Juan"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <!-- Apellidos -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Apellidos</label>
          <input
            v-model="formData.Last_names"
            required
            placeholder="Ej: Pérez García"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="formData.Email"
            required
            placeholder="Ej: usuario@example.com"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <!-- Teléfono -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Teléfono</label>
          <input
            v-model="formData.Phone"
            type="tel"
            required
            placeholder="Ej: 525512345678"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            @input="handlePhoneInput"
            pattern="[0-9]*"
            title="Solo se permiten números"
          />
        </div>

        <!-- Contraseña -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            v-model="formData.Password"
            required
            minlength="8"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <!-- Confirmar Contraseña -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Confirmar Contraseña</label>
          <input
            type="password"
            v-model="formData.ConfirmPassword"
            required
            minlength="8"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <!-- Descripción -->
      <div class="mb-6 space-y-2">
        <label class="block text-sm sm:text-base font-medium text-gray-700">Descripción</label>
        <textarea
          v-model="formData.Description"
          placeholder="Escribe una descripción..."
          rows="3"
          class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
        ></textarea>
      </div>

      <!-- Imagen de perfil -->
      <div class="space-y-6">
        <div class="bg-gray-50 p-4 sm:p-5 rounded-xl">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm sm:text-base font-medium text-gray-700">Imagen de perfil</label>
              <input
                type="file"
                @change="handleImageChange"
                accept="image/*"
                class="w-full text-sm sm:text-base file:mr-3 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-sm file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
              />
            </div>
          </div>
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-end mt-6">
          <button
            type="submit"
            class="w-full md:w-auto px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin mr-2"></i> Creando...
            </span>
            <span v-else>Crear usuario</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAdminUserStore } from '@/stores/adminUser'

const userStore = useAdminUserStore()

// Datos del formulario
const formData = ref({
  Name: '',
  Last_names: '',
  Email: '',
  Phone: '',
  Password: '',
  ConfirmPassword: '',
  Description: '',
  Profile_img: null as File | null,
})

// Estados
const isSubmitting = ref(false)

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const cleanedValue = input.value.replace(/\D/g, '') // Elimina todos los no numéricos
  formData.value.Phone = cleanedValue
}

// Manejadores
const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    formData.value.Profile_img = input.files[0]
  }
}

const validateForm = () => {
  if (formData.value.Password !== formData.value.ConfirmPassword) {
    alert('Las contraseñas no coinciden')
    return false
  }
  return true
}

// const handleSubmit = async () => {
//   if (!validateForm()) return

//   isSubmitting.value = true

//   try {
//     const formPayload = new FormData()
//     formPayload.append('Name', formData.value.Name)
//     formPayload.append('Last_names', formData.value.Last_names)
//     formPayload.append('Email', formData.value.Email)
//     formPayload.append('Phone', formData.value.Phone)
//     formPayload.append('Password', formData.value.Password)
//     formPayload.append('Description', formData.value.Description)

//     if (formData.value.Profile_img) {
//       formPayload.append('Profile_img', formData.value.Profile_img)
//     }

//     await userStore.addUser(formPayload)

//     // Resetear formulario
//     formData.value = {
//       Name: '',
//       Last_names: '',
//       Email: '',
//       Phone: '',
//       Password: '',
//       ConfirmPassword: '',
//       Description: '',
//       Profile_img: null,
//     }

//     alert('Usuario creado exitosamente!')
//   } catch (error) {
//     console.error('Error al crear usuario:', error)
//   } finally {
//     isSubmitting.value = false
//   }
// }
</script>