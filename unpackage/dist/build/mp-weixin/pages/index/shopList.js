(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/shopList"],{"023d":function(t,e,i){"use strict";var s;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return s}));var a=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.shopList,(function(e,i){var s=t.__get_orig(e),a=t.Img(e.shop_logo);return{$orig:s,m0:a}})));t._isMounted||(t.e0=function(e){t.commissionSort=1^t.commissionSort,t.getNewList()}),t.$mp.data=Object.assign({},{$root:{l0:i}})},n=[]},"29f3":function(t,e,i){"use strict";var s=i("70b4"),a=i.n(s);a.a},4324:function(t,e,i){"use strict";i.r(e);var s=i("023d"),a=i("ef93");for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("29f3");var o,r=i("f0c5"),c=Object(r["a"])(a["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],o);e["default"]=c.exports},"70b4":function(t,e,i){},"87e5":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{classfy:["需求分类","需求分类1","需求分类2"],classfyIndex:0,range:[{name:"距离",value:0}],rangeIndex:0,shopList:[],curPage:1,commissionSort:0,isfoot:!1,classfyId:0,classTitle:"",searchParam:""}},onLoad:function(e){this.classTitle=e.title,this.classfyId=e.id;var i=this;t.setNavigationBarTitle({title:i.classTitle}),this.util.ajax("release/distanceConfigList",{},(function(t){i.range=i.range.concat(t.data.list)})),this.getlist()},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},methods:{bindPickerChange2:function(t){this.rangeIndex=t.target.value,this.getNewList()},getlist:function(){var t=this;this.util.ajax("shop/shopList",{shopTypeId:this.classfyId,scoreSort:this.commissionSort+1,curPage:this.curPage,pageSize:20,searchParam:this.searchParam,distanceValue:this.range[this.rangeIndex].value,userId:this.userId},(function(e){t.curPage!==e.data.page.curPage&&(t.isfoot=!0),t.curPage==e.data.page.curPage&&(t.shopList=t.shopList.concat(e.data.list))}))},getNewList:function(){this.shopList=[],this.curPage=1,this.getlist()}}};e.default=i}).call(this,i("543d")["default"])},ef93:function(t,e,i){"use strict";i.r(e);var s=i("87e5"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);e["default"]=a.a},fd0e:function(t,e,i){"use strict";(function(t){i("56c5"),i("33db");s(i("66fd"));var e=s(i("4324"));function s(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])}},[["fd0e","common/runtime","common/vendor"]]]);