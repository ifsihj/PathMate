import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/collaboration",
      name: "collaboration",
      component: () => import("../views/CollaborationView.vue"),
      redirect: "/collaboration/path-description",
      children: [
        {
          path: "path-description",
          name: "path-description",
          component: () => import("../views/collaboration/PathDescription.vue"),
        },
        {
          path: "mate-management",
          name: "mate-management",
          component: () => import("../views/collaboration/MateManagement.vue"),
        },
        {
          path: "task-system",
          name: "task-system",
          component: () => import("../views/collaboration/TaskSystem.vue"),
        },
        {
          path: "work-system",
          name: "work-system",
          component: () => import("../views/collaboration/WorkSystem.vue"),
        },
      ],
    },
  ],
});

export default router;
