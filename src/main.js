import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Repositories from './views/Repositories.vue'
import Repository from './views/Repository.vue'
import ErrorPage from './views/ErrorPage.vue'
import ErrorBoundary from "./views/ErrorBoundary.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/repositories', component: Repositories },
    { path: '/repositories/:id', component: Repository },
    { path: '/error-boundary', component: ErrorBoundary },
    { path: '/:pathMatch(.*)*', component: ErrorPage }
  ]
})

createApp(App).use(router).mount('#app')
