(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/from/currency"],{"240f":function(e,t,n){"use strict";(function(e){n("56c5"),n("33db");a(n("66fd"));var t=a(n("e4bc"));function a(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"79fe":function(e,t,n){"use strict";n.r(t);var a=n("b85d"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},b85d:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){n.e("components/changeAddresss").then(function(){return resolve(n("0f15"))}.bind(null,n)).catch(n.oe)},i={components:{pickerAddress:a},data:function(){return{imageurl:"",htosp:0,userId:"",imageValue:[],buyAdd:{},isAddress:!1,addIndex:"buyAdd",cateList:[],cateIndex:0,formdata:{categoryId:6,publisherName:"",publisherSex:0,leaveMessage:"",publisherPhone:"",commission:null},disable:!1,couponform:{},couponlist:[],commission:null}},onShow:function(){this.$refs.add&&this.$refs.add.refresh();var t=this;e.$on("couponChange",(function(e){t.couponform=e,t.commission=t.formdata.commission-e.amount}))},onLoad:function(t){this.htosp=e.getStorageSync("htop"),this.userId=e.getStorageSync("userId"),this.imageurl=this.globalData.imageurl;var n=this;this.util.ajax("release/categoryList",{otherCategory:!0},(function(e){n.cateList=e.data.list}))},methods:{cancel:function(){this.isAddress=!1},bindPickerChange:function(e){this.cateIndex=e.target.value},bindDateChange:function(e){this.date=e.target.value},changeAdd:function(e){this.buyAdd=e,this.isAddress=!1},addImg:function(){this.util.sendimage(5-this.imageValue.length,this.imageValue)},del:function(e){this.imageValue.splice(e,1)},commissionChange:function(e){this.commission=e,this.getRun()},getRun:function(){var t=this,n=this;this.util.ajax("release/errandCouponList",{curPage:1,pageSize:15,userId:e.getStorageSync("userId")},(function(e){t.couponlist=[];for(var a=0;a<e.data.coupon.length;a++)n.formdata.commission>=e.data.coupon[a].min_order_amount&&0==e.data.coupon[a].use_status&&n.couponlist.push(e.data.coupon[a])}))},selectEvent:function(){var e=this;e.couponform.amount?this.$jump("/pagesA/a_myWelfare?price="+this.formdata.commission+"&id="+e.couponform.id):this.couponlist.length>0&&this.$jump("/pagesA/a_myWelfare?price="+this.formdata.commission)},nextStep:function(){if(!this.disable){if(this.disable=!0,!this.buyAdd.address)return this.$alert("请选择取件地址"),void(this.disable=!1);var t=this;this.$refs.form.validate().then((function(n){e.showLoading({title:"正在加载",mask:!0});var a=n;a.publisherName=t.buyAdd.name,a.publisherPhone=t.buyAdd.phone,a.categoryId=t.formdata.categoryId,a.publisherSex=t.formdata.publisherSex,a.leaveMessage=t.formdata.leaveMessage,a.categoryId=t.cateList[t.cateIndex].id,a.images=t.imageValue.join(),a.addressId=t.buyAdd.id,a.userId=t.userId,t.util.ajax("release/saveRelease",a,(function(n){var a=4;t.util.ajax("pay/toPay",{orderNum:n.data.orderNum,payType:1,paymentType:a,purpose:2,subject:"发布需求",userId:t.userId},(function(n){e.hideLoading(),e.requestPayment({provider:"wxpay",timeStamp:n.data.timeStamp,nonceStr:n.data.nonceStr,package:n.data.packageValue,signType:"MD5",paySign:n.data.paySign,success:function(e){t.$alert("支付成功"),t.disable=!1,setTimeout((function(){t.$jumpLa("/pages/user/myOrder/myOrder?type=0")}),1e3)},fail:function(e){t.remark=e,t.$alert("支付失败"),t.disable=!1}})}))}))})).catch((function(e){t.disable=!1}))}}}};t.default=i}).call(this,n("543d")["default"])},e069:function(e,t,n){},e4bc:function(e,t,n){"use strict";n.r(t);var a=n("f1f7"),i=n("79fe");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("eb6d");var s,u=n("f0c5"),r=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);t["default"]=r.exports},eb6d:function(e,t,n){"use strict";var a=n("e069"),i=n.n(a);i.a},f1f7:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var a={uniForms:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(n.bind(null,"d623"))},uniFormsItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(n.bind(null,"b7ed"))},uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"2af2"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.imageValue,(function(t,n){var a=e.__get_orig(t),i=e.Img(t);return{$orig:a,m0:i}})));e._isMounted||(e.e0=function(t){e.addIndex="buyAdd",e.isAddress=!0}),e.$mp.data=Object.assign({},{$root:{l0:n}})},o=[]}},[["240f","common/runtime","common/vendor"]]]);