(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-changeVillage"],{"70a3":function(t,i,a){"use strict";var e=a("eef7"),n=a.n(e);n.a},"73c0":function(t,i,a){var e=a("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-c54b00fa]{background-color:#f3f3f3}.head[data-v-c54b00fa]{padding:%?20?%;background-color:#fff}.head .left[data-v-c54b00fa]{font-size:%?32?%;font-weight:700}.head .left uni-image[data-v-c54b00fa]{margin-right:%?10?%}.search[data-v-c54b00fa]{padding:%?30?%}.search .city[data-v-c54b00fa]{font-weight:700;font-size:%?30?%}.search .searchBox[data-v-c54b00fa]{background-color:#fff;border-radius:%?30?%;line-height:2;width:%?570?%}.search .searchBox uni-image[data-v-c54b00fa]{width:%?30?%;height:%?30?%;margin:0 %?20?%}.search .searchBox uni-input[data-v-c54b00fa]{width:%?350?%}.search .searchBox .btn[data-v-c54b00fa]{width:%?130?%;text-align:center;background-color:#ff5648;color:#fff;border-radius:%?30?%;font-size:%?30?%}.mine[data-v-c54b00fa]{margin:0 %?30?%;background-color:#fff;border-radius:%?10?%;padding:%?20?%}.mine .title[data-v-c54b00fa]{font-size:%?30?%;margin-bottom:%?20?%}.mine .list .item[data-v-c54b00fa]{margin-bottom:%?10?%;background-color:#f3f3f8;padding:%?30?% %?20?%;border-radius:%?10?%}.mine .list .item .village[data-v-c54b00fa]{font-size:%?32?%;margin-bottom:%?10?%}.mine .list .item .address[data-v-c54b00fa]{color:#989898;max-width:%?460?%}.mine .list .item .btn[data-v-c54b00fa]{line-height:2.3;background-color:#03ca7d;color:#fff;padding:0 %?30?%;border-radius:%?40?%}.villageBox[data-v-c54b00fa]{margin:%?30?%}.villageBox .title[data-v-c54b00fa]{font-size:%?32?%;margin-bottom:%?20?%}.villageBox .list .item[data-v-c54b00fa]{margin-bottom:%?10?%;background-color:#fff;padding:%?30?% %?20?%;border-radius:%?10?%}.villageBox .list .item .village[data-v-c54b00fa]{font-size:%?32?%;margin-bottom:%?10?%}.villageBox .list .item .address[data-v-c54b00fa]{color:#989898;max-width:%?460?%}.villageBox .list .item .btn[data-v-c54b00fa]{line-height:2.3;background-color:#ff5648;color:#fff;padding:0 %?30?%;border-radius:%?40?%}body.?%PAGE?%[data-v-c54b00fa]{background-color:#f3f3f3}',""]),t.exports=i},a1d8:function(t,i,a){"use strict";a.r(i);var e=a("c4b2"),n=a("faa4");for(var s in n)"default"!==s&&function(t){a.d(i,t,(function(){return n[t]}))}(s);a("70a3");var r,c=a("f0c5"),o=Object(c["a"])(n["default"],e["b"],e["c"],!1,null,"c54b00fa",null,!1,e["a"],r);i["default"]=o.exports},aef6:function(t,i,a){"use strict";a("99af"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{userId:"",htosp:0,curPage:1,residential_quarter_name:"",myList:{},list:[],latitude:"",longitude:"",city:"中国",isfoot:!1,cityId:0}},onReachBottom:function(){this.isfoot||(this.curPage++,this.getList())},onShow:function(){var t=this;uni.$on("city",(function(i){t.cityId=i.id,t.city=i.text}))},onLoad:function(){this.htosp=uni.getStorageSync("htop"),this.userId=uni.getStorageSync("userId");var t=this;uni.getLocation({type:"gcj02",success:function(i){t.longitude=i.longitude,t.latitude=i.latitude,i.address&&(t.city=i.address.city),t.getList()},fail:function(i){console.log(i),t.getList()}})},methods:{getList:function(){var t=this,i=this;this.util.ajax("residentialQuarter/listPage",{curPage:this.latitude,latitude:this.latitude,longitude:this.longitude,pageSize:20,residential_quarter_name:this.residential_quarter_name,userId:this.userId},(function(a){i.curPage!==a.data.page.curPage&&(i.isfoot=!0),i.myList=a.data.myXQ,i.list=t.list.concat(a.data.list)}))},getNewList:function(){this.list=[],this.curPage=1,this.getList()},change:function(t){var i=this;this.util.ajax("residentialQuarter/binding",{residential_quarter_id:t,userId:this.userId},(function(t){i.$alert("绑定成功"),setTimeout((function(t){i.$jumpback()}),1e3)}))}}};i.default=e},c4b2:function(t,i,a){"use strict";var e;a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return s})),a.d(i,"a",(function(){return e}));var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"head flexd jubetween flex-center",style:{paddingTop:t.htosp+"px"}},[a("v-uni-view",{staticClass:"left flexd flex-center"},[a("v-uni-image",{staticClass:"backs",attrs:{src:"/static/image/icon_gb.png",mode:"widthFix"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.$jumpback()}}}),t._v("选择小区")],1),a("v-uni-view",{staticClass:"city",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.$jump("/pages/index/changeCity")}}},[t._v("切换城市")])],1),a("v-uni-view",{staticClass:"search flexd jubetween flex-center"},[a("v-uni-view",{staticClass:"city"},[t._v(t._s(t.city))]),a("v-uni-view",{staticClass:"searchBox flexd jubetween flex-center"},[a("v-uni-image",{attrs:{src:"/static/image/icon_ss.png",mode:""}}),a("v-uni-input",{staticClass:"input",attrs:{type:"text",value:"",placeholder:"请输入达人/商家名称","placeholder-style":"font-size:28rpx;color:#888"},model:{value:t.residential_quarter_name,callback:function(i){t.residential_quarter_name=i},expression:"residential_quarter_name"}}),a("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getNewList()}}},[t._v("搜索")])],1)],1),t.myList.residential_quarter_name?a("v-uni-view",{staticClass:"mine"},[a("v-uni-view",{staticClass:"title"},[t._v("我的小区")]),a("v-uni-view",{staticClass:"list"},[a("v-uni-view",{staticClass:"item flexd jubetween flex-center"},[a("v-uni-view",[a("v-uni-view",{staticClass:"village"},[t._v(t._s(t.myList.residential_quarter_name))]),a("v-uni-view",{staticClass:"address"},[t._v(t._s(t.myList.address))])],1),a("v-uni-view")],1)],1)],1):t._e(),a("v-uni-view",{staticClass:"villageBox"},[a("v-uni-view",{staticClass:"title"},[t._v("附近小区")]),a("v-uni-view",{staticClass:"list"},t._l(t.list,(function(i,e){return a("v-uni-view",{key:e,staticClass:"item flexd jubetween flex-center"},[a("v-uni-view",[a("v-uni-view",{staticClass:"village"},[t._v(t._s(i.residential_quarter_name))]),a("v-uni-view",{staticClass:"address"},[t._v(t._s(i.address))])],1),a("v-uni-view",[a("v-uni-view",{staticClass:"btn",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.change(i.id)}}},[t._v("绑定")])],1)],1)})),1)],1)],1)},s=[]},eef7:function(t,i,a){var e=a("73c0");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("6b72c4fa",e,!0,{sourceMap:!1,shadowMode:!1})},faa4:function(t,i,a){"use strict";a.r(i);var e=a("aef6"),n=a.n(e);for(var s in e)"default"!==s&&function(t){a.d(i,t,(function(){return e[t]}))}(s);i["default"]=n.a}}]);