(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chooselocation/index"],{"0674":function(t,e,n){},"2dfd":function(t,e,n){"use strict";n.r(e);var r=n("34bf"),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},"34bf":function(t,e,n){"use strict";(function(t){function n(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=r(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var a=0,i=function(){};return{s:i,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,c=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return s=t.done,t},e:function(t){c=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(c)throw o}}}}function r(t,e){if(t){if("string"===typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{systemInfo:t.getSystemInfoSync(),StatusBar:null,Map:null,Marker:null,MapCloseButton:null,MapConfirmButton:null,MapCurrentButton:null,mapCurrentPoint:{},locationCurrent:{},searchType:1,searchContent:"",searchPointList:[],searchPointIndex:0,pageCurrent:0,loading:!1}},onLoad:function(){var e=this;plus.nativeUI.toast("当前地理位置读取中"),t.getLocation({type:"gcj02",geocode:!0,success:function(t){e.mapCurrentPoint=t;var n=e.$mp.page.$getAppWebview();e.Map=plus.maps.create("map",{width:"100%",height:"50%",center:new plus.maps.Point(e.mapCurrentPoint.longitude,e.mapCurrentPoint.latitude),zoom:14}),n.append(e.Map),e.centerFunc(),e.markerFunc();var r=e.mapCurrentPoint.address.province+e.mapCurrentPoint.address.city+e.mapCurrentPoint.address.district+e.mapCurrentPoint.address.street+e.mapCurrentPoint.address.streetNum;e.locationCurrent={point:{longitude:e.mapCurrentPoint.longitude,latitude:e.mapCurrentPoint.latitude},name:e.mapCurrentPoint.address.poiName,address:r+e.mapCurrentPoint.address.poiName},e.searchPointChange(),e.Map.onclick=function(t){e.mapCurrentPoint=t,e.centerFunc(),e.markerFunc(),e.searchType=1,e.searchPointIndex=0,e.pageCurrent=1,plus.maps.Map.reverseGeocode(e.mapCurrentPoint,{coordType:"gcj02"},(function(t){e.locationCurrent={point:t.coord,name:"当前位置",address:t.address},e.searchPointChange()}),(function(t){plus.nativeUI.toast(JSON.stringify(t))}))}},fail:function(t){console.log(t),plus.nativeUI.toast("读取当前地理位置失败")}}),this.drawRectStatusBar(),this.drawRectClose(),this.drawRectConfirm(),this.drawRectCurrent()},methods:{centerFunc:function(){this.Map.setCenter(new plus.maps.Point(this.mapCurrentPoint.longitude,this.mapCurrentPoint.latitude))},markerFunc:function(){this.Map.removeOverlay(this.Marker),this.Marker=new plus.maps.Marker(new plus.maps.Point(this.mapCurrentPoint.longitude,this.mapCurrentPoint.latitude)),this.Marker.setIcon("/static/chooselocation/marker-icon.png"),this.Map.addOverlay(this.Marker)},searchChange:function(){var t=this;this.timer&&clearTimeout(this.timer),this.timer=setTimeout((function(){t.searchContent?(t.locationCurrent={},t.searchType=0,t.searchPointIndex=void 0,t.pageCurrent=1,t.searchPointChange()):t.clearSearchChange()}),300)},clearSearchChange:function(){this.searchContent="",this.locationCurrentFunc()},scrolltolower:function(){this.pageCurrent++,this.searchPointChange()},searchPointChange:function(){var t=this,e=new plus.maps.Search(this.Map);0===this.searchType?e.poiSearchNearBy(this.searchContent,new plus.maps.Point(this.mapCurrentPoint.longitude,this.mapCurrentPoint.latitude),5e8,this.pageCurrent):e.poiSearchNearBy(this.searchContent,new plus.maps.Point(this.mapCurrentPoint.longitude,this.mapCurrentPoint.latitude),3e3,this.pageCurrent),console.info(this.pageCurrent),this.loading=!0,e.onPoiSearchComplete=function(e,r){if(console.log(r),1===t.pageCurrent&&(t.searchPointList=[],Object.keys(t.locationCurrent).length>0&&t.searchPointList.push(t.locationCurrent)),0===e){var a=r.poiList;if(a.length>0){var i,o=n(a);try{var s=function(){var e=i.value;plus.maps.Map.geocode(e.address+e.name,{city:e.city},(function(r){var a,i=r.address.match(/.+?(省|市|区|自治区|自治州|县|乡|镇)/g),o="",s=n(i);try{for(s.s();!(a=s.n()).done;){var c=a.value;o+=c}}catch(u){s.e(u)}finally{s.f()}t.searchPointList.push({point:e.point,address:o+e.address+e.name,name:e.name})}))};for(o.s();!(i=o.n()).done;)s()}catch(c){o.e(c)}finally{o.f()}}else plus.nativeUI.toast("没有检索到结果")}else plus.nativeUI.toast("检索失败");t.loading=!1}},searchPointClick:function(t,e){this.searchPointIndex=t,this.mapCurrentPoint=e.point,this.centerFunc(),this.markerFunc()},drawRectStatusBar:function(){var t=new plus.nativeObj.View("statusbar",{height:"".concat(this.systemInfo.statusBarHeight,"px"),width:"100%"});t.drawRect({color:"rgba(0, 0, 0, .3)"}),t.show(),this.StatusBar=t},drawRectClose:function(){var e=new plus.nativeObj.View("close",{top:"".concat(this.systemInfo.statusBarHeight+10,"px"),left:"10px",height:"30px",width:"30px"});e.drawRect({color:"#999",radius:"8px"},{width:"100%",height:"100%"}),e.drawBitmap("/static/chooselocation/close-icon.png",{},{top:"7.5px",left:"7.5px",width:"15px",height:"15px"}),e.show(),this.MapCloseButton=e,e.addEventListener("click",(function(){t.navigateBack()}),!1)},drawRectConfirm:function(){var e=this,n=new plus.nativeObj.View("confirm",{top:"".concat(this.systemInfo.statusBarHeight+10,"px"),left:"".concat(this.systemInfo.screenWidth-60,"px"),height:"30px",width:"50px"});n.drawRect({color:"#409eff",radius:"8px"},{width:"100%",height:"100%"}),n.drawText("确定",{},{color:"#fff",size:"14px"}),n.show(),this.MapConfirmButton=n,n.addEventListener("click",(function(){if(e.searchPointIndex||0===e.searchPointIndex){var n=e.searchPointList[e.searchPointIndex];t.$emit("location",n),t.navigateBack()}else plus.nativeUI.toast("请先选择地理位置")}),!1)},drawRectCurrent:function(){var t=this,e=new plus.nativeObj.View("center",{top:"43%",left:"".concat(this.systemInfo.screenWidth-40,"px"),height:"30px",width:"30px"});e.drawRect({color:"#999",radius:"30px"},{width:"100%",height:"100%"}),e.drawBitmap("/static/chooselocation/center-icon.png",{},{top:"5px",left:"5px",width:"20px",height:"20px"}),e.show(),this.MapCurrentButton=e,e.addEventListener("click",(function(){t.locationCurrentFunc()}),!1)},locationCurrentFunc:function(){var e=this;t.getLocation({type:"gcj02",geocode:!0,success:function(t){e.mapCurrentPoint=t,e.centerFunc(),e.markerFunc(),e.searchType=1,e.searchPointIndex=0,e.pageCurrent=1;var n=e.mapCurrentPoint.address.province+e.mapCurrentPoint.address.city+e.mapCurrentPoint.address.district+e.mapCurrentPoint.address.street+e.mapCurrentPoint.address.streetNum;e.locationCurrent={point:{longitude:e.mapCurrentPoint.longitude,latitude:e.mapCurrentPoint.latitude},name:e.mapCurrentPoint.address.poiName,address:n+e.mapCurrentPoint.address.poiName},e.searchPointChange()},fail:function(t){plus.nativeUI.toast("读取当前地理位置失败")}})}},onUnload:function(){this.StatusBar.close(),this.MapCloseButton.close(),this.MapConfirmButton.close(),this.MapCurrentButton.close(),this.Map.close()}};e.default=i}).call(this,n("543d")["default"])},"359b":function(t,e,n){"use strict";(function(t){n("56c5"),n("33db");r(n("66fd"));var e=r(n("b088"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"628e":function(t,e,n){"use strict";var r=n("0674"),a=n.n(r);a.a},b088:function(t,e,n){"use strict";n.r(e);var r=n("b949"),a=n("2dfd");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("628e");var o,s=n("f0c5"),c=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"22c40290",null,!1,r["a"],o);e["default"]=c.exports},b949:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},i=[]}},[["359b","common/runtime","common/vendor"]]]);