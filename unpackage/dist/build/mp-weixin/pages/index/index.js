(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0af6":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={uniPopup:function(){return i.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(i.bind(null,"d047"))}},a=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.shopList,(function(e,i){var n=t.__get_orig(e),a=t.Img(e.shop_logo);return{$orig:n,m0:a}})));t._isMounted||(t.e0=function(e,i){var n=arguments[arguments.length-1].currentTarget.dataset,a=n.eventParams||n["event-params"];i=a.index;t.shopTypeIndex=i,t.getNewList(i)},t.e1=function(e,i){var n=arguments[arguments.length-1].currentTarget.dataset,a=n.eventParams||n["event-params"];i=a.index;t.screenIndex=i}),t.$mp.data=Object.assign({},{$root:{l0:i}})},s=[]},1286:function(t,e,i){},"1f2b":function(t,e,i){"use strict";(function(t){i("a943"),i("33db");n(i("66fd"));var e=n(i("e41b"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])},"30c6":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("fe9b"),a=s(i("fbdf"));function s(t){return t&&t.__esModule?t:{default:t}}var o=function(){i.e("components/menuList").then(function(){return resolve(i("8744"))}.bind(null,i)).catch(i.oe)},u={components:{list:o,nearbyshop:a.default},data:function(){return{imageurl:"",userId:"",htosp:0,menuList_new:[],menuList:[[{img:"/static/image/icon_bqkd.png",title:"帮取快递",path:"/pages/from/apply?id=0"},{img:"/static/image/icon_bqwm.png",title:"帮送外卖",path:"/pages/from/apply?id=1"},{img:"/static/image/icon_bdlj.png",title:"帮丢垃圾",path:"/pages/from/apply?id=2"},{img:"/static/image/icon_bgw.png",title:"帮购商品",path:"/pages/from/apply?id=3"},{img:"/static/image/icon_tcps.png",title:"帮取帮送",path:"/pages/from/apply?id=4"},{img:"/static/image/huang/icon_cyd.png",title:"餐饮店",path:"/pages/index/shangquan"},{img:"/static/image/huang/icon_bld.png",title:"便利店",path:"/pages/index/shangquan"},{img:"/static/image/huang/icon_sgd.png",title:"水果店",path:"/pages/index/shangquan"},{img:"/static/image/huang/icon_gxd.png",title:"洗衣店",path:"/pages/index/shangquan"},{img:"/static/image/huang/icon_cwd.png",title:"宠物店",path:"/pages/index/shangquan"},{img:"/static/image/huang/mipmap-mdpi/icon_baojie.png",title:"家政保洁",path:"/pagesA/a_baojie"},{img:"/static/image/huang/mipmap-mdpi/icon_weixiu.png",title:"安装维修",path:"/pagesA/a_weixiu"},{img:"/static/image/huang/mipmap-mdpi/icon_maogou.png",title:"喂猫遛狗",path:"/pagesA/a_maogou"},{img:"/static/image/huang/mipmap-mdpi/icon_peihu.png",title:"陪诊陪护",path:"/pagesA/a_peihu"},{img:"/static/image/huang/mipmap-mdpi/icon_jiachu.png",title:"百味家厨",path:"/pagesA/a_jiachu"}],[{img:"/static/image/huang/icon_jyhs.png",title:"旧衣回收",path:"/pages/from/clothes"},{img:"/static/image/huang/icon_xzmm.png",title:"闲置买卖",path:"/pages/index/xianzhi"},{img:"/static/image/huang/icon_fwzp.png",title:"房屋租赁",path:""},{img:"/static/image/huang/icon_bjlh.png",title:"搬家拉货",path:""},{img:"/static/image/huang/icon_yyjj.png",title:"预约寄件",path:""},{img:"/static/image/huang/icon_sqsq.png",title:"社区商圈",path:"/pages/index/shangquan"},{img:"/static/image/huang/icon_sqtg.png",title:"社区团购",path:""},{img:"/static/image/huang/icon_sqhd.png",title:"社区活动",path:""},{img:"/static/image/huang/icon_sqdr.png",title:"社区达人",path:"/pages/index/daren"},{img:"/static/image/huang/icon_sqwy.png",title:"社区物业",path:"/pages/index/wuye"}]],village:{},coupons:[],wxMessage_text:"为了及时获取订单状态，您是否想接收订单状态的消息提醒？",swiperHeight:"0",shopType_index:""}},onLoad:function(e){var i=this;this.userId=t.getStorageSync("userId"),this.htosp=t.getStorageSync("htop"),this.village=t.getStorageSync("village"),this.imageurl=this.globalData.imageurl,this.getUserInfo();var n=this;40!=n.userId&&(e.new&&1==e.new?this.$nextTick((function(){n.getDiscount(),n.$refs.popup.open(),t.hideTabBar()})):t.getSetting({withSubscriptions:!0,success:function(e){var i=e.subscriptionsSetting.itemSettings;if(i){if(i.LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw)i.LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw;if(i.iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE)i.iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE;"accept"==tmpl_1&&"accept"==tmpl_2||(n.$refs.wxMessage.open(),t.hideTabBar())}else n.$refs.wxMessage.open(),t.hideTabBar()}})),this.getTypeList(),t.getStorageSync("swiper")?this.swiperHeight=t.getStorageSync("swiper"):setTimeout((function(){i.setSwiperHeight()}),500)},onShow:function(){var e=this;this.getUserInfo(),setTimeout((function(){e.$refs.nearbyshop.getNewList()}),500),this.util.ajax("user/closeWithdrawal",{},(function(e){t.setStorageSync("examine",e.data.close_withdrawal)}))},methods:{menuClick:function(t,e,i){var n=this;i>9||1==e?this.$alert("功能开发中"):"/pages/index/shangquan"==t.path?this.shopType_index=t.title:i<5?this.util.ajax("shop/queryWorkTime",{},(function(e){var i=e.data.set,a=new Date,s=n.$shijianhour(a.getTime()).split(":")[0];if(parseInt(s)>=i.on_duty_time&&parseInt(s)<i.off_duty_time)n.$jump(t.path);else{var o=i.on_duty_time+"点 至 "+i.off_duty_time+"点";n.$alert("开放时间为 "+o)}})):this.$jump(t.path)},getTypeList:function(){var t=this;this.util.ajax("release/categoryList",{},(function(e){for(var i=[],n=0;n<e.data.list.length/15;n++)i.push(e.data.list.slice(15*n,15*n+15));t.menuList_new=i}))},closePop:function(){this.$refs.popup.close(),t.showTabBar(),this.$refs.wxMessage.open(),t.hideTabBar()},getDiscount:function(){var e=this;this.util.ajax("release/errandCouponList",{userId:t.getStorageSync("userId")},(function(t){for(var i=0;i<3;i++)e.coupons.push(t.data.coupon[i])}))},dialogConfirm:function(){(0,n.openSubscription)(),t.showTabBar()},dialogClose:function(){this.$refs.wxMessage.close(),t.showTabBar()},setSwiperHeight:function(){var e=this,i=t.createSelectorQuery().in(this);i.select("#itemList").boundingClientRect(),i.exec((function(i){i&&i[0]&&(e.swiperHeight=3*(i[0].height+5),t.setStorageSync("swiper",e.swiperHeight))}))},getUserInfo:function(){var e=this;this.util.ajax("user/getUserInfo",{userId:this.userId},(function(i){e.village=i.data.residentialQuarterVo,t.setStorageSync("userInfo",i.data)}))}}};e.default=u}).call(this,i("543d")["default"])},"31a5":function(t,e,i){"use strict";var n=i("1286"),a=i.n(n);a.a},"330f":function(t,e,i){},"3d9e":function(t,e,i){"use strict";i.r(e);var n=i("f9fc"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"4af2":function(t,e,i){"use strict";var n=i("330f"),a=i.n(n);a.a},"4d99":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={uniPopup:function(){return i.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(i.bind(null,"d047"))},uniPopupDialog:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(i.bind(null,"9a23"))},uniIcons:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(i.bind(null,"f2caa"))},uniDateformat:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(i.bind(null,"8fa7"))}},a=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.menuList_new,(function(e,i){var n=t.__get_orig(e),a=t.__map(e,(function(e,i){var n=t.__get_orig(e),a=t.Img(e.icon);return{$orig:n,m0:a}}));return{$orig:n,l0:a}})));t.$mp.data=Object.assign({},{$root:{l1:i}})},s=[]},bc8f:function(t,e,i){"use strict";i.r(e);var n=i("30c6"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},e41b:function(t,e,i){"use strict";i.r(e);var n=i("4d99"),a=i("bc8f");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("31a5");var o,u=i("f0c5"),p=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=p.exports},f9fc:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:["type"],name:"nearbyshop",data:function(){return{userId:"",htosp:0,commissionSort:0,isfoot:!1,curPage:1,shopList:[],shopType:[],shopTypeList:[],shopTypeIndex:0,fromPage:"",screenIndex:0,scrollIndex:0}},onReachBottom:function(){this.isfoot||(this.curPage++,this.getType())},created:function(){this.userId=t.getStorageSync("userId"),this.htosp=t.getStorageSync("htop"),this.getType(),this.getUrlIndex()},watch:{type:function(t,e){this.getType(t)}},methods:{getType:function(t){var e=this,i=this;this.util.ajax("shop/getShopTypeList",{parentId:0,secondType:1},(function(n){i.shopTypeList=[],i.shopTypeList.push({name:"全部",id:0,parent_id:0}),i.shopTypeList=i.shopTypeList.concat(n.data.list),t?e.scrollEvent(t,n.data.list):e.getlist()}))},getlist:function(){var t=this,e=this;this.util.ajax("shop/shopList",{shopTypeId:this.shopTypeList[this.shopTypeIndex].id,scoreSort:this.commissionSort+1,curPage:this.curPage,pageSize:20,userId:this.userId},(function(i){var n=[];if(e.curPage!==i.data.page.curPage&&(e.isfoot=!0,e.shopList=e.shopList.concat(n)),i.data.list.length>0){for(var a=0;a<i.data.list.length;a++)0!=i.data.list[a].business_status&&n.push(i.data.list[a]);t.screenTypeEvent(n)}else e.shopList=[]}))},screenTypeEvent:function(t){var e=this;if(0==e.shopTypeIndex)e.shopList=t;else for(var i=[],n=0;n<t.length;n++)t[n].shop_sub_type_id==e.shopTypeList[e.shopTypeIndex].id&&(i.push(t[n]),this.shopList=i)},scrollEvent:function(e,i){for(var n=this,a=0;a<i.length;a++)e==i[a].name&&(n.shopTypeIndex=a+1);var s=t.createSelectorQuery().in(this).select(".scroll-view");s.boundingClientRect((function(t){n.scrollIndex=parseInt(t.width/4*n.shopTypeIndex)})).exec((function(t){})),this.getlist()},getNewList:function(){this.shopList=[],this.curPage=1,this.getType()},getUrlIndex:function(){var t=getCurrentPages(),e=t[t.length-1].route,i=t[t.length-1].options,n="";for(var a in i)n+="?"+a+"="+i[a];var s=e+n;this.fromPage=s},openpop:function(){this.$refs.popup.open(),t.hideTabBar()},cancelEvent:function(){var e=this;e.screenIndex=0,this.$refs.popup.close(),t.showTabBar()},confirmEvent:function(){var e=this;e.shopTypeIndex=e.screenIndex,this.getType(e.shopTypeList[e.shopTypeIndex].name),this.$refs.popup.close(),t.showTabBar()}}};e.default=i}).call(this,i("543d")["default"])},fbdf:function(t,e,i){"use strict";i.r(e);var n=i("0af6"),a=i("3d9e");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("4af2");var o,u=i("f0c5"),p=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=p.exports}},[["1f2b","common/runtime","common/vendor"]]]);