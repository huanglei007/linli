(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"102d":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n={data:function(){return{}},onLoad:function(){wx.showShareMenu({withShareTicket:!0,menus:["shareAppMessage","shareTimeline"]})},onShow:function(){var e=this;setInterval((function(){e.util.get_wx_access_token()}),6e6)},beforeDestroy:function(){},methods:{}};r.default=n},1901:function(e,r,t){"use strict";var n;function u(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var a={url:"https://linli-community-api.niuclub.net/apiModule/",imageurl:"https://linli-community-api.niuclub.net/image/",appId:"wx552b5634f0d4d44b",key:"dfd69a784ecd287e5c44f417d2bcaaed",openId:"111",userId:"",clientid:"",rules:(n={address:{rules:[{required:!0,errorMessage:"请输入地址"}]},requirementIntroduction:{rules:[{required:!0,errorMessage:"请输入需求介绍"}]},bookName:{rules:[{required:!0,errorMessage:"请输入书名"}]},publisherName:{rules:[{required:!0,errorMessage:"请输入发布人姓名"},{minLength:1,maxLength:5,errorMessage:"姓名长度在 {minLength} 到 {maxLength} 个字符"}]},publisherPhone:{rules:[{required:!0,errorMessage:"请输入发布人手机号"},{minLength:11,maxLength:11,errorMessage:"请正确填写手机号"}]},senderName:{rules:[{required:!0,errorMessage:"请输入给件人/收件人姓名"},{minLength:1,maxLength:5,errorMessage:"姓名长度在 {minLength} 到 {maxLength} 个字符"}]},senderPhone:{rules:[{required:!0,errorMessage:"请输入给件人/收件人手机号"},{minLength:11,maxLength:11,errorMessage:"请正确填写手机号"}]}},u(n,"bookName",{rules:[{required:!0,errorMessage:"请输入书名"}]}),u(n,"petKind",{rules:[{required:!0,errorMessage:"请输入宠物种类"}]}),u(n,"petAge",{rules:[{required:!0,errorMessage:"请输入宠物年龄,单位为岁"},{format:"number",errorMessage:"年龄只能输入数字"},{minimum:0,errorMessage:"宠物年龄应大于0"}]}),u(n,"sellingPrice",{rules:[{required:!0,errorMessage:"请输入价格"},{format:"number",errorMessage:"价格只能输入数字"},{minimum:0,errorMessage:"出售价格应大于0元"}]}),n)},o=a;r.default=o},"4a45":function(e,r,t){"use strict";t.r(r);var n=t("1901"),u=t.n(n);for(var a in n)"default"!==a&&function(e){t.d(r,e,(function(){return n[e]}))}(a);r["default"]=u.a},"4d2f":function(e,r,t){"use strict";var n=t("e6d4"),u=t.n(n);u.a},"6b16":function(e,r,t){"use strict";var n;t.d(r,"b",(function(){return u})),t.d(r,"c",(function(){return a})),t.d(r,"a",(function(){return n}));var u=function(){var e=this,r=e.$createElement;e._self._c},a=[]},"8c81":function(e,r,t){"use strict";t.r(r);var n=t("bafb");for(var u in n)"default"!==u&&function(e){t.d(r,e,(function(){return n[e]}))}(u);t("4d2f");var a,o,i,s,l=t("f0c5"),c=Object(l["a"])(n["default"],a,o,!1,null,null,null,!1,i,s);r["default"]=c.exports},"904f":function(e,r,t){"use strict";t.r(r);var n=t("6b16"),u=t("4a45");for(var a in u)"default"!==a&&function(e){t.d(r,e,(function(){return u[e]}))}(a);var o,i=t("f0c5"),s=Object(i["a"])(u["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);r["default"]=s.exports},bafb:function(e,r,t){"use strict";t.r(r);var n=t("102d"),u=t.n(n);for(var a in n)"default"!==a&&function(e){t.d(r,e,(function(){return n[e]}))}(a);r["default"]=u.a},e6d4:function(e,r,t){},f1b1:function(e,r,t){"use strict";(function(e){t("56c5"),t("33db");var r=s(t("66fd")),n=s(t("8c81")),u=s(t("2656")),a=s(t("a816")),o=s(t("645f")),i=s(t("904f"));function s(e){return e&&e.__esModule?e:{default:e}}function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){f(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function f(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}wx.__webpack_require_UNI_MP_PLUGIN__=t,r.default.config.productionTip=!1,r.default.prototype.util=o.default,r.default.prototype.apisa=a.default,r.default.prototype.globalData=i.default,r.default.prototype.url="http://192.168.1.115:8074/apiModule/",r.default.prototype.backtall=null,r.default.use(u.default),n.default.mpType="app";var d=new r.default(c({},n.default));e(d).$mount()}).call(this,t("543d")["createApp"])}},[["f1b1","common/runtime","common/vendor"]]]);