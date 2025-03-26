<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-900">Crear tipo de taller</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="space-y-6">
        <!-- Campo Nombre -->
        <div class="space-y-3">
          <label for="nombre" class="block text-sm font-medium text-gray-700">
            Nombre del tipo
          </label>
          <input
            id="nombre"
            v-model="formData.type_name"
            type="text"
            placeholder="Ej: Pintura Abstracta"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            required
            :disabled="isLoading"
          />
        </div>

        <!-- Mensaje de error -->
        <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded-lg">
          {{ error }}
        </div>

        <!-- Mensaje de éxito -->
        <div v-if="successMessage" class="p-3 bg-green-100 text-green-700 rounded-lg">
          {{ successMessage }}
        </div>

        <!-- Botón de envió -->
        <div class="border-t border-gray-100 pt-6">
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full sm:w-auto px-8 py-3 text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors font-medium shadow-md hover:shadow-emerald-100 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="inline-flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Procesando...
            </span>
            <span v-else class="text-sm sm:text-base">Crear tipo</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'
import type { WorkshopTypeDTO } from '@/interfaces/workshopTypesInterface'

const formData = ref<WorkshopTypeDTO>({
  type_name: '',
})

const workshopTypeStore = useWorkshopTypeStore()
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = null
  successMessage.value = null
  isLoading.value = true

  try {
    await workshopTypeStore.createType(formData.value)
    successMessage.value = 'Tipo de taller creado exitosamente!'
    formData.value.type_name = ''
  } catch (err) {
    error.value = 'Error al crear el tipo de taller'
    console.error('Error creating workshop type:', err)
  } finally {
    isLoading.value = false
  }
}
</script>
