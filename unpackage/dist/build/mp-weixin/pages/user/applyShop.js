(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/applyShop"],{"0014":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.imageValue,(function(e,i){var a=t.__get_orig(e),n=t.Img(e);return{$orig:a,m0:n}})));t.$mp.data=Object.assign({},{$root:{l0:i}})},o=[]},"0b20":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){i.e("components/timePicker").then(function(){return resolve(i("c0ce"))}.bind(null,i)).catch(i.oe)},n=function(){Promise.all([i.e("common/vendor"),i.e("components/wangding-pickerAddres/wangding-pickerAddress")]).then(function(){return resolve(i("8952"))}.bind(null,i)).catch(i.oe)},o={components:{pickerAddress:n,timePicker:a},data:function(){var t=6,e=t+1;return{imageurl:"",userId:"",htosp:0,imageValue:[],typeList:[],typeIndex:0,saleType:[],saleIndex:0,operation:[],operationIndex:0,starTime:t,starTime2:e,location:{point:{longitude:22.22222,latitude:22.22222},address:"请选择地图定位",name:"请选择地图定位"},geted:!1,formdata:{shopName:"",contactName:"",contactPhone:"",houseNumber:"",serviceBeginTime:"08:00",serviceEndTime:"21:00"},deposit_index:0,deposit_arr:[{text:"不交押金",value:"0"},{text:"交押金",value:"1"}],deposit_array_index:0,deposit_array:[],onoff:!0}},onShow:function(){var e=this;t.$once("location",(function(t){e.location=t}))},onLoad:function(){this.htosp=t.getStorageSync("htop"),this.userId=t.getStorageSync("userId"),this.imageurl=this.globalData.imageurl,this.getShopType(0),this.getShopType(1),this.getOperation()},methods:{getShopType:function(t){var e=this;this.util.ajax("shop/getShopTypeList",{parentId:0,secondType:t},(function(i){0==t?e.typeList=i.data.list:e.saleType=i.data.list}))},getOperation:function(){var t=this;this.util.ajax("common/operationPointList",{},(function(e){t.operation=t.operation.concat(e.data.list)}))},radioChange:function(t){var e=this;e.deposit_index=t.detail.value,"1"==t.detail.value&&this.util.ajax("shop/queryShopDepositSet",{},(function(t){e.deposit_array=t.data.list}))},depositChange:function(t){this.deposit_array_index=t.detail.value},inputchange:function(t,e){var i=this;"contactPhone"==e&&(i.formdata.contactPhone=t.detail.value)},bindPickerChange2:function(t){this.typeIndex=t.target.value},bindPickerChange3:function(t){this.saleIndex=t.target.value},bindPickerChange4:function(t){this.operationIndex=t.target.value},bindTimeChange:function(t){this.formdata.serviceBeginTime=t,this.updatestarTime()},updatestarTime:function(){var t=this.formdata.serviceBeginTime.split(":");this.starTime2=parseInt(t[0])+1,parseInt(this.formdata.serviceEndTime.split(":")[0])<=this.starTime2&&(this.formdata.serviceEndTime=this.starTime2+":00"),this.$forceUpdate()},bindTimeChange2:function(t){this.formdata.serviceEndTime=t},onChooseLocation:function(){t.navigateTo({url:"/pages/chooselocation/index"})},onChooseLocation2:function(){var e=this;t.getLocation({type:"gcj02",geocode:!0,success:function(i){t.chooseLocation({latitude:i.latitude,longitude:i.longitude,keyword:i.address?i.address.city+i.address.district+i.address.street:"",success:function(t){e.geted=!0,e.location={point:{longitude:t.longitude,latitude:t.latitude},address:t.address,name:t.name}}})},fail:function(t){plus.nativeUI.toast("读取当前地理位置失败")}})},addImg:function(){this.util.sendimage(1-this.imageValue.length,this.imageValue)},del:function(t){this.imageValue.splice(t,1)},apply:function(){if(""!=this.formdata.shopName)if(this.location.address)if(""!=this.formdata.houseNumber)if(""!=this.formdata.contactName)if(""!=this.formdata.contactPhone)if(0!=this.imageValue.length){var e=this.formdata;e.address=this.location.address,e.businessLicense=this.imageValue[0],e.contactName=this.formdata.contactName,e.contactPhone=this.formdata.contactPhone,e.houseNumber=this.formdata.houseNumber,e.latitude=this.location.point.latitude,e.longitude=this.location.point.longitude,e.operationPointId=this.operation[this.operationIndex].id,e.serviceBeginTime=this.formdata.serviceBeginTime,e.serviceEndTime=this.formdata.serviceEndTime,e.shopName=this.formdata.shopName,e.shopSubTypeId=this.saleType[this.saleIndex].id,e.shopTypeId=this.typeList[this.typeIndex].id,e.userId=this.userId,t.showLoading({title:""});var i=this;i.util.ajax("shop/saveShopSettled",e,(function(e){"1"==i.deposit_index?i.util.ajax("shop/submitShopDepositOrder",{amount:i.deposit_array[i.deposit_array_index].amount,userId:i.userId},(function(e){var a=4;i.util.ajax("pay/toPay",{orderNum:e.data.order_num,payType:1,paymentType:a,purpose:5,subject:"押金",userId:i.userId},(function(e){t.hideLoading(),t.requestPayment({provider:"wxpay",timeStamp:e.data.timeStamp,nonceStr:e.data.nonceStr,package:e.data.packageValue,signType:"MD5",paySign:e.data.paySign,success:function(t){i.$alert("提交成功"),setTimeout((function(){i.$jumpback()}),1e3)},fail:function(t){i.$alert("支付失败")}})}))})):(i.$alert("提交成功"),setTimeout((function(){i.$jumpback()}),1e3))}))}else this.$alert("请上传营业执照");else this.$alert("请输入联系人电话");else this.$alert("请输入联系人姓名");else this.$alert("请输入店铺门牌号");else this.$alert("请选择地址");else this.$alert("请输入店铺名称")}}};e.default=o}).call(this,i("543d")["default"])},"87f8":function(t,e,i){"use strict";i.r(e);var a=i("0b20"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},a4e7:function(t,e,i){},b5f7:function(t,e,i){"use strict";i.r(e);var a=i("0014"),n=i("87f8");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("ddb9");var s,r=i("f0c5"),d=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=d.exports},ddb9:function(t,e,i){"use strict";var a=i("a4e7"),n=i.n(a);n.a},f59c:function(t,e,i){"use strict";(function(t){i("a943"),i("33db");a(i("66fd"));var e=a(i("b5f7"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])}},[["f59c","common/runtime","common/vendor"]]]);