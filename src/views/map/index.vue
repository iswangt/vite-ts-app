<script setup lang="ts">
import { ref } from 'vue'

import 'ol/ol.css'
import { Map, View } from "ol";
import OSM from "ol/source/OSM";

import Point from 'ol/geom/Point';
import Feature from 'ol/Feature'; // 矢量图标
import {Icon, Style} from 'ol/style'; // 样式
import {Stamen, Vector as VectorSource} from 'ol/source'; // 数据源
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'; // 图层

import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onErrorCaptured } from 'vue'

let map:any = null
onMounted (() => {
  initMap() // 初始化地图
})
function initMap () {
  // 初始化地图
  map = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      projection: "EPSG:4326",    //使用这个坐标系
      center: [108.948024,34.263161],  //西安
      zoom: 13
    })
  })
  // 加载摄像头图标
  initCamera()
}
import icon_ball from "../../assets/img/map/camera1.png";
import icon_gun from "../../assets/img/map/camera2.png";
function initCamera () {
  // 加载矢量图标
  let deviceList:any[] = []
  for(let index = 0; index< 30; index++){
    deviceList.push({
      type: (index % 2) == 0? `卡口球式摄像头${index}`: `卡口枪式摄像头${index}`,
      typeCode: (index % 2) == 0?  'ball' : 'gun',
      addr: `西安市雁塔区人民路${index}号视频卡口点`,
      lng: `108.9${Math.ceil(Math.random() * 1000)}`,
      lat: `34.2${Math.ceil(Math.random() * 1000)}`
    })
  }
  let iconFeatureArr = deviceList.map(e => {
    let iconFeature = new Feature({
      geometry: new Point([e.lng, e.lat]),
      data: e,
      population: 4000,
      rainfall: 500,
    });
    let iconStyle = new Style({
      image: new Icon({
        src: e.typeCode == 'ball' ? icon_ball : icon_gun,
      }),
    });
    iconFeature.setStyle(iconStyle);
    return iconFeature;
  })
  // 创建图标样式
  let featureSource = new VectorSource({
    features: iconFeatureArr
  })
  let featureLayer = new VectorLayer({
    source: featureSource
  })
  map.addLayer(featureLayer)
}
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
@import '../../styles/index.scss';
#map{height:100%;}
/*隐藏ol的一些自带元素*/
.ol-attribution,.ol-zoom { display: none;}
</style>
