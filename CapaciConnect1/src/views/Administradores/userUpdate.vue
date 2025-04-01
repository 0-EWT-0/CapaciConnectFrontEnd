<template>
  <div
    class="bg-white shadow-lg rounded-xl text-gray-900 border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6"
  >
    <div class="p-4 sm:p-6 border-b border-gray-200">
      <h2 class="text-xl sm:text-2xl font-semibold">Editar usuario</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="p-4 sm:p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <!-- Nombre -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Nombre</label>
          <input
            v-model="formData.name"
            required
            placeholder="Ej: Juan"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <!-- Apellidos -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Apellidos</label>
          <input
            v-model="formData.last_names"
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
            v-model="formData.email"
            required
            placeholder="Ej: usuario@example.com"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <!-- Teléfono -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700">Teléfono</label>
          <input
            v-model="formData.phone"
            type="tel"
            required
            placeholder=""
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            @input="handlePhoneInput"
            pattern="[0-9]*"
            title="Solo se permiten números"
          />
        </div>

        <!-- Contraseña -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700"
            >Nueva Contraseña</label
          >
          <input
            type="password"
            v-model="formData.password"
            minlength="8"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <!-- Confirmar Contraseña -->
        <div class="space-y-2">
          <label class="block text-sm sm:text-base font-medium text-gray-700"
            >Confirmar Nueva Contraseña</label
          >
          <input
            type="password"
            v-model="formData.confirmPassword"
            minlength="8"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <!-- Descripción -->
      <div class="mb-6 space-y-2">
        <label class="block text-sm sm:text-base font-medium text-gray-700">Descripción</label>
        <textarea
          v-model="formData.description"
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
              <label class="block text-sm sm:text-base font-medium text-gray-700"
                >Imagen de perfil</label
              >
              <div class="flex items-center gap-4">
                <img
                  v-if="profileImagePreview"
                  :src="profileImagePreview"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <input
                  type="file"
                  @change="handleImageChange"
                  accept="image/*"
                  class="w-full text-sm sm:text-base file:mr-3 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-sm file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-end mt-6">
          <button
            type="submit"
            class="w-full md:w-auto px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
            :disabled="isSubmitting || isFetching"
          >
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin mr-2"></i> Actualizando...
            </span>
            <span v-else-if="isFetching">
              <i class="fas fa-spinner fa-spin mr-2"></i> Cargando...
            </span>
            <span v-else>Actualizar usuario</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminUserStore } from '@/stores/adminUser'

const route = useRoute()
const userAdminStore = useAdminUserStore()

// Datos del formulario
const formData = ref({
  name: '',
  last_names: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  description: '',
  profile_img: null as File | null,
})

// Estados
const isSubmitting = ref(false)
const isFetching = ref(false)
const profileImagePreview = ref<string | null>(null)

// Obtener usuario al montar el componente
onMounted(async () => {
  isFetching.value = true
  try {
    const user = await userAdminStore.fetchUserById(route.params.id as string)
    if (user) {
      formData.value = {
        ...formData.value,
        ...user,
        password: '',
        confirmPassword: '',
      }
      if (user.profile_img) {
        profileImagePreview.value = user.profile_img
      }
    }
  } catch (error) {
    console.error('Error al cargar usuario:', error)
  } finally {
    isFetching.value = false
  }
})

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const cleanedValue = input.value.replace(/\D/g, '')
  formData.value.phone = cleanedValue
}

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    formData.value.profile_img = input.files[0]
    profileImagePreview.value = URL.createObjectURL(input.files[0])
  }
}

const validateForm = () => {
  if (formData.value.password && formData.value.password !== formData.value.confirmPassword) {
    alert('Las contraseñas no coinciden')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const formPayload = new FormData()
    formPayload.append('name', formData.value.name)
    formPayload.append('last_names', formData.value.last_names)
    formPayload.append('email', formData.value.email)
    formPayload.append('phone', formData.value.phone)
    formPayload.append('description', formData.value.description)

    if (formData.value.password) {
      formPayload.append('password', formData.value.password)
    }

    if (formData.value.profile_img) {
      formPayload.append('Profile_img', formData.value.profile_img)
    }

    await userAdminStore.updateUserProfile(Number(route.params.id), formPayload)
    alert('Usuario actualizado exitosamente!')
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
