import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home-View.vue'
import TodoList from '../views/Todo-List.vue'
import { RouteNames } from '../enums/RouteNames'

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: Home,
  },
  {
    path: '/todolist',
    name: RouteNames.TODO_LIST,
    component: TodoList,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
