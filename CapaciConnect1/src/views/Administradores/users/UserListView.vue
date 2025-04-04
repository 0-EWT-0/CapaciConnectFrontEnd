<template>
  <div class="bg-[#F2F5FA] rounded-lg mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-8 flex justify-between items-center">
      <h2 class="text-[#212122]">Lista de usuarios</h2>
    </div>
    <Loading v-if="loadingStore.isLoading" />

    <div v-else class="p-4 sm:p-6">
      <div class="space-y-4">
        <div v-for="user in users" :key="user.Id_user" class="bg-white shadow-sm rounded-xl p-4">
          <div class="flex flex-col sm:flex-row gap-4 items-start">
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
              <!-- <router-link
                v-if="user.id_user"
                :to="`/admin/userUpdate/${user.id_user}`"
                class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-center"
              >
                Editar
              </router-link> -->

              <router-link :to="`/admin/userUpdate/${user.id_user}`" class="w-full">
                <BaseButton variant="orange"> Editar </BaseButton>
              </router-link>

              <!-- <button
                v-if="user.id_user"
                @click="handleDelete(user.id_user)"
                class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
              >
                Eliminar
              </button> -->

              <BaseButton variant="red" v-if="user.id_user" @click="handleDelete(user.id_user)"
                >Eliminar</BaseButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAdminUserStore } from '@/stores/adminUserStore'
import type { User } from '@/interfaces/User'
import Loading from '@/components/common/Loading.vue'
import Swal from 'sweetalert2'
import BaseButton from '@/components/common/BaseButton.vue'
import { useLoadingStore } from '@/stores/loadingStore'

const loadingStore = useLoadingStore()

const userStore = useAdminUserStore()
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

// Eliminar usuario
const handleDelete = async (userId: number) => {
  const confirm = await Swal.fire({
    title: '¿Quieres eliminar este usuario?',
    text: 'Esta acción es irreversible',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#BCCCDC',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#059669',
    confirmButtonText: 'Confirmar',
    backdrop: 'rgba(4, 2, 115, 0.7)',
  })

  if (confirm.isConfirmed) {
    try {
      await userStore.removeUser(userId)
      users.value = users.value.filter((user) => user.Id_user !== userId)
      await userStore.fetchUsers()
      users.value = userStore.users

      Swal.fire({
        title: 'Usuario eliminado',
        text: 'El usuario ha sido eliminado correctamente',
        icon: 'success',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
    } catch (err) {
      error.value = 'Error al eliminar usuario: ' + (err as Error).message
      // alert('Error al eliminar usuario: ' + (err as Error).message)
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el usuario',
        icon: 'error',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
    }
  }
}

onMounted(async () => {
  await userStore.fetchUsers()
  users.value = userStore.users
})
</script>
