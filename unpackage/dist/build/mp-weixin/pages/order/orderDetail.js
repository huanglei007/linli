(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/orderDetail"],{3829:function(e,t,a){"use strict";a.r(t);var r=a("725e"),o=a("efe6");for(var n in o)"default"!==n&&function(e){a.d(t,e,(function(){return o[e]}))}(n);a("d8f0");var i,d=a("f0c5"),s=Object(d["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=s.exports},"6d5a":function(e,t,a){"use strict";(function(e){a("56c5"),a("33db");r(a("66fd"));var t=r(a("3829"));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=a,e(t.default)}).call(this,a("543d")["createPage"])},"725e":function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return r}));var r={uniEasyinput:function(){return a.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(a.bind(null,"2af2"))}},o=function(){var e=this,t=e.$createElement,a=(e._self._c,9==e.formdata.categoryId||10==e.formdata.categoryId||11==e.formdata.categoryId||15==e.formdata.categoryId||19==e.formdata.categoryId||e.formdata.now_delivery&&0!=e.formdata.now_delivery||!e.formdata.deliveryStartTime&&!e.formdata.startTime||!e.formdata.delivery_date?null:e.formdata.delivery_date.split("-")),r=9==e.formdata.categoryId||10==e.formdata.categoryId||11==e.formdata.categoryId||15==e.formdata.categoryId||19==e.formdata.categoryId||e.formdata.now_delivery&&0!=e.formdata.now_delivery||!e.formdata.deliveryStartTime&&!e.formdata.startTime||!e.formdata.delivery_date?null:e.formdata.delivery_date.split("-"),o=9!=e.formdata.categoryId&&10!=e.formdata.categoryId&&11!=e.formdata.categoryId&&15!=e.formdata.categoryId&&19!=e.formdata.categoryId&&e.imageValue.length?e.__map(e.imageValue,(function(t,a){var r=e.__get_orig(t),o=e.Img(t);return{$orig:r,m0:o}})):null,n=9!=e.formdata.categoryId&&10!=e.formdata.categoryId&&11!=e.formdata.categoryId&&15!=e.formdata.categoryId&&19!=e.formdata.categoryId&&1!=e.formdata.dataStatus&&4!=e.formdata.dataStatus?e.$shijian(e.formdata.order_receiving_time):null;e._isMounted||(e.e0=function(t){e.isMore=!1}),e.$mp.data=Object.assign({},{$root:{g0:a,g1:r,l0:o,m1:n}})},n=[]},a256:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){Promise.all([a.e("common/vendor"),a.e("components/wangding-pickerAddres/wangding-pickerAddress")]).then(function(){return resolve(a("347e"))}.bind(null,a)).catch(a.oe)},o=function(){a.e("pages/order/a_order_detail").then(function(){return resolve(a("ef85"))}.bind(null,a)).catch(a.oe)},n={components:{pickerAddress:r,AOrderDetail:o},data:function(){return{htosp:0,userId:"",imageValue:[],id:0,salesman_number:"",formdata:{},moreComm:"",isMore:!1,userInfo:{},kf_hotline:"",takeNum:0,onoff:!0}},onLoad:function(t){this.htosp=e.getStorageSync("htop"),this.userId=e.getStorageSync("userId"),this.userInfo=e.getStorageSync("userInfo"),t.id&&(this.id=t.id,this.refresh());var a=this;this.util.ajax("aboutUs/info",{},(function(e){a.kf_hotline=e.data.kf_hotline}))},onPullDownRefresh:function(){this.refresh(),setTimeout((function(){e.stopPullDownRefresh()}),1e3)},methods:{preview:function(t){e.previewImage({urls:[this.Img(t)],longPressActions:{itemList:[],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}})},showComm:function(){this.isMore=!0,this.moreComm=""},refresh:function(){var e=this,t=this;this.util.ajax("release/getInfoById",{id:this.id},(function(a){t.formdata=a.data,""!=a.data.images&&(t.imageValue=a.data.images.split(","));var r="",o=[1,3,21];o.indexOf(a.data.categoryId)>-1&&(1==a.data.categoryId?r="release/getExpressNumberList":3==a.data.categoryId?r="release/buyGoodsNumberList":21==a.data.categoryId&&(r="release/deliverTakeoutNumberList"),e.util.ajax(r,{},(function(e){for(var a in e.data.list)e.data.list[a].id==t.formdata.numberId&&(t.takeNum=e.data.list[a].number)})))}))},bindPickerChange:function(e){this.attrIndex=e.target.value},bindTimeChange:function(e){this.time=e.target.value},bindDateChange:function(e){this.date=e.target.value},change:function(e){this.address=e,this.txt=e.data.join("-")},take:function(){var t=this;e.showModal({title:"是否接取该订单",success:function(a){a.confirm?(e.showLoading({title:""}),t.util.ajax("myOrder/saveOrder",{releaseRequirementId:t.id,userId:t.userId},(function(a){e.hideLoading(),a.data.canNotTakeOrders?3==t.userInfo.user_type?t.$alert("商家无法接单"):(t.$alert("接单请先进行达人认证!"),setTimeout((function(e){t.$jump("/pages/index/applyDaren")}),1e3)):(t.$alert("接单成功"),t.refresh())}))):a.cancel&&console.log("用户点击取消")}})},finish:function(){var t=this;e.showModal({title:"是否确认完成订单",success:function(e){e.confirm&&t.util.ajax("myOrder/completeOrder",{releaseRequirementId:t.id,userId:t.userId},(function(e){t.$alert("订单已完成"),t.refresh()}))}})},morecomiss:function(){e.showLoading({title:""});var t=this;t.util.ajax("myOrder/addCommission",{releaseRequirementId:t.id,userId:t.userId,addCommission:t.moreComm},(function(a){var r=4;t.util.ajax("pay/toPay",{orderId:a.data.id,orderNum:a.data.orderNum,payType:1,paymentType:r,purpose:4,subject:"发布需求",userId:t.userId},(function(a){e.requestPayment({provider:"wxpay",timeStamp:a.data.timeStamp,nonceStr:a.data.nonceStr,package:a.data.packageValue,signType:"MD5",paySign:a.data.paySign,success:function(a){e.hideLoading(),t.$alert("支付成功"),setTimeout((function(){t.$jumpLa("/pages/user/myOrder/myOrder?type=0")}),1e3)},fail:function(a){e.hideLoading(),t.remark=a,t.$alert("支付失败")}})}))}))},cancel:function(){var t=this,a="",r={};t.formdata.shop_order_id?(a="order/cancelOrder",r={orderId:t.formdata.shop_order_id,userId:t.userId}):(a="myOrder/cancelOrder",r={releaseRequirementId:t.id,userId:t.userId}),e.showModal({title:"是否取消订单",success:function(){t.util.ajax(a,r,(function(e){t.$alert("订单已取消"),t.refresh(),setTimeout((function(){t.$jumpback()}),1e3)}))}})},talkto:function(e){this.userId!=e?this.$jump("/pages/chat/HM-chat?idse="+e):this.$alert("无法跟自己聊天")},phone:function(t){e.makePhoneCall({phoneNumber:t})},daohang:function(t,a,r){if(this.userId===this.formdata.order_receiving_user_id){e.openLocation({longitude:parseFloat(r),latitude:parseFloat(a),name:t,fail:function(e){console.log(e)}})}}}};t.default=n}).call(this,a("543d")["default"])},d8f0:function(e,t,a){"use strict";var r=a("dd7b"),o=a.n(r);o.a},dd7b:function(e,t,a){},efe6:function(e,t,a){"use strict";a.r(t);var r=a("a256"),o=a.n(r);for(var n in r)"default"!==n&&function(e){a.d(t,e,(function(){return r[e]}))}(n);t["default"]=o.a}},[["6d5a","common/runtime","common/vendor"]]]);