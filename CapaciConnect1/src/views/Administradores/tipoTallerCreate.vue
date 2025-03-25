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
            v-model="formData.nombre"
            type="text"
            placeholder="Ej: Pintura Abstracta"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
        </div>

        <!-- Botón de envió -->
        <div class="border-t border-gray-100 pt-6">
          <button
            type="submit"
            class="w-full sm:w-auto px-8 py-3 text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors font-medium shadow-md hover:shadow-emerald-100"
          >
            <span class="text-sm sm:text-base">Crear tipo</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FormData {
  nombre: string
}

const formData = ref<FormData>({
  nombre: '',
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  console.log('Datos del formulario:', formData.value)
}
</script>
