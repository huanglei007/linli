(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/index"],{"1b00":function(t,e,i){"use strict";(function(t){i("a943"),i("33db");n(i("66fd"));var e=n(i("f4e8"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])},"62f8":function(t,e,i){"use strict";var n=i("b26d"),s=i.n(n);s.a},"6d5a":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.menuList,(function(e,i){var n=t.__get_orig(e),s=t.__map(e,(function(e,i){var n=t.__get_orig(e),s=t.Img(e.icon);return{$orig:n,m0:s}}));return{$orig:n,l0:s}})));t._isMounted||(t.e0=function(e){t.ability="全部",t.allList()},t.e1=function(e){t.ability="需求"},t.e2=function(e){t.ability="佣金",t.commissionSort=1^t.commissionSort,t.getNewList()},t.e3=function(e){t.ability="距离"}),t.$mp.data=Object.assign({},{$root:{l1:i}})},a=[]},"909f":function(t,e,i){"use strict";i.r(e);var n=i("c686"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},b26d:function(t,e,i){},c686:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/menuList").then(function(){return resolve(i("8744"))}.bind(null,i)).catch(i.oe)},s={components:{list:n},data:function(){return{userId:"",htosp:0,menuList:[],classfy:[{category_name:"需求类别",id:0}],classfyIndex:0,range:[{name:"距离",id:0}],rangeIndex:0,shopChoise:0,shopList:[],curPage:1,commissionSort:0,isfoot:!1,swiperHeight:"0",ability:"全部"}},onLoad:function(){var e=this;this.htosp=t.getStorageSync("htop"),this.userId=t.getStorageSync("userId"),this.getDistance(),this.getTypeList(),t.getStorageSync("swiper")?this.swiperHeight=t.getStorageSync("swiper"):setTimeout((function(){e.setSwiperHeight()}),500)},onShow:function(){this.classfyIndex=0,this.getNewList()},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},watch:{},methods:{getlist:function(){var e=this;this.util.ajax("release/releaseList",{categoryId:this.classfy[this.classfyIndex].id,commissionSort:this.commissionSort,curPage:this.curPage,distanceValue:this.range[this.rangeIndex].value,pageSize:20,userId:this.userId},(function(i){var n=t.getStorageSync("orderList"),s=i.data.list;n[0]&&s[0]&&n[0].id==s[0].id&&n.length==s.length?e.shopList=n:(e.curPage!==i.data.page.curPage&&(e.isfoot=!0),e.curPage==i.data.page.curPage&&(e.shopList=e.shopList.concat(s.map((function(t){return{category_name:t.category_name,commission:t.commission,createtime:e.$shijian(t.createtime),distance:t.distance,id:t.id,image:t.head_img,publisher_name:t.publisher_name,requirement_introduction:"备注："+t.leave_message,user_id:t.user_id,user_name:t.publisher_name,now_delivery:t.now_delivery,shop_name:t.shop_name}})))),t.setStorageSync("orderList",e.shopList))}))},getTypeList:function(){var t=this,e=this;this.util.ajax("release/categoryList",{},(function(i){e.classfy=e.classfy.concat(i.data.list);for(var n=[],s=0;s<i.data.list.length/15;s++)n.push(i.data.list.slice(15*s,15*s+15));t.menuList=n}))},getDistance:function(){var t=this;this.util.ajax("release/distanceConfigList",{},(function(e){t.range=t.range.concat(e.data.list)}))},typeClick:function(t){for(var e=this,i=this.menuList,n=0;n<i.length;n++)for(var s=0;s<i[n].length;s++)i[n][s].category_name==t.category_name&&(e.classfyIndex=0==n?s+1:s+1+15);this.getNewList()},allList:function(){this.classfyIndex=0,this.getNewList()},bindPickerChange:function(t){this.classfyIndex=t.target.value,this.getNewList()},bindPickerChange2:function(t){this.rangeIndex=t.target.value,this.getNewList()},getNewList:function(){var t=this;t.shopList=[],t.curPage=1,t.getlist()},setSwiperHeight:function(){var e=this,i=t.createSelectorQuery().in(this);i.select("#itemList").boundingClientRect(),i.exec((function(t){t&&t[0]&&(e.swiperHeight=3*(t[0].height+5))}))}}};e.default=s}).call(this,i("543d")["default"])},f4e8:function(t,e,i){"use strict";i.r(e);var n=i("6d5a"),s=i("909f");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);i("62f8");var o,r=i("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=c.exports}},[["1b00","common/runtime","common/vendor"]]]);