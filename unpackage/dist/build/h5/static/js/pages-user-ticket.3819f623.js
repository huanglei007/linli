(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-ticket"],{4685:function(t,e,i){var a=i("ce7d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("10998466",a,!0,{sourceMap:!1,shadowMode:!1})},a89c:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"toptype flexd jubetween ",style:{paddingTop:t.htosp+"px"}},[i("v-uni-image",{staticClass:"backs",attrs:{src:"/static/image/icon_gb.png",mode:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$jumpback()}}}),i("v-uni-view",{staticClass:"typeBox flexd jucenter"},t._l(t.typeList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"item",class:t.typeIndex==a?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.typeIndex=a,t.getNewList()}}},[t._v(t._s(e))])})),1),i("v-uni-view")],1),i("v-uni-view",{staticClass:"statusBox flexd flex-center",style:{paddingTop:t.htosp+50+"px"}},t._l(t.statusList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"item",class:t.statusIndex==a?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.statusIndex=a,t.getNewList()}}},[t._v(t._s(e)),i("v-uni-image",{staticClass:"icon",attrs:{src:"/static/image/icon_xzr.png",mode:"widthFix"}})],1)})),1),i("v-uni-view",{staticClass:"list"},t._l(t.list,(function(e,a){return i("v-uni-view",{key:a,staticClass:"item",class:{lived:1==t.statusIndex,out:2==t.statusIndex}},[i("v-uni-view",{staticClass:"flexd jubetween flex-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.jumpto(e.type,e.infoid)}}},[i("v-uni-view",{staticClass:"name"},[t._v(t._s(e.shop))]),i("v-uni-image",{staticClass:"more",attrs:{src:"/static/image/icon_gd.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"ticket flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"left"},[t._v("￥"),i("v-uni-text",[t._v(t._s(e.amount))])],1),i("v-uni-view",{staticClass:"center"},[i("v-uni-view",{staticClass:"title"},[t._v(t._s(e.rule))]),i("v-uni-view",{staticClass:"time"},[t._v(t._s(e.time))])],1),i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toDetail(e.type,e.infoid,e.id)}}},[t._v("去领取")]),i("v-uni-image",{staticClass:"used",attrs:{src:"/static/image/icon_ysy.png",mode:"widthFix"}}),i("v-uni-image",{staticClass:"timeout",attrs:{src:"/static/image/icon_ygq.png",mode:"widthFix"}})],1)],1)],1)})),1)],1)},n=[]},b7d1:function(t,e,i){"use strict";i.r(e);var a=i("e63d"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=s.a},ce7d:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.toptype[data-v-92075e1e]{border-bottom:%?1?% solid #ececec}.typeBox .item[data-v-92075e1e]{color:#989898;border:%?1?% solid #e5e5e5;font-size:%?30?%;text-align:center;width:%?150?%;line-height:2}.typeBox .item.active[data-v-92075e1e]{color:#212121;background-color:#ffd200;border-color:#ffd200}.statusBox[data-v-92075e1e]{padding-top:%?1?% solid #f5f5f5;background-color:#fff;padding:%?10?% 0}.statusBox .item[data-v-92075e1e]{line-height:%?100?%;position:relative;font-size:%?28?%;color:#989898;text-align:center;width:33.3%}.statusBox .item .icon[data-v-92075e1e]{position:absolute;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:%?30?%;opacity:0}.statusBox .item.active[data-v-92075e1e]{font-size:%?32?%;color:#212121;font-weight:700}.statusBox .item.active .icon[data-v-92075e1e]{opacity:1}.list[data-v-92075e1e]{margin:%?20?%}.list .item[data-v-92075e1e]{background-color:#fff;padding:%?10?% %?20?%;border-radius:%?10?%;margin-bottom:%?10?%}.list .item .name[data-v-92075e1e]{margin-bottom:%?10?%}.list .item .more[data-v-92075e1e]{width:%?30?%;margin-bottom:%?10?%}.list .item .ticket[data-v-92075e1e]{background-color:rgba(255,88,30,.1);padding:%?30?% %?20?%;border-radius:%?10?%;margin-bottom:%?10?%}.list .item .ticket .left[data-v-92075e1e]{color:#ff581e}.list .item .ticket .left uni-text[data-v-92075e1e]{font-size:%?46?%;font-weight:700}.list .item .ticket .center[data-v-92075e1e]{padding-right:%?30?%;border-right:%?1?% solid #ff581e}.list .item .ticket .center .title[data-v-92075e1e]{color:#ff581e;font-size:%?30?%}.list .item .ticket .center .time[data-v-92075e1e]{color:#ff581e}.list .item .ticket .right[data-v-92075e1e]{text-align:center}.list .item .ticket .right .btn[data-v-92075e1e]{background-color:#ff581e;color:#fff;line-height:2;padding:0 %?30?%;border-radius:%?30?%;margin-bottom:%?10?%}.list .item .ticket .right .sub[data-v-92075e1e]{color:#ff581e}.list .item .ticket .right uni-image[data-v-92075e1e]{width:%?90?%;display:none}.list .item.lived .ticket[data-v-92075e1e], .list .item.out .ticket[data-v-92075e1e]{background-color:#ebebeb}.list .item.lived .left[data-v-92075e1e], .list .item.out .left[data-v-92075e1e]{color:#aaa}.list .item.lived .center[data-v-92075e1e], .list .item.out .center[data-v-92075e1e]{border-right:%?1?% solid #aaa}.list .item.lived .center .title[data-v-92075e1e], .list .item.out .center .title[data-v-92075e1e]{color:#aaa}.list .item.lived .center .time[data-v-92075e1e], .list .item.out .center .time[data-v-92075e1e]{color:#aaa}.list .item.lived .right .btn[data-v-92075e1e], .list .item.out .right .btn[data-v-92075e1e]{display:none}.list .item.lived .right .used[data-v-92075e1e]{display:block}.list .item.out .right .timeout[data-v-92075e1e]{display:block}',""]),t.exports=e},e63d:function(t,e,i){"use strict";i("99af"),i("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{htosp:0,typeList:["代金券","优惠券"],typeIndex:0,statusList:["待使用","已使用","已过期"],statusIndex:0,list:[]}},onLoad:function(){this.htosp=uni.getStorageSync("htop"),this.userId=uni.getStorageSync("userId"),this.getNewList()},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},methods:{getlist:function(){var t=this;this.typeIndex?this.util.ajax("userWelfare/couponList",{userId:this.userId,pageSize:20,status:this.statusIndex,curPage:1},(function(e){t.curPage!==e.data.page.curPage&&(t.isfoot=!0),t.curPage==e.data.page.curPage&&(t.list=t.list.concat(e.data.list.map((function(e){return{amount:e.amount,time:t.$shijiandate(e.begin_time)+" - "+t.$shijiandate(e.expiration_time),rule:e.coupon_name,shop:e.shop_name,infoid:e.info_id,type:e.type,id:e.id}}))))})):this.util.ajax("userWelfare/voucherList",{userId:this.userId,pageSize:20,status:this.statusIndex,curPage:1},(function(e){t.curPage!==e.data.page.curPage&&(t.isfoot=!0),t.curPage==e.data.page.curPage&&(t.list=t.list.concat(e.data.list.map((function(e){return{amount:e.original_price,time:t.$shijiandate(e.begin_time)+" - "+t.$shijiandate(e.expiration_time),rule:e.voucher_name+" 实付"+e.real_pay_amount+"元",shop:e.shop_name,infoid:e.info_id,type:e.type,id:e.id}}))))}))},getNewList:function(){this.list=[],this.curPage=1,this.isfoot=!1,this.getlist()},jumpto:function(t,e){1==t?this.$jump("/pages/index/shopDetail?id="+e):this.$jump("/pages/index/darenDetail?id="+e)},toDetail:function(t,e,i){0==this.typeIndex&&0==this.statusIndex?this.$jump("/pages/index/tickitDetail?id="+i):this.jumpto(t,e)}}};e.default=a},f208:function(t,e,i){"use strict";var a=i("4685"),s=i.n(a);s.a},f2e3:function(t,e,i){"use strict";i.r(e);var a=i("a89c"),s=i("b7d1");for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);i("f208");var o,r=i("f0c5"),c=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"92075e1e",null,!1,a["a"],o);e["default"]=c.exports}}]);