(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chat/HM-chat"],{"076c":function(e,i,t){"use strict";var n=t("09c5"),g=t.n(n);g.a},"09c5":function(e,i,t){},"26d6":function(e,i,t){"use strict";(function(e){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var t={data:function(){return{htosp:0,textMsg:"",isHistoryLoading:!1,scrollAnimation:!0,scrollTop:0,scrollToView:"",msgList:[],msgImgList:[],myuid:0,RECORDER:e.getRecorderManager(),isVoice:!1,voiceTis:"按住 说话",recordTis:"手指上滑 取消发送",recording:!1,willStop:!1,initPoint:{identifier:0,Y:0},recordTimer:null,recordLength:0,AUDIO:e.createInnerAudioContext(),playMsgid:null,VoiceTimer:null,popupLayerClass:"",hideMore:!0,hideEmoji:!0,emojiList:[[{url:"emoji_1.png",alt:"[大笑]"},{url:"emoji_2.png",alt:"[微笑]"},{url:"emoji_3.png",alt:"[羞涩微笑]"},{url:"emoji_4.png",alt:"[眨眼]"},{url:"emoji_5.png",alt:"[飞吻]"},{url:"emoji_6.png",alt:"[花痴]"},{url:"emoji_7.png",alt:"[微笑亲亲]"},{url:"emoji_8.png",alt:"[单眼吐舌]"},{url:"emoji_9.png",alt:"[眯眼吐舌]"},{url:"emoji_10.png",alt:"[脸红]"},{url:"emoji_11.png",alt:"[龇牙咧嘴]"},{url:"emoji_12.png",alt:"[沉思]"},{url:"emoji_13.png",alt:"[松了口气]"},{url:"emoji_14.png",alt:"[不高兴]"},{url:"emoji_15.png",alt:"[失望]"},{url:"emoji_16.png",alt:"[痛苦]"},{url:"emoji_17.png",alt:"[哭]"},{url:"emoji_18.png",alt:"[笑哭]"},{url:"emoji_19.png",alt:"[放声大哭]"},{url:"emoji_20.png",alt:"[困]"},{url:"emoji_21.png",alt:"[失望]"},{url:"emoji_22.png",alt:"[失望但如释重负]"},{url:"emoji_23.png",alt:"[汗]"},{url:"emoji_24.png",alt:"[冷汗]"}],[{url:"emoji_25.png",alt:"[累死了]"},{url:"emoji_26.png",alt:"[累]"},{url:"emoji_27.png",alt:"[害怕]"},{url:"emoji_28.png",alt:"[吓死了]"},{url:"emoji_29.png",alt:"[生气]"},{url:"emoji_30.png",alt:"[怒火中烧]"},{url:"emoji_31.png",alt:"[傲慢]"},{url:"emoji_32.png",alt:"[困惑]"},{url:"emoji_33.png",alt:"[斜眼笑]"},{url:"emoji_34.png",alt:"[好吃]"},{url:"emoji_35.png",alt:"[口罩]"},{url:"emoji_36.png",alt:"[墨镜笑脸]"},{url:"emoji_37.png",alt:"[睡着了]"},{url:"emoji_38.png",alt:"[吃惊]"},{url:"emoji_39.png",alt:"[震惊]"},{url:"emoji_40.png",alt:"[微微不满]"},{url:"emoji_41.png",alt:"[不满]"},{url:"emoji_42.png",alt:"[非常不满]"},{url:"emoji_43.png",alt:"[缄默]"},{url:"emoji_44.png",alt:"[冷漠]"},{url:"emoji_45.png",alt:"[困扰]"},{url:"emoji_46.png",alt:"[惊讶]"},{url:"emoji_47.png",alt:"[沉默]"},{url:"emoji_48.png",alt:"[微笑天使]"}],[{url:"emoji_49.png",alt:"[得意]"},{url:"emoji_50.png",alt:"[无语]"},{url:"emoji_51.png",alt:"[大便]"},{url:"emoji_52.png",alt:"[火焰]"},{url:"emoji_53.png",alt:"[拇指向上]"},{url:"emoji_54.png",alt:"[拇指向下]"},{url:"emoji_55.png",alt:"[OK]"},{url:"emoji_56.png",alt:"[拳头]"},{url:"emoji_57.png",alt:"[举起拳头]"},{url:"emoji_58.png",alt:"[胜利]"},{url:"emoji_59.png",alt:"[举起手]"},{url:"emoji_60.png",alt:"[张开双手]"},{url:"emoji_61.png",alt:"[上]"},{url:"emoji_62.png",alt:"[下]"},{url:"emoji_63.png",alt:"[右]"},{url:"emoji_64.png",alt:"[左]"},{url:"emoji_65.png",alt:"[祈祷]"},{url:"emoji_66.png",alt:"[食指]"},{url:"emoji_67.png",alt:"[鼓掌]"},{url:"emoji_68.png",alt:"[强壮]"},{url:"emoji_69.png",alt:"[红心]"},{url:"emoji_70.png",alt:"[心碎]"},{url:"emoji_71.png",alt:"[唇印]"},{url:"emoji_72.png",alt:"[钻石]"}]],onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"},windowsState:"",redenvelopeData:{rid:null,from:null,face:null,blessing:null,money:null},keyHeight:0,toUserId:"",toUserPhone:"",tita:"",imageurl:"",nextPage:!1,newlist:"",curPage:2,keepkond:"",fromUserId:"",usephone:"",isNext:!1,nextObj:{}}},onLoad:function(i){this.toUserId=i.idse,this.imageurl=this.globalData.imageurl,this.htosp=e.getStorageSync("htop");e.getStorageSync("userType");this.fromUserId=e.getStorageSync("userId"),this.usephone=e.getStorageSync("userInfo").phone,this.getMsgList()},onShow:function(){var e=this;console.log("HM-chat Show"),this.util.weeksort((function(i){e.onMessageSo()})),this.scrollTop=9999999},methods:{getMsgList:function(){var i=this;i.util.ajax("contact/queryChatLogList",{fromUserId:i.fromUserId,toUserId:i.toUserId,curPage:1,pageSize:"10"},(function(t){0!==t.data.chatLogList.length&&(i.newlist=t.data.chatLogList[0].id),i.nextPage=t.data.page.nextPage,i.toUserPhone=t.data.toUserIdInfo.phone,i.tita=t.data.toUserIdInfo.nick_name;var n=t.data.chatLogList,g=[];for(var a in n){var s="";if(n[a].from_user_id==t.data.fromMemberInfo.id?s=t.data.fromMemberInfo.head_img:n[a].from_user_id==t.data.toUserIdInfo.user_id&&(s=t.data.toUserIdInfo.head_img),0==n[a].message_type){var o=n[a].message_content,r=o.replace(/display: flex;/,"");g.push({type:"user",msg:{id:n[a].id,type:"text",time:n[a].createtime,userinfo:{uid:n[a].from_user_id==i.fromUserId?0:1,face:s},content:{text:r}}})}else 1==n[a].message_type&&g.push({type:"user",msg:{id:n[a].id,type:"img",time:n[a].createtime,userinfo:{uid:n[a].from_user_id==i.fromUserId?0:1,face:s},content:{url:n[a].message_content,w:200,h:200}}})}for(var f=0;f<g.length;f++)"user"==g[f].type&&"img"==g[f].msg.type&&(g[f].msg.content=i.setPicSize(g[f].msg.content),i.msgImgList.unshift(g[f].msg.content.url)),i.msgList.unshift(g[f]);setTimeout((function(){i.scrollTop++,e.hideLoading()}),500)}))},tianjia:function(){var i=this,t=1;i.util.ajax("contact/queryChatLogList",{fromUserId:i.fromUserId,toUserId:i.toUserId,curPage:1,pageSize:"10"},(function(n){i.nextPage=n.data.page.nextPage;var g=n.data.chatLogList,a=[];for(var s in console.log("newlist*****",i.newlist),g)g[s].id==i.newlist&&(t=s);for(var o in g){var r="";if(g[o].from_user_id==n.data.fromMemberInfo.id?r=n.data.fromMemberInfo.head_img:g[o].from_user_id==n.data.toUserIdInfo.id&&(r=n.data.toUserIdInfo.head_img),o<t)if(0==g[o].message_type){var f=g[o].message_content,u=f.replace(/display: flex;/,"");a.push({type:"user",msg:{id:g[o].id,type:"text",time:g[o].createtime,userinfo:{uid:g[o].from_user_id==i.fromUserId?0:1,face:r},content:{text:u}}})}else 1==g[o].message_type&&a.push({type:"user",msg:{id:g[o].id,type:"img",time:g[o].createtime,userinfo:{uid:g[o].from_user_id==i.fromUserId?0:1,face:r},content:{url:g[o].message_content,w:200,h:200}}})}for(var l=0;l<a.length;l++)"user"==a[l].type&&"img"==a[l].msg.type&&(a[l].msg.content=i.setPicSize(a[l].msg.content),i.msgImgList.push(a[l].msg.content.url)),i.msgList.push(a[l]);i.newlist=i.msgList[0].id,setTimeout((function(){i.scrollTop++,i.isNext&&i.upimg(i.nextObj.list,i.nextObj.i),e.hideLoading()}),500)}))},onMessageSo:function(){console.log("开启监听");var e=this;e.util.getsort((function(i){var t=i.data.messageContent,n=t.substring(0,t.indexOf("@")),g=e.usephone;n!=e.toUserPhone&&n!=g||e.tianjia()}))},loadHistory:function(i){var t=this;if(t.nextPage){if(e.showLoading({title:"加载中"}),t.isHistoryLoading)return;t.isHistoryLoading=!0,t.scrollAnimation=!0,t.util.ajax("contact/queryChatLogList",{fromUserId:t.fromUserId,toUserId:t.toUserId,curPage:t.curPage,pageSize:"10"},(function(i){t.curPage=t.curPage+1,t.nextPage=i.data.page.nextPage;var n=i.data.chatLogList,g=[];for(var a in n)if(0==n[a].message_type){var s=n[a].message_content,o=s.replace(/display: flex;/,"");g.push({type:"user",msg:{id:n[a].id,type:"text",time:n[a].createtime,userinfo:{uid:n[a].from_user_id==t.fromUserId?0:1,face:n[a].head_img},content:{text:o}}})}else 1==n[a].message_type&&g.push({type:"user",msg:{id:n[a].id,type:"img",time:n[a].createtime,userinfo:{uid:n[a].from_user_id==t.fromUserId?0:1,face:n[a].head_img},content:{url:n[a].message_content,w:200,h:200}}});for(var r=0;r<g.length;r++)"user"==g[r].type&&"img"==g[r].msg.type&&(g[r].msg.content=t.setPicSize(g[r].msg.content),t.msgImgList.unshift(g[r].msg.content.url)),g[r].msg.id=Math.floor(1e3*Math.random()+1),t.msgList.unshift(g[r]);setTimeout((function(){t.scrollTop=9,e.hideLoading()}),500),t.isHistoryLoading=!1}))}},setPicSize:function(i){var t=e.upx2px(350),n=e.upx2px(350);if(i.w>t||i.h>n){var g=i.w/i.h;i.w=g>1?t:n*g,i.h=g>1?t/g:n}return i},showMore:function(){this.isVoice=!1,this.hideEmoji=!0,this.hideMore?(this.hideMore=!1,this.openDrawer()):this.hideDrawer()},openDrawer:function(){this.popupLayerClass="showLayer"},hideDrawer:function(){var e=this;this.popupLayerClass="",this.keepkond="",this.keyHeight=0,setTimeout((function(){e.hideMore=!0,e.hideEmoji=!0}),150)},chooseImage:function(){this.getImage("album")},camera:function(){this.getImage("camera")},getImage:function(i){var t=this;getApp().backtall=null,e.chooseImage({count:9,sourceType:[i],sizeType:["original","compressed"],success:function(i){for(var n in i.tempFiles){var g=i.tempFiles[n].size/1024/1024;if(g>5)return void e.showToast({title:"图片不得大于5M",icon:"none"})}e.showLoading({title:"上传中"}),t.upimg(i.tempFiles,0)}})},upimg:function(i,t){var n=this;console.log(t,i[t]),e.uploadFile({url:n.globalData.url+"CrossDomainOrdinaryServlet",name:"image",formData:{},filePath:i[t].path,success:function(g){if(e.hideLoading(),200==g.statusCode){var a=JSON.parse(g.data),s=a.url;t<i.length-1?(n.isNext=!0,n.nextObj={list:i,i:t+1},n.sendMsg(s,"img")):(n.isNext=!1,n.sendMsg(s,"img"))}else 404==g.statusCode?e.showModal({title:"提示",content:"404,访问地址不存在！",showCancel:!1}):502==g.statusCode&&e.showModal({title:"提示",content:"502,服务器无响应！",showCancel:!1})},fail:function(i){e.showModal({title:"提示",content:"网络状态不佳,请稍后再试！",showCancel:!1})}})},chooseEmoji:function(){var e=this;this.hideMore=!0,setTimeout((function(){e.keyHeight=0,e.keepkond=""}),150),this.hideEmoji?(this.hideEmoji=!1,this.openDrawer()):this.hideDrawer()},addEmoji:function(e){this.textMsg+=e.alt},textareaClick:function(){var i=this;if(this.hideEmoji&&this.hideMore&&""==this.popupLayerClass){var t=e.getSystemInfoSync();e.onKeyboardHeightChange((function(e){var n=(e.height/t.screenHeight).toFixed(2),g=100*n;if(0!=g){i.keyHeight=g-.8;var a=g+1;i.keepkond="transform: translate3d(0,-"+a+"%,0)"}else i.keyHeight=0,i.keepkond=""}))}else e.hideKeyboard(),this.hideDrawer();setTimeout((function(){i.scrollTop=999999*i.msgList.length}),500)},sendText:function(){if(this.hideDrawer(),this.textMsg){var e=this.replaceEmoji(this.textMsg),i=e;this.sendMsg(i,"text"),this.textMsg=""}},replaceEmoji:function(e){var i=this,t=e.replace(/\[([^(\]|\[)]*)\]/g,(function(e,t){for(var n=0;n<i.emojiList.length;n++)for(var g=i.emojiList[n],a=0;a<g.length;a++){var s=g[a];if(s.alt==e){var o="https://linli-community-api.niuclub.net/image/emoji2/",r='<img width="24" height="24" src="'+o+s.url+'">';return r}}}));return'<div style="display: flex;align-items: center;word-wrap:break-word;">'+t+"</div>"},sendMsg:function(i,t,n){var g=this,a=new Date,s={type:"user",msg:{id:0,time:a.getHours()+":"+a.getMinutes(),type:t,userinfo:{uid:0,face:"/static/image/heardimg.png"},content:i}},o={fromUserId:g.fromUserId,toUserId:g.toUserId,messageContent:i,messageType:"text"==t?0:1};g.util.ajax("contact/sendMessage",o,(function(i){g.cheun(t,s,n),g.util.ajax("contact/queryChatLogList",{fromUserId:g.fromUserId,toUserId:g.toUserId,curPage:1,pageSize:"10"},(function(i){var t=i.data.chatLogList,n=t[0],a="";if(n.from_user_id==i.data.fromMemberInfo.id?a=i.data.fromMemberInfo.head_img:n.from_user_id==i.data.toUserIdInfo.user_id&&(a=i.data.toUserIdInfo.head_img),0==n.message_type){var s=n.message_content,o=s.replace(/display: flex;/,"");g.msgList.push({type:"user",msg:{id:n.id,type:"text",time:n.createtime,userinfo:{uid:n.from_user_id==g.fromUserId?0:1,face:a},content:{text:o}}})}else 1==n.message_type&&g.msgList.push({type:"user",msg:{id:n.id,type:"img",time:n.createtime,userinfo:{uid:n.from_user_id==g.fromUserId?0:1,face:a},content:{url:n.message_content,w:200,h:200}}});setTimeout((function(){g.scrollTop++,e.hideLoading()}),500)}))}))},cheun:function(i,t,n){var g=this;e.showLoading({title:"发送中"});var a={messageType:1};a.toUserName=g.toUserPhone,a.messageContent=i,a.roomId=0,a.appId="jqDpwZCDEMw37Uh3",e.sendSocketMessage({data:JSON.stringify(a),success:function(i){g.misshao=!0,e.hideLoading()},fail:function(n){console.log("fail",n),e.hideLoading(),g.util.weeksort((function(e){console.log("again"),g.onMessageSo(),g.cheun(i,t)}))}})},addTextMsg:function(e){this.msgList.push(e)},addVoiceMsg:function(e){this.msgList.push(e)},addImgMsg:function(e){e.msg.content=this.setPicSize(e.msg.content),this.msgImgList.push(e.msg.content.url),this.msgList.push(e)},addRedEnvelopeMsg:function(e){this.msgList.push(e)},addSystemTextMsg:function(e){this.msgList.push(e)},addSystemRedEnvelopeMsg:function(e){this.msgList.push(e)},showPic:function(i){var t=[];t[0]=this.imageurl+i,e.previewImage({indicator:"none",current:this.imageurl+i,urls:t})},switchVoice:function(){this.hideDrawer(),this.isVoice=!this.isVoice},discard:function(){},isYear:function(e){var i=new Date(e).getFullYear(),t=(new Date).getFullYear();return i===t},formatTime:function(e){var i=this.getTimeArray(e);return[i[0],i[1],i[2]].map(this.formatNumber).join("-")+" "+[i[3],i[4],i[5]].map(this.formatNumber).join(":")},getTimeArray:function(e){e=new Date(e);var i=e.getFullYear(),t=e.getMonth()+1,n=e.getDate(),g=e.getHours(),a=e.getMinutes(),s=e.getSeconds();return[i,t,n,g,a,s].map(this.formatNumber)},formatNumber:function(e){return e=e.toString(),e[1]?e:"0"+e},isYestday:function(e){var i=new Date(e),t=new Date;return i.getFullYear()===t.getFullYear()&&i.getMonth()===t.getMonth()&&t.getDate()-i.getDate()===1},timeChange:function(e){var i=(new Date).getTime(),t=i-e,n="";return t<864e5&&!1===this.isYestday(e)?n=this.formatTime(e).substr(11,5):t>=864e5&&t<1728e5&&!0===this.isYestday(e)?n="昨天"+this.formatTime(e).substr(11,5):t>1728e5&&!1===this.isYestday(e)&&!0===this.isYear(e)?n=this.formatTime(e).substr(5,11):t>1728e5&&!1===this.isYestday(e)&&!1===this.isYear(e)&&(n=this.formatTime(e).substr(0,16)),n}}};i.default=t}).call(this,t("543d")["default"])},"29ab":function(e,i,t){"use strict";t.r(i);var n=t("26d6"),g=t.n(n);for(var a in n)"default"!==a&&function(e){t.d(i,e,(function(){return n[e]}))}(a);i["default"]=g.a},"6dbe":function(e,i,t){"use strict";t.r(i);var n=t("a871"),g=t("29ab");for(var a in g)"default"!==a&&function(e){t.d(i,e,(function(){return g[e]}))}(a);t("076c");var s,o=t("f0c5"),r=Object(o["a"])(g["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);i["default"]=r.exports},a871:function(e,i,t){"use strict";var n;t.d(i,"b",(function(){return g})),t.d(i,"c",(function(){return a})),t.d(i,"a",(function(){return n}));var g=function(){var e=this,i=e.$createElement,t=(e._self._c,e.__map(e.msgList,(function(i,t){var n=e.__get_orig(i),g="user"==i.type&&i.msg.userinfo.uid==e.myuid?e.timeChange(i.msg.time):null,a="user"==i.type&&i.msg.userinfo.uid!=e.myuid?e.timeChange(i.msg.time):null;return{$orig:n,m0:g,m1:a}})));e._isMounted||(e.e0=function(i){e.keyHeight=0}),e.$mp.data=Object.assign({},{$root:{l0:t}})},a=[]},b934:function(e,i,t){"use strict";(function(e){t("a943"),t("33db");n(t("66fd"));var i=n(t("6dbe"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(i.default)}).call(this,t("543d")["createPage"])}},[["b934","common/runtime","common/vendor"]]]);