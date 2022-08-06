import * as L from "leaflet";
export function createMap(options?: L.MapOptions) {
  const defaultOptions: L.MapOptions = {
    center: [51.505, -0.09],
    zoom: 2,
    // maxZoom: 13,
    renderer: new L.Canvas(),
    minZoom: 2,
    crs: L.CRS.EPSG3857,
    zoomControl: false,
    worldCopyJump: true,
    maxBounds: L.latLngBounds([90, -540.5], [-90, 540.5]),
    attributionControl: false,
    editable:true,
  };

  const mapOptions =
    options === undefined
      ? defaultOptions
      : Object.assign(defaultOptions, options);

  const map = L.map("map", mapOptions);

  return map;
}
