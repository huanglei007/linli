(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/shopOrder"],{"0424":function(t,e,r){"use strict";var a=r("7ce2"),n=r.n(a);n.a},"14aa":function(t,e,r){"use strict";(function(t){r("56c5"),r("33db");a(r("66fd"));var e=a(r("bef3"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=r,t(e.default)}).call(this,r("543d")["createPage"])},"59f1":function(t,e,r){"use strict";r.r(e);var a=r("a559"),n=r.n(a);for(var i in a)"default"!==i&&function(t){r.d(e,t,(function(){return a[t]}))}(i);e["default"]=n.a},"7ce2":function(t,e,r){},a559:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){r.e("components/changeAddresss").then(function(){return resolve(r("0f15"))}.bind(null,r)).catch(r.oe)},n={components:{changeAddresss:a},data:function(){return{htosp:0,orderMenus:[],orderType:0,addressList:[],address:{},speId:0,ids:"",proType:0,addPicker:!1,preferentialPrice:"",isAdd:!1,totalCount:0,totalPrice:0,actualPrice:0,remarks:"",shopId:0,imageurl:"",onoff:!0,delivery:0}},onLoad:function(e){if(this.htosp=t.getStorageSync("htop"),this.userId=t.getStorageSync("userId"),this.imageurl=this.globalData.imageurl,this.ids=e.id,this.delivery=e.delivery_fee,e.index){var r=JSON.parse(e.index),a=this;this.util.ajax("order/buyNow",r,(function(t){a.actualPrice=t.data.actualPrice,a.address=t.data.address,a.isAdd=t.data.address.name||!1,a.preferentialPrice=t.data.preferentialPrice,a.orderMenus=t.data.productList,a.shopId=t.data.shopId,a.totalCount=t.data.totalCount,a.totalPrice=t.data.totalPrice;var e=a.address.address;3==e.split(" ").length?a.address.address=e.split(" ")[0]+"省"+e.split(" ")[1]+"市"+e.split(" ")[2]:2==e.split(" ").length&&(a.address.address=e.split(" ")[0]+"市"+e.split(" ")[1])}))}},onShow:function(){this.$refs.address&&this.$refs.address.refresh()},methods:{tijao:function(){if(this.isAdd){var e=this;this.util.ajax("order/buyNowConfirmOrder",{addressId:this.address.id,productList:this.orderMenus.map((function(t){return{count:t.count,proId:t.proId}})),remarks:this.remarks,shopId:this.shopId,userId:this.userId},(function(r){var a=4;e.util.ajax("pay/toPay",{orderId:r.data.orderId,orderNum:r.data.orderNum,payType:1,paymentType:a,purpose:1,subject:"商品订单",userId:e.userId},(function(r){t.requestPayment({provider:"wxpay",timeStamp:r.data.timeStamp,nonceStr:r.data.nonceStr,package:r.data.packageValue,signType:"MD5",paySign:r.data.paySign,success:function(t){e.$alert("支付成功"),setTimeout((function(){e.$jumpLa("/pages/user/myOrder/myOrder?type=2")}),1e3)},fail:function(t){e.remark=t,e.$alert("支付失败")}})}))}))}else this.$alert("请输入地址")},countPic:function(t,e){if(1==this.orderType){var r=this;this.util.ajax("shoppingCar/updateShoppingCarCount",{count:e,shoppingCarId:t.shopping_car_id,userId:r.userId},(function(r){t.count=e}))}else t.count=e},order:function(){var t=this;1==this.orderType?this.util.ajax("shoppingCar/updateShoppingCarCount",{count:count,shoppingCarId:item.shoppingCarId,userId:t.userId},(function(t){item.count=count})):item.count=count},changeAdd:function(t){this.address=t,this.isAdd=!0,this.addPicker=!1}}};e.default=n}).call(this,r("543d")["default"])},b738:function(t,e,r){"use strict";var a;r.d(e,"b",(function(){return n})),r.d(e,"c",(function(){return i})),r.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,r=(t._self._c,t.__map(t.orderMenus,(function(e,r){var a=t.__get_orig(e),n=t.Img(e.pro_image.split(",")[0]),i=(e.count*e.pro_price).toFixed(2);return{$orig:a,m0:n,g0:i}}))),a=0==t.proType?Math.floor(t.actualPrice):null,n=0==t.proType?t.actualPrice.toFixed(2).split("."):null;t._isMounted||(t.e0=function(e){t.addPicker=!0},t.e1=function(e){t.addPicker=!1}),t.$mp.data=Object.assign({},{$root:{l0:r,g1:a,g2:n}})},i=[]},bef3:function(t,e,r){"use strict";r.r(e);var a=r("b738"),n=r("59f1");for(var i in n)"default"!==i&&function(t){r.d(e,t,(function(){return n[t]}))}(i);r("0424");var s,d=r("f0c5"),o=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=o.exports}},[["14aa","common/runtime","common/vendor"]]]);