import { createRouter, createWebHistory } from "vue-router";

import Login from './pages/Login.vue'; 
import Dashboard from './pages/Dashboard.vue'; 
import ChatRoom from './pages/ChatRoom.vue';
import { useAuthStore } from './store/auth';

/*
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/chat-room/:conversationId",
      name: "chat-room",
      component: ChatRoom,
    }
  ],
});

export { router };
 */

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.token) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/chat-room/:conversationId',
    component: ChatRoom,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.token) {
        next('/login');
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;