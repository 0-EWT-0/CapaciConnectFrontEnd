<template>
  <div>
    <!-- Sidebar -->
    <NavbarCoord />

    <!-- Contenido principal con margen izquierdo -->
    <div class="ml-[20rem] min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 p-6">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">
        Gestión del Calendario de Actividades
      </h1>

      <!-- Formulario para crear una nueva actividad -->
      <div class="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Crear Nueva Actividad</h2>
        <form @submit.prevent="createCalendar" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="date_start" class="block text-sm font-medium text-gray-700"
                >Fecha de Inicio</label
              >
              <input
                type="datetime-local"
                v-model="newCalendar.date_start"
                id="date_start"
                class="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="date_end" class="block text-sm font-medium text-black">Fecha de Fin</label>
              <input
                type="datetime-local"
                v-model="newCalendar.date_end"
                id="date_end"
                class="mt-1 block w-full rounded-md border-gray-800 shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="workshop_id" class="block text-sm font-medium text-black">Taller</label>
              <input
                type="number"
                v-model="newCalendar.workshop_id"
                id="workshop_id"
                class="mt-1 block w-full rounded-md border-gray-800 shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="Ingresa el ID del taller"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Crear Calendario
          </button>
        </form>
      </div>

      <!-- Lista de actividades programadas -->
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Actividades Programadas</h2>
        <div class="space-y-4">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Taller {{ activity.workshop_id }}</h3>
                <p class="text-sm text-gray-600">
                  {{ formatDate(activity.date_start) }} - {{ formatDate(activity.date_end) }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button @click="editActivity(activity)" class="text-indigo-600 hover:text-indigo-900">
                  Editar
                </button>
                <button @click="deleteActivity(activity.id)" class="text-red-600 hover:text-red-900">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para editar actividad -->
      <div
        v-if="isEditing"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Editar Actividad</h2>
          <form @submit.prevent="updateActivity" class="space-y-4">
            <div>
              <label for="edit_date_start" class="block text-sm font-medium text-gray-700"
                >Fecha de Inicio</label
              >
              <input
                type="datetime-local"
                v-model="editingActivity.date_start"
                id="edit_date_start"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="edit_date_end" class="block text-sm font-medium text-gray-700"
                >Fecha de Fin</label
              >
              <input
                type="datetime-local"
                v-model="editingActivity.date_end"
                id="edit_date_end"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            <div>
              <label for="edit_workshop_id" class="block text-sm font-medium text-gray-700"
                >ID del Taller</label
              >
              <input
                type="number"
                v-model="editingActivity.workshop_id"
                id="edit_workshop_id"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="Ingresa el ID del taller"
                required
              />
            </div>
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="isEditing = false"
                class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import NavbarCoord from '@/components/global/Coordinador/NavbarCoord.vue';

export default {
  components: {
    NavbarCoord,
  },
  setup() {
    const activities = ref([
      {
        id: 1,
        date_start: '2023-10-01T09:00',
        date_end: '2023-10-01T12:00',
        workshop_id: 101,
      },
      {
        id: 2,
        date_start: '2023-10-02T10:00',
        date_end: '2023-10-02T13:00',
        workshop_id: 102,
      },
    ]);

    const newCalendar = ref({
      date_start: '',
      date_end: '',
      workshop_id: null,
    });

    const isEditing = ref(false);
    const editingActivity = ref({
      id: null,
      date_start: '',
      date_end: '',
      workshop_id: null,
    });

    const createCalendar = () => {
      const newActivity = {
        id: activities.value.length + 1,
        ...newCalendar.value,
      };
      activities.value.push(newActivity);
      newCalendar.value = { date_start: '', date_end: '', workshop_id: null };
    };

    const editActivity = (activity) => {
      editingActivity.value = { ...activity };
      isEditing.value = true;
    };

    const updateActivity = () => {
      const index = activities.value.findIndex((a) => a.id === editingActivity.value.id);
      if (index !== -1) {
        activities.value.splice(index, 1, { ...editingActivity.value });
      }
      isEditing.value = false;
    };

    const deleteActivity = (id) => {
      activities.value = activities.value.filter((activity) => activity.id !== id);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    return {
      activities,
      newCalendar,
      isEditing,
      editingActivity,
      createCalendar,
      editActivity,
      updateActivity,
      deleteActivity,
      formatDate,
    };
  },
};
</script>

<style></style>
