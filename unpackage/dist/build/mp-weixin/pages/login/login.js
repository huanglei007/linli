(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"10aa":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{msgBoxShow:["获取验证码","重获验证码",60],checkIndex:0,checkRule:!1,phone:"",msg:"",score:null,code:""}},onLoad:function(){e.getSystemInfo({success:function(t){var n=t.statusBarHeight+20;n=t.statusBarHeight+50,e.setStorage({key:"htop",data:n})}});var t=this;e.login({success:function(e){t.code=e.code}})},methods:{getCheckRule:function(){this.checkRule=!this.checkRule},getSecendTime:function(){var e=this;setTimeout((function(){e.msgBoxShow[e.checkIndex]=e.msgBoxShow[e.checkIndex]-1,e.$set(e.msgBoxShow,2,e.msgBoxShow[e.checkIndex]),e.msgBoxShow[e.checkIndex]>0?e.getSecendTime():(e.msgBoxShow[e.checkIndex]=60,e.checkIndex=1)}),1e3)},getMsg:function(){var t=this;e.showLoading({title:""}),2!=this.checkIndex&&(this.util.isEmpty(this.phone)?this.$alert("请输入手机号码"):this.util.regular.mobile(this.phone)?this.util.ajax("user/sendMsg",{phone:this.phone,type:2},(function(n){e.hideLoading(),t.score=n.data.score,t.checkIndex=2,t.getSecendTime()})):this.$alert("请输入正确的手机号码"))},getLogin:function(){if(this.checkRule)if(this.util.isEmpty(this.phone))this.$alert("请输入手机号码");else if(this.util.regular.mobile(this.phone))if(this.msg!=this.score)this.$alert("验证码有误");else{var t=this;t.util.ajax("user/login",{loginType:"app",phone:this.phone,code:this.msg},(function(n){e.setStorageSync("userId",n.data.user_id),e.setStorageSync("userInfo",n.data),e.setStorageSync("village",n.data.residentialQuarterVo),t.$alert("登录成功"),t.util.weeksort(),setTimeout((function(t){e.reLaunch({url:"/pages/index/index?new="+n.data.is_new})}),1e3)}))}else this.$alert("请输入正确的手机号码");else this.$alert("请同意隐私政策与用户协议")},getPhoneNumber:function(t){if(t.detail.encryptedData&&t.detail.iv){var n=this;n.util.ajax("user/miniLogin",{encryptedData:t.detail.encryptedData,iv:t.detail.iv,wxCode:n.code},(function(t){e.setStorageSync("userId",t.data.user_id),e.setStorageSync("userInfo",t.data),e.setStorageSync("village",t.data.residentialQuarterVo),n.$alert("登录成功"),n.util.get_wx_access_token(),n.util.weeksort(),t.data.residentialQuarterVo.address?setTimeout((function(n){e.reLaunch({url:"/pages/index/index?new="+t.data.is_new})}),1e3):n.$jumpLa("/pages/index/changeVillage")}))}}}};t.default=n}).call(this,n("543d")["default"])},"19f9":function(e,t,n){},"1fda":function(e,t,n){"use strict";n.r(t);var i=n("4c27"),a=n("fdbf");for(var s in a)"default"!==s&&function(e){n.d(t,e,(function(){return a[e]}))}(s);n("f701");var o,c=n("f0c5"),u=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=u.exports},"4c27":function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}));var a=function(){var e=this,t=e.$createElement;e._self._c},s=[]},c7a3:function(e,t,n){"use strict";(function(e){n("56c5"),n("33db");i(n("66fd"));var t=i(n("1fda"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},f701:function(e,t,n){"use strict";var i=n("19f9"),a=n.n(i);a.a},fdbf:function(e,t,n){"use strict";n.r(t);var i=n("10aa"),a=n.n(i);for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=a.a}},[["c7a3","common/runtime","common/vendor"]]]);