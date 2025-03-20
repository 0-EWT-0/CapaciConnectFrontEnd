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

        <!-- Main Content -->
        <div class="space-y-8 md:col-span-3">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">Gestión de Talleres</h2>
            <button
              @click="openModal"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
            >
              <i class="fas fa-plus mr-1"></i> Nuevo Taller
            </button>
          </div>

          <!-- Table Section -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Todos los Talleres</h3>
              <div class="flex items-center">
                <input
                  type="text"
                  placeholder="Buscar talleres..."
                  class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                  class="ml-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">Todos</option>
                  <option value="upcoming">Talleres A-Z</option>
                  <option value="completed">Talleres Z-A</option>
                </select>
              </div>
            </div>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Taller
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Descripcion
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Materiales
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      Introducción a la Fotografía Digital
                    </div>
                    <div class="text-sm text-gray-500">Ana García</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">15 Mar 2025</div>
                    <div class="text-sm text-gray-500">10:00 - 13:00</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      Descripcion
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button class="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
  >
    <div class="bg-white p-5 rounded-lg w-1/3">
      <h2 class="text-xl font-bold">Formulario Taller</h2>
      <span>-------------------------------</span>
      <div class="my-4"></div>
      <button @click="closeModal" class="bg-red-500 p-2 rounded-lg text-white">Cerrar</button>
      <button class="bg-blue-500 p-2 rounded-lg text-white m-5">Guardar</button>
    </div>
  </div>
</template>

<script setup>
import NavbarCoord from '@/components/global/Coordinador/NavbarCoord.vue'
import { ref } from 'vue'

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
}
</script>
