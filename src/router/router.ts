import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: '',
    path: "/",
    redirect: "/map/index",
    asideName: '',
    icon: '&#xe8ad;',
    child: true,
    component: () => import('../views/common/index.vue'),
    children: [
      {
        name: '',
        path: '/map/index',
        asideName: '地图',
        component: () => import('../views/map/index.vue')
      },
      {
        name: '',
        path: '/map/other',
        asideName: '其他',
        component: () => import('../views/map/other.vue'),
      }
    ]
  },
  {
    name: '',
    path: "/setting/index",
    redirect: "/setting/index",
    asideName: '设置',
    icon: '&#xe64b;',
    child: false,
    component: () => import('../views/common/index.vue'),
    children: [
      {
        name: '',
        path: '/setting/index',
        asideName: '设置',
        component: () => import('../views/setting/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;