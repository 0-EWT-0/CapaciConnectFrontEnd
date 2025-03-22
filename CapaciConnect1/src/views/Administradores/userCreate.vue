<template>
  <div class="bg-white shadow-lg rounded-xl text-gray-900 border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-4 sm:p-6 border-b border-gray-200">
      <h2 class="text-xl sm:text-2xl font-semibold">Crear nuevo usuario</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="p-4 sm:p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div v-for="field in mainFields" :key="field.id" class="space-y-2">
          <label :for="field.id" class="block text-sm sm:text-base font-medium text-gray-700">{{ field.label }}</label>
          <input
            type="text"
            :id="field.id"
            v-model="formData[field.name]"
            :placeholder="field.placeholder"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
        </div>
      </div>

      <div class="mb-6 space-y-2">
        <label for="descripcion" class="block text-sm sm:text-base font-medium text-gray-700">Descripción personal</label>
        <textarea
          id="descripcion"
          v-model="formData.descripcion"
          placeholder="Escribe tu biografía..."
          rows="3"
          class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
        ></textarea>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 p-4 sm:p-5 rounded-xl">
          <div class="space-y-4">
            <!-- Sección Rol -->
            <div class="space-y-2">
              <label for="rol" class="block text-sm sm:text-base font-medium text-gray-700">Asignar rol</label>
              <input
                type="text"
                id="rol"
                v-model="formData.rol"
                class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
              <div class="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="nombreRol"
                  v-model="formData.nombreRol"
                  class="w-4 h-4 border-2 border-gray-300 rounded"
                >
                <label for="nombreRol" class="text-sm sm:text-base text-gray-600">Mostrar nombre del rol</label>
              </div>
            </div>

            <!-- Sección Imagen -->
            <div class="space-y-2">
              <label for="imagen" class="block text-sm sm:text-base font-medium text-gray-700">Foto de perfil</label>
              <input
                type="file"
                id="imagen"
                @change="handleImageChange"
                class="w-full text-sm sm:text-base file:mr-3 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-sm file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
              >
              <div class="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="sinImagen"
                  v-model="formData.sinImagen"
                  class="w-4 h-4 border-2 border-gray-300 rounded"
                >
                <label for="sinImagen" class="text-sm sm:text-base text-gray-600">Sin imagen</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón Submit -->
        <div class="flex justify-end mt-6">
          <button
            type="submit"
            class="w-full md:w-auto px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Crear usuario
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface FormData {
  nombre: string
  apellidos: string
  carrera: string
  telefono: string
  descripcion: string
  rol: string
  imagen: File | null
  nombreRol: boolean
  sinImagen: boolean
}

type FormField = {
  id: keyof FormData
  name: keyof FormData
  label: string
  placeholder: string
}

const formData = reactive<FormData>({
  nombre: '',
  apellidos: '',
  carrera: '',
  telefono: '',
  descripcion: '',
  rol: '',
  imagen: null,
  nombreRol: false,
  sinImagen: false,
})

const mainFields: FormField[] = [
  { id: 'nombre', name: 'nombre', label: 'Nombre', placeholder: 'Ej: Juan Carlos' },
  { id: 'apellidos', name: 'apellidos', label: 'Apellidos', placeholder: 'Ej: Pérez García' },
  { id: 'carrera', name: 'carrera', label: 'Carrera', placeholder: 'Ej: Ingeniería Civil' },
  { id: 'telefono', name: 'telefono', label: 'Teléfono', placeholder: 'Ej: +52 55 1234 5678' },
]

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  formData.imagen = input.files?.[0] || null
}

const handleSubmit = () => {
  console.log('Datos del formulario:', formData)
}
</script>
