<template>
  <div class="p-16">
    <h2 class="text-[#212122] pb-4">Gestión de Talleres</h2>

    <!-- Formulario de creación -->
    <form class="bg-[#F2F5FA] rounded-lg p-4 mb-8" @submit.prevent="handleSubmit">
      <h3 class="text-[#212122] pb-4">Crear nuevo taller</h3>

      <!-- Campos del formulario -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Título -->
        <div class="pb-4">
          <label class="text-[#212122] block pb-2">Título *</label>
          <input
            v-model="formData.title"
            class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB]"
            placeholder="Título del taller"
            required
          />
          <span v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</span>
        </div>

        <!-- Tipo de taller -->
        <div class="pb-4">
          <label class="text-[#212122] block pb-2">Tipo de taller *</label>
          <select
            v-model="formData.id_type_id"
            class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB]"
            required
            :disabled="workshopTypesLoading"
          >
            <option value="0" disabled>Seleccione un tipo</option>
            <option
              v-for="type in workshopTypes"
              :key="type.id_type"
              :value="type.id_type"
            >
              {{ type.type_name }}
            </option>
          </select>
          <span v-if="errors.id_type_id" class="text-red-500 text-sm">{{ errors.id_type_id }}</span>
          <span v-if="workshopTypesLoading" class="text-blue-500 text-sm">Cargando tipos...</span>
        </div>

        <!-- Descripción -->
        <div class="pb-4 md:col-span-2">
          <label class="text-[#212122] block pb-2">Descripción *</label>
          <textarea
            v-model="formData.description"
            class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB] min-h-[100px]"
            placeholder="Descripción del taller"
            required
          ></textarea>
          <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
        </div>

        <!-- Contenido -->
        <div class="pb-4 md:col-span-2">
          <label class="text-[#212122] block pb-2">Contenido *</label>
          <textarea
            v-model="formData.content"
            class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB] min-h-[150px]"
            placeholder="Contenido detallado del taller"
            required
          ></textarea>
          <span v-if="errors.content" class="text-red-500 text-sm">{{ errors.content }}</span>
        </div>

        <!-- Imagen -->
        <div class="pb-4 md:col-span-2">
          <label class="text-[#212122] block pb-2">Imagen {{
            formData.image && formData.image !== 'Imagen url' ? '(Seleccionada)' : ''
          }}</label>
          <input
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB]"
          />
          <span v-if="errors.image" class="text-red-500 text-sm">{{ errors.image }}</span>
        </div>
      </div>

      <!-- Botón de envío -->
      <div class="pt-4">
        <BaseButton variant="green" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Creando...' : 'Crear taller' }}
        </BaseButton>
      </div>
    </form>

    <!-- Listado de talleres -->
    <div class="mt-8 px-4 pb-11 rounded-lg bg-[#F2F5FA]">
      <h2 class="text-[#212122] py-6">Talleres existentes</h2>

      <!-- Mensajes de estado -->
      <div v-if="isLoading" class="text-center py-8">
        <p>Cargando talleres...</p>
      </div>
      <div v-else-if="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-else-if="workshopList.length === 0" class="text-gray-500 py-8 text-center">
        No hay talleres disponibles
      </div>

      <!-- Grid de talleres -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="workshop in workshopList"
          :key="workshop.id_workshop"
          class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Imagen del taller -->
          <div class="h-48 overflow-hidden">
            <img
              v-if="workshop.image && workshop.image !== 'Imagen url'"
              :src="'data:image/jpeg;base64,' + workshop.image"
              alt="Imagen del taller"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500">Sin imagen</span>
            </div>
          </div>

          <!-- Contenido del taller -->
          <div class="p-4">
            <h3 class="text-xl font-semibold text-[#212122] mb-2">{{ workshop.title }}</h3>
            <p class="text-[#565656] mb-3 line-clamp-2">{{ workshop.description }}</p>
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {{ getWorkshopTypeName(workshop.id_type_id) }}
              </span>
              <div class="text-sm text-gray-500">
                ID: {{ workshop.id_workshop }}
              </div>
            </div>
          </div>

          <!-- Acciones -->
          <div class="px-4 pb-4 flex gap-2">
            <BaseButton
              variant="blue"
              @click="openEditModal(workshop)"
              class="flex-1"
            >
              Editar
            </BaseButton>
            <BaseButton
              variant="red"
              @click="confirmDeleteWorkshop(workshop.id_workshop)"
              class="flex-1"
            >
              Eliminar
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Editar Taller</h2>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleEditSubmit">
          <!-- Campos del formulario de edición -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Título -->
            <div class="pb-4">
              <label class="text-[#212122] block pb-2">Título *</label>
              <input
                v-model="editFormData.title"
                class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB]"
                placeholder="Título del taller"
                required
              />
              <span v-if="editErrors.title" class="text-red-500 text-sm">{{ editErrors.title }}</span>
            </div>

            <!-- Tipo de taller -->
            <div class="pb-4">
              <label class="text-[#212122] block pb-2">Tipo de taller *</label>
              <select
                v-model="editFormData.id_type_id"
                class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB]"
                required
                :disabled="workshopTypesLoading"
              >
                <option value="0" disabled>Seleccione un tipo</option>
                <option
                  v-for="type in workshopTypes"
                  :key="type.id_type"
                  :value="type.id_type"
                >
                  {{ type.type_name }}
                </option>
              </select>
              <span v-if="editErrors.id_type_id" class="text-red-500 text-sm">{{ editErrors.id_type_id }}</span>
            </div>

            <!-- Descripción -->
            <div class="pb-4 md:col-span-2">
              <label class="text-[#212122] block pb-2">Descripción *</label>
              <textarea
                v-model="editFormData.description"
                class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB] min-h-[100px]"
                placeholder="Descripción del taller"
                required
              ></textarea>
              <span v-if="editErrors.description" class="text-red-500 text-sm">{{ editErrors.description }}</span>
            </div>

            <!-- Contenido -->
            <div class="pb-4 md:col-span-2">
              <label class="text-[#212122] block pb-2">Contenido *</label>
              <textarea
                v-model="editFormData.content"
                class="bg-white text-[#565656] rounded-lg w-full p-3 focus:outline-0 border border-[#D1D5DB] min-h-[150px]"
                placeholder="Contenido detallado del taller"
                required
              ></textarea>
              <span v-if="editErrors.content" class="text-red-500 text-sm">{{ editErrors.content }}</span>
            </div>

            <!-- Imagen -->
            <div class="pb-4 md:col-span-2">
              <label class="text-[#212122] block pb-2">Imagen {{
                editFormData.image && editFormData.image !== 'Imagen url' ? '(Actual)' : ''
              }}</label>
              <div class="flex items-center gap-4">
                <div v-if="editFormData.image && editFormData.image !== 'Imagen url'" class="w-24 h-24">
                  <img
                    :src="'data:image/jpeg;base64,' + editFormData.image"
                    alt="Imagen actual"
                    class="w-full h-full object-cover rounded"
                  />
                </div>
                <input
                  type="file"
                  @change="handleEditFileUpload"
                  accept="image/*"
                  class="bg-white text-[#565656] rounded-lg flex-1 p-3 focus:outline-0 border border-[#D1D5DB]"
                />
              </div>
              <span v-if="editErrors.image" class="text-red-500 text-sm">{{ editErrors.image }}</span>
            </div>
          </div>

          <!-- Botones del modal -->
          <div class="flex justify-end gap-3 pt-4 border-t mt-4">
            <BaseButton
              variant="gray"
              @click="closeEditModal"
              type="button"
              :disabled="isEditing"
            >
              Cancelar
            </BaseButton>
            <BaseButton
              variant="green"
              type="submit"
              :disabled="isEditing"
            >
              {{ isEditing ? 'Guardando...' : 'Guardar cambios' }}
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import BaseButton from '@/components/common/BaseButton.vue'
import { createWorkshop, deleteWorkshop, getAllWorkshop, updateWorkshop } from '@/services/WorkshopService'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'
import type { IWorkshop } from '@/interfaces/IWorkshop'
import type { WorkshopType } from '@/interfaces/workshopTypesInterface'

// Store de tipos de taller
const workshopTypeStore = useWorkshopTypeStore()
const workshopTypes = ref<WorkshopType[]>([])
const workshopTypesLoading = ref(false)

// Estado del componente
const workshopList = ref<IWorkshop[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
const isSubmitting = ref(false)
const isEditing = ref(false)
const isEditModalOpen = ref(false)
const currentlyEditingId = ref<number | null>(null)

// Formularios
const formData = ref<IWorkshop>({
  title: '',
  description: '',
  content: '',
  image: 'Imagen url',
  id_type_id: 0
})

const editFormData = ref<IWorkshop>({
  title: '',
  description: '',
  content: '',
  image: 'Imagen url',
  id_type_id: 0
})

// Errores
const errors = ref<Record<string, string>>({})
const editErrors = ref<Record<string, string>>({})

// Convertir archivo a Base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '')
    reader.onerror = (error) => reject(error)
  })
}

// Manejador de carga de archivos (creación)
const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    if (file.size > 2 * 1024 * 1024) { // 2MB máximo
      errors.value.image = 'La imagen no debe exceder los 2MB'
      return
    }

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      errors.value.image = 'Solo se permiten imágenes (JPEG, PNG, GIF)'
      return
    }

    formData.value.image = await convertToBase64(file)
    errors.value.image = ''
    showToast('success', 'Imagen lista para subir')
  } catch (error) {
    errors.value.image = 'Error al procesar la imagen'
    console.error(error)
    showToast('error', 'Error al procesar la imagen')
  }
}

// Manejador de carga de archivos (edición)
const handleEditFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    if (file.size > 2 * 1024 * 1024) { // 2MB máximo
      editErrors.value.image = 'La imagen no debe exceder los 2MB'
      return
    }

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      editErrors.value.image = 'Solo se permiten imágenes (JPEG, PNG, GIF)'
      return
    }

    editFormData.value.image = await convertToBase64(file)
    editErrors.value.image = ''
    showToast('success', 'Imagen lista para actualizar')
  } catch (error) {
    editErrors.value.image = 'Error al procesar la imagen'
    console.error(error)
    showToast('error', 'Error al procesar la imagen')
  }
}

// Validar formulario de creación
const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  if (!formData.value.title.trim()) {
    errors.value.title = 'El título es requerido'
    isValid = false
  }

  if (!formData.value.description.trim()) {
    errors.value.description = 'La descripción es requerida'
    isValid = false
  }

  if (!formData.value.content.trim()) {
    errors.value.content = 'El contenido es requerido'
    isValid = false
  }

  if (formData.value.id_type_id <= 0) {
    errors.value.id_type_id = 'Seleccione un tipo de taller'
    isValid = false
  }

  if (formData.value.image === 'Imagen url') {
    errors.value.image = 'La imagen es requerida'
    isValid = false
  }

  return isValid
}

// Validar formulario de edición
const validateEditForm = (): boolean => {
  editErrors.value = {}
  let isValid = true

  if (!editFormData.value.title.trim()) {
    editErrors.value.title = 'El título es requerido'
    isValid = false
  }

  if (!editFormData.value.description.trim()) {
    editErrors.value.description = 'La descripción es requerida'
    isValid = false
  }

  if (!editFormData.value.content.trim()) {
    editErrors.value.content = 'El contenido es requerido'
    isValid = false
  }

  if (editFormData.value.id_type_id <= 0) {
    editErrors.value.id_type_id = 'Seleccione un tipo de taller'
    isValid = false
  }

  return isValid
}

// Manejador de envío del formulario de creación
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  try {
    await createWorkshop(formData.value)
    showSuccessAlert('Taller creado exitosamente')
    resetForm()
    await fetchWorkshops()
  } catch (error) {
    console.error('Error al crear el taller:', error)
    showErrorAlert('Error al crear el taller', 'Ocurrió un error al intentar crear el taller')
  } finally {
    isSubmitting.value = false
  }
}

// Manejador de envío del formulario de edición
const handleEditSubmit = async () => {
  if (!validateEditForm() || !currentlyEditingId.value) return

  isEditing.value = true
  try {
    await updateWorkshop(currentlyEditingId.value, editFormData.value)
    showSuccessAlert('Taller actualizado exitosamente')
    closeEditModal()
    await fetchWorkshops()
  } catch (error) {
    console.error('Error al actualizar el taller:', error)
    showErrorAlert('Error al actualizar el taller', 'Ocurrió un error al intentar actualizar el taller')
  } finally {
    isEditing.value = false
  }
}

// Obtener tipos de taller
const fetchWorkshopTypes = async () => {
  workshopTypesLoading.value = true
  try {
    await workshopTypeStore.fetchAllTypes()
    workshopTypes.value = workshopTypeStore.types
  } catch (error) {
    console.error('Error al cargar tipos de taller:', error)
    showErrorAlert('Error', 'No se pudieron cargar los tipos de taller')
  } finally {
    workshopTypesLoading.value = false
  }
}

// Obtener nombre del tipo por ID
const getWorkshopTypeName = (typeId: number): string => {
  const type = workshopTypes.value.find(t => t.id_type === typeId)
  return type ? type.type_name : 'Desconocido'
}

// Obtener lista de talleres
const fetchWorkshops = async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const response = await getAllWorkshop()
    workshopList.value = response.data || []

    // Asegurar que cada taller tenga un id_workshop
    workshopList.value = workshopList.value.map(workshop => ({
      ...workshop,
      id_workshop: workshop.id_workshop || 0
    }))
  } catch (error) {
    console.error('Error al obtener talleres:', error)
    errorMessage.value = 'Error al cargar los talleres'
    showErrorAlert('Error', 'No se pudieron cargar los talleres')
  } finally {
    isLoading.value = false
  }
}

// Abrir modal de edición
const openEditModal = (workshop: IWorkshop) => {
  currentlyEditingId.value = workshop.id_workshop || null
  editFormData.value = {
    ...workshop,
    id_type_id: workshop.id_type_id || 0
  }
  isEditModalOpen.value = true
}

// Cerrar modal de edición
const closeEditModal = () => {
  isEditModalOpen.value = false
  currentlyEditingId.value = null
  editFormData.value = {
    title: '',
    description: '',
    content: '',
    image: 'Imagen url',
    id_type_id: 0
  }
  editErrors.value = {}
}

// Confirmar eliminación de taller
const confirmDeleteWorkshop = async (id_workshop: number) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el taller permanentemente',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#059669',
    cancelButtonColor: '#dc2626',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    backdrop: 'rgba(0,0,0,0.7)'
  })

  if (result.isConfirmed) {
    try {
      await deleteWorkshop(id_workshop)
      showSuccessAlert('Taller eliminado correctamente')
      await fetchWorkshops()
    } catch (error) {
      console.error('Error al eliminar el taller:', error)
      showErrorAlert('Error al eliminar', 'No se pudo eliminar el taller')
    }
  }
}

// Resetear formulario de creación
const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    content: '',
    image: 'Imagen url',
    id_type_id: 0
  }
  errors.value = {}
}

// Mostrar alerta de éxito
const showSuccessAlert = (title: string) => {
  Swal.fire({
    title,
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    backdrop: 'rgba(0,0,0,0.7)'
  })
}

// Mostrar alerta de error
const showErrorAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#059669',
    backdrop: 'rgba(0,0,0,0.7)'
  })
}

// Mostrar toast
const showToast = (icon: 'success' | 'error', title: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon,
    title
  })
}

// Cargar datos al montar el componente
onMounted(async () => {
  await fetchWorkshopTypes()
  await fetchWorkshops()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
