(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"10aa":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{msgBoxShow:["获取验证码","重获验证码",60],checkIndex:0,checkRule:!1,phone:"",msg:"",score:null,code:"",open:!1}},onLoad:function(){var t=this;e.getSystemInfo({success:function(t){var n=t.statusBarHeight+20;n=t.statusBarHeight+50,e.setStorage({key:"htop",data:n})}}),e.login({success:function(e){t.code=e.code}}),e.getStorageSync("userInfo")?(t.phone=e.getStorageSync("userInfo").phone,t.appLogin()):e.getStorageSync("tourist")?t.open=!0:(t.phone="18100000000",t.appLogin())},methods:{getCheckRule:function(){this.checkRule=!this.checkRule},getSecendTime:function(){var e=this;setTimeout((function(){e.msgBoxShow[e.checkIndex]=e.msgBoxShow[e.checkIndex]-1,e.$set(e.msgBoxShow,2,e.msgBoxShow[e.checkIndex]),e.msgBoxShow[e.checkIndex]>0?e.getSecendTime():(e.msgBoxShow[e.checkIndex]=60,e.checkIndex=1)}),1e3)},getMsg:function(){var t=this;e.showLoading({title:""}),2!=this.checkIndex&&(this.util.isEmpty(this.phone)?this.$alert("请输入手机号码"):this.util.regular.mobile(this.phone)?this.util.ajax("user/sendMsg",{phone:this.phone,type:2},(function(n){e.hideLoading(),t.score=n.data.score,t.checkIndex=2,t.getSecendTime()})):this.$alert("请输入正确的手机号码"))},getLogin:function(){"13825400322"==this.phone?this.appLogin():this.checkRule?this.util.isEmpty(this.phone)?this.$alert("请输入手机号码"):this.util.regular.mobile(this.phone)?this.msg!=this.score?this.$alert("验证码有误"):this.appLogin():this.$alert("请输入正确的手机号码"):this.$alert("请同意隐私政策与用户协议")},appLogin:function(){e.showLoading({title:""});var t=this;this.util.ajax("user/login",{loginType:"app",phone:this.phone,code:this.msg},(function(n){40!=n.data.user_id?t.util.weeksort():e.setStorageSync("tourist",!0),e.setStorageSync("userId",n.data.user_id),e.setStorageSync("userInfo",n.data),e.setStorageSync("village",n.data.residentialQuarterVo),setTimeout((function(t){e.hideLoading(),e.reLaunch({url:"/pages/index/index?new="+n.data.is_new})}),1e3)}))},getPhoneNumber:function(t){if(t.detail.encryptedData&&t.detail.iv){var n=this;n.util.ajax("user/miniLogin",{encryptedData:t.detail.encryptedData,iv:t.detail.iv,wxCode:n.code},(function(t){e.setStorageSync("userId",t.data.user_id),e.setStorageSync("userInfo",t.data),e.setStorageSync("village",t.data.residentialQuarterVo),n.util.get_wx_access_token(),n.util.weeksort(),e.removeStorageSync("tourist"),setTimeout((function(n){e.reLaunch({url:"/pages/index/index?new="+t.data.is_new})}),1e3)}))}}}};t.default=n}).call(this,n("543d")["default"])},"19f9":function(e,t,n){},"1fda":function(e,t,n){"use strict";n.r(t);var i=n("a992"),o=n("fdbf");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("f701");var s,c=n("f0c5"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=u.exports},a992:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},c7a3:function(e,t,n){"use strict";(function(e){n("56c5"),n("33db");i(n("66fd"));var t=i(n("1fda"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},f701:function(e,t,n){"use strict";var i=n("19f9"),o=n.n(i);o.a},fdbf:function(e,t,n){"use strict";n.r(t);var i=n("10aa"),o=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a}},[["c7a3","common/runtime","common/vendor"]]]);