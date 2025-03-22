<template>
  <Header />
  <div class="max-w-[90rem] mx-auto p-10">
    <!-- Contenedor flex para alinear título y buscador -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-black text-3xl font-bold">Todos mis talleres</h1>

      <!-- Buscador -->
      <div class="flex items-center border border-gray-300 rounded overflow-hidden w-full sm:w-96">
        <input
          type="text"
          placeholder="Buscar mis talleres..."
          class="p-2 w-full outline-none text-black"
        />
        <button class="bg-gray-600 text-white px-4 py-2">🔍</button>
      </div>
    </div>

    <!-- Controles de filtros -->
    <div class="flex justify-between items-center mb-6 rounded-lg mx-10">
      <!-- <div class="flex gap-4">
        <label class="text-lg font-semibold">Ordenar por:</label>
        <Select
          v-model="selectedOrder"
          :options="order"
          optionLabel="name"
          placeholder="Ordenado por:"
          class="border border-gray-300 rounded p-2"
        />
      </div> -->

      <!-- Grid de talleres -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="index in 6" :key="index" class="bg-white rounded-lg shadow-lg">
          <div class="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-t-lg">
            Cierra el 01 de Febrero
          </div>

          <img src="../assets/logo.svg" alt="Imagen del taller" class="w-full h-40 object-cover" />

          <div class="p-4">
            <h2 class="text-lg text-black font-bold">Titulo del Taller</h2>
            <p class="text-gray-600 text-sm">Descripción del taller de manera resumida</p>

            <p class="text-blue-600 font-semibold mt-2">Tipo de Taller</p>

            <div class="bg-gray-200 h-6 rounded-full mt-4 flex items-center">
              <div
                class="bg-green-500 text-white text-xs font-bold text-center px-2 rounded-full"
                :style="{ width: 40 + '%' }"
              >
                40% Completado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Header from '@/components/global/Header.vue'
import Footer from '@/components/global/Footer.vue'
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
