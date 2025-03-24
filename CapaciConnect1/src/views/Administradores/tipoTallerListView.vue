<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div
      class="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200"
    >
      <h2 class="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Tipos de talleres</h2>
      <button
        @click="eliminarTodos"
        class="px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-medium"
      >
        <span class="text-sm sm:text-base">Eliminar todos</span>
      </button>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="tipo in tipos"
          :key="tipo.id"
          class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-5 sm:p-6">
            <!-- Icono y Nombre -->
            <div class="flex flex-col items-center text-center">
              <div
                class="mb-4 w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center"
              >
                <svg
                  class="w-10 h-10 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 14.25M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.984 24.984 0 016.518 3.458M9.75 3.104v5.714c0 .597.237 1.17.659 1.591L14.25 14.25M4.5 14.25l5.159-5.159a2.25 2.25 0 011.591-.659h5.714m-9.036 9.036l5.159-5.159M19.5 14.25l-5.159 5.159a2.25 2.25 0 01-1.591.659H6.636"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ tipo.nombre }}</h3>
            </div>

            <!-- Acciones -->
            <div class="flex justify-center gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                @click="editarTipo(tipo.id)"
                class="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Editar
              </button>
              <button
                @click="eliminarTipo(tipo.id)"
                class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tipo {
  id: number
  nombre: string
}

const tipos = ref<Tipo[]>([
  { id: 1, nombre: 'Pintura Abstracta' },
  { id: 2, nombre: 'Escultura Moderna' },
  { id: 3, nombre: 'Fotografía Digital' },
  { id: 4, nombre: 'Arte Textil' },
])

const eliminarTodos = () => {
  console.log('Eliminar todos los tipos')
}

const eliminarTipo = (id: number) => {
  console.log('Eliminar tipo:', id)
}

const editarTipo = (id: number) => {
  console.log('Editar tipo:', id)
}
</script>
