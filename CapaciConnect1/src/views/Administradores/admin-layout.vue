<template>
  <div class="flex min-h-screen flex-col">
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
        <rouer-view />
        <div class="max-w-7xl mx-auto">
          <!-- Slot para contenido específico de la página -->
          <slot />
        </div>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
