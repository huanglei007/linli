(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"050a":function(t,e,i){var a=i("f302");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("6e25c7eb",a,!0,{sourceMap:!1,shadowMode:!1})},"0f46":function(t,e,i){"use strict";i.r(e);var a=i("a861"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},2399:function(t,e,i){"use strict";i.r(e);var a=i("33ba"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"27a3":function(t,e,i){"use strict";i.r(e);var a=i("f4a4"),n=i("2399");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("a1cd");var r,c=i("f0c5"),o=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"b05d757e",null,!1,a["a"],r);e["default"]=o.exports},"33ba":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"menuList",data:function(){return{userId:""}},props:{list:{default:[],type:Array}},mounted:function(){this.userId=uni.getStorageSync("userId")},methods:{talkto:function(t,e){t&&e&&(t!=this.userId?this.$jump("/pages/chat/HM-chat?idse="+t+"&tita="+e):this.$alert("无法和自己聊天"))},jiedan:function(t){var e=this;this.util.ajax("myOrder/saveOrder",{releaseRequirementId:t,userId:this.userId},(function(t){e.$alert("接单成功"),e.refresh()}))},refresh:function(){this.$emit("refresh")}}};e.default=a},"3f77":function(t,e,i){var a=i("fcf2");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("10c34158",a,!0,{sourceMap:!1,shadowMode:!1})},a1cd:function(t,e,i){"use strict";var a=i("3f77"),n=i.n(a);n.a},a861:function(t,e,i){"use strict";var a=i("4ea4");i("99af"),i("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("27a3")),s={components:{list:n.default},data:function(){return{userId:"",htosp:0,bannerList:[{picture:"/static/image/banner.png",path:""},{picture:"/static/image/banner.png",path:""},{picture:"/static/image/banner.png",path:""},{picture:"/static/image/banner.png",path:""}],swiperConfig:{indicatorDots:!1,indicatorColor:"rgba(255, 255, 255, .4)",indicatorActiveColor:"rgba(255, 255, 255, 1)",autoplay:!1,interval:3e3,duration:300,circular:!0,previousMargin:"65rpx",nextMargin:"65rpx"},menuList:[{img:"/static/image/icon_bqkd.png",title:"帮取快递",path:"/pages/from/apply?id=0"},{img:"/static/image/icon_bdlj.png",title:"帮倒垃圾",path:"/pages/from/apply?id=1"},{img:"/static/image/icon_bgw.png",title:"购物商品",path:"/pages/from/apply?id=2"},{img:"/static/image/icon_tcps.png",title:"同城配送",path:"/pages/from/apply?id=3"},{img:"/static/image/icon_jyhs.png",title:"旧衣回收",path:"/pages/from/clothes"},{img:"/static/image/icon_jsmm.png",title:"旧书买卖",path:"/pages/index/book",tag:"/static/image/icon_gr.png"},{img:"/static/image/icon_es3c.png",title:"宠物买卖",path:"/pages/index/pet",tag:"/static/image/icon_gr.png"},{img:"/static/image/icon_qtxz.png",title:"闲置买卖",path:"/pages/index/xianzhi"},{img:"/static/image/icon_sqsq.png",title:"社区商圈",path:"/pages/index/shangquan"},{img:"/static/image/icon_sqdr.png",title:"社区达人",path:"/pages/index/daren"},{img:"/static/image/icon_sqwy.png",title:"社区物业",path:"/pages/index/wuye"},{img:"/static/image/tjyy.png",title:"体检预约",path:"/pages/index/tijian",tag:"/static/image/icon_mf.png"}],classfy:[{category_name:"需求类别",id:0}],classfyIndex:0,range:[{name:"距离",id:0}],rangeIndex:0,shopChoise:0,shopList:[],curPage:1,commissionSort:0,isfoot:!1,village:{}}},onLoad:function(){this.userId=uni.getStorageSync("userId"),this.htosp=uni.getStorageSync("htop"),this.village=uni.getStorageSync("village");var t=this;this.util.ajax("release/categoryList",{},(function(e){t.classfy=t.classfy.concat(e.data.list)})),this.util.ajax("release/distanceConfigList",{},(function(e){t.range=t.range.concat(e.data.list)})),this.getlist()},onShow:function(){var t=this;t.util.ajax("user/getUserInfo",{userId:t.userId},(function(e){t.userData=e.data,t.village=e.data.residentialQuarterVo,e.data.residentialQuarterVo.residential_quarter_name||(t.$alert("请先绑定小区"),setTimeout((function(e){t.$jump("/pages/index/changeVillage")}),1e3))}))},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},methods:{bindPickerChange:function(t){this.classfyIndex=t.target.value,this.getNewList()},bindPickerChange2:function(t){this.rangeIndex=t.target.value,this.getNewList()},getlist:function(){var t=this;this.util.ajax("release/releaseList",{categoryId:this.classfy[this.classfyIndex].id,commissionSort:0,curPage:this.curPage,distanceValue:this.range[this.rangeIndex].value,pageSize:20,userId:this.userId},(function(e){t.curPage!==e.data.page.curPage&&(t.isfoot=!0),t.curPage==e.data.page.curPage&&(t.shopList=t.shopList.concat(e.data.list.map((function(e){return{category_name:e.category_name,commission:e.commission,createtime:t.$shijian(e.createtime),distance:e.distance,id:e.id,image:e.image,publisher_name:e.publisher_name,requirement_introduction:"需求简介："+e.requirement_introduction,user_id:e.user_id,user_name:e.publisher_name}}))))}))},getNewList:function(){this.shopList=[],this.curPage=1,this.isfoot=!1,this.getlist()}}};e.default=s},b864:function(t,e,i){"use strict";i.r(e);var a=i("f937"),n=i("0f46");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("ce18");var r,c=i("f0c5"),o=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"7a0718d8",null,!1,a["a"],r);e["default"]=o.exports},ce18:function(t,e,i){"use strict";var a=i("050a"),n=i.n(a);n.a},f302:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content[data-v-7a0718d8]{background-color:#f5f5f5;position:relative}.content .homeBg[data-v-7a0718d8]{position:absolute;top:0;left:0;width:100%}.content .homeBg uni-image[data-v-7a0718d8]{width:100%}.content .header[data-v-7a0718d8]{position:relative;z-index:1}.content .header .city[data-v-7a0718d8]{line-height:%?30?%;font-size:%?30?%;padding:0 %?20?%}.content .header .city uni-image[data-v-7a0718d8]{width:%?30?%;height:%?30?%;margin:0 %?10?%}.content .header .village[data-v-7a0718d8]{line-height:%?30?%;font-size:%?30?%;padding:%?20?% %?30?%}.content .header .village uni-image[data-v-7a0718d8]{width:%?20?%;height:%?30?%;margin-left:%?10?%}.content .header .operation[data-v-7a0718d8]{padding:%?30?%}.content .header .operation .searchBox[data-v-7a0718d8]{background-color:#f5f5f5;border-radius:%?40?%;width:96%;text-align:center;padding:%?16?% 0}.content .header .operation .searchBox uni-image[data-v-7a0718d8]{width:%?25?%;height:%?25?%;margin:0 %?10?%}.content .header .operation .searchBox uni-input[data-v-7a0718d8]{width:%?350?%}.content .header .operation .searchBox .btn[data-v-7a0718d8]{text-align:center;color:#666;border-radius:%?30?%;font-size:%?24?%}.content .header .operation .add-btn[data-v-7a0718d8]{width:%?50?%}.content .header .operation .add-btn uni-image[data-v-7a0718d8]{width:%?40?%;height:%?40?%}.content .menu[data-v-7a0718d8]{position:relative;border-radius:%?30?%;z-index:1;background-color:#fff;padding:%?20?%;margin:0 %?30?%;flex-wrap:wrap}.content .menu .item[data-v-7a0718d8]{flex:0 0 25%;text-align:center;margin-bottom:%?20?%}.content .menu .item uni-image[data-v-7a0718d8]{width:%?100?%;height:%?100?%}.content .menu .item .image[data-v-7a0718d8]{position:relative}.content .menu .item .tag[data-v-7a0718d8]{width:%?56?%;position:absolute;top:0;right:%?0?%}.content .menu .item .title[data-v-7a0718d8]{font-size:%?28?%;color:#505050}.content .cenhead[data-v-7a0718d8]{padding:%?30?%}.content .cenhead uni-image[data-v-7a0718d8]{width:%?50?%}.content .cenhead uni-image.center[data-v-7a0718d8]{width:%?180?%;margin:0 %?20?%}.content .cenhead .more[data-v-7a0718d8]{color:#888}.content .cenhead .more uni-image[data-v-7a0718d8]{width:%?20?%;height:%?15?%}.content .classify[data-v-7a0718d8]{margin-bottom:%?30?%}.content .classify .scroll[data-v-7a0718d8]{padding-left:%?30?%}.content .classify .item[data-v-7a0718d8]{min-width:%?100?%;flex:none;padding:0 %?20?%;text-align:center;background-color:#fff;line-height:1.8;font-size:%?28?%;margin-right:%?20?%;border-radius:%?10?%}.content .classify .item.active[data-v-7a0718d8]{background-color:#ff5648;color:#fff}.content .searchType[data-v-7a0718d8]{padding:0 %?30?%}.content .searchType .item[data-v-7a0718d8]{display:flex;align-items:center;color:#888;font-size:%?28?%}.content .searchType .item uni-image[data-v-7a0718d8]{width:%?10?%;margin-left:%?10?%}.content .searchType .item.back uni-image[data-v-7a0718d8]{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.content .searchType .item .uni-input[data-v-7a0718d8]{color:#888;font-size:%?28?%}.content .searchType .item.active[data-v-7a0718d8]{color:#202020;border-bottom:%?3?% solid #ffd200;font-weight:700}.content .searchType .item.active .uni-input[data-v-7a0718d8]{color:#202020;font-weight:700}.content .list[data-v-7a0718d8]{margin-top:%?30?%}',""]),t.exports=e},f4a4:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"list"},t._l(t.list,(function(e,a){return i("v-uni-view",{key:a,staticClass:"item flexd"},[i("v-uni-view",{staticClass:"image flexd circle",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.$jump("/pages/order/orderDetail?id="+e.id)}}},[i("v-uni-image",{attrs:{src:t.Img(e.image),mode:""}})],1),i("v-uni-view",{staticClass:"message"},[i("v-uni-view",{staticClass:"flexd jubetween flex-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.$jump("/pages/order/orderDetail?id="+e.id)}}},[i("v-uni-view",{staticClass:"flexd"},[i("v-uni-view",{staticClass:"nickname"},[t._v(t._s(e.publisher_name))]),i("v-uni-view",{staticClass:"title"},[t._v(t._s(e.category_name))])],1),i("v-uni-view",{staticClass:"time"},[t._v(t._s(e.createtime))])],1),i("v-uni-view",{staticClass:"mgb flexd jubetween flex-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.$jump("/pages/order/orderDetail?id="+e.id)}}},[i("v-uni-view",{staticClass:"price"},[t._v("￥"),i("v-uni-text",[t._v(t._s(e.commission))])],1),i("v-uni-view",{staticClass:"range"},[i("v-uni-image",{attrs:{src:"/static/image/icon_dw.png",mode:""}}),t._v(t._s(e.distance))],1)],1),i("v-uni-view",{staticClass:"mgb flexd jubetween"},[i("v-uni-view",{staticClass:"text"},[t._v(t._s(e.requirement_introduction))]),i("v-uni-view",{staticClass:"flexd juend"},[1!=e.hideBtn?i("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.jiedan(e.id)}}},[t._v("接单")]):t._e(),i("v-uni-view",{staticClass:"btn flexd flex-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.talkto(e.user_id,e.publisher_name)}}},[i("v-uni-image",{attrs:{src:"/static/image/icon_lt.png",mode:"widthFix"}})],1)],1)],1)],1)],1)})),1)},s=[]},f937:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"homeBg"},[i("v-uni-image",{attrs:{src:"/static/image/bj.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"header ",style:{paddingTop:t.htosp+"px"}},[i("v-uni-view",{staticClass:"flexd jubetween",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$jump("/pages/index/changeVillage")}}},[i("v-uni-view",{staticClass:"city flexd flex-center"},[i("v-uni-image",{attrs:{src:"/static/image/icon_dw.png",mode:""}}),t._v(t._s(t.village.residential_quarter_name)),i("v-uni-image",{attrs:{src:"/static/image/icon_gd.png",mode:""}})],1)],1),i("v-uni-view",{staticClass:"operation flexd jucenter flex-center"},[i("v-uni-view",{staticClass:"searchBox flexd jucenter flex-center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$jump("/pages/index/search")}}},[i("v-uni-view",{staticClass:"btn flexd flex-center"},[i("v-uni-image",{attrs:{src:"/static/image/icon_ss.png",mode:""}}),t._v("搜索")],1)],1)],1)],1),i("v-uni-view",{staticClass:"menu flexd"},t._l(t.menuList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.$jump(e.path)}}},[i("v-uni-view",{staticClass:"image"},[i("v-uni-image",{attrs:{src:e.img,mode:""}}),e.tag?i("v-uni-image",{staticClass:"tag",attrs:{src:e.tag,mode:"widthFix"}}):t._e()],1),i("v-uni-view",{staticClass:"title"},[t._v(t._s(e.title))])],1)})),1),i("v-uni-view",{staticClass:"cenhead flexd jucenter flex-center"},[i("v-uni-image",{attrs:{src:"/static/image/zuo.png",mode:"widthFix"}}),i("v-uni-image",{staticClass:"center",attrs:{src:"/static/image/zll.png",mode:"widthFix"}}),i("v-uni-image",{attrs:{src:"/static/image/you.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"searchType flexd jubetween"},[i("v-uni-view",{staticClass:"item active"},[t._v("全部")]),i("v-uni-view",{staticClass:"item"},[i("v-uni-picker",{staticClass:"picker",attrs:{value:t.classfyIndex,range:t.classfy,"range-key":"category_name"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.bindPickerChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.classfy[t.classfyIndex].category_name||"需求类别"))])],1),i("v-uni-image",{attrs:{src:"/static/image/icon_xw.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"item",class:{back:t.commissionSort},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.commissionSort=1^t.commissionSort,t.getNewList()}}},[t._v("佣金"),i("v-uni-image",{attrs:{src:"/static/image/icon_xw.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"item"},[i("v-uni-picker",{staticClass:"picker",attrs:{value:t.rangeIndex,range:t.range,"range-key":"name"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.bindPickerChange2.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.range[t.rangeIndex].name))])],1),i("v-uni-image",{attrs:{src:"/static/image/icon_xw.png",mode:"widthFix"}})],1)],1),i("v-uni-view",{staticClass:"list"},[i("list",{attrs:{list:t.shopList},on:{refresh:function(e){arguments[0]=e=t.$handleEvent(e),t.getNewList()}}})],1)],1)},s=[]},fcf2:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.list .item[data-v-b05d757e]{margin-bottom:%?10?%;background-color:#fff;padding:%?30?%}.list .item .image[data-v-b05d757e]{width:%?80?%;overflow:hidden;position:relative}.list .item .image uni-image[data-v-b05d757e]{border-radius:50%;width:%?80?%;height:%?80?%}.list .item .image .renzhen[data-v-b05d757e]{width:%?80?%;height:%?40?%;position:absolute;right:0;top:0}.list .item .message[data-v-b05d757e]{width:%?580?%;margin-left:%?20?%}.list .item .message .title[data-v-b05d757e]{font-size:%?30?%;position:relative;font-weight:700;width:-webkit-fit-content;width:fit-content;margin-bottom:%?10?%}.list .item .message .price[data-v-b05d757e]{color:#ff3336}.list .item .message .price uni-text[data-v-b05d757e]{font-size:%?32?%;font-weight:700}.list .item .message .nickname[data-v-b05d757e]{font-size:%?28?%;margin-right:%?20?%}.list .item .message .time[data-v-b05d757e]{color:#888}.list .item .message .range[data-v-b05d757e]{color:#888}.list .item .message .range uni-image[data-v-b05d757e]{width:%?20?%;height:%?20?%;margin-right:%?6?%}.list .item .message .mgb[data-v-b05d757e]{margin-bottom:%?20?%}.list .item .message .text[data-v-b05d757e]{color:#888;max-width:%?400?%}.list .item .message .voucher .piece[data-v-b05d757e]{background-image:url(/static/image/djq.png);line-height:2;padding:0 %?20?%;color:#ff5648;background-repeat:no-repeat;background-size:100% 100%;margin-right:%?10?%}.list .item .message .jineng .piece[data-v-b05d757e]{padding:0 %?10?%;color:#ff5648;border:%?2?% solid #ff5648;background-color:rgba(255,86,72,.08);margin-right:%?20?%;width:-webkit-fit-content;width:fit-content;flex-wrap:wrap;line-height:1.5}.list .item .message .btn[data-v-b05d757e]{line-height:1.5;font-size:%?28?%;padding:%?10?%;margin-left:%?20?%;background-color:#ffd200;border-radius:%?30?%;width:%?90?%;text-align:center}.list .item .message .btn uni-image[data-v-b05d757e]{width:%?34?%;margin:0 auto}',""]),t.exports=e}}]);