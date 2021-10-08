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
let featureBallLayer:any, featureGunLayer:any
onMounted (() => {
  initMap() // 初始化地图
})
function initMap () {
  // 初始化地图
  map = new Map({
    target: "map",
    layers: [
      new TileLayer({
        className: 'mapLayer',
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
  let iconBallFeature:any = []
  let iconGunFeature:any = []
  deviceList.forEach(e => {
    let iconFeature = new Feature({ // 初始化矢量图数据
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
    if (e.typeCode == 'ball') {
      iconBallFeature.push(iconFeature)
    } else {
      iconGunFeature.push(iconFeature)
    }
  })
  // 创建图标样式
  // 球型
  let featureBallSource = new VectorSource({ // 添加数据源
    features: iconBallFeature
  })
  featureBallLayer = new VectorLayer({ // 数据源添加图层
    className: 'ballLayer',
    source: featureBallSource
  })
  featureBallLayer.setZIndex(1) // 设置图层层级
  map.addLayer(featureBallLayer) // 图层添加地图
  // 枪型
  let featureGunSource = new VectorSource({
    features: iconGunFeature
  })
  featureGunLayer = new VectorLayer({
    className: 'gunLayer',
    source: featureGunSource
  })
  featureGunLayer.setZIndex(2) // 设置图层层级
  map.addLayer(featureGunLayer)
}
// 摄像头选择器
let cameraType:any = ref({
  camera: '',
  options: [
    {
      value: 'ballLayer',
      label: '卡口球式摄像头',
    },
    {
      value: 'gunLayer',
      label: '卡口枪式摄像头',
    }
  ]
})
function cameraTypeChange (value:any) {
  // console.log(map.getLayers().getArray()) // 获取所有图层
  // console.log(value)
  map.getLayers().getArray().forEach(e => {
    if (value.length > 0) {
      if (e.className_ !== 'mapLayer') {
        e.setVisible(false)
      }
      value.forEach(eee => {
        if (e.className_ === eee) {
          e.setVisible(true)
        }
      })
    } else {
      e.setVisible(true)
    }
  })
}
</script>

<template>
  <div class="map">
    <div id="map"></div>
    <div class="cameraType">
      <el-select v-model="cameraType.camera" multiple placeholder="请选择摄像头类型" @change="cameraTypeChange">
        <el-option
          v-for="item in cameraType.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.map {
  position: relative;
  height: 100%;
  #map{height:100%;}
  /*隐藏ol的一些自带元素*/
  .ol-attribution,.ol-zoom { display: none;}
  .cameraType {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
