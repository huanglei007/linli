(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/a_product"],{"0848":function(e,t,n){"use strict";n.r(t);var s=n("60c4"),a=n.n(s);for(var o in s)"default"!==o&&function(e){n.d(t,e,(function(){return s[e]}))}(o);t["default"]=a.a},3995:function(e,t,n){},"41e4":function(e,t,n){"use strict";(function(e){n("56c5"),n("33db");s(n("66fd"));var t=s(n("e33e"));function s(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"60c4":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{userId:"",userinfo:{},imageurl:"",searchVal:"",statusList:[{status:"已上架",isvalid:1},{status:"已下架",isvalid:2}],statusIndex:1,shopType:[],shopTypeIndex:0,handleIndex:"",editVal:"",addVal:"",productShelf:"",productIndex:"",imageValue:[],imageIndex:null,inputIndex:""}},onLoad:function(){this.userId=e.getStorageSync("userId"),this.userinfo=e.getStorageSync("userInfo"),this.imageurl=this.globalData.imageurl,this.getList()},watch:{statusIndex:function(e,t){this.getList()},imageValue:function(e,t){var n=this;e[0]&&(n.shopType[n.shopTypeIndex].productVos[n.imageIndex].images=n.imageurl+e[0],n.imageValue=[])}},methods:{getList:function(){var e=this;4!=this.statusIndex&&this.util.ajax("shop/getShopProducts",{userId:this.userId,searchType:this.statusIndex},(function(t){t.data.categoryVos[0]||1!=e.statusIndex?e.shopType=t.data.categoryVos:e.shopType[0]||e.shopType.push({category_name:"类别1",productVos:[{images:"",isvalid:1,name:"",selling_price:0,stock:0}]})}))},saveEvent:function(){var e=this;this.util.ajax("shop/saveShopProduct",{categoryVos:this.shopType,userId:this.userId},(function(t){e.$alert("成功")}))},shopTypeHandlePop:function(e,t){var n=this;n.$refs.typePopup.open(),n.handleIndex=e,t&&(n.editVal=t)},cancelEvent_type:function(){this.$refs.typePopup.close()},confimeEvent_type:function(){var e=this;"edit"==e.handleIndex?e.shopType[e.shopTypeIndex].category_name=e.editVal:"delete"==e.handleIndex?(e.shopType.splice(e.shopTypeIndex,1),e.shopTypeIndex=0):e.shopType.push({category_name:e.addVal,productVos:[{isvalid:e.statusIndex,name:"",selling_price:0,stock:0}]}),this.$refs.typePopup.close()},productPopEvent:function(e,t){var n=this;n.$refs.productPopup.open(),n.productShelf=e,n.productIndex=t},cancelEvent_type_product:function(){this.$refs.productPopup.close()},confimeEvent_type_product:function(){var e=this,t=e.shopType[e.shopTypeIndex].productVos;"delete"==e.productShelf?t[e.productIndex].isvalid=3:"shelf"==e.productShelf?t[e.productIndex].isvalid=2:t[e.productIndex].isvalid=1,this.saveEvent(),this.$refs.productPopup.close()},productHandle:function(e,t){var n=this;"add"==e&&n.shopType[n.shopTypeIndex].productVos.push({images:"",isvalid:n.statusIndex,name:"",selling_price:0,stock:0,month_sale:0})},updateImg:function(e){var t=this;1==t.statusIndex&&(t.imageIndex=e,this.util.sendimage(5-t.imageValue.length,t.imageValue))},inputEvent:function(t){var n=this;e.showLoading({title:"检索中",mask:!0}),setTimeout((function(){n.util.ajax("shop/getShopProducts",{searchName:t.value,userId:n.userId,searchType:n.statusIndex},(function(e){e.data.categoryVos[0].productVos[0]?n.shopType=e.data.categoryVos:n.$alert("暂无您想要的商品")})),e.hideLoading()}),2e3)},priceEvent:function(e,t){var n=this;n.inputIndex=e.detail.value,n.shopType[n.shopTypeIndex].productVos[t].selling_price=""},priceBlur:function(e,t){var n=this;e.detail.value&&"0"!=e.detail.value||(n.shopType[n.shopTypeIndex].productVos[t].selling_price=n.inputIndex)},stockEvent:function(e,t){var n=this,s=n.shopType[n.shopTypeIndex].productVos[t];if("del"==e){if(s.stock<=0)return;s.stock-=1}else s.stock+=1}}};t.default=n}).call(this,n("543d")["default"])},bbd8:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return s}));var s={uniSearchBar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar")]).then(n.bind(null,"cb1f"))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"0b53"))}},a=function(){var e=this,t=e.$createElement,n=(e._self._c,e.shopType[0]?e.__map(e.shopType[e.shopTypeIndex].productVos,(function(t,n){var s=e.__get_orig(t),a=e.statusIndex!=t.isvalid||t.images?null:e.Img(t.images);return{$orig:s,m0:a}})):null);e._isMounted||(e.e0=function(t,n){var s=arguments[arguments.length-1].currentTarget.dataset,a=s.eventParams||s["event-params"];n=a.data;e.statusIndex=n.isvalid},e.e1=function(t,n){var s=arguments[arguments.length-1].currentTarget.dataset,a=s.eventParams||s["event-params"];n=a.index;e.shopTypeIndex=n}),e.$mp.data=Object.assign({},{$root:{l0:n}})},o=[]},d789:function(e,t,n){"use strict";var s=n("3995"),a=n.n(s);a.a},e33e:function(e,t,n){"use strict";n.r(t);var s=n("bbd8"),a=n("0848");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("d789");var u,i=n("f0c5"),r=Object(i["a"])(a["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],u);t["default"]=r.exports}},[["41e4","common/runtime","common/vendor"]]]);