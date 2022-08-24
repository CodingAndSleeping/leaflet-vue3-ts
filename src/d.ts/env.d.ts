/// <reference types="vite/client" />

import  'element-plus/global';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "nprogress";

// window 增加 map 键
declare interface Window {
  map: L.Map;
}

// 全局定义 map 变量为 leaflet map
declare const map: L.Map;

// 扩展leaflet 对象
/** leaflet 对象 */
declare namespace L {
  interface Map {
    /** 几何编辑插件 */
    editTools: {
      createLineGuide: () => void;
      createVertexIcon: () => void;
      createEditLayer: () => void;
      createFeaturesLayer: () => void;
      moveForwardLineGuide: () => void;
      moveBackwardLineGuide: () => void;
      anchorForwardLineGuide: () => void;
      anchorBackwardLineGuide: () => void;
      attachForwardLineGuide: () => void;
      attachBackwardLineGuide: () => void;
      detachForwardLineGuide: () => void;
      detachBackwardLineGuide: () => void;
      blockEvents: () => void;
      unblockEvents: () => void;
      registerForDrawing: () => void;
      unregisterForDrawing: () => void;
      onMousedown: () => void;
      stopDrawing: () => void;
      connectCreatedToMap: () => void;
      startPolyline: () => L.Polyline;
      startPolygon: (
        latlng?: L.LatLng,
        options?: L.MapOptions & { [key: string]: any }
      ) => L.Polygon;
      startMarker: () => L.Marker;
      startRectangle: () => L.Rectangle;
      startCircle: () => L.Circle;
      startHole: () => void;
      createLayer: () => void;
      createPolyline: () => void;
      createPolygon: () => void;
      createMarker: () => void;
      createRectangle: () => void;
      createCircle: () => void;
      makeCancellable: () => void;
      e: () => void;
      L: () => void;
      this: () => void;
      onClick: () => void;
      onMouseup: () => void;
      onContextMenu: () => void;
      onMouseOver: () => void;
      onMouseOut: () => void;
      getIndex: () => void;
      getLastIndex: () => void;
      getPrevious: () => void;
      getNext: () => void;
      addMiddleMarkers: () => void;
      resetMiddleMarker: () => void;
      split: () => void;
      continue: () => void;
      setVisibility: () => void;
      show: () => void;
      hide: () => void;
      updateLatLng: () => void;
      computeLatLng: () => void;
      onAdd: () => void;
      onRemove: () => void;
      onMouseDown: () => void;
      delete: () => void;
      index: () => void;
      removeHooks: () => void;
      drawing: () => void;
      onFeatureAdd: () => void;
      hasMiddleMarkers: () => void;
      fireAndForward: () => void;
      onEnable: () => void;
      onDisable: () => void;
      onEditing: () => void;
      onStartDrawing: () => void;
      onEndDrawing: () => void;
      onCancelDrawing: () => void;
      onCommitDrawing: () => void;
      commitDrawing: () => void;
      cancelDrawing: () => void;
      onDrawingClick: () => void;
      isConnected: () => void;
      onMove: () => void;
      _getEvents: () => void;
      connect: () => void;
      addHooks: () => void;
      initVertexMarkers: () => void;
      reset: () => void;
      addVertexMarker: () => void;
      onNewVertex: () => void;
      addVertexMarkers: () => void;
      refreshVertexMarkers: () => void;
      addMiddleMarker: () => void;
      onVertexMarkerClick: () => void;
      onVertexRawMarkerClick: () => void;
      onVertexDeleted: () => void;
      onVertexMarkerCtrlClick: () => void;
      onVertexMarkerShiftClick: () => void;
      onVertexMarkerMetaKeyClick: () => void;
      onVertexMarkerAltClick: () => void;
      onVertexMarkerContextMenu: () => void;
      onVertexMarkerMouseDown: () => void;
      onVertexMarkerMouseOver: () => void;
      onVertexMarkerMouseOut: () => void;
      onMiddleMarkerMouseDown: () => void;
      onVertexMarkerDragStart: () => void;
      onVertexMarkerDragEnd: () => void;
      setDrawnLatLngs: () => void;
      startDrawing: () => void;
      startDrawingForward: () => void;
      endDrawing: () => void;
      addLatLng: () => void;
      newPointBackward: () => void;
      push: () => void;
      removeLatLng: () => void;
      pop: () => void;
      processDrawingClick: () => void;
      refresh: () => void;
      newShape: () => void;
      deleteShape: () => void;
      _deleteShape: () => void;
      inplaceDelete: () => void;
      spliceDelete: () => void;
      deleteShapeAt: () => void;
      appendShape: () => void;
      prependShape: () => void;
      insertShape: () => void;
      onDragStart: () => void;
      onDragEnd: () => void;
      startDrawingBackward: () => void;
      continueBackward: () => void;
      continueForward: () => void;
      splitShape: () => void;
      newPointForward: () => void;
      addNewEmptyHole: () => void;
      newHole: () => void;
      addNewEmptyShape: () => void;
      ensureMulti: () => void;
      ensureNotFlat: () => void;
      vertexCanBeDeleted: () => void;
      formatShape: () => void;
      extendBounds: () => void;
      updateBounds: () => void;
      updateLatLngs: () => void;
      initialize: () => void;
      computeResizeLatLng: () => void;
      updateResizeLatLng: () => void;
      getLatLngs: () => void;
      getDefaultLatLngs: () => void;
      onVertexMarkerDrag: () => void;
      resize: () => void;
      onDrawingMouseDown: () => void;
      onDrawingMouseUp: () => void;
      onDrawingMouseMove: () => void;
      onDrag: () => void;
      createEditor: () => void;
      enableEdit: () => void;
      editEnabled: () => void;
      disableEdit: () => void;
      toggleEdit: () => void;
      _onEditableAdd: () => void;
      parentShape: () => void;
    };
  }

  interface Layer {
    /** 开启编辑模式 */
    enableEdit: () => any;
  }

  interface PolylineOptions {
    /** 面积、线长度等配置 */
    measurementOptions?: { [key: string]: any };
    /** 是否显示测量结果 */
    showMeasurements?: boolean;
  }


  function polygon(
    latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][],
    options?: PolylineOptions
  ): Polygon;

  interface Polygon {
    /** 主动更新测量结果 */
    updateMeasurements: () => void;
  }

  interface Polyline {
    PolylineEditor: () => L.Polyline;
    getPoints: () => Array<L.Marker>;
  }

  interface Marker {
    start: () => void;
  }


  interface MapOptions {
    editable?: boolean;
  }


  interface TileLayerOptions {
    foo?: string
  }


}
