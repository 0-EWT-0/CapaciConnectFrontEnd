<template>
  <div class="w-[20rem] h-screen bg-[#040273] text-white p-5 fixed">
    <div class="flex justify-center items-center space-x-4">
      <RouterLink to="/panelCoordinador">
        <img src="@/assets/imgs/capacityLogo.png" class="w-10 h-10 md:w-13 md:h-13" />
      </RouterLink>
      <h2 class="text-white text-lg md:text-xl">Capacity</h2>
    </div>
    <nav class="mt-4">
      <RouterLink to="/panelCoordinador">
        <button class="flex items-center w-full px-4 py-3 text-sm rounded-md hover:bg-blue-900">
          📊 Dashboard
        </button>
      </RouterLink>
      <RouterLink to="/panelTalleres">
        <button class="flex items-center w-full px-4 py-3 text-sm rounded-md hover:bg-blue-900">
          🏫 Talleres
        </button>
      </RouterLink>
      <RouterLink to="/panelMateriales">
        <button class="flex items-center w-full px-4 py-3 text-sm rounded-md hover:bg-blue-900">
          📂 Materiales
        </button>
      </RouterLink>
      <RouterLink to="/calendario">
        <button class="flex items-center w-full px-4 py-3 text-sm rounded-md hover:bg-blue-900">
          📅 Calendario
        </button>
      </RouterLink>
    </nav>

    <div class="my-4">
      <BaseButton variant="red" @click="handleLogout"> Cerrar sesión </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
</script>
