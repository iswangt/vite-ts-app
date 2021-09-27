<script setup lang="ts">
import { ref } from 'vue'

import 'ol/ol.css'
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onErrorCaptured } from 'vue'

let map = null
onMounted (() => {
  map = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      projection: "EPSG:4326",    //使用这个坐标系
      center: [108.948024,34.263161],  //深圳
      zoom: 12
    })
  });
})
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
@import '../styles/index.scss';
#map{height:100%;}
/*隐藏ol的一些自带元素*/
.ol-attribution,.ol-zoom { display: none;}
</style>
