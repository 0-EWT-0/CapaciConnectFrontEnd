<template>
  <div class="bg-white shadow-lg rounded-xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-900">Administración de Usuarios</h2>
    </div>

    <!-- Estados de carga y error -->
    <div v-if="isLoading" class="p-6 text-center text-gray-500">
      <i class="fas fa-spinner fa-spin mr-2"></i> Cargando usuarios...
    </div>

    <div v-else-if="error" class="p-6 bg-red-50 text-red-700 border-l-4 border-red-400">
      <i class="fas fa-exclamation-triangle mr-2"></i> {{ error }}
    </div>

    <!-- Lista de usuarios -->
    <div v-else class="p-4 sm:p-6">
      <div class="space-y-4">
        <div
          v-for="user in users"
          :key="user.Id_user"
          class="bg-white shadow-sm rounded-xl p-4 sm:p-5 border border-gray-200"
        >
          <div class="flex flex-col sm:flex-row gap-4 items-start">
            <!-- Avatar -->
            <div class="flex-shrink-0 relative w-full sm:w-auto">
              <div
                class="mx-auto sm:mx-0 w-16 h-16 rounded-full bg-gray-100 border-2 border-emerald-100"
              >
                <img
                  :src="user.profile_img || '/default-avatar.png'"
                  :alt="user.name"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <!-- Información del usuario -->
            <div class="flex-1 w-full min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 truncate">
                {{ user.name }} {{ user.last_names }}
              </h3>

              <div
                class="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600"
              >
                <span class="truncate">{{ user.Email }}</span>
                <span class="hidden sm:block text-gray-300">•</span>
                <span>{{ formatPhone(user.phone) }}</span>
              </div>

              <p class="mt-2 text-sm text-gray-600 line-clamp-2">
                {{ user.description }}
              </p>

              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-500">
                  Registro: {{ formatDate(user.created_at) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Acciones -->
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex flex-col sm:flex-row sm:justify-end gap-2">
              <router-link
                v-if="user.id_user"
                :to="`/admin/userUpdate/${user.id_user}`"
                class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-center"
              >
                Editar
              </router-link>
              <button
                v-if="user.id_user"
                @click="handleDelete(user.id_user)"
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
import { onMounted, ref } from 'vue'
import { useAdminUserStore } from '@/stores/adminUser'
import type { User } from '@/interfaces/User'

const userStore = useAdminUserStore()
const isLoading = ref(true)
const error = ref<string | null>(null)
const users = ref<User[]>([])

// Utilidades
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatPhone = (phone: string = '') => {
  const regex = /(\+52|52)?(\d{3})(\d{3})(\d{4})/
  const cleanPhone = phone.replace(/[^\d]/g, '')
  const match = cleanPhone.match(regex)
  return match ? `+52 (${match[2]}) ${match[3]}-${match[4]}` : phone
}

// const handleImageError = (event: Event) => {
//   const img = event.target as HTMLImageElement
//   img.src = '/default-avatar.png'
// }

// Cargar usuarios
onMounted(async () => {
  try {
    await userStore.fetchUsers()
    users.value = userStore.users
  } catch (err) {
    error.value = 'Error al cargar usuarios: ' + (err as Error).message
  } finally {
    isLoading.value = false
  }
})

// Eliminar usuario
const handleDelete = async (userId: number) => {
  if (confirm('¿Estás seguro de eliminar este usuario permanentemente?')) {
    try {
      await userStore.removeUser(userId)
      users.value = users.value.filter((user) => user.Id_user !== userId)
      alert('Usuario eliminado exitosamente.')
    } catch (err) {
      error.value = 'Error al eliminar usuario: ' + (err as Error).message
      alert('Error al eliminar usuario: ' + (err as Error).message)
    }
  }
}
</script>
