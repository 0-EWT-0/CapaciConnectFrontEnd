<template>
  <div class="bg-[#F2F5FA] shadow-xl rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-6">
      <h2 class="text-2xl font-semibold text-gray-900">Crear categoría</h2>
    </div>

    <Form :validation-schema="validationTypes" @submit="handleSubmit" class="p-6">
      <div class="space-y-6">
        <!-- Campo Nombre -->
        <div class="space-y-3">
          <label class="text-[#212122]"><h3 class="pb-2">Nombre</h3></label>
          <Field
            name="name"
            id="nombre"
            v-model="formData.type_name"
            type="text"
            placeholder="Ej: Pintura Abstracta"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            required
            :disabled="isLoading"
          />
          <ValidationMessage prop="name" />
        </div>

        <!-- Mensaje de error -->
        <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded-lg">
          {{ error }}
        </div>

        <!-- Mensaje de éxito -->
        <div v-if="successMessage" class="p-3 bg-green-100 text-[#047857] rounded-lg">
          {{ successMessage }}
        </div>

        <!-- Botón de envió -->
        <div class="border-t border-gray-100 pt-6">
          <BaseButton variant="blue" :disabled="isLoading">
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
            <span v-else>Crear</span>
          </BaseButton>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'
import type { WorkshopTypeDTO } from '@/interfaces/workshopTypesInterface'
import BaseButton from '@/components/common/BaseButton.vue'
import { Field, Form } from 'vee-validate'
import { validationTypes } from '@/schemas/validations'
import ValidationMessage from '@/components/common/ValidationMessage.vue'

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
    successMessage.value = 'Categoría  creada'
    formData.value.type_name = ''
  } catch (err) {
    error.value = 'Error al crear la categoría'
    console.error('Error creating workshop type:', err)
  } finally {
    isLoading.value = false
  }
}
</script>
