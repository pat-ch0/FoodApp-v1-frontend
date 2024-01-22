import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import Storage from '@/components/Storage.vue'
import ResearchView from '@/views/ResearchView.vue'
import MyStorageView from '@/views/MyStorageView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products/:barcode',
    name: 'product-detail',
    component: ProductDetailView,
    meta: { hideNavbar: true } 
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView,
    meta: { hideNavbar: true } 
  },
  {
    path: '/storage',
    name: 'storage',
    component: Storage
  },
  {
    path: '/storage/:idStorage',
    name: 'myStorage',
    component: MyStorageView
  },
  {
    path: '/research',
    name: 'research',
    component: ResearchView,
  },
  
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },

  /**
   * Rooting path Research  
   * About scanning and research products.
   */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
