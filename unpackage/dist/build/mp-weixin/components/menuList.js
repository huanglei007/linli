(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/menuList"],{"2b87":function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,r=(t._self._c,t.__map(t.list,(function(e,r){var n=t.__get_orig(e),i=t.Img(e.image);return{$orig:n,m0:i}})));t.$mp.data=Object.assign({},{$root:{l0:r}})},a=[]},"3e39":function(t,e,r){"use strict";var n=r("9a46"),i=r.n(n);i.a},8744:function(t,e,r){"use strict";r.r(e);var n=r("2b87"),i=r("b8db");for(var a in i)"default"!==a&&function(t){r.d(e,t,(function(){return i[t]}))}(a);r("3e39");var u,s=r("f0c5"),o=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=o.exports},"9a46":function(t,e,r){},ad67:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"menuList",data:function(){return{imageurl:"",userId:"",lists:[{category_id:0,category_name:"陪护",commission:100,createtime:"2022-7-26",data_status:0,distance:"10Km",head_img:"",id:0,publisher_name:"张三",requirement_introduction:"陪护介绍",user_id:0}]}},props:["list"],mounted:function(){this.userId=t.getStorageSync("userId"),this.imageurl=this.globalData.imageurl},methods:{talkto:function(t,e){t&&(t!=this.userId?this.$jump("/pages/chat/HM-chat?idse="+t):this.$alert("无法和自己聊天"))},jiedan:function(e){if(4!=t.getStorageSync("userInfo").user_type)this.$alert("请先注册达人才可接单");else{var r=this;this.util.ajax("myOrder/saveOrder",{releaseRequirementId:e,userId:this.userId},(function(t){r.$alert("接单成功"),r.refresh()}))}},refresh:function(){this.$emit("refresh")},godetail:function(e){4!=t.getStorageSync("userInfo").user_type?this.$alert("请先注册达人才可接单"):this.$jump("/pages/order/orderDetail?id="+e)}}};e.default=r}).call(this,r("543d")["default"])},b8db:function(t,e,r){"use strict";r.r(e);var n=r("ad67"),i=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/menuList-create-component',
    {
        'components/menuList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8744"))
        })
    },
    [['components/menuList-create-component']]
]);
