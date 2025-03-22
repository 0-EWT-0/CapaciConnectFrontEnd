<template>
    <NavbarCoord />
    <div class="ml-[25rem]">
      <div class="flex justify-center text-black font-bold">
        <h1 class="text-black text-sm">Hola, Coordinador Marco Hau</h1>
      </div>
    <div class="bg-white p-4 rounded shadow-md mt-6 max-w-3xl mx-auto">
      <h2 class="text-xl font-semibold mb-4 text-black">Crear Taller</h2>
      
      <form>
        <div class="mb-4">
          <label class="block text-sm font-medium text-black">Título del Taller</label>
          <input type="text" class="w-full border p-2 rounded border-black" required>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-black">Descripción</label>
          <textarea class="w-full border p-2 rounded border-black" rows="3 "></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-black">Tipo de Taller</label>
            <Select v-model="selectPrime" :options="prime" optionLabel="type" placeholder="Select a Tipo" class="w-full border p-2 m-2 rounded"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-black">Instructor</label>
            <Select v-model="select2" :options="prime2" optionLabel="instructor" placeholder="Select a Tipo" class="w-full border p-2 m-2 rounded"/>
          </div>
        </div>

        <div class="mb-5">
          <div class="card flex flex-col gap-6 items-center justify-center text-black">
              <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" class="bg-white"/>
          </div>
        </div>

        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded w-full">
          Crear Taller
        </button>
      </form>
    </div>

    <div class="container mx-auto p-6">
    <!-- Grid de talleres -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="index in 2" class="bg-white rounded-lg shadow-lg">

        <!-- Imagen -->
        <img src="../../assets/logo.svg" alt="Imagen del taller" class="w-full h-40 object-cover">

        <!-- Información del Taller -->
        <div class="p-4">
          <h2 class="text-lg font-bold text-black">Taller de JavaScript Avanzado</h2>
          <p class="text-gray-600 text-sm">Domina JavaScript moderno con proyectos prácticos.</p>

          <p class="text-blue-600 font-semibold mt-2">Programación</p>
          <p class="text-blue-600 font-semibold mt-2">Instructor: Marco Hau</p>

          <!-- Barra de progreso -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import NavbarCoord from '@/components/global/Coordinador/NavbarCoord.vue'
import { ref } from "vue";

const selectPrime = ref();
const prime = ref([
  { type: 'tema 1'},
  { type: 'tema 2'},
])

const select2 = ref();
const prime2 = ref([
  { instructor: 'instructor 1'},
  { instructor: 'instructor 2'},
])

//COMPONENTES PRIMEVUE 
import Select from 'primevue/select';
import FileUpload from 'primevue/fileupload';

</script>
