import './assets/main.css'
import 'amfe-flexible'

import { createApp } from 'vue'
import { Field, CellGroup } from 'vant';
import * as VueRouter from 'vue-router'
import routes from './utils/route/routes'
import {createPinia} from 'pinia'

import App from './App.vue'
const pinia = createPinia()
const router = VueRouter.createRouter({
  // history: VueRouter.createWebHashHistory(),
  history:VueRouter.createWebHistory(),
  routes
})
const app = createApp(App);
app.use(Field);
app.use(CellGroup);
app.use(pinia);
createApp(App).use(router).mount('#app')
