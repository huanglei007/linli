(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/book"],{"07e4":function(t,i,e){"use strict";e.r(i);var n=e("aff3"),a=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=a.a},"75b3":function(t,i,e){"use strict";(function(t){e("56c5"),e("33db");n(e("66fd"));var i=n(e("ce96"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(i.default)}).call(this,e("543d")["createPage"])},"7ea7":function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return n}));var n={uniLink:function(){return e.e("uni_modules/uni-link/components/uni-link/uni-link").then(e.bind(null,"5dba"))}},a=function(){var t=this,i=t.$createElement,e=(t._self._c,t.__map(t.banner,(function(i,e){var n=t.__get_orig(i),a=t.Img(i.image);return{$orig:n,m0:a}})));t._isMounted||(t.e0=function(i){t.commissionSort++,t.commissionSort>2&&(t.commissionSort=0),t.getNewList()}),t.$mp.data=Object.assign({},{$root:{l0:e}})},s=[]},a9b8:function(t,i,e){"use strict";var n=e("f4dd"),a=e.n(n);a.a},aff3:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=function(){e.e("components/menuList").then(function(){return resolve(e("00ad"))}.bind(null,e)).catch(e.oe)},a={components:{list:n},data:function(){return{userId:"",htosp:0,menuList:[{img:"/static/image/icon_cs.png",title:"美食餐饮",path:""},{img:"/static/image/icon_ysbj.png",title:"养生保健",path:""},{img:"/static/image/icon_pxjg.png",title:"机构培训",path:""},{img:"/static/image/icon_cwyy.png",title:"宠物医院",path:""},{img:"/static/image/icon_cs.png",title:"便利店",path:""},{img:"/static/image/icon_gxd.png",title:"干洗店 ",path:""},{img:"/static/image/icon_sgd.png",title:"水果店",path:""},{img:"/static/image/icon_dyf.png",title:"大药房",path:""}],classfy:["需求分类","需求分类1","需求分类2"],classfyIndex:0,rangeIndex:0,range:[{name:"距离",value:0}],shopList:[],curPage:1,commissionSort:0,isfoot:!1,banner:[]}},onLoad:function(){this.userId=t.getStorageSync("userId"),this.htosp=t.getStorageSync("htop");var i=this;this.util.ajax("release/distanceConfigList",{},(function(t){i.range=i.range.concat(t.data.list)})),this.util.ajax("advertising/listPage",{type:1},(function(t){i.banner=t.data.list}))},onShow:function(){this.getNewList()},methods:{bindPickerChange2:function(t){this.rangeIndex=t.target.value,this.getNewList()},getlist:function(){var t=this;this.util.ajax("oldBookTrading/listPage",{curPage:this.curPage,priceSort:this.commissionSort,distanceValue:this.range[this.rangeIndex].value,pageSize:20,userId:this.userId},(function(i){t.curPage!==i.data.page.curPage&&(t.isfoot=!0),t.curPage==i.data.page.curPage&&(t.shopList=t.shopList.concat(i.data.list.map((function(i){return{category_name:i.book_name,commission:i.selling_price,createtime:t.$shijian(i.createtime),distance:i.distance,id:i.id,user_id:i.user_id,image:i.head_img,publisher_name:i.publisher_name,requirement_introduction:i.transaction_mode_name,hideBtn:1}}))))}))},getNewList:function(){this.shopList=[],this.curPage=1,this.getlist()}}};i.default=a}).call(this,e("543d")["default"])},ce96:function(t,i,e){"use strict";e.r(i);var n=e("7ea7"),a=e("07e4");for(var s in a)"default"!==s&&function(t){e.d(i,t,(function(){return a[t]}))}(s);e("a9b8");var o,c=e("f0c5"),r=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);i["default"]=r.exports},f4dd:function(t,i,e){}},[["75b3","common/runtime","common/vendor"]]]);