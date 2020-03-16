//#region 公共包
//导入Openlayers模块
import { Map, View } from 'ol';
import { transform, get as getProjection } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
//导入自定义包
import WFSJQ from '../ol/wfs';
import popup from '../ol/popup';
import Tilelayer from '../ol/tilelayer'
import Vectorlayer from '../ol/vectorlayer';
import Heatmaplayer from '../ol/heatmaplayer';
//#endregion

//#region 公共属性
var wkid = 'EPSG:4326';                                 //坐标系
var projection = getProjection(wkid);
var curExtent = null;                                   //当前可视区域
var curFeatures = null;                                 //当前选择标注点

//配置文件配置参数
var wfs_url = settings.wfs_url;                         //WFS服务地址
var _view = settings.map;
var tilelayers = settings.tilelayers;
var vectorlayers = settings.vectorlayers;
var heatmaplayers = settings.heatmaplayers;
var dblclickZoom = settings.dblclickZoom;
document.body.style.backgroundColor = _view.background;  //地图背景色
//#endregion

//#region 图层控制
/************基础Map****************/
var view = new View({
    center: _view.center,
    projection: projection,
    extent: _view.extent,
    zoom: _view.zoom,
    minZoom: _view.minZoom,
    maxZoom: _view.maxZoom,
    zoomFactor: _view.zoomFactor
});
var map = new Map({
    layers: [],
    target: 'map',
    controls: defaultControls({
        attributionOptions: {
            collapsible: false
        }
    }),
    view: view
});

var tilelayer = new Tilelayer(map);       //瓦片图层
var vectorlayer = new Vectorlayer(map);   //矢量图层
var heatmaplayer = new Heatmaplayer(map); //热力图层

//popup 弹窗初始化
popup.init(map);
//根据管制区域的范围设置当前地图自动适应到管制区域
// map.getView().fit([113.1097599864006, 23.014652316609343, 113.12384694814679, 23.030132760628113], map.getSize());

/************图层管理****************/
//基础（瓦片）图层加载
tilelayer.addLayers(tilelayers);
//矢量图层加载（标注点）
vectorlayer.addLayers(vectorlayers);
var pointLayers = vectorlayer.getVectorlayers();
//热力图层加载
heatmaplayer.addLayers(heatmaplayers);
var heatLayers = heatmaplayer.getHeatmaplayers();
//#endregion

//#region 公共方法
/************公共方法****************/
//清空矢量图层
function clearFeatures() {
    //矢量图层
    for (let i = 0; i < pointLayers.length; i++) {
        var vectorSource = pointLayers[i].vectorSource;
        vectorSource.clear();
        pointLayers[i].features = [];     
    }
    //热力图层
    for (let i = 0; i < heatLayers.length; i++) {
        var vectorSource = heatLayers[i].vectorSource;
        vectorSource.clear();
        heatLayers[i].features = [];     
    }
}

//清空所有图层
var clearLayers = function () {
    var layers = map.getLayers(); //获取地图中所有图层
    for (var i = 0; i < layers.getLength(); i++) {
        //获取每个图层的名称、是否可见属性
        var layer = layers.item(i);
        console.log('layer', layer);
        map.removeLayer(layer);
    }
}
//回调函数
var loadFun = function (cbFun, layer, bbox, filter) {
    // console.log('执行方法',cbFun);
    setTimeout(function () {
        cbFun(layer, bbox, filter);
    }, 0);
}
//#endregion

//#region 事件
/************公共事件****************/
//#region 滑块
var sliderLeft = document.getElementById('sliderLeft');
var sliderAdd = document.getElementById('sliderAdd');
var sliderReduce = document.getElementById('sliderReduce');
sliderLeft.onclick = function () {
    popup.setPosition(undefined);
    view.setZoom(_view.zoom);
}
sliderAdd.onclick = function () {
    view.setZoom(view.getZoom() + 1);
}
sliderReduce.onclick = function () {
    view.setZoom(view.getZoom() - 1);
}
//滑块控制图层
var slider = $("#slider-range-max").slider({
    range: "max",
    min: _view.minZoom,
    max: _view.maxZoom,
    value: _view.zoom,
    slide: function (event, ui) {
        view.setZoom(ui.value);
    }
});
//#endregion

//点击弹出事件
map.on('singleclick', function (evt) {
    //判断当前单击处是否有要素，捕获到要素时弹出popup
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
    if (feature) {
        if (curFeatures) { //恢复上次点击的标注图标                   
            curFeatures.setStyle(null);
        }
        //选中更换图标
        if (feature.layer && feature.layer.icon2) {
            var style2 = vectorlayer.imageStyle(feature.layer.icon2, null, feature.layer.scale);
            feature.setStyle(style2);
        }
        curFeatures = feature;
        console.log('feature', feature);
        //弹窗信息
        if (feature.layer && feature.layer.popup && feature.layer.popup.show) {
            var coordinate = evt.coordinate;
            popup.open('', coordinate);
            popup.showInfoWin(feature.values_, coordinate, feature.layer.popup);
        }
    }
});
//双击事件
map.on('dblclick', function (evt) {
    if (dblclickZoom && view.getZoom() >= dblclickZoom) return;
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
    if (feature) {
        clearFeatures();
        curFeatures = feature;
        //地图 下钻          
        var coordinate = evt.coordinate;
        view.setCenter(coordinate);
        view.setZoom(dblclickZoom);
    }
});
//图层切换事件
var zoom = 0;
map.on('moveend', function (e) {
    if (slider) slider.slider("value", view.getZoom());    
    if (zoom != view.getZoom()) {
        zoom = view.getZoom();
        console.log('zoom', zoom);
        //瓦片图层显示隐藏切换
        tilelayer.switchLayers();
    }
    var curExtent = e.frameState.extent;
    var bbox = curExtent.join(',');
    //加载矢量图层
    for (let i = 0; i < pointLayers.length; i++) {
        //添加图片标注
        vectorlayer.addFeatures(pointLayers[i], bbox, null, curFeatures);
        // loadFun(vectorlayer.addFeatures, pointLayers[i], bbox, null, curFeatures);
    }
    //加载热力图层
    for (let i = 0; i < heatLayers.length; i++) {        
        // loadFun(addFeaturesHeat, heatLayers[i], bbox, null);
        heatmaplayer.addFeatures(heatLayers[i], bbox, null);
    }
});
//#endregion

//#region 公开接口 - 开放方法
window.clearLayers = clearLayers;           //清空所有图层
window.clearFeatures = clearFeatures;       //清空矢量图层
//#endregion