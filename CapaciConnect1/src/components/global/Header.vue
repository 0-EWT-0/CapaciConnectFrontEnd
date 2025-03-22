<template>
  <header class="flex justify-between items-center p-8 bg-[#040273]">
    <!-- Logo y título a la izquierda -->
    <div class="flex items-center space-x-4">
      <RouterLink to="/inicio">
        <img src="../../assets/imgs/capacityLogo.png" alt="Logo" class="h-10" />
      </RouterLink>
      <h2 class="text-3xl font-bold text-white">Capacity</h2>
    </div>

    <!-- Navegación y botón a la derecha -->
    <div class="flex items-center space-x-6">
      <nav class="flex items-center space-x-6">
        <div class="w-[40rem]">
          <input
            type="text"
            class="w-full p-3 pl-10 text-white border border-white rounded-full shadow-sm focus:ring-2 focus:ring-white focus:border-white transition-all duration-300"
            placeholder="Buscar..."
          />
          <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white"></i>
        </div>
        <RouterLink to="/Talleres">
          <a class="text-white hover:text-white m-10">Talleres</a>
        </RouterLink>
        <RouterLink to="/misTalleres">
          <a class="text-white hover:text-white m-10">Mis Avances </a>
        </RouterLink>
        <RouterLink to="/Calendario">
          <a class="text-white hover:text-white m-10">Calendario</a>
        </RouterLink>
      </nav>
      <div class="relative inline-block text-left">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="flex items-center space-x-2 bg-[#040273] p-2 rounded-lg hover:bg-blue-900"
        >
          <img src="../../assets/imgs/capacityLogo.png" alt="Foto de perfil" class="w-10 h-10 rounded-full" />
        </button>

        <!-- Menú desplegable -->
        <div v-if="isMenuOpen" class="absolute right-0 mt-5 w-48 bg-[#040273] shadow-lg rounded-lg">
          <a
            href="#"
            @click.prevent="editarPerfil"
            class="block px-6 py-4 text-sm text-white hover:bg-blue-900"
          >
            Mi perfil
          </a>
          <a
            href="#"
            @click.prevent="cerrarSesion"
            class="block px-6 py-4 text-sm text-white hover:bg-blue-900"
          >
            Cerrar sesión
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import router from '@/router'

export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    editarPerfil() {
      router.push('/perfil')
    },
    cerrarSesion() {},
  },
}
</script>
