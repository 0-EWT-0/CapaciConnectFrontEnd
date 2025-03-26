<template>
  <NavbarCoord />
  <div class="ml-[25rem]">
    <div class="flex justify-center text-black font-bold">
      <h1 class="text-2xl font-bold mb-4 text-black">Lista de Talleresww</h1>
    </div>

    <div class="container mx-auto p-6">
      <!-- Grid de talleres -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="index in 5" class="bg-white rounded-lg shadow-lg">
          <!-- Imagen -->
          <img
            src="../../assets/logo.svg"
            alt="Imagen del taller"
            class="w-full h-40 object-cover"
          />

          <!-- Información del Taller -->
          <div class="p-4">
            <h2 class="text-lg font-bold text-black">Taller de JavaScript Avanzado</h2>
            <p class="text-gray-600 text-sm">Domina JavaScript moderno  y  de con proyectos prácticos.</p>

            <p class="text-blue-600 font-semibold mt-2">Programación</p>
            <p class="text-blue-600 font-semibold mt-2">Instructor: Marco Hau</p>
            <p class="text-blue-600 font-semibold mt-2">Ver mas</p>
            <!-- Barra de progreso -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarCoord from '@/components/global/Coordinador/NavbarCoord.vue'
</script>
