<template>
    <div class="min-h-screen bg-gray-50">
      <NavbarCoord />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <!-- Sidebar -->
          <div class="bg-white rounded-lg shadow p-4">
            <h1 class="text-center font-semibold text-lg m-2">Hola, Coordinador</h1>
            <nav class="space-y-2">
              <RouterLink to="/panelCoordinador">
                <button class="flex items-center w-full px-3 py-2 text-sm rounded-md">
                  <i class="pi pi-home mr-2"></i> Dashboard
                </button>
              </RouterLink>
              <RouterLink to="/panelTalleres">
                <button class="flex items-center w-full px-3 py-2 text-sm rounded-md">
                  <i class="pi pi-calendar mr-2"></i> Talleres
                </button>
              </RouterLink>
              <RouterLink to="/panelMateriales">
                <button class="flex items-center w-full px-3 py-2 text-sm rounded-md">
                  <i class="pi pi-folder mr-2"></i> Materiales
                </button>
              </RouterLink>
            </nav>
          </div>
  
          <!-- Main Content -->
          <div class="space-y-6 md:col-span-3">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold text-gray-900">Gestión de Materiales</h2>
            </div>
  
            <!-- Materiales Section -->
            <div class="bg-white rounded-lg shadow">
              <div class="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Materiales por Taller</h3>
                <div class="flex items-center">
                  <div class="relative">
                    <input
                      type="text"
                      placeholder="Buscar materiales..."
                      class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <i class="pi pi-search absolute right-3 top-2.5 text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div class="p-4">
                <!-- Material Cards -->
                 <h1 class="text-lg font-bold">Introducción a la Fotografía Digital</h1>
                 <div class="flex flex-col justify-between h-[8rem] w-[14rem] bg-gray-200 text-black font-bold text-xl rounded-lg shadow-md m-4">
                    <div class="text-center p-12">Video</div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <!-- Placeholder for Add -->
                  <div class="border border-dashed rounded-lg flex items-center justify-center p-4 h-full">
                    <button class="flex flex-col items-center text-gray-500 hover:text-indigo-600">
                      <i class="pi pi-plus-circle mb-2 text-lg"></i>
                      <span class="text-sm">Añadir material</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import NavbarCoord from '@/components/global/Coordinador/NavbarCoord.vue';

  </script>
  