(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-get"],{"28bb":function(t,e,i){"use strict";var a=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("cd9e")),s={components:{pickerAddress:n.default},data:function(){var t=this.getDate({format:!0});return{htosp:0,imageurl:"",name:"",date:t,txt:"省市区县、乡镇等",typeList:["帮送","帮取"],typeIndex:0,time:"取件开始时间",address:"",street:"",phone:"",imageValue:[],upstyle:{borderStyle:{color:"#eee",width:"1px",style:"solid",radius:"10rpx"},border:!1,dividline:!0},id:0,salesman_number:""}},onLoad:function(t){if(this.htosp=uni.getStorageSync("htop"),this.userId=uni.getStorageSync("userId"),t.id){this.id=t.id;var e=this;this.util.ajax("agent/querySalesmanDetail",{salesmanUserId:this.id},(function(t){e.name=t.data.salesman_name,e.phone=t.data.salesman_phone,e.attrIndex=t.data.salesman_type,e.street=t.data.address_detail,e.txt=t.data.address,e.address=t.data.area_id,e.street=t.data.address_detail,e.imageValue=t.data.electronic_material||[],e.date=t.data.entry_time,e.salesman_number=t.data.salesman_number}))}},methods:{bindPickerChange:function(t){console.log("picker发送选择改变，携带值为",t.target.value),this.attrIndex=t.target.value},bindTimeChange:function(t){this.time=t.target.value},bindDateChange:function(t){this.date=t.target.value},change:function(t){this.address=t,this.txt=t.data.join("-")},getDate:function(t){var e=new Date,i=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();return"start"===t?i-=60:"end"===t&&(i+=2),a=a>9?a:"0"+a,n=n>9?n:"0"+n,"".concat(i,"-").concat(a,"-").concat(n)},nextStep:function(){}}};e.default=s},"767e":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"head ",style:{paddingTop:t.htosp+"px"}},[i("v-uni-view",{staticClass:"flexd jubetween flex-center"},[i("v-uni-view",{staticClass:"left flexd flex-center"},[i("v-uni-image",{staticClass:"backs",attrs:{src:"/static/image/icon_gb.png",mode:"widthFix"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$jumpback()}}}),t._v("帮取帮送")],1)],1)],1),i("v-uni-view",{staticClass:"form"},[i("v-uni-view",{staticClass:"address flexd jubetween flex-center"},[i("v-uni-view",{staticClass:"icon"},[i("v-uni-image",{attrs:{src:"/static/image/icon_q.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"text"},[i("v-uni-picker",{attrs:{mode:"date",disabled:!0,value:t.date},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.bindDateChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.date))])],1)],1),i("v-uni-view",{staticClass:"more"},[i("v-uni-image",{attrs:{src:"/static/image/icon_gd.png",mode:"widthFix"}})],1)],1),i("v-uni-view",{staticClass:"address flexd jubetween flex-center"},[i("v-uni-view",{staticClass:"icon"},[i("v-uni-image",{attrs:{src:"/static/image/icon_s.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"text"},[i("v-uni-picker",{attrs:{mode:"date",disabled:!0,value:t.date},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.bindDateChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.date))])],1)],1),i("v-uni-view",{staticClass:"more"},[i("v-uni-image",{attrs:{src:"/static/image/icon_gd.png",mode:"widthFix"}})],1)],1)],1),i("v-uni-view",{staticClass:"form"},[i("v-uni-view",{staticClass:"flexd jubetween"},[i("v-uni-view",{staticClass:"item name flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("发布人")]),i("v-uni-view",{staticClass:"text"},[t._v("杨大大/先生")])],1)],1),i("v-uni-view",{staticClass:"item flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("手机号")]),i("v-uni-view",{staticClass:"text flexd flex-center"},[i("v-uni-view",[t._v("18246589202")]),i("v-uni-image",{attrs:{src:"/static/image/icon_dh.png",mode:"widthFix"}})],1)],1),i("v-uni-view",{staticClass:"flexd jubetween"},[i("v-uni-view",{staticClass:"item name flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("取件时间")]),i("v-uni-view",{staticClass:"text"},[t._v("13:00-14:00")])],1)],1),i("v-uni-view",{staticClass:"flexd jubetween"},[i("v-uni-view",{staticClass:"item name flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("帮购劳费"),i("v-uni-text",[t._v("(平台抽佣10%)")])],1),i("v-uni-view",{staticClass:"text"},[t._v("￥4")])],1)],1),i("v-uni-view",{staticClass:"flexd jubetween"},[i("v-uni-view",{staticClass:"item name flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("专人专送")]),i("v-uni-view",{staticClass:"text"},[t._v("不需要")])],1)],1)],1),i("v-uni-view",{staticClass:"form"},[i("v-uni-view",{staticClass:"flexd jubetween"},[i("v-uni-view",{staticClass:"item name flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("收件人")]),i("v-uni-view",{staticClass:"text"},[t._v("杨大大/先生")])],1)],1),i("v-uni-view",{staticClass:"item flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("手机号")]),i("v-uni-view",{staticClass:"text flexd flex-center"},[i("v-uni-view",[t._v("18246589202")]),i("v-uni-image",{attrs:{src:"/static/image/icon_dh.png",mode:"widthFix"}})],1)],1)],1),i("v-uni-view",{staticClass:"form"},[i("v-uni-view",{staticClass:"item flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("商品类别")]),i("v-uni-view",{staticClass:"text"},[t._v("文件")])],1),i("v-uni-view",{staticClass:"item flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("重量预估")]),i("v-uni-view",{staticClass:"text"},[t._v("1kg")])],1),i("v-uni-view",{staticClass:"item flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("大小预估")]),i("v-uni-view",{staticClass:"text"},[t._v("1kg")])],1),i("v-uni-view",{staticClass:"item flexd flex-center jubetween"},[i("v-uni-view",{staticClass:"label"},[t._v("专人专送")]),i("v-uni-view",{staticClass:"text"},[t._v("不需要")])],1)],1),i("v-uni-view",{staticClass:"form"},[i("v-uni-view",{staticClass:"item"},[i("v-uni-textarea",{staticClass:"textarea",attrs:{disabled:!0,value:"不在家，放在门口谢谢","placeholder-style":"color:#878787",placeholder:"请给接单者留言"}})],1)],1),i("v-uni-view",{staticClass:"form"},[i("v-uni-view",{staticClass:"item"},[i("v-uni-view",{staticStyle:{"font-size":"28rpx","line-height":"2",color:"#202020"}},[t._v("帮送信息")]),i("v-uni-view",{staticClass:"out"},[t._l(t.imageValue,(function(e,a){return[i("v-uni-view",{key:a+"_0",staticClass:"peop"},[i("v-uni-image",{attrs:{src:t.imageurl+e,mode:""}}),i("v-uni-image",{staticClass:"del",attrs:{src:"/static/image/icon_j.png",mode:""}})],1)]})),i("v-uni-view",{staticClass:"peop",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addImg()}}},[i("v-uni-image",{staticStyle:{"border-radius":"0"},attrs:{src:"/static/image/icon_tj.png",mode:""}})],1)],2)],1)],1),i("v-uni-view",{staticClass:"foot flexd jubetween flex-center"},[i("v-uni-image",{attrs:{src:"/static/image/icon_lt.png",mode:"widthFix"}}),i("v-uni-view",{staticClass:"flexd flex-center"},[i("v-uni-view",{staticClass:"cost"},[t._v("帮送费"),i("v-uni-text",[t._v("4元")])],1),i("v-uni-view",{staticClass:"btn"},[t._v("接单")])],1)],1)],1)},s=[]},a228:function(t,e,i){"use strict";var a=i("ac4d"),n=i.n(a);n.a},ac4d:function(t,e,i){var a=i("bc79");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("5d3fcfa0",a,!0,{sourceMap:!1,shadowMode:!1})},add3:function(t,e,i){"use strict";i.r(e);var a=i("28bb"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},bc79:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.head[data-v-63949116]{padding:%?20?%}.head .left[data-v-63949116]{font-size:%?32?%;font-weight:700}.head .left uni-image[data-v-63949116]{margin-right:%?10?%}.typeBox[data-v-63949116]{width:%?400?%;margin:%?30?% auto}.typeBox .item[data-v-63949116]{width:45%;background-color:#fff;font-size:%?32?%;font-weight:700;opacity:.3;line-height:2;text-align:center}.typeBox .item.active[data-v-63949116]{opacity:1}.content[data-v-63949116]{padding-bottom:%?200?%}.content .form[data-v-63949116]{margin:%?30?%;background-color:#fff;border-radius:%?10?%}.content .form .item[data-v-63949116]{padding:%?10?% %?40?%;border-bottom:%?1?% solid #f5f5f5;line-height:%?80?%;width:100%;box-sizing:border-box}.content .form .item .label[data-v-63949116]{color:#888}.content .form .item .label uni-text[data-v-63949116]{font-size:%?24?%}.content .form .item[data-v-63949116]:last-child{border-bottom:%?1?% solid #fff}.content .form .item uni-view[data-v-63949116]{font-size:%?28?%}.content .form .item .input[data-v-63949116]{width:%?400?%}.content .form .item .textarea[data-v-63949116]{height:%?200?%;padding:%?20?% 0}.content .form .item .text uni-image[data-v-63949116]{width:%?36?%;margin-left:%?20?%}.content .form .item.name uni-input[data-v-63949116]{width:%?200?%}.content .form .time[data-v-63949116]{padding:%?10?% %?40?%}.content .form .time .timeItem[data-v-63949116]{padding:%?20?%;width:%?230?%;background-color:#f6f6f6;text-align:center;position:relative}.content .form .time .timeItem[data-v-63949116]::before{content:"";position:absolute;display:block;width:%?14?%;height:%?22?%;right:%?20?%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);background-image:url(/static/image/icon_gd.png);background-size:cover}.content .form .time .timeItem .uni-input[data-v-63949116]{color:#888;line-height:2}.content .form .address[data-v-63949116]{padding:%?20?% %?30?%}.content .form .address uni-image[data-v-63949116]{width:100%;margin-top:%?10?%}.content .form .address .icon[data-v-63949116]{width:%?50?%}.content .form .address .more[data-v-63949116]{width:%?30?%}.content .form .address .text[data-v-63949116]{width:%?500?%;font-size:%?28?%}.content .form .gender[data-v-63949116]{padding:0 %?20?%;width:%?240?%}.content .form .gender uni-view[data-v-63949116]{margin:0;font-size:%?24?%}.content .out[data-v-63949116]{display:flex;flex-wrap:wrap}.content .out .peop[data-v-63949116]{width:%?154?%;height:%?154?%;margin:%?20?% 0;margin-right:%?12?%;position:relative}.content .out .peop uni-image[data-v-63949116], .content .out .peop uni-video[data-v-63949116]{width:100%;height:100%;border-radius:%?8?%}.content .out .peop .del[data-v-63949116]{width:%?30?%;height:%?30?%;position:absolute;top:%?2?%;right:%?2?%}.foot[data-v-63949116]{position:fixed;bottom:0;left:0;width:100%;padding:1vh %?30?%;box-sizing:border-box;background-color:#fff}.foot uni-image[data-v-63949116]{width:%?40?%}.foot .cost[data-v-63949116]{font-size:%?28?%;margin-right:%?20?%}.foot .cost uni-text[data-v-63949116]{font-size:%?32?%;margin-left:%?20?%}.foot .btn[data-v-63949116]{line-height:5vh;font-size:%?32?%;background-image:linear-gradient(90deg,#f9db58,#f5c353);border-radius:%?10?%;padding:0 %?70?%}',""]),t.exports=e},e9ff:function(t,e,i){"use strict";i.r(e);var a=i("767e"),n=i("add3");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("a228");var d,o=i("f0c5"),r=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"63949116",null,!1,a["a"],d);e["default"]=r.exports}}]);