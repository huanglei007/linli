(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/a_orderDetail_cancel"],{1973:function(e,t,a){},"56d8":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return u})),a.d(t,"a",(function(){return n}));var r=function(){var e=this,t=e.$createElement;e._self._c},u=[]},7326:function(e,t,a){"use strict";var n=a("1973"),r=a.n(n);r.a},"88c6":function(e,t,a){"use strict";a.r(t);var n=a("9cbf"),r=a.n(n);for(var u in n)"default"!==u&&function(e){a.d(t,e,(function(){return n[e]}))}(u);t["default"]=r.a},"93c4":function(e,t,a){"use strict";(function(e){a("56c5"),a("33db");n(a("66fd"));var t=n(a("eee6"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=a,e(t.default)}).call(this,a("543d")["createPage"])},"9cbf":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{userId:"",type:0,orderId:"",price:"",current:0,reasonlist:[],onoff:!0}},onLoad:function(t){this.userId=e.getStorageSync("userId"),this.orderId=t.id,this.type=t.type+1,this.price=t.price,this.setDefaultCancel()},methods:{cancellist:function(){var e=this;e.util.ajax("order/cancelReasons",{type:e.type},(function(t){t.data&&(e.reasonlist=t.data)}))},submit:function(){var e=this;e.util.ajax("order/cancelOrder",{orderId:e.orderId,reason:e.reasonlist[e.current].label,userId:e.userId},(function(t){e.$alert("已取消订单"),setTimeout((function(){e.$jump("/pages/user/orderDetail?id="+e.orderId)}),1e3)}))},radioChange:function(e){for(var t=this,a=0;a<t.reasonlist.length;a++)if(t.reasonlist[a].value===e.detail.value){t.current=a;break}},setDefaultCancel:function(){var e=this;1==e.type?e.reasonlist=[{id:1,value:"1",label:"不想要了/临时有事"},{id:2,value:"2",label:"点错了/点多了/点少了"},{id:3,value:"3",label:"地址/电话填错了"},{id:4,value:"4",label:"忘记写备注"},{id:5,value:"5",label:"其他原因"}]:e.reasonlist=[{id:1,value:"1",label:"商品已售完"},{id:2,value:"2",label:"联系不上用户"},{id:3,value:"3",label:"地址无法配送"},{id:4,value:"4",label:"店铺已打烊"}]}}};t.default=a}).call(this,a("543d")["default"])},eee6:function(e,t,a){"use strict";a.r(t);var n=a("56d8"),r=a("88c6");for(var u in r)"default"!==u&&function(e){a.d(t,e,(function(){return r[e]}))}(u);a("7326");var l,i=a("f0c5"),c=Object(i["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],l);t["default"]=c.exports}},[["93c4","common/runtime","common/vendor"]]]);