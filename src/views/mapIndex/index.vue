<template>
  <div class="index-container">
    <LeafletMap @create-map="createMap"></LeafletMap>
    <button class="showLine" @click="showLine">显示航线</button>
        <button class="removeLine" @click="remove">清除航线</button>
    <!-- <button class="showlineLLTrans" @click="showlineLLTrans">
      绘制转换后的航线
    </button> -->
    <!-- <button class="editLine" @click="editLine">编辑航线</button>
        <button class="stopEdit" @click="stopEdit">停止编辑</button> -->

    <div class="mapPoint">{{ mapPoint.lat }} ,{{ mapPoint.lng }}</div>
    
    <OrderDialog></OrderDialog>

  </div>
</template>

<script setup lang="ts">
import * as L from "leaflet";

// import 'leaflet-editable'

import "leaflet-editable-polyline";
import "../../plugins/leaflet-movingmarker/movingmarker";
import point from "../../assets/point.svg";
import middlePoint from "../../assets/middlepoint.svg";
import startEndpoint from "../../assets/起始点.gif";
import shipIcon from "../../assets/船舶.svg";

import { latlngTrans, drawLine, removeLine } from "./hooks";
import LeafletMap from "@/components/leafletMap/index.vue";
import { onMounted, ref } from "vue";

import OrderDialog from './components/OrderDialog/index.vue';

function createMap(map: L.Map) {
  let osmlayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
    {
      foo: "bar",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // noWrap: true,
      keepBuffer: 1,
      crossOrigin: true,
    }
  );
  osmlayer.addTo(map);
}

// 数据类型接口
interface lineData {
  lat: number;
  lng?: number;
  lon?: number;
  name: string;
  time: string;
}

// 模拟数据
const data = ref<Array<lineData>>([
  {
    lat: 23.6968333,
    lng: 116.6506667,
    name: "青峰岭",
    time: "2022-07-22 07:42",
  },
  { lat: 27.4715, lng: 146.5075, name: "yulongling", time: "2022-07-22 07:42" },
  { lat: 26.2983333, lng: 175.8886667, name: "正托", time: "2022-07-22 07:42" },
  {
    lat: 19.4703333,
    lng: -138.0198333,
    name: "海运6",
    time: "2022-07-22 07:42",
  },
  { lat: 15.0138333, lng: -115.0965, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 7.7423333,
    lng: -92.8868333,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },
  { lat: 6.7921667, lng: -79.4956667, name: "正托", time: "2022-07-22 07:42" },
  { lat: 14.8981667, lng: -75.7, name: "海运6", time: "2022-07-22 07:42" },
  {
    lat: 11.8706667,
    lng: -67.7476667,
    name: "海运6",
    time: "2022-07-22 07:42",
  },
]);

const data1 = ref<Array<lineData>>([
  { lat: 12.6591667, lon: -67.5305, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 10.0771667,
    lon: -79.0405,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },
  { lat: 2.3456667, lon: -80.2078333, name: "正托", time: "2022-07-22 07:42" },
  { lat: -10.6505, lon: -82.0666667, name: "海运6", time: "2022-07-22 07:42" },
  { lat: -16.738, lon: -72.6535, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 5.213,
    lon: -118.0243333,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },
  {
    lat: 19.2151667,
    lon: -166.9193333,
    name: "正托",
    time: "2022-07-22 07:42",
  },
  { lat: 24.324, lon: 152.9515, name: "海运6", time: "2022-07-22 07:42" },
  {
    lat: 23.9966667,
    lon: 131.7781667,
    name: "海运6",
    time: "2022-07-22 07:42",
  },
  { lat: 22.347, lon: 119.2881667, name: "海运6", time: "2022-07-22 07:42" },
  {
    lat: 23.3393333,
    lon: 116.5523333,
    name: "海运6",
    time: "2022-07-22 07:42",
  },
]);

const data2 = ref<Array<lineData>>([
  { lat: 12.6591667, lon: -140.5305, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 10.0771667,
    lon: -120.0405,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },
  { lat: 2.3456667, lon: -100.2078333, name: "正托", time: "2022-07-22 07:42" },
  { lat: -10.6505, lon: -82.0666667, name: "海运6", time: "2022-07-22 07:42" },
  { lat: -16.738, lon: -72.6535, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 5.213,
    lon: -80.0243333,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },
  {
    lat: 19.2151667,
    lon: -50.9193333,
    name: "正托",
    time: "2022-07-22 07:42",
  },
  { lat: 24.324, lon: -10.9515, name: "海运6", time: "2022-07-22 07:42" },
  {
    lat: 23.9966667,
    lon: 50.7781667,
    name: "海运6",
    time: "2022-07-22 07:42",
  },
  { lat: 22.347, lon: 70.2881667, name: "海运6", time: "2022-07-22 07:42" },
  {
    lat: 23.3393333,
    lon: 131.5523333,
    name: "海运6",
    time: "2022-07-22 07:42",
  },
]);

const data3 = ref<Array<lineData>>([
  { lat: 12.6591667, lon: 100.5305, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 10.0771667,
    lon: 80.0405,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },
  { lat: 2.3456667, lon: 60.2078333, name: "正托", time: "2022-07-22 07:42" },
  { lat: -10.6505, lon: 40.0666667, name: "海运6", time: "2022-07-22 07:42" },
  { lat: -16.738, lon: 20.6535, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 5.213,
    lon: -20.0243333,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },
  {
    lat: 19.2151667,
    lon: -40.9193333,
    name: "正托",
    time: "2022-07-22 07:42",
  },
  { lat: 24.324, lon: -60.9515, name: "海运6", time: "2022-07-22 07:42" },
  {
    lat: 23.9966667,
    lon: -80.7781667,
    name: "海运6",
    time: "2022-07-22 07:42",
  }
]);

const data4 = ref<Array<lineData>>([
    { lat: 12.6591667, lon: 170, name: "青峰岭", time: "2022-07-22 07:42" },
  { lat: 2.3456667, lon: -170.2078333, name: "正托", time: "2022-07-22 07:42" },
  { lat: -10.6505, lon: 170.0666667, name: "海运6", time: "2022-07-22 07:42" },
  { lat: -16.738, lon: -160.6535, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 5.213,
    lon: -20.0243333,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },

  { lat: 24.324, lon: -10.9515, name: "海运6", time: "2022-07-22 07:42" },
  { lat: 2.3456667, lon: 10.2078333, name: "正托", time: "2022-07-22 07:42" },
  { lat: -10.6505, lon: 20.0666667, name: "海运6", time: "2022-07-22 07:42" },
  { lat: -16.738, lon:-20.6535, name: "青峰岭", time: "2022-07-22 07:42" },
  {
    lat: 5.213,
    lon: 20.0243333,
    name: "yulongling",
    time: "2022-07-22 07:42",
  },

  { lat: 24.324, lon: 40.9515, name: "海运6", time: "2022-07-22 07:42" },
  {
    lat: 23.9966667,
    lon: 20.7781667,
    name: "海运6",
    time: "2022-07-22 07:42",
  },
]);


// const line = ref<L.Polyline>(); // 航线
// const marker = ref<L.Marker>(); // 移动的图标
// const pathPoints = ref<Array<Array<L.LatLngExpression>>>([]); // 移动中路径上所有点
// const pathLine = ref<L.LayerGroup<L.Layer>>(); // 移动中路径上所有点绘制出的线图层

// leaflet-editable插件实现
// const points = ref<L.LayerGroup<L.Layer> | null>(null);
// function showLine() {
//     let latlngs: Array<Array<any>> = [];
//     data.value.forEach((item, index) => {
//         latlngs[index] = [item.lat, item.lng];
//     })
//     line.value = L.polyline(latlngs, {
//         color: "blue",
//     }).addTo(map);

//     points.value = L.layerGroup([])

//     data.value.forEach((item, index) => {
//         (points.value as L.LayerGroup<L.Layer>).addLayer(L.circle([item.lat, item.lng], {
//             color: "white",
//             weight: 10
//         }).bindTooltip(
//             `
//             <div>名称:${item.name}</div>
//              <div>时间:${item.time}</div>
//              `
//         ))
//     });
//     (points.value as L.LayerGroup<L.Layer>).addTo(map);

// }

// function editLine() {
//     if (line.value) {
//         line.value.enableEdit();
//         line.value.on("editable:vertex:dragend", function (e) {
//             if (points.value) {
//                 points.value.clearLayers()
//             }
//             e.vertex.latlngs.forEach((item: object, index: number): void => {
//                 Object.assign(data.value[index], item)
//             })
//             data.value.forEach((item, index) => {
//                 (points.value as L.LayerGroup<L.Layer>).addLayer(L.circle([item.lat, item.lng], {
//                     color: "white",
//                     weight: 10
//                 }).bindTooltip(
//                     `
//             <div>名称:${item.name}</div>
//              <div>时间:${item.time}</div>
//              `
//                 ))
//             });
//             (points.value as L.LayerGroup<L.Layer>).addTo(map);
//         })
//     }
// }

// function stopEdit() {
//     if (line.value) {
//         line.value.disableEdit()
//     }
// }

// 绘制航线函数
// function showLine() {
//   if (line.value) {
//     line.value.remove();
//     pathPoints.value = [];
//     marker.value?.remove();
//   }

//   data.value = latlngTrans(data.value);
//   // 移动图标
//   marker.value = L.Marker.movingMarker(data.value, 2000, {
//     autostart: true, // 自动移动
//     icon: L.icon({
//       // 设置图标
//       iconUrl: shipIcon,
//       iconSize: [30, 30],
//       iconAnchor: [15, 30],
//     }),
//   }).addTo(map);

//   // 初始化线图层
//   pathLine.value = L.layerGroup([]);

//   // 绑定移动事件
//   marker.value?.on("move", (e) => {
//     map.panTo([e.latlng.lat, e.latlng.lng]); //改变地图视角中心
//     pathPoints.value.length > 1 && pathPoints.value.shift(); //避免数组过大
//     pathPoints.value.push([e.latlng.lat, e.latlng.lng]); // 推入新的点
//     pathLine.value
//       ?.addLayer(
//         L.polyline(pathPoints.value, {
//           // 线图层不断添加新绘制的线
//           color: "blue",
//           weight: 2,
//         })
//       )
//       .addTo(map);
//   });

//   // 绑定移动结束事件
//   marker.value?.on("end", (e) => {
//     pathLine.value?.remove(); // 清除移动中绘制的线图层
//     marker.value?.off("move");
//     // 绘制可编辑的航线
//     line.value = L.Polyline.PolylineEditor(data.value, {
//       pointIcon: L.icon({
//         // 端点图标
//         iconUrl: point,
//         iconSize: [10, 10],
//         iconAnchor: [5, 5],
//       }),
//       newPointIcon: L.icon({
//         // 中点图标
//         iconUrl: middlePoint,
//         iconSize: [6, 6],
//         iconAnchor: [3, 3],
//       }),
//       color: "blue",
//       weight: 2,
//     }).addTo(map);

//     // 遍历航线端点数组
//     line.value
//       ?.getPoints()
//       .forEach((item: L.Marker, index: number, arr: L.Marker[]) => {
//         if (index == arr.length - 1) {
//           item.setIcon(
//             L.icon({
//               // 首位点设置闪烁图标
//               iconUrl: startEndpoint,
//               iconSize: [20, 20],
//               iconAnchor: [10, 10],
//             })
//           );
//         }
//         item.bindTooltip(
//           // 绑定弹窗
//           `
//             <div>名称:${data.value[index].name}</div>
//              <div>时间:${data.value[index].time}</div>
//              `
//         );

//         // 给端点绑定拖动事件
//         item.on("dragend", function (e) {
//           if (e.target.context.originalPointNo == arr.length - 1) {
//             marker.value?.setLatLng([
//               e.target.getLatLng().lat,
//               e.target.getLatLng().lng,
//             ]);
//           }
//           // Object.assign(data.value[e.target.context.originalPointNo], e.target.getLatLng());
//           console.log(e.target.context.originalPointNo, e.target.getLatLng()); // 输出新的坐标
//         });
//       });
//   });

//   // 开始绘制
//   marker.value?.start();
// }

// function showlineLLTrans() {
//   const newlatlngs = latlngTrans(data1.value);
//   console.log(newlatlngs)
//   const polyline = L.Polyline.PolylineEditor(newlatlngs, {
//     color: "blue",
//     weight: 3,
//     pointIcon: L.icon({
//       // 端点图标
//       iconUrl: point,
//       iconSize: [10, 10],
//       iconAnchor: [5, 5],
//     }),
//     newPointIcon: L.icon({
//       // 中点图标
//       iconUrl: middlePoint,
//       iconSize: [6, 6],
//       iconAnchor: [3, 3],
//     }),
//   }).addTo(map);

//   polyline.getPoints().forEach((item, index) => {
//     item.on("dragend", function (e) {
//       // Object.assign(data.value[e.target.context.originalPointNo], e.target.getLatLng());
//       const latlng = {
//         lat: e.target.getLatLng().lat,
//         lng: e.target.getLatLng().lng,
//       };
//       if (latlng.lng > 180) {
//         latlng.lng -= 360;
//       } else if (latlng.lng < -180) {
//         latlng.lng += 360;
//       }
//       console.log(e.target.context.originalPointNo, latlng); // 输出新的坐标
//     });
//   });
// }
let layer = ref({});
function showLine() {
  layer.value = drawLine(data1.value, true, false, true, {
    color: "blue",
  });
  console.log(layer.value)
}

function remove(){
  removeLine(layer.value)
}

interface ImapPoint {
  lat: number;
  lng: number;
}

const mapPoint = ref<ImapPoint>({
  lat: 0,
  lng: 0,
});

onMounted(() => {
  map.on("mousemove", (e) => {
    // console.log(e);
    if (e.latlng.lng < -180) {
      e.latlng.lng += 360;
    } else if (e.latlng.lng > 180) {
      e.latlng.lng -= 360;
    }
    mapPoint.value.lat = e.latlng.lat;
    mapPoint.value.lng = e.latlng.lng;
  });
});

</script>

<style scoped>
.showLine {
  position: absolute;
  right: 100px;
  top: 100px;
  z-index: 1000;
}

/* .showlineLLTrans {
  position: absolute;
  right: 100px;
  top: 150px;
  z-index: 1000;
}

.editLine {
  position: absolute;
  right: 100px;
  top: 150px;
  z-index: 1000;
} */

/* .stopEdit {
  position: absolute;
  right: 100px;
  top: 200px;
  z-index: 1000;
} */

.mapPoint {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 100px;
  height: 50px;
  z-index: 1000;
}

.removeLine{
  position: absolute;
  right: 100px;
  top: 150px;
  z-index: 1000;
}
</style>
