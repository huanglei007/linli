(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/from/book"],{5896:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){n.e("components/changeAddresss").then(function(){return resolve(n("0e9b"))}.bind(null,n)).catch(n.oe)},s={components:{pickerAddress:i},data:function(){return{htosp:0,userId:"",imageurl:"",imageValue:[],buyAdd:{},isAddress:!1,addIndex:"buyAdd",cateList:[{name:"请选择交易方式",id:0}],cateIndex:0,shopList:[{operation_point_name:"请选择运营点",id:0}],shopIndex:0,formdata:{categoryId:6,publisherName:"",publisherSex:0,leaveMessage:"",publisherPhone:"",sellingPrice:"",commission:"",goodsSize:"",goodsWeight:"",specialDelivery:0}}},onShow:function(){this.$refs.add&&this.$refs.add.refresh()},onLoad:function(t){this.htosp=e.getStorageSync("htop"),this.userId=e.getStorageSync("userId");var n=this;this.util.ajax("common/transactionModeList",{},(function(e){n.cateList=n.cateList.concat(e.data.list)})),this.util.ajax("common/operationPointList",{},(function(e){n.shopList=n.shopList.concat(e.data.list)}))},methods:{cancel:function(){this.isAddress=!1},bindPickerChange:function(e){console.log("picker发送选择改变，携带值为",e.target.value),this.cateIndex=e.target.value},bindPickerChange2:function(e){console.log("picker发送选择改变，携带值为",e.target.value),this.shopIndex=e.target.value},bindDateChange:function(e){this.date=e.target.value},changeAdd:function(e){this[this.addIndex]=e,this.isAddress=!1},addImg:function(){this.util.sendimage(5-this.imageValue.length,this.imageValue)},del:function(e){this.imageValue.splice(e,1)},nextStep:function(){if(this.buyAdd.address)if(0!=this.cateIndex)if(this.cateList.length&&2==this.cateList[this.cateIndex].id&&0==this.shopIndex)this.$alert("请选择运营点");else{var t=this;this.$refs.form.validate().then((function(n){e.showLoading({title:""});var i=n;i.publisherName=t.buyAdd.name,i.publisherPhone=t.buyAdd.phone,i.categoryId=t.formdata.categoryId,i.publisherSex=t.formdata.publisherSex,i.leaveMessage=t.formdata.leaveMessage,i.transactionModeId=t.cateList[t.cateIndex].id,i.js_operation_point_id=t.shopList[t.shopIndex].id,i.images=t.imageValue.join(),i.addressId=t.buyAdd.id,i.userId=t.userId,t.util.ajax("release/saveRelease",i,(function(n){e.hideLoading(),t.$alert("发布成功"),setTimeout((function(){t.$jumpLa("/pages/user/myOrder/myOrder?type=0")}),1e3)}))})).catch((function(e){console.log("表单错误信息：",e)}))}else this.$alert("请选择交易方式");else this.$alert("请选择取件地址")}}};t.default=s}).call(this,n("543d")["default"])},7366:function(e,t,n){"use strict";var i=n("f80b"),s=n.n(i);s.a},"7fd3":function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var i={uniForms:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(n.bind(null,"5680"))},uniFormsItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(n.bind(null,"99f4"))},uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"7276"))}},s=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.imageValue,(function(t,n){var i=e.__get_orig(t),s=e.Img(t);return{$orig:i,m0:s}})));e._isMounted||(e.e0=function(t){e.addIndex="buyAdd",e.isAddress=!0}),e.$mp.data=Object.assign({},{$root:{l0:n}})},a=[]},"998b":function(e,t,n){"use strict";n.r(t);var i=n("5896"),s=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=s.a},e014:function(e,t,n){"use strict";(function(e){n("a943"),n("33db");i(n("66fd"));var t=i(n("ed96"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},ed96:function(e,t,n){"use strict";n.r(t);var i=n("7fd3"),s=n("998b");for(var a in s)"default"!==a&&function(e){n.d(t,e,(function(){return s[e]}))}(a);n("7366");var o,u=n("f0c5"),d=Object(u["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=d.exports},f80b:function(e,t,n){}},[["e014","common/runtime","common/vendor"]]]);