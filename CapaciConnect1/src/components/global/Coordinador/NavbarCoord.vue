<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-gray-900">Panel de Coordinador de Talleres</h1>
      <div class="flex items-center gap-4">
        <button class="p-2 rounded-full hover:bg-gray-100">
          <i class="fas fa-bell text-gray-500"></i>
        </button>
        <div class="flex items-center gap-2">
          <div
            class="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white"
          >
            MRC
          </div>
          <span class="text-sm font-medium text-gray-700">Marco Hau</span>
        </div>
        <button class="flex items-center px-3 py-2 text-lg rounded-md bg-red-500 text-white">
          Cerrar Sesión
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
