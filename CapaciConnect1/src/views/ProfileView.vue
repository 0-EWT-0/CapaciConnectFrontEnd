<template>
  <Navbar />
  <div class="container mx-auto px-4 py-8 min-h-screen">
    <Card>
      <template #title>
        <div class="text-2xl font-bold">Editar Perfil</div>
      </template>
      <template #subtitle>
        <div class="text-black">Actualiza tu información personal</div>
      </template>
      <template #content>
        <div>
          <form @submit.prevent="guardarCambios" class="p-fluid p-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Columna de imagen de perfil -->
              <div class="flex flex-col items-center gap-6">
                <div class="relative">
                  <img
                    src="../assets/logo.svg"
                    alt="UserImage"
                    class="w-32 h-32 shadow-md object-cover"
                  />
                </div>
                <div class="space-y-4 w-[15rem]">
                  <div class="field">
                    <label for="nombre" class="block text-lg font-bold mb-1 text-center text-black"
                      >Nombre</label
                    >
                    <InputText
                      id="nombre"
                      v-model="usuario.nombre"
                      class="w-full rounded-lg text-center"
                    />
                  </div>
                  <div class="field">
                    <label
                      for="apellido"
                      class="block text-lg font-bold mb-1 text-center text-black"
                      >Apellido</label
                    >
                    <InputText
                      id="apellido"
                      v-model="usuario.apellido"
                      class="w-full rounded-lg text-center"
                    />
                  </div>
                  <div class="field">
                    <label for="email" class="block text-lg font-bold mb-1 text-center text-black"
                      >Email</label
                    >
                    <InputText
                      id="email"
                      v-model="usuario.email"
                      type="email"
                      class="w-full rounded-lg text-center"
                    />
                  </div>
                  <div class="field">
                    <label
                      for="telefono"
                      class="block text-lg font-bold mb-1 text-center text-black"
                      >Teléfono</label
                    >
                    <InputMask
                      id="telefono"
                      mask="(999) 999-9999"
                      v-model="usuario.telefono"
                      placeholder="(123) 456-7890"
                      class="w-full rounded-lg text-center"
                    />
                  </div>
                </div>
                <!-- <p class="text-center">
                <span class="text-blue-600 font-semibold">{{ usuario.id_rol_id }}</span>
              </p> -->
              </div>

              <!-- Columna de descripción -->
              <div class="col-span-2">
                <div class="p-1">
                  <div class="field">
                    <label for="descripcion" class="block text-lg font-bold mb-1 text-black"
                      >Descripción</label
                    >
                    <Textarea
                      id="descripcion"
                      rows="6"
                      v-model="usuario.descripcion"
                      autoResize
                      class="w-full rounded-lg"
                      placeholder="Cuéntanos un poco sobre ti..."
                    />
                  </div>
                  <p class="text-sm text-gray-500 mt-2">
                    Se unió el
                    <span class="text-blue-600 font-semibold">{{ usuario.created_at }}</span>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button
            @click="cancelarEdicion"
            class="bg-red-500 text-white px-5 py-3 rounded-lg text-lg font-semibold cursor-pointer"
          >
            Cancelar
          </button>
          <button
            @click="guardarCambios"
            class="bg-green-500 text-white px-5 py-3 rounded-lg text-lg font-semibold cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </template>
    </Card>

    <h2 class="text-xl font-bold mt-10 text-black">Cursos completados</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      <div v-for="index in 6" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Cinta de cerrado -->
        <div class="bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-t-lg">Cerrado</div>

        <!-- Imagen -->
        <img src="../assets/logo.svg" alt="Imagen del taller" class="w-full h-40 object-cover" />

        <!-- Contenido -->
        <div class="p-4">
          <h2 class="text-lg font-bold">Título del taller</h2>
          <p class="text-gray-600 text-sm">Descripción del taller de manera resumida</p>
          <p class="text-blue-600 font-semibold mt-2">Tipo de taller</p>

          <!-- Barra de progreso -->
          <div class="bg-gray-200 h-6 rounded-full mt-4 flex items-center">
            <div
              class="bg-green-500 text-white text-xs font-bold text-center px-2 rounded-full"
              style="width: 100%"
            >
              100% Completado
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
import { reactive, onMounted, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

// Componentes PrimeVue
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Textarea from 'primevue/textarea'
import Navbar from '@/components/global/Navbar.vue'

const userStore = useUserStore()
const authStore = useAuthStore()

onMounted(async () => {
  await userStore.getUserInfo()
  const userInfo = userStore.user
  const userId = userStore.user.id_user
  console.log('user', userInfo)
  console.log('userId', userId)
})

// Estado del usuario
const usuario = reactive({
  Id: undefined,
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  descripcion: '',
  id_rol_id: '',
  created_at: '',
})

watchEffect(() => {
  if (userStore.user) {
    usuario.Id = userStore.user.id_user || undefined
    usuario.nombre = userStore.user.name || ''
    usuario.apellido = userStore.user.last_names || ''
    usuario.email = userStore.user.email || ''
    usuario.telefono = userStore.user.phone || ''
    usuario.descripcion = userStore.user.description || ''
    usuario.id_rol_id = userStore.user.id_rol_id || ''
    usuario.created_at = userStore.user.created_at || ''
  }
})

const guardarCambios = async () => {
  try {
    const IDuser = usuario.Id
    const response = await userStore.updateUser(IDuser, {
      name: usuario.nombre,
      last_names: usuario.apellido,
      email: usuario.email,
      phone: usuario.telefono,
      description: usuario.descripcion,
    })

    if (response && response.success) {
      alert('¡Perfil actualizado con éxito!')
    } else {
      alert('Error al actualizar: ' + (response.message || 'Respuesta inesperada'))
    }
  } catch (error) {
    console.error('Error al guardar cambios:', error)
    alert('Hubo un error al guardar los datos.')
  }
}

const cancelarEdicion = () => {
  if (userStore.user) {
    usuario.nombre = userStore.user.name || ''
    usuario.apellido = userStore.user.last_names || ''
    usuario.email = userStore.user.email || ''
    usuario.telefono = userStore.user.phone || ''
    usuario.descripcion = userStore.user.description || ''
  }
}
</script>
