import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import AdminLayout from '@/views/Administradores/admin-layout.vue'
import InstrutoresLayout from '@/views/Instrutores/instrutoresLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //VISTAS DE PARTICIPANTES
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/Inicio',
      name: 'inicio',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/InicioView.vue'),
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/Register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/Talleres',
      name: 'talleres',
      component: () => import('../views/TalleresView.vue'),
    },
    {
      path: '/ContenidoTalleres',
      name: 'contenidoTalleres',
      component: () => import('../views/ContenidoTalleresView.vue'),
    },
    {
      path: '/ClasesTaller',
      name: 'clasesTaller',
      component: () => import('../views/ClasesView.vue'),
    },
    {
      path: '/MisTalleres',
      name: 'misTalleres',
      component: () => import('../views/MisTalleresView.vue'),
    },
    {
      path: '/Perfil',
      name: 'perfil',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/Panel-Taller',
      name: 'Panel-Taller',
      component: () => import('@/views/Panel-TallerView.vue')
    },
    {
      path: '/Reportar',
      name: 'Reportar',
      component: () => import('@/views/ReportarView.vue')
    },

    //VISTA COORDINADORES
    {
      path: '/panelCoordinador',
      name: 'panelCoordinador',
      component: () => import('@/views/Coordinadores/PanelCoordView.vue'),
    },
    {
      path: '/panelTalleres',
      name: 'panelTalleres',
      component: () => import('@/views/Coordinadores/TalleresView.vue'),
    },
    {
      path: '/panelMateriales',
      name: 'panelMateriales',
      component: () => import('@/views/Coordinadores/MaterialesView.vue'),
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



    {
      path: '/:pathMatch(.*)',
      name: 'Not found',
      component: () => import('@/views/404View.vue'),
    },


    {
      path: '/coordinador',
      

      children:[
        {
          path: '',
          name: 'calendar',
          component: () => import('../views/Coordinadores/CalendarioView.vue')
        },]
    },




  ],
})

export default router
