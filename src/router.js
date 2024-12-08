import { createRouter, createWebHistory } from "vue-router";

import Login from './pages/Login.vue'; 
import Dashboard from './pages/Dashboard.vue'; 
import ChatRoom from './pages/ChatRoom.vue';

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
