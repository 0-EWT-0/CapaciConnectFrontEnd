<template>
  <div class="p-8 bg-blue-200">
    <h1 class="text-2xl font-bold mb-4">Subir Archivo</h1>
    
    <input type="file" @change="handleFileUpload" accept="image/*,video/*" />
    <button 
      @click="uploadFile" 
      class="mt-4 p-2 bg-blue-500 text-white rounded"
      :disabled="!selectedFile"
    >
      Subir Archivo
    </button>

    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-500 mt-2">{{ successMessage }}</p>
  </div>





  <div class="p-8 bg-red-200">
    <h1 class="text-2xl font-bold mb-4">Archivos Subidos</h1>

    <!-- Mostrar Mensaje de Error -->
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

    <!-- Mostrar Archivos -->
    <div v-if="multimediaList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="media in multimediaList" :key="media.media_url" class="p-4 border rounded-lg shadow">
        

        <!-- Mostrar Imagen -->
        <img v-if="media.media_type === 0 " :src="'data:image/jpeg;base64,' + media.media_url" alt="Imagen" class="w-full h-60 object-cover rounded">

        <!-- Mostrar Video -->
        <video v-else controls class="w-full h-60 rounded">
          <source :src="'data:video/mp4;base64,' + media.media_url" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        <BaseButton variant="red" @click="deleteFile(media.id_multimedia)">Eliminar</BaseButton>
      </div>
    </div>

    <!-- Sin Archivos -->
    <p v-else class="text-gray-500">No hay archivos disponibles.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { genericRequestAuth } from '@/utils/genericRequest';
import Swal from 'sweetalert2'
import BaseButton from '@/components/common/BaseButton.vue';

const selectedFile = ref(null);
const mediaType = ref('');
const errorMessage = ref('');
const successMessage = ref('');

// ✅ Convertir Archivo a Base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // Solo base64
    reader.onerror = (error) => reject(error);
  });
};

// ✅ Optimizar Imágenes (Reducir Tamaño y Calidad)
const optimizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e) => (img.src = e.target.result);
    reader.onerror = (error) => reject(error);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Definir máximo ancho y mantener proporciones
      const MAX_WIDTH = 800;
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      // Dibujar y convertir a blob
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const optimizedFile = new File([blob], file.name, { type: 'image/jpeg' });
        resolve(optimizedFile);
      }, 'image/jpeg', 0.7); // Calidad al 70%
    };
  });
};

// ✅ Manejar Selección de Archivo
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Determinar si es Imagen o Video
  const fileType = file.type.startsWith('image') ? 'Image' : 'Video';
  mediaType.value = fileType;

  try {
    // Optimizar solo si es una imagen
    const processedFile = fileType === 'Image' ? await optimizeImage(file) : file;
    selectedFile.value = await convertToBase64(processedFile);
    successMessage.value = 'Archivo listo para subir.';
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'Error al procesar el archivo.';
    console.error(error);
  }
};

// ✅ Enviar Archivo al Backend
const uploadFile = async () => {
  if (!selectedFile.value || !mediaType.value) {
    errorMessage.value = 'Por favor, selecciona un archivo válido.';
    return;
  }

  const multimediaDTO = {
    media_url: selectedFile.value,
    media_type: mediaType.value,
  };

  try {
    const response = await genericRequestAuth('https://localhost:44368/api/Multimedia/CreateMultimedia', 'POST', multimediaDTO);
    successMessage.value = 'Archivo subido con éxito.';
    console.log('Respuesta del backend:', response.data);
  } catch (error) {
    errorMessage.value = 'Error al subir el archivo.';
    console.error(error);
  }
};













const multimediaList = ref([]);

// ✅ Obtener Archivos del Backend
const fetchMultimedia = async () => {
  try {
    const response = await genericRequestAuth('https://localhost:44368/api/Multimedia/AllMultimedia', 'GET');
    multimediaList.value = response.data;
  } catch (error) {
    console.error('Error al obtener los archivos:', error);
    errorMessage.value = 'Error al cargar los archivos.';
  }
};


onMounted(async() =>{
  await fetchMultimedia()
})





const deleteFile = async (id_multimedia) => {
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
      await genericRequestAuth(`https://localhost:44368/api/Multimedia/DeleteMultimedia/${id_multimedia}`, 'DELETE')
      fetchMultimedia()

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
</script>

<style scoped>
input[type="file"] {
  border: 1px solid #ccc;
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}


img, video {
  border-radius: 8px;
}

</style>
