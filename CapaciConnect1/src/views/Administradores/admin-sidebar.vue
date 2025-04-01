<template>
  <aside class="bg-[#05057a] text-white w-full h-full flex flex-col">
    <!-- Contenido principal -->
    <div class="flex-1">
      <!-- Encabezado de usuario -->
      <div class="flex items-center p-4 mb-4">
        <div class="relative w-8 h-8 overflow-hidden rounded-full mr-2">
          <img src="" alt="Usuario" class="object-cover w-full h-full" />
        </div>
        <span class="font-semibold">Usuario</span>
      </div>

      <!-- Menú de navegación -->
      <nav>
        <ul class="space-y-1">
          <li v-for="item in filteredMenuItems" :key="item.name">
            <router-link
              :to="item.href"
              class="flex items-center px-4 py-3 space-x-3 transition-colors hover:bg-[#0000bb] hover:text-white"
              :class="{ 'bg-[#0000bb] font-medium': isActive(item.href) }"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Barra decorativa lateral -->
    <div class="h-full w-1 bg-[#0000bb]"></div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  FilmIcon,
  BookTextIcon,
  Calendar1Icon,
  BriefcaseIcon,
} from 'lucide-vue-next'

interface MenuItem {
  name: string
  icon: any
  href: string
  rolesAllowed?: number[]
}

const rolId = ref<string | undefined>()
const route = useRoute()

const menuItems: MenuItem[] = [
  { name: 'Usuarios', icon: HomeIcon, href: '/adminuser', rolesAllowed: [1] },
  { name: 'Talleres', icon: BookTextIcon, href: '/adminWorkshops', rolesAllowed: [1, 4] },
  { name: 'Roles', icon: UsersIcon, href: '/adminRol', rolesAllowed: [1] },
  { name: 'Reportes', icon: FileTextIcon, href: '/adminReport', rolesAllowed: [1] },
  { name: 'Tipos de taller', icon: SettingsIcon, href: '/adminTipos', rolesAllowed: [1] },
  { name: 'Multimedias', icon: FilmIcon, href: '/adminMultimedias', rolesAllowed: [1, 2] },
  { name: 'Calendario', icon: Calendar1Icon, href: '/calendario', rolesAllowed: [1, 2] },
  //{ name: 'Talleres', icon: BookTextIcon, href: '/adminWorkshops', rolesAllowed: [1] },
  { name: 'Inicio', icon: HomeIcon, href: '/' },
]

const filteredMenuItems = ref<MenuItem[]>([])

const isActive = (path: string): boolean => {
  return route.path === path
}

onMounted(async () => {
  const userStore = useUserStore()
  await userStore.getUserInfo()
  rolId.value = userStore?.user?.id_rol_id ?? 'canche'
  console.log('role id', rolId.value)

  // Filtrar las rutas según el rol del usuario.
  filteredMenuItems.value = menuItems.filter((item) => {
    // Si rolesAllowed no está definido, se asume que la ruta es accesible para todos.
    return !item.rolesAllowed || item.rolesAllowed.includes(Number(rolId.value))
  })

  console.log('role id', rolId.value)
  console.log('filtered menu items', filteredMenuItems.value)
})
</script>
