<template>
  <Header />
  <main class="p-10">
    <div class="max-w-[90rem] mx-auto p-10">
      <!-- Título -->
      <h1 class="text-3xl font-bold mb-6">Todos nuestros talleres</h1>

      <!-- Buscador -->
      <div class="mb-6">
        <input
          type="text"
          placeholder="Buscar talleres..."
          class="w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Filtros -->
      <div class="flex gap-4 mb-6">
        <button class="w-1/2 bg-gray-100 p-3 text-lg font-semibold rounded-lg shadow-md">
          Filtrar por tipos
        </button>
        <button class="w-1/2 bg-gray-100 p-3 text-lg font-semibold rounded-lg shadow-md">
          Filtrar por fecha
        </button>
      </div>

      <!-- Grid de talleres -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div v-for="index in 6" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="../assets/logo.svg" alt="Taller de arte" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h2 class="text-lg font-bold p-2">Título del taller</h2>
            <p class="text-gray-600 p-3">Descripción del taller de manera resumida</p>
            <a href="/contenidoTalleres" class="text-blue-600 font-semibold mt-2 block p-4"
              >Tipo de taller</a
            >
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
</script>
