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
          <li v-for="item in menuItems" :key="item.name">
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

<script lang="ts">
import { defineComponent, type Component } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  FilmIcon,
  BookTextIcon,
  Calendar1Icon,
} from 'lucide-vue-next'

interface MenuItem {
  name: string
  icon: Component
  href: string
}

export default defineComponent({
  name: 'AppSidebar',
  components: {
    HomeIcon,
    BriefcaseIcon,
    UsersIcon,
    FileTextIcon,
    SettingsIcon,
    FilmIcon,
    BookTextIcon,
    Calendar1Icon,
  },
  setup() {
    const route = useRoute()

    const menuItems: MenuItem[] = [
      { name: 'Usuarios', icon: HomeIcon, href: '/adminuser' }, // Nota: '/adminuser' para mantener consistencia.
      { name: 'Talleres', icon: BriefcaseIcon, href: '/adminTaller' },
      { name: 'Roles', icon: UsersIcon, href: '/adminRol' },
      { name: 'Reportes', icon: FileTextIcon, href: '/adminReport' },
      { name: 'Tipos de taller', icon: SettingsIcon, href: '/adminTipos' },
      { name: 'Multimedias', icon: FilmIcon, href: '/adminMultimedias' },
      {name: 'Calendario', icon: Calendar1Icon, href: '/calendario'},
      { name: 'Inicio', icon: HomeIcon, href: '/' },
      { name: 'Talleres', icon: BookTextIcon, href: '/adminWorkshops' },
    ]

    const isActive = (path: string): boolean => {
      return route.path === path
    }

    return {
      menuItems,
      isActive,
    }
  },
})
</script>
