<template>
  <Header />
  <div class="container mx-auto px-4 py-8">
    <Card>
      <template #title>
        <div class="text-2xl font-bold">Editar Perfil</div>
      </template>
      <template #subtitle>
        <div class="text-gray-500">Actualiza tu información personal</div>
      </template>
      <template #content>
        <form class="p-fluid bg-white shadow-lg rounded-lg p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Columna de imagen y datos personales -->
            <div class="flex flex-col items-center gap-6">
              <div class="relative">
                <img
                  src="../assets/logo.svg"
                  alt="UserImage"
                  class="w-32 h-32 rounded-full shadow-lg object-cover"
                />
              </div>
              <div class="space-y-4 w-full">
                <div class="field">
                  <label for="nombre" class="block text-lg font-medium mb-1 text-center">Nombre</label>
                  <InputText id="nombre" v-model="usuario.nombre" class="w-full rounded-lg text-center" />
                </div>

                <div class="field">
                  <label for="apellido" class="block text-lg font-medium mb-1 text-center">Apellido</label>
                  <InputText id="apellido" v-model="usuario.apellido" class="w-full rounded-lg text-center" />
                </div>

                <div class="field">
                  <label for="email" class="block text-lg font-medium mb-1 text-center">Email</label>
                  <InputText id="email" v-model="usuario.email" type="email" class="w-full rounded-lg text-center" />
                </div>

                <div class="field">
                  <label for="telefono" class="block text-lg font-medium mb-1 text-center">Teléfono</label>
                  <InputMask
                    id="telefono"
                    v-model="usuario.telefono"
                    mask="(999) 999-9999"
                    placeholder="(123) 456-7890"
                    class="w-full rounded-lg text-center"
                  />
                </div>

                <div class="field">
                  <p class="text-blue-600 font-semibold mt-2 text-center">Tipo de rol</p>
                </div>
              </div>
            </div>

            <!-- Columna de descripción -->
            <div class="p-4">
              <div class="field">
                <label for="descripcion" class="block text-lg font-medium mb-1">Descripción</label>
                <Textarea
                  id="descripcion"
                  v-model="usuario.descripcion"
                  rows="4"
                  autoResize
                  class="w-full rounded-lg"
                  placeholder="Cuéntanos un poco sobre ti..."
                />
              </div>
              <p class="text-sm text-gray-500 mt-2">
                Se unió el <span class="text-blue-600 font-semibold">01 Enero 2025</span>
              </p>
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2 m-5">
          <button class="bg-red-500 text-white px-5 py-3 rounded-lg text-lg font-semibold">
            Cancelar
          </button>
          <button class="bg-green-500 text-white px-5 py-3 rounded-lg text-lg font-semibold">
            Guardar Cambios
          </button>
        </div>
      </template>
    </Card>
    <Toast />

    <h2 class="text-2xl font-bold mt-10">Cursos completados</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div v-for="index in 6" class="bg-white rounded-lg shadow-lg overflow-hidden">

          <!-- Cinta de cerrado -->
          <div class="bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-t-lg">Cerrado</div>

          <!-- Imagen -->
          <img src="../assets/logo.svg" alt="Imagen del taller" class="w-full h-40 object-cover">

          <!-- Contenido -->
          <div class="p-4">
            <h2 class="text-lg font-bold">Título del taller</h2>
            <p class="text-gray-600 text-sm">Descripción del taller de manera resumida</p>
            <p class="text-blue-600 font-semibold mt-2">Tipo de taller</p>

            <!-- Barra de progreso -->
            <div class="bg-gray-200 h-6 rounded-full mt-4 flex items-center">
              <div class="bg-green-500 text-white text-xs font-bold text-center px-2 rounded-full" style="width: 100%;">
                100% Completado
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <Footer/>
</template>

<script setup>
import Footer from '@/components/global/Footer.vue';
import Header from "@/components/global/Header.vue";
import { reactive } from "vue";

// Componentes PrimeVue
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";

// Estado del usuario
const usuario = reactive({
  nombre: "Juan",
  apellido: "Pérez",
  email: "juan.perez@ejemplo.com",
  telefono: "(555) 123-4567",
  descripcion:
    "Desarrollador web con experiencia en Vue.js y React. Me apasiona crear interfaces de usuario intuitivas y accesibles.",
});
</script>
