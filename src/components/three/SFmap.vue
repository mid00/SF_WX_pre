<template>
    <div class="mapBox">

      <div class="title">

        <p><span class="item">联系地址</span>：辽宁省沈抚新区滨河路银科大厦E座一楼</p>
        <p><span class="item">热线电话</span>：024-23212999</p>
        
      </div>

<!--百度地图容器-->
      <div id="map" style="width:100%;height:550px;border:#ccc solid 1px;font-size:14px"></div>

    </div>
</template>


<script>

import BMap from 'BMap'

export default {
    data(){
        return {
            map:{},
            gc:{},
        }
    },
    mounted(){ this.initMap(); },
    methods:{

 //创建和初始化地图函数：
    initMap(){
      this.createMap();//创建地图
      this.setMapEvent();//设置地图事件
      this.addMapControl();//向地图添加控件
      this.addMapOverlay();//向地图添加覆盖物
    },
    createMap(){ 
      this.map = new BMap.Map("map"); 
      this.map.centerAndZoom(new BMap.Point(123.643571,41.810007),13);
    },
    setMapEvent(){
      this.map.enableScrollWheelZoom();
      this.map.enableKeyboard();
      this.map.enableDragging();
      this.map.enableDoubleClickZoom()
    },
    addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    },
    addMapOverlay(){
      var markers = [
        {content:"地址：辽宁省沈抚新区金枫街75-1号 ",title:"辽宁省沈抚新区管理委员会",imageOffset: {width:0,height:3},position:{lat:41.810014,lng:123.643589}}
      ];
      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
        })});
        var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: markers[index].title,
          enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        marker.setLabel(label);


        this.addClickHandler(marker,infoWindow);


        this.map.addOverlay(marker);
      };
    },
    //向地图添加控件
    addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);


      this.map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});


      this.map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});


      this.map.addControl(overviewControl);
    },

    }
}
</script>


<style scoped>
*{  color: #666;font-family: Microsoft YaHei;}

  .mapBox{
    position: absolute; left: 0; top: 0; right: 0; bottom: 0;
    background: #eeeeee;
    padding: 10px;
  }

  .title{
    background: #ffffff;
    margin-bottom: 10px;
    padding:5px 8px;
  }
  .item{ color: #0984e4; font-weight: bold;}

  #app{ width:100%; }
</style>
