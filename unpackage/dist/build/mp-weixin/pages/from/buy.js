(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/from/buy"],{"1fb7":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return a}));var a={uniForms:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(n.bind(null,"d623"))},uniFormsItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(n.bind(null,"b7ed"))},uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"2af2"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.imageValue,(function(t,n){var a=e.__get_orig(t),i=e.Img(t);return{$orig:a,m0:i}})));e._isMounted||(e.e0=function(t){e.addIndex="buyAdd",e.isAddress=!0},e.e1=function(t){e.addIndex="sentAdd",e.isAddress=!0},e.e2=function(t){e.formdata.appointShop=1},e.e3=function(t){e.formdata.appointShop=0}),e.$mp.data=Object.assign({},{$root:{l0:n}})},s=[]},2950:function(e,t,n){"use strict";var a=n("c642"),i=n.n(a);i.a},"34ea1":function(e,t,n){"use strict";(function(e){function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){n.e("components/changeAddresss").then(function(){return resolve(n("0f15"))}.bind(null,n)).catch(n.oe)},s={components:{pickerAddress:i},data:function(){return{htosp:0,imageValue:[],isAddress:!1,addIndex:"buyAdd",buyAdd:{},sentAdd:{},formdata:{categoryId:3,publisherName:"",goodsValuation:"",appointShop:0,publisherSex:0,goodsName:"",leaveMessage:"",commission:"",publisherPhone:""},disable:!1,takeParts:[{commission:0,id:0,number:"请选择商品种类数量"}],take_index:0,onoff:!0}},mounted:function(){this.htosp=e.getStorageSync("htop"),this.userId=e.getStorageSync("userId");var t=this;this.util.ajax("release/buyGoodsNumberList",{},(function(e){t.takeParts=t.takeParts.concat(e.data.list)}))},methods:a({refresh:function(){this.formdata={categoryId:3,publisherName:"",goodsValuation:"",appointShop:0,publisherSex:0,goodsName:"",leaveMessage:"",commission:"",publisherPhone:""}},cancel:function(){this.isAddress=!1},bindDateChange:function(e){this.date=e.target.value},getAdd:function(e){this[this.addIndex]=e},change:function(e){this.address=e,this.txt=e.data.join("-")},changeAdd:function(e){this[this.addIndex]=e,this.isAddress=!1},addImg:function(){this.util.sendimage(5-this.imageValue.length,this.imageValue)},del:function(e){this.imageValue.splice(e,1)},bindPickerChange:function(e){var t=this;t.take_index=e.target.value,t.formdata.commission=t.takeParts[e.target.value].commission},submit:function(){if(!this.disable){if(this.disable=!0,!this.sentAdd.address)return this.$alert("请选择送货地址"),void(this.disable=!1);if(0==this.take_index)return this.$alert("请选择商品种类数量"),void(this.disable=!1);if(!this.formdata.goodsName)return this.$alert("请输入商品名称"),void(this.disable=!1);if(!this.formdata.goodsValuation)return this.$alert("请输入商品估价"),void(this.disable=!1);var t=this;this.$refs.form.validate().then((function(n){e.showLoading({title:""});var a=n;a.publisherName=t.sentAdd.name,a.publisherPhone=t.sentAdd.phone,a.categoryId=t.formdata.categoryId,a.goodsName=t.formdata.goodsName,a.publisherSex=t.formdata.publisherSex,a.appointShop=t.formdata.appointShop,a.leaveMessage=t.formdata.leaveMessage,a.numberId=t.takeParts[t.take_index].id,a.images=t.imageValue.join(),a.addressId=t.buyAdd.id,a.addressId2=t.sentAdd.id,a.commission=t.formdata.commission,a.userId=t.userId,t.util.ajax("release/saveRelease",a,(function(n){var a=4;t.util.ajax("pay/toPay",{orderId:n.data.id,orderNum:n.data.orderNum,payType:1,paymentType:a,purpose:2,subject:"发布需求",userId:t.userId},(function(n){e.hideLoading(),e.requestPayment({provider:"wxpay",timeStamp:n.data.timeStamp,nonceStr:n.data.nonceStr,package:n.data.packageValue,signType:"MD5",paySign:n.data.paySign,success:function(e){t.$alert("支付成功"),t.disable=!1,setTimeout((function(){t.$jump("/pages/user/myOrder/myOrder?type=0")}),1e3)},fail:function(e){t.remark=e,t.$alert("支付失败"),t.disable=!1}})}))}))})).catch((function(e){console.log("表单错误信息：",e),t.disable=!1}))}}},"refresh",(function(){this.isAddress&&this.$refs.add.refresh()}))};t.default=s}).call(this,n("543d")["default"])},"42c3":function(e,t,n){"use strict";n.r(t);var a=n("1fb7"),i=n("d6d9");for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);n("2950");var o,d=n("f0c5"),r=Object(d["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=r.exports},c642:function(e,t,n){},d6d9:function(e,t,n){"use strict";n.r(t);var a=n("34ea1"),i=n.n(a);for(var s in a)"default"!==s&&function(e){n.d(t,e,(function(){return a[e]}))}(s);t["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/from/buy-create-component',
    {
        'pages/from/buy-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("42c3"))
        })
    },
    [['pages/from/buy-create-component']]
]);
