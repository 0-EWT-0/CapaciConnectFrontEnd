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
                Dashboard
              </button>
            </RouterLink>
            <RouterLink to="/panelTalleres">
              <button class="flex items-center w-full px-3 py-2 text-sm rounded-md">
                Talleres
              </button>
            </RouterLink>
            <RouterLink to="/panelMateriales">
              <button class="flex items-center w-full px-3 py-2 text-sm rounded-md">
                Materiales
              </button>
            </RouterLink>
          </nav>
        </div>

        <div class="md:col-span-3">
          <!-- Dashboard -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 m-5">
            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center">
                <div class="p-2 rounded-md bg-indigo-50">
                  <CalendarDays class="h-6 w-6 text-indigo-600" />
                </div>
                <div class="ml-4">
                  <h2 class="text-sm font-medium text-gray-500">Talleres Próximos</h2>
                  <p class="text-2xl font-semibold">1</p>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center">
                <div class="p-2 rounded-md bg-green-50">
                  <CheckCircle class="h-6 w-6 text-green-600" />
                </div>
                <div class="ml-4">
                  <h2 class="text-sm font-medium text-gray-500">Talleres Completados</h2>
                  <p class="text-2xl font-semibold">1</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow">
            <div class="px-4 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Próximos Talleres</h3>
            </div>
            <ul class="divide-y divide-gray-200">
              <li class="px-4 py-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-indigo-600">
                      Introducción a la Fotografía Digital
                    </p>
                    <div class="flex items-center mt-1">
                      <CalendarDays class="h-4 w-4 text-gray-400 mr-1" />
                      <p class="text-xs text-gray-500">'15 Mar 2025'</p>
                      <MapPin class="h-4 w-4 text-gray-400 ml-3 mr-1" />
                    </div>
                  </div>
                  <button class="text-sm text-indigo-600 hover:text-indigo-800">
                    Ver detalles
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarCoord from '@/components/global/Coordinador/NavbarCoord.vue'
</script>
