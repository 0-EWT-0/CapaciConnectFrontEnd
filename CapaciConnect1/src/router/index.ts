import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLayout from '@/views/Administradores/admin-layout.vue'
import InstrutoresLayout from '@/views/Instrutores/instrutoresLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },


    //ADMINISTRADOR
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        // Dashboard principal
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/Administradores/admin-dashboard.vue')
        },

        // Gestión de usuarios
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/Administradores/user-table.vue'),
        },
        {
          path: 'users/:id',
          name: 'user-detail',
          component: () => import('../views/Administradores/page-user.vue'),
          props: true
        },
        {
          path: 'add-user',
          name: 'add-user',
          component: () => import('../views/Administradores/add-userView.vue'),
        },

        // Estadísticas y métricas
        {
          path: 'stats',
          name: 'dashboard-stats',
          component: () => import('../views/Administradores/dashboard-stats.vue'),
        },
        {
          path: 'metrics',
          name: 'user-metrics',
          component: () => import('../views/Administradores/user-metrics.vue'),
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: () => import('../views/Administradores/page-analytics.vue'),
        },

        // Actividad y contenido
        {
          path: 'activity',
          name: 'recent-activity',
          component: () => import('../views/Administradores/recent-activity.vue'),
        },
        {
          path: 'top-pages',
          name: 'top-pages',
          component: () => import('../views/Administradores/top-pages.vue'),
        },

        // Configuración y vistas adicionales
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/Administradores/page-settings.vue'),
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import('../views/Administradores/overView.vue'),
        }
      ]
    },


    //INSTRUTORES
    {
      path: '/instrutor',
      component: InstrutoresLayout,
      children:[
        {
          path: '',
          name: 'instructor-dashboard',
          component: () => import('../views/Instrutores/InstrutoresView.vue')
        },
        {
          path: 'instrutor/loading-student',
          name: 'loading-student',
          component: () => import('../views/Instrutores/loading-student.vue'),
        },
        {
          path: 'instrutor/loading-work',
          name: 'loading-work',
          component: () => import('../views/Instrutores/loading-work.vue'),
        },
        {
          path: 'instrutor/page-instructores',
          name: 'page-instructores',
          component: () => import('../views/Instrutores/page-instrutores.vue'),
        },
        {
          path: 'instrutor/page-student',
          name: 'page-student',
          component: () => import('../views/Instrutores/page-student.vue'),
        },
        {
          path: 'instrutor/page-work',
          name: 'page-work',
          component: () => import('../views/Instrutores/page-work.vue'),
        },
      ]
    },
  ],
})

export default router
