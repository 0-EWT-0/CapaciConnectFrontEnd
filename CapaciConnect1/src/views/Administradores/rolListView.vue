<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div
      class="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200"
    >
      <h2 class="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Listado de roles</h2>
      <button
        @click="eliminarTodos"
        class="px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-medium"
      >
        <span class="text-sm sm:text-base">Eliminar todos</span>
      </button>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div
          v-for="rol in roles"
          :key="rol.id"
          class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-5 sm:p-6">
            <!-- Encabezado -->
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ rol.nombre }}</h3>
              <span class="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs rounded-full"
                >Activo</span
              >
            </div>

            <!-- Descripción -->
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
              {{ rol.descripcion }}
            </p>

            <!-- Acciones -->
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 border-t border-gray-100 pt-4">
              <button
                @click="editarRol(rol.id)"
                class="flex-1 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center justify-center gap-2"
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
                @click="eliminarRol(rol.id)"
                class="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center gap-2"
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

interface Rol {
  id: number
  nombre: string
  descripcion: string
}

const roles = ref<Rol[]>([
  {
    id: 1,
    nombre: 'Administrador',
    descripcion: 'Acceso completo al sistema con todos los privilegios',
  },
  {
    id: 2,
    nombre: 'Editor',
    descripcion: 'Puede crear y modificar contenido pero no eliminar',
  },
  {
    id: 3,
    nombre: 'Invitado',
    descripcion: 'Acceso limitado de solo lectura',
  },
  {
    id: 4,
    nombre: 'Moderador',
    descripcion: 'Puede gestionar contenido y usuarios básicos',
  },
])

const eliminarTodos = () => {
  console.log('Eliminar todos los roles')
}

const eliminarRol = (id: number) => {
  console.log('Eliminar rol:', id)
}

const editarRol = (id: number) => {
  console.log('Editar rol:', id)
}
</script>
