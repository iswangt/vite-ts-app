import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index/map",
    component: () => import('../views/common/index.vue'),
    children: [
      {
        path: '/index/map',
        component: () => import('../views/Map.vue'),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;