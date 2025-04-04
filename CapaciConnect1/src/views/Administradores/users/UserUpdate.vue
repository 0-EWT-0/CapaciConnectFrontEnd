<template>
  <div
    class="bg-white shadow-lg rounded-xl text-gray-900 border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6"
  >
    <div class="p-4 sm:p-6 border-b border-gray-200">
      <h2 class="text-xl sm:text-2xl font-semibold">Editar usuario</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="p-4 sm:p-6">
      <!-- Campos del formulario -->
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
            v-model="formData.confirmpassword"
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

      <!-- Botones de acción -->
      <div class="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-6">
        <button
          type="button"
          @click="handleVolver"
          class="w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Volver
        </button>

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
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminUserStore } from '@/stores/adminUserStore'

const route = useRoute()
const router = useRouter()
const userAdminStore = useAdminUserStore()

// Datos del formulario
const formData = ref({
  name: '',
  last_names: '',
  email: '',
  phone: '',
  password: '',
  confirmpassword: '',
  description: '',
  profile_img: null as File | null,
})

// Estados
const isSubmitting = ref(false)
const isFetching = ref(false)
const profileImagePreview = ref<string | null>(null)

// Cargar datos del usuario
onMounted(async () => {
  isFetching.value = true
  try {
    const user = await userAdminStore.fetchUserById(route.params.id as string)
    if (user) {
      formData.value = {
        ...formData.value,
        ...user,
        password: '',
        confirmpassword: '',
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

// Handlers
const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  formData.value.phone = input.value.replace(/\D/g, '')
}

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.[0]) {
    formData.value.profile_img = input.files[0]
    profileImagePreview.value = URL.createObjectURL(input.files[0])
  }
}

const validateForm = () => {
  if (formData.value.password !== formData.value.confirmpassword) {
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
    Object.entries(formData.value).forEach(([key, value]) => {
      if (value !== null && value !== '' && key !== 'confirmpassword') {
        formPayload.append(key, value)
      }
    })

    await userAdminStore.updateUserProfile(Number(route.params.id), formPayload)
    alert('Usuario actualizado exitosamente!')
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Navegación a /adminuser
const handleVolver = () => {
  router.push('/adminuser')
}
</script>
