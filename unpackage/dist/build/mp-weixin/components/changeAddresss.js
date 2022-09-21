(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/changeAddresss"],{"0e9b":function(t,n,e){"use strict";e.r(n);var u=e("7c1d"),a=e("50cd");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("4e6a");var c,s=e("f0c5"),r=Object(s["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=r.exports},"4e6a":function(t,n,e){"use strict";var u=e("a23a"),a=e.n(u);a.a},"50cd":function(t,n,e){"use strict";e.r(n);var u=e("a26b"),a=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=a.a},"7c1d":function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return u}));var a=function(){var t=this,n=t.$createElement;t._self._c},i=[]},a23a:function(t,n,e){},a26b:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"changeAddresss",data:function(){return{list:[],userId:""}},mounted:function(){this.userId=t.getStorageSync("userId"),this.getList()},methods:{getList:function(){var t=this;t.util.ajax("address/myAddress",{userId:t.userId},(function(n){t.list=n.data.list}))},urlChange:function(n){var e=this;t.navigateTo({url:n,events:{acceptDataFromOpenedPage:function(t){setTimeout((function(){e.getList()}),500)}}})},cancel:function(){this.$emit("cancel")},refresh:function(){this.getList()},sumbit:function(t){this.$emit("comfit",t)}}};n.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/changeAddresss-create-component',
    {
        'components/changeAddresss-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0e9b"))
        })
    },
    [['components/changeAddresss-create-component']]
]);
