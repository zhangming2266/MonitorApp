const MapRoutes = [{
    path: '/map',
    name: 'Map',
    component: () =>
        import ('views/map/map.vue'),
    meta: {
        title: '高德地图',
        icon: 'home'
    }
}]
export default MapRoutes