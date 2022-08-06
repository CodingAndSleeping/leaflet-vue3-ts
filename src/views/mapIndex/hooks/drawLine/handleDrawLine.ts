import { latlngTrans } from "../latlngTran";
import "../../../../plugins/leaflet-movingmarker/movingmarker";
import "leaflet-editable";
import point from "../../../../assets/point.svg";
import * as L from "leaflet";

/**
 * @param latlngs 经纬度数据
 * @param isAuto 是否添加绘制动画
 * @param isEdit 是否可编辑
 * @param isShowLabel 是否显示
 * @param config  自定义配置
 * @return { L.PolylineOptions} 返回polyline
 */
export function drawLine(
  latlngs: any,
  isAuto: boolean = false,
  isEdit: boolean = false,
  isShowLabel: boolean,
  config: L.PolylineOptions
) {
  let polyline: L.Polyline;
  let layerGroup: L.LayerGroup = L.layerGroup();
  latlngs = latlngTrans(latlngs);
  if (isAuto) {
    const pathPoints: Array<L.LatLngExpression[]> = [];
    const pathLineGroup = L.layerGroup([]);
    const marker = L.Marker.movingMarker(latlngs, 2000, {
      autostart: true,
    });
    marker.on("move", (e: any) => {
      map.panTo([e.latlng.lat, e.latlng.lng]); //改变地图视角中心
      pathPoints.length > 1 && pathPoints.shift(); //避免数组过大
      pathPoints.push([e.latlng.lat, e.latlng.lng]); // 推入新的点
      pathLineGroup.addLayer(L.polyline(pathPoints, config)).addTo(map);
    });

    // 绑定移动结束事件
    marker.on("end", () => {
      pathLineGroup.remove(); // 清除移动中绘制的线图层
      marker.off("move");
      polyline = L.polyline(latlngs, config);
      layerGroup.addLayer(polyline).addTo(map);
      if (isShowLabel) {
        latlngs.map((item: any) =>
          layerGroup
            .addLayer(
              L.marker(item, {
                icon: L.icon({
                  iconUrl: point,
                  iconSize: [10, 10],
                }),
              }).bindTooltip(
                `
            <div>名称:${item.name}</div>
             <div>时间:${item.time}</div>
             `
              )
            )
            .addTo(map)
        );
      }
    });
  } else {
    polyline = L.polyline(latlngs, config);
    layerGroup.addLayer(polyline).addTo(map);
    if (isEdit) {
      polyline.enableEdit();
      isShowLabel = false
    }
    if (isShowLabel) {
      latlngs.map((item: any) =>
        layerGroup
          .addLayer(
            L.marker(item, {
              icon: L.icon({
                iconUrl: point,
                iconSize: [10, 10],
              }),
            }).bindTooltip(
              `
          <div>名称:${item.name}</div>
           <div>时间:${item.time}</div>
           `
            )
          )
          .addTo(map)
      );
    }
  }

  return layerGroup;
}

export function removeLine(layer: any) {
  layer.remove();
}
