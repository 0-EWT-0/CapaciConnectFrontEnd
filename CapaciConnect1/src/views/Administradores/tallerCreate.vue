<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-2xl font-semibold text-gray-900">Crear nuevo taller</h3>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="space-y-6">
        <!-- Sección Principal -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <label for="titulo" class="block text-sm font-medium text-gray-700"
              >Título del taller</label
            >
            <input
              id="titulo"
              v-model="formData.titulo"
              placeholder="Ej: Taller de Pintura Moderna"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div class="space-y-3">
            <label for="fechaInicio" class="block text-sm font-medium text-gray-700"
              >Fecha de Inicio</label
            >
            <input
              id="fechaInicio"
              v-model="formData.fechaInicio"
              type="date"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div class="space-y-3 col-span-full">
            <label for="descripcion" class="block text-sm font-medium text-gray-700"
              >Descripción</label
            >
            <textarea
              id="descripcion"
              v-model="formData.descripcion"
              placeholder="Describe el objetivo del taller"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div class="space-y-3">
            <label for="fechaFin" class="block text-sm font-medium text-gray-700"
              >Fecha de Fin</label
            >
            <input
              id="fechaFin"
              v-model="formData.fechaFin"
              type="date"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div class="space-y-3 col-span-full">
            <label for="contenido" class="block text-sm font-medium text-gray-700"
              >Contenido detallado</label
            >
            <textarea
              id="contenido"
              v-model="formData.contenido"
              placeholder="Lista de temas a cubrir"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>
        </div>

        <!-- Sección Configuración -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
          <div class="space-y-4">
            <div class="space-y-3">
              <label for="tipoTaller" class="block text-sm font-medium text-gray-700"
                >Tipo de taller</label
              >
              <input
                id="tipoTaller"
                v-model="formData.tipoTaller"
                placeholder="Ej: Presencial/Virtual"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
              <div class="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="nombreTipo"
                  class="w-4 h-4 border-2 border-gray-300 rounded checked:bg-emerald-500"
                />
                <label for="nombreTipo" class="text-sm text-gray-600"
                  >Mostrar tipo públicamente</label
                >
              </div>
            </div>

            <div class="space-y-3">
              <label for="imagen" class="block text-sm font-medium text-gray-700"
                >Imagen promocional</label
              >
              <input
                id="imagen"
                type="file"
                @change="handleImageChange"
                class="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
              />
              <div class="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="sinImagen"
                  class="w-4 h-4 border-2 border-gray-300 rounded checked:bg-emerald-500"
                />
                <label for="sinImagen" class="text-sm text-gray-600"
                  >Usar imagen predeterminada</label
                >
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-3">
              <label for="instructor" class="block text-sm font-medium text-gray-700"
                >Instructor principal</label
              >
              <input
                id="instructor"
                v-model="formData.instructor"
                placeholder="Ej: Juan Pérez"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
              <div class="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="nombreInstructor"
                  class="w-4 h-4 border-2 border-gray-300 rounded checked:bg-emerald-500"
                />
                <label for="nombreInstructor" class="text-sm text-gray-600"
                  >Mostrar nombre públicamente</label
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-end mt-8">
          <button
            type="submit"
            class="px-8 py-3 text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors font-medium shadow-lg hover:shadow-emerald-200"
          >
            Programar Taller
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FormData {
  titulo: string
  fechaInicio: string
  descripcion: string
  fechaFin: string
  contenido: string
  tipoTaller: string
  instructor: string
  imagen: File | null
}

const formData = ref<FormData>({
  titulo: '',
  fechaInicio: '',
  descripcion: '',
  fechaFin: '',
  contenido: '',
  tipoTaller: '',
  instructor: '',
  imagen: null,
})

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  formData.value.imagen = target.files?.[0] || null
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  console.log('Datos del formulario:', formData.value)
}
</script>
