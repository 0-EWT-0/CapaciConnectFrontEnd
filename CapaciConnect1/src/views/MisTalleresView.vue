<template>
  <Header />
  <div class="max-w-[90rem] mx-auto p-10">
    <!-- Contenedor flex para alinear título y buscador -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-black text-3xl font-bold">Todos mis talleres</h1>

      <!-- Buscador -->
      <div class="flex items-center border border-gray-300 rounded overflow-hidden w-full sm:w-96">
        <input type="text" placeholder="Buscar mis talleres..." class="p-2 w-full outline-none" />
        <button class="bg-gray-600 text-white px-4 py-2">🔍</button>
      </div>
    </div>

    <!-- Controles de filtros -->
    <div class="flex justify-between items-center mb-6 rounded-lg mx-10">
      <div class="flex gap-4">
        <label class="text-lg font-semibold">Ordenar por:</label>
        <Select
          v-model="selectedOrder"
          :options="order"
          optionLabel="name"
          placeholder="Ordenado por:"
          class="border border-gray-300 rounded p-2"
        />
      </div>

      <div class="flex gap-4">
        <label class="text-lg font-semibold">Filtrar por:</label>
        <Select
          v-model="selectedCursos"
          :options="cursos"
          optionLabel="name"
          placeholder="Categoría"
          class="border border-gray-300 rounded p-2"
        />
        <Select
          v-model="selectedCursos"
          :options="cursos"
          optionLabel="teacher"
          placeholder="Instructor"
          class="border border-gray-300 rounded p-2"
        />
      </div>
    </div>

    <!-- Grid de talleres -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="(curso, index) in cursos" :key="index" class="bg-gray-200 rounded-lg shadow-md">
        <div class="bg-gray-300 text-center p-3 rounded-t-lg text-xl font-bold">
          {{ curso.name }}
        </div>
        <div class="p-4">
          <p class="text-lg font-semibold">Nombre del Taller</p>
          <p class="text-sm text-gray-600">{{ curso.teacher }}</p>
          <p class="text-xs text-gray-500 mt-2">📊 Gráfica de progreso en el curso</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/global/Header.vue'
import Select from 'primevue/select'
import { ref } from 'vue'

const selectedOrder = ref()
const order = ref([
  { name: 'Título A-Z' },
  { name: 'Título Z-A' },
  { name: 'Inscrito recientemente' },
])

const selectedCursos = ref()
const cursos = ref([
  { name: 'Categoría 1', teacher: 'Instructor 1' },
  { name: 'Categoría 2', teacher: 'Instructor 2' },
  { name: 'Categoría 3', teacher: 'Instructor 3' },
])
</script>
