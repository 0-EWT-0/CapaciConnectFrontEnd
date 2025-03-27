<template>
    <!-- ... código existente ... -->

    <!-- Modal de Edición -->
    <div v-if="mostrarModalEdicion"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-900">Editar Rol</h3>
                <button @click="cerrarModal" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form @submit.prevent="guardarCambios">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Rol</label>
                        <input v-model="rolEditable.nombre" type="text" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea v-model="rolEditable.descripcion" required rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                    </div>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                    <button type="button" @click="cerrarModal"
                        class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="px-6 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-medium transition-colors">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRolStore } from '@/stores/adminRol'
import type { Rol } from '@/services/adminRolService'

const rolStore = useRolStore()

// Estado del modal y edición
const mostrarModalEdicion = ref(false)
const rolEditable = reactive<Rol>({
    id: 0,
    nombre: '',
    descripcion: ''
})

const editarRol = (id: number) => {
    const rol = rolStore.roles.find(r => r.id === id)
    if (rol) {
        Object.assign(rolEditable, rol)
        mostrarModalEdicion.value = true
    }
}

const cerrarModal = () => {
    mostrarModalEdicion.value = false
    Object.assign(rolEditable, { id: 0, nombre: '', descripcion: '' })
}

const guardarCambios = async () => {
    try {
        await rolStore.updateRole({ ...rolEditable })
        cerrarModal()
    } catch (error) {
        console.error('Error al actualizar el rol:', error)
    }
}
</script>