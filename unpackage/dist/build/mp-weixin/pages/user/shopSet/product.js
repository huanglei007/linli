(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/shopSet/product"],{"106d":function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return r})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,o=(t._self._c,t.__map(t.categoryVos,(function(e,o){var n=t.__get_orig(e),r=e.isHide?null:t.__map(e.productVos,(function(e,o){var n=t.__get_orig(e),r=""!=e.images?t.Img(e.images):null;return{$orig:n,m0:r}}));return{$orig:n,l0:r}})));t.$mp.data=Object.assign({},{$root:{l1:o}})},a=[]},"397a":function(t,e,o){"use strict";o.r(e);var n=o("106d"),r=o("86b7");for(var a in r)"default"!==a&&function(t){o.d(e,t,(function(){return r[t]}))}(a);o("a4e4");var i,s=o("f0c5"),u=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=u.exports},"67af":function(t,e,o){},"86b7":function(t,e,o){"use strict";o.r(e);var n=o("acc9"),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},a4e4:function(t,e,o){"use strict";var n=o("67af"),r=o.n(n);r.a},acc9:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{imageValue:[],userId:"",userinfo:{},categoryVos:[{category_name:"",change:!0,productVos:[{selling_price:"",images:"",name:"",market_price:""}]}]}},mounted:function(){this.userId=t.getStorageSync("userId"),this.userinfo=t.getStorageSync("userInfo"),this.getList()},methods:{getList:function(){var t=this;this.util.ajax("shop/getShopProducts",{userId:this.userId},(function(e){if(e.data.categoryVos.length){t.categoryVos=e.data.categoryVos;for(var o=0;o<t.categoryVos.length;o++)t.categoryVos[o].isHide=1}}))},showItem:function(t){t.isHide=0,t.change=!0,this.$forceUpdate()},addPro:function(t){t.productVos.push({selling_price:"",images:"",name:"",market_price:""})},delPro:function(t,e){t.productVos[e].id?t.productVos[e].isDelete=1:t.productVos.splice(e,1)},addImg:function(t){var e=[];this.util.sendimage(1,e,(function(o){t.images=e[0]}))},del:function(t){t.images=""},newArr:function(){this.categoryVos.push({category_name:"",change:!0,productVos:[{selling_price:"",images:"",name:"",market_price:""}]})},submit:function(){for(var t=this,e=[],o=0;o<this.categoryVos.length;o++)this.categoryVos[o].change&&e.push(this.categoryVos[o]);var n=this;this.util.ajax("shop/saveShopProduct",{categoryVos:e,userId:this.userId},(function(e){n.$alert(e.msg),t.getList()}))}}};e.default=o}).call(this,o("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/user/shopSet/product-create-component',
    {
        'pages/user/shopSet/product-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("397a"))
        })
    },
    [['pages/user/shopSet/product-create-component']]
]);
