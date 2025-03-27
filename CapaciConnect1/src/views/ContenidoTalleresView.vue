<template>
  <Navbar />
  <div class="bg-white p-8">
    <!-- Barra superior -->
    <div class="text-white flex justify-between p-2">
      <span v-if="calendarData" class="bg-green-500 p-2 rounded-lg h-10 w-[20rem] text-center"
        >Inicio el {{ formatDate(calendarData.date_start) }}</span
      >
      <span class="bg-red-500 p-2 rounded-lg h-10 w-[20rem] text-center"
        >Cierre el {{ formatDate(calendarData.date_end) }}</span
      >
    </div>

    <!-- Imagen principal y título -->
    <div class="text-center mt-4">
      <img src="../assets/logo.svg" alt="Pinceles" class="mx-auto w-96" />
      <h1 class="text-4xl font-bold mt-4 text-black">Taller de {{ workshop.title }}</h1>
      <p class="text-gray-700 mt-2">{{ workshop.description }}.</p>
    </div>

    <!-- Información del instructor -->
    <div class="mt-4 text-gray-600">
      <p>
        Instructor: <span class="text-[#2563EB]">{{ workshop.id_user_id }}</span>
      </p>
      <p>
        Fecha de creación: <span class="text-[#2563EB]">{{ formatDate(workshop.created_at) }}</span>
      </p>
    </div>

    <!-- Botón de inscripción -->
    <div class="mt-6 text-center flex justify-between mx-10">
      <button
        @click="handleSubscribe"
        :disabled="isSubscribed"
        class="bg-blue-500 text-white py-5 px-15 rounded-lg hover:bg-blue-600 text-xl disabled:opacity-50"
      >
        {{ isSubscribed ? 'Ya inscrito' : 'Inscribirse' }}
      </button>
    </div>

    <!-- Contenido del taller -->
    <div class="mt-8 bg-gray-200 m-10 p-10 rounded-xl">
      <h2 class="text-2xl font-bold text-gray-800">Contenido del taller</h2>
      <div v-for="(clase, index) in clases" :key="index" class="border-b py-3">
        <button
          @click="toggleClase(index)"
          class="flex justify-between items-center w-full text-left text-lg font-medium text-black"
        >
          <span> {{ clase.titulo }} </span>
          <span> {{ activeIndex === index ? '▲' : '▼' }} </span>
        </button>
        <ul v-if="activeIndex === index" class="pl-6 mt-2">
          <li
            v-for="(recurso, i) in clase.recursos"
            :key="i"
            class="flex justify-between items-center text-black"
          >
            <span>{{ recurso }}</span>
            <span>📁</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sección de comentarios -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-gray-800">Comentarios</h2>
      <img
        src="../assets/logo.svg"
        class="h-15 w-15 rounded-full flex items-center justify-center text-xl mt-2"
      />
      <div class="mt-4">
        <textarea
          v-model="newComment"
          class="w-full p-2 border border-gray-300 rounded text-black"
          placeholder="Escriba su comentario aquí..."
        ></textarea>
        <div class="mt-2 flex gap-2">
          <button
            @click="cancelComment"
            class="bg-gray-300 text-gray-800 py-1 px-4 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            @click="submitComment"
            class="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
          >
            Enviar Comentarios
          </button>
        </div>
      </div>

      <!-- Comentarios de ejemplo -->
      <div class="mt-5">
        <div v-if="ownComments.length > 0">
          <div
            v-for="comment in ownComments"
            :key="comment.id_comment"
            class="bg-white shadow-md p-5 flex justify-between items-center"
          >
            <img
              src="../assets/logo.svg"
              class="h-15 w-15 rounded-full flex items-center justify-center mt-2"
            />
            <span class="text-black">{{ comment.comment }}</span>
            <div class="flex gap-2">
              <button
                @click="editComment(comment)"
                class="bg-red-500 text-white p-5 m-5 rounded-xl"
              >
                Editar
              </button>
              <button
                @click="deleteComment(comment.id_comment)"
                class="text-red-500 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500">Aún no has añadido comentarios.</p>
        </div>

        <div class="mt-6">
          <div v-if="otherComments.length > 0">
            <div
              v-for="comment in comments"
              :key="comment.id_comment"
              class="bg-white shadow-md p-5 flex justify-between items-center mt-2"
            >
              <img
                src="../assets/logo.svg"
                class="h-15 w-15 rounded-full flex items-center justify-center mt-2"
              />
              <span class="text-black">{{ comment.comment }}</span>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-500">No hay comentarios de otros usuarios.</p>
          </div>
        </div>

        <div
          v-if="isEditing"
          class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
        >
          <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 class="text-xl font-bold mb-4 text-black">Editar Comentario</h3>
            <textarea
              v-model="editCommentText"
              class="w-full p-2 border border-gray-300 rounded text-black"
            ></textarea>
            <div class="flex justify-end gap-2 mt-4">
              <button
                class="bg-gray-400 text-white py-1 px-4 rounded hover:bg-gray-500"
                @click="cancelEdit"
              >
                Cancelar
              </button>
              <button
                class="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                @click="saveEdit"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/global/Header.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkshopStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import Navbar from '@/components/global/Navbar.vue'

const route = useRoute()
const id_workshop = Number(route.params.id_workshop)

const workshopStore = useWorkshopStore()
const authStore = useAuthStore()
const userStore = useUserStore()

const workshop = computed(() => {
  return (
    workshopStore.workshops.find((w) => w.id_workshop === id_workshop) || {
      title: 'No encontrado',
      description: 'No se encontro el taller.',
      content: '',
      image: '',
    }
  )
})

const calendarData = ref([])
const comments = ref([])
const newComment = ref('')
const isEditing = ref(false)
const editCommentId = ref<number | null>(null)
const editCommentText = ref('')
const subscriptions = ref<{ id_workshop_id: number }[]>([])
const isSubscribed = computed(() =>
  subscriptions.value.some((sub) => sub.id_workshop_id === id_workshop),
)
const currentUser = ref('')

onMounted(async () => {
  await workshopStore.fetchCommentsByWorkshop(id_workshop)
  comments.value = workshopStore.comments
  console.log('comentarios', comments.value)
})

onMounted(async () => {
    await userStore.getUserInfo()
    const userInfo = userStore.user // Información completa del usuario
    currentUser.value = userInfo.id_user // Asignar el ID del usuario actual
    console.log('Usuario:', userInfo)
    console.log('ID del usuario:', currentUser.value)
})

// Filtrar los comentarios propios (pertenecen al usuario actual)
const ownComments = computed(() => {
  return comments.value.filter((comment) => comment.id_user_id === currentUser.value)
})

// Filtrar los comentarios de otros usuarios
const otherComments = computed(() => {
  return comments.value.filter((comment) => comment.id_user_id !== currentUser.value)
})

onMounted(async () => {
  if (workshopStore.workshops.length === 0) {
    await workshopStore.fetchWorkshops()
  }
})
onMounted(async () => {
  await workshopStore.fetchSubscriptions() // Cargar las inscripciones
})

const submitComment = async () => {
  if (newComment.value.trim() === '') {
    alert('El comentario no puede estar vacío')
    return
  }

  const commentData = {
    comment: newComment.value,
    id_workshop_id: id_workshop,
  }

  await workshopStore.createComment(commentData)
  newComment.value = ''
}

const editComment = (comment) => {
  if (!comment || typeof comment.id_comment === 'undefined') {
    console.error('El comentario no está definido o no tiene un id_comment:', comment)
    return
  }

  if (comment.id_user !== currentUser.id_user) {
    alert('No tienes permiso para editar este comentario')
    return
  }

  editCommentId.value = comment.id_comment
  editCommentText.value = comment.comment
  isEditing.value = true
}

// Función para guardar los cambios
const saveEdit = async () => {
  if (editCommentId.value !== null) {
    await workshopStore.updatedComment(editCommentId.value, { comment: editCommentText.value })
    isEditing.value = false // Cierra el modal
  }
}

// Función para cancelar la edición
const cancelEdit = () => {
  isEditing.value = false
}

const deleteComment = async (id_comment) => {
  const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este comentario?')
  if (confirmDelete) {
    await workshopStore.deleteComment(id_comment)
  }
}

//Inscripciones
const handleSubscribe = async () => {
  try {
    if (isSubscribed.value) {
      alert('Ya esta inscrito en este taller')
      return
    }

    await workshopStore.subscribeToWorkshop({ id_workshop_id: id_workshop })
    alert('Inscripto exitosa')
    subscriptions.value.push({ id_workshop_id: id_workshop })
  } catch (error) {
    if (error.message === 'Ya estás inscrito en este taller.') {
      alert(error.message) // Mostrar el mensaje claro
    } else {
      console.error('Error al inscribirse:', error)
      alert('Hubo un problema al intentar inscribirte. Por favor, inténtalo de nuevo.')
    }
  }
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

onMounted(async () => {
  try {
    const workshopStore = useWorkshopStore()
    const calendars = await workshopStore.fetchCalendarsByWorkshopId(id_workshop)

    if (calendars && calendars.length > 0) {
      calendarData.value = calendars[0] // Solo asigna el primer calendario
    } else {
      console.log('No se encontraron datos del calendario para este taller.')
      calendarData.value = null // Asegura que sea null si no hay datos
    }
  } catch (error) {
    console.error('Error al obtener datos del calendario:', error)
  }
})

//Contenidod
const activeIndex = ref(null)

const toggleClase = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const clases = ref([
  { titulo: 'Bienvenida al taller', recursos: ['Bienvenida.mp4'] },
  { titulo: 'Clase 1', recursos: ['Recursos.mp4', 'Recursos.mp4', 'Recursos.mp4'] },
  { titulo: 'Clase 2', recursos: [] },
  { titulo: 'Clase 3', recursos: [] },
])
</script>
