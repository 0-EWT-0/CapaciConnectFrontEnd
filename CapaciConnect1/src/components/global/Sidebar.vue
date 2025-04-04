<template>
  <div class="relative">
    <!-- Botón de menú hamburguesa para móviles -->
    <button @click="isOpen = !isOpen" class="lg:hidden p-2">
      <span
        class="pi pi-bars text-4xl hover:text-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
      ></span>
    </button>

    <!-- Sidebar -->
    <div
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      class="h-screen fixed inset-y-0 left-0 z-50 w-64 bg-[#040273] shadow-md flex flex-col p-4 transition-transform transform duration-250 lg:translate-x-0 lg:static"
    >
      <div class="flex justify-center items-center space-x-4 py-4">
        <img
          src="@/assets/imgs/capacityLogo.png"
          alt="Logo"
          class="h-14 w-14 hover:cursor-pointer"
          @click="$router.push('/admin')"
        />
        <div>
          <h2>Dashboard</h2>
        </div>
      </div>

      <nav class="mt-4 flex-1">
        <ul>
          <li
            class="block px-4 py-2 rounded-lg hover:bg-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
            @click="$router.push('/admin')"
          >
            <p>Inicio</p>
          </li>

          <li
            class="block px-4 py-2 rounded-lg hover:bg-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
            @click="$router.push('/adminuser')"
          >
            <p>Usuarios</p>
          </li>

          <li
            class="block px-4 py-2 rounded-lg hover:bg-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
            @click="$router.push('/adminWorkshops')"
          >
            <p>Talleres</p>
          </li>

          <!-- <li
            class="block px-4 py-2 rounded-lg hover:bg-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
            @click="$router.push('/adminRol')"
          >
            <p>Roles</p>
          </li> -->

          <li
            class="block px-4 py-2 rounded-lg hover:bg-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
            @click="$router.push('/adminReport')"
          >
            <p>Reportes</p>
          </li>

          <li
            class="block px-4 py-2 rounded-lg hover:bg-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
            @click="$router.push('/adminTipos')"
          >
            <p>Categorías</p>
          </li>

          <li
            class="block px-4 py-2 rounded-lg hover:bg-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
            @click="$router.push('/adminMultimedias')"
          >
            <p>Multimedias</p>
          </li>

          <li
            class="block px-4 py-2 rounded-lg hover:bg-[#1d4ed8] hover:cursor-pointer transition-colors duration-250"
            @click="$router.push('/calendario')"
          >
            <p>Calendario</p>
          </li>
        </ul>
      </nav>

      <router-link to="/">
        <BaseButton variant="blue" class="mt-4" @click="isOpen = false">
          Página principal
        </BaseButton>
      </router-link>
      <BaseButton variant="red" class="mt-4" @click="handleLogout"> Cerrar sesión </BaseButton>
      <BaseButton variant="gray" class="mt-4 lg:hidden" @click="isOpen = false">
        Ocultar
      </BaseButton>
    </div>

    <!-- Fondo oscuro al abrir el menú en móviles -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 bg-[#040273]/70 z-10 lg:hidden"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import BaseButton from '../common/BaseButton.vue'
import { ref } from 'vue'

const isOpen = ref(false)
const authStore = useAuthStore()

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
</script>
