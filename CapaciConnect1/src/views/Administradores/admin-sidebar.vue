<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Component } from 'vue'
import {
  BarChart3,
  Settings,
  Users,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Activity,
  Gauge,
  LineChart,
  TrendingUp,
  UserPlus
} from 'lucide-vue-next'

interface NavItem {
  title: string
  href: string
  icon: Component
  submenu?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    submenu: [
      {
        title: "Resumen Principal",
        href: "/admin", // ✅ Ruta base
        icon: Gauge
      },
      {
        title: "Estadísticas",
        href: "/admin/stats",
        icon: TrendingUp
      },
      {
        title: "Visión General",
        href: "/admin/overview",
        icon: LineChart
      }
    ]
  },
  {
    title: "Usuarios",
    href: "/admin/users",
    icon: Users,
    submenu: [
      {
        title: "Lista de Usuarios",
        href: "/admin/users",
        icon: Users
      },
      {
        title: "Agregar Usuario",
        href: "/admin/add-user",
        icon: UserPlus
      },
      {
        title: "Detalles de Usuario",
        href: "/admin/users/:id", // Ruta dinámica
        icon: BarChart3
      }
    ]
  },
  {
    title: "Analítica",
    href: "/admin/analytics",
    icon: BarChart3
  },
  {
    title: "Actividad Reciente",
    href: "/admin/activity",
    icon: Activity
  },
  {
    title: "Configuración",
    href: "/admin/settings",
    icon: Settings
  }
]

const route = useRoute()
const openItems = ref<Record<string, boolean>>({})

// Función mejorada para detectar rutas activas
const isActive = (href: string) => {
  const routePath = route.path.replace(/\/$/, '') // Elimina slash final
  const comparePath = href.replace(/\/$/, '') // Normaliza ambas rutas
  return routePath === comparePath || routePath.startsWith(comparePath + '/')
}

const toggleSubmenu = (title: string) => {
  openItems.value[title] = !openItems.value[title]
}
</script>

<template>
  <div class="hidden border-r bg-white md:block md:w-64">
    <div class="h-[calc(100vh-4rem)] overflow-y-auto">
      <div class="py-4">
        <div class="px-3 py-2">
          <h2 class="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
          <div class="space-y-1">
            <router-view>
              <div v-for="item in navItems" :key="item.title">
                <template v-if="item.submenu">
                  <button
                    @click="toggleSubmenu(item.title)"
                    class="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100 rounded-lg"
                    :class="{ 'bg-gray-100': isActive(item.href) }"
                  >
                    <div class="flex items-center">
                      <component :is="item.icon" class="mr-2 h-4 w-4" />
                      {{ item.title }}
                    </div>
                    <component
                      :is="openItems[item.title] ? ChevronDown : ChevronRight"
                      class="h-4 w-4"
                    />
                  </button>

                  <div v-show="openItems[item.title]" class="pl-6 pt-1 space-y-1">
                    <router-link
                      v-for="subItem in item.submenu"
                      :key="subItem.href"
                      :to="subItem.href"
                      class="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg"
                      :class="{
                        'bg-gray-100': route.path === subItem.href ||
                          (subItem.href.includes(':id') && route.path.startsWith('/admin/users/'))
                      }"
                    >
                      <component :is="subItem.icon" class="mr-2 h-4 w-4" />
                      {{ subItem.title }}
                    </router-link>
                  </div>
                </template>

                <router-link
                  v-else
                  :to="item.href"
                  class="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg"
                  :class="{ 'bg-gray-100': isActive(item.href) }"
                >
                  <component :is="item.icon" class="mr-2 h-4 w-4" />
                  {{ item.title }}
                </router-link>
              </div>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
