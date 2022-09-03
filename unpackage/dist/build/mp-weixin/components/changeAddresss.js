(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/changeAddresss"],{"063c":function(t,n,e){"use strict";var u=e("5774"),i=e.n(u);i.a},"0f15":function(t,n,e){"use strict";e.r(n);var u=e("7399"),i=e("db6b");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("063c");var c,s=e("f0c5"),r=Object(s["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=r.exports},5774:function(t,n,e){},7399:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},b8ef:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"changeAddresss",data:function(){return{list:[],userId:""}},mounted:function(){this.userId=t.getStorageSync("userId"),this.getList()},methods:{getList:function(){var t=this;t.util.ajax("address/myAddress",{userId:t.userId},(function(n){console.log(n.data),t.list=n.data.list}))},urlChange:function(n){var e=this;t.navigateTo({url:n,events:{acceptDataFromOpenedPage:function(t){setTimeout((function(){e.getList()}),500)}}})},cancel:function(){this.$emit("cancel")},refresh:function(){this.getList()},sumbit:function(t){this.$emit("comfit",t)}}};n.default=e}).call(this,e("543d")["default"])},db6b:function(t,n,e){"use strict";e.r(n);var u=e("b8ef"),i=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/changeAddresss-create-component',
    {
        'components/changeAddresss-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0f15"))
        })
    },
    [['components/changeAddresss-create-component']]
]);
