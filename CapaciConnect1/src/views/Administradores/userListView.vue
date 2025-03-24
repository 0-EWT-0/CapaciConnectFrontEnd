<template>
  <div class="bg-white shadow-lg rounded-xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-4 sm:p-6 border-b border-gray-200">
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-900">Usuarios registrados</h2>
    </div>

    <div class="p-4 sm:p-6">
      <div class="space-y-4">
        <div
          v-for="usuario in usuarios"
          :key="usuario.id"
          class="bg-white shadow-sm rounded-xl p-4 sm:p-5 border border-gray-200"
        >
          <!-- Contenido Responsive -->
          <div class="flex flex-col sm:flex-row gap-4 items-start">
            <!-- Avatar -->
            <div class="flex-shrink-0 relative w-full sm:w-auto">
              <div
                class="mx-auto sm:mx-0 w-16 h-16 rounded-full bg-gray-100 border-2 border-emerald-100"
              >
                <img src="" :alt="usuario.nombre" class="w-full h-full object-cover" />
              </div>
              <span
                v-if="usuario.rol"
                class="hidden sm:block absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-white text-xs rounded-full"
              >
                {{ usuario.rol }}
              </span>
            </div>

            <!-- Contenido Principal -->
            <div class="flex-1 w-full min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 truncate">
                {{ usuario.nombre }} {{ usuario.apellidos }}
              </h3>

              <!-- Info Contacto -->
              <div
                class="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600"
              >
                <span class="truncate">{{ usuario.email }}</span>
                <span class="hidden sm:block text-gray-300">•</span>
                <span>{{ usuario.telefono }}</span>
              </div>

              <!-- Descripción -->
              <p class="mt-2 text-sm text-gray-600 line-clamp-2">
                {{ usuario.descripcion }}
              </p>

              <!-- Fecha y Rol (mobile) -->
              <div class="mt-3 sm:hidden flex items-center justify-between">
                <span class="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  {{ usuario.rol }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ usuario.fechaCreacion }}
                </span>
              </div>
            </div>

            <!-- Fecha (desktop) -->
            <div class="hidden sm:flex items-center text-sm text-gray-500 w-40 flex-shrink-0">
              <span>{{ usuario.fechaCreacion }}</span>
            </div>
          </div>

          <!-- Acciones Responsive -->
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex flex-col sm:flex-row sm:justify-end gap-2">
              <button
                @click="handleEdit(usuario)"
                class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
              >
                Editar
              </button>
              <button
                @click="handleDelete(usuario.id)"
                class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
              >
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
interface Usuario {
  id: number
  nombre: string
  apellidos: string
  email: string
  telefono: string
  rol: string
  descripcion: string
  fechaCreacion: string
}

const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: 'Ana María',
    apellidos: 'Gómez Sánchez',
    email: 'ana.gomez@example.com',
    telefono: '+52 55 9876 5432',
    rol: 'Administrador',
    descripcion: 'Ingeniera en sistemas con 5 años de experiencia en desarrollo web.',
    fechaCreacion: '15 Marzo 2024',
  },
  {
    id: 2,
    nombre: 'Carlos Eduardo',
    apellidos: 'Hernández Torres',
    email: 'carlos.hernandez@example.com',
    telefono: '+52 55 1122 3344',
    rol: 'Editor',
    descripcion: 'Diseñador gráfico especializado en interfaces de usuario.',
    fechaCreacion: '10 Abril 2024',
  },
]

const handleDelete = (id: number) => {
  console.log('Eliminar usuario:', id)
}

const handleEdit = (usuario: Usuario) => {
  console.log('Editar usuario:', usuario)
}
</script>
