(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/addressManage"],{"29e7":function(e,t,a){},"35d1":function(e,t,a){"use strict";a.r(t);var i=a("c077"),n=a("49d4");for(var s in n)"default"!==s&&function(e){a.d(t,e,(function(){return n[e]}))}(s);a("a347");var d,o=a("f0c5"),r=Object(o["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],d);t["default"]=r.exports},"45b6":function(e,t,a){"use strict";(function(e){a("56c5"),a("33db");i(a("66fd"));var t=i(a("35d1"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=a,e(t.default)}).call(this,a("543d")["createPage"])},"49d4":function(e,t,a){"use strict";a.r(t);var i=a("bebb"),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,(function(){return i[e]}))}(s);t["default"]=n.a},a347:function(e,t,a){"use strict";var i=a("29e7"),n=a.n(i);n.a},bebb:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){Promise.all([a.e("common/vendor"),a.e("components/wangding-pickerAddres/wangding-pickerAddress")]).then(function(){return resolve(a("347e"))}.bind(null,a)).catch(a.oe)},n={components:{pickerAddress:i},data:function(){return{htosp:0,imageurl:"",username:"",phone:"",street:"",is_default:0,txt:"省市区县、乡镇等",id:0,prov_id:0,city_id:0,area_id:0,location:{point:{longitude:22.22222,latitude:22.22222},address:"请选择地图定位",name:"请选择地图定位"},geted:!1}},onLoad:function(t){if(this.htosp=e.getStorageSync("htop"),this.userId=e.getStorageSync("userId"),this.imageurl=this.globalData.imageurl,t.id){e.setNavigationBarTitle({title:"修改地址"}),this.id=t.id;var a=this;this.util.ajax("address/queryAddressById",{id:a.id},(function(e){a.username=e.data.name,a.phone=e.data.phone,a.is_default=e.data.is_default,a.location={point:{longitude:e.data.longitude,latitude:e.data.latitude},address:e.data.address,name:e.data.address_abbreviation},a.geted=!0,a.street=e.data.address_detail}))}},onShow:function(){},methods:{change:function(e){this.txt=e.data.join(" "),this.prov_id=e.index[0],this.city_id=e.index[1],this.area_id=e.index[2]},phonechange:function(e,t){var a=this;switch(t){case"phone":setTimeout((function(){a.phone=e.target.value}),0)}},streetchange:function(e,t){var a=this;switch(t){case"street":setTimeout((function(){a.street=e.target.value}),0)}},onChooseLocation2:function(){var t=this;e.getLocation({type:"gcj02",geocode:!0,success:function(a){e.chooseLocation({latitude:a.latitude,longitude:a.longitude,keyword:a.address?a.address.city+a.address.district+a.address.street:"",success:function(e){t.geted=!0,t.location={point:{longitude:e.longitude,latitude:e.latitude},address:e.address,name:e.name}}})},fail:function(e){plus.nativeUI.toast("读取当前地理位置失败")}})},onChooseLocation:function(){e.navigateTo({url:"/pages/chooselocation/index"})},tijiao:function(){if(""!=this.username)if(""!=this.phone)if(11==this.phone.length)if("省市区县、乡镇等"!=this.txt&&""!=this.street){var e=this,t=this.txt.split(" "),a="";a=t[0]!=t[1]?t[0]+"省"+t[1]+"市"+t[2]:t[1]+"市"+t[2];var i=a+e.street;e.util.ajax("address/queryLatitudeAndLongitudeByAddress",{address:i},(function(t){var i=t.data.addressMap.geocodes[0];0!=e.id?e.util.ajax("address/updateAddress",{id:e.id,isDefault:e.is_default,name:e.username,phone:e.phone,userId:e.userId,longitude:i.location.split(",")[0],latitude:i.location.split(",")[1],address:e.txt,addressDetail:e.street,address_abbreviation:a},(function(t){e.$alert(t.msg),e.$emit("refresh"),e.$jumpback()})):e.util.ajax("address/addAddress",{isDefault:e.is_default,name:e.username,phone:e.phone,userId:e.userId,longitude:i.location.split(",")[0],latitude:i.location.split(",")[1],address:e.txt,addressDetail:e.street,address_abbreviation:a},(function(t){e.$alert("保存地址成功"),setTimeout((function(){e.$jumpback()}),1e3)}));var n=e.getOpenerEventChannel();n.emit("acceptDataFromOpenedPage",!0)}))}else this.$alert("请填写所在地区与详细地址");else this.$alert("请正确填写收货人手机号码");else this.$alert("请填写收货人手机号码");else this.$alert("请填写收货人姓名")}}};t.default=n}).call(this,a("543d")["default"])},c077:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.is_default^=1})},s=[]}},[["45b6","common/runtime","common/vendor"]]]);