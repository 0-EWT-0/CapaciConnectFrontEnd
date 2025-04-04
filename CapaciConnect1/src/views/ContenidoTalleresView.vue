<template>
  <Navbar />
  <div>
    <!-- Barra superior -->
    <div class="w-full absolute flex flex-col gap-4 mt-11">
      <h3 v-if="calendarData" class="bg-[#059669] p-2 rounded-r-lg h-10 w-[20rem] text-center">
        Inicia el
        {{ formatDate(calendarData.date_start ? calendarData.date_start : 'sin fecha de incio') }}
      </h3>
      <h3 class="bg-[#DC2626] p-2 rounded-r-lg h-10 w-[20rem] text-center">
        Cierra el
        {{ formatDate(calendarData.date_end ? calendarData.date_end : 'sin fecha de cierre') }}
      </h3>
    </div>

    <div class="flex-1 h-40 md:h-auto">
      <img
        :src="'data:image/jpeg;base64,' + workshop.image"
        alt="Imagen"
        class="w-full h-[500px] object-cover"
      />
      <div class="bg-[#F2F5FA] p-11">
        <div class="mb-4">
          <h2 class="text-[#212122]">{{ workshop.title }}</h2>
          <p class="text-[#212122]">
            {{ workshop.description ? workshop.description : 'sin descripcion' }}.
          </p>
        </div>

        <div class="my-4 text-[#212122]">
          <p>
            Fecha de creación:
            <span class="text-[#2563EB]">{{ formatDate(workshop.created_at) }}</span>
          </p>
        </div>

        <div>
          <BaseButton @click="handleSubscribe" :disabled="isSubscribed">{{
            isSubscribed ? 'Inscrito' : 'Inscríbete'
          }}</BaseButton>
        </div>
      </div>
    </div>

    <div class="flex flex-col px-11 justify-center text-justify">
      <h2 class="text-[#212122] pt-11 pb-4">Contenido</h2>
      <div v-if="workshop.content" class="text-[#212122]">
        <p v-for="(paragraph, index) in splitContent(workshop.content)" :key="index">
          {{ paragraph }}
        </p>
      </div>
      <h3 v-else class="text-[#212122]">Sin contenido disponible</h3>
    </div>

    <div class="my-19 p-11 bg-[#F2F5FA]">
      <h2 class="text-[#212122]">Comentarios</h2>

      <div class="flex gap-2 my-4">
        <img
          src="../assets/imgs/userAvatar.webp"
          class="h-15 w-15 rounded-full flex items-center justify-center"
        />
        <textarea
          v-model="newComment"
          class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          placeholder="Agrega un comentario..."
        />
      </div>

      <BaseButton variant="" @click="submitComment">Comentar</BaseButton>

      <!-- Comentarios de ejemplo -->
      <div class="mt-5">
        <div v-if="ownComments.length > 0">
          <div
            v-for="comment in ownComments"
            :key="comment.id_comment"
            class="gap-2 flex justify-between items-center w-full mt-11"
          >
            <img
              src="../assets/imgs/userAvatar.webp"
              class="h-15 w-15 rounded-full flex items-center justify-center"
            />
            <div class="bg-white text-[#212122] rounded-lg w-full p-4">{{ comment.comment }}</div>

            <div class="flex gap-2">
              <BaseButton variant="orange" @click="editComment(comment)">Editar</BaseButton>
              <BaseButton variant="red" @click="deleteComment(comment.id_comment)"
                >Eliminar</BaseButton
              >
            </div>
          </div>
        </div>

        <div class="mt-5">
          <div v-if="otherComments.length > 0">
            <div
              v-for="comment in comments"
              :key="comment.id_comment"
              class="gap-2 flex justify-between items-center w-full mt-11"
            >
              <img
                src="../assets/imgs/userAvatar.webp"
                class="h-15 w-15 rounded-full flex items-center justify-center"
              />
              <div class="bg-white text-[#212122] rounded-lg w-full p-4">{{ comment.comment }}</div>
            </div>
          </div>
        </div>

        <div v-if="comments.length < 0">
          <h3 class="text-gray-500">No hay comentarios disponibles</h3>
        </div>

        <div
          v-if="isEditing"
          class="fixed inset-0 bg-[#040273] bg-opacity-75 flex items-center justify-center"
        >
          <!-- <Loading v-if="loadingStore.isLoading" class="absolute"/> -->
          <div class="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <Form :validation-schema="validationComments" @submit="saveEdit">
              <h3 class="text-[#212122] pb-4">Editar</h3>
              <Field
                as="textarea"
                name="comment"
                v-model="editCommentText"
                class="bg-[#F2F5FA] text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              />
              <ValidationMessage prop="comment" />
              <div class="flex justify-end gap-2 mt-4">
                <BaseButton variant="gray" @click="cancelEdit">Cancelar</BaseButton>
                <BaseButton variant="green">Guardar</BaseButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkshopStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import Navbar from '@/components/global/Navbar.vue'
import Swal from 'sweetalert2'
import BaseButton from '@/components/common/BaseButton.vue'
import { Field, Form } from 'vee-validate'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import { validationComments } from '@/schemas/validations'

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
  // console.log('comentarios', comments.value)
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
    Swal.fire({
      title: 'Error',
      text: 'Tu comentario no puede estar vacío',
      icon: 'warning',
      confirmButtonColor: '#2563EB',
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
    // alert('El comentario no puede estar vacío')
    return
  }

  const commentData = {
    comment: newComment.value,
    id_workshop_id: id_workshop,
  }

  await workshopStore.createComment(commentData)
  newComment.value = ''
  await workshopStore.fetchCommentsByWorkshop(id_workshop)
  comments.value = workshopStore.comments
  Swal.fire({
        icon: 'success',
        title: 'Comentario publicado',
        showConfirmButton: false,
        timer: 1500,
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
}

const editComment = (comment) => {
  if (!comment || typeof comment.id_comment === 'undefined') {
    console.error('El comentario no está definido o no tiene un id_comment:', comment)
    return
  }

  if (comment.id_user !== currentUser.id_user) {
    Swal.fire({
      icon: 'error',
      title: 'Error al Comentar',
      text: 'No tienes permiso para editar este comentario',
    })
    // alert('No tienes permiso para editar este comentario')
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
    Swal.fire({
      icon: 'success',
      title: 'Tu comentario fue actualizado',
      showConfirmButton: false,
      timer: 1500,
      backdrop: 'rgba(4, 2, 115, 0.7)',
    })
    isEditing.value = false // Cierra el modal
  }
}

// Función para cancelar la edición
const cancelEdit = () => {
  isEditing.value = false
}

const deleteComment = async (id_comment) => {
  const result = await Swal.fire({
    title: '¿Quieres eliminar tu comentario?',
    text: 'Esta acción es irreversible',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#BCCCDC',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#059669',
    confirmButtonText: 'Confirmar',
    backdrop: 'rgba(4, 2, 115, 0.7)',
  })
  // const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este comentario?')
  if (result.isConfirmed) {
    try {
      await workshopStore.deleteComment(id_comment)
      Swal.fire({
        title: 'Comentario eliminado',
        text: 'Tu comentario ha sido eliminado correctamente',
        icon: 'success',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
      await workshopStore.fetchCommentsByWorkshop(id_workshop)
      comments.value = workshopStore.comments
    } catch (error) {
      console.error('Error al Eliminar el comentario', error)
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar tu comentario',
        icon: 'error',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
    }
  }
}

//Inscripciones
const handleSubscribe = async () => {
  try {
    if (isSubscribed.value) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Ya esta inscrito en este taller',
      })
      // alert('Ya esta inscrito en este taller')
      return
    }

    await workshopStore.subscribeToWorkshop({ id_workshop_id: id_workshop })
    const progressionData={
      progression_status: '100',
      id_workshop_id: id_workshop,
    }
    await workshopStore.CreateProgression(progressionData)
    
    Swal.fire({
      icon: 'success',
      title: 'Inscricion Exitosa',
      text: 'Te inscribirte correctamente al taller',
    })
    // alert('Inscripto exitosa')
    subscriptions.value.push({ id_workshop_id: id_workshop })
  } catch (error) {
    if (error.message === 'Ya estás inscrito en este taller.') {
      Swal.fire({
        icon: 'error',
        title: 'Error al Inscribirte',
        text: error.message,
      })
      // alert(error.message) Mostrar el mensaje claro
    } else {
      console.error('Error al inscribirse:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error al Inscribirte',
        text: 'Hubo un problema al intentar inscribirte. Por favor, inténtalo de nuevo.',
      })
      // alert('Hubo un problema al intentar inscribirte. Por favor, inténtalo de nuevo.')
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
// const activeIndex = ref(null)

// const toggleClase = (index) => {
//   activeIndex.value = activeIndex.value === index ? null : index
// }

const clases = ref([
  { titulo: 'Bienvenida al taller', recursos: ['Bienvenida.mp4'] },
  { titulo: 'Clase 1', recursos: ['Recursos.mp4', 'Recursos.mp4', 'Recursos.mp4'] },
  { titulo: 'Clase 2', recursos: [] },
  { titulo: 'Clase 3', recursos: [] },
])
const splitContent = (content: string) => {
  return content ? content.split('\n').filter((paragraph) => paragraph.trim() !== '') : []
}
</script>
