(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/tixian"],{"06fb":function(t,e,u){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={components:{},data:function(){return{htosp:0,price:"",aritup:!1,trueName:"",accountNumber:"",surplus_virtual_currency_quantity:0,showInput:!1}},onLoad:function(){this.htosp=t.getStorageSync("htop"),this.userId=t.getStorageSync("userId")},onShow:function(){this.loadmore()},methods:{loadmore:function(){var t=this,e=this;this.util.ajax("member/memberGoToWithdrawal",{userId:this.userId},(function(u){e.trueName=u.data.ali_true_name,e.accountNumber=u.data.ali_account,e.surplus_virtual_currency_quantity=u.data.balance,""!=e.trueName&&""!=e.accountNumber||(t.showInput=!0)}))},tixian:function(){var t=this;""==t.trueName?this.$alert("姓名不能为空"):""==t.accountNumber?this.$alert("账号不能为空"):t.price>this.surplus_virtual_currency_quantity?this.$alert("提现金额不能大于余额"):t.util.ajax("member/memberWithdrawal",{userId:t.userId,aliTrueName:t.trueName,aliAccount:t.accountNumber,amount:t.price},(function(e){t.$alert(e.data),t.$twoback()}))}}};e.default=u}).call(this,u("543d")["default"])},"1e6e":function(t,e,u){"use strict";var n=u("aaf9"),a=u.n(n);a.a},"543e":function(t,e,u){"use strict";u.r(e);var n=u("06fb"),a=u.n(n);for(var r in n)"default"!==r&&function(t){u.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},aaf9:function(t,e,u){},b324:function(t,e,u){"use strict";u.r(e);var n=u("fe55"),a=u("543e");for(var r in a)"default"!==r&&function(t){u.d(e,t,(function(){return a[t]}))}(r);u("1e6e");var c,i=u("f0c5"),o=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=o.exports},c79f:function(t,e,u){"use strict";(function(t){u("56c5"),u("33db");n(u("66fd"));var e=n(u("b324"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=u,t(e.default)}).call(this,u("543d")["createPage"])},fe55:function(t,e,u){"use strict";var n;u.d(e,"b",(function(){return a})),u.d(e,"c",(function(){return r})),u.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.showInput=!t.showInput},t.e1=function(e){t.price=t.surplus_virtual_currency_quantity})},r=[]}},[["c79f","common/runtime","common/vendor"]]]);