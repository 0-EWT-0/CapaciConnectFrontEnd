<template>
  <div class="p-16">
    <h2 class="text-[#212122] pb-4">Crear taller</h2>

    <form class="bg-[#F2F5FA] rounded-lg p-4" @submit.prevent="handleSubmit">
      <!-- Inputs para campos del Workshop -->
      <div class="pb-4">
        <label class="text-[#212122]"><h3 class="pb-2">Título</h3></label>
        <input
          v-model="formData.title"
          class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          placeholder="Título del taller"
        />
      </div>

      <div class="pb-4">
        <label class="text-[#212122]"><h3 class="pb-2">Descripción</h3></label>
        <textarea
          v-model="formData.description"
          class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          placeholder="Descripción del taller"
        />
      </div>

      <div class="pb-4">
        <label class="text-[#212122]"><h3 class="pb-2">Contenido</h3></label>
        <textarea
          v-model="formData.content"
          class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          placeholder="Contenido del taller"
        />
      </div>

      <div class="pb-4">
        <label class="text-[#212122]"><h3 class="pb-2">Seleccionar tipo de taller</h3></label>
        <select
          id="tipo"
          v-model="formData.id_type_id"
          class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
        >
          <option v-for="tipo in store.types" :key="tipo.id_type" :value="tipo.id_type">
            {{ tipo.type_name }}
          </option>
        </select>
      </div>

      <div class="pb-4">
        <label class="text-[#212122]"><h3 class="pb-2">Imagen</h3></label>
        <input
          type="file"
          @change="handleFileUpload"
          accept="image/*"
          class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
        />

        <h3 v-if="errorMessage" class="text-[#DC2626] font-bold">{{ errorMessage }}</h3>
        <h3 v-if="successMessage" class="text-[#059669] font-bold">{{ successMessage }}</h3>
      </div>

      <div class="pb-4 w-auto">
        <BaseButton variant="green">Crear taller</BaseButton>
      </div>
    </form>

    <div class="mt-19 px-4 pb-11 rounded-lg bg-[#F2F5FA]">
      <h2 class="text-[#212122] py-11">Talleres creados</h2>
      <Loading v-if="loadingStore.isLoading" />

      <div v-else>
        <!-- Mostrar Mensaje de Error -->
        <h3 v-if="errorMessage" class="text-[#DC2626]">{{ errorMessage }}</h3>

        <!-- Mostrar Archivos -->
        <div
          v-if="workshopList.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="workshop in workshopList"
            :key="workshop.id_workshop"
            class="shadow-lg rounded-lg flex flex-col overflow-hidden"
          >
            <!-- Contenedor de multimedia -->
            <div class="flex-1 h-40 md:h-auto">
              <!-- Mostrar Imagen -->
              <img
                :src="'data:image/jpeg;base64,' + workshop.image"
                alt="Imagen"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="p-4">
              <h3 class="text-[#212122]">{{ workshop.title }}</h3>
              <p class="text-[#212122]">{{ workshop.description }}</p>
              <!-- <h3 class="text-[#2563EB]">{{ workshop.id_type_id }}</h3> -->
              <!-- Obtener el nombre del tipo desde store.types -->
              <h3 class="text-[#2563EB]">
                {{ getTypeName(workshop.id_type_id) }}
              </h3>
            </div>

            <!-- Contenedor de acciones -->
            <div class="p-4">
              <BaseButton
                variant="red"
                @click="handleDeleteWorkshop(workshop.id_workshop)"
                class="w-full"
              >
                Eliminar
              </BaseButton>
            </div>
          </div>
        </div>

        <!-- Sin Archivos -->
        <h3 v-else class="text-gray-500">No hay talleres creados</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import BaseButton from '@/components/common/BaseButton.vue'

import { createWorkshop, deleteWorkshop, getAllWorkshop } from '@/services/WorkshopService'
import type { IWorkshop } from '@/interfaces/IWorkshop'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'

import { useLoadingStore } from '@/stores/loadingStore'
import Loading from '@/components/common/Loading.vue'
const loadingStore = useLoadingStore()

const workshopList = ref<Array<IWorkshop>>([])
const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const formData = ref<IWorkshop>({
  title: '',
  description: '',
  content: '',
  image: 'Imagen url',
  id_type_id: 0,
})

// Función para obtener el nombre del tipo según el ID
const store = useWorkshopTypeStore()
const getTypeName = (id_type_id: number): string => {
  const type = store.types.find((tipo) => tipo.id_type === id_type_id)
  return type ? type.type_name : 'Tipo desconocido'
}

// ✅ Convertir Archivo a Base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result?.split(',')[1] || '')
    reader.onerror = (error) => reject(error)
  })
}

// ✅ Manejar el upload del archivo
const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    formData.value.image = await convertToBase64(file)
    successMessage.value = 'Imagen lista para subir'
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Error al procesar la imagen'
    console.error(error)
  }
}

// ✅ Manejar el envío del formulario
const handleSubmit = async () => {
  try {
    await createWorkshop(formData.value)
    // successMessage.value = 'Taller creado exitosamente.'
    errorMessage.value = ''
    Swal.fire({
      icon: 'success',
      title: 'Taller creado',
      showConfirmButton: false,
      timer: 1500,
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
    formData.value = ''
    await fetchMultimedia()
  } catch (error) {
    errorMessage.value = 'Error al crear el Workshop'
    console.error(error)
    Swal.fire({
      title: 'Error al crear el taller',
      text: 'Ocurrió un error al crear el taller',
      icon: 'error',
      confirmButtonColor: '#059669',
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
  }
}

// ✅ Obtener archivos multimedia
const fetchMultimedia = async (): Promise<void> => {
  loadingStore.startLoading()
  try {
    const response = await getAllWorkshop()
    workshopList.value = response.data
  } catch (error) {
    console.error('Error al obtener los archivos:', error)
    errorMessage.value = 'Error al cargar los archivos'
  } finally {
    loadingStore.stopLoading()
  }
}

// ✅ Eliminar contenido multimedia
const handleDeleteWorkshop = async (id_workshop: string): Promise<void> => {
  const confirm = await Swal.fire({
    title: '¿Quieres eliminar este taller?',
    text: 'Esta acción es irreversible',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#BCCCDC',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#059669',
    confirmButtonText: 'Confirmar',
    backdrop: 'rgba(4, 2, 115, 0.7)',
  })
  if (confirm.isConfirmed) {
    try {
      await deleteWorkshop(id_workshop)
      await fetchMultimedia()
      Swal.fire({
        title: 'Taller eliminado',
        text: 'El taller ha sido eliminado correctamente',
        icon: 'success',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
    } catch (error) {
      console.error('Error al eliminar el taller', error)
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el taller',
        icon: 'error',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
    }
  }
}

onMounted(async () => {
  await fetchMultimedia()
  await store.fetchAllTypes()
})
</script>
