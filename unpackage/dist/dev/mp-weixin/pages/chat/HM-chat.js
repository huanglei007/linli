(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/chat/HM-chat"],{

/***/ 299:
/*!*********************************************************************************!*\
  !*** E:/lingli-community/web/android/main.js?{"page":"pages%2Fchat%2FHM-chat"} ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);

__webpack_require__(/*! @dcloudio/uni-stat/dist/uni-stat.es.js */ 6);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _HMChat = _interopRequireDefault(__webpack_require__(/*! ./pages/chat/HM-chat.vue */ 300));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;createPage(_HMChat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 300:
/*!**************************************************************!*\
  !*** E:/lingli-community/web/android/pages/chat/HM-chat.vue ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HM-chat.vue?vue&type=template&id=91ae903c& */ 301);
/* harmony import */ var _HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HM-chat.vue?vue&type=script&lang=js& */ 303);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HM_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HM-chat.vue?vue&type=style&index=0&lang=scss& */ 305);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 13);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/chat/HM-chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 301:
/*!*********************************************************************************************!*\
  !*** E:/lingli-community/web/android/pages/chat/HM-chat.vue?vue&type=template&id=91ae903c& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./HM-chat.vue?vue&type=template&id=91ae903c& */ 302);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_template_id_91ae903c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 302:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/lingli-community/web/android/pages/chat/HM-chat.vue?vue&type=template&id=91ae903c& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.msgList, function(row, index) {
    var $orig = _vm.__get_orig(row)

    var m0 =
      row.type == "user" && row.msg.userinfo.uid == _vm.myuid
        ? _vm.timeChange(row.msg.time)
        : null
    var m1 =
      row.type == "user" && row.msg.userinfo.uid != _vm.myuid
        ? _vm.timeChange(row.msg.time)
        : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1
    }
  })

  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.keyHeight = 0
    }
  }

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 303:
/*!***************************************************************************************!*\
  !*** E:/lingli-community/web/android/pages/chat/HM-chat.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./HM-chat.vue?vue&type=script&lang=js& */ 304);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 304:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/lingli-community/web/android/pages/chat/HM-chat.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      htosp: 0,
      //????????????
      textMsg: '',
      //????????????
      isHistoryLoading: false,
      scrollAnimation: true,
      scrollTop: 0,
      scrollToView: '',
      msgList: [],
      msgImgList: [],
      myuid: 0,

      //??????????????????

      //H5????????????
      RECORDER: uni.getRecorderManager(),

      isVoice: false,
      voiceTis: '?????? ??????',
      recordTis: "???????????? ????????????",
      recording: false,
      willStop: false,
      initPoint: {
        identifier: 0,
        Y: 0 },

      recordTimer: null,
      recordLength: 0,

      //????????????????????????
      AUDIO: uni.createInnerAudioContext(),
      playMsgid: null,
      VoiceTimer: null,
      // ????????????
      popupLayerClass: '',
      // more??????
      hideMore: true,
      //????????????
      hideEmoji: true,
      // emojiList:[
      // 	[{"url":"100.gif",alt:"[??????]"},{"url":"101.gif",alt:"[??????]"},{"url":"102.gif",alt:"[??????]"},{"url":"103.gif",alt:"[??????]"},{"url":"104.gif",alt:"[??????]"},{"url":"105.gif",alt:"[???]"},{"url":"106.gif",alt:"[???]"},{"url":"107.gif",alt:"[???]"},{"url":"108.gif",alt:"[???]"},{"url":"109.gif",alt:"[???]"},{"url":"110.gif",alt:"[???]"},{"url":"111.gif",alt:"[???]"},{"url":"112.gif",alt:"[??????]"},{"url":"113.gif",alt:"[???]"},{"url":"114.gif",alt:"[??????]"},{"url":"115.gif",alt:"[??????]"},{"url":"116.gif",alt:"[???]"},{"url":"117.gif",alt:"[???]"},{"url":"118.gif",alt:"[??????]"},{"url":"119.gif",alt:"[???]"},{"url":"120.gif",alt:"[???]"},{"url":"121.gif",alt:"[??????]"},{"url":"122.gif",alt:"[???]"},{"url":"123.gif",alt:"[???]"}],
      // 	[{"url":"124.gif",alt:"[???]"},{"url":"125.gif",alt:"[???]"},{"url":"126.gif",alt:"[???]"},{"url":"127.gif",alt:"[???]"},{"url":"128.gif",alt:"[??????]"},{"url":"129.gif",alt:"[???]"},{"url":"130.gif",alt:"[??????]"},{"url":"131.gif",alt:"[???]"},{"url":"132.gif",alt:"[??????]"},{"url":"133.gif",alt:"[??????]"},{"url":"134.gif",alt:"[???]"},{"url":"135.gif",alt:"[???]"},{"url":"136.gif",alt:"[???]"},{"url":"137.gif",alt:"[???]"},{"url":"138.gif",alt:"[??????]"},{"url":"139.gif",alt:"[bye]"},{"url":"140.gif",alt:"[???]"},{"url":"141.gif",alt:"[???]"},{"url":"142.gif",alt:"[??????]"},{"url":"143.gif",alt:"[??????]"},{"url":"144.gif",alt:"[??????]"},{"url":"145.gif",alt:"[??????]"},{"url":"146.gif",alt:"[??????]"},{"url":"147.gif",alt:"[???]"}],
      // 	[{"url":"148.gif",alt:"[???]"},{"url":"149.gif",alt:"[??????]"},{"url":"150.gif",alt:"[??????]"},{"url":"151.gif",alt:"[???]"},{"url":"152.gif",alt:"[???]"},{"url":"153.gif",alt:"[???]"},{"url":"154.gif",alt:"[??????]"},{"url":"155.gif",alt:"[???]"},{"url":"156.gif",alt:"[??????]"},{"url":"157.gif",alt:"[???]"},{"url":"158.gif",alt:"[??????]"},{"url":"159.gif",alt:"[??????]"},{"url":"160.gif",alt:"[??????]"},{"url":"161.gif",alt:"[??????]"},{"url":"162.gif",alt:"[??????]"},{"url":"163.gif",alt:"[??????]"},{"url":"164.gif",alt:"[???]"},{"url":"165.gif",alt:"[???]"},{"url":"166.gif",alt:"[???]"},{"url":"167.gif",alt:"[??????]"},{"url":"168.gif",alt:"[??????]"},{"url":"169.gif",alt:"[???]"},{"url":"170.gif",alt:"[??????]"},{"url":"171.gif",alt:"[??????]"}],
      // 	[{"url":"172.gif",alt:"[??????]"},{"url":"173.gif",alt:"[??????]"},{"url":"174.gif",alt:"[???]"},{"url":"175.gif",alt:"[??????]"},{"url":"176.gif",alt:"[??????]"},{"url":"177.gif",alt:"[??????]"},{"url":"178.gif",alt:"[??????]"},{"url":"179.gif",alt:"[??????]"},{"url":"180.gif",alt:"[??????]"},{"url":"181.gif",alt:"[??????]"},{"url":"182.gif",alt:"[?????????]"},{"url":"183.gif",alt:"[??????]"},{"url":"184.gif",alt:"[??????]"},{"url":"185.gif",alt:"[??????]"},{"url":"186.gif",alt:"[?????????]"},{"url":"187.gif",alt:"[?????????]"},{"url":"188.gif",alt:"[??????]"},{"url":"189.gif",alt:"[ok]"},{"url":"190.gif",alt:"[??????]"},{"url":"191.gif",alt:"[??????]"},{"url":"192.gif",alt:"[??????]"},{"url":"193.gif",alt:"[??????]"},{"url":"194.gif",alt:"[??????]"},{"url":"195.gif",alt:"[??????]"}],
      // 	[{"url":"196.gif",alt:"[??????]"},{"url":"197.gif",alt:"[??????]"},{"url":"198.gif",alt:"[??????]"},{"url":"199.gif",alt:"[??????]"},{"url":"200.png",alt:"[??????]"},{"url":"201.png",alt:"[??????]"},{"url":"202.png",alt:"[??????]"},{"url":"203.png",alt:"[??????]"},{"url":"204.png",alt:"[??????]"},{"url":"205.png",alt:"[??????]"},{"url":"206.png",alt:"[??????]"},{"url":"207.png",alt:"[??????]"},{"url":"208.png",alt:"[??????]"},{"url":"209.png",alt:"[??????]"},{"url":"210.png",alt:"[??????]"},{"url":"211.png",alt:"[??????]"},{"url":"212.png",alt:"[??????]"},{"url":"213.png",alt:"[??????]"},{"url":"214.png",alt:"[??????]"},{"url":"215.png",alt:"[??????]"},{"url":"216.png",alt:"[??????]"},{"url":"217.png",alt:"[??????]"},{"url":"218.png",alt:"[??????]"},{"url":"219.png",alt:"[??????]"},]				
      // ],
      emojiList: [
      [{
        "url": "emoji_1.png",
        alt: "[??????]" },
      {
        "url": "emoji_2.png",
        alt: "[??????]" },
      {
        "url": "emoji_3.png",
        alt: "[????????????]" },
      {
        "url": "emoji_4.png",
        alt: "[??????]" },
      {
        "url": "emoji_5.png",
        alt: "[??????]" },
      {
        "url": "emoji_6.png",
        alt: "[??????]" },
      {
        "url": "emoji_7.png",
        alt: "[????????????]" },
      {
        "url": "emoji_8.png",
        alt: "[????????????]" },
      {
        "url": "emoji_9.png",
        alt: "[????????????]" },
      {
        "url": "emoji_10.png",
        alt: "[??????]" },
      {
        "url": "emoji_11.png",
        alt: "[????????????]" },
      {
        "url": "emoji_12.png",
        alt: "[??????]" },
      {
        "url": "emoji_13.png",
        alt: "[????????????]" },
      {
        "url": "emoji_14.png",
        alt: "[?????????]" },
      {
        "url": "emoji_15.png",
        alt: "[??????]" },
      {
        "url": "emoji_16.png",
        alt: "[??????]" },
      {
        "url": "emoji_17.png",
        alt: "[???]" },
      {
        "url": "emoji_18.png",
        alt: "[??????]" },
      {
        "url": "emoji_19.png",
        alt: "[????????????]" },
      {
        "url": "emoji_20.png",
        alt: "[???]" },
      {
        "url": "emoji_21.png",
        alt: "[??????]" },
      {
        "url": "emoji_22.png",
        alt: "[?????????????????????]" },
      {
        "url": "emoji_23.png",
        alt: "[???]" },
      {
        "url": "emoji_24.png",
        alt: "[??????]" }],

      [{
        "url": "emoji_25.png",
        alt: "[?????????]" },
      {
        "url": "emoji_26.png",
        alt: "[???]" },
      {
        "url": "emoji_27.png",
        alt: "[??????]" },
      {
        "url": "emoji_28.png",
        alt: "[?????????]" },
      {
        "url": "emoji_29.png",
        alt: "[??????]" },
      {
        "url": "emoji_30.png",
        alt: "[????????????]" },
      {
        "url": "emoji_31.png",
        alt: "[??????]" },
      {
        "url": "emoji_32.png",
        alt: "[??????]" },
      {
        "url": "emoji_33.png",
        alt: "[?????????]" },
      {
        "url": "emoji_34.png",
        alt: "[??????]" },
      {
        "url": "emoji_35.png",
        alt: "[??????]" },
      {
        "url": "emoji_36.png",
        alt: "[????????????]" },
      {
        "url": "emoji_37.png",
        alt: "[?????????]" },
      {
        "url": "emoji_38.png",
        alt: "[??????]" },
      {
        "url": "emoji_39.png",
        alt: "[??????]" },
      {
        "url": "emoji_40.png",
        alt: "[????????????]" },
      {
        "url": "emoji_41.png",
        alt: "[??????]" },
      {
        "url": "emoji_42.png",
        alt: "[????????????]" },
      {
        "url": "emoji_43.png",
        alt: "[??????]" },
      {
        "url": "emoji_44.png",
        alt: "[??????]" },
      {
        "url": "emoji_45.png",
        alt: "[??????]" },
      {
        "url": "emoji_46.png",
        alt: "[??????]" },
      {
        "url": "emoji_47.png",
        alt: "[??????]" },
      {
        "url": "emoji_48.png",
        alt: "[????????????]" }],

      [{
        "url": "emoji_49.png",
        alt: "[??????]" },
      {
        "url": "emoji_50.png",
        alt: "[??????]" },
      {
        "url": "emoji_51.png",
        alt: "[??????]" },
      {
        "url": "emoji_52.png",
        alt: "[??????]" },
      {
        "url": "emoji_53.png",
        alt: "[????????????]" },
      {
        "url": "emoji_54.png",
        alt: "[????????????]" },
      {
        "url": "emoji_55.png",
        alt: "[OK]" },
      {
        "url": "emoji_56.png",
        alt: "[??????]" },
      {
        "url": "emoji_57.png",
        alt: "[????????????]" },
      {
        "url": "emoji_58.png",
        alt: "[??????]" },
      {
        "url": "emoji_59.png",
        alt: "[?????????]" },
      {
        "url": "emoji_60.png",
        alt: "[????????????]" },
      {
        "url": "emoji_61.png",
        alt: "[???]" },
      {
        "url": "emoji_62.png",
        alt: "[???]" },
      {
        "url": "emoji_63.png",
        alt: "[???]" },
      {
        "url": "emoji_64.png",
        alt: "[???]" },
      {
        "url": "emoji_65.png",
        alt: "[??????]" },
      {
        "url": "emoji_66.png",
        alt: "[??????]" },
      {
        "url": "emoji_67.png",
        alt: "[??????]" },
      {
        "url": "emoji_68.png",
        alt: "[??????]" },
      {
        "url": "emoji_69.png",
        alt: "[??????]" },
      {
        "url": "emoji_70.png",
        alt: "[??????]" },
      {
        "url": "emoji_71.png",
        alt: "[??????]" },
      {
        "url": "emoji_72.png",
        alt: "[??????]" }]],


      //???????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

      onlineEmoji: {
        "100.gif": "AbNQgA.gif",
        "101.gif": "AbN3ut.gif",
        "102.gif": "AbNM3d.gif",
        "103.gif": "AbN8DP.gif",
        "104.gif": "AbNljI.gif",
        "105.gif": "AbNtUS.gif",
        "106.gif": "AbNGHf.gif",
        "107.gif": "AbNYE8.gif",
        "108.gif": "AbNaCQ.gif",
        "109.gif": "AbNN4g.gif",
        "110.gif": "AbN0vn.gif",
        "111.gif": "AbNd3j.gif",
        "112.gif": "AbNsbV.gif",
        "113.gif": "AbNwgs.gif",
        "114.gif": "AbNrD0.gif",
        "115.gif": "AbNDuq.gif",
        "116.gif": "AbNg5F.gif",
        "117.gif": "AbN6ET.gif",
        "118.gif": "AbNcUU.gif",
        "119.gif": "AbNRC4.gif",
        "120.gif": "AbNhvR.gif",
        "121.gif": "AbNf29.gif",
        "122.gif": "AbNW8J.gif",
        "123.gif": "AbNob6.gif",
        "124.gif": "AbN5K1.gif",
        "125.gif": "AbNHUO.gif",
        "126.gif": "AbNIDx.gif",
        "127.gif": "AbN7VK.gif",
        "128.gif": "AbNb5D.gif",
        "129.gif": "AbNX2d.gif",
        "130.gif": "AbNLPe.gif",
        "131.gif": "AbNjxA.gif",
        "132.gif": "AbNO8H.gif",
        "133.gif": "AbNxKI.gif",
        "134.gif": "AbNzrt.gif",
        "135.gif": "AbU9Vf.gif",
        "136.gif": "AbUSqP.gif",
        "137.gif": "AbUCa8.gif",
        "138.gif": "AbUkGQ.gif",
        "139.gif": "AbUFPg.gif",
        "140.gif": "AbUPIS.gif",
        "141.gif": "AbUZMn.gif",
        "142.gif": "AbUExs.gif",
        "143.gif": "AbUA2j.gif",
        "144.gif": "AbUMIU.gif",
        "145.gif": "AbUerq.gif",
        "146.gif": "AbUKaT.gif",
        "147.gif": "AbUmq0.gif",
        "148.gif": "AbUuZV.gif",
        "149.gif": "AbUliF.gif",
        "150.gif": "AbU1G4.gif",
        "151.gif": "AbU8z9.gif",
        "152.gif": "AbU3RJ.gif",
        "153.gif": "AbUYs1.gif",
        "154.gif": "AbUJMR.gif",
        "155.gif": "AbUadK.gif",
        "156.gif": "AbUtqx.gif",
        "157.gif": "AbUUZ6.gif",
        "158.gif": "AbUBJe.gif",
        "159.gif": "AbUdIO.gif",
        "160.gif": "AbU0iD.gif",
        "161.gif": "AbUrzd.gif",
        "162.gif": "AbUDRH.gif",
        "163.gif": "AbUyQA.gif",
        "164.gif": "AbUWo8.gif",
        "165.gif": "AbU6sI.gif",
        "166.gif": "AbU2eP.gif",
        "167.gif": "AbUcLt.gif",
        "168.gif": "AbU4Jg.gif",
        "169.gif": "AbURdf.gif",
        "170.gif": "AbUhFS.gif",
        "171.gif": "AbU5WQ.gif",
        "172.gif": "AbULwV.gif",
        "173.gif": "AbUIzj.gif",
        "174.gif": "AbUTQs.gif",
        "175.gif": "AbU7yn.gif",
        "176.gif": "AbUqe0.gif",
        "177.gif": "AbUHLq.gif",
        "178.gif": "AbUOoT.gif",
        "179.gif": "AbUvYF.gif",
        "180.gif": "AbUjFU.gif",
        "181.gif": "AbaSSJ.gif",
        "182.gif": "AbUxW4.gif",
        "183.gif": "AbaCO1.gif",
        "184.gif": "Abapl9.gif",
        "185.gif": "Aba9yR.gif",
        "186.gif": "AbaFw6.gif",
        "187.gif": "Abaiex.gif",
        "188.gif": "AbakTK.gif",
        "189.gif": "AbaZfe.png",
        "190.gif": "AbaEFO.gif",
        "191.gif": "AbaVYD.gif",
        "192.gif": "AbamSH.gif",
        "193.gif": "AbaKOI.gif",
        "194.gif": "Abanld.gif",
        "195.gif": "Abau6A.gif",
        "196.gif": "AbaQmt.gif",
        "197.gif": "Abal0P.gif",
        "198.gif": "AbatpQ.gif",
        "199.gif": "Aba1Tf.gif",
        "200.png": "Aba8k8.png",
        "201.png": "AbaGtS.png",
        "202.png": "AbaJfg.png",
        "203.png": "AbaNlj.png",
        "204.png": "Abawmq.png",
        "205.png": "AbaU6s.png",
        "206.png": "AbaaXn.png",
        "207.png": "Aba000.png",
        "208.png": "AbarkT.png",
        "209.png": "AbastU.png",
        "210.png": "AbaB7V.png",
        "211.png": "Abafn1.png",
        "212.png": "Abacp4.png",
        "213.png": "AbayhF.png",
        "214.png": "Abag1J.png",
        "215.png": "Aba2c9.png",
        "216.png": "AbaRXR.png",
        "217.png": "Aba476.png",
        "218.png": "Abah0x.png",
        "219.png": "Abdg58.png" },

      //??????????????????
      windowsState: '',
      redenvelopeData: {
        rid: null, //??????ID
        from: null,
        face: null,
        blessing: null,
        money: null },

      keyHeight: 0,
      toUserId: '',
      toUserPhone: '',
      tita: '',
      imageurl: '',
      nextPage: false,
      newlist: '',
      curPage: 2,
      keepkond: '',
      fromUserId: '',
      usephone: '',
      isNext: false,
      nextObj: {} };

  },
  onLoad: function onLoad(option) {
    this.toUserId = option.idse;
    this.imageurl = this.globalData.imageurl;
    this.htosp = uni.getStorageSync('htop');
    var userType = uni.getStorageSync('userType');
    // userType: ????????????( 1.???????????? 2??????????????? 3????????? 4?????? 5???????????? 6??????????????????)
    this.fromUserId = uni.getStorageSync('userId');
    this.usephone = uni.getStorageSync('userInfo').phone;
    this.getMsgList();

  },
  onShow: function onShow() {var _this = this;
    console.log('HM-chat Show');
    this.util.weeksort(function (e) {
      _this.onMessageSo();
    });

    this.scrollTop = 9999999;
  },
  methods: {
    // ????????????????????????
    getMsgList: function getMsgList() {
      var that = this;
      that.util.ajax('contact/queryChatLogList', {
        "fromUserId": that.fromUserId,
        "toUserId": that.toUserId,
        "curPage": 1,
        "pageSize": '10' },
      function (res) {
        if (res.data.chatLogList.length !== 0) {
          that.newlist = res.data.chatLogList[0].id;
        }

        that.nextPage = res.data.page.nextPage;
        that.toUserPhone = res.data.toUserIdInfo.phone;
        that.tita = res.data.toUserIdInfo.nick_name;
        var chatLogList = res.data.chatLogList;
        var list = [];
        for (var i in chatLogList) {
          var face = '';
          if (chatLogList[i].from_user_id == res.data.fromMemberInfo.id) {
            face = res.data.fromMemberInfo.head_img;
          } else if (chatLogList[i].from_user_id == res.data.toUserIdInfo.user_id) {
            face = res.data.toUserIdInfo.head_img;
          }
          if (chatLogList[i].message_type == 0) {
            var cont = chatLogList[i].message_content;
            var caijian = cont.replace(/display: flex;/, "");
            list.push({
              type: 'user',
              msg: {
                id: chatLogList[i].id,
                type: 'text',
                time: chatLogList[i].createtime,
                userinfo: {
                  uid: chatLogList[i].from_user_id == that.fromUserId ?
                  0 : 1,
                  face: face },

                content: {
                  text: caijian } } });



          } else if (chatLogList[i].message_type == 1) {
            list.push({
              type: 'user',
              msg: {
                id: chatLogList[i].id,
                type: 'img',
                time: chatLogList[i].createtime,
                userinfo: {
                  uid: chatLogList[i].from_user_id == that.fromUserId ?
                  0 : 1,
                  face: face },

                content: {
                  url: chatLogList[i].message_content,
                  w: 200,
                  h: 200 } } });



          }
        }
        // ????????????????????????,?????????????????????
        for (var _i = 0; _i < list.length; _i++) {
          if (list[_i].type == 'user' && list[_i].msg.type == "img") {
            list[_i].msg.content = that.setPicSize(list[_i].msg.content);
            that.msgImgList.unshift(list[_i].msg.content.url);
          }
          that.msgList.unshift(list[_i]);
        }
        // ???????????????
        setTimeout(function () {
          that.scrollTop++;
          uni.hideLoading();
        }, 500);
      });
    },
    tianjia: function tianjia() {
      var that = this;
      var msgCount = 1;
      that.util.ajax('contact/queryChatLogList', {
        "fromUserId": that.fromUserId,
        "toUserId": that.toUserId,
        "curPage": 1,
        "pageSize": '10' },
      function (res) {
        that.nextPage = res.data.page.nextPage;
        var chatLogList = res.data.chatLogList;
        var list = [];
        console.log('newlist*****', that.newlist);
        for (var i in chatLogList) {

          if (chatLogList[i].id == that.newlist) {
            msgCount = i;
          }
        }
        for (var _i2 in chatLogList) {
          var face = '';
          if (chatLogList[_i2].from_user_id == res.data.fromMemberInfo.id) {
            face = res.data.fromMemberInfo.head_img;
          } else if (chatLogList[_i2].from_user_id == res.data.toUserIdInfo.id) {
            face = res.data.toUserIdInfo.head_img;
          }
          if (_i2 < msgCount) {
            if (chatLogList[_i2].message_type == 0) {
              var cont = chatLogList[_i2].message_content;
              var caijian = cont.replace(/display: flex;/, "");
              list.push({
                type: 'user',
                msg: {
                  id: chatLogList[_i2].id,
                  type: 'text',
                  time: chatLogList[_i2].createtime,
                  userinfo: {
                    uid: chatLogList[_i2].from_user_id == that.fromUserId ?
                    0 : 1,
                    face: face },

                  content: {
                    text: caijian } } });



            } else if (chatLogList[_i2].message_type == 1) {
              list.push({
                type: 'user',
                msg: {
                  id: chatLogList[_i2].id,
                  type: 'img',
                  time: chatLogList[_i2].createtime,
                  userinfo: {
                    uid: chatLogList[_i2].from_user_id == that.fromUserId ?
                    0 : 1,
                    face: face },

                  content: {
                    url: chatLogList[_i2].message_content,
                    w: 200,
                    h: 200 } } });



            }
          }
        }
        // ????????????????????????,?????????????????????
        for (var _i3 = 0; _i3 < list.length; _i3++) {
          if (list[_i3].type == 'user' && list[_i3].msg.type == "img") {
            list[_i3].msg.content = that.setPicSize(list[_i3].msg.content);
            that.msgImgList.push(list[_i3].msg.content.url);
          }
          that.msgList.push(list[_i3]);
        }
        that.newlist = that.msgList[0].id;
        // ???????????????
        setTimeout(function () {
          that.scrollTop++;
          if (that.isNext) {
            that.upimg(that.nextObj.list, that.nextObj.i);
          }
          uni.hideLoading();
        }, 500);
      });
    },
    onMessageSo: function onMessageSo() {
      //??????socket??????
      console.log('????????????');
      var that = this;
      that.util.getsort(function (res) {
        var mysid = res.data.messageContent;
        var tophone = mysid.substring(0, mysid.indexOf('@'));
        var isphone = that.usephone;
        if (tophone == that.toUserPhone || tophone == isphone) {
          that.tianjia();
        }

      });
    },

    //?????????????????????(????????????????????????)
    loadHistory: function loadHistory(e) {
      var that = this;
      if (that.nextPage) {
        uni.showLoading({
          title: '?????????' });

        if (that.isHistoryLoading) {
          return;
        }
        that.isHistoryLoading = true; //???????????????????????????????????????????????????
        that.scrollAnimation = true; //??????????????????
        that.util.ajax('contact/queryChatLogList', {
          "fromUserId": that.fromUserId,
          "toUserId": that.toUserId,
          "curPage": that.curPage,
          "pageSize": '10' },
        function (res) {
          that.curPage = that.curPage + 1;
          that.nextPage = res.data.page.nextPage;
          var chatLogList = res.data.chatLogList;
          var list = [];
          //setTimeout(()=>{
          for (var i in chatLogList) {
            if (chatLogList[i].message_type == 0) {
              var cont = chatLogList[i].message_content;
              var caijian = cont.replace(/display: flex;/, "");
              list.push({
                type: 'user',
                msg: {
                  id: chatLogList[i].id,
                  type: 'text',
                  time: chatLogList[i].createtime,
                  userinfo: {
                    uid: chatLogList[i].from_user_id == that.fromUserId ?
                    0 : 1,
                    face: chatLogList[i].head_img },

                  content: {
                    text: caijian } } });



            } else if (chatLogList[i].message_type == 1) {
              list.push({
                type: 'user',
                msg: {
                  id: chatLogList[i].id,
                  type: 'img',
                  time: chatLogList[i].createtime,
                  userinfo: {
                    uid: chatLogList[i].from_user_id == that.fromUserId ?
                    0 : 1,
                    face: chatLogList[i].head_img },

                  content: {
                    url: chatLogList[i].message_content,
                    w: 200,
                    h: 200 } } });



            }
          }
          // ????????????????????????,?????????????????????
          for (var _i4 = 0; _i4 < list.length; _i4++) {
            if (list[_i4].type == 'user' && list[_i4].msg.type == "img") {
              list[_i4].msg.content = that.setPicSize(list[_i4].msg.content);
              that.msgImgList.unshift(list[_i4].msg.content.url);
            }
            list[_i4].msg.id = Math.floor(Math.random() * 1000 + 1);
            that.msgList.unshift(list[_i4]);
          }

          setTimeout(function () {
            that.scrollTop = 9;
            uni.hideLoading();
          }, 500);
          that.isHistoryLoading = false;
          //},1000)
        });
      }
    },
    //????????????????????????????????????????????????????????????????????????????????????
    setPicSize: function setPicSize(content) {
      // ????????????????????????????????????????????????????????????????????????????????????????????????????????????aspectFit?????????
      var maxW = uni.upx2px(350); //350?????????????????????????????????
      var maxH = uni.upx2px(350); //350?????????????????????????????????
      if (content.w > maxW || content.h > maxH) {
        var scale = content.w / content.h;
        content.w = scale > 1 ? maxW : maxH * scale;
        content.h = scale > 1 ? maxW / scale : maxH;
      }
      return content;
    },

    //????????????(??????+??????) 
    showMore: function showMore() {
      this.isVoice = false;
      this.hideEmoji = true;
      if (this.hideMore) {
        this.hideMore = false;
        this.openDrawer();
      } else {
        this.hideDrawer();
      }
    },
    // ????????????
    openDrawer: function openDrawer() {
      this.popupLayerClass = 'showLayer';
    },
    // ????????????
    hideDrawer: function hideDrawer() {var _this2 = this;
      this.popupLayerClass = '';
      this.keepkond = '';
      this.keyHeight = 0;
      // uni.offKeyboardHeightChange();
      setTimeout(function () {
        _this2.hideMore = true;
        _this2.hideEmoji = true;
      }, 150);
    },
    // ??????????????????
    chooseImage: function chooseImage() {
      this.getImage('album');
    },
    //????????????
    camera: function camera() {
      this.getImage('camera');
    },
    //????????? or ??????
    getImage: function getImage(type) {
      var that = this;
      getApp().backtall = null;
      //uni.closeSocket();
      uni.chooseImage({
        count: 9,
        sourceType: [type],
        sizeType: ['original', 'compressed'], //?????????????????????????????????????????????????????????
        success: function success(res) {

          // that.util.weeksort(function (x){
          // 	that.onMessageSo();
          // })
          for (var i in res.tempFiles) {
            // 1TB=1024GB 1GB=1024MB 1MB=1024KB 1KB=1024Byte
            var sizes = res.tempFiles[i].size / 1024 / 1024;
            if (sizes > 5) {
              uni.showToast({
                title: '??????????????????5M',
                icon: 'none' });

              return;
            }
          }
          uni.showLoading({
            title: '?????????' });

          that.upimg(res.tempFiles, 0);
        } });

    },
    upimg: function upimg(imglist, i) {
      var that = this;
      console.log(i, imglist[i]);
      uni.uploadFile({
        url: that.globalData.url + 'CrossDomainOrdinaryServlet',
        name: 'image',
        formData: {},
        filePath: imglist[i].path,
        success: function success(res) {
          uni.hideLoading();
          if (res.statusCode == 200) {
            var data = JSON.parse(res.data);
            var msg = data.url;

            if (i < imglist.length - 1) {
              that.isNext = true;
              that.nextObj = {
                list: imglist,
                i: i + 1 };

              that.sendMsg(msg, 'img');
            } else {
              that.isNext = false;
              that.sendMsg(msg, 'img');
            }
          } else if (res.statusCode == 404) {
            uni.showModal({
              title: '??????',
              content: '404,????????????????????????',
              showCancel: false });

          } else if (res.statusCode == 502) {
            uni.showModal({
              title: '??????',
              content: '502,?????????????????????',
              showCancel: false });

          }
        },
        fail: function fail(err) {
          uni.showModal({
            title: '??????',
            content: '??????????????????,??????????????????',
            showCancel: false });

        } });

    },
    // ????????????
    chooseEmoji: function chooseEmoji() {var _this3 = this;
      this.hideMore = true;
      setTimeout(function () {
        _this3.keyHeight = 0;
        _this3.keepkond = '';
      }, 150);
      if (this.hideEmoji) {
        this.hideEmoji = false;
        this.openDrawer();
      } else {
        this.hideDrawer();
      }
    },
    //????????????
    addEmoji: function addEmoji(em) {
      this.textMsg += em.alt;
    },
    //????????????????????????????????????ing,???????????????
    textareaClick: function textareaClick() {var _this4 = this;
      if (this.hideEmoji && this.hideMore && this.popupLayerClass == '') {
        var _sysInfo = uni.getSystemInfoSync();
        uni.onKeyboardHeightChange(function (res) {
          // ???let _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight;
          var _diff = (res.height / _sysInfo.screenHeight).toFixed(2);
          var kaydaff = _diff * 100;
          if (kaydaff != 0) {
            _this4.keyHeight = kaydaff - 0.8;
            var tsoa = kaydaff + 1;
            _this4.keepkond = "transform: translate3d(0,-" + tsoa + "%,0)";
          } else {
            //setTimeout(() =>{
            _this4.keyHeight = 0;
            _this4.keepkond = '';
            //},150)
          }
        });
      } else {
        uni.hideKeyboard();
        this.hideDrawer();
      }
      setTimeout(function () {
        _this4.scrollTop = _this4.msgList.length * 999999;
      }, 500);

    },
    // ??????????????????
    sendText: function sendText() {
      this.hideDrawer(); //????????????

      if (!this.textMsg) {
        return;
      }
      var content = this.replaceEmoji(this.textMsg);
      var msg = content;
      this.sendMsg(msg, 'text');
      this.textMsg = ''; //???????????????
    },
    //???????????????????????????
    replaceEmoji: function replaceEmoji(str) {var _this5 = this;
      var replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, function (item, index) {
        for (var i = 0; i < _this5.emojiList.length; i++) {
          var row = _this5.emojiList[i];
          for (var j = 0; j < row.length; j++) {
            var EM = row[j];
            if (EM.alt == item) {
              //???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 
              //????????????????????????????????????100.gif?????????https://www.xxx.com/emoji/100.gif ?????????onlinePath?????????https://www.xxx.com/emoji/
              var onlinePath = 'https://linli-community-api.niuclub.net/image/emoji2/';
              var imgstr = '<img width="24" height="24" src="' + onlinePath + EM.url + '">';
              return imgstr;
            }
          }
        }
      });
      return '<div style="display: flex;align-items: center;word-wrap:break-word;">' + replacedStr + '</div>';
    },

    // ????????????
    sendMsg: function sendMsg(content, type, cb) {
      //???????????????????????????????????????????????????????????????????????????
      var that = this;
      var nowDate = new Date();
      var msg = {
        type: 'user',
        msg: {
          id: 0,
          time: nowDate.getHours() + ":" + nowDate.getMinutes(),
          type: type,
          userinfo: {
            uid: 0,
            face: "/static/image/heardimg.png" },

          content: content } };


      var dataa = {
        "fromUserId": that.fromUserId,
        "toUserId": that.toUserId,
        "messageContent": content,
        "messageType": type == 'text' ? 0 : 1 //????????????(0?????? 1??????)
      };
      // ????????????
      that.util.ajax('contact/sendMessage', dataa, function (res) {
        // ????????????
        that.cheun(type, msg, cb);
        that.util.ajax('contact/queryChatLogList', {
          "fromUserId": that.fromUserId,
          "toUserId": that.toUserId,
          "curPage": 1,
          "pageSize": '10' },
        function (res) {
          var chatLogList = res.data.chatLogList;
          var data = chatLogList[0];
          var face = '';
          if (data.from_user_id == res.data.fromMemberInfo.id) {
            face = res.data.fromMemberInfo.head_img;
          } else if (data.from_user_id == res.data.toUserIdInfo.user_id) {
            face = res.data.toUserIdInfo.head_img;
          }
          if (data.message_type == 0) {
            var cont = data.message_content;
            var caijian = cont.replace(/display: flex;/, "");
            that.msgList.push({
              type: 'user',
              msg: {
                id: data.id,
                type: 'text',
                time: data.createtime,
                userinfo: {
                  uid: data.from_user_id == that.fromUserId ?
                  0 : 1,
                  face: face },

                content: {
                  text: caijian } } });



          } else if (data.message_type == 1) {
            that.msgList.push({
              type: 'user',
              msg: {
                id: data.id,
                type: 'img',
                time: data.createtime,
                userinfo: {
                  uid: data.from_user_id == that.fromUserId ?
                  0 : 1,
                  face: face },

                content: {
                  url: data.message_content,
                  w: 200,
                  h: 200 } } });



          }
          // ???????????????
          setTimeout(function () {
            that.scrollTop++;
            uni.hideLoading();
          }, 500);
        });
      });
    },
    // ??????????????????
    cheun: function cheun(type, msg, cb) {
      // if(type == 'text'){
      // 	msg.msg.content.text = msg.msg.content.text.replace(/display: flex;/,"");
      // }
      var that = this;
      uni.showLoading({
        title: '?????????' });

      var jsonsa = {};
      jsonsa.messageType = 1; //0????????? 1.?????? 2??????
      jsonsa.toUserName = that.toUserPhone;
      jsonsa.messageContent = type;
      jsonsa.roomId = 0;
      jsonsa.appId = 'jqDpwZCDEMw37Uh3';

      uni.sendSocketMessage({
        data: JSON.stringify(jsonsa),
        success: function success(res) {
          that.misshao = true;
          uni.hideLoading();
          // setTimeout(e=>{
          // 	cb&&cb()
          // },500)
        },
        fail: function fail(e) {
          console.log('fail', e);
          uni.hideLoading();
          //getApp().backtall = null;

          that.util.weeksort(function (res) {
            console.log('again');
            that.onMessageSo();
            that.cheun(type, msg);
          });
        } });

    },
    // ???????????????????????????
    addTextMsg: function addTextMsg(msg) {
      this.msgList.push(msg);
    },
    // ???????????????????????????
    addVoiceMsg: function addVoiceMsg(msg) {
      this.msgList.push(msg);
    },
    // ???????????????????????????
    addImgMsg: function addImgMsg(msg) {
      msg.msg.content = this.setPicSize(msg.msg.content);
      this.msgImgList.push(msg.msg.content.url);
      this.msgList.push(msg);
    },
    addRedEnvelopeMsg: function addRedEnvelopeMsg(msg) {
      this.msgList.push(msg);
    },
    // ?????????????????????????????????
    addSystemTextMsg: function addSystemTextMsg(msg) {
      this.msgList.push(msg);
    },
    // ?????????????????????????????????
    addSystemRedEnvelopeMsg: function addSystemRedEnvelopeMsg(msg) {
      this.msgList.push(msg);
    },
    // ????????????
    showPic: function showPic(url) {
      var inda = [];
      inda[0] = this.imageurl + url;
      uni.previewImage({
        indicator: "none",
        current: this.imageurl + url,
        urls: inda });

    },
    // ????????????/????????????
    switchVoice: function switchVoice() {
      this.hideDrawer();
      this.isVoice = this.isVoice ? false : true;
    },
    discard: function discard() {
      return;
    },
    // ???????????????
    isYear: function isYear(timeValue) {
      var dateyear = new Date(timeValue).getFullYear();
      var toyear = new Date().getFullYear();
      if (dateyear === toyear) {
        return true;
      } else {
        return false;
      }
    },
    formatTime: function formatTime(date) {
      var t = this.getTimeArray(date);
      return [t[0], t[1], t[2]].map(this.formatNumber).join('-') + ' ' + [t[3], t[4], t[5]].map(this.
      formatNumber).join(':');
    },
    getTimeArray: function getTimeArray(date) {
      date = new Date(date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return [year, month, day, hour, minute, second].map(this.formatNumber);
    },
    // ???????????? ???2018-7-6 -->(2018-07-06)
    formatNumber: function formatNumber(n) {
      n = n.toString();
      return n[1] ? n : '0' + n;
    },
    isYestday: function isYestday(timeValue) {// ???????????????
      var date = new Date(timeValue);
      var today = new Date();
      if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
        if (today.getDate() - date.getDate() === 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // ??????????????????????????????
    timeChange: function timeChange(timeValue) {
      // ?????? IOS??????????????? " / " ????????? " - "
      // timeValue = Date.parse(timeValue.replace(/-/g, '/'));
      var timeNew = new Date().getTime(); // ????????????
      var timeDiffer = timeNew - timeValue; // ?????????????????????

      var returnTime = '';
      // if (timeDiffer <= 60000) { // ????????????
      // 	returnTime = '??????';
      // } else if (timeDiffer > 60000 && timeDiffer < 600000) { // 10?????????
      // 	returnTime = Math.floor(timeDiffer / 60000) + '?????????';
      // } else if (timeDiffer >= 600000 && timeDiffer < 86400000 && this.isYestday(timeValue) === false) { // ??????
      if (timeDiffer < 86400000 && this.isYestday(timeValue) === false) {// ??????
        returnTime = this.formatTime(timeValue).substr(11, 5);
      } else if (timeDiffer >= 86400000 && timeDiffer < 86400000 * 2 && this.isYestday(timeValue) ===
      true) {// ??????
        returnTime = '??????' + this.formatTime(timeValue).substr(11, 5);
      } else if (timeDiffer > 86400000 * 2 && this.isYestday(timeValue) === false && this.isYear(timeValue) ===
      true) {// ??????
        returnTime = this.formatTime(timeValue).substr(5, 11);
      } else if (timeDiffer > 86400000 * 2 && this.isYestday(timeValue) === false && this.isYear(timeValue) ===
      false) {// ???????????????
        returnTime = this.formatTime(timeValue).substr(0, 16);
      }
      return returnTime;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 305:
/*!************************************************************************************************!*\
  !*** E:/lingli-community/web/android/pages/chat/HM-chat.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./HM-chat.vue?vue&type=style&index=0&lang=scss& */ 306);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_HM_chat_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 306:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/lingli-community/web/android/pages/chat/HM-chat.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[299,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chat/HM-chat.js.map