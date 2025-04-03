<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Administración de Comentarios</h1>

    <!-- Loading State -->
    <div v-if="commentStore.loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-if="commentStore.error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
      <p class="font-bold">Error</p>
      <p>{{ commentStore.error }}</p>
      <button
        v-if="commentStore.error.includes('sesión')"
        @click="redirectToLogin"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ir a Iniciar Sesión
      </button>
    </div>

    <!-- Comments by Workshop -->
    <div v-for="workshopId in commentStore.workshopIds" :key="workshopId" class="mb-12">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700">Taller ID: {{ workshopId }}</h2>
        <button
          @click="deleteAllWorkshopComments(workshopId)"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
          :disabled="commentStore.loading"
        >
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Borrar todos
        </button>
      </div>

      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div
          v-for="comment in commentStore.groupedComments[workshopId]"
          :key="comment.id_comment"
          class="border-b border-gray-200 last:border-b-0 p-6 hover:bg-gray-50 transition duration-150"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <p class="text-gray-600 mb-2">{{ comment.comment }}</p>
              <div class="text-sm text-gray-500">

                <span class="font-medium">Usuario:</span> {{ comment.user || 'Anónimo' }} |
                <span class="font-medium">Fecha:</span> {{ formatDate(comment.created_at) }}
              </div>
            </div>
            <button
              @click="deleteComment(comment.id_comment)"
              class="text-red-500 hover:text-red-700 ml-4"
              title="Eliminar comentario"
              :disabled="commentStore.loading"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!commentStore.loading && commentStore.workshopIds.length === 0" class="text-center py-12">
      <svg class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">No hay comentarios</h3>
      <p class="mt-1 text-gray-500">No se encontraron comentarios para mostrar.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCommentStore } from '@/stores/CommentsStore'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const commentStore = useCommentStore()

onMounted(async () => {
  await commentStore.fetchComments()
})

const deleteComment = async (id: number) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    try {
      await commentStore.removeComment(id)
      await Swal.fire('¡Eliminado!', 'El comentario fue eliminado.', 'success')
    } catch (error) {
      await Swal.fire('Error', 'No se pudo eliminar el comentario', 'error')
    }
  }
}

const deleteAllWorkshopComments = async (workshopId: number) => {
  const result = await Swal.fire({
    title: '¿Confirmar eliminación?',
    text: `Se eliminarán todos los comentarios del taller ${workshopId}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar todos',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    try {
      await commentStore.removeAllWorkshopComments(workshopId)
      await Swal.fire('¡Eliminados!', 'Todos los comentarios fueron eliminados.', 'success')
    } catch (error) {
      await Swal.fire('Error', 'No se pudieron eliminar los comentarios', 'error')
    }
  }
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Fecha no disponible'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const redirectToLogin = () => {
  router.push('/login')
}
</script>
