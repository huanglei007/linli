(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/a_shop"],{"0cea":function(e,t,i){"use strict";(function(e){i("56c5"),i("33db");n(i("66fd"));var t=n(i("4630"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=i,e(t.default)}).call(this,i("543d")["createPage"])},4630:function(e,t,i){"use strict";i.r(t);var n=i("a72f"),a=i("9d20");for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);i("6cea");var o,r=i("f0c5"),u=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=u.exports},"6cea":function(e,t,i){"use strict";var n=i("d40f"),a=i.n(n);a.a},"9d20":function(e,t,i){"use strict";i.r(t);var n=i("d0d5"),a=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a},a72f:function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,i=(e._self._c,e.form.shop_logo?null:e.Img(e.imageValue_logo[0])),n=""!=e.form.business_license&&e.form.business_license?e.Img(e.form.business_license):null,a=""==e.form.business_license||e.form.business_license?null:e.Img(e.imageValue_license[0]);e._isMounted||(e.e0=function(t){e.hoursShow=!0},e.e1=function(t){e.hoursShow=!1},e.e2=function(t){e.hoursShow=!1}),e.$mp.data=Object.assign({},{$root:{m0:i,m1:n,m2:a}})},s=[]},d0d5:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={components:{},data:function(){return{imageurl:"",userId:"",form:{},imageValue_logo:[],imageValue_license:[],shopType:[{icon:"",id:0,name:"",parentId:0}],typeIndex:0,shopStatus:[{label:"休息",business_status:0},{label:"营业",business_status:1}],hoursShow:!1,businessHours:["开始时间","结束时间"],timeVal_start:[9,9],timeVal_end:[15,15],operation:[],operationIndex:0,deposit_index:0,deposit_arr:[{text:"不交押金",value:"0"},{text:"交押金",value:"1"}],deposit_array_index:0,deposit_array:[],onoff:!0,examine:!0,examine_s:null,phoneInput:!1,phoneInput_focus:!1}},onLoad:function(){this.getTypeList(),this.getOperation(),this.userId=e.getStorageSync("userId"),this.imageurl=this.globalData.imageurl},computed:{newAddRuleForm:function(){return JSON.parse(JSON.stringify(this.form))}},watch:{imageValue:function(e,t){this.form.shop_logo=this.Img(e[0])},imageValue_license:function(e,t){e[0]?this.form.business_license=this.Img(e[0]):this.form.business_license=""},form:{handler:function(e,t){},deep:!0},newAddRuleForm:{handler:function(e,t){var i=this;void 0!=t.id&&(e.business_status!=t.business_status||e.service_begin_time!=t.service_begin_time||e.service_end_time!=t.service_end_time||e.initial_delivery_fee!=t.initial_delivery_fee||e.service_content!=t.service_content||e.service_process!=t.service_process||e.service_guarantee!=t.service_guarantee?i.examine=!1:(i.examine=!0,i.examine_s=!0))},deep:!0}},methods:{getTypeList:function(){var e=this;this.util.ajax("shop/getShopTypeList",{parentId:0,secondType:1},(function(t){e.shopType=t.data.list,e.getMyShop()}))},getMyShop:function(){var e=this,t=this;this.util.ajax("shop/getShopInfo",{userId:t.userId},(function(i){t.form=i.data;var n=i.data.initial_delivery_fee;n&&0!=n||(t.form.initial_delivery_fee=20),t.timeVal_start=i.data.service_begin_time.split(":").map((function(e){return e/1})),t.timeVal_end=i.data.service_end_time.split(":").map((function(e){return e/1})),i.data.deposit_amount>0&&(t.deposit_index="1",e.util.ajax("shop/queryShopDepositSet",{},(function(e){t.deposit_array=e.data.list;for(var i=0;i<e.data.list.length;i++)t.form.deposit_amount==e.data.list[i].amount&&(t.deposit_array_index=i)})));for(var a=0;a<t.shopType.length;a++)i.data.shop_sub_type_id==t.shopType[a].id&&(t.typeIndex=a);for(var s in t.operation)t.operation[s].id==i.data.operation_point_id&&(t.operationIndex=s)}))},saveEvent:function(){var t=this,i=this;0==i.examine&&1!=i.examine_s?(this.notExamine(),this.$alert("审核成功"),setTimeout((function(){i.$jumpback()}),1e3)):this.util.ajax("shop/saveShopSet",i.form,(function(n){500!=n.statusCode&&(0==i.examine&&t.notExamine(),"1"==i.deposit_index&&0==i.form.deposit_amount?t.util.ajax("shop/submitShopDepositOrder",{amount:i.deposit_array[i.deposit_array_index].amount,userId:i.userId},(function(t){var n=4;i.util.ajax("pay/toPay",{orderNum:t.data.order_num,payType:1,paymentType:n,purpose:5,subject:"押金",userId:i.userId},(function(t){e.hideLoading(),e.requestPayment({provider:"wxpay",timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.packageValue,signType:"MD5",paySign:t.data.paySign,success:function(e){i.$alert("提交成功"),setTimeout((function(){i.$jumpback()}),1e3)},fail:function(e){i.$alert("支付失败")}})}))})):(t.$alert("提交成功,请等待审核"),setTimeout((function(){i.$jumpback()}),1e3)))}))},getOperation:function(){var e=this;this.util.ajax("common/operationPointList",{},(function(t){e.operation=t.data.list}))},shopTypeChange:function(e){var t=this;t.typeIndex=e.detail.value,t.form.shop_sub_type_id=t.shopType[e.detail.value].id},operationChange:function(e){var t=this;t.operationIndex=e.detail.value,t.form.operation_point_id=t.operation[t.operationIndex].id},inputchange:function(e,t){var i=this;"contact_phone"==t&&(i.form.contact_phone=e.target.value)},phoneClick:function(e){var t=this;t.phoneInput=e,t.phoneInput_focus=e},radioChange:function(e){var t=this;t.deposit_index=e.detail.value,"1"==e.detail.value&&this.util.ajax("shop/queryShopDepositSet",{},(function(e){t.deposit_array=e.data.list}))},depositChange:function(e){this.deposit_array_index=e.detail.value},returnDeposit:function(){var t=this;e.showModal({title:"",content:"确认退还押金吗?",success:function(e){e.confirm?t.util.ajax("shop/submitShopDepositRefund",{amount:t.form.deposit_amount,userId:t.form.user_id},(function(e){t.$alert("已提交申请，请等待审核")})):e.cancel&&console.log("用户点击取消")}})},notExamine:function(){var e=this;this.util.ajax("shop/editShopStatus",{business_status:e.form.business_status+1,initial_delivery_fee:e.form.initial_delivery_fee,service_content:e.form.service_content,service_process:e.form.service_process,service_guarantee:e.form.service_guarantee,service_begin_time:e.form.service_begin_time,service_end_time:e.form.service_end_time,user_id:e.userId},(function(e){}))},shopStatusChange:function(e){var t=this;t.form.business_status=t.shopStatus[e.detail.value].business_status},bindChange_start:function(e){var t=this;t.timeVal_start=e.detail.value},bindChange_end:function(e){var t=this;t.timeVal_end=e.detail.value},confirmEvent:function(e){var t=this,i=this.timeVal_start,n=i[0]<10?"0"+i[0]:String(i[0]),a=i[1]<10?"0"+i[1]:String(i[1]),s=this.timeVal_end,o=s[0]<10?"0"+s[0]:String(s[0]),r=s[1]<10?"0"+s[1]:String(s[1]);t.form.service_begin_time=n+":"+a,t.form.service_end_time=o+":"+r,t.hoursShow=!1},updateImg:function(e){"logo"==e?this.util.sendimage(5-this.imageValue_logo.length,this.imageValue_logo):"license"==e&&this.util.sendimage(5-this.imageValue_license.length,this.imageValue_license)},delImg:function(e){this.form.business_license="",this.imageValue_license[0]&&this.imageValue_license.splice(0,1)},doBusiness:function(){var t=this,i=this.form.business_license,n=[];n.push(t.imageurl+i),e.previewImage({current:n[0],urls:n})},relieve:function(){var t=this;e.showModal({title:"提示",content:"确定解除合作吗",cancelText:"取消",confirmText:"确认",success:function(e){e.confirm?t.$alert("请于运营点联系解除合作事宜！"):e.cancel&&console.log("用户点击取消")}})}}};t.default=i}).call(this,i("543d")["default"])},d40f:function(e,t,i){}},[["0cea","common/runtime","common/vendor"]]]);