import { createRouter, createWebHistory } from 'vue-router'

import About from '../pages/About.vue'
import Beyond from '../pages/Beyond.vue'
import Contact from '../pages/Contact.vue'
import Experience from '../pages/Experience.vue'
import Home from '../pages/Home.vue'
import Projects from '../pages/Projects.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/experience', name: 'experience', component: Experience },
    { path: '/beyond', name: 'beyond', component: Beyond },
    { path: '/contact', name: 'contact', component: Contact },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 96,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

export default router
