(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chat/index"],{"08f5":function(t,e,a){"use strict";var n=a("9b55"),i=a.n(n);i.a},"39a6":function(t,e,a){"use strict";a.r(e);var n=a("6fa1"),i=a("9bce");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("08f5");var r,s=a("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},"6fa1":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=(t._self._c,t.__map(t.lista,(function(e,a){var n=t.__get_orig(e),i=t.Img(e.head_img),o=t.$shijian(e.createtime);return{$orig:n,m0:i,m1:o}})));t._isMounted||(t.e0=function(e,a){var n=arguments[arguments.length-1].currentTarget.dataset,i=n.eventParams||n["event-params"];a=i.item;t.$jump("/pages/chat/HM-chat?idse="+a.to_user_id+"&tita="+a.nick_name),a.isNotreadCount=0}),t.$mp.data=Object.assign({},{$root:{l0:a}})},o=[]},"9b55":function(t,e,a){},"9bce":function(t,e,a){"use strict";a.r(e);var n=a("9d86"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"9d86":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={components:{},data:function(){return{htosp:0,tablsit:[],lista:[],imageurl:"",fromUserId:"",searchParam:"",isfoot:!1,curPage:1,isSearch:!1}},onReachBottom:function(){this.isfoot||(this.curPage++,this.getlist())},onLoad:function(){this.globalData.chonglian=!1;t.getStorageSync("userType");this.htosp=t.getStorageSync("htop")},onShow:function(){this.fromUserId=t.getStorageSync("userId"),this.getConnection(),this.getNewList()},methods:{showSearch:function(){this.isSearch=!this.isSearch,this.$forceUpdate()},loadmore:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this;e.util.ajax("contact/queryChatList",{fromUserId:e.fromUserId,pageSize:20,curPage:e.curPage,searchParam:e.searchParam},(function(a){e.curPage!==a.data.page.curPage&&(e.isfoot=!0);var n=a.data.chatList;for(var i in a.data.chatList)if("0"==a.data.chatList[i].message_type){var o=a.data.chatList[i].message_content,r=o.replace(/display: flex;/,"width: 90%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;line-height:29px");n[i].finallyGroupMessage=r}else n[i].finallyGroupMessage="[图片]";e.lista=t?n:e.lista.concat(n),e.$forceUpdate()}))},getNewList:function(){this.curPage=1,this.isfoot=!1,this.loadmore(!0)},getConnection:function(){var t=this;t.util.weeksort((function(e){t.globalData.chonglian=!0,t.getlianjie()}))},getlianjie:function(){var t=this;t.util.getsort((function(e){var a=e.data.messageContent;a.substring(0,a.indexOf("@"));t.getNewList()}))}},onUnload:function(){getApp().backtall=null,t.closeSocket()}};e.default=a}).call(this,a("543d")["default"])},dd56:function(t,e,a){"use strict";(function(t){a("56c5"),a("33db");n(a("66fd"));var e=n(a("39a6"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=a,t(e.default)}).call(this,a("543d")["createPage"])}},[["dd56","common/runtime","common/vendor"]]]);