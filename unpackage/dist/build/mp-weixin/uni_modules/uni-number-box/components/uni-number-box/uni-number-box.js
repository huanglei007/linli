(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-number-box/components/uni-number-box/uni-number-box"],{3107:function(t,e,i){"use strict";i.r(e);var u=i("f5e4"),n=i("ab31");for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i("ac27");var l,s=i("f0c5"),r=Object(s["a"])(n["default"],u["b"],u["c"],!1,null,"b4094bd2",null,!1,u["a"],l);e["default"]=r.exports},"5a7f":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniNumberBox",emits:["change","input","update:modelValue","blur","focus"],props:{value:{type:[Number,String],default:1},modelValue:{type:[Number,String],default:1},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},background:{type:String,default:"#f5f5f5"},color:{type:String,default:"#333"},disabled:{type:Boolean,default:!1}},data:function(){return{inputValue:0}},watch:{value:function(t){this.inputValue=+t},modelValue:function(t){this.inputValue=+t}},created:function(){1===this.value&&(this.inputValue=+this.modelValue),1===this.modelValue&&(this.inputValue=+this.value)},methods:{_calcValue:function(t){if(!this.disabled){var e=this._getDecimalScale(),i=this.inputValue*e,u=this.step*e;if("minus"===t){if(i-=u,i<this.min*e)return;i>this.max*e&&(i=this.max*e)}if("plus"===t){if(i+=u,i>this.max*e)return;i<this.min*e&&(i=this.min*e)}this.inputValue=(i/e).toFixed(String(e).length-1),this.$emit("change",+this.inputValue),this.$emit("input",+this.inputValue),this.$emit("update:modelValue",+this.inputValue)}},_getDecimalScale:function(){var t=1;return~~this.step!==this.step&&(t=Math.pow(10,String(this.step).split(".")[1].length)),t},_onBlur:function(t){this.$emit("blur",t);var e=t.detail.value;if(e){e=+e,e>this.max?e=this.max:e<this.min&&(e=this.min);var i=this._getDecimalScale();this.inputValue=e.toFixed(String(i).length-1),this.$emit("change",+this.inputValue),this.$emit("input",+this.inputValue)}},_onFocus:function(t){this.$emit("focus",t)}}};e.default=u},"813b":function(t,e,i){},ab31:function(t,e,i){"use strict";i.r(e);var u=i("5a7f"),n=i.n(u);for(var a in u)"default"!==a&&function(t){i.d(e,t,(function(){return u[t]}))}(a);e["default"]=n.a},ac27:function(t,e,i){"use strict";var u=i("813b"),n=i.n(u);n.a},f5e4:function(t,e,i){"use strict";var u;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return u}));var n=function(){var t=this,e=t.$createElement;t._self._c},a=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-number-box/components/uni-number-box/uni-number-box-create-component',
    {
        'uni_modules/uni-number-box/components/uni-number-box/uni-number-box-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3107"))
        })
    },
    [['uni_modules/uni-number-box/components/uni-number-box/uni-number-box-create-component']]
]);
