import { createApp } from 'vue'
import App from './App.vue'

// 路由导航
import Router from './router/router'
// 引入element-plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).use(Router).mount('#app')
