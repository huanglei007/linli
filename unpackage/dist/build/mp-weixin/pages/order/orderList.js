(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/orderList"],{"06ab":function(t,e,i){"use strict";i.r(e);var n=i("4081"),a=i("3429");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("4fd8");var r,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},"23ab":function(t,e,i){"use strict";(function(t){i("56c5"),i("33db");n(i("66fd"));var e=n(i("06ab"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])},"31e0":function(t,e,i){},3429:function(t,e,i){"use strict";i.r(e);var n=i("71a8"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},4081:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.commissionSort=1^t.commissionSort,t.getNewList()})},s=[]},"4fd8":function(t,e,i){"use strict";var n=i("31e0"),a=i.n(n);a.a},"71a8":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/menuList").then(function(){return resolve(i("00ad"))}.bind(null,i)).catch(i.oe)},a={components:{list:n},data:function(){return{classfy:["需求分类","需求分类1","需求分类2"],classfyIndex:0,range:[{name:"距离",value:0}],rangeIndex:0,shopList:[],curPage:1,commissionSort:0,isfoot:!1,classfyId:0,classTitle:"",searchParam:""}},onLoad:function(e){this.classTitle=e.title,this.classfyId=e.id;var i=this;t.setNavigationBarTitle({title:i.classTitle}),this.util.ajax("release/distanceConfigList",{},(function(t){i.range=i.range.concat(t.data.list)})),this.getlist()},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},methods:{bindPickerChange2:function(t){this.rangeIndex=t.target.value,this.getNewList()},getlist:function(){var t=this;this.util.ajax("release/releaseList",{categoryId:this.classfyId,distanceValue:this.range[this.rangeIndex].value,commissionSort:this.commissionSort+1,curPage:this.curPage,searchParam:this.searchParam,pageSize:20,userId:this.userId},(function(e){t.curPage!==e.data.page.curPage&&(t.isfoot=!0),t.curPage==e.data.page.curPage&&(t.shopList=t.shopList.concat(e.data.list.map((function(e){return{category_name:e.category_name,commission:e.commission,createtime:t.$shijian(e.createtime),distance:e.distance,id:e.id,image:e.image,publisher_name:e.publisher_name,requirement_introduction:"备注："+e.requirement_introduction,user_id:e.user_id,user_name:e.publisher_name}}))))}))},getNewList:function(){this.shopList=[],this.curPage=1,this.getlist()}}};e.default=a}).call(this,i("543d")["default"])}},[["23ab","common/runtime","common/vendor"]]]);