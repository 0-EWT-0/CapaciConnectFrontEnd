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

      <!-- Campo oculto para el taller -->
      <input type="hidden" v-model="form.id_workshop_id" />

      <!-- Botón Enviar -->
      <div class="flex justify-center mt-8">
        <button
          type="submit"
          class="px-8 py-4 text-lg bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="reportStore.isLoading || workshopStore.isLoading"
        >
          📩 {{ reportStore.isLoading ? 'Enviando...' : 'Enviar Reporte' }}
        </button>
      </div>
    </form>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useReportStore } from '@/stores/adminReport'
import { useWorkshopStore } from '@/stores/adminWorkshop'
import { useAuthStore } from '@/stores/auth'
import Header from '@/components/global/Header.vue'
import Footer from '@/components/global/Footer.vue'

const reportStore = useReportStore()
const authStore = useAuthStore()
const workshopStore = useWorkshopStore()

// Estado local
const showSuccess = ref(false)
const form = ref({
  tittle: '',
  content: '',
  id_workshop_id: null as number | null,
})

// Verificar si el usuario tiene talleres asignados
const userHasWorkshops = computed(() => {
  return authStore.user?.Workshops && authStore.user.Workshops.length > 0
})

// Cargar talleres al montar el componente
onMounted(async () => {
  try {
    // Reiniciar errores al montar
    reportStore.error = null

    // Verificar si el usuario está autenticado
    if (!authStore.user) {
      console.warn('[ReportForm] Usuario no autenticado')
      reportStore.error = 'Debes iniciar sesión para enviar reportes'
      return
    }

    // Cargar talleres solo si no están en el store
    if (workshopStore.workshops.length === 0) {
      await workshopStore.fetchWorkshops()
    }

    // Asignar taller del usuario autenticado
    if (userHasWorkshops.value) {
      // Asignar automáticamente el primer taller del usuario
      form.value.id_workshop_id = authStore.user.Workshops[0].id_workshop
      console.log('[ReportForm] Taller asignado automáticamente:', form.value.id_workshop_id)
    } else {
      // Verificar si hay talleres disponibles en el store
      if (workshopStore.workshops && workshopStore.workshops.length > 0) {
        // Si no tiene talleres asignados directamente pero hay talleres disponibles, asignar el primero
        form.value.id_workshop_id = workshopStore.workshops[0].id_workshop
        console.log('[ReportForm] Asignando primer taller disponible:', form.value.id_workshop_id)
      } else {
        console.warn('[ReportForm] No hay talleres disponibles')
        reportStore.error = 'No hay talleres disponibles para reportar'
      }
    }
  } catch (error) {
    console.error('Error inicializando formulario:', error)
    reportStore.error = 'Error cargando datos iniciales'
  }
})

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
  if (!form.value.id_workshop_id) {
    console.warn('[ReportForm] Validación fallida: Taller no seleccionado')
    reportStore.error = 'No se ha seleccionado un taller'
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
    form.value.tittle = ''
    form.value.content = ''
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
