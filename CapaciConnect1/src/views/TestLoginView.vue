<template>
  <div class="">
    <h2 class="text-[#212122]">Subir multimedia</h2>

    <div class="bg-[#F2F5FA] rounded-lg">
      <div class="pb-4">
        <label class="text-[#212122]"><h3 class="pb-2">Archivo</h3></label>
        <input
          type="file"
          @change="handleFileUpload"
          accept="image/*,video/*"
          class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
        />
      </div>

      <div class="pb-4 w-auto">
        <BaseButton @click="uploadFile" :disabled="!selectedFile" variant="green"
          >Subir multimedia</BaseButton
        >
      </div>

      <h3 v-if="errorMessage" class="text-[#DC2626] font-bold">{{ errorMessage }}</h3>
      <h3 v-if="successMessage" class="text-[#059669] font-bold">{{ successMessage }}</h3>
    </div>
  </div>

  <div class="p-8 bg-[#F2F5FA]">
    <h2 class="text-[#212122]">Multimedias subidas</h2>

    <!-- Mostrar Mensaje de Error -->
    <h3 v-if="errorMessage" class="text-[#DC2626]">{{ errorMessage }}</h3>

    <!-- Mostrar Archivos -->
    <div
      v-if="multimediaList.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="media in multimediaList"
        :key="media.media_url"
        class="card border rounded-lg shadow-lg flex flex-col overflow-hidden"
      >
        <!-- Contenedor de multimedia -->
        <div class="flex-1 h-40 md:h-auto">
          <!-- Mostrar Imagen -->
          <img
            v-if="media.media_type === 0"
            :src="'data:image/jpeg;base64,' + media.media_url"
            alt="Imagen"
            class="w-full h-full object-cover"
          />

          <!-- Mostrar Video -->
          <video v-else controls class="w-full h-full object-cover">
            <source :src="'data:video/mp4;base64,' + media.media_url" type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>

        <!-- Contenedor de acciones -->
        <div class="flex-1 flex items-center justify-center p-4 bg-gray-100">
          <BaseButton variant="red" @click="deleteFile(media.id_multimedia)" class="w-full">
            Eliminar
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Sin Archivos -->
    <p v-else class="text-gray-500">No hay archivos disponibles.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import BaseButton from '@/components/common/BaseButton.vue'
import type { IMultimedia } from '@/interfaces/IMultimedia'
import { createMultimedia, deleteMultimedia, getAllMultimedia } from '@/services/MultimediaService'

// ✅ Tipos para ref
const selectedFile = ref<string | null>(null)
const mediaType = ref<string>('')
const errorMessage = ref<string>('')
const successMessage = ref<string>('')
const multimediaList = ref<Array<IMultimedia>>([])

// ✅ Convertir Archivo a Base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result?.split(',')[1] || '') // Aseguramos no recibir undefined
    reader.onerror = (error) => reject(error)
  })
}

// ✅ Optimizar Imágenes
const optimizeImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = (e) => (img.src = e.target?.result as string)
    reader.onerror = (error) => reject(error)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const MAX_WIDTH = 800
      const scaleSize = MAX_WIDTH / img.width
      canvas.width = MAX_WIDTH
      canvas.height = img.height * scaleSize

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => {
          const optimizedFile = new File([blob!], file.name, { type: 'image/jpeg' })
          resolve(optimizedFile)
        },
        'image/jpeg',
        0.7,
      )
    }
  })
}

// ✅ Manejar selección de archivo
const handleFileUpload = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const fileType = file.type.startsWith('image') ? 'Image' : 'Video'
  mediaType.value = fileType

  try {
    const processedFile = fileType === 'Image' ? await optimizeImage(file) : file
    selectedFile.value = await convertToBase64(processedFile)
    successMessage.value = 'Archivo listo para subir'
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Error al procesar el archivo'
    console.error(error)
  }
}

// ✅ Enviar archivo al backend
const uploadFile = async (): Promise<void> => {
  if (!selectedFile.value || !mediaType.value) {
    errorMessage.value = 'Por favor, selecciona un archivo válido.'
    return
  }

  const multimediaDTO: IMultimedia = {
    media_url: selectedFile.value,
    media_type: mediaType.value,
  }

  try {
    const response = await createMultimedia(multimediaDTO)
    successMessage.value = 'Archivo subido con éxito.'
    console.log('Respuesta del backend:', response.data)
    Swal.fire({
      icon: 'success',
      title: 'Archivo subido',
      showConfirmButton: false,
      timer: 1500,
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
  } catch (error) {
    errorMessage.value = 'Error al subir el archivo.'
    console.error(error)
    Swal.fire({
      title: 'Error al subir el archivo',
      text: 'Ocurrió un error al subir el archivo',
      icon: 'error',
      confirmButtonColor: '#059669',
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
  }
}

// ✅ Obtener archivos multimedia
const fetchMultimedia = async (): Promise<void> => {
  try {
    const response = await getAllMultimedia()
    multimediaList.value = response.data
  } catch (error) {
    console.error('Error al obtener los archivos:', error)
    errorMessage.value = 'Error al cargar los archivos.'
  }
}

// ✅ Eliminar contenido multimedia
const deleteFile = async (id_multimedia: string): Promise<void> => {
  const confirm = await Swal.fire({
    title: '¿Quieres eliminar este contenido?',
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
      await deleteMultimedia(id_multimedia)
      await fetchMultimedia()
      Swal.fire({
        title: 'Contenido eliminado',
        text: 'El contenido ha sido eliminado correctamente',
        icon: 'success',
        confirmButtonColor: '#2563EB',
      })
    } catch (error) {
      console.error('Error al eliminar el contenido', error)
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el contenido',
        icon: 'error',
        confirmButtonColor: '#2563EB',
      })
    }
  }
}

onMounted(async () => {
  await fetchMultimedia()
})
</script>

<style scoped>
/* input[type='file'] {
  border: 1px solid #ccc;
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
} */
button:disabled {
  background-color: #bcccdc;
  cursor: not-allowed;
}

img,
video {
  /* border-radius: 8px; */
}
</style>
