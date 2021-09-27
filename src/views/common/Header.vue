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
  <el-header class="header">
    header
  </el-header>
</template>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.header {
  line-height: 60px;
  text-align: center;
  background: rgb(153, 153, 179);
}
</style>
