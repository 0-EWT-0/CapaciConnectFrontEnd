<template>
  <header class="flex justify-between items-center p-8 bg-gray-100">
    <!-- Logo y título a la izquierda -->
    <div class="flex items-center space-x-4">
      <RouterLink to="/">
        <img src="../../assets/logo.svg" alt="Logo" class="h-10" />
      </RouterLink>
      <h2 class="text-lg font-bold">Explorar</h2>
    </div>

    <!-- Navegación y botón a la derecha -->
    <div class="flex items-center space-x-6">
      <nav class="flex items-center space-x-6">
        <div class="w-[80rem]">
          <input
            type="text"
            class="w-full p-3 pl-10 text-gray-700 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
            placeholder="Buscar..."
          />
          <i
            class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
        </div>
      </nav>
      <RouterLink to="/login">
        <button class="bg-gray-600 text-white px-8 py-2 rounded-md hover:bg-gray-700 transition">
          Iniciar Session
        </button>
      </RouterLink>
      <RouterLink to="/register">
        <button class="bg-gray-600 text-white px-8 py-2 rounded-md hover:bg-gray-700 transition">
          Registrase
        </button>
      </RouterLink>
    </div>
  </header>
</template>

<script>
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

export default {
  name: 'Navbar',
  components: {
    IconField,
    InputIcon,
    InputText,
  },
}
</script>
