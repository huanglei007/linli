(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/index"],{2416:function(t,e,i){"use strict";var n=i("fc6e"),s=i.n(n);s.a},"8a49":function(t,e,i){"use strict";i.r(e);var n=i("bd17"),s=i("f138");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);i("2416");var o,r=i("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=c.exports},bd17:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.menuList,(function(e,i){var n=t.__get_orig(e),s=t.__map(e,(function(e,i){var n=t.__get_orig(e),s=t.Img(e.icon);return{$orig:n,m0:s}}));return{$orig:n,l0:s}})));t._isMounted||(t.e0=function(e){t.ability="全部",t.allList()},t.e1=function(e){t.ability="需求"},t.e2=function(e){t.ability="佣金",t.commissionSort=1^t.commissionSort,t.getNewList()},t.e3=function(e){t.ability="距离"}),t.$mp.data=Object.assign({},{$root:{l1:i}})},a=[]},eb69:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/menuList").then(function(){return resolve(i("00ad"))}.bind(null,i)).catch(i.oe)},s={components:{list:n},data:function(){return{userId:"",htosp:0,menuList:[],classfy:[{category_name:"需求类别",id:0}],classfyIndex:0,range:[{name:"距离",id:0}],rangeIndex:0,shopChoise:0,shopList:[],curPage:1,commissionSort:0,isfoot:!1,swiperHeight:"",ability:"全部"}},mounted:function(){var t=this;this.$nextTick((function(){t.setSwiperHeight()}))},onLoad:function(){this.htosp=t.getStorageSync("htop"),this.userId=t.getStorageSync("userId"),this.getTypeList(),this.getDistance()},onShow:function(){this.classfyIndex=0,this.getNewList()},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},watch:{},methods:{getlist:function(){var e=this;this.util.ajax("release/releaseList",{categoryId:this.classfy[this.classfyIndex].id,commissionSort:this.commissionSort,curPage:this.curPage,distanceValue:this.range[this.rangeIndex].value,pageSize:20,userId:this.userId},(function(i){e.curPage!==i.data.page.curPage&&(e.isfoot=!0),e.curPage==i.data.page.curPage&&(e.shopList=e.shopList.concat(i.data.list.map((function(t){return{category_name:t.category_name,commission:t.commission,createtime:e.$shijian(t.createtime),distance:t.distance,id:t.id,image:t.head_img,publisher_name:t.publisher_name,requirement_introduction:"备注："+t.leave_message,user_id:t.user_id,user_name:t.publisher_name,now_delivery:t.now_delivery,shop_name:t.shop_name}})))),t.setStorageSync("orderList",e.shopList)}))},getTypeList:function(){var t=this,e=this;this.util.ajax("release/categoryList",{},(function(i){e.classfy=e.classfy.concat(i.data.list);for(var n=[],s=0;s<i.data.list.length/15;s++)n.push(i.data.list.slice(15*s,15*s+15));t.menuList=n}))},getDistance:function(){var t=this;this.util.ajax("release/distanceConfigList",{},(function(e){t.range=t.range.concat(e.data.list)}))},typeClick:function(t){for(var e=this,i=this.menuList,n=0;n<i.length;n++)for(var s=0;s<i[n].length;s++)i[n][s].category_name==t.category_name&&(e.classfyIndex=0==n?s+1:s+1+15);this.getNewList()},allList:function(){this.classfyIndex=0,this.getNewList()},bindPickerChange:function(t){this.classfyIndex=t.target.value,this.getNewList()},bindPickerChange2:function(t){this.rangeIndex=t.target.value,this.getNewList()},getNewList:function(){var e=this,i=t.getStorageSync("orderList");i[0]&&0==e.classfyIndex?e.shopList=i:(e.shopList=[],e.curPage=1,e.getlist())},setSwiperHeight:function(){var e=this,i=t.createSelectorQuery().in(this);i.select("#itemList").boundingClientRect(),i.exec((function(t){t&&t[0]&&(e.swiperHeight=3*(t[0].height+5))}))}}};e.default=s}).call(this,i("543d")["default"])},f138:function(t,e,i){"use strict";i.r(e);var n=i("eb69"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},fbe3:function(t,e,i){"use strict";(function(t){i("56c5"),i("33db");n(i("66fd"));var e=n(i("8a49"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])},fc6e:function(t,e,i){}},[["fbe3","common/runtime","common/vendor"]]]);