<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-900">Reportes registrados</h2>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div
          v-for="reporte in reportes"
          :key="reporte.id"
          class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-5 sm:p-6">
            <!-- Encabezado -->
            <div class="flex gap-4 items-start">
              <div class="flex-shrink-0">
                <div
                  class="w-14 h-14 rounded-full bg-gray-100 border-2 border-emerald-100 overflow-hidden"
                >
                  <img src="" alt="Avatar" class="w-full h-full object-cover" />
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 truncate">
                  {{ reporte.titulo }}
                </h3>
                <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                  {{ reporte.descripcion }}
                </p>
              </div>
            </div>

            <!-- Detalles -->
            <div class="mt-4 space-y-2">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span class="font-medium">Taller:</span>
                <span class="truncate">{{ reporte.tituloTaller }}</span>
              </div>

              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{{ reporte.email }}</span>
              </div>

              <div class="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ reporte.fecha }}</span>
              </div>
            </div>

            <!-- Acción -->
            <div class="mt-6 pt-4 border-t border-gray-100">
              <button
                @click="handleFinalizar(reporte.id)"
                class="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#1a2e4c] rounded-lg hover:bg-[#15243d] transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Marcar como finalizado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Reporte {
  id: number
  titulo: string
  descripcion: string
  tituloTaller: string
  email: string
  fecha: string
}

const reportes = ref<Reporte[]>([
  {
    id: 1,
    titulo: 'Reporte de seguridad en taller',
    descripcion:
      'Se detectó un problema con las medidas de seguridad durante el último taller de pintura. Es necesario revisar los protocolos y equipos de protección.',
    tituloTaller: 'Taller de Pintura Avanzada',
    email: 'seguridad@talleres.com',
    fecha: '2023-01-17',
  },
  {
    id: 2,
    titulo: 'Solicitud de materiales adicionales',
    descripcion:
      'Los participantes del taller de escultura han solicitado mayor cantidad de materiales básicos para las próximas sesiones.',
    tituloTaller: 'Taller de Escultura Moderna',
    email: 'materiales@talleres.com',
    fecha: '2023-01-18',
  },
])

const handleFinalizar = (id: number) => {
  console.log('Finalizar reporte:', id)
}
</script>
