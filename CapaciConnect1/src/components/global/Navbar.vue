<template>
  <header class="flex justify-between items-center px-19 md:px-19 py-4 bg-[#040273]">
    <div class="flex items-center space-x-4">
      <RouterLink to="/">
        <img src="@/assets/imgs/capacityLogo.png" class="w-10 h-10 md:w-13 md:h-13" />
      </RouterLink>
      <h2 class="text-white text-lg md:text-xl">Capacity</h2>
    </div>

    <!-- Normal -->
    <div class="hidden md:flex items-center gap-x-11">
      <div class="flex gap-x-11">
        <RouterLink to="/admin" v-if="rolId === 1 || rolId === 2">
          <h3 class="hover:text-[#2563EB] cursor-pointer">Dashboard</h3>
        </RouterLink>
        <RouterLink to="/Talleres">
          <h3 class="hover:text-[#2563EB] cursor-pointer">Talleres</h3>
        </RouterLink>
        <RouterLink to="/MisTalleres">
          <h3 class="hover:text-[#2563EB] cursor-pointer">Mi aprendizaje</h3>
        </RouterLink>
        <RouterLink to="/calendarios">
          <h3 class="hover:text-[#2563EB] cursor-pointer">Calendario</h3>
        </RouterLink>
        <RouterLink to="/perfil">
          <h3 class="hover:text-[#2563EB] cursor-pointer">Perfil</h3>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/login">
          <BaseButton variant="red" @click="handleLogout">Cerrar sesión</BaseButton>
        </RouterLink>
      </div>
    </div>

    <div class="md:hidden">
      <button @click="toggleMenu">
        <i
          :class="menuOpen ? 'pi pi-times hover:text-[#2563EB]' : 'pi pi-bars hover:text-[#2563EB]'"
        ></i>
      </button>
    </div>

    <!-- Movil -->
    <div
      v-if="menuOpen"
      class="md:hidden z-10 absolute top-16 left-0 w-full bg-[#040273] px-19 py-4 flex flex-col space-y-4"
    >
      <RouterLink to="/Talleres" @click="toggleMenu">
        <h3 class="flex items-center hover:text-[#2563EB]">
          <i class="pi pi-book mr-2"></i>Talleres
        </h3>
      </RouterLink>

      <RouterLink to="/MisTalleres" @click="toggleMenu">
        <h3 class="flex items-center hover:text-[#2563EB]">
          <i class="pi pi-graduation-cap mr-2"></i>Mi aprendizaje
        </h3>
      </RouterLink>

      <RouterLink to="/calendario" @click="toggleMenu">
        <h3 class="flex items-center hover:text-[#2563EB]">
          <i class="pi pi-calendar mr-2"></i>Calendario
        </h3>
      </RouterLink>

      <BaseButton variant="red" @click="handleLogout"> Cerrar sesión </BaseButton>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BaseButton from '../common/BaseButton.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const rolId = ref()

onMounted(async () => {
  const userStore = useUserStore();
  await userStore.getUserInfo()
  rolId.value = userStore.user.id_rol_id
  // console.log('user', userInfo)
  // console.log('userId', userId)
})



// Importar el store de autenticación
const authStore = useAuthStore()
const router = useRouter()

// Función para manejar el cierre de sesión
const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
</script>
