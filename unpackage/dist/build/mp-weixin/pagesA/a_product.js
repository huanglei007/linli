(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/a_product"],{"0848":function(e,t,n){"use strict";n.r(t);var s=n("60c4"),o=n.n(s);for(var a in s)"default"!==a&&function(e){n.d(t,e,(function(){return s[e]}))}(a);t["default"]=o.a},3995:function(e,t,n){},"41e4":function(e,t,n){"use strict";(function(e){n("56c5"),n("33db");s(n("66fd"));var t=s(n("e33e"));function s(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"60c4":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{userId:"",userinfo:{},imageurl:"",searchVal:"",statusList:[{status:"已上架",isvalid:1},{status:"已下架",isvalid:2}],statusIndex:1,shopType:[],shopTypeIndex:0,handleIndex:"",editVal:"",addVal:"",productShelf:"",productIndex:"",imageValue:[],imageIndex:null,inputIndex:""}},onLoad:function(){this.userId=e.getStorageSync("userId"),this.userinfo=e.getStorageSync("userInfo"),this.imageurl=this.globalData.imageurl,this.getList()},watch:{statusIndex:function(e,t){this.getList()},imageValue:function(e,t){var n=this;e[0]&&(n.shopType[n.shopTypeIndex].productVos[n.imageIndex].images=n.imageurl+e[0],n.imageValue=[])}},methods:{getList:function(){var e=this;4!=this.statusIndex&&this.util.ajax("shop/getShopProducts",{userId:this.userId,searchType:this.statusIndex},(function(t){e.shopType=t.data.categoryVos,t.data.categoryVos[0]||1!=e.statusIndex?e.shopType=t.data.categoryVos:e.shopType[0]}))},saveEvent:function(){var e=this;e.util.ajax("shop/saveShopProduct",{categoryVos:e.shopType,userId:e.userId},(function(t){e.$alert("成功"),setTimeout((function(){e.getList()}),1e3)}))},shopTypeHandlePop:function(e,t){var n=this;n.$refs.typePopup.open(),n.handleIndex=e,t&&(n.editVal=t)},cancelEvent_type:function(){this.addVal="",this.$refs.typePopup.close()},confimeEvent_type:function(){var e=this;if("edit"==e.handleIndex)e.shopType[e.shopTypeIndex].category_name=e.editVal;else if("delete"==e.handleIndex){for(var t=e.shopType[e.shopTypeIndex].productVos,n=0;n<t.length;n++)t[n].isvalid=3;e.shopTypeIndex=0,e.saveEvent()}else e.shopType.push({category_name:e.addVal,productVos:[]});this.addVal="",this.$refs.typePopup.close()},productPopEvent:function(e,t){var n=this;n.$refs.productPopup.open(),n.productShelf=e,n.productIndex=t},cancelEvent_type_product:function(){this.$refs.productPopup.close()},confimeEvent_type_product:function(){var e=this,t=e.shopType[e.shopTypeIndex].productVos;"delete"==e.productShelf?t[e.productIndex].isvalid=3:"shelf"==e.productShelf?t[e.productIndex].isvalid=2:t[e.productIndex].isvalid=1,this.saveEvent(),this.$refs.productPopup.close()},productHandle:function(e,t){var n=this;"add"==e&&n.shopType[n.shopTypeIndex].productVos.push({images:"",isvalid:n.statusIndex,name:"",selling_price:"",stock:0,month_sale:0})},updateImg:function(e){var t=this;1==t.statusIndex&&(t.imageIndex=e,this.util.sendimage(5-t.imageValue.length,t.imageValue))},inputEvent:function(t){var n=this;e.showLoading({title:"检索中",mask:!0}),setTimeout((function(){n.util.ajax("shop/getShopProducts",{searchName:t.value,userId:n.userId,searchType:n.statusIndex},(function(e){e.data.categoryVos[0].productVos[0]?n.shopType=e.data.categoryVos:n.$alert("暂无您想要的商品")})),e.hideLoading()}),2e3)},checkNum:function(e,t){var n=this.shopType[this.shopTypeIndex].productVos,s=e.detail.value,o=s.indexOf("."),a=s.lastIndexOf(".");0==o?this.$nextTick((function(){n[t].selling_price=s.slice(0,o)})):o!==a&&this.$nextTick((function(){n[t].selling_price=s.slice(0,a)}))},focusPrice:function(e,t){var n=e.detail.value,s=this.shopType[this.shopTypeIndex].productVos;"0"==n&&(s[t].selling_price="")},stockEvent:function(e,t){var n=this,s=n.shopType[n.shopTypeIndex].productVos[t];if("del"==e){if(s.stock<=0)return;s.stock-=1}else s.stock+=1}}};t.default=n}).call(this,n("543d")["default"])},"9af7":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return s}));var s={uniSearchBar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar")]).then(n.bind(null,"cb1f"))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"0b53"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.shopType[e.shopTypeIndex]&&e.shopType[e.shopTypeIndex].productVos[0]?e.__map(e.shopType[e.shopTypeIndex].productVos,(function(t,n){var s=e.__get_orig(t),o=e.statusIndex!=t.isvalid||t.images?null:e.Img(t.images);return{$orig:s,m0:o}})):null);e._isMounted||(e.e0=function(t,n){var s=arguments[arguments.length-1].currentTarget.dataset,o=s.eventParams||s["event-params"];n=o.data;e.statusIndex=n.isvalid,e.shopTypeIndex=0},e.e1=function(t,n){var s=arguments[arguments.length-1].currentTarget.dataset,o=s.eventParams||s["event-params"];n=o.index;e.shopTypeIndex=n}),e.$mp.data=Object.assign({},{$root:{l0:n}})},a=[]},d789:function(e,t,n){"use strict";var s=n("3995"),o=n.n(s);o.a},e33e:function(e,t,n){"use strict";n.r(t);var s=n("9af7"),o=n("0848");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("d789");var i,u=n("f0c5"),r=Object(u["a"])(o["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],i);t["default"]=r.exports}},[["41e4","common/runtime","common/vendor"]]]);