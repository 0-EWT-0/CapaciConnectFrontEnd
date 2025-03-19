<template>
    <Header/>
    <div class="container mx-auto px-4 py-8">
      <Card>
        <template #title>
          <div class="text-2xl font-bold">Editar Perfil</div>
        </template>
        <template #subtitle>
          <div class="text-gray-500">Actualiza tu información personal</div>
        </template>
        <template #content>
          <form @submit.prevent="guardarPerfil" class="p-fluid">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Columna de imagen de perfil -->
              <div class="flex flex-col items-center justify-start gap-4">
                <div class="relative">
                  <img  
                    src="../assets/logo.svg" 
                    alt="UserImage"
                    class="w-32 h-32 shadow-md"
                    :pt="{ 
                      image: { class: 'w-32 h-32 object-cover' } 
                    }"
                  />
                </div>
                <small class="text-gray-500 text-center">
                  Haz clic en el ícono de cámara para cambiar tu foto de perfil.<br>
                  Tamaño recomendado: 300x300px
                </small>
              </div>
  
              <!-- Columna de datos personales -->
              <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="field">
                    <label for="nombre" class="block text-sm font-medium mb-1">Nombre</label>
                    <InputText 
                      id="nombre" 
                      v-model="usuario.nombre" 
                    />
                  </div>
  
                  <div class="field">
                    <label for="apellido" class="block text-sm font-medium mb-1">Apellido</label>
                    <InputText 
                      id="apellido" 
                      v-model="usuario.apellido" 
                    />
                  </div>
                </div>
  
                <div class="field">
                  <label for="email" class="block text-sm font-medium mb-1">Email</label>
                  <InputText 
                    id="email" 
                    v-model="usuario.email" 
                    type="email"
                  />
                </div>
  
                <div class="field">
                  <label for="telefono" class="block text-sm font-medium mb-1">Teléfono</label>
                  <InputMask 
                    id="telefono" 
                    v-model="usuario.telefono" 
                    mask="(999) 999-9999" 
                    placeholder="(123) 456-7890"
                  />
                </div>
  
                <div class="field">
                  <label for="descripcion" class="block text-sm font-medium mb-1">Descripción</label>
                  <Textarea 
                    id="descripcion" 
                    v-model="usuario.descripcion" 
                    rows="5" 
                    autoResize 
                    placeholder="Cuéntanos un poco sobre ti..."
                  />
                </div>
              </div>
            </div>
          </form>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2">
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
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/global/Header.vue'
  import { reactive} from 'vue';
  
  // Componentes PrimeVue
  import Card from 'primevue/card';
  import InputText from 'primevue/inputtext';
  import InputMask from 'primevue/inputmask';
  import Textarea from 'primevue/textarea';
  import Image from 'primevue/image';
  import Toast from 'primevue/toast';
  
  
  // Estado del usuario
  const usuario = reactive({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@ejemplo.com',
    telefono: '(555) 123-4567',
    descripcion: 'Desarrollador web con experiencia en Vue.js y React. Me apasiona crear interfaces de usuario intuitivas y accesibles.',
    imagenPerfil: '/placeholder.svg?height=300&width=300'
  });
  </script>
  