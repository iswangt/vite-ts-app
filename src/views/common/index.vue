<script setup lang="ts">
import { ref } from 'vue'

import Aside from './Aside.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

import { useRoute, useRouter, RouteLocationRaw } from "vue-router";
const route = useRoute() // 获取params等参数
const router = useRouter() // 路由跳转

import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onErrorCaptured } from 'vue'

onMounted (() => {

})
</script>

<template>
  <el-container class="containerA" direction="vertical">
    <Header />
    <el-container class="containerB">
      <Aside />
      <el-container class="containerC" direction="vertical">
        <el-main class="main">
          <router-view />
        </el-main>
        <Footer />
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.containerA {
  height: 100%;
  .containerB {
    height: calc(100% - 60px);
    .containerC {
      .main {
        height: calc(100% - 120px);
      }
    }
  }
}
</style>
