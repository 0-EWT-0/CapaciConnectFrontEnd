<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div
      class="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-200"
    >
      <h2 class="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Talleres Programados</h2>

    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="taller in talleres"
          :key="taller.Id_workshop"
          class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="relative">
            <div
              v-if="taller.id"
              class="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full z-10"
            >
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
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
                  {{ taller.title }}
                </h3>
                <p class="text-sm text-gray-600 line-clamp-3">{{ taller.description }}</p>

                <!-- Fechas -->
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 text-gray-400 flex-shrink-0"
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
                  <span class="text-xs sm:text-sm"
                    >{{ formatDate(taller.fechaInicio) }} - {{ formatDate(taller.fechaFin) }}</span
                  >
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
import { ref, onMounted } from 'vue'
import { useWorkshopStore } from '@/stores/adminWorkshop'
import router from '@/router';

const workshopStore= useWorkshopStore();
// Función para formatear fechas
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

onMounted(async () => {
  await workshopStore.fetchWorkshops();
});

const talleres = ref(workshopStore.workshops);

const eliminarTodos = async () => {
  // Implementación según tu API
};

const eliminarTaller = async (id: number) => {
  await workshopStore.deleteWorkshop(id);
};

const editarTaller = (id: number) => {
  router.push('/admin/taller/editar/${id}');
};
</script>
