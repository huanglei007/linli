(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/myOrder/order"],{"212db":function(t,e,a){"use strict";var r;a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return r}));var s=function(){var t=this,e=t.$createElement,a=(t._self._c,t.__map(t.list,(function(e,a){var r=t.__get_orig(e),s=t.$shijian(e.createtime);return{$orig:r,m0:s}})));t._isMounted||(t.e0=function(e,a){var r=arguments[arguments.length-1].currentTarget.dataset,s=r.eventParams||r["event-params"];a=s.i;t.typeIndex=a,t.getNewList()},t.e1=function(e,a){var r=arguments[arguments.length-1].currentTarget.dataset,s=r.eventParams||r["event-params"];a=s.i;t.statusIndex=a,t.getNewList()}),t.$mp.data=Object.assign({},{$root:{l0:a}})},n=[]},"239a":function(t,e,a){"use strict";a.r(e);var r=a("212db"),s=a("835f");for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);a("debe");var i,u=a("f0c5"),d=Object(u["a"])(s["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=d.exports},"835f":function(t,e,a){"use strict";a.r(e);var r=a("94bf"),s=a.n(r);for(var n in r)"default"!==n&&function(t){a.d(e,t,(function(){return r[t]}))}(n);e["default"]=s.a},"92d9":function(t,e,a){},"94bf":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{userId:"",typeList:["我的订单","客户订单"],typeIndex:0,list:[],curPage:1,isfoot:!1,status:[{id:0,label:"全部"},{id:2,label:"待配送"},{id:3,label:"配送中"},{id:4,label:"已完成"}],statusIndex:0}},mounted:function(e){this.userId=t.getStorageSync("userId"),this.getlist()},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},methods:{getlist:function(){var t=this,e=this;this.util.ajax("order/myOrders",{curPage:this.curPage,orderType:this.typeIndex,pageSize:20,userId:this.userId},(function(a){if(e.curPage!==a.data.page.curPage)e.isfoot=!0,e.list=e.list.concat(a.data.orders);else if(0==e.status[e.statusIndex].id)e.list=a.data.orders;else{for(var r=[],s=0;s<a.data.orders.length;s++)a.data.orders[s].order_status==e.status[e.statusIndex].id&&r.push(a.data.orders[s]);setTimeout((function(){t.list=r}),500)}}))},getNewList:function(){var t=this;t.list=[],t.curPage=1,t.getlist()}}};e.default=a}).call(this,a("543d")["default"])},debe:function(t,e,a){"use strict";var r=a("92d9"),s=a.n(r);s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/user/myOrder/order-create-component',
    {
        'pages/user/myOrder/order-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("239a"))
        })
    },
    [['pages/user/myOrder/order-create-component']]
]);
