import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import AdminLayout from '@/views/Administradores/layout/Admin-layout.vue'
import InstrutoresLayout from '@/views/Instrutores/instrutoresLayout.vue'
import { useAuthStore } from '@/stores/authStore'
import DashbordLayout from '@/components/layout/DashbordLayout.vue'

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
      path: '/Taller/:id_workshop',
      name: 'contenidoTalleres',
      component: () => import('../views/ContenidoTalleresView.vue'),
      props: true,
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
      component: () => import('@/views/Panel-TallerView.vue'),
    },
    {
      path: '/Reportar',
      name: 'Reportar',
      component: () => import('@/views/ReportarView.vue'),
    },
    {
      path: '/Calendarios',
      name: 'Calendarios',
      component: () => import('@/views/CalendarioView.vue'),
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
      component: DashbordLayout,
      children: [
        // Dashboard principal
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/Administradores/dashboard/Admin-dashboard.vue'),
        },
        {
          path: '/adminuser',
          name: 'admin-user',
          component: () => import('../views/Administradores/PageAdminView.vue'),
        },
        {
          path: '/adminTaller',
          name: 'admin-talleres',
          component: () => import('../views/Administradores/workshops/pageTalleresView.vue'),
        },
        {
          path: '/adminRol',
          name: 'admin-roles',
          component: () => import('../views/Administradores/pageRolesView.vue'),
        },
        {
          path: '/adminReport',
          name: 'admin-reportes',
          component: () => import('../views/Administradores/reports/PageReporteView.vue'),
        },
        {
          path: '/adminTipos',
          name: 'admin-tipos-taller',
          component: () => import('../views/Administradores/workshop-types/PageTiposTallerView.vue'),
        },
        {
          path: '/admin/userUpdate/:id',
          name: 'admin-user-update',
          component: () => import('../views/Administradores/users/UserUpdate.vue'),
        },
        {
          path: '/adminMultimedias',
          name: 'admin-multimedias',
          component: () => import('../views/Administradores/multimedia/PageMultimediasView.vue'),
        },
        {
          path: '/calendario',
          name: 'calendario',
          component: () => import('@/views/Coordinadores/CalendarioView.vue'),
        },

        {
          path: '/adminWorkshops',
          name: 'admin-workshops',
          component: () => import('@/views/Administradores/workshops/PageWorkshopsView.vue'),
        },
        {
          path: '/adminComentarios',
          name: 'admin-admincomentarios',
          component: () => import('@/views/Administradores/comments/AdminCommentsView.vue'),
        },
      ],
    },

    //INSTRUTORES
    {
      path: '/instrutor',
      component: InstrutoresLayout,
      children: [
        {
          path: '',
          name: 'instructor-dashboard',
          component: () => import('../views/Instrutores/InstrutoresView.vue'),
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
      ],
    },

    {
      path: '/:pathMatch(.*)',
      name: 'Not found',
      component: () => import('@/views/404View.vue'),
    },

    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestLoginView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/login', '/register']

  if (!publicRoutes.includes(to.path) && !authStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.meta.requiresAuth && !authStore.isLoggedIn) {
//     next({ name: 'login' }) // Redirigir a la página de inicio de sesión si no está autenticado
//   } else {
//     next() // Continuar con la navegación
//   }
// })

export default router
