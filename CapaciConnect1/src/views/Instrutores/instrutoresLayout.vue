<template>
  <div class="min-h-screen bg-black text-black">
    <NavbarCoord/>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <div class="bg-white rounded-lg shadow p-4">
          <h1 class="text-center font-semibold text-lg m-2">Hola, Coordinador</h1>
          <nav class="space-y-2">
            <RouterLink :to="{ name: 'instructor-dashboard' }">
              <button class="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                Dashboard
              </button>
            </RouterLink>
            <RouterLink :to="{ name: 'loading-student' }">
              <button class="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                Cargando Estudiantes
              </button>
            </RouterLink>
            <RouterLink :to="{ name: 'loading-work' }">
              <button class="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                Cargando Trabajos
              </button>
            </RouterLink>
            <RouterLink :to="{ name: 'page-instructores' }">
              <button class="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                Página de Instructores
              </button>
            </RouterLink>
            <RouterLink :to="{ name: 'page-student' }">
              <button class="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                Página de Estudiantes
              </button>
            </RouterLink>
            <RouterLink :to="{ name: 'page-work' }">
              <button class="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                Página de Trabajos
              </button>
            </RouterLink>
          </nav>
        </div>

        <!-- Área principal del contenido -->
        <div class="md:col-span-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Importaciones necesarias
import { RouterLink } from 'vue-router'
</script>
