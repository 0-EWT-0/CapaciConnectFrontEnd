<template>
  <div class="flex min-h-screen flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 h-16 border-b bg-white px-4 md:px-6 flex items-center">
      <button
        class="md:hidden p-2 rounded-lg hover:bg-gray-100"
        @click="isSidebarMobileOpen = true"
      >
        <Menu class="h-5 w-5" />
      </button>
      <h1 class="text-xl font-semibold ml-2">Admin Panel</h1>
    </header>

    <!-- Main Content -->
    <div class="flex flex-1">
      <!-- Desktop Sidebar -->
      <aside class="hidden md:block w-64 border-r bg-white">
        <AdminSidebar />
      </aside>

      <!-- Mobile Sidebar -->
      <div
        v-if="isSidebarMobileOpen"
        class="fixed inset-0 z-40 bg-black/50 md:hidden"
        @click="isSidebarMobileOpen = false"
      >
        <div class="w-64 h-full bg-white" @click.stop>
          <AdminSidebar @close="isSidebarMobileOpen = false" />
        </div>
      </div>

      <!-- Main Content Area -->
      <main class="flex-1 bg-gray-50 p-6 md:p-8">
        <rouer-view/>
        <div class="max-w-7xl mx-auto">
          <!-- Slot para contenido específico de la página -->
          <slot />

          <!-- Ejemplo de contenido base -->
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3" v-if="$slots.default === undefined">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-lg font-semibold mb-2">Bienvenido al Panel</h2>
              <p class="text-gray-600">Selecciona una opción del menú para comenzar</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'
import AdminSidebar from '@/views/Administradores/admin-sidebar.vue'
//import { useHead } from '@unhead/vue'

const isSidebarMobileOpen = ref(false)

// Configuración de metadatos
/*useHead({
  title: 'Admin Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Panel de administración para gestión de contenidos'
    },
    {
      property: 'og:title',
      content: 'Panel de Administración'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/admin-favicon.png'
    }
  ]
})*/

// Lógica de autenticación (ejemplo)
/*
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    router.push('/login')
  }
})
*/
</script>

<style scoped>
/* Transición suave para el sidebar móvil */
.aside-mobile-enter-active,
.aside-mobile-leave-active {
  transition: transform 0.3s ease-in-out;
}

.aside-mobile-enter-from,
.aside-mobile-leave-to {
  transform: translateX(-100%);
}
</style>
