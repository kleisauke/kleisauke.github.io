import Vue from 'vue'
import Router from 'vue-router'
import About from './pages/About.vue'

import { Trans } from './utils/Translation'
import i18n from './i18n'

Vue.use(Router)

const defaultRoutes = [
  {
    path: '/',
    name: 'about',
    component: About,
  },
  {
    path: 'resume',
    name: 'resume',
    // Route level code-splitting
    // This generates a separate chunk (resume.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "resume" */ '@/pages/Resume.vue'),
  },
  {
    path: '/portfolio/:id?',
    name: 'portfolio',
    component: () => import(/* webpackChunkName: "portfolio" */ '@/pages/Portfolio.vue'),
  },
  {
    path: 'contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '@/pages/Contact.vue'),
  },
]

// Get the available languages
const languages = Trans.supportedLanguages

// Should contain all the routes
const routes = []
languages.forEach(lang => {
  defaultRoutes.forEach(route => {
    let newRoute = {
      path: i18n.t(`routes.${route.name}`, lang),
      beforeEnter: Trans.routeMiddleware,
      name: `${lang}.${route.name}`,
      component: route.component,
    }
    routes.push(newRoute)
  })
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: '*',
      component: () => import(/* webpackChunkName: "404" */ '@/pages/404.vue'),
    },
  ],
})
