import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import Product from '@/product/product'
import WelcomeView from '../views/WelcomeView.vue'

const productData  = {
      "product_name": "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
      "ingredients_text_en": "Noodle: rice, water. seasoning packet: peanut, sugar, hydrolyzed soy protein, green onion, corn maltodextrin, spice (including paprika), citric acid, sea salt, extractives of paprika (color), silicon dioxide (added to make free flowing), yeast extract.",
      "nutriscore_grade": "a",
      "image_front_url": "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
      "allergens_tags": ["en:peanuts"],
      "labels_tags": ["en:no-gluten", "en:vegetarian", "en:vegan"]
};

const price = 0;
const carbonFootprint = 0;

const product = new Product(
  price,
  productData.product_name,
  productData.ingredients_text_en.split(', '),
  productData.nutriscore_grade,
  productData.image_front_url,
  carbonFootprint,
  productData.allergens_tags,
  productData.labels_tags
);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'product',
    component: ProductDetailView,
    props: { product: product }
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView,
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
