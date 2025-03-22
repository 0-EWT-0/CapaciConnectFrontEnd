<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Talleres Programados</h2>
      <button
        @click="eliminarTodos"
        class="px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-medium text-sm sm:text-base"
      >
        Eliminar Todos
      </button>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="taller in talleres"
          :key="taller.id"
          class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="relative">
            <div v-if="taller.inscrito" class="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full z-10">
              Inscripciones Abiertas
            </div>
            <div class="p-4 sm:p-5">
              <!-- Contenedor Imagen -->
              <div class="aspect-video mb-4 rounded-xl overflow-hidden border-2 border-emerald-100">
                <img
                  :src="taller.imagen || '/placeholder-taller.jpg'"
                  :alt="taller.titulo"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Contenido -->
              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">{{ taller.titulo }}</h3>
                <p class="text-sm text-gray-600 line-clamp-3">{{ taller.descripcion }}</p>

                <!-- Fechas -->
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span class="text-xs sm:text-sm">{{ formatDate(taller.fechaInicio) }} - {{ formatDate(taller.fechaFin) }}</span>
                </div>

                <!-- Tipo y Acciones -->
                <div class="pt-4 border-t border-gray-100">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span class="text-sm font-medium text-gray-700">{{ taller.tipoTaller }}</span>
                    <div class="flex gap-2 flex-wrap">
                      <button
                        @click="editarTaller(taller.id)"
                        class="px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
                      >
                        Editar
                      </button>
                      <button
                        @click="eliminarTaller(taller.id)"
                        class="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
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
import { ref } from 'vue'

// Función para formatear fechas
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

// Datos de ejemplo con 4 talleres
const talleres = ref([
  {
    id: 1,
    titulo: "Taller de Pintura Abstracta",
    descripcion: "Exploración de técnicas modernas de pintura con materiales no convencionales. Ideal para principiantes y entusiastas del arte contemporáneo.",
    tipoTaller: "Presencial",
    fechaInicio: "2024-03-15",
    fechaFin: "2024-03-17",
    inscrito: true,
    imagen: "/taller-pintura.jpg"
  },
  {
    id: 2,
    titulo: "Escultura en Madera Básica",
    descripcion: "Introducción al tallado en madera con herramientas profesionales y medidas de seguridad. Aprende a crear tus primeras piezas artesanales.",
    tipoTaller: "Virtual",
    fechaInicio: "2024-03-20",
    fechaFin: "2024-03-22",
    inscrito: false,
    imagen: "/taller-escultura.jpg"
  },
  {
    id: 3,
    titulo: "Fotografía Digital Avanzada",
    descripcion: "Dominio de técnicas profesionales de iluminación y composición. Workshop práctico con modelos reales y diferentes escenarios.",
    tipoTaller: "Mixto",
    fechaInicio: "2024-04-01",
    fechaFin: "2024-04-03",
    inscrito: true,
    imagen: "/taller-fotografia.jpg"
  },
  {
    id: 4,
    titulo: "Cerámica Creativa",
    descripcion: "Creación de piezas únicas con técnicas tradicionales y modernas de cerámica. Incluye horneado y acabados finales.",
    tipoTaller: "Presencial",
    fechaInicio: "2024-04-10",
    fechaFin: "2024-04-12",
    inscrito: true,
    imagen: "/taller-ceramica.jpg"
  }
])

const eliminarTodos = () => {
  console.log('Eliminar todos los talleres')
}

const eliminarTaller = (id: number) => {
  console.log('Eliminar taller:', id)
}

const editarTaller = (id: number) => {
  console.log('Editar taller:', id)
}
</script>
