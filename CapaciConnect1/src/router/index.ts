import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
  ],
})

export default router
