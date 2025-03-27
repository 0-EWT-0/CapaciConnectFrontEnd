<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6">
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-900">Editar tipo de taller</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="space-y-6">
        <!-- Campo Nombre -->
        <div class="space-y-3">
          <label for="nombre" class="block text-sm font-medium text-gray-700">
            Nombre del tipo
          </label>
          <input
            id="nombre"
            v-model="formData.nombre"
            type="text"
            placeholder="Ej: Pintura Abstracta"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
        </div>

        <!-- Botones de acción -->
        <div class="border-t border-gray-100 pt-6 flex justify-end gap-4">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-6 py-2.5 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-6 py-2.5 text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTypeStore } from '@/stores/TypeStore'
import type { Type } from '@/interfaces/Type'

const props = defineProps<{
  tipo: Type
}>()

const emit = defineEmits(['success', 'cancel'])

const formData = ref<Type>({
  id: props.tipo.id,
  nombre: props.tipo.nombre,
})

const typeStore = useTypeStore()

watch(
  () => props.tipo,
  (newVal) => {
    formData.value = { ...newVal }
  },
)

const handleSubmit = async () => {
  try {
    await typeStore.updateType(formData.value)
    emit('success')
  } catch (error) {
    console.error('Error al actualizar:', error)
  }
}
</script>
