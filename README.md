目录结构

	├── package.json            # 模块依赖
    ├── README.md               # 项目说明
    ├── webpack.config          # webpack配置文件(调试模式)   
    ├── webpack.config.prod     # webpack配置文件(产品打包模式)  
    ├── src                     # 源码目录
    │   ├── business               # 业务性功能代码
    │   │ ├── typhoon				 # 如：台风动画
    │   ├── entries                # 入口文件代码
    │   │ ├── index				     # 如：首页index
    │   ├── ol					   # openlayers 公共方法封装
    │   │ ├── popup.js               # popup弹窗
    │   │ ├── wfs.js                 # wfs请求
    │   │ ├── wms.js                 # wms服务图层
    │   │ ├── wmts.js                # wmts服务图层
    │   │ ├── tilelayer.js           # 瓦片图层
    │   │ ├── vectorlayer.js         # 矢量图层
    │   │ ├── heatmaplayer.js        # 热力图层
    │   ├── plugins                # 插件
    │   │ ├── olechart.js            # openlayers + echarts 集成类
    │   │ ├── mapv.js				 # openlayers + mapv 集成类
    │   │ ├── echarts                # echarts自定义图表
    │   │ ├── mapv					 # mapv自定义图表
    │   ├── tools                  # 工具目录
    │   │ ├── common.js              # 公共方法
    │   │ ├── websocket.js           # 与VBI5服务建立通信获取模型数据
    ├── dist                     # 静态资源(打包发布文件目录)
    │   ├── css                    # 样式文件
	│   ├── icon                   # 图片资源
	│   ├── html                   # 静态页面
	│   ├── js                     # 静态脚本(编译后文件路径)
    │   │ ├── setting.js             # 公共属性配置文件

安装依赖

$ cd webpackTemplate
$ npm install                //建议使用淘宝镜像
$ cnpm install               npm install -g cnpm --registry=https://registry.npm.taobao.org


编译（生产环境）

生产环境会对js混淆压缩（发布）

$ npm run build

启动本地调试服务

$ npm run server