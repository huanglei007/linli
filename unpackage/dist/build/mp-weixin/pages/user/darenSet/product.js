(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/darenSet/product"],{5434:function(t,e,n){"use strict";n.r(e);var r=n("5f61"),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},"5f61":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{imageValue:[],userId:"",categoryVos:[{category_name:"",change:!0,productVos:[{selling_price:"",images:"",name:"",market_price:""}]}]}},mounted:function(){this.userId=t.getStorageSync("userId"),this.getList()},methods:{getList:function(){var t=this;this.util.ajax("talent/getTalentService",{userId:this.userId},(function(e){if(e.data.categoryVos.length){t.categoryVos=e.data.categoryVos;for(var n=0;n<t.categoryVos.length;n++)t.categoryVos[n].isHide=1}}))},showItem:function(t){t.isHide=0,t.change=!0,this.$forceUpdate()},addPro:function(t){t.productVos.push({selling_price:"",images:"",name:"",market_price:""})},delPro:function(t,e){t.productVos[e].id?t.productVos[e].isDelete=1:t.productVos.splice(e,1)},addImg:function(t){var e=[];this.util.sendimage(1,e,(function(n){t.images=e[0]}))},del:function(t){t.images=""},newArr:function(){this.categoryVos.push({category_name:"",change:!0,productVos:[{selling_price:"",images:"",name:"",market_price:""}]})},submit:function(){for(var t=this,e=[],n=0;n<this.categoryVos.length;n++)this.categoryVos[n].change&&e.push(this.categoryVos[n]);var r=this;this.util.ajax("talent/saveTalentService",{categoryVos:e,userId:this.userId},(function(e){r.$alert(e.msg),t.getList()}))}}};e.default=n}).call(this,n("543d")["default"])},"64b9":function(t,e,n){},"66de":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.categoryVos,(function(e,n){var r=t.__get_orig(e),a=e.isHide?null:t.__map(e.productVos,(function(e,n){var r=t.__get_orig(e),a=""!=e.images?t.Img(e.images):null;return{$orig:r,m0:a}}));return{$orig:r,l0:a}})));t.$mp.data=Object.assign({},{$root:{l1:n}})},i=[]},c63f:function(t,e,n){"use strict";var r=n("64b9"),a=n.n(r);a.a},f7d0:function(t,e,n){"use strict";n.r(e);var r=n("66de"),a=n("5434");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("c63f");var o,s=n("f0c5"),c=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/user/darenSet/product-create-component',
    {
        'pages/user/darenSet/product-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f7d0"))
        })
    },
    [['pages/user/darenSet/product-create-component']]
]);
