<!-- TallerEditView.vue -->
<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <!-- Mensajes de estado -->
    <div v-if="workshopStore.loading" class="p-4 bg-blue-50 text-blue-600 text-sm">
      Guardando cambios...
    </div>
    <div v-if="workshopStore.error" class="p-4 bg-red-50 text-red-600 text-sm">
      Error: {{ workshopStore.error }}
    </div>
    <div v-if="successMessage" class="p-4 bg-green-50 text-green-600 text-sm">
      {{ successMessage }}
    </div>

    <div class="p-6 border-b border-gray-200">
      <h3 class="text-2xl font-semibold text-gray-900">Editar taller</h3>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6" v-if="!loadingInitialData">
      <div class="space-y-6">
        <!-- Sección Principal -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <label for="titulo" class="block text-sm font-medium text-gray-700"
              >Título del taller</label
            >
            <input
              id="titulo"
              v-model="formData.titulo"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div class="space-y-3 col-span-full">
            <label for="descripcion" class="block text-sm font-medium text-gray-700"
              >Descripción</label
            >
            <textarea
              id="descripcion"
              v-model="formData.descripcion"
              required
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div class="space-y-3 col-span-full">
            <label for="contenido" class="block text-sm font-medium text-gray-700"
              >Contenido detallado</label
            >
            <textarea
              id="contenido"
              v-model="formData.contenido"
              required
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>
        </div>

        <!-- Sección Configuración -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
          <div class="space-y-4">
            <div class="space-y-3">
              <label for="tipoTaller" class="block text-sm font-medium text-gray-700"
                >Tipo de taller</label
              >
              <select
                id="tipoTaller"
                v-model="formData.tipoTaller"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Mixto">Mixto</option>
              </select>
            </div>

            <div class="space-y-3">
              <label for="imagen" class="block text-sm font-medium text-gray-700"
                >Imagen promocional</label
              >
              <input
                id="imagen"
                type="file"
                accept="image/*"
                @change="handleImageChange"
                class="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
              />
              <div class="mt-2" v-if="currentImage">
                <span class="text-sm text-gray-600">Imagen actual:</span>
                <img :src="currentImage" class="mt-2 w-32 h-20 object-cover rounded-lg" />
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-3">
              <label for="instructor" class="block text-sm font-medium text-gray-700"
                >Instructor principal</label
              >
              <input
                id="instructor"
                v-model="formData.instructor"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <label for="fechaInicio" class="block text-sm font-medium text-gray-700"
                  >Fecha de Inicio</label
                >
                <input
                  id="fechaInicio"
                  v-model="formData.fechaInicio"
                  type="date"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div class="space-y-3">
                <label for="fechaFin" class="block text-sm font-medium text-gray-700"
                  >Fecha de Fin</label
                >
                <input
                  id="fechaFin"
                  v-model="formData.fechaFin"
                  type="date"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end gap-4 mt-8">
          <button
            type="button"
            @click="router.push('/talleres')"
            class="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="workshopStore.loading"
            class="px-8 py-3 text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors font-medium shadow-lg hover:shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </form>

    <div v-if="loadingInitialData" class="p-6 text-center text-gray-500">
      Cargando datos del taller...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWorkshopStore } from '@/stores/WorkshopStore';

interface FormData {
  titulo: string;
  descripcion: string;
  contenido: string;
  tipoTaller: string;
  instructor: string;
  imagen: File | null;
  fechaInicio: string;
  fechaFin: string;
}

const route = useRoute();
const router = useRouter();
const workshopStore = useWorkshopStore();
const workshopId = Number(route.params.id);

const formData = ref<FormData>({
  titulo: '',
  descripcion: '',
  contenido: '',
  tipoTaller: 'Presencial',
  instructor: '',
  imagen: null,
  fechaInicio: '',
  fechaFin: ''
});

const currentImage = ref<string>('');
const successMessage = ref<string>('');
const loadingInitialData = ref<boolean>(true);

onMounted(async () => {
  try {
    const workshop = await workshopStore.getWorkshopById(workshopId);

    formData.value = {
      titulo: workshop.titulo,
      descripcion: workshop.descripcion,
      contenido: workshop.contenido,
      tipoTaller: workshop.tipoTaller,
      instructor: workshop.instructor,
      imagen: null,
      fechaInicio: workshop.fechaInicio?.split('T')[0] || '',
      fechaFin: workshop.fechaFin?.split('T')[0] || ''
    };

    if (workshop.imagen) {
      currentImage.value = typeof workshop.imagen === 'string'
        ? workshop.imagen
        : URL.createObjectURL(workshop.imagen);
    }

    loadingInitialData.value = false;
  } catch (error) {
    console.error('Error cargando taller:', error);
    router.push('/talleres');
  }
});

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    formData.value.imagen = file;
    currentImage.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  successMessage.value = '';

  const form = new FormData();
  form.append('titulo', formData.value.titulo);
  form.append('descripcion', formData.value.descripcion);
  form.append('contenido', formData.value.contenido);
  form.append('tipoTaller', formData.value.tipoTaller);
  form.append('instructor', formData.value.instructor);
  form.append('fechaInicio', formData.value.fechaInicio);
  form.append('fechaFin', formData.value.fechaFin);

  if (formData.value.imagen) {
    form.append('imagen', formData.value.imagen);
  }

  try {
    await workshopStore.updateWorkshop(workshopId, form);
    successMessage.value = 'Taller actualizado correctamente';

    setTimeout(() => {
      router.push('/talleres');
    }, 1500);
  } catch (error) {
    console.error('Error actualizando taller:', error);
  }
};
</script>
