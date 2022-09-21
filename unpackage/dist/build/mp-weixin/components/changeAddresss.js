(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/changeAddresss"],{"063c":function(t,n,e){"use strict";var u=e("5774"),i=e.n(u);i.a},"0f15":function(t,n,e){"use strict";e.r(n);var u=e("c6d3"),i=e("db6b");for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);e("063c");var s,a=e("f0c5"),r=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],s);n["default"]=r.exports},5774:function(t,n,e){},b8ef:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"changeAddresss",data:function(){return{list:[],userId:""}},mounted:function(){this.userId=t.getStorageSync("userId"),this.getList()},methods:{getList:function(){var t=this;t.util.ajax("address/myAddress",{userId:t.userId},(function(n){t.list=n.data.list}))},urlChange:function(n){var e=this;t.navigateTo({url:n,events:{acceptDataFromOpenedPage:function(t){setTimeout((function(){e.getList()}),500)}}})},cancel:function(){this.$emit("cancel")},refresh:function(){this.getList()},sumbit:function(t){this.$emit("comfit",t)}}};n.default=e}).call(this,e("543d")["default"])},c6d3:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return u}));var i=function(){var t=this,n=t.$createElement;t._self._c},c=[]},db6b:function(t,n,e){"use strict";e.r(n);var u=e("b8ef"),i=e.n(u);for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/changeAddresss-create-component',
    {
        'components/changeAddresss-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0f15"))
        })
    },
    [['components/changeAddresss-create-component']]
]);
