<template>
    <div id="map"></div>
</template>

<script setup lang="ts">
import * as L from 'leaflet';
import { onMounted } from 'vue';
import { createMap } from '../../utils/createLeafletMap';
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
    crs?: null | L.CRS
}>()

const emits = defineEmits<{
    (event: "createMap", data: L.Map): L.Map
}>()

onMounted(() => {
    const options = {
        crs: props.crs as L.CRS
    }

    if (options.crs === null || options.crs === undefined)
        delete (options as any).crs;

    const map = createMap(options)

    window.map = map;
    

    emits("createMap", map);
})

</script>


<style>
#map{
    height: 100vh;
    width: 100vw;
}
</style>