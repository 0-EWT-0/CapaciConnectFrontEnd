<template>
  <Navbar />
  <main class="p-10">
    <div class="max-w-[90rem] mx-auto p-10">
      <!-- Título -->
      <h1 class="text-3xl font-bold mb-6 text-black">Próximas fechas</h1>

      <!-- Buscador -->
      <div class="mb-6">
        <input
          type="text"
          placeholder="Buscar talleres..."
          class="text-black w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Filtros -->
      <div class="flex gap-4 mb-6">
        <div
          class="w-1/2 bg-gray-100 p-3 text-lg text font-semibold rounded-lg shadow-md text-black"
        >
          Filtrar por tipos:
          <input type="text" placeholder="Tipos de Taller" />
        </div>
        <div class="w-1/2 bg-gray-100 p-3 text-lg font-semibold rounded-lg shadow-md text-black">
          Filtrar por fecha:
          <input type="text" placeholder="Buscador de Fecha" />
        </div>
      </div>

      <!-- Grid de talleres -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div
          v-for="index in 6"
          :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden p-6"
        >
          <h2 class="text-lg font-bold text-black text-center">Título del taller</h2>
          <p class="text-blue-600 font-semibold text-sm text-center">Tipo de taller</p>

          <div class="w-full border-b border-gray-300 my-3"></div>

          <p class="text-gray-700 font-semibold text-sm mb-4 text-center">
            Período de inicio y cierre
          </p>

          <div class="flex justify-center w-full gap-4">
            <div class="flex flex-col items-center bg-gray-100 p-4 rounded-lg w-24">
              <p class="text-gray-700 text-sm">Enero</p>
              <span
                class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg"
                >01</span
              >
              <p class="text-gray-600 text-sm mt-1">2025</p>
            </div>

            <div class="flex flex-col items-center bg-gray-100 p-4 rounded-lg w-24">
              <p class="text-gray-700 text-sm">Febrero</p>
              <span
                class="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg"
                >01</span
              >
              <p class="text-gray-600 text-sm mt-1">2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>

<script setup>
import Footer from '@/components/global/Footer.vue'
import Header from '@/components/global/Header.vue'
import Navbar from '@/components/global/Navbar.vue'
</script>
