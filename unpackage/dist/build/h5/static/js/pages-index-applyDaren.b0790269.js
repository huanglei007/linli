(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-applyDaren"],{"074a":function(t,a,i){"use strict";var e=i("5a5e"),n=i.n(e);n.a},2010:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.head[data-v-336a0ebc]{position:relative}.head .backs[data-v-336a0ebc]{position:absolute;z-index:1;width:%?35?%;left:%?20?%;margin:0}.head .backs uni-image[data-v-336a0ebc]{width:100%}.head .homeBg[data-v-336a0ebc]{width:100%}.head .homeBg uni-image[data-v-336a0ebc]{width:100%}.order[data-v-336a0ebc]{padding:%?40?%;background-color:#fff;border-top-left-radius:%?30?%;border-top-right-radius:%?30?%;margin-top:%?-60?%;position:relative}.order .bgBox[data-v-336a0ebc]{padding:%?80?% %?60?%;background-image:url(/static/image/img_k.png);background-repeat:no-repeat;background-size:100% 100%}.order .bgBox .input[data-v-336a0ebc]{margin-bottom:%?20?%;background-color:#f4f4f4;border-radius:%?40?%;line-height:2;padding:%?16?% %?40?%;color:#212121;font-size:%?32?%}.order .bgBox .input .uni-input[data-v-336a0ebc]{color:#212121;font-size:%?32?%}.order .bgBox .zhengjian[data-v-336a0ebc]{margin:%?40?% 0}.order .bgBox .zhengjian .title[data-v-336a0ebc]{margin-bottom:%?20?%;font-size:%?30?%}.order .bgBox .zhengjian .item[data-v-336a0ebc]{margin-right:%?80?%}.order .bgBox .zhengjian .item .imageBox[data-v-336a0ebc]{width:%?180?%}.order .bgBox .zhengjian .item .imageBox uni-image[data-v-336a0ebc]{width:100%}.order .bgBox .zhengjian uni-label[data-v-336a0ebc]{margin-right:%?20?%}.order .bgBox .jineng[data-v-336a0ebc]{margin:%?40?% 0}.order .bgBox .jineng .title[data-v-336a0ebc]{margin-bottom:%?20?%;font-size:%?30?%}.order .bgBox .jineng .imageList[data-v-336a0ebc]{margin-bottom:%?20?%;flex-wrap:wrap}.order .bgBox .jineng .imageList .item[data-v-336a0ebc]{width:%?130?%;margin-right:%?20?%;height:%?130?%;overflow:hidden}.order .bgBox .jineng .imageList .item uni-image[data-v-336a0ebc]{width:100%}.foot[data-v-336a0ebc]{width:70%;margin:%?30?% auto}.foot .btn[data-v-336a0ebc]{background-color:#ffd200;line-height:2.8;text-align:center;border-radius:%?50?%;font-size:%?32?%}.out[data-v-336a0ebc]{display:flex;flex-wrap:wrap}.out .peop[data-v-336a0ebc]{width:%?154?%;height:%?154?%;margin-right:%?12?%;margin-bottom:%?20?%;position:relative}.out .peop uni-image[data-v-336a0ebc], .out .peop uni-video[data-v-336a0ebc]{width:100%;height:100%;border-radius:%?8?%}.out .peop .del[data-v-336a0ebc]{width:%?30?%;height:%?30?%;position:absolute;top:%?2?%;right:%?2?%}',""]),t.exports=a},3914:function(t,a,i){"use strict";i.r(a);var e=i("f537"),n=i("8910");for(var o in n)"default"!==o&&function(t){i.d(a,t,(function(){return n[t]}))}(o);i("074a");var r,s=i("f0c5"),c=Object(s["a"])(n["default"],e["b"],e["c"],!1,null,"336a0ebc",null,!1,e["a"],r);a["default"]=c.exports},"5a5e":function(t,a,i){var e=i("2010");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("df1a95a4",e,!0,{sourceMap:!1,shadowMode:!1})},8910:function(t,a,i){"use strict";i.r(a);var e=i("b996"),n=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(a,t,(function(){return e[t]}))}(o);a["default"]=n.a},b996:function(t,a,i){"use strict";i("a434"),i("e25e"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{htosp:0,userId:"",imageValue:[],classfy:[],operation:[],operationIndex:0,formdata:{idcardBack:"",idcardFront:"",operationPointId:0,serviceDistance:"",skillCertificate:"",skillIds:"",talentName:"",talentPhone:"",userId:""}}},onLoad:function(){this.htosp=uni.getStorageSync("htop"),this.userId=uni.getStorageSync("userId"),this.formdata.userId=this.userId;var t=this;this.util.ajax("talent/skillList",{},(function(a){t.classfy=a.data.list})),this.util.ajax("common/operationPointList",{},(function(a){t.operation=a.data.list}))},methods:{onimg:function(t){var a=this,i=[];this.util.sendimage(1,i,(function(){a.formdata[t]=i[0]}))},bindPickerChange:function(t){this.operationIndex=t.target.value},checkboxChange:function(t){for(var a=this.classfy,i=parseInt(t.detail.value),e=0,n=a.length;e<n;++e){var o=a[e];i==o.id?this.$set(o,"checked",!0):this.$set(o,"checked",!1)}console.log(this.classfy)},addImg:function(){this.util.sendimage(5-this.imageValue.length,this.imageValue)},del:function(t){this.imageValue.splice(t,1)},apply:function(){if(console.log(this.operation,this.operationIndex),""!=this.formdata.talentName)if(""!=this.formdata.talentName)if(""!=this.formdata.serviceDistance)if(""!=this.formdata.idcardFront&&""!=this.formdata.idcardBack){for(var t=[],a=0;a<this.classfy.length;a++)this.classfy[a].checked&&t.push(this.classfy[a].id);if(0!=t.length){this.formdata.skillIds=t.join(),this.formdata.operationPointId=this.operation[this.operationIndex].id,this.formdata.skillCertificate=this.imageValue.join();var i=this;this.util.ajax("talent/applyTalent",this.formdata,(function(t){i.$alert("提交成功,请等待审核"),setTimeout((function(){i.$jumpback()}),1e3)}))}else this.$alert("请选择擅长技能")}else this.$alert("请上传身份证正反面");else this.$alert("请输入上门服务距离");else this.$alert("请输入达人联系方式");else this.$alert("请输入达人名称")}}};a.default=e},f537:function(t,a,i){"use strict";var e;i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return o})),i.d(a,"a",(function(){return e}));var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"head"},[i("v-uni-view",{staticClass:"homeBg"},[i("v-uni-image",{attrs:{src:"/static/image/top.png",mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"backs",style:{top:t.htosp+"px"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$jumpback()}}},[i("v-uni-image",{attrs:{src:"/static/image/icon_fh.png",mode:"widthFix"}})],1)],1),i("v-uni-view",{staticClass:"order"},[i("v-uni-view",{staticClass:"bgBox"},[i("v-uni-view",{staticClass:"input"},[i("v-uni-input",{attrs:{type:"text",placeholder:"请输入达人名称","placeholder-style":"color: #8b8b8b"},model:{value:t.formdata.talentName,callback:function(a){t.$set(t.formdata,"talentName",a)},expression:"formdata.talentName"}})],1),i("v-uni-view",{staticClass:"input"},[i("v-uni-input",{attrs:{type:"text",placeholder:"请输入联系方式","placeholder-style":"color: #8b8b8b"},model:{value:t.formdata.talentPhone,callback:function(a){t.$set(t.formdata,"talentPhone",a)},expression:"formdata.talentPhone"}})],1),i("v-uni-view",{staticClass:"input"},[i("v-uni-input",{attrs:{type:"text",placeholder:"请输入上门服务距离(公里)","placeholder-style":"color: #8b8b8b"},model:{value:t.formdata.serviceDistance,callback:function(a){t.$set(t.formdata,"serviceDistance",a)},expression:"formdata.serviceDistance"}})],1),i("v-uni-view",{staticClass:"input"},[i("v-uni-picker",{attrs:{value:t.operationIndex,range:t.operation,"range-key":"operation_point_name"},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.bindPickerChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.operation[t.operationIndex]?t.operation[t.operationIndex].operation_point_name:""))])],1)],1),i("v-uni-view",{staticClass:"zhengjian"},[i("v-uni-view",{staticClass:"title"},[t._v("*擅长技能（可多选）")]),i("v-uni-checkbox-group",{on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.checkboxChange.apply(void 0,arguments)}}},t._l(t.classfy,(function(a){return i("v-uni-label",{key:a.id},[i("v-uni-checkbox",{attrs:{value:a.id+"",checked:a.checked}}),t._v(t._s(a.name))],1)})),1)],1),i("v-uni-view",{staticClass:"zhengjian"},[i("v-uni-view",{staticClass:"title"},[t._v("*请上传身份证正反面")]),i("v-uni-view",{staticClass:"flexd"},[i("v-uni-view",{staticClass:"item"},[i("v-uni-view",{staticClass:"imageBox"},[t.formdata.idcardFront?i("v-uni-image",{attrs:{src:t.formdata.idcardFront,mode:"widthFix"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.formdata.idcardFront=""}}}):t._e(),t.formdata.idcardFront?t._e():i("v-uni-image",{attrs:{src:"/static/image/img_sfz_z.png",mode:"widthFix"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.onimg("idcardFront")}}})],1),i("v-uni-view",{staticClass:"sub"},[t._v("请上传身份证正面")])],1),i("v-uni-view",{staticClass:"item"},[i("v-uni-view",{staticClass:"imageBox"},[t.formdata.idcardBack?i("v-uni-image",{attrs:{src:t.formdata.idcardBack,mode:"widthFix"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.formdata.idcardFront=""}}}):t._e(),t.formdata.idcardBack?t._e():i("v-uni-image",{attrs:{src:"/static/image/img_sfz_f.png",mode:"widthFix"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.onimg("idcardBack")}}})],1),i("v-uni-view",{staticClass:"sub"},[t._v("请上传身份证反面")])],1)],1)],1),i("v-uni-view",{staticClass:"jineng"},[i("v-uni-view",{staticClass:"title"},[t._v("请上传技能证书")]),i("v-uni-view",{staticClass:"out"},[t._l(t.imageValue,(function(a,e){return[i("v-uni-view",{key:e+"_0",staticClass:"peop"},[i("v-uni-image",{attrs:{src:t.Img(a),mode:""}}),i("v-uni-image",{staticClass:"del",attrs:{src:"/static/image/icon_jian.png",mode:""},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.del(e)}}})],1)]})),i("v-uni-view",{staticClass:"peop",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.addImg()}}},[i("v-uni-image",{staticStyle:{"border-radius":"0"},attrs:{src:"/static/image/icon_tj.png",mode:""}})],1)],2),i("v-uni-view",{staticClass:"reda"},[t._v("注：技能达人需要上传技能证书")])],1),i("v-uni-view",{staticClass:"foot"},[i("v-uni-view",{staticClass:"btn",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.apply.apply(void 0,arguments)}}},[t._v("提交审核")])],1)],1)],1)],1)},o=[]}}]);