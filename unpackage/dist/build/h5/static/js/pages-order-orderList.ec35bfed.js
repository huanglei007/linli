(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-orderList"],{"0e72":function(e,t,i){"use strict";var a=i("4ea4");i("99af"),i("d81d"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("27a3")),s={components:{list:n.default},data:function(){return{classfy:["需求分类","需求分类1","需求分类2"],classfyIndex:0,range:[{name:"距离",value:0}],rangeIndex:0,shopList:[],curPage:1,commissionSort:0,isfoot:!1,classfyId:0,classTitle:"",searchParam:""}},onLoad:function(e){this.classTitle=e.title,this.classfyId=e.id;var t=this;uni.setNavigationBarTitle({title:t.classTitle}),this.util.ajax("release/distanceConfigList",{},(function(e){t.range=t.range.concat(e.data.list)})),this.getlist()},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},methods:{bindPickerChange2:function(e){this.rangeIndex=e.target.value,this.getNewList()},getlist:function(){var e=this;this.util.ajax("release/releaseList",{categoryId:this.classfyId,distanceValue:this.range[this.rangeIndex].value,commissionSort:this.commissionSort+1,curPage:this.curPage,searchParam:this.searchParam,pageSize:20,userId:this.userId},(function(t){e.curPage!==t.data.page.curPage&&(e.isfoot=!0),e.curPage==t.data.page.curPage&&(e.shopList=e.shopList.concat(t.data.list.map((function(t){return{category_name:t.category_name,commission:t.commission,createtime:e.$shijian(t.createtime),distance:t.distance,id:t.id,image:t.image,publisher_name:t.publisher_name,requirement_introduction:"需求简介："+t.requirement_introduction,user_id:t.user_id,user_name:t.publisher_name}}))))}))},getNewList:function(){this.shopList=[],this.curPage=1,this.getlist()}}};t.default=s},2399:function(e,t,i){"use strict";i.r(t);var a=i("33ba"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},"27a3":function(e,t,i){"use strict";i.r(t);var a=i("f4a4"),n=i("2399");for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("a1cd");var r,d=i("f0c5"),o=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,"b05d757e",null,!1,a["a"],r);t["default"]=o.exports},"33ba":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"menuList",data:function(){return{userId:""}},props:{list:{default:[],type:Array}},mounted:function(){this.userId=uni.getStorageSync("userId")},methods:{talkto:function(e,t){e&&t&&(e!=this.userId?this.$jump("/pages/chat/HM-chat?idse="+e+"&tita="+t):this.$alert("无法和自己聊天"))},jiedan:function(e){var t=this;this.util.ajax("myOrder/saveOrder",{releaseRequirementId:e,userId:this.userId},(function(e){t.$alert("接单成功"),t.refresh()}))},refresh:function(){this.$emit("refresh")}}};t.default=a},"3f77":function(e,t,i){var a=i("fcf2");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("10c34158",a,!0,{sourceMap:!1,shadowMode:!1})},"42be":function(e,t,i){"use strict";i.r(t);var a=i("0e72"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},"7f72":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-d7613ec8]{background-color:#f5f5f5}.operation[data-v-d7613ec8]{padding:%?20?% %?30?%;background-color:#fff;margin-bottom:%?30?%}.operation .backs[data-v-d7613ec8]{width:%?35?%}.operation .backs uni-image[data-v-d7613ec8]{width:100%}.operation .searchBox[data-v-d7613ec8]{background-color:#f5f5f5;border-radius:%?30?%;line-height:2;padding:%?10?% %?20?%;width:%?480?%}.operation .searchBox uni-image[data-v-d7613ec8]{width:%?30?%;height:%?30?%;margin:0 %?20?%}.operation .searchBox uni-input[data-v-d7613ec8]{width:%?400?%}.operation .btn[data-v-d7613ec8]{width:%?130?%;text-align:center;background-color:#ff5648;color:#fff;border-radius:%?30?%;font-size:%?30?%;line-height:2;margin-left:%?20?%}.operation .add-btn[data-v-d7613ec8]{width:%?50?%}.operation .add-btn uni-image[data-v-d7613ec8]{width:%?40?%;height:%?40?%}.searchType[data-v-d7613ec8]{padding:0 %?30?%}.searchType .item[data-v-d7613ec8]{display:flex;align-items:center;color:#888}.searchType .item.back uni-image[data-v-d7613ec8]{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.searchType .item uni-image[data-v-d7613ec8]{width:%?10?%;margin-left:%?10?%}.searchType .item .uni-input[data-v-d7613ec8]{color:#888}.searchType .item.active[data-v-d7613ec8]{color:#ffd200}.searchType .item.active .uni-input[data-v-d7613ec8]{color:#ffd200}.list[data-v-d7613ec8]{margin-top:%?30?%}.list .item[data-v-d7613ec8]{margin-bottom:%?10?%;background-color:#fff;padding:%?30?%}.list .item .image[data-v-d7613ec8]{width:%?150?%;overflow:hidden;position:relative}.list .item .image uni-image[data-v-d7613ec8]{width:%?150?%;height:%?150?%}.list .item .image .renzhen[data-v-d7613ec8]{width:%?60?%;height:%?30?%;position:absolute;right:0;top:0}.list .item .message[data-v-d7613ec8]{width:%?500?%;margin-left:%?20?%}.list .item .message .title[data-v-d7613ec8]{font-size:%?32?%;position:relative;width:-webkit-fit-content;width:fit-content;margin-bottom:%?10?%}.list .item .message .title .tage[data-v-d7613ec8]{position:absolute;left:110%;bottom:0;line-height:1.3;color:#ff7827;border:%?1?% solid #ff7827;border-radius:%?10?%;background-color:rgba(255,120,39,.08);width:-webkit-fit-content;width:fit-content;padding:0 %?14?%}.list .item .message .star uni-image[data-v-d7613ec8]{width:%?28?%;height:%?28?%;margin-right:%?6?%}.list .item .message .nickname[data-v-d7613ec8]{color:#888}.list .item .message .price[data-v-d7613ec8]{color:#888}.list .item .message .range[data-v-d7613ec8]{color:#888}.list .item .message .range uni-image[data-v-d7613ec8]{width:%?20?%;height:%?20?%;margin-right:%?6?%}.list .item .message .mgb[data-v-d7613ec8]{margin-bottom:%?10?%}.list .item .message .text[data-v-d7613ec8]{color:#888;max-width:%?400?%}.list .item .message .voucher .piece[data-v-d7613ec8]{line-height:1.8;padding:0 %?20?%;color:#ff5648;background-color:#ffebea;border:%?2?% solid #ff5648;margin-right:%?10?%;border-radius:%?10?%}.list .item .message .taketo uni-image[data-v-d7613ec8]{width:%?32?%;height:%?32?%}.list .item .message .jineng .piece[data-v-d7613ec8]{padding:0 %?10?%;color:#ff5648;border:%?2?% solid #ff5648;background-color:rgba(255,86,72,.08);margin-right:%?20?%;width:-webkit-fit-content;width:fit-content;flex-wrap:wrap;line-height:1.5}.list .item .message .btn[data-v-d7613ec8]{line-height:2;font-size:%?28?%;padding:0 %?40?%;margin-left:%?20?%;border:%?2?% solid #aaa;border-radius:%?30?%}body.?%PAGE?%[data-v-d7613ec8]{background-color:#f5f5f5}',""]),e.exports=t},"8a24":function(e,t,i){"use strict";i.r(t);var a=i("f15b"),n=i("42be");for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("cd9a");var r,d=i("f0c5"),o=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,"d7613ec8",null,!1,a["a"],r);t["default"]=o.exports},"8cf8":function(e,t,i){var a=i("7f72");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("01fa8a70",a,!0,{sourceMap:!1,shadowMode:!1})},a1cd:function(e,t,i){"use strict";var a=i("3f77"),n=i.n(a);n.a},cd9a:function(e,t,i){"use strict";var a=i("8cf8"),n=i.n(a);n.a},f15b:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"operation flexd jucenter flex-center"},[i("v-uni-view",{staticClass:"flexd jubetween flex-center"},[i("v-uni-view",{staticClass:"searchBox flexd jucenter flex-center"},[i("v-uni-image",{attrs:{src:"/static/image/icon_ss.png",mode:""}}),i("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"请输入搜索内容","placeholder-style":"font-size:24rpx;color:#888"},model:{value:e.searchParam,callback:function(t){e.searchParam=t},expression:"searchParam"}})],1),i("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getNewList()}}},[e._v("搜索")])],1)],1),i("v-uni-view",{staticClass:"searchType flexd jubetween"},[i("v-uni-view",{staticClass:"item active"},[e._v("全部")]),i("v-uni-view",{staticClass:"item",class:{back:e.commissionSort},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.commissionSort=1^e.commissionSort,e.getNewList()}}},[e._v("佣金"),i("v-uni-image",{attrs:{src:"/static/image/icon_xw.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"item"},[i("v-uni-picker",{staticClass:"picker",attrs:{value:e.rangeIndex,range:e.range,"range-key":"name"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindPickerChange2.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.range[e.rangeIndex].name))])],1),i("v-uni-image",{attrs:{src:"/static/image/icon_xw.png",mode:"widthFix"}})],1)],1),i("v-uni-view",{staticClass:"list"},[i("list",{attrs:{list:e.shopList}})],1)],1)},s=[]},f4a4:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"list"},e._l(e.list,(function(t,a){return i("v-uni-view",{key:a,staticClass:"item flexd"},[i("v-uni-view",{staticClass:"image flexd circle",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.$jump("/pages/order/orderDetail?id="+t.id)}}},[i("v-uni-image",{attrs:{src:e.Img(t.image),mode:""}})],1),i("v-uni-view",{staticClass:"message"},[i("v-uni-view",{staticClass:"flexd jubetween flex-center",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.$jump("/pages/order/orderDetail?id="+t.id)}}},[i("v-uni-view",{staticClass:"flexd"},[i("v-uni-view",{staticClass:"nickname"},[e._v(e._s(t.publisher_name))]),i("v-uni-view",{staticClass:"title"},[e._v(e._s(t.category_name))])],1),i("v-uni-view",{staticClass:"time"},[e._v(e._s(t.createtime))])],1),i("v-uni-view",{staticClass:"mgb flexd jubetween flex-center",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.$jump("/pages/order/orderDetail?id="+t.id)}}},[i("v-uni-view",{staticClass:"price"},[e._v("￥"),i("v-uni-text",[e._v(e._s(t.commission))])],1),i("v-uni-view",{staticClass:"range"},[i("v-uni-image",{attrs:{src:"/static/image/icon_dw.png",mode:""}}),e._v(e._s(t.distance))],1)],1),i("v-uni-view",{staticClass:"mgb flexd jubetween"},[i("v-uni-view",{staticClass:"text"},[e._v(e._s(t.requirement_introduction))]),i("v-uni-view",{staticClass:"flexd juend"},[1!=t.hideBtn?i("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.jiedan(t.id)}}},[e._v("接单")]):e._e(),i("v-uni-view",{staticClass:"btn flexd flex-center",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.talkto(t.user_id,t.publisher_name)}}},[i("v-uni-image",{attrs:{src:"/static/image/icon_lt.png",mode:"widthFix"}})],1)],1)],1)],1)],1)})),1)},s=[]},fcf2:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.list .item[data-v-b05d757e]{margin-bottom:%?10?%;background-color:#fff;padding:%?30?%}.list .item .image[data-v-b05d757e]{width:%?80?%;overflow:hidden;position:relative}.list .item .image uni-image[data-v-b05d757e]{border-radius:50%;width:%?80?%;height:%?80?%}.list .item .image .renzhen[data-v-b05d757e]{width:%?80?%;height:%?40?%;position:absolute;right:0;top:0}.list .item .message[data-v-b05d757e]{width:%?580?%;margin-left:%?20?%}.list .item .message .title[data-v-b05d757e]{font-size:%?30?%;position:relative;font-weight:700;width:-webkit-fit-content;width:fit-content;margin-bottom:%?10?%}.list .item .message .price[data-v-b05d757e]{color:#ff3336}.list .item .message .price uni-text[data-v-b05d757e]{font-size:%?32?%;font-weight:700}.list .item .message .nickname[data-v-b05d757e]{font-size:%?28?%;margin-right:%?20?%}.list .item .message .time[data-v-b05d757e]{color:#888}.list .item .message .range[data-v-b05d757e]{color:#888}.list .item .message .range uni-image[data-v-b05d757e]{width:%?20?%;height:%?20?%;margin-right:%?6?%}.list .item .message .mgb[data-v-b05d757e]{margin-bottom:%?20?%}.list .item .message .text[data-v-b05d757e]{color:#888;max-width:%?400?%}.list .item .message .voucher .piece[data-v-b05d757e]{background-image:url(/static/image/djq.png);line-height:2;padding:0 %?20?%;color:#ff5648;background-repeat:no-repeat;background-size:100% 100%;margin-right:%?10?%}.list .item .message .jineng .piece[data-v-b05d757e]{padding:0 %?10?%;color:#ff5648;border:%?2?% solid #ff5648;background-color:rgba(255,86,72,.08);margin-right:%?20?%;width:-webkit-fit-content;width:fit-content;flex-wrap:wrap;line-height:1.5}.list .item .message .btn[data-v-b05d757e]{line-height:1.5;font-size:%?28?%;padding:%?10?%;margin-left:%?20?%;background-color:#ffd200;border-radius:%?30?%;width:%?90?%;text-align:center}.list .item .message .btn uni-image[data-v-b05d757e]{width:%?34?%;margin:0 auto}',""]),e.exports=t}}]);