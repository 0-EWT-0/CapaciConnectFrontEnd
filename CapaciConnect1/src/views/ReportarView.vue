<template>
  <Header />
  <div class="max-w-4xl mx-auto p-25 m-25 bg-white shadow-2xl rounded-2xl text-black">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Enviar Reporte</h2>

    <form @submit.prevent="handleSubmit">
      <!-- Título del Reporte -->
      <div class="mb-6">
        <label class="block text-gray-700 text-xl font-semibold">Título del Reporte</label>
        <input
          v-model="form.tittle"
          type="text"
          class="w-full mt-2 p-4 text-xl border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500"
          placeholder="Escribe el título del reporte..."
          required
        />
      </div>

      <!-- Descripción del Problema -->
      <div class="mb-6">
        <label class="block text-gray-700 text-xl font-semibold">Descripción del Problema</label>
        <textarea
          v-model="form.content"
          rows="6"
          class="w-full mt-2 p-4 text-xl border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500"
          placeholder="Describe el problema..."
          required
        ></textarea>
      </div>

      <!-- Seleccionar Taller -->
      <div class="mb-6">
        <label class="block text-gray-700 text-xl font-semibold">Taller Relacionado</label>
        <select
          v-model="form.id_workshop_id"
          @change="clearError"
          class="w-full mt-2 p-4 text-xl border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500"
          required
          :disabled="workshopTypeStore.isLoading || reportStore.isLoading"
        >
          <option disabled :value="null">Selecciona un taller</option>
          <option v-for="type in workshopTypeStore.types" :key="type.id_type" :value="type.id_type">
            {{ type.type_name }}
          </option>
        </select>

        <!-- Estados de carga de talleres -->
        <div v-if="workshopTypeStore.isLoading" class="text-blue-500 mt-2 text-lg">
          Cargando talleres disponibles...
        </div>
        <div v-if="workshopTypeStore.error" class="text-red-500 mt-2 text-lg">
          ❌ Error cargando talleres: {{ workshopTypeStore.error }}
        </div>
      </div>

      <!-- Estados de carga y error -->
      <div v-if="reportStore.isLoading" class="text-center text-blue-500 text-xl mb-4">
        Enviando reporte...
      </div>
      <div v-if="reportStore.error" class="text-red-500 text-xl mb-4">
        ❌ Error: {{ reportStore.error }}
      </div>
      <div v-if="showSuccess" class="text-green-500 text-xl mb-4">
        ✅ Reporte enviado exitosamente!
      </div>

      <!-- Botón Enviar -->
      <div class="flex justify-center mt-8">
        <button
          type="submit"
          class="px-8 py-4 text-lg bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="reportStore.isLoading || workshopTypeStore.isLoading"
        >
          📩 {{ reportStore.isLoading ? 'Enviando...' : 'Enviar Reporte' }}
        </button>
      </div>
    </form>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReportStore } from '@/stores/adminReport'
import { useWorkshopTypeStore } from '@/stores/workshopTypeStore'
import { useAuthStore } from '@/stores/auth'
import Header from '@/components/global/Header.vue'
import Footer from '@/components/global/Footer.vue'

const reportStore = useReportStore()
const authStore = useAuthStore()
const workshopTypeStore = useWorkshopTypeStore()

// Estado local
const showSuccess = ref(false)
const form = ref({
  tittle: '',
  content: '',
  id_workshop_id: null as number | null,
})

// Cargar talleres al montar el componente
onMounted(async () => {
  try {
    if (workshopTypeStore.types.length === 0) {
      await workshopTypeStore.fetchAllTypes()
    }

    if (workshopTypeStore.types.length === 0) {
      console.warn('[ReportForm] No hay talleres disponibles')
      reportStore.error = 'No hay talleres disponibles para reportar'
    }
  } catch (error) {
    console.error('[ReportForm] Error en onMounted:', error)
    reportStore.error = 'Error cargando talleres. Intenta recargar la página'
  }
})

// Nuevo método para limpiar errores
const clearError = () => {
  reportStore.error = null
}

// Manejar envío del formulario
const handleSubmit = async () => {
  showSuccess.value = false
  reportStore.error = null

  if (!authStore.user) {
    console.error('[ReportForm] Error: Usuario no autenticado')
    reportStore.error = 'Debes iniciar sesión para enviar reportes'
    return
  }

  // Validación manual del taller
  if (!form.value.id_workshop_id || form.value.id_workshop_id === null) {
    console.warn('[ReportForm] Validación fallida: Taller no seleccionado')
    reportStore.error = 'Debes seleccionar un taller'
    return
  }

  // Validación de contenido mínimo
  if (form.value.tittle.trim().length < 5 || form.value.content.trim().length < 10) {
    console.warn('[ReportForm] Validación fallida: Contenido muy corto', {
      titleLength: form.value.tittle.trim().length,
      contentLength: form.value.content.trim().length,
    })
    reportStore.error = 'El título debe tener al menos 5 caracteres y la descripción 10'
    return
  }

  try {
    console.log('[ReportForm] Intentando enviar reporte...', {
      tittle: form.value.tittle,
      content: form.value.content,
      id_workshop_id: form.value.id_workshop_id,
      id_user_id: authStore.user.Id_user,
    })

    await reportStore.createReport({
      tittle: form.value.tittle,
      content: form.value.content,
      id_workshop_id: form.value.id_workshop_id,
      id_user_id: authStore.user.Id_user,
    })

    console.log('[ReportForm] Reporte enviado exitosamente')
    showSuccess.value = true
    form.value = {
      tittle: '',
      content: '',
      id_workshop_id: null,
    }
  } catch (error) {
    console.error('[ReportForm] Error en el componente:', error)
    reportStore.error = 'Error al enviar el reporte. Intenta de nuevo'
  }
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
input:disabled,
textarea:disabled,
select:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
</style>
