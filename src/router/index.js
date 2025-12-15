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
      component: () => import("../views/collaboration/PathSelection.vue"),
    },
    {
      path: "/collaboration/:pathId",
      name: "collaboration-space",
      component: () => import("../views/CollaborationView.vue"),
      redirect: (to) => `/collaboration/${to.params.pathId}/path-description`,
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
    {
      path: "/discovery",
      name: "discovery",
      component: () => import("../views/DiscoveryView.vue"),
      redirect: "/discovery/path",
      children: [
        {
          path: "path",
          name: "discovery-path",
          component: () => import("../views/discovery/PathDiscovery.vue"),
        },
        {
          path: "mate",
          name: "discovery-mate",
          component: () => import("../views/discovery/MateDiscovery.vue"),
        },
        {
          path: "articles",
          name: "discovery-articles",
          component: () => import("../views/discovery/ArticleDiscovery.vue"),
        },
        {
          path: "articles/:id",
          name: "article-detail",
          component: () => import("../views/discovery/ArticleDetailView.vue"),
        },
      ],
    },
    {
      path: "/personal-center",
      name: "personal-center",
      component: () => import("../views/PersonalCenterView.vue"),
      redirect: "/personal-center/resources",
      children: [
        {
          path: "resources",
          name: "personal-center-resources",
          component: () => import("../views/personalcenter/ResourceSystem.vue"),
        },
        {
          path: "notifications",
          name: "personal-center-notifications",
          component: () => import("../views/personalcenter/NotificationSystem.vue"),
        },
        {
          path: "settings",
          name: "personal-center-settings",
          component: () => import("../views/personalcenter/Settings.vue"),
        },
      ],
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/ChatView.vue"),
    },
    {
      path: "/guide",
      name: "guide",
      component: () => import("../views/GuideView.vue"),
    },
  ],
});

export default router;
