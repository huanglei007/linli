(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/from/get"],{1209:function(e,t,i){"use strict";i.r(t);var n=i("f15d"),a=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a},4864:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var n={uniForms:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(i.bind(null,"d623"))},uniFormsItem:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(i.bind(null,"b7ed"))},uniEasyinput:function(){return i.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(i.bind(null,"2af2"))}},a=function(){var e=this,t=e.$createElement,i=(e._self._c,e.__map(e.imageValue,(function(t,i){var n=e.__get_orig(t),a=e.Img(t);return{$orig:n,m0:a}})));e._isMounted||(e.e0=function(t,i){var n=arguments[arguments.length-1].currentTarget.dataset,a=n.eventParams||n["event-params"];i=a.i;e.typeIndex=i},e.e1=function(t){e.addIndex="buyAdd",e.isAddress=!0},e.e2=function(t){e.addIndex="sentAdd",e.isAddress=!0}),e.$mp.data=Object.assign({},{$root:{l0:i}})},s=[]},"5c7a":function(e,t,i){},da78:function(e,t,i){"use strict";var n=i("5c7a"),a=i.n(n);a.a},dbf4:function(e,t,i){"use strict";i.r(t);var n=i("4864"),a=i("1209");for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);i("da78");var d,r=i("f0c5"),o=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],d);t["default"]=o.exports},f15d:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){i.e("components/timeRange").then(function(){return resolve(i("a43a"))}.bind(null,i)).catch(i.oe)},a=function(){i.e("components/changeAddresss").then(function(){return resolve(i("0f15"))}.bind(null,i)).catch(i.oe)},s={components:{pickerAddress:a,timePicker:n},data:function(){return{htosp:0,buyAdd:{},sentAdd:{},typeIndex:0,typeList:["帮送","帮取"],isAddress:!1,addIndex:"buyAdd",imageValue:[],cateList:[{name:"请选择物品类别",id:0}],cateIndex:0,timeTxt:"请选择配送时间",size:[{size_evaluation:"请选择预估大小",id:0}],sizeIndex:0,otherSize:["","",""],formdata:{categoryId:4,publisherSex:0,leaveMessage:"",deliveryStartTime:"",deliveryEndTime:"",publisherName:"",publisherPhone:"",senderName:"",senderPhone:"",senderSex:0,commission:"",goodsSize:"",goodsWeight:"",specialDelivery:0,delivery_date:""},disable:!1,onoff:!0}},mounted:function(){this.htosp=e.getStorageSync("htop"),this.userId=e.getStorageSync("userId"),this.formdata.startTime=this.$shijianhour((new Date).getTime()+36e5),this.formdata.endTime=this.$shijianhour((new Date).getTime()+72e5);var t=this;this.util.ajax("release/getSendGoodsCategoryList",{},(function(e){t.cateList=t.cateList.concat(e.data.list)})),this.util.ajax("release/sizeEvaluationList",{},(function(e){t.size=t.size.concat(e.data.list)}))},methods:{cancel:function(){this.isAddress=!1},bindPickerChange:function(e){this.cateIndex=e.target.value},bindPickerChange2:function(e){this.sizeIndex=e.target.value,this.$forceUpdate()},bindTimeChange:function(e){this.formdata.startTime=e.star,this.formdata.endTime=e.end,this.timeTxt=e.text,this.formdata.delivery_date=e.date},changeAdd:function(e){this[this.addIndex]=e,this.isAddress=!1},addImg:function(){this.util.sendimage(5-this.imageValue.length,this.imageValue)},del:function(e){this.imageValue.splice(e,1)},submit:function(){var t=this;if(!this.disable){if(this.disable=!0,!this.buyAdd.address)return this.$alert("请选择取件地址"),void(this.disable=!1);if(!this.sentAdd.address)return this.$alert("请选择送货地址"),void(this.disable=!1);if("请选择配送时间"==this.timeTxt)return this.$alert("请选择配送时间"),void(this.disable=!1);if(!this.formdata.commission)return this.$alert("请输入佣金"),void(this.disable=!1);if(!this.cateIndex)return this.$alert("请选择商品类别"),void(this.disable=!1);if(!this.formdata.goodsWeight)return this.$alert("请输入预估重量"),void(this.disable=!1);if(!this.sizeIndex)return this.$alert("请选择预估大小"),void(this.disable=!1);var i=this;this.$refs.form.validate().then((function(n){e.showLoading({title:""});var a=n;a.publisherName=0==i.typeIndex?i.buyAdd.name:i.sentAdd.name,a.publisherPhone=0==i.typeIndex?i.buyAdd.phone:i.sentAdd.phone,a.senderName=0==i.typeIndex?i.sentAdd.name:i.buyAdd.name,a.senderPhone=0==i.typeIndex?i.sentAdd.phone:i.buyAdd.phone,a.getAndSendType=i.typeIndex+1,4!==t.size[t.sizeIndex].id?a.goodsSize=t.size[t.sizeIndex].size_evaluation:a.goodsSize=t.otherSize.join("cm*")+"cm",a.goodsCategoryId=t.cateList[t.cateIndex].id,a.startTime=i.formdata.startTime,a.endTime=i.formdata.endTime,a.delivery_date=i.formdata.delivery_date,a.categoryId=i.formdata.categoryId,a.publisherSex=i.formdata.publisherSex,a.appointShop=i.formdata.appointShop,a.leaveMessage=i.formdata.leaveMessage,a.images=i.imageValue.join(),a.addressId=i.buyAdd.id,a.addressId2=i.sentAdd.id,a.userId=i.userId,console.log(a),i.util.ajax("release/saveRelease",a,(function(t){var n=4;i.util.ajax("pay/toPay",{orderId:t.data.id,orderNum:t.data.orderNum,payType:1,paymentType:n,purpose:2,subject:"发布需求",userId:i.userId},(function(t){e.hideLoading(),e.requestPayment({provider:"wxpay",timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.packageValue,signType:"MD5",paySign:t.data.paySign,success:function(e){i.$alert("支付成功"),i.disable=!1,setTimeout((function(){i.$jumpLa("/pages/user/myOrder/myOrder?type=0")}),1e3)},fail:function(e){i.remark=e,i.$alert("支付失败"),i.disable=!1}})}))}))})).catch((function(e){console.log("表单错误信息：",e),i.disable=!1}))}},refresh:function(){this.isAddress&&this.$refs.add.refresh()}}};t.default=s}).call(this,i("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/from/get-create-component',
    {
        'pages/from/get-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("dbf4"))
        })
    },
    [['pages/from/get-create-component']]
]);
