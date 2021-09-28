<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'

import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onErrorCaptured } from 'vue'

import { useRoute, useRouter, RouteLocationRaw } from "vue-router";
const route = useRoute() // 获取params等参数
const router = useRouter() // 路由跳转

// 变量定义
const defalutAct:String = ('/')
let asideArr:any[] = ref([])


onBeforeMount (() => {
  console.log(router.options.routes)
  asideArr.value = router.options.routes
  console.log(asideArr)
})

onMounted (() => {

})
</script>

<template>
  <el-aside class="aside">
    <el-menu
    :default-active="defalutAct"
    router
    :collapse="true">
    <div v-for="(item, index) in asideArr" :key="index">
      <el-sub-menu :index="item.path" v-if="item.child">
        <template #title>
          <i class="iconfont" v-html="item.icon"></i>
        </template>
        <el-menu-item-group v-for="(itm, idx) in item.children" :key="idx">
          <el-menu-item :index="itm.path"> {{ itm.asideName }} </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item :index="item.path" v-if="!item.child">
        <i class="iconfont" v-html="item.icon"></i>
        <template #title> {{ item.asideName }} </template>
      </el-menu-item>
    </div>
    </el-menu>
  </el-aside>
</template>

<style lang="scss">
@import '../../styles/index.scss';
.aside {
  width: 80px;
  background: rgb(134, 134, 133);
  .el-menu {
    width: 100%;
    background: rgba(0, 0, 0,0);
    .el-sub-menu {
      height: 80px;
      .el-sub-menu__title {
        padding: 0px !important;
        height: 100% !important;
        text-align: center;
        line-height: 80px;
      }
    } 
    .el-menu-item {
      padding: 0px !important;
      height: 80px;
      div {
        padding: 0px !important;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 80px;
      }
    }
    .iconfont {
      font-size: 26px;
    }
  }
}
</style>
