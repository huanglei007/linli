(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/a_peihu_yuyue"],{1520:function(e,t,n){"use strict";var i=n("1d46"),a=n.n(i);a.a},"1d46":function(e,t,n){},"200f":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{typelist:[{category_name:"陪护",id:1},{category_name:"看病",id:2}],index:0,placelist:["室内","室外"],placeIndex:null,agelist:[],ageIndex:null,timelist:[{accompany_time:"",id:0,price:0,type:0}],timeIndex:null,form:{accompany_age:"",accompany_place:"",accompany_sex:0,accompany_time_id:0,address:"",categoryId:19,commission:0,contact_name:"",contact_phone:"",coupon_amount:0,coupon_id:0,end_time:"",handover_mode:0,latitude:"",longitude:"",remark:"",service_item:1,service_object_age:0,service_object_name:"",service_object_relation:"",service_object_sex:0,service_object_symptom:"",start_time:"",userId:0},upAddressId:null,objform:{service_object_age:null,service_object_name:"",service_object_relation:"",service_object_sex:0,service_object_symptom:""},price:0}},onLoad:function(){this.getTimeList(),this.getAgeList(),this.form.userId=e.getStorageSync("userId")},onShow:function(){var t=this;e.$on("upAddressData",(function(e){t.upAddressId=e})),e.$on("upObjData",(function(e){t.objform=e,t.form.service_object_age=e.service_object_age,t.form.service_object_name=e.service_object_name,t.form.service_object_relation=e.service_object_relation,t.form.service_object_sex=e.service_object_sex,t.form.accompany_sex=e.service_object_sex,t.form.service_object_symptom=e.service_object_symptom;for(var n=e.service_object_age,i=0;i<t.agelist.length;i++)n>t.agelist[i].age.split("-")[0]&&n<t.agelist[i].age.split("-")[1]&&(t.ageIndex=i,t.form.accompany_age=t.agelist[i].age)}))},watch:{timeIndex:function(e,t){this.price=this.timelist[e].price}},methods:{getTimeList:function(){var e=this;this.util.ajax("personalDemand/accompanyingDoctorTime",{type:this.typelist[this.index].id},(function(t){e.timelist=t.data.list}))},getAgeList:function(){var e=this;this.util.ajax("personalDemand/accompanyingDoctorAge",{type:this.typelist[this.index].id},(function(t){e.agelist=t.data.list}))},bindPickerChange:function(e){this.index=e.detail.value,this.form.service_item=this.typelist[e.detail.value].id},bindPickerChange_age:function(e){this.ageIndex=e.detail.value,this.form.accompany_age=this.agelist[e.detail.value].age},bindPickerChange_time:function(e){this.timeIndex=e.detail.value,this.form.accompany_time_id=this.timelist[e.detail.value].id,this.form.commission=this.timelist[e.detail.value].price},bindPickerChange_place:function(e){this.placeIndex=e.detail.value,this.form.accompany_place=this.placelist[e.detail.value]},getSubComponentData:function(e,t){var n=this;console.log("类别:",e),"上门地址"==e?(n.form.address=t.address+t.address_detail,n.form.contact_name=t.name,n.form.contact_phone=t.phone,n.form.latitude=t.latitude,n.form.longitude=t.longitude):"上门时间"==e?(n.form.start_time=t.split("/")[0],n.form.end_time=t.split("/")[1]):"优惠卷"==e?(n.form.coupon_id=t.id,n.form.coupon_amount=t.amount,n.form.commission=parseInt(n.timelist[n.timeIndex].price-t.amount)):"备注"==e&&(n.form.remark=t)},subEvent:function(){e.navigateTo({url:"a_peihu_yuyue_obj"})}}};t.default=n}).call(this,n("543d")["default"])},"41a1":function(e,t,n){"use strict";n.r(t);var i=n("a85a"),a=n("8595");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("1520");var c,s=n("f0c5"),r=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);t["default"]=r.exports},"633e":function(e,t,n){"use strict";(function(e){n("56c5"),n("33db");i(n("66fd"));var t=i(n("41a1"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},8595:function(e,t,n){"use strict";n.r(t);var i=n("200f"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},a85a:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={aUpAddress:function(){return n.e("components/a_components/a-upAddress").then(n.bind(null,"e60b"))},aUpTime:function(){return n.e("components/a_components/a-upTime").then(n.bind(null,"b443"))},aDiscount:function(){return n.e("components/a_components/a-discount").then(n.bind(null,"c0e6"))},aRemarks:function(){return n.e("components/a_components/a-remarks").then(n.bind(null,"6088"))},aSubmit:function(){return n.e("components/a_components/a-submit").then(n.bind(null,"481a"))}},a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.form.accompany_sex=0},e.e1=function(t){e.form.accompany_sex=1})},o=[]}},[["633e","common/runtime","common/vendor"]]]);