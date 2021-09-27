<script setup lang="ts">
import { ref } from 'vue'

import { useRoute, useRouter, RouteLocationRaw } from "vue-router";
const route = useRoute() // 获取params等参数
const router = useRouter() // 路由跳转

import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onErrorCaptured } from 'vue'

onMounted (() => {

})
</script>

<template>
  <el-aside class="aside">
    aside
  </el-aside>
</template>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.aside {
  width: 80px;
  background: rgb(134, 134, 133);
}
</style>
