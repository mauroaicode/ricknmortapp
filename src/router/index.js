import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/characters'
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/404')
  },
  {
    path: '/characters',
    name: 'characters',
    component: () => import('../views/character/CharactersView.vue')
  },
  {
    path: '/character/:id',
    name: 'character',
    component: () => import('../views/character/CharacterView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
