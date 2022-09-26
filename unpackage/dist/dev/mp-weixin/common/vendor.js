(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__767C2E9",
    appName: "阾里",
    appVersion: "1.0.19",
    appVersionCode: "1019",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.3",
    uniRuntimeVersion: "3.6.3",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__767C2E9",
      appName: "阾里",
      appVersion: "1.0.19",
      appVersionCode: "1019",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);

  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initUnknownHooks(mpOptions, vueOptions) {var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {return initHook$1(mpOptions, hook, excludes);});
}

function findHooks(vueOptions) {var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}

function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"阾里","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ?
  event.detail.__args__ || [event.detail] :
  [event.detail];

  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }

  var extraObj = processEventExtra(vm, extra, event, __args__);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 13:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 135:
/*!***************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/zhouWei-APPshare/js_sdk/appShare.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 14:
/*!***************************************************!*\
  !*** E:/lingli-community/web/android/util/all.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {// import uCharts from '../js_sdk/u-charts/u-charts/u-charts.js';
// import eCharts from '../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue';
// import uCharts from '../uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts-v2.0.0.js';
// import configu from '../uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
// import confige from '../uni_modules/qiun-data-charts/js_sdk/u-charts/config-echarts.js';
// import  { isJSON } from '../../js_sdk/u-charts/checker.js';
var _self;
var canvaLineA = null;
var canvaArcbar1 = null;
var canvaRing = null;
var canvasCozhu = null;
var shiti = null;
exports.install = function (Vue, options) {
  // 防抖
  Vue.prototype.$shake = function (fn) {
    var that = this;
    if (that.onoff) {
      that.onoff = false;
      fn();
      setTimeout(function () {
        that.onoff = true;
      }, 1500);
    } else {
      //如果一直走else分支可能是你没有在页面的data下面挂载onoff:true,不然一直都会走else
      // this.$alert("请稍后点击")
    }
  };
  // 提示弹窗
  Vue.prototype.$alert = function (title, icon, time, mask) {
    title = title == undefined ? "系统繁忙" : title;
    icon = icon == undefined ? "none" : icon;
    time = time == undefined ? 2000 : time;
    mask = mask == undefined ? true : mask;
    uni.showToast({
      title: title,
      icon: icon,
      mask: mask,
      duration: time });

  };
  // 确认弹窗
  Vue.prototype.$tipMsg = function (str) {
    uni.showModal({
      title: '提示',
      content: str,
      showCancel: true,
      success: function success(res) {
        uni.navigateBack({
          success: function success() {
            beforePage.onLoad(); // 执行上一页的onLoad方法
          } });

      } });

  },
  // 返回上页
  Vue.prototype.$jumpback = function (url) {
    uni.navigateBack({});


  },
  // 关闭页面跳转
  Vue.prototype.$jumpLa = function (url) {
    uni.redirectTo({
      url: url,
      animationType: 'zoom-fade-out',
      animationDuration: 200,
      fail: function fail(e) {
        console.log(e);
      } });

  },
  // 普通页面跳转
  Vue.prototype.$jump = function (url) {
    if (uni.getStorageSync('userId') == 40) {
      uni.showModal({
        title: '提示',
        content: '请先登录',
        confirmText: "去登录",
        success: function success(res) {
          if (res.confirm) {
            uni.removeStorageSync('userId');
            uni.removeStorageSync('userInfo');
            uni.removeStorageSync('access_token');
            uni.reLaunch({
              url: '/pages/login/login' });

          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        } });

    } else {
      uni.navigateTo({
        url: url,
        animationType: 'zoom-fade-out',
        animationDuration: 200,
        fail: function fail(e) {
          console.log(e);
        } });

    }

  },

  // tab页面跳转
  Vue.prototype.$jumpsw = function (url) {
    uni.switchTab({
      url: url,
      animationType: 'zoom-fade-out',
      animationDuration: 200 });

  },

  // 拨打电话
  Vue.prototype.$callphone = function (phone) {
    uni.makePhoneCall({
      phoneNumber: phone });

  },

  // 两秒后返回
  Vue.prototype.$twoback = function () {
    var timeout = setTimeout(function () {
      uni.navigateBack();
      clearTimeout(timeout);
    }, 2000);
  },

  // 修改tab页面
  Vue.prototype.$settab = function (ind, text, icon, select) {
    uni.setTabBarItem({
      index: ind,
      text: text,
      iconPath: "static/tab/" + icon,
      selectedIconPath: "static/tab/" + select });

  },

  //判断是否在国内，不在国内则不做偏移
  Vue.prototype.$out_of_china = function (lng, lat) {
    var lat = +lat;
    var lng = +lng;
    // 纬度3.86~53.55,经度73.66~135.05 
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
  };
  //检查是否授权
  // Vue.prototype.$checkUserSetting = function (cb) {
  //   uni.getSetting({
  //     success(dataShow) {
  //       if (dataShow.authSetting['scope.userInfo']) {
  //         cb(true)
  //       } else if (!dataShow.authSetting['scope.userInfo']) {
  //         cb(false)
  //       }
  //     }
  //   })
  // }


  Vue.prototype.$email = function (str) {//邮箱
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str);
  };
  Vue.prototype.$chineseName = function (str) {//中文姓名
    return /^[\u4E00-\u9FA5]{2,4}$/.test(str);
  };
  Vue.prototype.$mobile = function (str) {//手机
    return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(str);
  };
  Vue.prototype.$tel = function (str) {//固话
    return /^0[\d]{2,3}-[\d]{7,8}$/.test(str);
  };
  Vue.prototype.$idCard = function (str) {//身份证
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
  };
  Vue.prototype.$amount = function (str) {//金额(8位整数2位小数)
    return /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(str);
  };
  Vue.prototype.$positiveInt = function (str) {//正整数
    return /^[1-9]*[1-9][0-9]*$/.test(str);
  };
  Vue.prototype.$integer = function (str) {//整数(不限位数)
    return /^-?\d+$/.test(str);
  };
  Vue.prototype.$chinese = function (str) {//判断是不是中文
    return /[\u4e00-\u9fa5]/g.test(str);
  };
  Vue.prototype.$carNum = function (str) {
    return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/.test(str);
  };
  Vue.prototype.$isEmpty = function (str) {//判断字符串是否为空
    return str == null || str.length == 0 || typeof str == "undefined" || str == '' || str == {};
  };
  // 获取当前日期
  Vue.prototype.$date = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return year + "/" + month + "/" + day;
  };

  // 获取当前时分
  Vue.prototype.$dateshifen = function () {
    var date = new Date();
    var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return hh + ":" + mf;
  };

  // 获取当前月
  Vue.prototype.$datemon = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return year + "/" + month;
  };

  // 转换时间格式
  Vue.prototype.$timeturn = function (tims) {
    var tiam = tims.replace(/\//g, "-");
    return tiam;
  };

  // 获取前50年
  Vue.prototype.$lastfive = function () {
    var date = new Date();
    var nowyear = date.getFullYear();
    var fiveyear = date.getFullYear() - 50;
    var yearmore = [];
    for (var i = fiveyear; i <= nowyear; i++) {
      yearmore.push(fiveyear);
      fiveyear++;
    }
    return yearmore;
  };

  // 获取明天
  Vue.prototype.$grttomorr = function () {
    //明天的时间
    var day = new Date();
    day.setTime(day.getTime() + 24 * 60 * 60 * 1000);
    var month = day.getMonth() < 10 ? "0" + (day.getMonth() + 1) : day.getMonth() + 1;
    var dayas = day.getDate() < 10 ? "0" + day.getDate() : day.getDate();
    return month + "-" + dayas;
  };

  // 获取当天
  Vue.prototype.$grttnowdate = function () {
    var date = new Date();
    var yy = date.getFullYear();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return yy + '-' + mm + '-' + dd;
  };

  // 获取当前日期时间
  Vue.prototype.$datetime = function () {
    var date = new Date();
    var yy = date.getFullYear();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hh = date.getHours();
    var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
  };

  // 计算时间差
  Vue.prototype.$hourss = function (dateBegin, dateEnd) {
    var dateDiff = new Date(dateEnd).getTime() - new Date(dateBegin).getTime(); //时间差的毫秒数
    //计算相差天数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    //计算相差小时数
    var hours = Math.floor(dateDiff / (3600 * 1000)); //计算出相差小时数
    return dayDiff + "/" + hours;
  };

  // 时间戳转换
  Vue.prototype.$shijian = function (timea) {
    var date = new Date(timea);
    var yy = date.getFullYear();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hh = date.getHours();
    var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return mm + '-' + dd + ' ' + hh + ':' + mf;
  };
  // 时间戳转换
  Vue.prototype.$shijianymd = function (timea) {
    var date = new Date(timea);
    var yy = date.getFullYear();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hh = date.getHours();
    var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return yy + '-' + mm;
  };

  // 时间戳转换
  Vue.prototype.$shijiandate = function (timea) {
    var date = new Date(timea);
    var yy = date.getFullYear();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hh = date.getHours();
    var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return mm + '-' + dd;
  };

  Vue.prototype.$shijiansp = function (timea) {
    var date = new Date(timea);
    var yy = date.getFullYear();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hh = date.getHours();
    var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
  };

  // 时间戳转换
  Vue.prototype.$shijianhour = function (timea) {
    var date = new Date(timea);
    var hh = date.getHours();
    var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return hh + ':00';
  };
  // 时间戳转换
  Vue.prototype.$shijianhour2 = function (timea) {
    var date = new Date(timea);
    var hh = date.getHours();
    var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return hh + ':' + mf;
  };

  // 计算时间差
  Vue.prototype.$timend = function (dateBegin, dateEnd) {
    var dateDiff = new Date(dateEnd).getTime() - new Date(dateBegin).getTime(); //时间差的毫秒数
    //计算相差天数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    return dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
  };

  // 获取当月天数
  Vue.prototype.$getDaysInMonth = function (year, month) {
    month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
    var temp = new Date(year, month, 0);
    return temp.getDate();
  };

  // 修改月份
  Vue.prototype.$changemont = function (datetime, more) {
    var year = datetime.split('-')[0] * 1;
    var mon = datetime.split('-')[1] * 1;
    if (more == 'jian') {
      if (mon > 1) {
        --mon;
      } else {
        --year;
        mon = 12;
      }
    } else {
      if (mon < 12) {
        mon++;
      } else {
        year++;
        mon = 1;
      }
    }
    mon = mon < 10 ? '0' + mon : mon;
    return year + '-' + mon;
  };

  Vue.prototype.$hidePhone = function (cellValue) {
    if (Number(cellValue) && String(cellValue).length === 11) {
      var mobile = String(cellValue);
      var reg = /^(\d{3})\d{4}(\d{4})$/;
      return mobile.replace(reg, '$1****$2');
    } else {
      return cellValue;
    }
  };

  // 修改日期
  Vue.prototype.$changedate = function (datetime, daymonth, more) {
    var year = datetime.split('-')[0] * 1;
    var mon = datetime.split('-')[1] * 1;
    var dauy = datetime.split('-')[2] * 1;
    if (more == 'add') {
      if (dauy < daymonth) {
        dauy++;
      } else {
        dauy = 1;
        if (mon < 12) {
          mon++;
        } else {
          mon = 1;
          year++;
        }
      }
      if (mon < 10) {
        mon = '0' + mon;
      }
      if (dauy < 10) {
        dauy = '0' + dauy;
      }
    } else if (more == 'jian') {
      if (dauy > 1) {
        dauy--;
      } else {
        dauy = daymonth;
        if (mon > 1) {
          mon--;
        } else {
          mon = 12;
          year--;
        }
      }
      if (mon < 10) {
        mon = '0' + mon;
      }
      if (dauy < 10) {
        dauy = '0' + dauy;
      }
    }
    return year + "-" + mon + "-" + dauy;
  };

  // 切换选中样式
  Vue.prototype.$tunrncss = function (item, index, leist) {
    for (var i in leist) {
      leist[i].typeap = false;
    }
    leist[index].typeap = true;
  };

  // 阿拉伯数字转中文
  Vue.prototype.$turan = function (num) {
    var cnnum = '';
    if (num == 1) {
      cnnum = '一';
    } else if (num == 2) {
      cnnum = '二';
    } else if (num == 3) {
      cnnum = '三';
    } else if (num == 4) {
      cnnum = '四';
    } else if (num == 5) {
      cnnum = '五';
    } else if (num == 6) {
      cnnum = '六';
    } else if (num == 7) {
      cnnum = '七';
    } else if (num == 8) {
      cnnum = '八';
    } else if (num == 9) {
      cnnum = '九';
    } else if (num == 10) {
      cnnum = '十';
    }
    return cnnum;
  };

  Vue.prototype.Img = function (url) {
    if (url && url.indexOf('http') !== -1) {
      return url;
    }
    return !url || url == '' ? '/static/image/without.png' : this.globalData.imageurl + url;
  };

  // 获取地址
  Vue.prototype.$getas = function (lats, lngs, dizhis) {
    var dizhi = dizhis;
    var lat = lats;
    var lng = lngs;
    uni.getLocation({
      type: 'wgs84',
      success: function success(res) {
        console.log(res);
        uni.openLocation({ //​使用微信内置地图查看位置。
          latitude: lat, //要去的纬度-地址
          longitude: lng, //要去的经度-地址
          name: dizhi,
          address: dizhi });

      } });

  };

  // 随机色
  Vue.prototype.$rabcolor = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  };

  // 创建ucharts折线图
  Vue.prototype.$canva = function (canvasId, chartData, cWidth, cHeight, maxs, top, bottom) {
    // console.log(maxs)
    // console.log(top)
    // console.log(bottom)
    shiti = chartData.shiji;
    canvaLineA = new uCharts({
      $this: this,
      canvasId: canvasId,
      type: 'area',
      fontSize: 11,
      legend: {
        show: false },

      dataLabel: false, //峰值
      dataPointShape: true, //峰点
      // dataPointShapeType:'hollow',//实心或空心
      background: '#FFFFFF',
      pixelRatio: 1,
      categories: chartData.categories,
      series: chartData.series,
      animation: false,
      enableScroll: true,
      xAxis: {
        disableGrid: true,
        type: 'line',
        gridType: 'solid',
        itemCount: 4,
        scrollShow: true,
        scrollAlign: 'left',
        scrollBackgroundColor: '#FFF',
        scrollColor: '#FFF'
        // boundaryGap:'justify',
        // disabled:true,
        // gridColor:'#d8d8d8',
        // axisLineColor:'#d8d8d8',
        // disableGrid:true,
        // addLine:true,
        // type:'line',
        // gridType:'solid',
        // dashLength:8,
        // labelCount: 4,
      },
      yAxis: {
        // disabled:true,
        // disableGrid:true,
        gridType: 'solid',
        dashLength: 8,
        splitNumber: 4,
        data: [{
          min: 0,
          max: maxs * 10,
          axisLine: false, //隐藏y轴
          position: 'left',
          // format:(val)=>{return val.toFixed(0)}
          format: function format(val) {
            // console.log(val)
            if (val == 0) {
              val = '';
            } else if (val == maxs * 2.5) {
              val = bottom;
            } else if (val == maxs * 5) {
              val = maxs * 0.5;
            } else if (val == maxs * 7.5) {
              val = top;
            } else {
              val = '';
            }
            return val;
          } },

        {
          min: 0,
          max: maxs * 10,
          axisLine: false, //隐藏y轴
          position: 'right',
          // format:(val)=>{return val.toFixed(0)}
          format: function format(val) {
            if (val == 0) {
              val = '';
            } else if (val == maxs * 2.5) {
              val = '下限';
            } else if (val == maxs * 5) {
              val = '推荐值';
            } else if (val == maxs * 7.5) {
              val = '上限';
            } else {
              val = '';
            }
            return val;
          } }] },



      width: cWidth,
      height: cHeight,
      extra: {
        area: {
          gradient: true, //渐变
          type: 'straight', //直线或者弧线
          opacity: 0,
          addLine: true, //有无线
          width: 2 } } });



  };
  // 折线图
  Vue.prototype.$touchA = function (e) {
    canvaLineA.scrollStart(e);
  };
  // 折线图
  Vue.prototype.$moveA = function (e) {
    canvaLineA.scroll(e);
  };
  // 折线图
  Vue.prototype.$touchEndA = function (e) {
    canvaLineA.scrollEnd(e);
    var dataIndex = canvaLineA.getCurrentDataIndex(e);
    // let food_nutrient_element_value = shiti[dataIndex].valueAverage;
    // console.log(dataIndex)
    // console.log(shiti[dataIndex])
    return shiti[dataIndex];
    //下面是toolTip事件，如果滚动后不需要显示，可不填写
    // canvaLineA.showToolTip(e, {
    // 	format: function (item, category) {
    // 		return category + ' ' + food_nutrient_element_value + item.name
    // 	}
    // });
  };

  // 创建ucharts圆环图
  Vue.prototype.$canvayuan = function (canvasId, chartData, cWidth, cHeight, arcbarWidth) {
    canvaArcbar1 = new uCharts({
      $this: _self,
      canvasId: canvasId,
      type: 'arcbar',
      fontSize: 10,
      legend: {
        show: false },

      background: '#FFFFFF',
      pixelRatio: 1,
      series: chartData.series,
      animation: false,
      width: cWidth,
      height: cHeight,
      dataLabel: true,
      subtitle: {
        name: chartData.series[0].name, //这里您可以直接给任意字符串
        color: '#666666',
        fontSize: 12,
        offsetY: -25 },

      title: {
        name: chartData.series[0].number,
        color: chartData.series[0].color,
        fontSize: 16,
        offsetY: 15 },

      extra: {
        arcbar: {
          type: 'circle', //整圆类型进度条图
          width: arcbarWidth, //圆弧的宽度
          startAngle: 1.5, //整圆类型只需配置起始角度即可
          backgroundColor: '#FEFAEB' } } });



  };

  // 创建ucharts三圆环图
  Vue.prototype.$canvayuans = function (canvasId, chartData, cWidth, cHeight, arcbarWidth) {
    canvaArcbar1 = new uCharts({
      $this: _self,
      canvasId: canvasId,
      type: 'arcbar',
      fontSize: 10,
      legend: {
        show: false },

      background: '#FFFFFF',
      pixelRatio: 1,
      series: chartData.series,
      animation: true,
      width: cWidth,
      height: cHeight,
      dataLabel: true,
      subtitle: {
        name: chartData.series[0].name, //这里您可以直接给任意字符串
        color: '#212121',
        fontSize: 18,
        offsetY: 0 },

      title: {
        name: chartData.series[0].number,
        color: chartData.series[0].color,
        fontSize: 16,
        offsetY: 15 },

      extra: {
        arcbar: {
          type: 'circle', //整圆类型进度条图
          width: arcbarWidth, //圆弧的宽度
          startAngle: 1.5, //整圆类型只需配置起始角度即可
          backgroundColor: '#F4F5F9' } } });



  };

  // 创建ucharts圆形图
  Vue.prototype.$canvaRing = function (canvasId, chartData, cWidth, cHeight) {
    canvaRing = new uCharts({
      $this: _self,
      canvasId: canvasId,
      type: 'ring',
      fontSize: 11,
      legend: true,
      // title: {
      // 	name: '70%',
      // 	color: '#7cb5ec',
      // 	fontSize: 25*1,
      // 	offsetY:-20*1,
      // },
      // subtitle: {
      // 	name: '收益率',
      // 	color: '#666666',
      // 	fontSize: 15*1,
      // 	offsetY:30*1,
      // },
      extra: {
        pie: {
          offsetAngle: -90,
          ringWidth: 30 * 1,
          labelWidth: 15,
          borderColor: '#000' } },


      background: '#FFFFFF',
      pixelRatio: 1,
      series: chartData.series,
      animation: true,
      width: cWidth * 1,
      height: cHeight * 1,
      disablePieStroke: true,
      dataLabel: true });

  };
  // 圆环图点击
  Vue.prototype.$RingA = function (e) {
    canvaRing.showToolTip(e, {
      format: function format(item) {
        return item.name + ':' + item.data;
      } });

  };


  // 柱形图
  Vue.prototype.$canvasCozhusa = function (canvasId, chartData, cWidth, cHeight) {
    canvasCozhu = {
      type: "column",
      canvasId: canvasId,
      canvas2d: false,
      background: "none",
      animation: true,
      timing: "easeOut",
      duration: 1000,
      categories: chartData.categories,
      series: chartData.series,
      color: [
      "#255CFD"],

      rotate: false,
      reserve: false,
      fontSize: 13,
      fontColor: "#666666",
      enableScroll: false,
      touchMoveLimit: 60,
      enableMarkLine: false,
      dataLabel: true,
      dataPointShape: true,
      dataPointShapeType: "solid",
      xAxis: {
        disabled: false,
        axisLine: true,
        axisLineColor: "#EAEAEA",
        calibration: false,
        fontColor: "#666666",
        fontSize: 13,
        rotateLabel: false,
        itemCount: 5,
        boundaryGap: "center",
        disableGrid: true,
        gridColor: "#EAEAEA",
        gridType: "solid",
        dashLength: 4,
        gridEval: 1,
        scrollShow: false,
        scrollAlign: "left",
        scrollColor: "#A6A6A6",
        scrollBackgroundColor: "#EFEBEF" },

      yAxis: {
        disabled: false,
        disableGrid: false,
        splitNumber: 5,
        gridType: "solid",
        dashLength: 8,
        gridColor: "#EAEAEA",
        padding: 10,
        showTitle: false },

      legend: {
        show: false,
        position: "bottom",
        float: "center",
        padding: 5,
        margin: 5,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        fontSize: 13,
        fontColor: "#666666",
        lineHeight: 11,
        hiddenColor: "#CECECE",
        itemGap: 10 },

      extra: {
        column: {
          type: "group",
          width: 20,
          seriesGap: 2,
          categoryGap: 3,
          barBorderCircle: true,
          linearType: "none",
          linearOpacity: 1,
          colorStop: 0,
          meterBorder: 1,
          meterFillColor: "#FFFFFF",
          activeBgColor: "#255CFD",
          activeBgOpacity: 0.1,
          meterBorde: 1 },

        tooltip: {
          showBox: true,
          showArrow: true,
          borderWidth: 0,
          borderRadius: 0,
          borderColor: "#000000",
          borderOpacity: 0.7,
          bgColor: "#000000",
          bgOpacity: 0.7,
          gridType: "solid",
          dashLength: 4,
          gridColor: "#CCCCCC",
          fontColor: "#FFFFFF",
          splitLine: true,
          horizentalLine: false,
          xAxisLabel: false,
          yAxisLabel: false,
          labelBgColor: "#FFFFFF",
          labelBgOpacity: 0.7,
          labelFontColor: "#666666" },

        markLine: {
          type: "solid",
          dashLength: 4,
          data: [] } } };



  };

};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!***************************************************!*\
  !*** E:/lingli-community/web/android/util/api.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  login: 'user/login', //登录
  queryBalanceInfo: 'dealer/queryBalanceInfo', //查询钱包信息
  queryCommissionLog: 'dealer/queryCommissionLog', //查询佣金明细
  queryWithdrawalLog: 'dealer/queryWithdrawalLog', //查询提现明细
  updatePassword: 'user/updatePassword', //修改密码
  dealerWithdrawal: 'dealer/dealerWithdrawal' //经销商提现
};

/***/ }),

/***/ 16:
/*!****************************************************!*\
  !*** E:/lingli-community/web/android/util/util.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {











var _wx_messagePush = __webpack_require__(/*! @/static/js/wx_messagePush.js */ 17);var _module$exports;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;} // var domain = "http://192.168.0.118:8769/apiModule/";//本地
var domain = "https://linli-community-api.niuclub.net/apiModule/"; //线上 
var openIds = '111'; //openId
var userId = ''; //userId
var PI = 3.1415926535897932384626;var x_PI = 3.14159265358979324 * 3000.0 / 180.0;var a = 6378245.0;var ee = 0.00669342162296594323;var imgRList = []; //图片集合
var systemData = null;var appId = 'wx8cd0cfe284e7e4c0'; //appId
var tempFilePathsIndex = 0; //遍历选择图片的下标
function _ajax(url, data, cb, header, flag) {header ? header['content-type'] = 'application/json' : header = { 'content-type': 'application/json' };

  uni.request({
    url: domain + url,
    method: "POST",
    data: data,
    header: header,
    success: function success(res) {
      if (res.statusCode == 200) {
        if (res.data.code == 1 || res.data.code == 200) {
          cb(res.data);
        } else {
          var thias = res.data.msg;
          if (thias == 'staffId参数不能为空') {
            thias = '请登录';
          }
          if (thias == '用户ID不存在,请重新登录' || thias == '用户ID不能为空') {
            uni.reLaunch({
              url: '/pages/login/login' });

          } else {
            uni.showToast({
              title: thias,
              icon: 'none' });

          }
        }
      } else if (res.statusCode == 404) {
        uni.showModal({
          title: '提示',
          content: '404,访问地址不存在！',
          showCancel: false });

      } else if (res.statusCode == 502) {
        uni.showModal({
          title: '提示',
          content: '502,服务器无响应！',
          showCancel: false });

      }
    },
    fail: function fail(err) {
      // uni.hideLoading();
      uni.showModal({
        title: '提示',
        content: '网络状态不佳,请稍后再试！',
        showCancel: false });

    } });

}

function out_of_china(lng, lat) {//判断是否在国内，不在国内则不做偏移
  var lat = +lat;
  var lng = +lng;
  // 纬度3.86~53.55,经度73.66~135.05 
  return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
}

function transformlat(lng, lat) {
  var lat = +lat;
  var lng = +lng;
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformlng(lng, lat) {
  var lat = +lat;
  var lng = +lng;
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
}

function getWxUser(cb) {
  var that = this;
  //调用登录接口
  wx.showLoading({
    title: '加载中' });

  wx.getUserInfo({
    withCredentials: false,
    success: function success(res) {
      module.exports.wxUser = res.userInfo;
      wx.getStorageSync('wxUser', JSON.stringify(res.userInfo));
      typeof cb == "function" && cb(res.userInfo);
    },
    fail: function fail(err) {
      wx.showModal({
        title: '提示',
        content: err.errMsg,
        showCancel: false });

    } });

}

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //月
    "d+": this.getDate(), //日
    "H+": this.getHours(), //时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.
  length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).
    length));}
  return format;
};

var wxUser, user, shop;
// user={userId:33,personalId:34,sex:1,shopId:1};//店铺
// user={userId:3,personalId:4,sex:1};//非店铺

module.exports = (_module$exports = {
  ajax: function ajax(url, data, cb, flag) {
    var header = {};
    flag = flag ? flag : false;
    wx.getStorage({
      key: 'sessionId',
      success: function success(res) {
        header = {
          'Cookie': 'JSESSIONID=' + res.data };

        _ajax(url, data, cb, header, flag);
      },
      fail: function fail() {
        _ajax(url, data, cb, header, flag);
      } });

  },
  imageUrl: domain,
  apiUrl: domain,
  openid: openIds,
  userId: userId,
  user: user,
  wxUser: wxUser,
  shop: shop,
  call: function call(phone) {
    wx.makePhoneCall({
      phoneNumber: phone });

  },
  //清除缓存
  clearhuan: function clearhuan() {
    var os = plus.os.name;
    if (os == 'Android') {
      var main = plus.android.runtimeMainActivity();
      var sdRoot = main.getCacheDir();
      var files = plus.android.invoke(sdRoot, "listFiles");
      var len = files.length;
      for (var i = 0; i < len; i++) {
        var filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
        plus.io.resolveLocalFileSystemURL(filePath, function (entry) {
          if (entry.isDirectory) {
            entry.removeRecursively(function (entry) {//递归删除其下的所有文件及子目录  
              // console.log('1')
            }, function (e) {
              // console.log(e.message)  
            });
          } else {
            entry.remove();
          }
        }, function (e) {
          // console.log('文件路径读取失败')  
        });
      }
    }
  },
  noMultipleClicks: function noMultipleClicks(noClick, cb) {
    if (noClick) {
      cb();
    } else {
      uni.showToast({
        title: '不要连续点击哦',
        icon: 'none' });

    }
  },
  getImageUrl: function getImageUrl(url) {
    if (url.indexOf('http') > -1) {
      return url;
    } else {
      return domain + 'image/' + url;
    }
  },
  weeksort: function weeksort(cb) {var _this = this; //长链接
    var toUserId = uni.getStorageSync('userInfo').phone;
    // var socketlink = "ws://192.168.1.26:9077/apiModule/ws/chat/" + toUserId + "/123456/0/O4HpflBADiZu3Ue@";
    var socketlink = "wss://chat2.niuclub.net/apiModule/ws/chat/" + toUserId + "/111111/0/jqDpwZCDEMw37Uh3";
    uni.closeSocket(); //创建新的socket连接前确保旧的已关闭
    clearTimeout(this.hearinva); //关闭心跳包
    //创建一个socket连接
    uni.connectSocket({
      url: socketlink,
      success: function success(res) {} });

    //监听socket打开
    uni.onSocketOpen(function () {
      console.log('WebSocket连接已打开！');
      getApp().backtall = '0';
      if (cb) {
        cb();
      } else {
        _this.getsort();
      }
    });
    //监听socket关闭
    uni.onSocketClose(function (e) {
      console.log('WebSocket连接已关闭！');
      // if(getApp().backtall == 0){
      // 	setTimeout(()=>{
      // 		this.weeksort(); 
      // 	},50)
      // } 

    });
    //监听socket错误 
    uni.onSocketError(function (e) {
      console.log(e);
      uni.closeSocket();
      setTimeout(function () {
        _this.weeksort();
      }, 50);
    });
  },
  getsort: function getsort(cb) {var _this2 = this; //监听
    //监听socket消息
    uni.onSocketMessage(function (res) {
      var that = _this2;
      that.hearinva = setTimeout(function () {
        var jsonsa = {};
        jsonsa.messageType = 0; //0.心跳包 1.单聊 2群聊
        jsonsa.toUserName = '';
        jsonsa.messageContent = 'ping';
        jsonsa.roomId = 0;
        jsonsa.appId = 'jqDpwZCDEMw37Uh3';
        uni.sendSocketMessage({
          data: JSON.stringify(jsonsa),
          success: function success(res) {
            clearTimeout(that.hearinva);
          },
          fail: function fail() {
            that.weeksort(function () {
              that.getsort(cb);
            });
          } });

        var infos = JSON.parse(res.data);
        console.log('WebSocket:', infos);
        // 用户ID
        var userid = uni.getStorageSync('userId');
        // 用户类型 (1.平台 2.运营点 3.商家 4.达人 5.普通会员)
        var usertype = uni.getStorageSync('userInfo').user_type;
        if (infos != null && infos != '' && infos != undefined && infos !=
        '用户未登录,请先登录') {
          // 推送订单消息或语音
          var innerAudioContext = uni.createInnerAudioContext();
          innerAudioContext.autoplay = true;
          // 根据用户推送
          if (usertype == 3) {//用户是商家
            // 通知列表
            that.ajax('message/listPage', {
              "userId": userid,
              "isRead": 1 },
            function (res) {
              var arr = res.data.list;
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].title == '有新订单') {













                  (0, _wx_messagePush.send_msg)(
                  'LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw', {
                    "character_string1": {
                      "value": arr[i].createtime },

                    "time4": {
                      "value": _this2.dateFormat(
                      'yyyy-MM-dd HH:mm', arr[i].
                      createtime) } });



                }
              }
            });
          } else if (usertype == 4) {//用户是达人
            // 发布需求列表
            that.ajax('release/releaseList', {
              "userId": that.userid },
            function (res) {
              var arr = res.data.list;
              var time = new Date().getTime();
              for (var i = 0; i < arr.length; i++) {
                if (time - arr[0].createtime <= 10000) {













                  (0, _wx_messagePush.send_msg)(
                  'iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE', {
                    "amount2": {
                      "value": arr[i].commission },

                    "time4": {
                      "value": _this2.dateFormat(
                      'yyyy-MM-dd HH:mm', arr[i].
                      createtime) },

                    "thing3": {
                      "value": arr[i].
                      requirement_introduction } });



                }
              }
            });
          }

          // 消息类别 1 => 图片
          if (infos.data.messageType == 1) {
            if (userid) {
              that.ajax('contact/queryAllUnreadMessage', {
                "fromUserId": userid },
              function (res) {
                if (res.data.unreadCount) {
                  if (res.data.unreadCount > 99) {
                    uni.showTabBarRedDot({
                      index: 2 });

                  } else {
                    uni.setTabBarBadge({
                      index: 2,
                      text: res.data.unreadCount > 99 ?
                      '99+' : res.data.unreadCount.
                      toString() });

                  }
                } else {
                  uni.hideTabBarRedDot({
                    index: 2 });

                  uni.removeTabBarBadge({
                    index: 2 });

                }
              });
            }
            setTimeout(function () {
              cb && cb(infos);
            }, 50);
          } else {
            console.log('heart***');
          }
        } else {
          that.$jump('/pages/login/login');
        }
      }, 10000);

    });
  },
  // 获取wx access_token
  get_wx_access_token: function get_wx_access_token() {
    uni.request({
      url: 'https://linli-community-api.niuclub.net/apiModule/member/querySecret',
      method: 'POST',
      data: {},
      success: function success(json) {
        var id = json.data.data.set.app_id;
        var key = json.data.data.set.app_secret;
        return uni.request({
          method: 'get',
          url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".concat(id, "&secret=").concat(key),
          dataType: 'json',
          timeout: 30000 }).
        then(function (res) {var _res = _slicedToArray(
          res, 2),err = _res[0],success = _res[1];
          if (success.statusCode == 200) {
            // return success.data.access_token
            uni.setStorageSync('access_token', success.data.access_token);
          }
        });
      } });

  },
  //上传图片
  sendimage: function sendimage(imagele, iima, cb) {
    uni.chooseImage({
      count: imagele, //默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function success(res) {
        // console.info(res.tempFilePaths[0])
        // 1TB=1024GB 1GB=1024MB 1MB=1024KB 1KB=1024Byte
        // let sizes = res.tempFiles[0].size / 1024 /1024;
        var tempFilePaths = res.tempFilePaths;
        // imalist.push(res.tempFilePaths[0]);
        for (var i = 0; i < tempFilePaths.length; i++) {
          uni.uploadFile({
            url: domain + 'CrossDomainOrdinaryServlet',
            name: 'image',
            formData: {},
            filePath: tempFilePaths[i],
            success: function success(res) {
              if (res.statusCode == 200) {
                var data = JSON.parse(res.data);
                if (data.state == 'SUCCESS') {
                  console.info(data);
                  iima.push(data.url);
                  cb && cb();
                } else {
                  uni.showToast({
                    title: '上传失败',
                    icon: 'none' });


                }
              } else if (res.statusCode == 404) {
                uni.showModal({
                  title: '提示',
                  content: '404,访问地址不存在！',
                  showCancel: false });

              } else if (res.statusCode == 502) {
                uni.showModal({
                  title: '提示',
                  content: '502,服务器无响应！',
                  showCancel: false });

              }
            },
            fail: function fail(err) {
              uni.showModal({
                title: '提示',
                content: '网络状态不佳,请稍后再试！',
                showCancel: false });

            } });

        }
      } });

  },
  //上传视频
  sendvidd: function sendvidd(cb) {
    uni.chooseVideo({
      count: 1,
      maxDuration: 13,
      sourceType: ['camera'],
      success: function success(res) {
        // 1TB=1024GB 1GB=1024MB 1MB=1024KB 1KB=1024Byte
        var duration = res.duration;
        if (duration == 14) {
          uni.showToast({
            title: '视频不得大于13秒',
            icon: 'none' });

        } else {
          var vidwhidth = res.width;
          var vidheight = res.height;
          var tempFilePaths = res.tempFilePath;
          uni.showLoading({
            title: '上传中' });

          uni.uploadFile({
            url: domain + 'CrossDomainOrdinaryServlet',
            name: 'image',
            filePath: tempFilePaths,
            formData: {
              'image': tempFilePaths,
              'videoHigth': vidwhidth,
              'videoWidth': vidheight },

            success: function success(res) {
              uni.hideLoading();
              if (res.statusCode == 200) {
                var data = JSON.parse(res.data);
                cb && cb(data);
              } else if (res.statusCode == 404) {
                uni.showModal({
                  title: '提示',
                  content: '404,访问地址不存在！',
                  showCancel: false });

              } else if (res.statusCode == 502) {
                uni.showModal({
                  title: '提示',
                  content: '502,服务器无响应！',
                  showCancel: false });

              }
            },
            fail: function fail(err) {
              uni.showModal({
                title: '提示',
                content: '网络状态不佳,请稍后再试！',
                showCancel: false });

            } });

        }
      } });

  },

  //检查登录
  checkLogin: function checkLogin(cb) {
    //this.user = { bindPhone: 1, nickName: "梦想", personalId: 20, userId: 556, userName: "18218285793" };
    if (module.exports.user) {
      cb();
    } else {
      if (wx.getStorageSync('user')) {
        var user = JSON.parse(wx.getStorageSync('user'));
        module.exports.user = user;
        var wxUser = JSON.parse(wx.getStorageSync('wxUser'));
        module.exports.wxUser = wxUser;

      } else {
        if (wx.getStorageSync('wxUser')) {
          var wxUser = JSON.parse(wx.getStorageSync('wxUser'));
          module.exports.wxUser = wxUser;
          module.exports.quetyUserInfoByopenId(cb);
        } else {
          cb();
        }
      }
    }
  },
  register: function register(cb) {//一次注册
    var shopId = wx.getStorageSync('shopId') ? wx.getStorageSync('shopId') : 0;
    if (module.exports.wxUser.phone) {
      _ajax('user/bindPhoneByOpenId', {
        openId: module.exports.wxUser.openId,
        headImg: module.exports.wxUser.headImage,
        nickName: module.exports.wxUser.nickName,
        sex: module.exports.wxUser.sex,
        shopId: shopId,
        phone: module.exports.wxUser.phone,
        area: module.exports.wxUser.address },
      function (json) {
        module.exports.user = json.data;
        wx.getStorageSync('user', JSON.stringify(module.exports.user));
        cb();
      });
    } else {
      cb({
        flag: false,
        type: 1 });
      //没有手机号码
    }
  },
  quetyUserInfoByopenId: function quetyUserInfoByopenId(cb) {//根据openid查询用户信息
    _ajax('user/queryUserByOpenId', {
      type: 2,
      openId: module.exports.wxUser.openId },
    function (json) {
      if (!json.data) {
        module.exports.register(cb);
      } else {
        module.exports.user = json.data;
        wx.getStorageSync('user', JSON.stringify(module.exports.user));
        cb();
      }
    });
  },
  checkUserSetting: function checkUserSetting(cb) {//检查是否授权
    wx.getSetting({
      success: function success(dataShow) {
        if (dataShow.authSetting['scope.userInfo']) {
          cb(true);
        } else if (!dataShow.authSetting['scope.userInfo']) {
          cb(false);
        }
      } });

  },
  getUserInfo: function getUserInfo(cb) {//获取用户信息
    if (wx.getStorageSync('wxUser')) {
      cb();
    } else {
      wx.getUserInfo({
        lang: "zh_CN",
        complete: function complete(codeInfo) {
          var wxUser = {
            headImage: codeInfo.userInfo.avatarUrl,
            nickName: codeInfo.userInfo.nickName,
            sex: codeInfo.userInfo.gender };

          console.info(codeInfo);
          wx.login({
            complete: function complete(res) {
              wx.getStorageSync('wxcode', res.code);
              module.exports.ajax(
              'wxcore/getUserOpenId?code=' +
              res.
              code, {},
              function (json) {
                wx.checkSession({
                  success: function success() {
                    console.info(
                    codeInfo);

                    wx.getStorageSync(
                    'session_key',
                    json.
                    session_key);

                    module.exports.
                    getAddress(
                    codeInfo,
                    function (
                    infoInfomation)
                    {
                      wxUser[

                      'address'] =

                      infoInfomation.
                      province +
                      infoInfomation.
                      city;
                      wxUser[

                      'openId'] =

                      infoInfomation.
                      openId;
                      module.
                      exports.
                      wxUser =
                      wxUser;
                      wx.getStorageSync(
                      'wxUser',
                      JSON.
                      stringify(
                      module.
                      exports.
                      wxUser));



                      module.
                      exports.
                      quetyUserInfoByopenId(
                      cb);

                    });
                  },
                  fail: function fail() {
                    module.exports.
                    getUserInfo(
                    cb);

                  } });


              });
            } });

        } });

    }
  },
  checkBindPhone: function checkBindPhone() {//检查是否
    if (!wx.getStorageSync('phone')) {
      cb(false);
    } else {
      module.exports.getUserInfo(cb);
    }
  },
  getAddress: function getAddress(info, cb) {//获取地址
    wx.checkSession({
      success: function success() {
        module.exports.ajax('wxcore/getPhoneNumber?code=' + wx.getStorageSync(
        'wxcode') +
        '&encryptedData=' + info.encryptedData + '&iv=' + info.iv +
        '&session_key=' + wx.getStorageSync('session_key'), {},
        function (json) {
          cb(json);
        });
      },
      fail: function fail() {
        wx.login({
          success: function success(res) {
            module.exports.ajax('wxcore/getUserOpenId?code=' +
            res.
            code, {},
            function (json) {
              wx.getStorageSync('session_key', json.
              code);
              wx.getStorageSync('wxcode', res.code);
              module.exports.getAddress(info, cb);
            });


          } });

      } });

  },
  bindPhone: function bindPhone(info, cb) {
    wx.checkSession({
      success: function success() {
        module.exports.ajax('wxcore/getPhoneNumber?code=' + wx.getStorageSync(
        'wxcode') +
        '&encryptedData=' + info.encryptedData + '&iv=' + info.iv +
        '&session_key=' + wx.getStorageSync('session_key'), {},
        function (json) {
          if (json.phoneNumber) {
            // module.exports.ajax('user/bindPhoneByOpenId', {
            //   openId: module.exports.wxUser.openId,
            //   phone: json.phoneNumber
            // }, function (json) {
            //   module.exports.user = json.data;
            //   wx.getStorageSync('user', JSON.stringify(module.exports.user))
            //   cb();
            // })
            wx.getStorageSync('phone', json.phoneNumber);
            module.exports.wxUser['phone'] = json.phoneNumber;
            wx.getStorageSync('wxUser', JSON.stringify(wxUser));
            module.exports.register(cb);
          } else {
            wx.showModal({
              content: JSON.stringify(json),
              showCancel: false,
              title: '错误' });

          }
        });
      },
      fail: function fail() {
        wx.login({
          success: function success(res) {
            module.exports.ajax('wxcore/getUserOpenId?code=' +
            res.
            code, {},
            function (json) {
              wx.getStorageSync('session_key', json.
              code);
              wx.getStorageSync('wxcode', res.code);
              module.exports.bindPhone(info, cb);
            });


          } });

      } });

  },
  regular: {
    email: function email(_email) {//邮箱
      return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(_email);
    },
    chineseName: function chineseName(str) {//中文姓名
      return /^[\u4E00-\u9FA5]{2,4}$/.test(str);
    },
    mobile: function mobile(str) {//手机
      return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(str);
    },
    tel: function tel(str) {//固话
      return /^0[\d]{2,3}-[\d]{7,8}$/.test(str);
    },
    idCard: function idCard(str) {//身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    },
    amount: function amount(str) {//金额(8位整数2位小数)
      return /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(str);
    },
    positiveInt: function positiveInt(str) {//正整数
      return /^[1-9]*[1-9][0-9]*$/.test(str);
    },
    integer: function integer(str) {//整数(不限位数)
      return /^-?\d+$/.test(str);
    },
    chinese: function chinese(str) {//判断是不是中文
      return /[\u4e00-\u9fa5]/g.test(str);
    },
    carNum: function carNum(str) {
      return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/.
      test(str);
    } },

  isEmpty: function isEmpty(str) {//判断字符串是否为空
    return str == null || str.length == 0 || typeof str == "undefined" || str == '' || str == {};
  },
  alert: function alert(str, cb) {
    wx.showModal({
      title: '提示',
      content: str,
      showCancel: false,
      success: function success(res) {
        if (cb) {
          cb();
        }
      } });

  },
  /**
      * 日期格式化
      * @param {String} dateStr	日期字符串
      * @param {String} format	格式
      */
  dateFormat: function dateFormat(format, dateStr) {
    var d = new Date(dateStr);
    if (dateStr.toString().indexOf('-') > 0) {
      d = new Date(dateStr.replace(/-/g, '/'));
    }
    return d.format(format);
  },
  getSystemSet: function getSystemSet(cb) {//获取系统设置
    if (module.exports.systemData) {
      cb(module.exports.systemData);
    } else {
      this.ajax('systemSet/querySystemSet', {}, function (json) {
        module.exports.systemData = json.data.systemSet;
        cb(module.exports.systemData);
      });
    }
  },
  systemData: systemData,
  getDistance: function getDistance(lat1, lng1, lat2, lng2) {//根据坐标获取两点距离
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(
    radLat2) *
    Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0 / 1000; //单位km
    s = Math.round(s * 10000) / 10000.0;
    return s.toFixed(2);
  },
  bd09togcj02: function bd09togcj02(bd_lon, bd_lat) {//百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换<即 百度 转 谷歌、高德>
    var bd_lon = +bd_lon;
    var bd_lat = +bd_lat;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat];
  },
  gcj02tobd09: function gcj02tobd09(lng, lat) {//火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换<即谷歌、高德 转 百度>
    var lat = +lat;
    var lng = +lng;
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
  },
  wgs84togcj02: function wgs84togcj02(lng, lat) {//WGS84转GCj02
    var lat = +lat;
    var lng = +lng;
    if (out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      var dlat = transformlat(lng - 105.0, lat - 35.0);
      var dlng = transformlng(lng - 105.0, lat - 35.0);
      var radlat = lat / 180.0 * PI;
      var magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
      dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
      var mglat = lat + dlat;
      var mglng = lng + dlng;
      return [mglng, mglat];
    }
  },
  gcj02towgs84: function gcj02towgs84(lng, lat) {//GCJ02 转换为 WGS84
    var lat = +lat;
    var lng = +lng;
    if (out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      var dlat = transformlat(lng - 105.0, lat - 35.0);
      var dlng = transformlng(lng - 105.0, lat - 35.0);
      var radlat = lat / 180.0 * PI;
      var magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
      dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
      var mglat = lat + dlat;
      var mglng = lng + dlng;
      return [lng * 2 - mglng, lat * 2 - mglat];
    }
  } }, _defineProperty(_module$exports, "regular",
{ //正则表达式验证
  email: function email(str) {//邮箱
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str);
  },
  chineseName: function chineseName(str) {//中文姓名
    return /^[\u4E00-\u9FA5]{2,4}$/.test(str);
  },
  mobile: function mobile(str) {//手机
    return /^0?1[3|4|5|7|8|9][0-9]\d{8}$/.test(str);
  },
  tel: function tel(str) {//固话
    return /^0[\d]{2,3}-[\d]{7,8}$/.test(str);
  },
  idCard: function idCard(str) {//身份证
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
  },
  amount: function amount(str) {//金额(8位整数2位小数)
    return /^([1-9][\d]{0,20}|0)(\.[\d]{1,2})?$/.test(str);
  },
  positiveInt: function positiveInt(str) {//正整数
    return /^[1-9]*[1-9][0-9]*$/.test(str);
  },
  integer: function integer(str) {//整数(不限位数)
    return /^-?\d+$/.test(str);
  },
  chinese: function chinese(str) {//判断是不是中文
    return /[\u4e00-\u9fa5]/g.test(str);
  } }), _defineProperty(_module$exports, "getRndNum",

function getRndNum(n) {//获取随机正整数
  var num = '';
  for (var i = 0; i < n; i++) {
    num += Math.floor(Math.random() * 10);}
  return num;
}), _defineProperty(_module$exports, "upLoadImage",









function upLoadImage(config) {
  var configs = {
    count: module.exports.isEmpty(config.count) ? 1 : config.count,
    success: config.success ? config.success : null };

  wx.chooseImage({
    count: configs.count,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      imgRList = [];
      tempFilePathsIndex = 0; //遍历选择图片的下标
      getImageUrl(tempFilePaths, configs);
    } });

}), _module$exports);


/**
                       * 上传图片到服务器
                       */
function getImageUrl(imgList, configs) {
  wx.uploadFile({
    url: module.exports.apiUrl + 'CrossDomainOrdinaryServlet',
    filePath: imgList[tempFilePathsIndex],
    name: 'image',
    formData: {},
    success: function success(res) {
      var dataInfo = JSON.parse(res.data); //返回的数据
      imgRList.push(dataInfo.url);
      if (tempFilePathsIndex == imgList.length - 1) {
        configs.success ? configs.success(imgRList) : null;
      } else {
        tempFilePathsIndex = tempFilePathsIndex + 1;
        getImageUrl(imgList, configs);
      }
    } });

}

wx.getStorage({
  key: 'user',
  success: function success(res) {
    var user = res.data ? JSON.parse(res.data) : null;
    module.exports.user = user;
  } });

wx.getStorage({
  key: 'wxUser',
  success: function success(res) {
    var wxUser = res.data ? JSON.parse(res.data) : null;
    module.exports.wxUser = wxUser;
  } });
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!*******************************************************************!*\
  !*** E:/lingli-community/web/android/static/js/wx_messagePush.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.send_msg = exports.openSubscription = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @description 用户打开订阅提示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Array}tmplIds  模版id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * */
var openSubscription = function openSubscription() {
  uni.requestSubscribeMessage({
    tmplIds: ['iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE', 'LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw'],
    success: function success(res) {
      console.log(res);
    },
    fail: function fail(err) {
      uni.showToast({
        title: err,
        duration: 2000,
        icon: 'error' });

    } });

};

/**
    * @description 发送订阅消息
    * @param {String}miniprogram_state  小程序状态
    * @param {String}openid  用户openid
    * @param {String}tmplId  模版id
    * @param {String}params  传递参数
    * */exports.openSubscription = openSubscription;
var send_msg = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(tmplId, params) {var openid, wx_access_token, page;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            openid = uni.getStorageSync('userInfo').open_id;
            wx_access_token = uni.getStorageSync('access_token');
            page = '';
            if (tmplId == 'iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE') {// 达人抢单
              page = '/pages/order/index';
            } else if (tmplId == 'LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw') {// 商家新单
              page = '/pages/user/myOrder/myOrder?type=2';
            }return _context.abrupt("return",
            uni.request({
              url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=".concat(wx_access_token),
              method: "POST",
              data: {
                access_token: wx_access_token, //access_token
                touser: "".concat(openid), //用户openid
                template_id: "".concat(tmplId), //模板ID
                page: "".concat(page), //进入哪个页面   非必传
                data: _objectSpread({},
                params),

                miniprogram_state: "formal" //developer为开发版；trial为体验版；formal为正式版；非必传
              } }));case 5:case "end":return _context.stop();}}}, _callee);}));return function send_msg(_x, _x2) {return _ref.apply(this, arguments);};}();exports.send_msg = send_msg;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 19);

/***/ }),

/***/ 19:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 20);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"阾里","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"阾里","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"阾里","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"阾里","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        triggerEvent.call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        });
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!**************************************************!*\
  !*** E:/lingli-community/web/android/pages.json ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 583:
/*!*******************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-popup/components/uni-popup/popup.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  data: function data() {
    return {};


  },
  created: function created() {
    this.popup = this.getParent();
  },
  methods: {
    /**
              * 获取父元素实例
              */
    getParent: function getParent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'uniPopup';
      var parent = this.$parent;
      var parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    } } };exports.default = _default;

/***/ }),

/***/ 584:
/*!************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-popup/components/uni-popup/i18n/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 585));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 586));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 587));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 585:
/*!***********************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-popup/components/uni-popup/i18n/en.json ***!
  \***********************************************************************************************/
/*! exports provided: uni-popup.cancel, uni-popup.ok, uni-popup.placeholder, uni-popup.title, uni-popup.shareTitle, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-popup.cancel\":\"cancel\",\"uni-popup.ok\":\"ok\",\"uni-popup.placeholder\":\"pleace enter\",\"uni-popup.title\":\"Hint\",\"uni-popup.shareTitle\":\"Share to\"}");

/***/ }),

/***/ 586:
/*!****************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-popup/components/uni-popup/i18n/zh-Hans.json ***!
  \****************************************************************************************************/
/*! exports provided: uni-popup.cancel, uni-popup.ok, uni-popup.placeholder, uni-popup.title, uni-popup.shareTitle, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-popup.cancel\":\"取消\",\"uni-popup.ok\":\"确定\",\"uni-popup.placeholder\":\"请输入\",\"uni-popup.title\":\"提示\",\"uni-popup.shareTitle\":\"分享到\"}");

/***/ }),

/***/ 587:
/*!****************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-popup/components/uni-popup/i18n/zh-Hant.json ***!
  \****************************************************************************************************/
/*! exports provided: uni-popup.cancel, uni-popup.ok, uni-popup.placeholder, uni-popup.title, uni-popup.shareTitle, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-popup.cancel\":\"取消\",\"uni-popup.ok\":\"確定\",\"uni-popup.placeholder\":\"請輸入\",\"uni-popup.title\":\"提示\",\"uni-popup.shareTitle\":\"分享到\"}");

/***/ }),

/***/ 595:
/*!*******************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },
  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },
  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ }),

/***/ 6:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/uni-stat.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 获取系统信息
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
var sys = uni.getSystemInfoSync();

// 访问开始即启动小程序，访问结束结分为：进入后台超过5min、在前台无任何操作超过30min、在新的来源打开小程序；
var STAT_VERSION = "3.6.3";
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800; // 页面在前台无操作结束访问时间 单位s
var APP_PVER_TIME = 300; // 应用在后台结束访问时间 单位s
var OPERATING_TIME = 10; // 数据上报时间 单位s
var DIFF_TIME = 60 * 1000 * 60 * 24;

// 获取 manifest.json 中统计配置
var uniStatisticsConfig = {"enable":true};
var statConfig = {
  appid: "__UNI__767C2E9" };

var titleJsons = {};
var debug =  false || false;






// eslint-disable-next-line no-restricted-globals
var pagesTitle = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var pagesData = pagesTitle.pages;
for (var i in pagesData) {var _style$navigationBar;
  var style = pagesData[i];
  var titleText =
  // MP
  style.navigationBarTitleText ||
  // ali
  style.defaultTitle || (
  // H5 || App
  (_style$navigationBar = style.navigationBar) === null || _style$navigationBar === void 0 ? void 0 : _style$navigationBar.titleText) ||
  '';
  if (titleText) {
    titleJsons[i] = titleText;
  }
}


// TODO 在云函数中获取，暂时注释
var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';
function getUuid() {
  var uuid = '';
  if (get_platform_name() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var get_uuid = function get_uuid(statData) {
  // 有可能不存在 deviceId（一般不存在就是出bug了），就自己生成一个
  return sys.deviceId || getUuid();
};

/**
    * 获取配置信息 如 appid
    */
var stat_config = statConfig;

var get_sgin = function get_sgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }

  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var get_encodeURIComponent_options = function get_encodeURIComponent_options(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

/**
    * 获取当前平台
    * 移动端  : 'n',
    * h5	  : 'h5',
    * 微信	  : 'wx',
    * 阿里	  : 'ali',
    * 百度	  : 'bd',
    * 头条	  : 'tt',
    * qq	  : 'qq',
    * 快应用  : 'qn',
    * 快手	  : 'ks',
    * 飞书	  : 'lark',
    * 快应用  : 'qw',
    * 钉钉	  : 'dt'
    */
var get_platform_name = function get_platform_name() {var _platformList;
  // 苹果审核代码中禁止出现 alipay 字样 ，需要特殊处理一下
  var aliArr = ['y', 'a', 'p', 'mp-ali'];
  var platformList = (_platformList = {
    app: 'n',
    'app-plus': 'n',
    h5: 'h5',
    'mp-weixin': 'wx' }, _defineProperty(_platformList,
  aliArr.reverse().join(''), 'ali'), _defineProperty(_platformList,
  'mp-baidu', 'bd'), _defineProperty(_platformList,
  'mp-toutiao', 'tt'), _defineProperty(_platformList,
  'mp-qq', 'qq'), _defineProperty(_platformList,
  'quickapp-native', 'qn'), _defineProperty(_platformList,
  'mp-kuaishou', 'ks'), _defineProperty(_platformList,
  'mp-lark', 'lark'), _defineProperty(_platformList,
  'quickapp-webview', 'qw'), _platformList);

  if (platformList["mp-weixin"] === 'ali') {
    if (my && my.env) {
      var clientName = my.env.clientName;
      if (clientName === 'ap') return 'ali';
      if (clientName === 'dingtalk') return 'dt';
      // TODO 缺少 ali 下的其他平台
    }
  }
  return platformList["mp-weixin"];
};

/**
    * 获取小程序 appid
    */
var get_pack_name = function get_pack_name() {
  var packName = '';
  if (get_platform_name() === 'wx' || get_platform_name() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  if (get_platform_name() === 'n') ;
  return packName;
};

/**
    * 应用版本
    */
var get_version = function get_version() {
  return get_platform_name() === 'n' ? plus.runtime.version : '';
};

/**
    * 获取渠道
    */
var get_channel = function get_channel() {
  var platformName = get_platform_name();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

/**
    * 获取小程序场景值
    * @param {Object} options 页面信息
    */
var get_scene = function get_scene(options) {
  var platformName = get_platform_name();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};

/**
    * 获取拼接参数
    */
var get_splicing = function get_splicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

/**
    * 获取页面url，不包含参数
    */
var get_route$1 = function get_route$1(pageVm) {
  var _self = pageVm || get_page_vm();
  if (get_platform_name() === 'bd') {
    var mp_route = _self.$mp && _self.$mp.page && _self.$mp.page.is;
    var scope_route = _self.$scope && _self.$scope.is;
    return mp_route || scope_route || '';
  } else {
    return (
      _self.route ||
      _self.$scope && _self.$scope.route ||
      _self.$mp && _self.$mp.page.route);

  }
};

/**
    * 获取页面url, 包含参数
    */
var get_page_route = function get_page_route(pageVm) {
  // 从 app 进入应用 ，没有 $page ,获取不到路由 ，需要获取页面 尝试从 getCurrentPages 获取也页面实例
  // FIXME 尽量不使用 getCurrentPages ，大部分获取路由是从 onHide 获取 ，这时可以获取到，如果是 onload ,则可能获取不到，比如 百度

  var page = pageVm && (pageVm.$page || pageVm.$scope && pageVm.$scope.$page);
  var lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
  if (!page) return lastPageRoute || '';
  // 如果找不到 fullPath 就取 route 的值
  return page.fullPath === '/' ? page.route : page.fullPath || page.route;
};

/**
    * 获取页面实例
    */
var get_page_vm = function get_page_vm() {
  var pages = getCurrentPages();
  var $page = pages[pages.length - 1];
  if (!$page) return null;
  return $page.$vm;
};

/**
    * 获取页面类型
    */
var get_page_types = function get_page_types(self) {
  // XXX 百度有问题 ，获取的都是 componet ,等待修复
  if (
  self.mpType === 'page' ||
  self.$mpType === 'page' ||
  self.$mp && self.$mp.mpType === 'page' ||
  self.$options.mpType === 'page')
  {
    return 'page';
  }
  if (
  self.mpType === 'app' ||
  self.$mpType === 'app' ||
  self.$mp && self.$mp.mpType === 'app' ||
  self.$options.mpType === 'app')
  {
    return 'app';
  }
  return null;
};

/**
    * 处理上报参数
    * @param {Object}  需要处理的数据
    */
var handle_data = function handle_data(statData) {
  var firstArr = [];
  var contentArr = [];
  var lastArr = [];var _loop = function _loop(
  _i) {
    var rd = statData[_i];
    rd.forEach(function (elm) {
      var newData = '';
      {
        newData = get_splicing(elm);
      }
      if (_i === 0) {
        firstArr.push(newData);
      } else if (_i === 3) {
        lastArr.push(newData);
      } else {
        contentArr.push(newData);
      }
    });};for (var _i in statData) {_loop(_i);
  }

  firstArr.push.apply(firstArr, contentArr.concat(lastArr));
  // 参数需要处理成字符串，方便上传
  return JSON.stringify(firstArr);
};

/**
    * 自定义事件参数校验
    */
var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report Missing [eventName] parameter");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] Parameter type error, it can only be of type String");


    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] Parameter length cannot be greater than 255");


    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error(
    'uni.report [options] Parameter type error, Only supports String or Object type');

    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] Parameter length cannot be greater than 255");


    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error("uni.report [eventName] When the parameter is title, the [options] parameter can only be of type String");


    return true;
  }
};

var get_page_name = function get_page_name(routepath) {
  return titleJsons && titleJsons[routepath] || '';
};

var Report_Data_Time = 'Report_Data_Time';
var Report_Status = 'Report_Status';
var is_report_data = function is_report_data() {
  return new Promise(function (resolve, reject) {
    var start_time = '';
    var end_time = new Date().getTime();
    var diff_time = DIFF_TIME;
    var report_status = 1;
    try {
      start_time = uni.getStorageSync(Report_Data_Time);
      report_status = uni.getStorageSync(Report_Status);
    } catch (e) {
      start_time = '';
      report_status = 1;
    }

    if (report_status === '') {
      requestData(function (_ref) {var enable = _ref.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
        if (enable === 1) {
          resolve();
        }
      });
      return;
    }

    if (report_status === 1) {
      resolve();
    }

    if (!start_time) {
      uni.setStorageSync(Report_Data_Time, end_time);
      start_time = end_time;
    }

    if (end_time - start_time > diff_time) {
      requestData(function (_ref2) {var enable = _ref2.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
      });
    }
  });
};

var requestData = function requestData(done) {
  var appid = "__UNI__767C2E9";
  var formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: appid }) };


  uni.request({
    url: STAT_URL,
    method: 'GET',
    data: formData,
    success: function success(res) {var
      data = res.data;
      if (data.ret === 0) {
        typeof done === 'function' &&
        done({
          enable: data.enable });

      }
    },
    fail: function fail(e) {
      var report_status_code = 1;
      try {
        report_status_code = uni.getStorageSync(Report_Status);
      } catch (e) {
        report_status_code = 1;
      }
      if (report_status_code === '') {
        report_status_code = 1;
      }
      typeof done === 'function' &&
      done({
        enable: report_status_code });

    } });

};

/**
    * 是否开启 debug 模式
    */
var is_debug = debug;

/**
                       * 日志输出
                       * @param {*} data
                       */
var log = function log(data, type) {
  var msg_type = '';
  switch (data.lt) {
    case '1':
      msg_type = '应用启动';
      break;
    case '3':
      msg_type = '应用进入后台';
      break;

    case '11':
      msg_type = '页面切换';
      break;
    case '21':
      msg_type = '事件触发';
      break;
    case '31':
      msg_type = '应用错误';
      break;
    case '101':
      msg_type = 'PUSH';
      break;}









  if (type) {
    console.log("=== \u7EDF\u8BA1\u961F\u5217\u6570\u636E\u4E0A\u62A5 ===");
    console.log(data);
    console.log("=== \u4E0A\u62A5\u7ED3\u675F ===");
    return;
  }

  if (msg_type) {
    console.log("=== \u7EDF\u8BA1\u6570\u636E\u91C7\u96C6\uFF1A".concat(msg_type, " ==="));
    console.log(data);
    console.log("=== \u91C7\u96C6\u7ED3\u675F ===");
  }
};

/**
    * 获取上报时间间隔
    * @param {*} defaultTime 默认上报间隔时间 单位s
    */
var get_report_Interval = function get_report_Interval(defaultTime) {
  var time = uniStatisticsConfig.reportInterval;
  // 如果上报时间配置为0 相当于立即上报
  if (Number(time) === 0) return 0;
  time = time || defaultTime;
  var reg = /(^[1-9]\d*$)/;
  // 如果不是整数，则默认为上报间隔时间
  if (!reg.test(time)) return defaultTime;
  return Number(time);
};

/**
    * 获取隐私协议配置
    */
var is_push_clientid = function is_push_clientid() {
  if (uniStatisticsConfig.collectItems) {
    var ClientID = uniStatisticsConfig.collectItems.uniPushClientID;
    return typeof ClientID === 'boolean' ? ClientID : false;
  }
  return false;
};

var appid = "__UNI__767C2E9"; // 做应用隔离
var dbSet = function dbSet(name, value) {
  var data = uni.getStorageSync('$$STAT__DBDATA:' + appid) || {};

  if (!data) {
    data = {};
  }
  data[name] = value;
  uni.setStorageSync('$$STAT__DBDATA:' + appid, data);
};

var dbGet = function dbGet(name) {
  var data = uni.getStorageSync('$$STAT__DBDATA:' + appid) || {};
  if (!data[name]) {
    var dbdata = uni.getStorageSync('$$STAT__DBDATA:' + appid);
    if (!dbdata) {
      dbdata = {};
    }
    if (!dbdata[name]) {
      return undefined;
    }
    data[name] = dbdata[name];
  }
  return data[name];
};

var dbRemove = function dbRemove(name) {
  var data = uni.getStorageSync('$$STAT__DBDATA:' + appid) || {};
  if (data[name]) {
    delete data[name];
    uni.setStorageSync('$$STAT__DBDATA:' + appid, data);
  } else {
    data = uni.getStorageSync('$$STAT__DBDATA:' + appid);
    if (data[name]) {
      delete data[name];
      uni.setStorageSync('$$STAT__DBDATA:' + appid, data);
    }
  }
};

// 首次访问时间
var FIRST_VISIT_TIME_KEY = '__first__visit__time';
// 最后访问时间
var LAST_VISIT_TIME_KEY = '__last__visit__time';
/**
                                                  * 获取当前时间
                                                  */
var get_time = function get_time() {
  return parseInt(new Date().getTime() / 1000);
};

/**
    * 获取首次访问时间
    */
var get_first_visit_time = function get_first_visit_time() {
  var timeStorge = dbGet(FIRST_VISIT_TIME_KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = get_time();
    dbSet(FIRST_VISIT_TIME_KEY, time);
    // 首次访问需要 将最后访问时间置 0
    dbRemove(LAST_VISIT_TIME_KEY);
  }
  return time;
};

/**
    * 最后访问时间
    */
var get_last_visit_time = function get_last_visit_time() {
  var timeStorge = dbGet(LAST_VISIT_TIME_KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  }
  dbSet(LAST_VISIT_TIME_KEY, get_time());
  return time;
};

// 页面停留时间记录key
var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_Residence_Time = 0;
var Last_Page_Residence_Time = 0;

/**
                                   * 设置页面停留时间
                                   */
var set_page_residence_time = function set_page_residence_time() {
  First_Page_Residence_Time = get_time();
  dbSet(PAGE_RESIDENCE_TIME, First_Page_Residence_Time);
  return First_Page_Residence_Time;
};

/**
    * 获取页面停留时间
    */
var get_page_residence_time = function get_page_residence_time() {
  Last_Page_Residence_Time = get_time();
  First_Page_Residence_Time = dbGet(PAGE_RESIDENCE_TIME);
  return Last_Page_Residence_Time - First_Page_Residence_Time;
};

/**
    * 获取总访问次数
    */
var TOTAL_VISIT_COUNT = '__total__visit__count';
var get_total_visit_count = function get_total_visit_count() {
  var timeStorge = dbGet(TOTAL_VISIT_COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  dbSet(TOTAL_VISIT_COUNT, count);
  return count;
};


var FIRST_TIME = '__first_time';
/**
                                  * 设置页面首次访问时间，用户获取页面/应用停留时常
                                  */
var set_first_time = function set_first_time() {
  var time = new Date().getTime();
  var timeStorge = dbSet(FIRST_TIME, time);
  return timeStorge;
};

/**
    * 获取最后一次时间 ，暂时用不到，直接获取当前时间即可
    */
// export const get_last_time = () => {
// 	let time = new Date().getTime()
// 	Set__Last__Time = time
// 	return time
// }

/**
 * 获取页面 \ 应用停留时间
 */
var get_residence_time = function get_residence_time(type) {
  var residenceTime = 0;
  var first_time = dbGet(FIRST_TIME);
  var last_time = get_time();
  if (first_time !== 0) {
    residenceTime = last_time - first_time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }
  return {
    residenceTime: residenceTime };

};

var eport_Interval = get_report_Interval(OPERATING_TIME);
// 统计数据默认值
var statData = {
  uuid: get_uuid(), // 设备标识
  ak: stat_config.appid, // uni-app 应用 Appid
  p: sys.platform === 'android' ? 'a' : 'i', // 手机系统
  ut: get_platform_name(), // 平台类型
  mpn: get_pack_name(), // 原生平台包名、小程序 appid
  usv: STAT_VERSION, // 统计 sdk 版本
  v: get_version(), // 应用版本，仅app
  ch: get_channel(), // 渠道信息
  cn: '', // 国家
  pn: '', // 省份
  ct: '', // 城市
  t: get_time(), // 上报数据时的时间戳
  tt: '',
  brand: sys.brand || '', // 手机品牌
  md: sys.model, // 手机型号
  sv: sys.system.replace(/(Android|iOS)\s/, ''), // 手机系统版本
  mpsdk: sys.SDKVersion || '', // x程序 sdk version
  mpv: sys.version || '', // 小程序平台版本 ，如微信、支付宝
  lang: sys.language, // 语言
  pr: sys.pixelRatio, // pixelRatio 设备像素比
  ww: sys.windowWidth, // windowWidth 可使用窗口宽度
  wh: sys.windowHeight, // windowHeight 可使用窗口高度
  sw: sys.screenWidth, // screenWidth 屏幕宽度
  sh: sys.screenHeight // screenHeight 屏幕高度
};var
Report = /*#__PURE__*/function () {"use strict";
  function Report() {_classCallCheck(this, Report);
    // 页面实例
    this.self = '';
    // 进入应用标识
    this.__licationShow = false;
    // 离开应用标识
    this.__licationHide = false;
    // 统计默认值
    this.statData = statData;
    // 标题默认值
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };


    // 页面参数
    this._query = {};
    // 页面最后停留页面的 url
    // this._lastPageRoute = ''

    // 注册拦截器
    var registerInterceptor = typeof uni.addInterceptor === 'function';
    if (registerInterceptor) {
      this.addInterceptorInit();
      this.interceptLogin();
      this.interceptShare(true);
      this.interceptRequestPayment();
    }
  }_createClass(Report, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "_login", value: function _login()

    {
      this.sendEventRequest(
      {
        key: 'login' },

      0);

    } }, { key: "_share", value: function _share()

    {
      this.sendEventRequest(
      {
        key: 'share' },

      0);

    } }, { key: "_payment", value: function _payment(
    key) {
      this.sendEventRequest(
      {
        key: key },

      0);

    }

    /**
       * 进入应用触发
       */ }, { key: "applicationShow", value: function applicationShow()
    {
      // 通过 __licationHide 判断保证是进入后台后在次进入应用，避免重复上报数据
      if (this.__licationHide) {
        var time = get_residence_time('app');
        // 需要判断进入后台是否超过时限 ，默认是 30min ，是的话需要执行进入应用的上报
        if (time.overtime) {
          var lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
          var options = {
            path: lastPageRoute,
            scene: this.statData.sc,
            cst: 2 };

          this.sendReportRequest(options);
        }
        // 状态重置
        this.__licationHide = false;
      }
    }

    /**
       * 离开应用触发
       * @param {Object} self
       * @param {Object} type
       */ }, { key: "applicationHide", value: function applicationHide(
    self, type) {
      if (!self) {
        // 表示应用切换到后台 ，此时需要从页面栈获取页面实例
        self = get_page_vm();
      }
      // 进入应用后台保存状态，方便进入前台后判断是否上报应用数据
      this.__licationHide = true;
      var time = get_residence_time();
      var route = get_page_route(self);
      uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
      this.sendHideRequest(
      {
        urlref: route,
        urlref_ts: time.residenceTime },

      type);

      // 更新页面首次访问时间
      set_first_time();
    }

    /**
       * 进入页面触发
       */ }, { key: "pageShow", value: function pageShow(
    self) {
      // 清空值 ，初始化 ，避免污染后面的上报数据
      this._navigationBarTitle = {
        config: '',
        page: '',
        report: '',
        lt: '' };


      var route = get_page_route(self);
      var routepath = get_route$1(self);

      this._navigationBarTitle.config = get_page_name(routepath);
      // 表示应用触发 ，页面切换不触发之后的逻辑
      if (this.__licationShow) {
        // 更新页面首次访问时间
        set_first_time();
        // this._lastPageRoute = route
        uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
        this.__licationShow = false;
        return;
      }

      var time = get_residence_time('page');
      // 停留时间
      if (time.overtime) {
        var options = {
          path: route,
          scene: this.statData.sc,
          cst: 3 };

        this.sendReportRequest(options);
      }
      // 更新页面首次访问时间
      set_first_time();
    }

    /**
       * 离开页面触发
       */ }, { key: "pageHide", value: function pageHide(
    self) {
      if (!this.__licationHide) {
        var time = get_residence_time('page');
        var route = get_page_route(self);
        var lastPageRoute = uni.getStorageSync('_STAT_LAST_PAGE_ROUTE');
        if (!lastPageRoute) {
          lastPageRoute = route;
        }
        uni.setStorageSync('_STAT_LAST_PAGE_ROUTE', route);
        this.sendPageRequest({
          url: route,
          urlref: lastPageRoute,
          urlref_ts: time.residenceTime });

        // this._lastPageRoute = route
        return;
      }
    }

    /**
       * 发送请求,应用维度上报
       * @param {Object} options 页面信息
       * @param {Boolean} type 是否立即上报
       */ }, { key: "sendReportRequest", value: function sendReportRequest(
    options, type) {
      this._navigationBarTitle.lt = '1';
      this._navigationBarTitle.config = get_page_name(options.path);
      var is_opt = options.query && JSON.stringify(options.query) !== '{}';
      var query = is_opt ? '?' + JSON.stringify(options.query) : '';
      Object.assign(this.statData, {
        lt: '1',
        url: options.path + query || '',
        t: get_time(),
        sc: get_scene(options.scene),
        fvts: get_first_visit_time(),
        lvts: get_last_visit_time(),
        tvc: get_total_visit_count(),
        // create session type  上报类型 ，1 应用进入 2.后台30min进入 3.页面30min进入
        cst: options.cst || 1 });

      if (get_platform_name() === 'n') {
        this.getProperty(type);
      } else {
        this.getNetworkInfo(type);
      }
    }

    /**
       * 发送请求,页面维度上报
       * @param {Object} opt
       */ }, { key: "sendPageRequest", value: function sendPageRequest(
    opt) {var
      url = opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        p: this.statData.p,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: get_time() };

      this.request(options);
    }

    /**
       * 进入后台上报数据
       * @param {Object} opt
       * @param {Object} type
       */ }, { key: "sendHideRequest", value: function sendHideRequest(
    opt, type) {var
      urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        p: this.statData.p,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: get_time() };

      this.request(options, type);
    }

    /**
       * 自定义事件上报
       */ }, { key: "sendEventRequest", value: function sendEventRequest()
    {var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref3$key = _ref3.key,key = _ref3$key === void 0 ? '' : _ref3$key,_ref3$value = _ref3.value,value = _ref3$value === void 0 ? '' : _ref3$value;
      var routepath = '';

      try {
        routepath = get_route$1();
      } catch (error) {
        var launch_options = dbGet('__launch_options');
        routepath = launch_options.path;
      }

      this._navigationBarTitle.config = get_page_name(routepath);
      this._navigationBarTitle.lt = '21';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        p: this.statData.p,
        lt: '21',
        ut: this.statData.ut,
        url: routepath,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: get_time() };

      this.request(options);
    } }, { key: "sendPushRequest", value: function sendPushRequest(

    options, cid) {var _this = this;
      var time = get_time();

      var statData = {
        lt: '101',
        cid: cid,
        t: time,
        ut: this.statData.ut };


      // debug 打印打点信息
      if (is_debug) {
        log(statData);
      }

      var stat_data = handle_data({
        101: [statData] });

      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: stat_data };


      {
        if (statData.ut === 'h5') {
          this.imageRequest(optionsData);
          return;
        }
      }

      // XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
      if (get_platform_name() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this.sendRequest(optionsData);
        }, 200);
        return;
      }

      this.sendRequest(optionsData);
    }

    /**
       * 获取wgt资源版本
       */ }, { key: "getProperty", value: function getProperty(
    type) {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo(type);
      });
    }

    /**
       * 获取网络信息
       */ }, { key: "getNetworkInfo", value: function getNetworkInfo(
    type) {var _this3 = this;
      uni.getNetworkType({
        success: function success(result) {
          _this3.statData.net = result.networkType;
          _this3.getLocation(type);
        } });

    }

    /**
       * 获取位置信息
       */ }, { key: "getLocation", value: function getLocation(
    type) {var _this4 = this;
      if (stat_config.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this4.statData.cn = result.address.country;
              _this4.statData.pn = result.address.province;
              _this4.statData.ct = result.address.city;
            }

            _this4.statData.lat = result.latitude;
            _this4.statData.lng = result.longitude;
            _this4.request(_this4.statData, type);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData, type);
      }
    }

    /**
       * 发送请求
       * @param {Object} data 上报数据
       * @param {Object} type 类型
       */ }, { key: "request", value: function request(
    data, type) {var _this5 = this;
      var time = get_time();
      var title = this._navigationBarTitle;
      Object.assign(data, {
        ttn: title.page,
        ttpj: title.config,
        ttc: title.report });


      var uniStatData = dbGet('__UNI__STAT__DATA') || {};
      if (!uniStatData[data.lt]) {
        uniStatData[data.lt] = [];
      }
      // 加入队列
      uniStatData[data.lt].push(data);
      dbSet('__UNI__STAT__DATA', uniStatData);

      var page_residence_time = get_page_residence_time();
      // debug 打印打点信息
      if (is_debug) {
        log(data);
      }
      // 判断时候到达上报时间 ，默认 10 秒上报
      if (page_residence_time < eport_Interval && !type) return;

      // 时间超过，重新获取时间戳
      set_page_residence_time();
      var stat_data = handle_data(uniStatData);
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: stat_data };


      // 重置队列
      dbRemove('__UNI__STAT__DATA');

      {
        if (data.ut === 'h5') {
          this.imageRequest(optionsData);
          return;
        }
      }

      // XXX 安卓需要延迟上报 ，否则会有未知错误，需要验证处理
      if (get_platform_name() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this5.sendRequest(optionsData);
        }, 200);
        return;
      }

      this.sendRequest(optionsData);
    } }, { key: "getIsReportData", value: function getIsReportData()

    {
      return is_report_data();
    }

    /**
       * 数据上报
       * @param {Object} optionsData 需要上报的数据
       */ }, { key: "sendRequest", value: function sendRequest(
    optionsData) {var _this6 = this;

      {
        this.getIsReportData().then(function () {
          uni.request({
            url: STAT_URL,
            method: 'POST',
            data: optionsData,
            success: function success() {
              if (is_debug) {
                log(optionsData, true);
              }
            },
            fail: function fail(e) {
              if (++_this6._retry < 3) {
                if (is_debug) {
                  console.warn('=== 统计上报错误，尝试重新上报！');
                  console.error(e);
                }
                setTimeout(function () {
                  _this6.sendRequest(optionsData);
                }, 1000);
              }
            } });

        });
      }
    }

    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      this.getIsReportData().then(function () {
        var image = new Image();
        var options = get_sgin(get_encodeURIComponent_options(data)).options;
        image.src = STAT_H5_URL + '?' + options;
        if (is_debug) {
          log(data, true);
        }
      });
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this.sendEventRequest(
      {
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },

      1);

    } }]);return Report;}();var


Stat = /*#__PURE__*/function (_Report) {"use strict";_inherits(Stat, _Report);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!uni.__stat_instance) {
        uni.__stat_instance = new Stat();
      }

      return uni.__stat_instance;
    } }]);
  function Stat() {_classCallCheck(this, Stat);return _super.call(this);

  }

  /**
     * 获取推送id
     */_createClass(Stat, [{ key: "pushEvent", value: function pushEvent(
    options) {var _this7 = this;
      var ClientID = is_push_clientid();
      if (uni.getPushClientId && ClientID) {
        uni.getPushClientId({
          success: function success(res) {
            var cid = res.cid || false;
            //  只有获取到才会上传
            if (cid) {
              _this7.sendPushRequest(options, cid);
            }
          } });

      }
    }

    /**
       * 进入应用
       * @param {Object} options 页面参数
       * @param {Object} self	当前页面实例
       */ }, { key: "launch", value: function launch(
    options, self) {
      // 初始化页面停留时间  start
      set_page_residence_time();
      this.__licationShow = true;
      dbSet('__launch_options', options);
      // 应用初始上报参数为1
      options.cst = 1;
      this.sendReportRequest(options, true);
    } }, { key: "load", value: function load(
    options, self) {
      this.self = self;
      this._query = options;
    } }, { key: "appHide", value: function appHide(

    self) {
      this.applicationHide(self, true);
    } }, { key: "appShow", value: function appShow(

    self) {
      this.applicationShow(self);
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (get_page_types(self) === 'page') {
        this.pageShow(self);
      }










      if (get_page_types(self) === 'app') {
        this.appShow();
      }

    } }, { key: "hide", value: function hide(

    self) {
      this.self = self;
      if (get_page_types(self) === 'page') {
        this.pageHide(self);
      }










      if (get_page_types(self) === 'app') {
        this.appHide();
      }

    } }, { key: "error", value: function error(

    em) {
      // 开发工具内不上报错误
      // if (this._platform === 'devtools') {
      //   if (process.env.NODE_ENV === 'development') {
      //     console.info('当前运行环境为开发者工具，不上报数据。')
      //     return
      //   }
      // }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }

      var route = '';
      try {
        route = get_route();
      } catch (e) {
        // 未获取到页面路径
        route = '';
      }

      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        p: this.statData.p,
        lt: '31',
        url: route,
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: parseInt(new Date().getTime() / 1000) };

      this.request(options);
    } }]);return Stat;}(Report);

var Stat$1 = Stat;

var stat = Stat$1.getInstance();

// 用于判断是隐藏页面还是卸载页面
var isHide = false;

var lifecycle = {
  onLaunch: function onLaunch(options) {
    // 进入应用上报数据
    stat.launch(options, this);
    // 上报push推送id
    stat.pushEvent(options);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


// 加载统计代码
function load_stat() {



















  // eslint-disable-next-line no-restricted-globals
  var Vue = __webpack_require__(/*! vue */ 4);
  (Vue.default || Vue).mixin(lifecycle);
  uni.report = function (type, options) {
    stat.sendEvent(type, options);
  };

}

function main() {
  if (is_debug) {
    {

      console.log('=== uni统计开启,version:1.0 ===');

    }
    load_stat();
  } else {
    if (true) {
      uni.report = function (type, options) {};
    } else {}
  }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 603:
/*!***********************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-dateformat/components/uni-dateformat/date-format.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatDate = formatDate;exports.friendlyDate = friendlyDate; // yyyy-MM-dd hh:mm:ss.SSS 所有支持的类型
function pad(str) {var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  str += '';
  while (str.length < length) {
    str = '0' + str;
  }
  return str.slice(-length);
}

var parser = {
  yyyy: function yyyy(dateObj) {
    return pad(dateObj.year, 4);
  },
  yy: function yy(dateObj) {
    return pad(dateObj.year);
  },
  MM: function MM(dateObj) {
    return pad(dateObj.month);
  },
  M: function M(dateObj) {
    return dateObj.month;
  },
  dd: function dd(dateObj) {
    return pad(dateObj.day);
  },
  d: function d(dateObj) {
    return dateObj.day;
  },
  hh: function hh(dateObj) {
    return pad(dateObj.hour);
  },
  h: function h(dateObj) {
    return dateObj.hour;
  },
  mm: function mm(dateObj) {
    return pad(dateObj.minute);
  },
  m: function m(dateObj) {
    return dateObj.minute;
  },
  ss: function ss(dateObj) {
    return pad(dateObj.second);
  },
  s: function s(dateObj) {
    return dateObj.second;
  },
  SSS: function SSS(dateObj) {
    return pad(dateObj.millisecond, 3);
  },
  S: function S(dateObj) {
    return dateObj.millisecond;
  } };


// 这都n年了iOS依然不认识2020-12-12，需要转换为2020/12/12
function getDate(time) {
  if (time instanceof Date) {
    return time;
  }
  switch (typeof time) {
    case 'string':
      {
        // 2020-12-12T12:12:12.000Z、2020-12-12T12:12:12.000
        if (time.indexOf('T') > -1) {
          return new Date(time);
        }
        return new Date(time.replace(/-/g, '/'));
      }
    default:
      return new Date(time);}

}

function formatDate(date) {var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/MM/dd hh:mm:ss';
  if (!date && date !== 0) {
    return '';
  }
  date = getDate(date);
  var dateObj = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds() };

  var tokenRegExp = /yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/;
  var flag = true;
  var result = format;
  while (flag) {
    flag = false;
    result = result.replace(tokenRegExp, function (matched) {
      flag = true;
      return parser[matched](dateObj);
    });
  }
  return result;
}

function friendlyDate(time, _ref)



{var _ref$locale = _ref.locale,locale = _ref$locale === void 0 ? 'zh' : _ref$locale,_ref$threshold = _ref.threshold,threshold = _ref$threshold === void 0 ? [60000, 3600000] : _ref$threshold,_ref$format = _ref.format,format = _ref$format === void 0 ? 'yyyy/MM/dd hh:mm:ss' : _ref$format;
  if (time === '-') {
    return time;
  }
  if (!time && time !== 0) {
    return '';
  }
  var localeText = {
    zh: {
      year: '年',
      month: '月',
      day: '天',
      hour: '小时',
      minute: '分钟',
      second: '秒',
      ago: '前',
      later: '后',
      justNow: '刚刚',
      soon: '马上',
      template: '{num}{unit}{suffix}' },

    en: {
      year: 'year',
      month: 'month',
      day: 'day',
      hour: 'hour',
      minute: 'minute',
      second: 'second',
      ago: 'ago',
      later: 'later',
      justNow: 'just now',
      soon: 'soon',
      template: '{num} {unit} {suffix}' } };


  var text = localeText[locale] || localeText.zh;
  var date = getDate(time);
  var ms = date.getTime() - Date.now();
  var absMs = Math.abs(ms);
  if (absMs < threshold[0]) {
    return ms < 0 ? text.justNow : text.soon;
  }
  if (absMs >= threshold[1]) {
    return formatDate(date, format);
  }
  var num;
  var unit;
  var suffix = text.later;
  if (ms < 0) {
    suffix = text.ago;
    ms = -ms;
  }
  var seconds = Math.floor(ms / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);
  switch (true) {
    case years > 0:
      num = years;
      unit = text.year;
      break;
    case months > 0:
      num = months;
      unit = text.month;
      break;
    case days > 0:
      num = days;
      unit = text.day;
      break;
    case hours > 0:
      num = hours;
      unit = text.hour;
      break;
    case minutes > 0:
      num = minutes;
      unit = text.minute;
      break;
    default:
      num = seconds;
      unit = text.second;
      break;}


  if (locale === 'en') {
    if (num === 1) {
      num = 'a';
    } else {
      unit += 's';
    }
  }

  return text.template.replace(/{\s*num\s*}/g, num + '').replace(/{\s*unit\s*}/g, unit).replace(/{\s*suffix\s*}/g,
  suffix);
}

/***/ }),

/***/ 623:
/*!*******************************************************************!*\
  !*** E:/lingli-community/web/android/components/yt-txl/city.json ***!
  \*******************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"id\":255,\"text\":\"阿坝\",\"zip_code\":\"624000\",\"abridge\":\"AB\"},{\"id\":334,\"text\":\"阿克苏\",\"zip_code\":\"843000\",\"abridge\":\"AKS\"},{\"id\":36,\"text\":\"阿拉善盟\",\"zip_code\":\"750306\",\"abridge\":\"ALSM\"},{\"id\":340,\"text\":\"阿勒泰\",\"zip_code\":\"836500\",\"abridge\":\"ALT\"},{\"id\":288,\"text\":\"阿里\",\"zip_code\":\"859000\",\"abridge\":\"AL\"},{\"id\":298,\"text\":\"安康\",\"zip_code\":\"725000\",\"abridge\":\"AK\"},{\"id\":105,\"text\":\"安庆\",\"zip_code\":\"246000\",\"abridge\":\"AQ\"},{\"id\":261,\"text\":\"安顺\",\"zip_code\":\"561000\",\"abridge\":\"AS\"},{\"id\":156,\"text\":\"安阳\",\"zip_code\":\"455000\",\"abridge\":\"AY\"},{\"id\":39,\"text\":\"鞍山\",\"zip_code\":\"114000\",\"abridge\":\"AS\"},{\"id\":343,\"text\":\"澳门\",\"zip_code\":\"999078\",\"abridge\":\"AM\"},{\"id\":32,\"text\":\"巴彦\",\"zip_code\":\"015000\",\"abridge\":\"BY\"},{\"id\":333,\"text\":\"巴音郭楞\",\"zip_code\":\"841000\",\"abridge\":\"BYGL\"},{\"id\":253,\"text\":\"巴中\",\"zip_code\":\"636600\",\"abridge\":\"BZ\"},{\"id\":58,\"text\":\"白城\",\"zip_code\":\"137000\",\"abridge\":\"BC\"},{\"id\":56,\"text\":\"白山\",\"zip_code\":\"134300\",\"abridge\":\"BS\"},{\"id\":303,\"text\":\"白银\",\"zip_code\":\"730900\",\"abridge\":\"BY\"},{\"id\":228,\"text\":\"百色\",\"zip_code\":\"533000\",\"abridge\":\"BS\"},{\"id\":100,\"text\":\"蚌埠\",\"zip_code\":\"233000\",\"abridge\":\"BB\"},{\"id\":26,\"text\":\"包头\",\"zip_code\":\"014000\",\"abridge\":\"BT\"},{\"id\":292,\"text\":\"宝鸡\",\"zip_code\":\"721000\",\"abridge\":\"BJ\"},{\"id\":8,\"text\":\"保定\",\"zip_code\":\"071000\",\"abridge\":\"BD\"},{\"id\":270,\"text\":\"保山\",\"zip_code\":\"678000\",\"abridge\":\"BS\"},{\"id\":223,\"text\":\"北海\",\"zip_code\":\"536000\",\"abridge\":\"BH\"},{\"id\":41,\"text\":\"本溪\",\"zip_code\":\"117000\",\"abridge\":\"BX\"},{\"id\":264,\"text\":\"毕节\",\"zip_code\":\"551700\",\"abridge\":\"BJ\"},{\"id\":150,\"text\":\"滨州\",\"zip_code\":\"256600\",\"abridge\":\"BZ\"},{\"id\":112,\"text\":\"亳州\",\"zip_code\":\"236000\",\"abridge\":\"HZ\"},{\"id\":332,\"text\":\"博尔塔拉\",\"zip_code\":\"833400\",\"abridge\":\"BRTL\"},{\"id\":11,\"text\":\"沧州\",\"zip_code\":\"061000\",\"abridge\":\"CZ\"},{\"id\":284,\"text\":\"昌都\",\"zip_code\":\"854000\",\"abridge\":\"CD\"},{\"id\":331,\"text\":\"昌吉\",\"zip_code\":\"831100\",\"abridge\":\"CJ\"},{\"id\":190,\"text\":\"常德\",\"zip_code\":\"415000\",\"abridge\":\"CD\"},{\"id\":77,\"text\":\"常州\",\"zip_code\":\"213000\",\"abridge\":\"CZ\"},{\"id\":110,\"text\":\"巢湖\",\"zip_code\":\"238000\",\"abridge\":\"CH\"},{\"id\":49,\"text\":\"朝阳\",\"zip_code\":\"100020\",\"abridge\":\"CY\"},{\"id\":216,\"text\":\"潮州\",\"zip_code\":\"521000\",\"abridge\":\"CZ\"},{\"id\":193,\"text\":\"郴州\",\"zip_code\":\"423000\",\"abridge\":\"CZ\"},{\"id\":237,\"text\":\"成都\",\"zip_code\":\"610000\",\"abridge\":\"CD\"},{\"id\":10,\"text\":\"承德\",\"zip_code\":\"067000\",\"abridge\":\"CD\"},{\"id\":113,\"text\":\"池州\",\"zip_code\":\"247100\",\"abridge\":\"CZ\"},{\"id\":28,\"text\":\"赤峰\",\"zip_code\":\"024000\",\"abridge\":\"CF\"},{\"id\":236,\"text\":\"重庆\",\"zip_code\":\"400000\",\"abridge\":\"CQ\"},{\"id\":232,\"text\":\"崇左\",\"zip_code\":\"532200\",\"abridge\":\"ZZ\"},{\"id\":107,\"text\":\"滁州\",\"zip_code\":\"239000\",\"abridge\":\"CZ\"},{\"id\":275,\"text\":\"楚雄\",\"zip_code\":\"675000\",\"abridge\":\"CX\"},{\"id\":251,\"text\":\"达州\",\"zip_code\":\"635000\",\"abridge\":\"DZ\"},{\"id\":279,\"text\":\"大理\",\"zip_code\":\"671000\",\"abridge\":\"DL\"},{\"id\":38,\"text\":\"大连\",\"zip_code\":\"116000\",\"abridge\":\"DL\"},{\"id\":65,\"text\":\"大庆\",\"zip_code\":\"163000\",\"abridge\":\"DQ\"},{\"id\":15,\"text\":\"大同\",\"zip_code\":\"037000\",\"abridge\":\"DT\"},{\"id\":72,\"text\":\"大兴安岭\",\"zip_code\":\"165000\",\"abridge\":\"DXAL\"},{\"id\":42,\"text\":\"丹东\",\"zip_code\":\"118000\",\"abridge\":\"DD\"},{\"id\":280,\"text\":\"德宏\",\"zip_code\":\"678400\",\"abridge\":\"DH\"},{\"id\":241,\"text\":\"德阳\",\"zip_code\":\"618000\",\"abridge\":\"DY\"},{\"id\":148,\"text\":\"德州\",\"zip_code\":\"253000\",\"abridge\":\"DZ\"},{\"id\":282,\"text\":\"迪庆\",\"zip_code\":\"674400\",\"abridge\":\"DQ\"},{\"id\":310,\"text\":\"定西\",\"zip_code\":\"743000\",\"abridge\":\"DX\"},{\"id\":214,\"text\":\"东莞\",\"zip_code\":\"523000\",\"abridge\":\"DG\"},{\"id\":139,\"text\":\"东营\",\"zip_code\":\"257000\",\"abridge\":\"DY\"},{\"id\":30,\"text\":\"鄂尔多斯\",\"zip_code\":\"017000\",\"abridge\":\"EEDS\"},{\"id\":175,\"text\":\"鄂州\",\"zip_code\":\"436000\",\"abridge\":\"EZ\"},{\"id\":182,\"text\":\"恩施\",\"zip_code\":\"445000\",\"abridge\":\"ES\"},{\"id\":224,\"text\":\"防城港\",\"zip_code\":\"538000\",\"abridge\":\"FZG\"},{\"id\":203,\"text\":\"佛山\",\"zip_code\":\"528000\",\"abridge\":\"FS\"},{\"id\":115,\"text\":\"福州\",\"zip_code\":\"350000\",\"abridge\":\"FZ\"},{\"id\":40,\"text\":\"抚顺\",\"zip_code\":\"113000\",\"abridge\":\"FS\"},{\"id\":133,\"text\":\"抚州\",\"zip_code\":\"344000\",\"abridge\":\"FZ\"},{\"id\":45,\"text\":\"阜新\",\"zip_code\":\"123000\",\"abridge\":\"FX\"},{\"id\":108,\"text\":\"阜阳\",\"zip_code\":\"236000\",\"abridge\":\"FY\"},{\"id\":313,\"text\":\"甘南\",\"zip_code\":\"747000\",\"abridge\":\"GN\"},{\"id\":256,\"text\":\"甘孜\",\"zip_code\":\"626000\",\"abridge\":\"GZ\"},{\"id\":130,\"text\":\"赣州\",\"zip_code\":\"341000\",\"abridge\":\"GZ\"},{\"id\":325,\"text\":\"固原\",\"zip_code\":\"756000\",\"abridge\":\"GY\"},{\"id\":250,\"text\":\"广安\",\"zip_code\":\"638500\",\"abridge\":\"GA\"},{\"id\":243,\"text\":\"广元\",\"zip_code\":\"628000\",\"abridge\":\"GY\"},{\"id\":198,\"text\":\"广州\",\"zip_code\":\"510000\",\"abridge\":\"GZ\"},{\"id\":226,\"text\":\"贵港\",\"zip_code\":\"537100\",\"abridge\":\"GG\"},{\"id\":258,\"text\":\"贵阳\",\"zip_code\":\"550000\",\"abridge\":\"GY\"},{\"id\":221,\"text\":\"桂林\",\"zip_code\":\"541000\",\"abridge\":\"GL\"},{\"id\":319,\"text\":\"果洛\",\"zip_code\":\"814000\",\"abridge\":\"GL\"},{\"id\":60,\"text\":\"哈尔滨\",\"zip_code\":\"150000\",\"abridge\":\"HRB\"},{\"id\":330,\"text\":\"哈密\",\"zip_code\":\"839000\",\"abridge\":\"HM\"},{\"id\":316,\"text\":\"海北\",\"zip_code\":\"812200\",\"abridge\":\"HB\"},{\"id\":315,\"text\":\"海东\",\"zip_code\":\"810600\",\"abridge\":\"HD\"},{\"id\":233,\"text\":\"海口\",\"zip_code\":\"570100\",\"abridge\":\"HK\"},{\"id\":318,\"text\":\"海南\",\"zip_code\":\"813000\",\"abridge\":\"HN\"},{\"id\":321,\"text\":\"海西\",\"zip_code\":\"817000\",\"abridge\":\"HX\"},{\"id\":6,\"text\":\"邯郸\",\"zip_code\":\"056000\",\"abridge\":\"HD\"},{\"id\":296,\"text\":\"汉中\",\"zip_code\":\"723000\",\"abridge\":\"HZ\"},{\"id\":87,\"text\":\"杭州\",\"zip_code\":\"310000\",\"abridge\":\"HZ\"},{\"id\":98,\"text\":\"合肥\",\"zip_code\":\"230000\",\"abridge\":\"HF\"},{\"id\":337,\"text\":\"和田\",\"zip_code\":\"848000\",\"abridge\":\"HT\"},{\"id\":230,\"text\":\"河池\",\"zip_code\":\"547000\",\"abridge\":\"HC\"},{\"id\":211,\"text\":\"河源\",\"zip_code\":\"517000\",\"abridge\":\"HY\"},{\"id\":151,\"text\":\"菏泽\",\"zip_code\":\"274000\",\"abridge\":\"HZ\"},{\"id\":229,\"text\":\"贺州\",\"zip_code\":\"542800\",\"abridge\":\"HZ\"},{\"id\":157,\"text\":\"鹤壁\",\"zip_code\":\"458000\",\"abridge\":\"HB\"},{\"id\":63,\"text\":\"鹤岗\",\"zip_code\":\"154100\",\"abridge\":\"HG\"},{\"id\":70,\"text\":\"黑河\",\"zip_code\":\"164300\",\"abridge\":\"HH\"},{\"id\":13,\"text\":\"衡水\",\"zip_code\":\"053000\",\"abridge\":\"HS\"},{\"id\":187,\"text\":\"衡阳\",\"zip_code\":\"421000\",\"abridge\":\"HY\"},{\"id\":276,\"text\":\"红河\",\"zip_code\":\"661400\",\"abridge\":\"HH\"},{\"id\":25,\"text\":\"呼和浩特\",\"zip_code\":\"010000\",\"abridge\":\"HHHT\"},{\"id\":31,\"text\":\"呼伦贝尔\",\"zip_code\":\"021000\",\"abridge\":\"HLBR\"},{\"id\":91,\"text\":\"湖州\",\"zip_code\":\"313000\",\"abridge\":\"HZ\"},{\"id\":50,\"text\":\"葫芦岛\",\"zip_code\":\"125000\",\"abridge\":\"HLD\"},{\"id\":195,\"text\":\"怀化\",\"zip_code\":\"418000\",\"abridge\":\"HH\"},{\"id\":81,\"text\":\"淮安\",\"zip_code\":\"223001\",\"abridge\":\"HA\"},{\"id\":103,\"text\":\"淮北\",\"zip_code\":\"235000\",\"abridge\":\"HB\"},{\"id\":101,\"text\":\"淮南\",\"zip_code\":\"232000\",\"abridge\":\"HN\"},{\"id\":179,\"text\":\"黄冈\",\"zip_code\":\"438000\",\"abridge\":\"HG\"},{\"id\":317,\"text\":\"黄南\",\"zip_code\":\"811300\",\"abridge\":\"HN\"},{\"id\":106,\"text\":\"黄山\",\"zip_code\":\"242700\",\"abridge\":\"HS\"},{\"id\":171,\"text\":\"黄石\",\"zip_code\":\"435000\",\"abridge\":\"HS\"},{\"id\":208,\"text\":\"惠州\",\"zip_code\":\"516000\",\"abridge\":\"HZ\"},{\"id\":62,\"text\":\"鸡西\",\"zip_code\":\"158100\",\"abridge\":\"JX\"},{\"id\":131,\"text\":\"吉安\",\"zip_code\":\"343000\",\"abridge\":\"JA\"},{\"id\":52,\"text\":\"吉林\",\"zip_code\":\"132000\",\"abridge\":\"JL\"},{\"id\":135,\"text\":\"济南\",\"zip_code\":\"250000\",\"abridge\":\"JN\"},{\"id\":142,\"text\":\"济宁\",\"zip_code\":\"272000\",\"abridge\":\"JN\"},{\"id\":169,\"text\":\"济源\",\"zip_code\":\"454650\",\"abridge\":\"JY\"},{\"id\":67,\"text\":\"佳木斯\",\"zip_code\":\"154000\",\"abridge\":\"JMS\"},{\"id\":90,\"text\":\"嘉兴\",\"zip_code\":\"314000\",\"abridge\":\"JX\"},{\"id\":301,\"text\":\"嘉峪关\",\"zip_code\":\"735100\",\"abridge\":\"JYG\"},{\"id\":204,\"text\":\"江门\",\"zip_code\":\"529000\",\"abridge\":\"JM\"},{\"id\":159,\"text\":\"焦作\",\"zip_code\":\"454100\",\"abridge\":\"JZ\"},{\"id\":217,\"text\":\"揭阳\",\"zip_code\":\"522000\",\"abridge\":\"XY\"},{\"id\":302,\"text\":\"金昌\",\"zip_code\":\"737100\",\"abridge\":\"JC\"},{\"id\":93,\"text\":\"金华\",\"zip_code\":\"321000\",\"abridge\":\"JH\"},{\"id\":43,\"text\":\"锦州\",\"zip_code\":\"121000\",\"abridge\":\"JZ\"},{\"id\":18,\"text\":\"晋城\",\"zip_code\":\"048000\",\"abridge\":\"JC\"},{\"id\":20,\"text\":\"晋中\",\"zip_code\":\"030600\",\"abridge\":\"JZ\"},{\"id\":176,\"text\":\"荆门\",\"zip_code\":\"448000\",\"abridge\":\"JM\"},{\"id\":178,\"text\":\"荆州\",\"zip_code\":\"434000\",\"abridge\":\"JZ\"},{\"id\":125,\"text\":\"景德镇\",\"zip_code\":\"333000\",\"abridge\":\"JDZ\"},{\"id\":127,\"text\":\"九江\",\"zip_code\":\"332000\",\"abridge\":\"JJ\"},{\"id\":308,\"text\":\"酒泉\",\"zip_code\":\"735000\",\"abridge\":\"JQ\"},{\"id\":336,\"text\":\"喀什\",\"zip_code\":\"844000\",\"abridge\":\"KS\"},{\"id\":153,\"text\":\"开封\",\"zip_code\":\"475000\",\"abridge\":\"KF\"},{\"id\":328,\"text\":\"克拉玛依\",\"zip_code\":\"834000\",\"abridge\":\"KLMY\"},{\"id\":335,\"text\":\"克孜勒苏柯尔克孜\",\"zip_code\":\"845350\",\"abridge\":\"KZLSKRKZ\"},{\"id\":267,\"text\":\"昆明\",\"zip_code\":\"650000\",\"abridge\":\"KM\"},{\"id\":283,\"text\":\"拉萨\",\"zip_code\":\"850000\",\"abridge\":\"LS\"},{\"id\":231,\"text\":\"来宾\",\"zip_code\":\"546100\",\"abridge\":\"LB\"},{\"id\":146,\"text\":\"莱芜\",\"zip_code\":\"271100\",\"abridge\":\"LF\"},{\"id\":300,\"text\":\"兰州\",\"zip_code\":\"730000\",\"abridge\":\"LZ\"},{\"id\":12,\"text\":\"廊坊\",\"zip_code\":\"065000\",\"abridge\":\"LF\"},{\"id\":246,\"text\":\"乐山\",\"zip_code\":\"614000\",\"abridge\":\"LS\"},{\"id\":272,\"text\":\"丽江\",\"zip_code\":\"674100\",\"abridge\":\"LJ\"},{\"id\":97,\"text\":\"丽水\",\"zip_code\":\"323000\",\"abridge\":\"LS\"},{\"id\":80,\"text\":\"连云港\",\"zip_code\":\"222000\",\"abridge\":\"LYG\"},{\"id\":257,\"text\":\"凉山\",\"zip_code\":\"615000\",\"abridge\":\"LS\"},{\"id\":46,\"text\":\"辽阳\",\"zip_code\":\"111000\",\"abridge\":\"LL\"},{\"id\":54,\"text\":\"辽源\",\"zip_code\":\"136200\",\"abridge\":\"LY\"},{\"id\":149,\"text\":\"聊城\",\"zip_code\":\"252000\",\"abridge\":\"LC\"},{\"id\":289,\"text\":\"林芝\",\"zip_code\":\"860000\",\"abridge\":\"LZ\"},{\"id\":274,\"text\":\"临沧\",\"zip_code\":\"677000\",\"abridge\":\"LC\"},{\"id\":23,\"text\":\"临汾\",\"zip_code\":\"041000\",\"abridge\":\"LF\"},{\"id\":312,\"text\":\"临夏\",\"zip_code\":\"731100\",\"abridge\":\"LX\"},{\"id\":147,\"text\":\"临沂\",\"zip_code\":\"276000\",\"abridge\":\"LQ\"},{\"id\":220,\"text\":\"柳州\",\"zip_code\":\"545000\",\"abridge\":\"LZ\"},{\"id\":111,\"text\":\"六安\",\"zip_code\":\"237000\",\"abridge\":\"LA\"},{\"id\":259,\"text\":\"六盘水\",\"zip_code\":\"553000\",\"abridge\":\"LPS\"},{\"id\":122,\"text\":\"龙岩\",\"zip_code\":\"364000\",\"abridge\":\"LY\"},{\"id\":311,\"text\":\"陇南\",\"zip_code\":\"742500\",\"abridge\":\"LN\"},{\"id\":196,\"text\":\"娄底\",\"zip_code\":\"417000\",\"abridge\":\"LD\"},{\"id\":240,\"text\":\"泸州\",\"zip_code\":\"646000\",\"abridge\":\"LZ\"},{\"id\":24,\"text\":\"吕梁\",\"zip_code\":\"033000\",\"abridge\":\"LL\"},{\"id\":154,\"text\":\"洛阳\",\"zip_code\":\"471000\",\"abridge\":\"LY\"},{\"id\":162,\"text\":\"漯河\",\"zip_code\":\"462000\",\"abridge\":\"LH\"},{\"id\":102,\"text\":\"马鞍山\",\"zip_code\":\"243000\",\"abridge\":\"MAS\"},{\"id\":206,\"text\":\"茂名\",\"zip_code\":\"525000\",\"abridge\":\"MM\"},{\"id\":248,\"text\":\"眉山\",\"zip_code\":\"620000\",\"abridge\":\"MS\"},{\"id\":209,\"text\":\"梅州\",\"zip_code\":\"514000\",\"abridge\":\"MZ\"},{\"id\":242,\"text\":\"绵阳\",\"zip_code\":\"621000\",\"abridge\":\"MY\"},{\"id\":69,\"text\":\"牡丹江\",\"zip_code\":\"157000\",\"abridge\":\"MDJ\"},{\"id\":287,\"text\":\"那曲\",\"zip_code\":\"852000\",\"abridge\":\"NQ\"},{\"id\":124,\"text\":\"南昌\",\"zip_code\":\"330000\",\"abridge\":\"NC\"},{\"id\":247,\"text\":\"南充\",\"zip_code\":\"637000\",\"abridge\":\"NC\"},{\"id\":74,\"text\":\"南京\",\"zip_code\":\"210000\",\"abridge\":\"NJ\"},{\"id\":219,\"text\":\"南宁\",\"zip_code\":\"530000\",\"abridge\":\"NN\"},{\"id\":121,\"text\":\"南平\",\"zip_code\":\"353000\",\"abridge\":\"NP\"},{\"id\":79,\"text\":\"南通\",\"zip_code\":\"226000\",\"abridge\":\"NT\"},{\"id\":164,\"text\":\"南阳\",\"zip_code\":\"473000\",\"abridge\":\"NY\"},{\"id\":245,\"text\":\"内江\",\"zip_code\":\"641000\",\"abridge\":\"NJ\"},{\"id\":88,\"text\":\"宁波\",\"zip_code\":\"315000\",\"abridge\":\"NB\"},{\"id\":123,\"text\":\"宁德\",\"zip_code\":\"352000\",\"abridge\":\"ND\"},{\"id\":281,\"text\":\"怒江\",\"zip_code\":\"673100\",\"abridge\":\"NJ\"},{\"id\":239,\"text\":\"攀枝花\",\"zip_code\":\"617000\",\"abridge\":\"PZH\"},{\"id\":47,\"text\":\"盘锦\",\"zip_code\":\"124000\",\"abridge\":\"PJ\"},{\"id\":155,\"text\":\"平顶山\",\"zip_code\":\"467000\",\"abridge\":\"PDS\"},{\"id\":307,\"text\":\"平凉\",\"zip_code\":\"744000\",\"abridge\":\"PL\"},{\"id\":126,\"text\":\"萍乡\",\"zip_code\":\"337000\",\"abridge\":\"PX\"},{\"id\":117,\"text\":\"莆田\",\"zip_code\":\"351100\",\"abridge\":\"PT\"},{\"id\":160,\"text\":\"濮阳\",\"zip_code\":\"457000\",\"abridge\":\"PY\"},{\"id\":273,\"text\":\"普洱\",\"zip_code\":\"665000\",\"abridge\":\"PR\"},{\"id\":68,\"text\":\"七台河\",\"zip_code\":\"154600\",\"abridge\":\"QTH\"},{\"id\":61,\"text\":\"齐齐哈尔\",\"zip_code\":\"161000\",\"abridge\":\"QQHR\"},{\"id\":265,\"text\":\"黔东\",\"zip_code\":\"556000\",\"abridge\":\"QD\"},{\"id\":266,\"text\":\"黔南\",\"zip_code\":\"558000\",\"abridge\":\"QN\"},{\"id\":263,\"text\":\"黔西\",\"zip_code\":\"562400\",\"abridge\":\"QX\"},{\"id\":225,\"text\":\"钦州\",\"zip_code\":\"535000\",\"abridge\":\"QZ\"},{\"id\":5,\"text\":\"秦皇岛\",\"zip_code\":\"066000\",\"abridge\":\"QHD\"},{\"id\":136,\"text\":\"青岛\",\"zip_code\":\"266000\",\"abridge\":\"QD\"},{\"id\":213,\"text\":\"清远\",\"zip_code\":\"511500\",\"abridge\":\"QY\"},{\"id\":309,\"text\":\"庆阳\",\"zip_code\":\"745000\",\"abridge\":\"QY\"},{\"id\":268,\"text\":\"曲靖\",\"zip_code\":\"655000\",\"abridge\":\"QJ\"},{\"id\":94,\"text\":\"衢州\",\"zip_code\":\"324000\",\"abridge\":\"QZ\"},{\"id\":0,\"text\":\"全部\",\"zip_code\":\"300000\",\"abridge\":\"all\"},{\"id\":119,\"text\":\"泉州\",\"zip_code\":\"362000\",\"abridge\":\"QZ\"},{\"id\":286,\"text\":\"日喀则\",\"zip_code\":\"857000\",\"abridge\":\"RKZ\"},{\"id\":145,\"text\":\"日照\",\"zip_code\":\"276800\",\"abridge\":\"RZ\"},{\"id\":163,\"text\":\"三门峡\",\"zip_code\":\"472000\",\"abridge\":\"SMX\"},{\"id\":118,\"text\":\"三明\",\"zip_code\":\"365000\",\"abridge\":\"SM\"},{\"id\":234,\"text\":\"三亚\",\"zip_code\":\"572000\",\"abridge\":\"SY\"},{\"id\":116,\"text\":\"厦门\",\"zip_code\":\"361000\",\"abridge\":\"XM\"},{\"id\":285,\"text\":\"山南\",\"zip_code\":\"856000\",\"abridge\":\"SN\"},{\"id\":202,\"text\":\"汕头\",\"zip_code\":\"515000\",\"abridge\":\"ST\"},{\"id\":210,\"text\":\"汕尾\",\"zip_code\":\"516600\",\"abridge\":\"SW\"},{\"id\":299,\"text\":\"商洛\",\"zip_code\":\"726000\",\"abridge\":\"SL\"},{\"id\":165,\"text\":\"商丘\",\"zip_code\":\"476000\",\"abridge\":\"SQ\"},{\"id\":73,\"text\":\"上海\",\"zip_code\":\"200000\",\"abridge\":\"SH\"},{\"id\":134,\"text\":\"上饶\",\"zip_code\":\"334000\",\"abridge\":\"SR\"},{\"id\":199,\"text\":\"韶关\",\"zip_code\":\"512000\",\"abridge\":\"SG\"},{\"id\":188,\"text\":\"邵阳\",\"zip_code\":\"422000\",\"abridge\":\"SY\"},{\"id\":92,\"text\":\"绍兴\",\"zip_code\":\"312000\",\"abridge\":\"SX\"},{\"id\":200,\"text\":\"深圳\",\"zip_code\":\"518000\",\"abridge\":\"SZ\"},{\"id\":37,\"text\":\"沈阳\",\"zip_code\":\"110000\",\"abridge\":\"SY\"},{\"id\":172,\"text\":\"十堰\",\"zip_code\":\"442000\",\"abridge\":\"SY\"},{\"id\":3,\"text\":\"石家庄\",\"zip_code\":\"050000\",\"abridge\":\"SJZ\"},{\"id\":323,\"text\":\"石嘴山\",\"zip_code\":\"753000\",\"abridge\":\"SZS\"},{\"id\":64,\"text\":\"双鸭山\",\"zip_code\":\"155100\",\"abridge\":\"SYS\"},{\"id\":19,\"text\":\"朔州\",\"zip_code\":\"036000\",\"abridge\":\"SZ\"},{\"id\":53,\"text\":\"四平\",\"zip_code\":\"136000\",\"abridge\":\"SP\"},{\"id\":57,\"text\":\"松原\",\"zip_code\":\"138000\",\"abridge\":\"SY\"},{\"id\":78,\"text\":\"苏州\",\"zip_code\":\"215000\",\"abridge\":\"SZ\"},{\"id\":86,\"text\":\"宿迁\",\"zip_code\":\"223800\",\"abridge\":\"SQ\"},{\"id\":109,\"text\":\"宿州\",\"zip_code\":\"234000\",\"abridge\":\"SZ\"},{\"id\":71,\"text\":\"绥化\",\"zip_code\":\"152000\",\"abridge\":\"SH\"},{\"id\":181,\"text\":\"随州\",\"zip_code\":\"441300\",\"abridge\":\"SZ\"},{\"id\":244,\"text\":\"遂宁\",\"zip_code\":\"629000\",\"abridge\":\"SN\"},{\"id\":339,\"text\":\"塔城\",\"zip_code\":\"834700\",\"abridge\":\"TC\"},{\"id\":344,\"text\":\"台湾\",\"zip_code\":\"999079\",\"abridge\":\"TW\"},{\"id\":96,\"text\":\"台州\",\"zip_code\":\"318000\",\"abridge\":\"TZ\"},{\"id\":14,\"text\":\"太原\",\"zip_code\":\"030000\",\"abridge\":\"TY\"},{\"id\":143,\"text\":\"泰安\",\"zip_code\":\"271000\",\"abridge\":\"TA\"},{\"id\":85,\"text\":\"泰州\",\"zip_code\":\"225300\",\"abridge\":\"TZ\"},{\"id\":4,\"text\":\"唐山\",\"zip_code\":\"063000\",\"abridge\":\"TS\"},{\"id\":2,\"text\":\"天津\",\"zip_code\":\"300000\",\"abridge\":\"TJ\"},{\"id\":304,\"text\":\"天水\",\"zip_code\":\"741000\",\"abridge\":\"TS\"},{\"id\":48,\"text\":\"铁岭\",\"zip_code\":\"112000\",\"abridge\":\"TL\"},{\"id\":55,\"text\":\"通化\",\"zip_code\":\"134000\",\"abridge\":\"TH\"},{\"id\":29,\"text\":\"通辽\",\"zip_code\":\"028000\",\"abridge\":\"TL\"},{\"id\":291,\"text\":\"铜川\",\"zip_code\":\"727000\",\"abridge\":\"TC\"},{\"id\":104,\"text\":\"铜陵\",\"zip_code\":\"244000\",\"abridge\":\"TL\"},{\"id\":262,\"text\":\"铜仁\",\"zip_code\":\"554300\",\"abridge\":\"TR\"},{\"id\":329,\"text\":\"吐鲁番\",\"zip_code\":\"838000\",\"abridge\":\"TLF\"},{\"id\":144,\"text\":\"威海\",\"zip_code\":\"264200\",\"abridge\":\"WH\"},{\"id\":141,\"text\":\"潍坊\",\"zip_code\":\"261000\",\"abridge\":\"WF\"},{\"id\":294,\"text\":\"渭南\",\"zip_code\":\"714000\",\"abridge\":\"WN\"},{\"id\":89,\"text\":\"温州\",\"zip_code\":\"325000\",\"abridge\":\"WZ\"},{\"id\":277,\"text\":\"文山\",\"zip_code\":\"663000\",\"abridge\":\"WS\"},{\"id\":27,\"text\":\"乌海\",\"zip_code\":\"016000\",\"abridge\":\"WH\"},{\"id\":33,\"text\":\"乌兰察布\",\"zip_code\":\"012000\",\"abridge\":\"WLCB\"},{\"id\":327,\"text\":\"乌鲁木齐\",\"zip_code\":\"830000\",\"abridge\":\"WLMQ\"},{\"id\":75,\"text\":\"无锡\",\"zip_code\":\"214000\",\"abridge\":\"WX\"},{\"id\":324,\"text\":\"吴忠\",\"zip_code\":\"751100\",\"abridge\":\"WZ\"},{\"id\":99,\"text\":\"芜湖\",\"zip_code\":\"241000\",\"abridge\":\"WH\"},{\"id\":222,\"text\":\"梧州\",\"zip_code\":\"543000\",\"abridge\":\"WZ\"},{\"id\":170,\"text\":\"武汉\",\"zip_code\":\"430000\",\"abridge\":\"WH\"},{\"id\":305,\"text\":\"武威\",\"zip_code\":\"733000\",\"abridge\":\"WW\"},{\"id\":290,\"text\":\"西安\",\"zip_code\":\"710000\",\"abridge\":\"XA\"},{\"id\":314,\"text\":\"西宁\",\"zip_code\":\"810000\",\"abridge\":\"XN\"},{\"id\":278,\"text\":\"西双版纳\",\"zip_code\":\"666100\",\"abridge\":\"XSBN\"},{\"id\":35,\"text\":\"锡林郭勒盟\",\"zip_code\":\"026000\",\"abridge\":\"XLGLM\"},{\"id\":180,\"text\":\"咸宁\",\"zip_code\":\"437000\",\"abridge\":\"XN\"},{\"id\":293,\"text\":\"咸阳\",\"zip_code\":\"712000\",\"abridge\":\"XY\"},{\"id\":342,\"text\":\"香港\",\"zip_code\":\"999077\",\"abridge\":\"XG\"},{\"id\":186,\"text\":\"湘潭\",\"zip_code\":\"411100\",\"abridge\":\"XT\"},{\"id\":197,\"text\":\"湘西\",\"zip_code\":\"416000\",\"abridge\":\"XX\"},{\"id\":174,\"text\":\"襄阳\",\"zip_code\":\"441000\",\"abridge\":\"XY\"},{\"id\":177,\"text\":\"孝感\",\"zip_code\":\"432000\",\"abridge\":\"XG\"},{\"id\":22,\"text\":\"忻州\",\"zip_code\":\"034000\",\"abridge\":\"XZ\"},{\"id\":158,\"text\":\"新乡\",\"zip_code\":\"453000\",\"abridge\":\"XX\"},{\"id\":128,\"text\":\"新余\",\"zip_code\":\"338000\",\"abridge\":\"XY\"},{\"id\":166,\"text\":\"信阳\",\"zip_code\":\"464000\",\"abridge\":\"XY\"},{\"id\":7,\"text\":\"邢台\",\"zip_code\":\"054000\",\"abridge\":\"XT\"},{\"id\":34,\"text\":\"兴安\",\"zip_code\":\"137400\",\"abridge\":\"XA\"},{\"id\":76,\"text\":\"徐州\",\"zip_code\":\"221000\",\"abridge\":\"XZ\"},{\"id\":161,\"text\":\"许昌\",\"zip_code\":\"461000\",\"abridge\":\"XC\"},{\"id\":114,\"text\":\"宣城\",\"zip_code\":\"242000\",\"abridge\":\"XC\"},{\"id\":252,\"text\":\"雅安\",\"zip_code\":\"625000\",\"abridge\":\"YA\"},{\"id\":140,\"text\":\"烟台\",\"zip_code\":\"264000\",\"abridge\":\"YT\"},{\"id\":295,\"text\":\"延安\",\"zip_code\":\"716000\",\"abridge\":\"YA\"},{\"id\":59,\"text\":\"延边\",\"zip_code\":\"133000\",\"abridge\":\"YB\"},{\"id\":82,\"text\":\"盐城\",\"zip_code\":\"224000\",\"abridge\":\"YC\"},{\"id\":83,\"text\":\"扬州\",\"zip_code\":\"225000\",\"abridge\":\"YZ\"},{\"id\":212,\"text\":\"阳江\",\"zip_code\":\"529500\",\"abridge\":\"YJ\"},{\"id\":16,\"text\":\"阳泉\",\"zip_code\":\"045000\",\"abridge\":\"YQ\"},{\"id\":66,\"text\":\"伊春\",\"zip_code\":\"153000\",\"abridge\":\"YC\"},{\"id\":338,\"text\":\"伊犁哈萨克\",\"zip_code\":\"835000\",\"abridge\":\"YLHSK\"},{\"id\":249,\"text\":\"宜宾\",\"zip_code\":\"644000\",\"abridge\":\"YB\"},{\"id\":173,\"text\":\"宜昌\",\"zip_code\":\"443000\",\"abridge\":\"YC\"},{\"id\":132,\"text\":\"宜春\",\"zip_code\":\"336000\",\"abridge\":\"YC\"},{\"id\":192,\"text\":\"益阳\",\"zip_code\":\"413000\",\"abridge\":\"YY\"},{\"id\":322,\"text\":\"银川\",\"zip_code\":\"750000\",\"abridge\":\"YC\"},{\"id\":129,\"text\":\"鹰潭\",\"zip_code\":\"335000\",\"abridge\":\"YT\"},{\"id\":44,\"text\":\"营口\",\"zip_code\":\"115000\",\"abridge\":\"YK\"},{\"id\":194,\"text\":\"永州\",\"zip_code\":\"425000\",\"abridge\":\"YZ\"},{\"id\":297,\"text\":\"榆林\",\"zip_code\":\"719000\",\"abridge\":\"YL\"},{\"id\":227,\"text\":\"玉林\",\"zip_code\":\"537000\",\"abridge\":\"YL\"},{\"id\":320,\"text\":\"玉树\",\"zip_code\":\"815000\",\"abridge\":\"YS\"},{\"id\":269,\"text\":\"玉溪\",\"zip_code\":\"653100\",\"abridge\":\"YX\"},{\"id\":189,\"text\":\"岳阳\",\"zip_code\":\"414000\",\"abridge\":\"YY\"},{\"id\":218,\"text\":\"云浮\",\"zip_code\":\"527300\",\"abridge\":\"YF\"},{\"id\":21,\"text\":\"运城\",\"zip_code\":\"044000\",\"abridge\":\"YC\"},{\"id\":138,\"text\":\"枣庄\",\"zip_code\":\"277000\",\"abridge\":\"ZZ\"},{\"id\":205,\"text\":\"湛江\",\"zip_code\":\"524000\",\"abridge\":\"ZJ\"},{\"id\":191,\"text\":\"张家界\",\"zip_code\":\"427000\",\"abridge\":\"ZJJ\"},{\"id\":9,\"text\":\"张家口\",\"zip_code\":\"075000\",\"abridge\":\"ZJK\"},{\"id\":306,\"text\":\"张掖\",\"zip_code\":\"734000\",\"abridge\":\"ZY\"},{\"id\":120,\"text\":\"漳州\",\"zip_code\":\"363000\",\"abridge\":\"ZZ\"},{\"id\":51,\"text\":\"长春\",\"zip_code\":\"130000\",\"abridge\":\"CC\"},{\"id\":184,\"text\":\"长沙\",\"zip_code\":\"410000\",\"abridge\":\"CS\"},{\"id\":17,\"text\":\"长治\",\"zip_code\":\"046000\",\"abridge\":\"CZ\"},{\"id\":271,\"text\":\"昭通\",\"zip_code\":\"657000\",\"abridge\":\"ZT\"},{\"id\":207,\"text\":\"肇庆\",\"zip_code\":\"526000\",\"abridge\":\"ZQ\"},{\"id\":84,\"text\":\"镇江\",\"zip_code\":\"212000\",\"abridge\":\"ZJ\"},{\"id\":152,\"text\":\"郑州\",\"zip_code\":\"450000\",\"abridge\":\"ZZ\"},{\"id\":215,\"text\":\"中山\",\"zip_code\":\"528400\",\"abridge\":\"ZS\"},{\"id\":326,\"text\":\"中卫\",\"zip_code\":\"755000\",\"abridge\":\"ZW\"},{\"id\":95,\"text\":\"舟山\",\"zip_code\":\"316000\",\"abridge\":\"ZS\"},{\"id\":167,\"text\":\"周口\",\"zip_code\":\"466000\",\"abridge\":\"ZK\"},{\"id\":185,\"text\":\"株洲\",\"zip_code\":\"412000\",\"abridge\":\"ZZ\"},{\"id\":201,\"text\":\"珠海\",\"zip_code\":\"519000\",\"abridge\":\"ZH\"},{\"id\":168,\"text\":\"驻马店\",\"zip_code\":\"463000\",\"abridge\":\"ZMD\"},{\"id\":254,\"text\":\"资阳\",\"zip_code\":\"641300\",\"abridge\":\"ZY\"},{\"id\":137,\"text\":\"淄博\",\"zip_code\":\"255000\",\"abridge\":\"ZB\"},{\"id\":238,\"text\":\"自贡\",\"zip_code\":\"643000\",\"abridge\":\"ZG\"},{\"id\":260,\"text\":\"遵义\",\"zip_code\":\"563000\",\"abridge\":\"ZY\"}]");

/***/ }),

/***/ 624:
/*!*******************************************************************!*\
  !*** E:/lingli-community/web/android/components/yt-txl/pinyin.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileOverview 汉字拼音转换主题功能
 * @author waterchestnut 2017/3/13
 * @module
 */


/**
               * @typedef Option
               * @type Object
               * @property {Boolean} [checkPolyphone=false] 是否检查多音字
               * @property {Number} [charCase=0] 输出拼音的大小写模式，0-首字母大写；1-全小写；2-全大写
               */function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Pinyin = /*#__PURE__*/function () {
  /**
                                    * 构造函数，设置参数并初始化数据
                                    * @param {Option} [options] 参数对象
                                    */
  function Pinyin(options) {_classCallCheck(this, Pinyin);
    this.setOptions(options);
    this.initialize();
  }

  /**
     * 设置参数
     * @param {Option} [options] 参数对象
     */_createClass(Pinyin, [{ key: "setOptions", value: function setOptions(
    options) {
      options = options || {};
      this.options = Object.assign({ checkPolyphone: false, charCase: 0 }, options);
    }

    /**
       * 初始化数据
       */ }, { key: "initialize", value: function initialize()
    {
      this.char_dict = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
      this.full_dict = {
        "a": "\u554A\u963F\u9515",
        "ai": "\u57C3\u6328\u54CE\u5509\u54C0\u7691\u764C\u853C\u77EE\u827E\u788D\u7231\u9698\u8BF6\u6371\u55F3\u55CC\u5AD2\u7477\u66A7\u7839\u953F\u972D",
        "an": "\u978D\u6C28\u5B89\u4FFA\u6309\u6697\u5CB8\u80FA\u6848\u8C19\u57EF\u63DE\u72B4\u5EB5\u6849\u94F5\u9E4C\u9878\u9EEF",
        "ang": "\u80AE\u6602\u76CE",
        "ao": "\u51F9\u6556\u71AC\u7FF1\u8884\u50B2\u5965\u61CA\u6FB3\u5773\u62D7\u55F7\u5662\u5C99\u5ED2\u9068\u5AAA\u9A9C\u8071\u87AF\u93CA\u9CCC\u93D6",
        "ba": "\u82AD\u634C\u6252\u53ED\u5427\u7B06\u516B\u75A4\u5DF4\u62D4\u8DCB\u9776\u628A\u8019\u575D\u9738\u7F62\u7238\u8307\u83DD\u8406\u636D\u5C9C\u705E\u6777\u94AF\u7C91\u9C85\u9B43",
        "bai": "\u767D\u67CF\u767E\u6446\u4F70\u8D25\u62DC\u7A17\u859C\u63B0\u97B4",
        "ban": "\u6591\u73ED\u642C\u6273\u822C\u9881\u677F\u7248\u626E\u62CC\u4F34\u74E3\u534A\u529E\u7ECA\u962A\u5742\u8C73\u94A3\u7622\u764D\u8228",
        "bang": "\u90A6\u5E2E\u6886\u699C\u8180\u7ED1\u68D2\u78C5\u868C\u9551\u508D\u8C24\u84A1\u8783",
        "bao": "\u82DE\u80DE\u5305\u8912\u96F9\u4FDD\u5821\u9971\u5B9D\u62B1\u62A5\u66B4\u8C79\u9C8D\u7206\u52F9\u8446\u5B80\u5B62\u7172\u9E28\u8913\u8DB5\u9F85",
        "bo": "\u5265\u8584\u73BB\u83E0\u64AD\u62E8\u94B5\u6CE2\u535A\u52C3\u640F\u94C2\u7B94\u4F2F\u5E1B\u8236\u8116\u818A\u6E24\u6CCA\u9A73\u4EB3\u8543\u5575\u997D\u6A97\u64D8\u7934\u94B9\u9E41\u7C38\u8DDB",
        "bei": "\u676F\u7891\u60B2\u5351\u5317\u8F88\u80CC\u8D1D\u94A1\u500D\u72C8\u5907\u60EB\u7119\u88AB\u5B5B\u9642\u90B6\u57E4\u84D3\u5457\u602B\u6096\u789A\u9E4E\u8919\u943E",
        "ben": "\u5954\u82EF\u672C\u7B28\u755A\u574C\u951B",
        "beng": "\u5D29\u7EF7\u752D\u6CF5\u8E66\u8FF8\u552A\u5623\u750F",
        "bi": "\u903C\u9F3B\u6BD4\u9119\u7B14\u5F7C\u78A7\u84D6\u853D\u6BD5\u6BD9\u6BD6\u5E01\u5E87\u75F9\u95ED\u655D\u5F0A\u5FC5\u8F9F\u58C1\u81C2\u907F\u965B\u5315\u4EF3\u4FFE\u8298\u835C\u8378\u5421\u54D4\u72F4\u5EB3\u610E\u6ED7\u6FDE\u5F3C\u59A3\u5A62\u5B16\u74A7\u8D32\u7540\u94CB\u79D5\u88E8\u7B5A\u7B85\u7BE6\u822D\u895E\u8DF8\u9AC0",
        "bian": "\u97AD\u8FB9\u7F16\u8D2C\u6241\u4FBF\u53D8\u535E\u8FA8\u8FA9\u8FAB\u904D\u533E\u5F01\u82C4\u5FED\u6C74\u7F0F\u7178\u782D\u78A5\u7A39\u7A86\u8759\u7B3E\u9CCA",
        "biao": "\u6807\u5F6A\u8198\u8868\u5A4A\u9AA0\u98D1\u98D9\u98DA\u706C\u9556\u9573\u762D\u88F1\u9CD4",
        "bie": "\u9CD6\u618B\u522B\u762A\u8E69\u9CD8",
        "bin": "\u5F6C\u658C\u6FD2\u6EE8\u5BBE\u6448\u50A7\u6D5C\u7F24\u73A2\u6BA1\u8191\u9554\u9ACC\u9B13",
        "bing": "\u5175\u51B0\u67C4\u4E19\u79C9\u997C\u70B3\u75C5\u5E76\u7980\u90B4\u6452\u7EE0\u678B\u69DF\u71F9",
        "bu": "\u6355\u535C\u54FA\u8865\u57E0\u4E0D\u5E03\u6B65\u7C3F\u90E8\u6016\u62CA\u535F\u900B\u74FF\u6661\u949A\u91AD",
        "ca": "\u64E6\u5693\u7924",
        "cai": "\u731C\u88C1\u6750\u624D\u8D22\u776C\u8E29\u91C7\u5F69\u83DC\u8521",
        "can": "\u9910\u53C2\u8695\u6B8B\u60ED\u60E8\u707F\u9A96\u74A8\u7CB2\u9EEA",
        "cang": "\u82CD\u8231\u4ED3\u6CA7\u85CF\u4F27",
        "cao": "\u64CD\u7CD9\u69FD\u66F9\u8349\u8279\u5608\u6F15\u87AC\u825A",
        "ce": "\u5395\u7B56\u4FA7\u518C\u6D4B\u5202\u5E3B\u607B",
        "ceng": "\u5C42\u8E6D\u564C",
        "cha": "\u63D2\u53C9\u832C\u8336\u67E5\u78B4\u643D\u5BDF\u5C94\u5DEE\u8BE7\u7339\u9987\u6C4A\u59F9\u6748\u6942\u69CE\u6AAB\u9497\u9538\u9572\u8869",
        "chai": "\u62C6\u67F4\u8C7A\u4FAA\u8308\u7625\u867F\u9F87",
        "chan": "\u6400\u63BA\u8749\u998B\u8C17\u7F20\u94F2\u4EA7\u9610\u98A4\u5181\u8C04\u8C36\u8487\u5EDB\u5FCF\u6F7A\u6FB6\u5B71\u7FBC\u5A75\u5B17\u9AA3\u89C7\u7985\u9561\u88E3\u87FE\u8E94",
        "chang": "\u660C\u7316\u573A\u5C1D\u5E38\u957F\u507F\u80A0\u5382\u655E\u7545\u5531\u5021\u4F25\u9B2F\u82CC\u83D6\u5F9C\u6005\u60DD\u960A\u5A3C\u5AE6\u6636\u6C05\u9CB3",
        "chao": "\u8D85\u6284\u949E\u671D\u5632\u6F6E\u5DE2\u5435\u7092\u600A\u7EC9\u6641\u8016",
        "che": "\u8F66\u626F\u64A4\u63A3\u5F7B\u6F88\u577C\u5C6E\u7817",
        "chen": "\u90F4\u81E3\u8FB0\u5C18\u6668\u5FF1\u6C89\u9648\u8D81\u886C\u79F0\u8C0C\u62BB\u55D4\u5BB8\u741B\u6987\u809C\u80C2\u789C\u9F80",
        "cheng": "\u6491\u57CE\u6A59\u6210\u5448\u4E58\u7A0B\u60E9\u6F84\u8BDA\u627F\u901E\u9A8B\u79E4\u57D5\u5D4A\u5FB5\u6D48\u67A8\u67FD\u6A18\u665F\u584D\u77A0\u94D6\u88CE\u86CF\u9172",
        "chi": "\u5403\u75F4\u6301\u5319\u6C60\u8FDF\u5F1B\u9A70\u803B\u9F7F\u4F88\u5C3A\u8D64\u7FC5\u65A5\u70BD\u50BA\u5880\u82AA\u830C\u640B\u53F1\u54E7\u557B\u55E4\u5F73\u996C\u6CB2\u5AB8\u6555\u80DD\u7719\u7735\u9E31\u761B\u892B\u86A9\u87AD\u7B1E\u7BEA\u8C49\u8E05\u8E1F\u9B51",
        "chong": "\u5145\u51B2\u866B\u5D07\u5BA0\u833A\u5FE1\u61A7\u94F3\u825F",
        "chou": "\u62BD\u916C\u7574\u8E0C\u7A20\u6101\u7B79\u4EC7\u7EF8\u7785\u4E11\u4FE6\u5733\u5E31\u60C6\u6EB4\u59AF\u7633\u96E0\u9C8B",
        "chu": "\u81ED\u521D\u51FA\u6A71\u53A8\u8E87\u9504\u96CF\u6EC1\u9664\u695A\u7840\u50A8\u77D7\u6410\u89E6\u5904\u4E8D\u520D\u61B7\u7ECC\u6775\u696E\u6A17\u870D\u8E70\u9EDC",
        "chuan": "\u63E3\u5DDD\u7A7F\u693D\u4F20\u8239\u5598\u4E32\u63BE\u821B\u60F4\u9044\u5DDB\u6C1A\u948F\u9569\u8221",
        "chuang": "\u75AE\u7A97\u5E62\u5E8A\u95EF\u521B\u6006",
        "chui": "\u5439\u708A\u6376\u9524\u5782\u9672\u68F0\u69CC",
        "chun": "\u6625\u693F\u9187\u5507\u6DF3\u7EAF\u8822\u4FC3\u83BC\u6C8C\u80AB\u6710\u9E51\u877D",
        "chuo": "\u6233\u7EF0\u851F\u8FB6\u8F8D\u955E\u8E14\u9F8A",
        "ci": "\u75B5\u8328\u78C1\u96CC\u8F9E\u6148\u74F7\u8BCD\u6B64\u523A\u8D50\u6B21\u8360\u5472\u5D6F\u9E5A\u8785\u7CCD\u8D91",
        "cong": "\u806A\u8471\u56F1\u5306\u4ECE\u4E1B\u506C\u82C1\u6DD9\u9AA2\u742E\u7481\u679E",
        "cu": "\u51D1\u7C97\u918B\u7C07\u731D\u6B82\u8E59",
        "cuan": "\u8E7F\u7BE1\u7A9C\u6C46\u64BA\u6615\u7228",
        "cui": "\u6467\u5D14\u50AC\u8106\u7601\u7CB9\u6DEC\u7FE0\u8403\u60B4\u7480\u69B1\u96B9",
        "cun": "\u6751\u5B58\u5BF8\u78CB\u5FD6\u76B4",
        "cuo": "\u64AE\u6413\u63AA\u632B\u9519\u539D\u811E\u9509\u77EC\u75E4\u9E7E\u8E49\u8E9C",
        "da": "\u642D\u8FBE\u7B54\u7629\u6253\u5927\u8037\u54D2\u55D2\u601B\u59B2\u75B8\u8921\u7B2A\u977C\u9791",
        "dai": "\u5446\u6B79\u50A3\u6234\u5E26\u6B86\u4EE3\u8D37\u888B\u5F85\u902E\u6020\u57ED\u7519\u5454\u5CB1\u8FE8\u902F\u9A80\u7ED0\u73B3\u9EDB",
        "dan": "\u803D\u62C5\u4E39\u5355\u90F8\u63B8\u80C6\u65E6\u6C2E\u4F46\u60EE\u6DE1\u8BDE\u5F39\u86CB\u4EBB\u510B\u5369\u840F\u5556\u6FB9\u6A90\u6B9A\u8D55\u7708\u7605\u8043\u7BAA",
        "dang": "\u5F53\u6321\u515A\u8361\u6863\u8C20\u51FC\u83EA\u5B95\u7800\u94DB\u88C6",
        "dao": "\u5200\u6363\u8E48\u5012\u5C9B\u7977\u5BFC\u5230\u7A3B\u60BC\u9053\u76D7\u53E8\u5541\u5FC9\u6D2E\u6C18\u7118\u5FD1\u7E9B",
        "de": "\u5FB7\u5F97\u7684\u951D",
        "deng": "\u8E6C\u706F\u767B\u7B49\u77AA\u51F3\u9093\u5654\u5D9D\u6225\u78F4\u956B\u7C26",
        "di": "\u5824\u4F4E\u6EF4\u8FEA\u654C\u7B1B\u72C4\u6DA4\u7FDF\u5AE1\u62B5\u5E95\u5730\u8482\u7B2C\u5E1D\u5F1F\u9012\u7F14\u6C10\u7C74\u8BCB\u8C1B\u90B8\u577B\u839C\u837B\u5600\u5A23\u67E2\u68E3\u89CC\u7825\u78B2\u7747\u955D\u7F9D\u9AB6",
        "dian": "\u98A0\u6382\u6EC7\u7898\u70B9\u5178\u975B\u57AB\u7535\u4F43\u7538\u5E97\u60E6\u5960\u6DC0\u6BBF\u4E36\u963D\u576B\u57DD\u5DC5\u73B7\u765C\u766B\u7C1F\u8E2E",
        "diao": "\u7889\u53FC\u96D5\u51CB\u5201\u6389\u540A\u9493\u8C03\u8F7A\u94DE\u8729\u7C9C\u8C82",
        "die": "\u8DCC\u7239\u789F\u8776\u8FED\u8C0D\u53E0\u4F5A\u57A4\u581E\u63F2\u558B\u6E2B\u8F76\u7252\u74DE\u8936\u800B\u8E40\u9CBD\u9CCE",
        "ding": "\u4E01\u76EF\u53EE\u9489\u9876\u9F0E\u952D\u5B9A\u8BA2\u4E22\u4EC3\u5576\u738E\u815A\u7887\u753A\u94E4\u7594\u8035\u914A",
        "dong": "\u4E1C\u51AC\u8463\u61C2\u52A8\u680B\u4F97\u606B\u51BB\u6D1E\u578C\u549A\u5CBD\u5CD2\u5902\u6C21\u80E8\u80F4\u7850\u9E2B",
        "dou": "\u515C\u6296\u6597\u9661\u8C46\u9017\u75D8\u8538\u94AD\u7AA6\u7AAC\u86AA\u7BFC\u9161",
        "du": "\u90FD\u7763\u6BD2\u728A\u72EC\u8BFB\u5835\u7779\u8D4C\u675C\u9540\u809A\u5EA6\u6E21\u5992\u828F\u561F\u6E0E\u691F\u6A50\u724D\u8839\u7B03\u9AD1\u9EE9",
        "duan": "\u7AEF\u77ED\u953B\u6BB5\u65AD\u7F0E\u5F56\u6934\u7145\u7C16",
        "dui": "\u5806\u5151\u961F\u5BF9\u603C\u619D\u7893",
        "dun": "\u58A9\u5428\u8E72\u6566\u987F\u56E4\u949D\u76FE\u9041\u7096\u7818\u7905\u76F9\u9566\u8DB8",
        "duo": "\u6387\u54C6\u591A\u593A\u579B\u8EB2\u6735\u8DFA\u8235\u5241\u60F0\u5815\u5484\u54DA\u7F0D\u67C1\u94CE\u88F0\u8E31",
        "e": "\u86FE\u5CE8\u9E45\u4FC4\u989D\u8BB9\u5A25\u6076\u5384\u627C\u904F\u9102\u997F\u5669\u8C14\u57A9\u57AD\u82CA\u83AA\u843C\u5443\u6115\u5C59\u5A40\u8F6D\u66F7\u816D\u786A\u9507\u9537\u9E57\u989A\u9CC4",
        "en": "\u6069\u84BD\u6441\u5514\u55EF",
        "er": "\u800C\u513F\u8033\u5C14\u9975\u6D31\u4E8C\u8D30\u8FE9\u73E5\u94D2\u9E38\u9C95",
        "fa": "\u53D1\u7F5A\u7B4F\u4F10\u4E4F\u9600\u6CD5\u73D0\u57A1\u781D",
        "fan": "\u85E9\u5E06\u756A\u7FFB\u6A0A\u77FE\u9492\u7E41\u51E1\u70E6\u53CD\u8FD4\u8303\u8D29\u72AF\u996D\u6CDB\u8629\u5E61\u72AD\u68B5\u6535\u71D4\u7548\u8E6F",
        "fang": "\u574A\u82B3\u65B9\u80AA\u623F\u9632\u59A8\u4EFF\u8BBF\u7EBA\u653E\u531A\u90A1\u5F77\u94AB\u822B\u9C82",
        "fei": "\u83F2\u975E\u5561\u98DE\u80A5\u532A\u8BFD\u5420\u80BA\u5E9F\u6CB8\u8D39\u82BE\u72D2\u60B1\u6DDD\u5983\u7ECB\u7EEF\u69A7\u8153\u6590\u6249\u7953\u7829\u9544\u75F1\u871A\u7BDA\u7FE1\u970F\u9CB1",
        "fen": "\u82AC\u915A\u5429\u6C1B\u5206\u7EB7\u575F\u711A\u6C7E\u7C89\u594B\u4EFD\u5FFF\u6124\u7CAA\u507E\u7035\u68FC\u610D\u9CBC\u9F22",
        "feng": "\u4E30\u5C01\u67AB\u8702\u5CF0\u950B\u98CE\u75AF\u70FD\u9022\u51AF\u7F1D\u8BBD\u5949\u51E4\u4FF8\u9146\u8451\u6CA3\u781C",
        "fu": "\u4F5B\u5426\u592B\u6577\u80A4\u5B75\u6276\u62C2\u8F90\u5E45\u6C1F\u7B26\u4F0F\u4FD8\u670D\u6D6E\u6DAA\u798F\u88B1\u5F17\u752B\u629A\u8F85\u4FEF\u91DC\u65A7\u812F\u8151\u5E9C\u8150\u8D74\u526F\u8986\u8D4B\u590D\u5085\u4ED8\u961C\u7236\u8179\u8D1F\u5BCC\u8BA3\u9644\u5987\u7F1A\u5490\u5310\u51EB\u90DB\u8299\u82FB\u832F\u83A9\u83D4\u544B\u5E5E\u6ECF\u8274\u5B5A\u9A78\u7EC2\u6874\u8D59\u9EFB\u9EFC\u7F58\u7A03\u99A5\u864D\u86A8\u8709\u8760\u876E\u9EB8\u8DBA\u8DD7\u9CC6",
        "ga": "\u5676\u560E\u86E4\u5C2C\u5477\u5C15\u5C1C\u65EE\u9486",
        "gai": "\u8BE5\u6539\u6982\u9499\u76D6\u6E89\u4E10\u9654\u5793\u6224\u8D45\u80F2",
        "gan": "\u5E72\u7518\u6746\u67D1\u7AFF\u809D\u8D76\u611F\u79C6\u6562\u8D63\u5769\u82F7\u5C34\u64C0\u6CD4\u6DE6\u6F89\u7EC0\u6A44\u65F0\u77F8\u75B3\u9150",
        "gang": "\u5188\u521A\u94A2\u7F38\u809B\u7EB2\u5C97\u6E2F\u6206\u7F61\u9883\u7B7B",
        "gong": "\u6760\u5DE5\u653B\u529F\u606D\u9F9A\u4F9B\u8EAC\u516C\u5BAB\u5F13\u5DE9\u6C5E\u62F1\u8D21\u5171\u857B\u5EFE\u54A3\u73D9\u80B1\u86A3\u86E9\u89E5",
        "gao": "\u7BD9\u768B\u9AD8\u818F\u7F94\u7CD5\u641E\u9550\u7A3F\u544A\u777E\u8BF0\u90DC\u84BF\u85C1\u7F1F\u69D4\u69C1\u6772\u9506",
        "ge": "\u54E5\u6B4C\u6401\u6208\u9E3D\u80F3\u7599\u5272\u9769\u845B\u683C\u9601\u9694\u94EC\u4E2A\u5404\u9B32\u4EE1\u54FF\u5865\u55DD\u7EA5\u643F\u8188\u784C\u94EA\u9549\u88BC\u988C\u867C\u8238\u9ABC\u9AC2",
        "gei": "\u7ED9",
        "gen": "\u6839\u8DDF\u4E98\u831B\u54CF\u826E",
        "geng": "\u8015\u66F4\u5E9A\u7FB9\u57C2\u803F\u6897\u54FD\u8D53\u9CA0",
        "gou": "\u94A9\u52FE\u6C9F\u82DF\u72D7\u57A2\u6784\u8D2D\u591F\u4F5D\u8BDF\u5CA3\u9058\u5ABE\u7F11\u89CF\u5F40\u9E32\u7B31\u7BDD\u97B2",
        "gu": "\u8F9C\u83C7\u5495\u7B8D\u4F30\u6CBD\u5B64\u59D1\u9F13\u53E4\u86CA\u9AA8\u8C37\u80A1\u6545\u987E\u56FA\u96C7\u560F\u8BC2\u83F0\u54CC\u5D2E\u6C69\u688F\u8F71\u726F\u727F\u80CD\u81CC\u6BC2\u77BD\u7F5F\u94B4\u9522\u74E0\u9E2A\u9E44\u75FC\u86C4\u9164\u89DA\u9CB4\u9AB0\u9E58",
        "gua": "\u522E\u74DC\u5250\u5BE1\u6302\u8902\u5366\u8BD6\u5471\u681D\u9E39",
        "guai": "\u4E56\u62D0\u602A\u54D9",
        "guan": "\u68FA\u5173\u5B98\u51A0\u89C2\u7BA1\u9986\u7F50\u60EF\u704C\u8D2F\u500C\u839E\u63BC\u6DAB\u76E5\u9E73\u9CCF",
        "guang": "\u5149\u5E7F\u901B\u72B7\u6844\u80F1\u7592",
        "gui": "\u7470\u89C4\u572D\u7845\u5F52\u9F9F\u95FA\u8F68\u9B3C\u8BE1\u7678\u6842\u67DC\u8DEA\u8D35\u523D\u5326\u523F\u5E8B\u5B84\u59AB\u6867\u7085\u6677\u7688\u7C0B\u9C91\u9CDC",
        "gun": "\u8F8A\u6EDA\u68CD\u4E28\u886E\u7EF2\u78D9\u9CA7",
        "guo": "\u9505\u90ED\u56FD\u679C\u88F9\u8FC7\u9998\u8803\u57DA\u63B4\u5459\u56D7\u5E3C\u5D1E\u7313\u6901\u8662\u951E\u8052\u872E\u873E\u8748",
        "ha": "\u54C8",
        "hai": "\u9AB8\u5B69\u6D77\u6C26\u4EA5\u5BB3\u9A87\u54B4\u55E8\u988F\u91A2",
        "han": "\u9163\u61A8\u90AF\u97E9\u542B\u6DB5\u5BD2\u51FD\u558A\u7F55\u7FF0\u64BC\u634D\u65F1\u61BE\u608D\u710A\u6C57\u6C49\u9097\u83E1\u6496\u961A\u701A\u6657\u7113\u9894\u86B6\u9F3E",
        "hen": "\u592F\u75D5\u5F88\u72E0\u6068",
        "hang": "\u676D\u822A\u6C86\u7ED7\u73E9\u6841",
        "hao": "\u58D5\u568E\u8C6A\u6BEB\u90DD\u597D\u8017\u53F7\u6D69\u8585\u55E5\u5686\u6FE0\u704F\u660A\u7693\u98A2\u869D",
        "he": "\u5475\u559D\u8377\u83CF\u6838\u79BE\u548C\u4F55\u5408\u76D2\u8C89\u9602\u6CB3\u6DB8\u8D6B\u8910\u9E64\u8D3A\u8BC3\u52BE\u58D1\u85FF\u55D1\u55EC\u9616\u76CD\u86B5\u7FEE",
        "hei": "\u563F\u9ED1",
        "heng": "\u54FC\u4EA8\u6A2A\u8861\u6052\u8A07\u8605",
        "hong": "\u8F70\u54C4\u70D8\u8679\u9E3F\u6D2A\u5B8F\u5F18\u7EA2\u9EC9\u8BA7\u836D\u85A8\u95F3\u6CD3",
        "hou": "\u5589\u4FAF\u7334\u543C\u539A\u5019\u540E\u5820\u5F8C\u9005\u760A\u7BCC\u7CC7\u9C8E\u9ABA",
        "hu": "\u547C\u4E4E\u5FFD\u745A\u58F6\u846B\u80E1\u8774\u72D0\u7CCA\u6E56\u5F27\u864E\u552C\u62A4\u4E92\u6CAA\u6237\u51B1\u553F\u56EB\u5CB5\u7322\u6019\u60DA\u6D52\u6EF9\u7425\u69F2\u8F77\u89F3\u70C0\u7173\u623D\u6248\u795C\u9E55\u9E71\u7B0F\u9190\u659B",
        "hua": "\u82B1\u54D7\u534E\u733E\u6ED1\u753B\u5212\u5316\u8BDD\u5290\u6D4D\u9A85\u6866\u94E7\u7A1E",
        "huai": "\u69D0\u5F8A\u6000\u6DEE\u574F\u8FD8\u8E1D",
        "huan": "\u6B22\u73AF\u6853\u7F13\u6362\u60A3\u5524\u75EA\u8C62\u7115\u6DA3\u5BA6\u5E7B\u90C7\u5942\u57B8\u64D0\u571C\u6D39\u6D63\u6F36\u5BF0\u902D\u7F33\u953E\u9CA9\u9B1F",
        "huang": "\u8352\u614C\u9EC4\u78FA\u8757\u7C27\u7687\u51F0\u60F6\u714C\u6643\u5E4C\u604D\u8C0E\u968D\u5FA8\u6E5F\u6F62\u9051\u749C\u8093\u7640\u87E5\u7BC1\u9CC7",
        "hui": "\u7070\u6325\u8F89\u5FBD\u6062\u86D4\u56DE\u6BC1\u6094\u6167\u5349\u60E0\u6666\u8D3F\u79FD\u4F1A\u70E9\u6C47\u8BB3\u8BF2\u7ED8\u8BD9\u8334\u835F\u8559\u54D5\u5599\u96B3\u6D04\u5F57\u7F0B\u73F2\u6656\u605A\u867A\u87EA\u9EBE",
        "hun": "\u8364\u660F\u5A5A\u9B42\u6D51\u6DF7\u8BE8\u9984\u960D\u6EB7\u7F17",
        "huo": "\u8C41\u6D3B\u4F19\u706B\u83B7\u6216\u60D1\u970D\u8D27\u7978\u6509\u56AF\u5925\u94AC\u952A\u956C\u8020\u8816",
        "ji": "\u51FB\u573E\u57FA\u673A\u7578\u7A3D\u79EF\u7B95\u808C\u9965\u8FF9\u6FC0\u8BA5\u9E21\u59EC\u7EE9\u7F09\u5409\u6781\u68D8\u8F91\u7C4D\u96C6\u53CA\u6025\u75BE\u6C72\u5373\u5AC9\u7EA7\u6324\u51E0\u810A\u5DF1\u84DF\u6280\u5180\u5B63\u4F0E\u796D\u5242\u60B8\u6D4E\u5BC4\u5BC2\u8BA1\u8BB0\u65E2\u5FCC\u9645\u5993\u7EE7\u7EAA\u5C45\u4E0C\u4E69\u525E\u4F76\u4F74\u8114\u58BC\u82A8\u82B0\u8401\u84BA\u857A\u638E\u53FD\u54AD\u54DC\u5527\u5C8C\u5D74\u6D0E\u5F50\u5C50\u9AA5\u757F\u7391\u696B\u6B9B\u621F\u6222\u8D4D\u89CA\u7284\u9F51\u77F6\u7F81\u5D47\u7A37\u7620\u7635\u866E\u7B08\u7B04\u66A8\u8DFB\u8DFD\u9701\u9C9A\u9CAB\u9AFB\u9E82",
        "jia": "\u5609\u67B7\u5939\u4F73\u5BB6\u52A0\u835A\u988A\u8D3E\u7532\u94BE\u5047\u7A3C\u4EF7\u67B6\u9A7E\u5AC1\u4F3D\u90CF\u62EE\u5CAC\u6D43\u8FE6\u73C8\u621B\u80DB\u605D\u94D7\u9553\u75C2\u86F1\u7B33\u8888\u8DCF",
        "jian": "\u6B7C\u76D1\u575A\u5C16\u7B3A\u95F4\u714E\u517C\u80A9\u8270\u5978\u7F04\u8327\u68C0\u67EC\u78B1\u7877\u62E3\u6361\u7B80\u4FED\u526A\u51CF\u8350\u69DB\u9274\u8DF5\u8D31\u89C1\u952E\u7BAD\u4EF6\u5065\u8230\u5251\u996F\u6E10\u6E85\u6DA7\u5EFA\u50ED\u8C0F\u8C2B\u83C5\u84B9\u641B\u56DD\u6E54\u8E47\u8B07\u7F23\u67A7\u67D9\u6957\u620B\u622C\u726E\u728D\u6BFD\u8171\u7751\u950F\u9E63\u88E5\u7B15\u7BB4\u7FE6\u8DBC\u8E3A\u9CA3\u97AF",
        "jiang": "\u50F5\u59DC\u5C06\u6D46\u6C5F\u7586\u848B\u6868\u5956\u8BB2\u5320\u9171\u964D\u8333\u6D1A\u7EDB\u7F30\u729F\u7913\u8029\u7CE8\u8C47",
        "jiao": "\u8549\u6912\u7901\u7126\u80F6\u4EA4\u90CA\u6D47\u9A84\u5A07\u56BC\u6405\u94F0\u77EB\u4FA5\u811A\u72E1\u89D2\u997A\u7F34\u7EDE\u527F\u6559\u9175\u8F7F\u8F83\u53EB\u4F7C\u50EC\u832D\u6322\u564D\u5CE4\u5FBC\u59E3\u7E9F\u656B\u768E\u9E6A\u86DF\u91AE\u8DE4\u9C9B",
        "jie": "\u7A96\u63ED\u63A5\u7686\u79F8\u8857\u9636\u622A\u52AB\u8282\u6854\u6770\u6377\u776B\u7AED\u6D01\u7ED3\u89E3\u59D0\u6212\u85C9\u82A5\u754C\u501F\u4ECB\u75A5\u8BEB\u5C4A\u5048\u8BA6\u8BD8\u5588\u55DF\u736C\u5A55\u5B51\u6840\u7352\u78A3\u9534\u7596\u88B7\u9889\u86A7\u7FAF\u9C92\u9AB1\u9AEB",
        "jin": "\u5DFE\u7B4B\u65A4\u91D1\u4ECA\u6D25\u895F\u7D27\u9526\u4EC5\u8C28\u8FDB\u9773\u664B\u7981\u8FD1\u70EC\u6D78\u5C3D\u537A\u8369\u5807\u5664\u9991\u5ED1\u5997\u7F19\u747E\u69FF\u8D46\u89D0\u9485\u9513\u887F\u77DC",
        "jing": "\u52B2\u8346\u5162\u830E\u775B\u6676\u9CB8\u4EAC\u60CA\u7CBE\u7CB3\u7ECF\u4E95\u8B66\u666F\u9888\u9759\u5883\u656C\u955C\u5F84\u75C9\u9756\u7ADF\u7ADE\u51C0\u522D\u5106\u9631\u83C1\u734D\u61AC\u6CFE\u8FF3\u5F2A\u5A67\u80BC\u80EB\u8148\u65CC",
        "jiong": "\u70AF\u7A98\u5182\u8FE5\u6243",
        "jiu": "\u63EA\u7A76\u7EA0\u7396\u97ED\u4E45\u7078\u4E5D\u9152\u53A9\u6551\u65E7\u81FC\u8205\u548E\u5C31\u759A\u50E6\u557E\u9604\u67E9\u6855\u9E6B\u8D73\u9B0F",
        "ju": "\u97A0\u62D8\u72D9\u75BD\u9A79\u83CA\u5C40\u5480\u77E9\u4E3E\u6CAE\u805A\u62D2\u636E\u5DE8\u5177\u8DDD\u8E1E\u952F\u4FF1\u53E5\u60E7\u70AC\u5267\u5028\u8BB5\u82E3\u82F4\u8392\u63AC\u907D\u5C66\u741A\u67B8\u6910\u6998\u6989\u6A58\u728B\u98D3\u949C\u9514\u7AAD\u88FE\u8D84\u91B5\u8E3D\u9F83\u96CE\u97AB",
        "juan": "\u6350\u9E43\u5A1F\u5026\u7737\u5377\u7EE2\u9104\u72F7\u6D93\u684A\u8832\u9529\u954C\u96BD",
        "jue": "\u6485\u652B\u6289\u6398\u5014\u7235\u89C9\u51B3\u8BC0\u7EDD\u53A5\u5282\u8C32\u77CD\u8568\u5658\u5D1B\u7357\u5B53\u73CF\u6877\u6A5B\u721D\u9562\u8E76\u89D6",
        "jun": "\u5747\u83CC\u94A7\u519B\u541B\u5CFB\u4FCA\u7AE3\u6D5A\u90E1\u9A8F\u6343\u72FB\u76B2\u7B60\u9E87",
        "ka": "\u5580\u5496\u5361\u4F67\u5494\u80E9",
        "ke": "\u54AF\u5777\u82DB\u67EF\u68F5\u78D5\u9897\u79D1\u58F3\u54B3\u53EF\u6E34\u514B\u523B\u5BA2\u8BFE\u5CA2\u606A\u6E98\u9A92\u7F02\u73C2\u8F72\u6C2A\u778C\u94B6\u75B4\u7AA0\u874C\u9AC1",
        "kai": "\u5F00\u63E9\u6977\u51EF\u6168\u5240\u57B2\u8488\u5FFE\u607A\u94E0\u950E",
        "kan": "\u520A\u582A\u52D8\u574E\u780D\u770B\u4F83\u51F5\u83B0\u83B6\u6221\u9F9B\u77B0",
        "kang": "\u5EB7\u6177\u7CE0\u625B\u6297\u4EA2\u7095\u5751\u4F09\u95F6\u94AA",
        "kao": "\u8003\u62F7\u70E4\u9760\u5C3B\u6832\u7292\u94D0",
        "ken": "\u80AF\u5543\u57A6\u6073\u57A0\u88C9\u9880",
        "keng": "\u542D\u5FD0\u94FF",
        "kong": "\u7A7A\u6050\u5B54\u63A7\u5025\u5D06\u7B9C",
        "kou": "\u62A0\u53E3\u6263\u5BC7\u82A4\u853B\u53E9\u770D\u7B58",
        "ku": "\u67AF\u54ED\u7A9F\u82E6\u9177\u5E93\u88E4\u5233\u5800\u55BE\u7ED4\u9AB7",
        "kua": "\u5938\u57AE\u630E\u8DE8\u80EF\u4F89",
        "kuai": "\u5757\u7B77\u4FA9\u5FEB\u84AF\u90D0\u8489\u72EF\u810D",
        "kuan": "\u5BBD\u6B3E\u9ACB",
        "kuang": "\u5321\u7B50\u72C2\u6846\u77FF\u7736\u65F7\u51B5\u8BD3\u8BF3\u909D\u5739\u593C\u54D0\u7EA9\u8D36",
        "kui": "\u4E8F\u76D4\u5CBF\u7AA5\u8475\u594E\u9B41\u5080\u9988\u6127\u6E83\u9997\u532E\u5914\u9697\u63C6\u55B9\u559F\u609D\u6126\u9615\u9035\u668C\u777D\u8069\u8770\u7BD1\u81FE\u8DEC",
        "kun": "\u5764\u6606\u6346\u56F0\u6083\u9603\u7428\u951F\u918C\u9CB2\u9AE1",
        "kuo": "\u62EC\u6269\u5ED3\u9614\u86DE",
        "la": "\u5783\u62C9\u5587\u8721\u814A\u8FA3\u5566\u524C\u647A\u908B\u65EF\u782C\u760C",
        "lai": "\u83B1\u6765\u8D56\u5D03\u5F95\u6D9E\u6FD1\u8D49\u7750\u94FC\u765E\u7C41",
        "lan": "\u84DD\u5A6A\u680F\u62E6\u7BEE\u9611\u5170\u6F9C\u8C30\u63FD\u89C8\u61D2\u7F06\u70C2\u6EE5\u5549\u5C9A\u61D4\u6F24\u6984\u6593\u7F71\u9567\u8934",
        "lang": "\u7405\u6994\u72FC\u5ECA\u90CE\u6717\u6D6A\u83A8\u8497\u5577\u9606\u9512\u7A02\u8782",
        "lao": "\u635E\u52B3\u7262\u8001\u4F6C\u59E5\u916A\u70D9\u6D9D\u5520\u5D02\u6833\u94D1\u94F9\u75E8\u91AA",
        "le": "\u52D2\u4E50\u808B\u4EC2\u53FB\u561E\u6CD0\u9CD3",
        "lei": "\u96F7\u956D\u857E\u78CA\u7D2F\u5121\u5792\u64C2\u7C7B\u6CEA\u7FB8\u8BD4\u837D\u54A7\u6F2F\u5AD8\u7F27\u6A91\u8012\u9179",
        "ling": "\u68F1\u51B7\u62CE\u73B2\u83F1\u96F6\u9F84\u94C3\u4F36\u7F9A\u51CC\u7075\u9675\u5CAD\u9886\u53E6\u4EE4\u9143\u5844\u82D3\u5464\u56F9\u6CE0\u7EEB\u67C3\u68C2\u74F4\u8046\u86C9\u7FCE\u9CAE",
        "leng": "\u695E\u6123",
        "li": "\u5398\u68A8\u7281\u9ECE\u7BF1\u72F8\u79BB\u6F13\u7406\u674E\u91CC\u9CA4\u793C\u8389\u8354\u540F\u6817\u4E3D\u5389\u52B1\u783E\u5386\u5229\u5088\u4F8B\u4FD0\u75E2\u7ACB\u7C92\u6CA5\u96B6\u529B\u7483\u54E9\u4FEA\u4FDA\u90E6\u575C\u82C8\u8385\u84E0\u85DC\u6369\u5456\u5533\u55B1\u7301\u6EA7\u6FA7\u9026\u5A0C\u5AE0\u9A8A\u7F21\u73DE\u67A5\u680E\u8F79\u623E\u783A\u8A48\u7F79\u9502\u9E42\u75A0\u75AC\u86CE\u870A\u8821\u7B20\u7BE5\u7C9D\u91B4\u8DDE\u96F3\u9CA1\u9CE2\u9EE7",
        "lian": "\u4FE9\u8054\u83B2\u8FDE\u9570\u5EC9\u601C\u6D9F\u5E18\u655B\u8138\u94FE\u604B\u70BC\u7EC3\u631B\u8539\u5941\u6F4B\u6FC2\u5A08\u740F\u695D\u6B93\u81C1\u81A6\u88E2\u880A\u9CA2",
        "liang": "\u7CAE\u51C9\u6881\u7CB1\u826F\u4E24\u8F86\u91CF\u667E\u4EAE\u8C05\u589A\u690B\u8E09\u9753\u9B49",
        "liao": "\u64A9\u804A\u50DA\u7597\u71CE\u5BE5\u8FBD\u6F66\u4E86\u6482\u9563\u5ED6\u6599\u84FC\u5C25\u5639\u7360\u5BEE\u7F2D\u948C\u9E69\u8022",
        "lie": "\u5217\u88C2\u70C8\u52A3\u730E\u51BD\u57D2\u6D0C\u8D94\u8E90\u9B23",
        "lin": "\u7433\u6797\u78F7\u9716\u4E34\u90BB\u9CDE\u6DCB\u51DB\u8D41\u541D\u853A\u5D99\u5EEA\u9074\u6AA9\u8F9A\u77B5\u7CBC\u8E8F\u9E9F",
        "liu": "\u6E9C\u7409\u69B4\u786B\u998F\u7559\u5218\u7624\u6D41\u67F3\u516D\u62A1\u507B\u848C\u6CD6\u6D4F\u905B\u9A9D\u7EFA\u65D2\u7198\u950D\u954F\u9E68\u938F",
        "long": "\u9F99\u804B\u5499\u7B3C\u7ABF\u9686\u5784\u62E2\u9647\u5F04\u5785\u830F\u6CF7\u73D1\u680A\u80E7\u783B\u7643",
        "lou": "\u697C\u5A04\u6402\u7BD3\u6F0F\u964B\u55BD\u5D5D\u9542\u7618\u8027\u877C\u9AC5",
        "lu": "\u82A6\u5362\u9885\u5E90\u7089\u63B3\u5364\u864F\u9C81\u9E93\u788C\u9732\u8DEF\u8D42\u9E7F\u6F5E\u7984\u5F55\u9646\u622E\u5786\u6445\u64B8\u565C\u6CF8\u6E0C\u6F09\u7490\u680C\u6A79\u8F73\u8F82\u8F98\u6C07\u80EA\u9565\u9E2C\u9E6D\u7C0F\u823B\u9C88",
        "lv": "\u9A74\u5415\u94DD\u4FA3\u65C5\u5C65\u5C61\u7F15\u8651\u6C2F\u5F8B\u7387\u6EE4\u7EFF\u634B\u95FE\u6988\u8182\u7A06\u891B",
        "luan": "\u5CE6\u5B6A\u6EE6\u5375\u4E71\u683E\u9E3E\u92AE",
        "lue": "\u63A0\u7565\u950A",
        "lun": "\u8F6E\u4F26\u4ED1\u6CA6\u7EB6\u8BBA\u56F5",
        "luo": "\u841D\u87BA\u7F57\u903B\u9523\u7BA9\u9AA1\u88F8\u843D\u6D1B\u9A86\u7EDC\u502E\u8366\u645E\u7321\u6CFA\u6924\u8136\u9559\u7630\u96D2",
        "ma": "\u5988\u9EBB\u739B\u7801\u8682\u9A6C\u9A82\u561B\u5417\u551B\u72B8\u5B37\u6769\u9EBD",
        "mai": "\u57CB\u4E70\u9EA6\u5356\u8FC8\u8109\u52A2\u836C\u54AA\u973E",
        "man": "\u7792\u9992\u86EE\u6EE1\u8513\u66FC\u6162\u6F2B\u8C29\u5881\u5E54\u7F26\u71B3\u9558\u989F\u87A8\u9CD7\u9794",
        "mang": "\u8292\u832B\u76F2\u5FD9\u83BD\u9099\u6F2D\u6726\u786D\u87D2",
        "meng": "\u6C13\u840C\u8499\u6AAC\u76DF\u9530\u731B\u68A6\u5B5F\u52D0\u750D\u77A2\u61F5\u791E\u867B\u8722\u8813\u824B\u8268\u9EFE",
        "miao": "\u732B\u82D7\u63CF\u7784\u85D0\u79D2\u6E3A\u5E99\u5999\u55B5\u9088\u7F08\u7F2A\u676A\u6DFC\u7707\u9E4B\u8731",
        "mao": "\u8305\u951A\u6BDB\u77DB\u94C6\u536F\u8302\u5192\u5E3D\u8C8C\u8D38\u4F94\u88A4\u52D6\u8306\u5CC1\u7441\u6634\u7266\u8004\u65C4\u61CB\u7780\u86D1\u8765\u87CA\u9AE6",
        "me": "\u4E48",
        "mei": "\u73AB\u679A\u6885\u9176\u9709\u7164\u6CA1\u7709\u5A92\u9541\u6BCF\u7F8E\u6627\u5BD0\u59B9\u5A9A\u5776\u8393\u5D4B\u7338\u6D7C\u6E44\u6963\u9545\u9E5B\u8882\u9B45",
        "men": "\u95E8\u95F7\u4EEC\u626A\u739F\u7116\u61D1\u9494",
        "mi": "\u772F\u919A\u9761\u7CDC\u8FF7\u8C1C\u5F25\u7C73\u79D8\u89C5\u6CCC\u871C\u5BC6\u5E42\u8288\u5196\u8C27\u863C\u5627\u7315\u736F\u6C68\u5B93\u5F2D\u8112\u6549\u7CF8\u7E3B\u9E8B",
        "mian": "\u68C9\u7720\u7EF5\u5195\u514D\u52C9\u5A29\u7F05\u9762\u6C94\u6E4E\u817C\u7704",
        "mie": "\u8511\u706D\u54A9\u881B\u7BFE",
        "min": "\u6C11\u62BF\u76BF\u654F\u60AF\u95FD\u82E0\u5CB7\u95F5\u6CEF\u73C9",
        "ming": "\u660E\u879F\u9E23\u94ED\u540D\u547D\u51A5\u8317\u6E9F\u669D\u7791\u9169",
        "miu": "\u8C2C",
        "mo": "\u6478\u6479\u8611\u6A21\u819C\u78E8\u6469\u9B54\u62B9\u672B\u83AB\u58A8\u9ED8\u6CAB\u6F20\u5BDE\u964C\u8C1F\u8309\u84E6\u998D\u5AEB\u9546\u79E3\u763C\u8031\u87C6\u8C8A\u8C98",
        "mou": "\u8C0B\u725F\u67D0\u53B6\u54DE\u5A7A\u7738\u936A",
        "mu": "\u62C7\u7261\u4EA9\u59C6\u6BCD\u5893\u66AE\u5E55\u52DF\u6155\u6728\u76EE\u7766\u7267\u7A46\u4EEB\u82DC\u5452\u6C90\u6BEA\u94BC",
        "na": "\u62FF\u54EA\u5450\u94A0\u90A3\u5A1C\u7EB3\u5185\u637A\u80AD\u954E\u8872\u7BAC",
        "nai": "\u6C16\u4E43\u5976\u8010\u5948\u9F10\u827F\u8418\u67F0",
        "nan": "\u5357\u7537\u96BE\u56CA\u5583\u56E1\u6960\u8169\u877B\u8D67",
        "nao": "\u6320\u8111\u607C\u95F9\u5B6C\u57B4\u7331\u7459\u7847\u94D9\u86F2",
        "ne": "\u6DD6\u5462\u8BB7",
        "nei": "\u9981",
        "nen": "\u5AE9\u80FD\u6798\u6041",
        "ni": "\u59AE\u9713\u502A\u6CE5\u5C3C\u62DF\u4F60\u533F\u817B\u9006\u6EBA\u4F32\u576D\u730A\u6029\u6EE0\u6635\u65CE\u7962\u615D\u7768\u94CC\u9CB5",
        "nian": "\u852B\u62C8\u5E74\u78BE\u64B5\u637B\u5FF5\u5EFF\u8F87\u9ECF\u9C87\u9CB6",
        "niang": "\u5A18\u917F",
        "niao": "\u9E1F\u5C3F\u8311\u5B32\u8132\u8885",
        "nie": "\u634F\u8042\u5B7D\u556E\u954A\u954D\u6D85\u4E5C\u9667\u8616\u55EB\u8080\u989E\u81EC\u8E51",
        "nin": "\u60A8\u67E0",
        "ning": "\u72DE\u51DD\u5B81\u62E7\u6CDE\u4F5E\u84E5\u549B\u752F\u804D",
        "niu": "\u725B\u626D\u94AE\u7EBD\u72C3\u5FF8\u599E\u86B4",
        "nong": "\u8113\u6D53\u519C\u4FAC",
        "nu": "\u5974\u52AA\u6012\u5476\u5E11\u5F29\u80EC\u5B65\u9A7D",
        "nv": "\u5973\u6067\u9495\u8844",
        "nuan": "\u6696",
        "nuenue": "\u8650",
        "nue": "\u759F\u8C11",
        "nuo": "\u632A\u61E6\u7CEF\u8BFA\u50A9\u6426\u558F\u9518",
        "ou": "\u54E6\u6B27\u9E25\u6BB4\u85D5\u5455\u5076\u6CA4\u6004\u74EF\u8026",
        "pa": "\u556A\u8DB4\u722C\u5E15\u6015\u7436\u8469\u7B62",
        "pai": "\u62CD\u6392\u724C\u5F98\u6E43\u6D3E\u4FF3\u848E",
        "pan": "\u6500\u6F58\u76D8\u78D0\u76FC\u7554\u5224\u53DB\u723F\u6CEE\u88A2\u897B\u87E0\u8E52",
        "pang": "\u4E53\u5E9E\u65C1\u802A\u80D6\u6EC2\u9004",
        "pao": "\u629B\u5486\u5228\u70AE\u888D\u8DD1\u6CE1\u530F\u72CD\u5E96\u812C\u75B1",
        "pei": "\u5478\u80DA\u57F9\u88F4\u8D54\u966A\u914D\u4F69\u6C9B\u638A\u8F94\u5E14\u6DE0\u65C6\u952B\u9185\u9708",
        "pen": "\u55B7\u76C6\u6E53",
        "peng": "\u7830\u62A8\u70F9\u6F8E\u5F6D\u84EC\u68DA\u787C\u7BF7\u81A8\u670B\u9E4F\u6367\u78B0\u576F\u580B\u562D\u6026\u87DB",
        "pi": "\u7812\u9739\u6279\u62AB\u5288\u7435\u6BD7\u5564\u813E\u75B2\u76AE\u5339\u75DE\u50FB\u5C41\u8B6C\u4E15\u9674\u90B3\u90EB\u572E\u9F19\u64D7\u567C\u5E80\u5AB2\u7EB0\u6787\u7513\u7765\u7F74\u94CD\u75E6\u7656\u758B\u868D\u8C94",
        "pian": "\u7BC7\u504F\u7247\u9A97\u8C1D\u9A88\u728F\u80FC\u890A\u7FE9\u8E41",
        "piao": "\u98D8\u6F02\u74E2\u7968\u527D\u560C\u5AD6\u7F25\u6B8D\u779F\u87B5",
        "pie": "\u6487\u77A5\u4E3F\u82E4\u6C15",
        "pin": "\u62FC\u9891\u8D2B\u54C1\u8058\u62DA\u59D8\u5AD4\u6980\u725D\u98A6",
        "ping": "\u4E52\u576A\u82F9\u840D\u5E73\u51ED\u74F6\u8BC4\u5C4F\u4FDC\u5A09\u67B0\u9C86",
        "po": "\u5761\u6CFC\u9887\u5A46\u7834\u9B44\u8FEB\u7C95\u53F5\u9131\u6EA5\u73C0\u948B\u94B7\u76A4\u7B38",
        "pou": "\u5256\u88D2\u8E23",
        "pu": "\u6251\u94FA\u4EC6\u8386\u8461\u83E9\u84B2\u57D4\u6734\u5703\u666E\u6D66\u8C31\u66DD\u7011\u530D\u5657\u6FEE\u749E\u6C06\u9564\u9568\u8E7C",
        "qi": "\u671F\u6B3A\u6816\u621A\u59BB\u4E03\u51C4\u6F06\u67D2\u6C8F\u5176\u68CB\u5947\u6B67\u7566\u5D0E\u8110\u9F50\u65D7\u7948\u7941\u9A91\u8D77\u5C82\u4E5E\u4F01\u542F\u5951\u780C\u5668\u6C14\u8FC4\u5F03\u6C7D\u6CE3\u8BAB\u4E9F\u4E93\u573B\u8291\u840B\u847A\u5601\u5C7A\u5C90\u6C54\u6DC7\u9A90\u7EEE\u742A\u7426\u675E\u6864\u69ED\u6B39\u797A\u61A9\u789B\u86F4\u871E\u7DA6\u7DAE\u8DBF\u8E4A\u9CCD\u9E92",
        "qia": "\u6390\u6070\u6D3D\u845C",
        "qian": "\u7275\u6266\u948E\u94C5\u5343\u8FC1\u7B7E\u4EDF\u8C26\u4E7E\u9ED4\u94B1\u94B3\u524D\u6F5C\u9063\u6D45\u8C34\u5811\u5D4C\u6B20\u6B49\u4F65\u9621\u828A\u82A1\u8368\u63AE\u5C8D\u60AD\u614A\u9A9E\u6434\u8930\u7F31\u6920\u80B7\u6106\u94A4\u8654\u7B9D",
        "qiang": "\u67AA\u545B\u8154\u7F8C\u5899\u8537\u5F3A\u62A2\u5AF1\u6A2F\u6217\u709D\u9516\u9535\u956A\u8941\u8723\u7F9F\u8DEB\u8DC4",
        "qiao": "\u6A47\u9539\u6572\u6084\u6865\u77A7\u4E54\u4FA8\u5DE7\u9798\u64AC\u7FD8\u5CED\u4FCF\u7A8D\u5281\u8BEE\u8C2F\u835E\u6100\u6194\u7F32\u6A35\u6BF3\u7857\u8DF7\u9792",
        "qie": "\u5207\u8304\u4E14\u602F\u7A83\u90C4\u553C\u60EC\u59BE\u6308\u9532\u7BA7",
        "qin": "\u94A6\u4FB5\u4EB2\u79E6\u7434\u52E4\u82B9\u64D2\u79BD\u5BDD\u6C81\u82A9\u84C1\u8572\u63FF\u5423\u55EA\u5659\u6EB1\u6A8E\u8793\u887E",
        "qing": "\u9752\u8F7B\u6C22\u503E\u537F\u6E05\u64CE\u6674\u6C30\u60C5\u9877\u8BF7\u5E86\u5029\u82D8\u570A\u6AA0\u78EC\u873B\u7F44\u7B90\u8B26\u9CAD\u9EE5",
        "qiong": "\u743C\u7A77\u909B\u8315\u7A79\u7B47\u928E",
        "qiu": "\u79CB\u4E18\u90B1\u7403\u6C42\u56DA\u914B\u6CC5\u4FC5\u6C3D\u5DEF\u827D\u72B0\u6E6B\u9011\u9052\u6978\u8D47\u9E20\u866C\u86AF\u8764\u88D8\u7CD7\u9CC5\u9F3D",
        "qu": "\u8D8B\u533A\u86C6\u66F2\u8EAF\u5C48\u9A71\u6E20\u53D6\u5A36\u9F8B\u8DA3\u53BB\u8BCE\u52AC\u8556\u8627\u5C96\u8862\u9612\u74A9\u89D1\u6C0D\u795B\u78F2\u766F\u86D0\u883C\u9EB4\u77BF\u9EE2",
        "quan": "\u5708\u98A7\u6743\u919B\u6CC9\u5168\u75CA\u62F3\u72AC\u5238\u529D\u8BE0\u8343\u737E\u609B\u7EFB\u8F81\u754E\u94E8\u8737\u7B4C\u9B08",
        "que": "\u7F3A\u7094\u7638\u5374\u9E4A\u69B7\u786E\u96C0\u9619\u60AB",
        "qun": "\u88D9\u7FA4\u9021",
        "ran": "\u7136\u71C3\u5189\u67D3\u82D2\u9AEF",
        "rang": "\u74E4\u58E4\u6518\u56B7\u8BA9\u79B3\u7A70",
        "rao": "\u9976\u6270\u7ED5\u835B\u5A06\u6861",
        "ruo": "\u60F9\u82E5\u5F31",
        "re": "\u70ED\u504C",
        "ren": "\u58EC\u4EC1\u4EBA\u5FCD\u97E7\u4EFB\u8BA4\u5203\u598A\u7EAB\u4EDE\u834F\u845A\u996A\u8F6B\u7A14\u887D",
        "reng": "\u6254\u4ECD",
        "ri": "\u65E5",
        "rong": "\u620E\u8338\u84C9\u8363\u878D\u7194\u6EB6\u5BB9\u7ED2\u5197\u5D58\u72E8\u7F1B\u6995\u877E",
        "rou": "\u63C9\u67D4\u8089\u7CC5\u8E42\u97A3",
        "ru": "\u8339\u8815\u5112\u5B7A\u5982\u8FB1\u4E73\u6C5D\u5165\u8925\u84D0\u85B7\u5685\u6D33\u6EBD\u6FE1\u94F7\u8966\u98A5",
        "ruan": "\u8F6F\u962E\u670A",
        "rui": "\u854A\u745E\u9510\u82AE\u8564\u777F\u868B",
        "run": "\u95F0\u6DA6",
        "sa": "\u6492\u6D12\u8428\u5345\u4EE8\u6332\u98D2",
        "sai": "\u816E\u9CC3\u585E\u8D5B\u567B",
        "san": "\u4E09\u53C1\u4F1E\u6563\u5F61\u9993\u6C35\u6BF5\u7CC1\u9730",
        "sang": "\u6851\u55D3\u4E27\u6421\u78C9\u98A1",
        "sao": "\u6414\u9A9A\u626B\u5AC2\u57FD\u81CA\u7619\u9CCB",
        "se": "\u745F\u8272\u6DA9\u556C\u94E9\u94EF\u7A51",
        "sen": "\u68EE",
        "seng": "\u50E7",
        "sha": "\u838E\u7802\u6740\u5239\u6C99\u7EB1\u50BB\u5565\u715E\u810E\u6B43\u75E7\u88DF\u970E\u9CA8",
        "shai": "\u7B5B\u6652\u917E",
        "shan": "\u73CA\u82EB\u6749\u5C71\u5220\u717D\u886B\u95EA\u9655\u64C5\u8D61\u81B3\u5584\u6C55\u6247\u7F2E\u5261\u8BAA\u912F\u57CF\u829F\u6F78\u59D7\u9A9F\u81BB\u9490\u759D\u87EE\u8222\u8DDA\u9CDD",
        "shang": "\u5892\u4F24\u5546\u8D4F\u664C\u4E0A\u5C1A\u88F3\u57A7\u7EF1\u6B87\u71B5\u89DE",
        "shao": "\u68A2\u634E\u7A0D\u70E7\u828D\u52FA\u97F6\u5C11\u54E8\u90B5\u7ECD\u52AD\u82D5\u6F72\u86F8\u7B24\u7B72\u8244",
        "she": "\u5962\u8D4A\u86C7\u820C\u820D\u8D66\u6444\u5C04\u6151\u6D89\u793E\u8BBE\u538D\u4F58\u731E\u7572\u9E9D",
        "shen": "\u7837\u7533\u547B\u4F38\u8EAB\u6DF1\u5A20\u7EC5\u795E\u6C88\u5BA1\u5A76\u751A\u80BE\u614E\u6E17\u8BDC\u8C02\u5432\u54C2\u6E16\u6939\u77E7\u8703",
        "sheng": "\u58F0\u751F\u7525\u7272\u5347\u7EF3\u7701\u76DB\u5269\u80DC\u5723\u4E1E\u6E11\u5AB5\u771A\u7B19",
        "shi": "\u5E08\u5931\u72EE\u65BD\u6E7F\u8BD7\u5C38\u8671\u5341\u77F3\u62FE\u65F6\u4EC0\u98DF\u8680\u5B9E\u8BC6\u53F2\u77E2\u4F7F\u5C4E\u9A76\u59CB\u5F0F\u793A\u58EB\u4E16\u67FF\u4E8B\u62ED\u8A93\u901D\u52BF\u662F\u55DC\u566C\u9002\u4ED5\u4F8D\u91CA\u9970\u6C0F\u5E02\u6043\u5BA4\u89C6\u8BD5\u8C25\u57D8\u83B3\u84CD\u5F11\u5511\u9963\u8F7C\u8006\u8D33\u70BB\u793B\u94C8\u94CA\u87AB\u8210\u7B6E\u8C55\u9CA5\u9CBA",
        "shou": "\u6536\u624B\u9996\u5B88\u5BFF\u6388\u552E\u53D7\u7626\u517D\u624C\u72E9\u7EF6\u824F",
        "shu": "\u852C\u67A2\u68B3\u6B8A\u6292\u8F93\u53D4\u8212\u6DD1\u758F\u4E66\u8D4E\u5B70\u719F\u85AF\u6691\u66D9\u7F72\u8700\u9ECD\u9F20\u5C5E\u672F\u8FF0\u6811\u675F\u620D\u7AD6\u5885\u5EB6\u6570\u6F31\u6055\u500F\u587E\u83FD\u5FC4\u6CAD\u6D91\u6F8D\u59DD\u7EBE\u6BF9\u8167\u6BB3\u956F\u79EB\u9E6C",
        "shua": "\u5237\u800D\u5530\u6DAE",
        "shuai": "\u6454\u8870\u7529\u5E05\u87C0",
        "shuan": "\u6813\u62F4\u95E9",
        "shuang": "\u971C\u53CC\u723D\u5B40",
        "shui": "\u8C01\u6C34\u7761\u7A0E",
        "shun": "\u542E\u77AC\u987A\u821C\u6042",
        "shuo": "\u8BF4\u7855\u6714\u70C1\u84B4\u6420\u55CD\u6FEF\u5981\u69CA\u94C4",
        "si": "\u65AF\u6495\u5636\u601D\u79C1\u53F8\u4E1D\u6B7B\u8086\u5BFA\u55E3\u56DB\u4F3A\u4F3C\u9972\u5DF3\u53AE\u4FDF\u5155\u83E5\u549D\u6C5C\u6CD7\u6F8C\u59D2\u9A77\u7F0C\u7940\u7960\u9536\u9E36\u801C\u86F3\u7B25",
        "song": "\u677E\u8038\u6002\u9882\u9001\u5B8B\u8BBC\u8BF5\u51C7\u83D8\u5D27\u5D69\u5FEA\u609A\u6DDE\u7AE6",
        "sou": "\u641C\u8258\u64DE\u55FD\u53DF\u55D6\u55FE\u998A\u6EB2\u98D5\u778D\u953C\u878B",
        "su": "\u82CF\u9165\u4FD7\u7D20\u901F\u7C9F\u50F3\u5851\u6EAF\u5BBF\u8BC9\u8083\u5919\u8C21\u850C\u55C9\u612B\u7C0C\u89EB\u7A23",
        "suan": "\u9178\u849C\u7B97",
        "sui": "\u867D\u968B\u968F\u7EE5\u9AD3\u788E\u5C81\u7A57\u9042\u96A7\u795F\u84D1\u51AB\u8C07\u6FC9\u9083\u71E7\u772D\u7762",
        "sun": "\u5B59\u635F\u7B0B\u836A\u72F2\u98E7\u69AB\u8DE3\u96BC",
        "suo": "\u68AD\u5506\u7F29\u7410\u7D22\u9501\u6240\u5522\u55E6\u5A11\u686B\u7743\u7FA7",
        "ta": "\u584C\u4ED6\u5B83\u5979\u5854\u736D\u631E\u8E4B\u8E0F\u95FC\u6EBB\u9062\u69BB\u6C93",
        "tai": "\u80CE\u82D4\u62AC\u53F0\u6CF0\u915E\u592A\u6001\u6C70\u90B0\u85B9\u80BD\u70B1\u949B\u8DC6\u9C90",
        "tan": "\u574D\u644A\u8D2A\u762B\u6EE9\u575B\u6A80\u75F0\u6F6D\u8C2D\u8C08\u5766\u6BEF\u8892\u78B3\u63A2\u53F9\u70AD\u90EF\u8548\u6619\u94BD\u952C\u8983",
        "tang": "\u6C64\u5858\u642A\u5802\u68E0\u819B\u5510\u7CD6\u50A5\u9967\u6E8F\u746D\u94F4\u9557\u8025\u8797\u87B3\u7FB0\u91A3",
        "thang": "\u5018\u8EBA\u6DCC",
        "theng": "\u8D9F\u70EB",
        "tao": "\u638F\u6D9B\u6ED4\u7EE6\u8404\u6843\u9003\u6DD8\u9676\u8BA8\u5957\u6311\u9F17\u5555\u97EC\u9955",
        "te": "\u7279",
        "teng": "\u85E4\u817E\u75BC\u8A8A\u6ED5",
        "ti": "\u68AF\u5254\u8E22\u9511\u63D0\u9898\u8E44\u557C\u4F53\u66FF\u568F\u60D5\u6D95\u5243\u5C49\u8351\u608C\u9016\u7EE8\u7F07\u9E48\u88FC\u918D",
        "tian": "\u5929\u6DFB\u586B\u7530\u751C\u606C\u8214\u8146\u63AD\u5FDD\u9617\u6B84\u754B\u94BF\u86BA",
        "tiao": "\u6761\u8FE2\u773A\u8DF3\u4F7B\u7967\u94EB\u7A95\u9F86\u9CA6",
        "tie": "\u8D34\u94C1\u5E16\u841C\u992E",
        "ting": "\u5385\u542C\u70C3\u6C40\u5EF7\u505C\u4EAD\u5EAD\u633A\u8247\u839B\u8476\u5A77\u6883\u8713\u9706",
        "tong": "\u901A\u6850\u916E\u77B3\u540C\u94DC\u5F64\u7AE5\u6876\u6345\u7B52\u7EDF\u75DB\u4F5F\u50EE\u4EDD\u833C\u55F5\u6078\u6F7C\u783C",
        "tou": "\u5077\u6295\u5934\u900F\u4EA0",
        "tu": "\u51F8\u79C3\u7A81\u56FE\u5F92\u9014\u6D82\u5C60\u571F\u5410\u5154\u580D\u837C\u83DF\u948D\u9174",
        "tuan": "\u6E4D\u56E2\u7583",
        "tui": "\u63A8\u9893\u817F\u8715\u892A\u9000\u5FD2\u717A",
        "tun": "\u541E\u5C6F\u81C0\u9968\u66BE\u8C5A\u7A80",
        "tuo": "\u62D6\u6258\u8131\u9E35\u9640\u9A6E\u9A7C\u692D\u59A5\u62D3\u553E\u4E47\u4F57\u5768\u5EB9\u6CB1\u67DD\u7823\u7BA8\u8204\u8DCE\u9F0D",
        "wa": "\u6316\u54C7\u86D9\u6D3C\u5A03\u74E6\u889C\u4F64\u5A32\u817D",
        "wai": "\u6B6A\u5916",
        "wan": "\u8C4C\u5F2F\u6E7E\u73A9\u987D\u4E38\u70F7\u5B8C\u7897\u633D\u665A\u7696\u60CB\u5B9B\u5A49\u4E07\u8155\u525C\u8284\u82CB\u83C0\u7EA8\u7EFE\u742C\u8118\u7579\u873F\u7BA2",
        "wang": "\u6C6A\u738B\u4EA1\u6789\u7F51\u5F80\u65FA\u671B\u5FD8\u5984\u7F54\u5C22\u60D8\u8F8B\u9B4D",
        "wei": "\u5A01\u5DCD\u5FAE\u5371\u97E6\u8FDD\u6845\u56F4\u552F\u60DF\u4E3A\u6F4D\u7EF4\u82C7\u840E\u59D4\u4F1F\u4F2A\u5C3E\u7EAC\u672A\u851A\u5473\u754F\u80C3\u5582\u9B4F\u4F4D\u6E2D\u8C13\u5C09\u6170\u536B\u502D\u504E\u8BFF\u9688\u8473\u8587\u5E0F\u5E37\u5D34\u5D6C\u7325\u732C\u95F1\u6CA9\u6D27\u6DA0\u9036\u5A13\u73AE\u97EA\u8ECE\u709C\u7168\u71A8\u75FF\u8249\u9C94",
        "wen": "\u761F\u6E29\u868A\u6587\u95FB\u7EB9\u543B\u7A33\u7D0A\u95EE\u520E\u6120\u960C\u6C76\u74BA\u97EB\u6B81\u96EF",
        "weng": "\u55E1\u7FC1\u74EE\u84CA\u8579",
        "wo": "\u631D\u8717\u6DA1\u7A9D\u6211\u65A1\u5367\u63E1\u6C83\u83B4\u5E44\u6E25\u674C\u809F\u9F8C",
        "wu": "\u5DEB\u545C\u94A8\u4E4C\u6C61\u8BEC\u5C4B\u65E0\u829C\u68A7\u543E\u5434\u6BCB\u6B66\u4E94\u6342\u5348\u821E\u4F0D\u4FAE\u575E\u620A\u96FE\u6664\u7269\u52FF\u52A1\u609F\u8BEF\u5140\u4EF5\u9622\u90AC\u572C\u82B4\u5E91\u6003\u5FE4\u6D6F\u5BE4\u8FD5\u59A9\u9A9B\u727E\u7110\u9E49\u9E5C\u8708\u92C8\u9F2F",
        "xi": "\u6614\u7199\u6790\u897F\u7852\u77FD\u6670\u563B\u5438\u9521\u727A\u7A00\u606F\u5E0C\u6089\u819D\u5915\u60DC\u7184\u70EF\u6EAA\u6C50\u7280\u6A84\u88AD\u5E2D\u4E60\u5AB3\u559C\u94E3\u6D17\u7CFB\u9699\u620F\u7EC6\u50D6\u516E\u96B0\u90D7\u831C\u8478\u84F0\u595A\u550F\u5F99\u9969\u960B\u6D60\u6DC5\u5C63\u5B09\u73BA\u6A28\u66E6\u89CB\u6B37\u71B9\u798A\u79A7\u94B8\u7699\u7A78\u8725\u87CB\u823E\u7FB2\u7C9E\u7FD5\u91AF\u9F37",
        "xia": "\u778E\u867E\u5323\u971E\u8F96\u6687\u5CE1\u4FA0\u72ED\u4E0B\u53A6\u590F\u5413\u6380\u846D\u55C4\u72CE\u9050\u7455\u7856\u7615\u7F45\u9EE0",
        "xian": "\u9528\u5148\u4ED9\u9C9C\u7EA4\u54B8\u8D24\u8854\u8237\u95F2\u6D8E\u5F26\u5ACC\u663E\u9669\u73B0\u732E\u53BF\u817A\u9985\u7FA1\u5BAA\u9677\u9650\u7EBF\u51BC\u85D3\u5C98\u7303\u66B9\u5A34\u6C19\u7946\u9E47\u75EB\u86AC\u7B45\u7C7C\u9170\u8DF9",
        "xiang": "\u76F8\u53A2\u9576\u9999\u7BB1\u8944\u6E58\u4E61\u7FD4\u7965\u8BE6\u60F3\u54CD\u4EAB\u9879\u5DF7\u6A61\u50CF\u5411\u8C61\u8297\u8459\u9977\u5EA0\u9AA7\u7F03\u87D3\u9C9E\u98E8",
        "xiao": "\u8427\u785D\u9704\u524A\u54EE\u56A3\u9500\u6D88\u5BB5\u6DC6\u6653\u5C0F\u5B5D\u6821\u8096\u5578\u7B11\u6548\u54D3\u54BB\u5D24\u6F47\u900D\u9A81\u7EE1\u67AD\u67B5\u7B71\u7BAB\u9B48",
        "xie": "\u6954\u4E9B\u6B47\u874E\u978B\u534F\u631F\u643A\u90AA\u659C\u80C1\u8C10\u5199\u68B0\u5378\u87F9\u61C8\u6CC4\u6CFB\u8C22\u5C51\u5055\u4EB5\u52F0\u71EE\u85A4\u64B7\u5EE8\u7023\u9082\u7EC1\u7F2C\u69AD\u698D\u6B59\u8E9E",
        "xin": "\u85AA\u82AF\u950C\u6B23\u8F9B\u65B0\u5FFB\u5FC3\u4FE1\u8845\u56DF\u99A8\u8398\u6B46\u94FD\u946B",
        "xing": "\u661F\u8165\u7329\u60FA\u5174\u5211\u578B\u5F62\u90A2\u884C\u9192\u5E78\u674F\u6027\u59D3\u9649\u8347\u8365\u64E4\u60BB\u784E",
        "xiong": "\u5144\u51F6\u80F8\u5308\u6C79\u96C4\u718A\u828E",
        "xiu": "\u4F11\u4FEE\u7F9E\u673D\u55C5\u9508\u79C0\u8896\u7EE3\u83A0\u5CAB\u9990\u5EA5\u9E3A\u8C85\u9AF9",
        "xu": "\u589F\u620C\u9700\u865A\u5618\u987B\u5F90\u8BB8\u84C4\u9157\u53D9\u65ED\u5E8F\u755C\u6064\u7D6E\u5A7F\u7EEA\u7EED\u8BB4\u8BE9\u5729\u84FF\u6035\u6D2B\u6E86\u987C\u6829\u7166\u7809\u76F1\u80E5\u7CC8\u9191",
        "xuan": "\u8F69\u55A7\u5BA3\u60AC\u65CB\u7384\u9009\u7663\u7729\u7EDA\u5107\u8C16\u8431\u63CE\u9994\u6CEB\u6D35\u6E32\u6F29\u7487\u6966\u6684\u70AB\u714A\u78B9\u94C9\u955F\u75C3",
        "xue": "\u9774\u859B\u5B66\u7A74\u96EA\u8840\u5671\u6CF6\u9CD5",
        "xun": "\u52CB\u718F\u5FAA\u65EC\u8BE2\u5BFB\u9A6F\u5DE1\u6B89\u6C5B\u8BAD\u8BAF\u900A\u8FC5\u5DFD\u57D9\u8340\u85B0\u5CCB\u5F87\u6D54\u66DB\u7AA8\u91BA\u9C9F",
        "ya": "\u538B\u62BC\u9E26\u9E2D\u5440\u4E2B\u82BD\u7259\u869C\u5D16\u8859\u6DAF\u96C5\u54D1\u4E9A\u8BB6\u4F22\u63E0\u5416\u5C88\u8FD3\u5A05\u740A\u6860\u6C29\u7811\u775A\u75D6",
        "yan": "\u7109\u54BD\u9609\u70DF\u6DF9\u76D0\u4E25\u7814\u8712\u5CA9\u5EF6\u8A00\u989C\u960E\u708E\u6CBF\u5944\u63A9\u773C\u884D\u6F14\u8273\u5830\u71D5\u538C\u781A\u96C1\u5501\u5F66\u7130\u5BB4\u8C1A\u9A8C\u53A3\u9765\u8D5D\u4FE8\u5043\u5156\u8BA0\u8C33\u90FE\u9122\u82AB\u83F8\u5D26\u6079\u95EB\u960F\u6D07\u6E6E\u6EDF\u598D\u5AE3\u7430\u664F\u80ED\u814C\u7131\u7F68\u7B75\u917D\u9B47\u990D\u9F39",
        "yang": "\u6B83\u592E\u9E2F\u79E7\u6768\u626C\u4F6F\u75A1\u7F8A\u6D0B\u9633\u6C27\u4EF0\u75D2\u517B\u6837\u6F3E\u5F89\u600F\u6CF1\u7080\u70CA\u6059\u86D8\u9785",
        "yao": "\u9080\u8170\u5996\u7476\u6447\u5C27\u9065\u7A91\u8C23\u59DA\u54AC\u8200\u836F\u8981\u8000\u592D\u723B\u5406\u5D3E\u5FAD\u7039\u5E7A\u73E7\u6773\u66DC\u80B4\u9E5E\u7A88\u7E47\u9CD0",
        "ye": "\u6930\u564E\u8036\u7237\u91CE\u51B6\u4E5F\u9875\u6396\u4E1A\u53F6\u66F3\u814B\u591C\u6DB2\u8C12\u90BA\u63F6\u9980\u6654\u70E8\u94D8",
        "yi": "\u4E00\u58F9\u533B\u63D6\u94F1\u4F9D\u4F0A\u8863\u9890\u5937\u9057\u79FB\u4EEA\u80F0\u7591\u6C82\u5B9C\u59E8\u5F5D\u6905\u8681\u501A\u5DF2\u4E59\u77E3\u4EE5\u827A\u6291\u6613\u9091\u5C79\u4EBF\u5F79\u81C6\u9038\u8084\u75AB\u4EA6\u88D4\u610F\u6BC5\u5FC6\u4E49\u76CA\u6EA2\u8BE3\u8BAE\u8C0A\u8BD1\u5F02\u7FFC\u7FCC\u7ECE\u5208\u5293\u4F7E\u8BD2\u572A\u572F\u57F8\u61FF\u82E1\u858F\u5F08\u5955\u6339\u5F0B\u5453\u54A6\u54BF\u566B\u5CC4\u5DB7\u7317\u9974\u603F\u6021\u6092\u6F2A\u8FE4\u9A7F\u7F22\u6BAA\u8D3B\u65D6\u71A0\u9487\u9552\u9571\u75CD\u7617\u7654\u7FCA\u8864\u8734\u8223\u7FBF\u7FF3\u914F\u9EDF",
        "yin": "\u8335\u836B\u56E0\u6BB7\u97F3\u9634\u59FB\u541F\u94F6\u6DEB\u5BC5\u996E\u5C39\u5F15\u9690\u5370\u80E4\u911E\u5819\u831A\u5591\u72FA\u5924\u6C24\u94DF\u763E\u8693\u972A\u9F88",
        "ying": "\u82F1\u6A31\u5A74\u9E70\u5E94\u7F28\u83B9\u8424\u8425\u8367\u8747\u8FCE\u8D62\u76C8\u5F71\u9896\u786C\u6620\u5B34\u90E2\u8314\u83BA\u8426\u6484\u5624\u81BA\u6EE2\u6F46\u701B\u745B\u748E\u6979\u9E66\u763F\u988D\u7F42",
        "yo": "\u54DF\u5537",
        "yong": "\u62E5\u4F63\u81C3\u75C8\u5EB8\u96CD\u8E0A\u86F9\u548F\u6CF3\u6D8C\u6C38\u607F\u52C7\u7528\u4FD1\u58C5\u5889\u6175\u9095\u955B\u752C\u9CD9\u9954",
        "you": "\u5E7D\u4F18\u60A0\u5FE7\u5C24\u7531\u90AE\u94C0\u72B9\u6CB9\u6E38\u9149\u6709\u53CB\u53F3\u4F51\u91C9\u8BF1\u53C8\u5E7C\u5363\u6538\u4F91\u83B8\u5466\u56FF\u5BA5\u67DA\u7337\u7256\u94D5\u75A3\u8763\u9C7F\u9EDD\u9F2C",
        "yu": "\u8FC2\u6DE4\u4E8E\u76C2\u6986\u865E\u611A\u8206\u4F59\u4FDE\u903E\u9C7C\u6109\u6E1D\u6E14\u9685\u4E88\u5A31\u96E8\u4E0E\u5C7F\u79B9\u5B87\u8BED\u7FBD\u7389\u57DF\u828B\u90C1\u5401\u9047\u55BB\u5CEA\u5FA1\u6108\u6B32\u72F1\u80B2\u8A89\u6D74\u5BD3\u88D5\u9884\u8C6B\u9A6D\u79BA\u6BD3\u4F1B\u4FE3\u8C00\u8C15\u8438\u84E3\u63C4\u5581\u5704\u5709\u5D5B\u72F3\u996B\u5EBE\u9608\u59AA\u59A4\u7EA1\u745C\u6631\u89CE\u8174\u6B24\u65BC\u715C\u71E0\u807F\u94B0\u9E46\u7610\u7600\u7AB3\u8753\u7AFD\u8201\u96E9\u9F89",
        "yuan": "\u9E33\u6E0A\u51A4\u5143\u57A3\u8881\u539F\u63F4\u8F95\u56ED\u5458\u5706\u733F\u6E90\u7F18\u8FDC\u82D1\u613F\u6028\u9662\u586C\u6C85\u5A9B\u7457\u6A7C\u7230\u7722\u9E22\u8788\u9F0B",
        "yue": "\u66F0\u7EA6\u8D8A\u8DC3\u94A5\u5CB3\u7CA4\u6708\u60A6\u9605\u9FA0\u6A3E\u5216\u94BA",
        "yun": "\u8018\u4E91\u90E7\u5300\u9668\u5141\u8FD0\u8574\u915D\u6655\u97F5\u5B55\u90D3\u82B8\u72C1\u607D\u7EAD\u6B92\u6600\u6C32",
        "za": "\u531D\u7838\u6742\u62F6\u5482",
        "zai": "\u683D\u54C9\u707E\u5BB0\u8F7D\u518D\u5728\u54B1\u5D3D\u753E",
        "zan": "\u6512\u6682\u8D5E\u74D2\u661D\u7C2A\u7CCC\u8DB1\u933E",
        "zang": "\u8D43\u810F\u846C\u5958\u6215\u81E7",
        "zao": "\u906D\u7CDF\u51FF\u85FB\u67A3\u65E9\u6FA1\u86A4\u8E81\u566A\u9020\u7682\u7076\u71E5\u5523\u7F2B",
        "ze": "\u8D23\u62E9\u5219\u6CFD\u4EC4\u8D5C\u5567\u8FEE\u6603\u7B2E\u7BA6\u8234",
        "zei": "\u8D3C",
        "zen": "\u600E\u8C2E",
        "zeng": "\u589E\u618E\u66FE\u8D60\u7F2F\u7511\u7F7E\u9503",
        "zha": "\u624E\u55B3\u6E23\u672D\u8F67\u94E1\u95F8\u7728\u6805\u69A8\u548B\u4E4D\u70B8\u8BC8\u63F8\u5412\u54A4\u54F3\u600D\u781F\u75C4\u86B1\u9F44",
        "zhai": "\u6458\u658B\u5B85\u7A84\u503A\u5BE8\u7826",
        "zhan": "\u77BB\u6BE1\u8A79\u7C98\u6CBE\u76CF\u65A9\u8F97\u5D2D\u5C55\u8638\u6808\u5360\u6218\u7AD9\u6E5B\u7EFD\u8C35\u640C\u65C3",
        "zhang": "\u6A1F\u7AE0\u5F70\u6F33\u5F20\u638C\u6DA8\u6756\u4E08\u5E10\u8D26\u4ED7\u80C0\u7634\u969C\u4EC9\u9123\u5E5B\u5D82\u7350\u5ADC\u748B\u87D1",
        "zhao": "\u62DB\u662D\u627E\u6CBC\u8D75\u7167\u7F69\u5146\u8087\u53EC\u722A\u8BCF\u68F9\u948A\u7B0A",
        "zhe": "\u906E\u6298\u54F2\u86F0\u8F99\u8005\u9517\u8517\u8FD9\u6D59\u8C2A\u966C\u67D8\u8F84\u78D4\u9E67\u891A\u8707\u8D6D",
        "zhen": "\u73CD\u659F\u771F\u7504\u7827\u81FB\u8D1E\u9488\u4FA6\u6795\u75B9\u8BCA\u9707\u632F\u9547\u9635\u7F1C\u6862\u699B\u8F78\u8D48\u80D7\u6715\u796F\u755B\u9E29",
        "zheng": "\u84B8\u6323\u7741\u5F81\u72F0\u4E89\u6014\u6574\u62EF\u6B63\u653F\u5E27\u75C7\u90D1\u8BC1\u8BE4\u5CE5\u94B2\u94EE\u7B5D",
        "zhi": "\u829D\u679D\u652F\u5431\u8718\u77E5\u80A2\u8102\u6C41\u4E4B\u7EC7\u804C\u76F4\u690D\u6B96\u6267\u503C\u4F84\u5740\u6307\u6B62\u8DBE\u53EA\u65E8\u7EB8\u5FD7\u631A\u63B7\u81F3\u81F4\u7F6E\u5E1C\u5CD9\u5236\u667A\u79E9\u7A1A\u8D28\u7099\u75D4\u6EDE\u6CBB\u7A92\u536E\u965F\u90C5\u57F4\u82B7\u646D\u5E19\u5FEE\u5F58\u54AB\u9A98\u6809\u67B3\u6800\u684E\u8F75\u8F7E\u6534\u8D3D\u81A3\u7949\u7957\u9EF9\u96C9\u9E37\u75E3\u86ED\u7D77\u916F\u8DD6\u8E2C\u8E2F\u8C78\u89EF",
        "zhong": "\u4E2D\u76C5\u5FE0\u949F\u8877\u7EC8\u79CD\u80BF\u91CD\u4EF2\u4F17\u51A2\u953A\u87BD\u8202\u822F\u8E35",
        "zhou": "\u821F\u5468\u5DDE\u6D32\u8BCC\u7CA5\u8F74\u8098\u5E1A\u5492\u76B1\u5B99\u663C\u9AA4\u5544\u7740\u501C\u8BF9\u836E\u9B3B\u7EA3\u80C4\u78A1\u7C40\u8233\u914E\u9CB7",
        "zhu": "\u73E0\u682A\u86DB\u6731\u732A\u8BF8\u8BDB\u9010\u7AF9\u70DB\u716E\u62C4\u77A9\u5631\u4E3B\u8457\u67F1\u52A9\u86C0\u8D2E\u94F8\u7B51\u4F4F\u6CE8\u795D\u9A7B\u4F2B\u4F8F\u90BE\u82CE\u8331\u6D19\u6E1A\u6F74\u9A7A\u677C\u69E0\u6A65\u70B7\u94E2\u75B0\u7603\u86B0\u7AFA\u7BB8\u7FE5\u8E85\u9E88",
        "zhua": "\u6293",
        "zhuai": "\u62FD",
        "zhuan": "\u4E13\u7816\u8F6C\u64B0\u8D5A\u7BC6\u629F\u556D\u989B",
        "zhuang": "\u6869\u5E84\u88C5\u5986\u649E\u58EE\u72B6\u4E2C",
        "zhui": "\u690E\u9525\u8FFD\u8D58\u5760\u7F00\u8411\u9A93\u7F12",
        "zhun": "\u8C06\u51C6",
        "zhuo": "\u6349\u62D9\u5353\u684C\u7422\u8301\u914C\u707C\u6D4A\u502C\u8BFC\u5EF4\u855E\u64E2\u555C\u6D5E\u6DBF\u6753\u712F\u799A\u65AB",
        "zi": "\u5179\u54A8\u8D44\u59FF\u6ECB\u6DC4\u5B5C\u7D2B\u4ED4\u7C7D\u6ED3\u5B50\u81EA\u6E0D\u5B57\u8C18\u5D6B\u59CA\u5B73\u7F01\u6893\u8F8E\u8D40\u6063\u7726\u9531\u79ED\u8014\u7B2B\u7CA2\u89DC\u8A3E\u9CBB\u9AED",
        "zong": "\u9B03\u68D5\u8E2A\u5B97\u7EFC\u603B\u7EB5\u8159\u7CBD",
        "zou": "\u90B9\u8D70\u594F\u63CD\u9139\u9CB0",
        "zu": "\u79DF\u8DB3\u5352\u65CF\u7956\u8BC5\u963B\u7EC4\u4FCE\u83F9\u5550\u5F82\u9A75\u8E74",
        "zuan": "\u94BB\u7E82\u6525\u7F35",
        "zui": "\u5634\u9189\u6700\u7F6A",
        "zun": "\u5C0A\u9075\u6499\u6A3D\u9CDF",
        "zuo": "\u6628\u5DE6\u4F50\u67DE\u505A\u4F5C\u5750\u5EA7\u961D\u963C\u80D9\u795A\u9162",
        "cou": "\u85AE\u6971\u8F8F\u8160",
        "nang": "\u652E\u54DD\u56D4\u9995\u66E9",
        "o": "\u5594",
        "dia": "\u55F2",
        "chuai": "\u562C\u81AA\u8E39",
        "cen": "\u5C91\u6D94",
        "diu": "\u94E5",
        "nou": "\u8028",
        "fou": "\u7F36",
        "bia": "\u9ADF" };

      this.polyphone = {
        "19969": "DZ",
        "19975": "WM",
        "19988": "QJ",
        "20048": "YL",
        "20056": "SC",
        "20060": "NM",
        "20094": "QG",
        "20127": "QJ",
        "20167": "QC",
        "20193": "YG",
        "20250": "KH",
        "20256": "ZC",
        "20282": "SC",
        "20285": "QJG",
        "20291": "TD",
        "20314": "YD",
        "20340": "NE",
        "20375": "TD",
        "20389": "YJ",
        "20391": "CZ",
        "20415": "PB",
        "20446": "YS",
        "20447": "SQ",
        "20504": "TC",
        "20608": "KG",
        "20854": "QJ",
        "20857": "ZC",
        "20911": "PF",
        "20985": "AW",
        "21032": "PB",
        "21048": "XQ",
        "21049": "SC",
        "21089": "YS",
        "21119": "JC",
        "21242": "SB",
        "21273": "SC",
        "21305": "YP",
        "21306": "QO",
        "21330": "ZC",
        "21333": "SDC",
        "21345": "QK",
        "21378": "CA",
        "21397": "SC",
        "21414": "XS",
        "21442": "SC",
        "21477": "JG",
        "21480": "TD",
        "21484": "ZS",
        "21494": "YX",
        "21505": "YX",
        "21512": "HG",
        "21523": "XH",
        "21537": "PB",
        "21542": "PF",
        "21549": "KH",
        "21571": "E",
        "21574": "DA",
        "21588": "TD",
        "21589": "O",
        "21618": "ZC",
        "21621": "KHA",
        "21632": "ZJ",
        "21654": "KG",
        "21679": "LKG",
        "21683": "KH",
        "21710": "A",
        "21719": "YH",
        "21734": "WOE",
        "21769": "A",
        "21780": "WN",
        "21804": "XH",
        "21834": "A",
        "21899": "ZD",
        "21903": "RN",
        "21908": "WO",
        "21939": "ZC",
        "21956": "SA",
        "21964": "YA",
        "21970": "TD",
        "22003": "A",
        "22031": "JG",
        "22040": "XS",
        "22060": "ZC",
        "22066": "ZC",
        "22079": "MH",
        "22129": "XJ",
        "22179": "XA",
        "22237": "NJ",
        "22244": "TD",
        "22280": "JQ",
        "22300": "YH",
        "22313": "XW",
        "22331": "YQ",
        "22343": "YJ",
        "22351": "PH",
        "22395": "DC",
        "22412": "TD",
        "22484": "PB",
        "22500": "PB",
        "22534": "ZD",
        "22549": "DH",
        "22561": "PB",
        "22612": "TD",
        "22771": "KQ",
        "22831": "HB",
        "22841": "JG",
        "22855": "QJ",
        "22865": "XQ",
        "23013": "ML",
        "23081": "WM",
        "23487": "SX",
        "23558": "QJ",
        "23561": "YW",
        "23586": "YW",
        "23614": "YW",
        "23615": "SN",
        "23631": "PB",
        "23646": "ZS",
        "23663": "ZT",
        "23673": "YG",
        "23762": "TD",
        "23769": "ZS",
        "23780": "QJ",
        "23884": "QK",
        "24055": "XH",
        "24113": "DC",
        "24162": "ZC",
        "24191": "GA",
        "24273": "QJ",
        "24324": "NL",
        "24377": "TD",
        "24378": "QJ",
        "24439": "PF",
        "24554": "ZS",
        "24683": "TD",
        "24694": "WE",
        "24733": "LK",
        "24925": "TN",
        "25094": "ZG",
        "25100": "XQ",
        "25103": "XH",
        "25153": "PB",
        "25170": "PB",
        "25179": "KG",
        "25203": "PB",
        "25240": "ZS",
        "25282": "FB",
        "25303": "NA",
        "25324": "KG",
        "25341": "ZY",
        "25373": "WZ",
        "25375": "XJ",
        "25384": "A",
        "25457": "A",
        "25528": "SD",
        "25530": "SC",
        "25552": "TD",
        "25774": "ZC",
        "25874": "ZC",
        "26044": "YW",
        "26080": "WM",
        "26292": "PB",
        "26333": "PB",
        "26355": "ZY",
        "26366": "CZ",
        "26397": "ZC",
        "26399": "QJ",
        "26415": "ZS",
        "26451": "SB",
        "26526": "ZC",
        "26552": "JG",
        "26561": "TD",
        "26588": "JG",
        "26597": "CZ",
        "26629": "ZS",
        "26638": "YL",
        "26646": "XQ",
        "26653": "KG",
        "26657": "XJ",
        "26727": "HG",
        "26894": "ZC",
        "26937": "ZS",
        "26946": "ZC",
        "26999": "KJ",
        "27099": "KJ",
        "27449": "YQ",
        "27481": "XS",
        "27542": "ZS",
        "27663": "ZS",
        "27748": "TS",
        "27784": "SC",
        "27788": "ZD",
        "27795": "TD",
        "27812": "O",
        "27850": "PB",
        "27852": "MB",
        "27895": "SL",
        "27898": "PL",
        "27973": "QJ",
        "27981": "KH",
        "27986": "HX",
        "27994": "XJ",
        "28044": "YC",
        "28065": "WG",
        "28177": "SM",
        "28267": "QJ",
        "28291": "KH",
        "28337": "ZQ",
        "28463": "TL",
        "28548": "DC",
        "28601": "TD",
        "28689": "PB",
        "28805": "JG",
        "28820": "QG",
        "28846": "PB",
        "28952": "TD",
        "28975": "ZC",
        "29100": "A",
        "29325": "QJ",
        "29575": "SL",
        "29602": "FB",
        "30010": "TD",
        "30044": "CX",
        "30058": "PF",
        "30091": "YSP",
        "30111": "YN",
        "30229": "XJ",
        "30427": "SC",
        "30465": "SX",
        "30631": "YQ",
        "30655": "QJ",
        "30684": "QJG",
        "30707": "SD",
        "30729": "XH",
        "30796": "LG",
        "30917": "PB",
        "31074": "NM",
        "31085": "JZ",
        "31109": "SC",
        "31181": "ZC",
        "31192": "MLB",
        "31293": "JQ",
        "31400": "YX",
        "31584": "YJ",
        "31896": "ZN",
        "31909": "ZY",
        "31995": "XJ",
        "32321": "PF",
        "32327": "ZY",
        "32418": "HG",
        "32420": "XQ",
        "32421": "HG",
        "32438": "LG",
        "32473": "GJ",
        "32488": "TD",
        "32521": "QJ",
        "32527": "PB",
        "32562": "ZSQ",
        "32564": "JZ",
        "32735": "ZD",
        "32793": "PB",
        "33071": "PF",
        "33098": "XL",
        "33100": "YA",
        "33152": "PB",
        "33261": "CX",
        "33324": "BP",
        "33333": "TD",
        "33406": "YA",
        "33426": "WM",
        "33432": "PB",
        "33445": "JG",
        "33486": "ZN",
        "33493": "TS",
        "33507": "QJ",
        "33540": "QJ",
        "33544": "ZC",
        "33564": "XQ",
        "33617": "YT",
        "33632": "QJ",
        "33636": "XH",
        "33637": "YX",
        "33694": "WG",
        "33705": "PF",
        "33728": "YW",
        "33882": "SR",
        "34067": "WM",
        "34074": "YW",
        "34121": "QJ",
        "34255": "ZC",
        "34259": "XL",
        "34425": "JH",
        "34430": "XH",
        "34485": "KH",
        "34503": "YS",
        "34532": "HG",
        "34552": "XS",
        "34558": "YE",
        "34593": "ZL",
        "34660": "YQ",
        "34892": "XH",
        "34928": "SC",
        "34999": "QJ",
        "35048": "PB",
        "35059": "SC",
        "35098": "ZC",
        "35203": "TQ",
        "35265": "JX",
        "35299": "JX",
        "35782": "SZ",
        "35828": "YS",
        "35830": "E",
        "35843": "TD",
        "35895": "YG",
        "35977": "MH",
        "36158": "JG",
        "36228": "QJ",
        "36426": "XQ",
        "36466": "DC",
        "36710": "JC",
        "36711": "ZYG",
        "36767": "PB",
        "36866": "SK",
        "36951": "YW",
        "37034": "YX",
        "37063": "XH",
        "37218": "ZC",
        "37325": "ZC",
        "38063": "PB",
        "38079": "TD",
        "38085": "QY",
        "38107": "DC",
        "38116": "TD",
        "38123": "YD",
        "38224": "HG",
        "38241": "XTC",
        "38271": "ZC",
        "38415": "YE",
        "38426": "KH",
        "38461": "YD",
        "38463": "AE",
        "38466": "PB",
        "38477": "XJ",
        "38518": "YT",
        "38551": "WK",
        "38585": "ZC",
        "38704": "XS",
        "38739": "LJ",
        "38761": "GJ",
        "38808": "SQ",
        "39048": "JG",
        "39049": "XJ",
        "39052": "HG",
        "39076": "CZ",
        "39271": "XT",
        "39534": "TD",
        "39552": "TD",
        "39584": "PB",
        "39647": "SB",
        "39730": "LG",
        "39748": "TPB",
        "40109": "ZQ",
        "40479": "ND",
        "40516": "HG",
        "40536": "HG",
        "40583": "QJ",
        "40765": "YQ",
        "40784": "QJ",
        "40840": "YK",
        "40863": "QJG" };

    }

    /**
       * 获取拼音首字母
       * @param {String} str 输入的中文字符串
       */ }, { key: "getCamelChars", value: function getCamelChars(
    str) {
      if (typeof str != "string")
      throw new Error(-1, "函数getCamelChars需要字符串类型参数!");
      var chars = new Array(); //保存中间结果的数组
      for (var i = 0, len = str.length; i < len; i++) {
        //获得unicode码
        var ch = str.charAt(i);
        //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
        chars.push(this._getChar(ch));
      }
      //处理arrResult,返回所有可能的拼音首字母串数组
      var result = this._getResult(chars);

      this.options.charCase === 1 ?
      result = result.toLowerCase() :
      this.options.charCase === 2 ?
      result = result.toUpperCase() :
      {};
      return result;
    }

    /**
       * 获取拼音
       * @param {String} str 输入的中文字符串
       */ }, { key: "getFullChars", value: function getFullChars(
    str) {
      var len = str.length;
      var result = "";
      var reg = new RegExp('[a-zA-Z0-9\- ]');
      for (var i = 0; i < len; i++) {
        var ch = str.substr(i, 1);
        var unicode = ch.charCodeAt(0);
        //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
        if (unicode > 40869 || unicode < 19968) {
          result += ch;
        } else {
          var name = this._getFullChar(ch);
          if (name !== false) {
            result += name;
          }
        }
      }

      this.options.charCase === 1 ?
      result = result.toLowerCase() :
      this.options.charCase === 2 ?
      result = result.toUpperCase() :
      {};
      return result;
    } }, { key: "_getFullChar", value: function _getFullChar(

    ch) {
      for (var key in this.full_dict) {
        if (this.full_dict[key].indexOf(ch) != -1) {
          return this._capitalize(key);
          break;
        }
      }
      return false;
    }

    /**
       * 首字母大写
       */ }, { key: "_capitalize", value: function _capitalize(
    str) {
      if (str.length > 0) {
        var first = str.substr(0, 1).toUpperCase();
        var spare = str.substr(1, str.length);
        return first + spare;
      }
    } }, { key: "_getChar", value: function _getChar(

    ch) {
      var unicode = ch.charCodeAt(0);
      //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
      if (unicode > 40869 || unicode < 19968)
      return ch; //dealWithOthers(ch);
      //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
      if (!this.options.checkPolyphone)
      return this.char_dict.charAt(unicode - 19968);
      return this.polyphone[unicode] ? this.polyphone[unicode] : this.char_dict.charAt(unicode - 19968);
    } }, { key: "_getResult", value: function _getResult(

    chars) {
      if (!this.options.checkPolyphone)
      return chars.join('');
      var result = [''];
      for (var i = 0, len = chars.length; i < len; i++) {
        var str = chars[i];
        var strlen = str.length;
        if (strlen == 1) {
          for (var j = 0; j < result.length; j++) {
            result[k] += str;
          }
        } else {
          var swap1 = result.slice(0);
          result = [];
          for (var _j = 0; _j < strlen; _j++) {
            //复制一个相同的arrRslt
            var swap2 = swap1.slice(0);
            //把当前字符str[k]添加到每个元素末尾
            for (var _k = 0; _k < swap2.length; _k++) {
              swap2[_k] += str.charAt(_j);
            }
            //把复制并修改后的数组连接到arrRslt上
            result = result.concat(swap2);
          }
        }
      }
      return result;
    } }]);return Pinyin;}();


module.exports = Pinyin;

/***/ }),

/***/ 639:
/*!**********************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-forms/components/uni-forms/validate.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i') };


var FORMAT_MAPPING = {
  "int": 'integer',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number',
  "password": 'string'
  // "fileurls": 'array'
};

function formatMessage(args) {var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultMessage = ['label'];
  defaultMessage.forEach(function (item) {
    if (args[item] === undefined) {
      args[item] = '';
    }
  });

  var str = resources;
  for (var key in args) {
    var reg = new RegExp('{' + key + '}');
    str = str.replace(reg, args[key]);
  }
  return str;
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (type === 'object' && !Object.keys(value).length) {
    return true;
  }

  return false;
}

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string: function string(value) {
    return typeof value === 'string';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date: function date(value) {
    return value instanceof Date;
  },
  timestamp: function timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file: function file(value) {
    return typeof value.url === 'string';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern: function pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  idcard: function idcard(value) {
    return typeof value === 'string' && !!value.match(pattern.idcard);
  },
  'url-https': function urlHttps(value) {
    return this.url(value) && value.startsWith('https://');
  },
  'url-scheme': function urlScheme(value) {
    return value.startsWith('://');
  },
  'url-web': function urlWeb(value) {
    return false;
  } };var


RuleValidator = /*#__PURE__*/function () {

  function RuleValidator(message) {_classCallCheck(this, RuleValidator);
    this._message = message;
  }_createClass(RuleValidator, [{ key: "validateRule", value: function () {var _validateRule = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(

      fieldKey, fieldValue, value, data, allData) {var result, rules, hasRequired, message, i, rule, vt, now, resultExpr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                result = null;

                rules = fieldValue.rules;

                hasRequired = rules.findIndex(function (item) {
                  return item.required;
                });if (!(
                hasRequired < 0)) {_context.next = 8;break;}if (!(
                value === null || value === undefined)) {_context.next = 6;break;}return _context.abrupt("return",
                result);case 6:if (!(

                typeof value === 'string' && !value.length)) {_context.next = 8;break;}return _context.abrupt("return",
                result);case 8:



                message = this._message;if (!(

                rules === undefined)) {_context.next = 11;break;}return _context.abrupt("return",
                message['default']);case 11:


                i = 0;case 12:if (!(i < rules.length)) {_context.next = 35;break;}
                rule = rules[i];
                vt = this._getValidateType(rule);

                Object.assign(rule, {
                  label: fieldValue.label || "[\"".concat(fieldKey, "\"]") });if (!


                RuleValidatorHelper[vt]) {_context.next = 20;break;}
                result = RuleValidatorHelper[vt](rule, value, message);if (!(
                result != null)) {_context.next = 20;break;}return _context.abrupt("break", 35);case 20:if (!




                rule.validateExpr) {_context.next = 26;break;}
                now = Date.now();
                resultExpr = rule.validateExpr(value, allData, now);if (!(
                resultExpr === false)) {_context.next = 26;break;}
                result = this._getMessage(rule, rule.errorMessage || this._message['default']);return _context.abrupt("break", 35);case 26:if (!




                rule.validateFunction) {_context.next = 32;break;}_context.next = 29;return (
                  this.validateFunction(rule, value, data, allData, vt));case 29:result = _context.sent;if (!(
                result !== null)) {_context.next = 32;break;}return _context.abrupt("break", 35);case 32:i++;_context.next = 12;break;case 35:





                if (result !== null) {
                  result = message.TAG + result;
                }return _context.abrupt("return",

                result);case 37:case "end":return _context.stop();}}}, _callee, this);}));function validateRule(_x, _x2, _x3, _x4, _x5) {return _validateRule.apply(this, arguments);}return validateRule;}() }, { key: "validateFunction", value: function () {var _validateFunction = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


      rule, value, data, allData, vt) {var result, callbackMessage, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                result = null;_context2.prev = 1;

                callbackMessage = null;_context2.next = 5;return (
                  rule.validateFunction(rule, value, allData || data, function (message) {
                    callbackMessage = message;
                  }));case 5:res = _context2.sent;
                if (callbackMessage || typeof res === 'string' && res || res === false) {
                  result = this._getMessage(rule, callbackMessage || res, vt);
                }_context2.next = 12;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);

                result = this._getMessage(rule, _context2.t0.message, vt);case 12:return _context2.abrupt("return",

                result);case 13:case "end":return _context2.stop();}}}, _callee2, this, [[1, 9]]);}));function validateFunction(_x6, _x7, _x8, _x9, _x10) {return _validateFunction.apply(this, arguments);}return validateFunction;}() }, { key: "_getMessage", value: function _getMessage(


    rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message['default']);
    } }, { key: "_getValidateType", value: function _getValidateType(

    rule) {
      var result = '';
      if (rule.required) {
        result = 'required';
      } else if (rule.format) {
        result = 'format';
      } else if (rule.arrayType) {
        result = 'arrayTypeFormat';
      } else if (rule.range) {
        result = 'range';
      } else if (rule.maximum !== undefined || rule.minimum !== undefined) {
        result = 'rangeNumber';
      } else if (rule.maxLength !== undefined || rule.minLength !== undefined) {
        result = 'rangeLength';
      } else if (rule.pattern) {
        result = 'pattern';
      } else if (rule.validateFunction) {
        result = 'validateFunction';
      }
      return result;
    } }]);return RuleValidator;}();


var RuleValidatorHelper = {
  required: function required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null;
  },

  range: function range(rule, value, message) {var

    range =

    rule.range,errorMessage = rule.errorMessage;

    var list = new Array(range.length);
    for (var i = 0; i < range.length; i++) {
      var item = range[i];
      if (types.object(item) && item.value !== undefined) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }

    var result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }

    if (!result) {
      return formatMessage(rule, errorMessage || message['enum']);
    }

    return null;
  },

  rangeNumber: function rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }var


    minimum =



    rule.minimum,maximum = rule.maximum,exclusiveMinimum = rule.exclusiveMinimum,exclusiveMaximum = rule.exclusiveMaximum;
    var min = exclusiveMinimum ? value <= minimum : value < minimum;
    var max = exclusiveMaximum ? value >= maximum : value > maximum;

    if (minimum !== undefined && min) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMinimum ?
      'exclusiveMinimum' : 'minimum']);

    } else if (maximum !== undefined && max) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMaximum ?
      'exclusiveMaximum' : 'maximum']);

    } else if (minimum !== undefined && maximum !== undefined && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message['number'].range);
    }

    return null;
  },

  rangeLength: function rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    var min = rule.minLength;
    var max = rule.maxLength;
    var val = value.length;

    if (min !== undefined && val < min) {
      return formatMessage(rule, rule.errorMessage || message['length'].minLength);
    } else if (max !== undefined && val > max) {
      return formatMessage(rule, rule.errorMessage || message['length'].maxLength);
    } else if (min !== undefined && max !== undefined && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message['length'].range);
    }

    return null;
  },

  pattern: function pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null;
  },

  format: function format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }

    return null;
  },

  arrayTypeFormat: function arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }

    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }

    return null;
  } };var


SchemaValidator = /*#__PURE__*/function (_RuleValidator) {_inherits(SchemaValidator, _RuleValidator);var _super = _createSuper(SchemaValidator);

  function SchemaValidator(schema, options) {var _this;_classCallCheck(this, SchemaValidator);
    _this = _super.call(this, SchemaValidator.message);

    _this._schema = schema;
    _this._options = options || null;return _this;
  }_createClass(SchemaValidator, [{ key: "updateSchema", value: function updateSchema(

    schema) {
      this._schema = schema;
    } }, { key: "validate", value: function () {var _validate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(

      data, allData) {var result;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context3.next = 5;break;}_context3.next = 4;return (
                  this.invokeValidate(data, false, allData));case 4:result = _context3.sent;case 5:return _context3.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function validate(_x11, _x12) {return _validate.apply(this, arguments);}return validate;}() }, { key: "validateAll", value: function () {var _validateAll = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(


      data, allData) {var result;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context4.next = 5;break;}_context4.next = 4;return (
                  this.invokeValidate(data, true, allData));case 4:result = _context4.sent;case 5:return _context4.abrupt("return",

                result);case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function validateAll(_x13, _x14) {return _validateAll.apply(this, arguments);}return validateAll;}() }, { key: "validateUpdate", value: function () {var _validateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(


      data, allData) {var result;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context5.next = 5;break;}_context5.next = 4;return (
                  this.invokeValidateUpdate(data, false, allData));case 4:result = _context5.sent;case 5:return _context5.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function validateUpdate(_x15, _x16) {return _validateUpdate.apply(this, arguments);}return validateUpdate;}() }, { key: "invokeValidate", value: function () {var _invokeValidate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(


      data, all, allData) {var result, schema, key, value, errorMessage;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                result = [];
                schema = this._schema;_context6.t0 = _regenerator.default.keys(
                schema);case 3:if ((_context6.t1 = _context6.t0()).done) {_context6.next = 15;break;}key = _context6.t1.value;
                value = schema[key];_context6.next = 8;return (
                  this.validateRule(key, value, data[key], data, allData));case 8:errorMessage = _context6.sent;if (!(
                errorMessage != null)) {_context6.next = 13;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context6.next = 13;break;}return _context6.abrupt("break", 15);case 13:_context6.next = 3;break;case 15:return _context6.abrupt("return",


                result);case 16:case "end":return _context6.stop();}}}, _callee6, this);}));function invokeValidate(_x17, _x18, _x19) {return _invokeValidate.apply(this, arguments);}return invokeValidate;}() }, { key: "invokeValidateUpdate", value: function () {var _invokeValidateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(


      data, all, allData) {var result, key, errorMessage;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                result = [];_context7.t0 = _regenerator.default.keys(
                data);case 2:if ((_context7.t1 = _context7.t0()).done) {_context7.next = 13;break;}key = _context7.t1.value;_context7.next = 6;return (
                  this.validateRule(key, this._schema[key], data[key], data, allData));case 6:errorMessage = _context7.sent;if (!(
                errorMessage != null)) {_context7.next = 11;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context7.next = 11;break;}return _context7.abrupt("break", 13);case 11:_context7.next = 2;break;case 13:return _context7.abrupt("return",


                result);case 14:case "end":return _context7.stop();}}}, _callee7, this);}));function invokeValidateUpdate(_x20, _x21, _x22) {return _invokeValidateUpdate.apply(this, arguments);}return invokeValidateUpdate;}() }, { key: "_checkFieldInSchema", value: function _checkFieldInSchema(


    data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return '';
      }

      var noExistFields = keys.filter(function (key) {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields) },
      SchemaValidator.message.TAG + SchemaValidator.message['defaultInvalid']);
      return [{
        key: 'invalid',
        errorMessage: errorMessage }];

    } }]);return SchemaValidator;}(RuleValidator);


function Message() {
  return {
    TAG: "",
    default: '验证错误',
    defaultInvalid: '提交的字段{field}在数据库中并不存在',
    validateFunction: '验证无效',
    required: '{label}必填',
    'enum': '{label}超出范围',
    timestamp: '{label}格式无效',
    whitespace: '{label}不能为空',
    typeError: '{label}类型无效',
    date: {
      format: '{label}日期{value}格式无效',
      parse: '{label}日期无法解析,{value}无效',
      invalid: '{label}日期{value}无效' },

    length: {
      minLength: '{label}长度不能少于{minLength}',
      maxLength: '{label}长度不能超过{maxLength}',
      range: '{label}必须介于{minLength}和{maxLength}之间' },

    number: {
      minimum: '{label}不能小于{minimum}',
      maximum: '{label}不能大于{maximum}',
      exclusiveMinimum: '{label}不能小于等于{minimum}',
      exclusiveMaximum: '{label}不能大于等于{maximum}',
      range: '{label}必须介于{minimum}and{maximum}之间' },

    pattern: {
      mismatch: '{label}格式不匹配' } };


}


SchemaValidator.message = new Message();var _default =

SchemaValidator;exports.default = _default;

/***/ }),

/***/ 661:
/*!********************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 662));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 663));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 664));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 662:
/*!*******************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/en.json ***!
  \*******************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, uni-calender.SUN, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"select date\",\"uni-datetime-picker.selectTime\":\"select time\",\"uni-datetime-picker.selectDateTime\":\"select datetime\",\"uni-datetime-picker.startDate\":\"start date\",\"uni-datetime-picker.endDate\":\"end date\",\"uni-datetime-picker.startTime\":\"start time\",\"uni-datetime-picker.endTime\":\"end time\",\"uni-datetime-picker.ok\":\"ok\",\"uni-datetime-picker.clear\":\"clear\",\"uni-datetime-picker.cancel\":\"cancel\",\"uni-calender.MON\":\"MON\",\"uni-calender.TUE\":\"TUE\",\"uni-calender.WED\":\"WED\",\"uni-calender.THU\":\"THU\",\"uni-calender.FRI\":\"FRI\",\"uni-calender.SAT\":\"SAT\",\"uni-calender.SUN\":\"SUN\"}");

/***/ }),

/***/ 663:
/*!************************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/zh-Hans.json ***!
  \************************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-calender.SUN, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"选择日期\",\"uni-datetime-picker.selectTime\":\"选择时间\",\"uni-datetime-picker.selectDateTime\":\"选择日期时间\",\"uni-datetime-picker.startDate\":\"开始日期\",\"uni-datetime-picker.endDate\":\"结束日期\",\"uni-datetime-picker.startTime\":\"开始时间\",\"uni-datetime-picker.endTime\":\"结束时间\",\"uni-datetime-picker.ok\":\"确定\",\"uni-datetime-picker.clear\":\"清除\",\"uni-datetime-picker.cancel\":\"取消\",\"uni-calender.SUN\":\"日\",\"uni-calender.MON\":\"一\",\"uni-calender.TUE\":\"二\",\"uni-calender.WED\":\"三\",\"uni-calender.THU\":\"四\",\"uni-calender.FRI\":\"五\",\"uni-calender.SAT\":\"六\"}");

/***/ }),

/***/ 664:
/*!************************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/zh-Hant.json ***!
  \************************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-calender.SUN, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"選擇日期\",\"uni-datetime-picker.selectTime\":\"選擇時間\",\"uni-datetime-picker.selectDateTime\":\"選擇日期時間\",\"uni-datetime-picker.startDate\":\"開始日期\",\"uni-datetime-picker.endDate\":\"結束日期\",\"uni-datetime-picker.startTime\":\"開始时间\",\"uni-datetime-picker.endTime\":\"結束时间\",\"uni-datetime-picker.ok\":\"確定\",\"uni-datetime-picker.clear\":\"清除\",\"uni-datetime-picker.cancel\":\"取消\",\"uni-calender.SUN\":\"日\",\"uni-calender.MON\":\"一\",\"uni-calender.TUE\":\"二\",\"uni-calender.WED\":\"三\",\"uni-calender.THU\":\"四\",\"uni-calender.FRI\":\"五\",\"uni-calender.SAT\":\"六\"}");

/***/ }),

/***/ 7:
/*!*******************************************************************!*\
  !*** E:/lingli-community/web/android/pages.json?{"type":"style"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/login/login": {}, "pages/login/register": {}, "pages/agreement/secret": { "navigationStyle": "default", "navigationBarTitleText": "用户协议" }, "pages/index/index": {}, "pages/index/search": {}, "pages/index/daren": { "navigationStyle": "default", "navigationBarTitleText": "社区达人" }, "pages/index/applyDaren": {}, "pages/index/tijian": {}, "pages/index/changeVillage": {}, "pages/index/changeCity": {}, "pages/index/shangquan": {}, "pages/index/bookSearch": {}, "pages/index/shopDetail": {}, "pages/index/darenDetail": {}, "pages/index/xianzhi": { "navigationStyle": "default", "navigationBarTitleText": "闲置买卖" }, "pages/index/shopOrder": { "navigationStyle": "default", "navigationBarTitleText": "订单详情" }, "pages/from/xianzhi": { "navigationStyle": "default", "navigationBarTitleText": "闲置买卖" }, "pages/from/pet": { "navigationStyle": "default", "navigationBarTitleText": "宠物买卖" }, "pages/index/pet": { "navigationStyle": "default", "navigationBarTitleText": "宠物买卖" }, "pages/from/book": { "navigationStyle": "default", "navigationBarTitleText": "旧书出售" }, "pages/index/book": { "navigationStyle": "default", "navigationBarTitleText": "旧书出售" }, "pages/from/clothes": { "navigationStyle": "default", "navigationBarTitleText": "旧衣出售" }, "pages/index/shopList": { "navigationStyle": "default", "navigationBarTitleText": "商铺" }, "pages/index/darenList": { "navigationStyle": "default", "navigationBarTitleText": "达人" }, "pages/index/wuye": { "navigationStyle": "default", "navigationBarTitleText": "社区物业" }, "pages/index/a_nearbyshop": { "navigationStyle": "default", "navigationBarTitleText": "附近商家" }, "pages/from/apply": {}, "pages/from/currency": {}, "pages/order/index": {}, "pages/order/orderList": {}, "pages/order/orderDetail": { "enablePullDownRefresh": true, "onReachBottomDistance": 50 }, "pages/order/shop": {}, "pages/order/get": {}, "pages/chat/index": {}, "pages/chat/HM-chat": {}, "pages/user/index": {}, "pages/user/applyShop": {}, "pages/user/ticket": {}, "pages/user/wallet": {}, "pages/user/tixian": {}, "pages/user/address": { "navigationStyle": "default", "navigationBarTitleText": "地址管理" }, "pages/user/addressManage": { "navigationStyle": "default", "navigationBarTitleText": "新增地址" }, "pages/user/shopSet/shopSet": { "navigationStyle": "default", "navigationBarTitleText": "我的店铺" }, "pages/user/shopSet/fuli": { "navigationStyle": "default", "navigationBarTitleText": "优惠券管理" }, "pages/user/darenSet/darenSet": { "navigationStyle": "default", "navigationBarTitleText": "达人设置" }, "pages/user/set": { "navigationStyle": "default", "navigationBarTitleText": "设置" }, "pages/user/pass": { "navigationStyle": "default", "navigationBarTitleText": "修改密码" }, "pages/user/about": { "navigationStyle": "default", "navigationBarTitleText": "关于我们" }, "pages/user/tickitDetail": { "navigationStyle": "default", "navigationBarTitleText": "代金券详情", "navigationBarBackgroundColor": "#ffac46" }, "pages/user/myOrder/myOrder": {}, "pages/user/orderDetail": { "navigationStyle": "default", "navigationBarTitleText": "订单详情" }, "pages/user/yuyue/yuyue": { "navigationStyle": "default", "navigationBarTitleText": "我的预约" }, "pages/user/collection/collection": { "navigationStyle": "default", "navigationBarTitleText": "我的收藏" }, "pages/chooselocation/index": {}, "pagesA/a_baojie": { "navigationStyle": "default", "navigationBarTitleText": "家政保洁" }, "pagesA/a_baojie_yuyue": { "navigationStyle": "default", "navigationBarTitleText": "家政保洁" }, "pagesA/a_weixiu": { "navigationStyle": "default", "navigationBarTitleText": "安装维修" }, "pagesA/a_maogou": { "navigationStyle": "default", "navigationBarTitleText": "喂猫喂狗" }, "pagesA/a_maogou_yuyue": { "navigationStyle": "default", "navigationBarTitleText": "喂猫喂狗" }, "pagesA/a_peihu": { "navigationStyle": "default", "navigationBarTitleText": "陪护看病" }, "pagesA/a_peihu_yuyue": { "navigationStyle": "default", "navigationBarTitleText": "陪护看病" }, "pagesA/a_peihu_yuyue_obj": { "navigationStyle": "default", "navigationBarTitleText": "服务对象" }, "pagesA/a_jiachu": { "navigationStyle": "default", "navigationBarTitleText": "私厨预约" }, "pagesA/a_orderDetail_cancel": { "navigationStyle": "default", "navigationBarTitleText": "取消订单" }, "pagesA/a_orderDetail_evaluate": { "navigationStyle": "default", "navigationBarTitleText": "评价" }, "pagesA/a_product": { "navigationStyle": "default", "navigationBarTitleText": "商品管理" }, "pagesA/a_shop": { "navigationStyle": "default", "navigationBarTitleText": "店铺管理" }, "pagesA/a_myWelfare": { "navigationStyle": "default", "navigationBarTitleText": "我的福利" } }, "globalStyle": { "navigationStyle": "custom", "navigationBarTextStyle": "black", "navigationBarTitleText": "邻里", "navigationBarBackgroundColor": "#fff", "backgroundColor": "#FFFFFF" } };exports.default = _default;

/***/ }),

/***/ 707:
/*!**********************************************************************************!*\
  !*** E:/lingli-community/web/android/components/wangding-pickerAddres/city.json ***!
  \**********************************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"id\":0,\"text\":\"全部\",\"children\":[{\"id\":0,\"text\":\"全部\",\"zip_code\":\"300000\",\"abridge\":\"all\",\"children\":[]}]},{\"id\":1,\"text\":\"北京\",\"children\":[{\"id\":1,\"text\":\"北京\",\"zip_code\":\"100000\",\"abridge\":\"BJ\",\"children\":[{\"id\":1,\"text\":\"东城区\"},{\"id\":2,\"text\":\"西城区\"},{\"id\":3,\"text\":\"崇文区\"},{\"id\":4,\"text\":\"宣武区\"},{\"id\":5,\"text\":\"朝阳区\"},{\"id\":6,\"text\":\"丰台区\"},{\"id\":7,\"text\":\"石景山区\"},{\"id\":8,\"text\":\"海淀区\"},{\"id\":9,\"text\":\"门头沟区\"},{\"id\":10,\"text\":\"房山区\"},{\"id\":11,\"text\":\"通州区\"},{\"id\":12,\"text\":\"顺义区\"},{\"id\":13,\"text\":\"昌平区\"},{\"id\":14,\"text\":\"大兴区\"},{\"id\":15,\"text\":\"怀柔区\"},{\"id\":16,\"text\":\"平谷区\"},{\"id\":17,\"text\":\"密云县\"},{\"id\":18,\"text\":\"延庆县\"}]}]},{\"id\":2,\"text\":\"天津\",\"children\":[{\"id\":2,\"text\":\"天津\",\"zip_code\":\"300000\",\"abridge\":\"TJ\",\"children\":[{\"id\":19,\"text\":\"和平区\"},{\"id\":20,\"text\":\"河东区\"},{\"id\":21,\"text\":\"河西区\"},{\"id\":22,\"text\":\"南开区\"},{\"id\":23,\"text\":\"河北区\"},{\"id\":24,\"text\":\"红桥区\"},{\"id\":25,\"text\":\"塘沽区\"},{\"id\":26,\"text\":\"汉沽区\"},{\"id\":27,\"text\":\"大港区\"},{\"id\":28,\"text\":\"东丽区\"},{\"id\":29,\"text\":\"西青区\"},{\"id\":30,\"text\":\"津南区\"},{\"id\":31,\"text\":\"北辰区\"},{\"id\":32,\"text\":\"武清区\"},{\"id\":33,\"text\":\"宝坻区\"},{\"id\":34,\"text\":\"宁河县\"},{\"id\":35,\"text\":\"静海县\"},{\"id\":36,\"text\":\"蓟县\"},{\"id\":37,\"text\":\"保税区\"},{\"id\":38,\"text\":\"经济技术开发区\"},{\"id\":39,\"text\":\"高新区\"},{\"id\":40,\"text\":\"滨海新区\"}]}]},{\"id\":3,\"text\":\"河北\",\"children\":[{\"id\":3,\"text\":\"石家庄\",\"zip_code\":\"050000\",\"abridge\":\"SJZ\",\"children\":[{\"id\":41,\"text\":\"长安区\"},{\"id\":42,\"text\":\"桥东区\"},{\"id\":43,\"text\":\"桥西区\"},{\"id\":44,\"text\":\"新华区\"},{\"id\":45,\"text\":\"井陉矿区\"},{\"id\":46,\"text\":\"裕华区\"},{\"id\":47,\"text\":\"井陉县\"},{\"id\":48,\"text\":\"正定县\"},{\"id\":49,\"text\":\"栾城县\"},{\"id\":50,\"text\":\"行唐县\"},{\"id\":51,\"text\":\"灵寿县\"},{\"id\":52,\"text\":\"高邑县\"},{\"id\":53,\"text\":\"深泽县\"},{\"id\":54,\"text\":\"赞皇县\"},{\"id\":55,\"text\":\"无极县\"},{\"id\":56,\"text\":\"平山县\"},{\"id\":57,\"text\":\"元氏县\"},{\"id\":58,\"text\":\"赵县\"},{\"id\":59,\"text\":\"辛集市\"},{\"id\":60,\"text\":\"藁城市\"},{\"id\":61,\"text\":\"晋州市\"},{\"id\":62,\"text\":\"新乐市\"},{\"id\":63,\"text\":\"鹿泉市\"},{\"id\":64,\"text\":\"高新技术开发区\"}]},{\"id\":4,\"text\":\"唐山\",\"zip_code\":\"063000\",\"abridge\":\"TS\",\"children\":[{\"id\":65,\"text\":\"路南区\"},{\"id\":66,\"text\":\"路北区\"},{\"id\":67,\"text\":\"古冶区\"},{\"id\":68,\"text\":\"开平区\"},{\"id\":69,\"text\":\"丰南区\"},{\"id\":70,\"text\":\"丰润区\"},{\"id\":71,\"text\":\"滦县\"},{\"id\":72,\"text\":\"滦南县\"},{\"id\":73,\"text\":\"乐亭县\"},{\"id\":74,\"text\":\"迁西县\"},{\"id\":75,\"text\":\"玉田县\"},{\"id\":76,\"text\":\"唐海县\"},{\"id\":77,\"text\":\"遵化市\"},{\"id\":78,\"text\":\"迁安市\"},{\"id\":79,\"text\":\"高新区\"},{\"id\":80,\"text\":\"汉沽管理区\"},{\"id\":81,\"text\":\"海港开发区\"},{\"id\":82,\"text\":\"芦台开发区\"},{\"id\":83,\"text\":\"南堡开发区\"},{\"id\":84,\"text\":\"曹妃甸工业区\"}]},{\"id\":5,\"text\":\"秦皇岛\",\"zip_code\":\"066000\",\"abridge\":\"QHD\",\"children\":[{\"id\":85,\"text\":\"海港区\"},{\"id\":86,\"text\":\"山海关区\"},{\"id\":87,\"text\":\"北戴河区\"},{\"id\":88,\"text\":\"青龙满族自治县\"},{\"id\":89,\"text\":\"昌黎县\"},{\"id\":90,\"text\":\"抚宁县\"},{\"id\":91,\"text\":\"卢龙县\"},{\"id\":92,\"text\":\"经济技术开发区\"}]},{\"id\":6,\"text\":\"邯郸\",\"zip_code\":\"056000\",\"abridge\":\"HD\",\"children\":[{\"id\":93,\"text\":\"邯山区\"},{\"id\":94,\"text\":\"丛台区\"},{\"id\":95,\"text\":\"复兴区\"},{\"id\":96,\"text\":\"峰峰矿区\"},{\"id\":97,\"text\":\"邯郸县\"},{\"id\":98,\"text\":\"临漳县\"},{\"id\":99,\"text\":\"成安县\"},{\"id\":100,\"text\":\"大名县\"},{\"id\":101,\"text\":\"涉县\"},{\"id\":102,\"text\":\"磁县\"},{\"id\":103,\"text\":\"肥乡县\"},{\"id\":104,\"text\":\"永年县\"},{\"id\":105,\"text\":\"邱县\"},{\"id\":106,\"text\":\"鸡泽县\"},{\"id\":107,\"text\":\"广平县\"},{\"id\":108,\"text\":\"馆陶县\"},{\"id\":109,\"text\":\"魏县\"},{\"id\":110,\"text\":\"曲周县\"},{\"id\":111,\"text\":\"武安市\"},{\"id\":112,\"text\":\"经济开发区\"}]},{\"id\":7,\"text\":\"邢台\",\"zip_code\":\"054000\",\"abridge\":\"XT\",\"children\":[{\"id\":113,\"text\":\"桥东区\"},{\"id\":114,\"text\":\"桥西区\"},{\"id\":115,\"text\":\"邢台县\"},{\"id\":116,\"text\":\"临城县\"},{\"id\":117,\"text\":\"内丘县\"},{\"id\":118,\"text\":\"柏乡县\"},{\"id\":119,\"text\":\"隆尧县\"},{\"id\":120,\"text\":\"任县\"},{\"id\":121,\"text\":\"南和县\"},{\"id\":122,\"text\":\"宁晋县\"},{\"id\":123,\"text\":\"巨鹿县\"},{\"id\":124,\"text\":\"新河县\"},{\"id\":125,\"text\":\"广宗县\"},{\"id\":126,\"text\":\"平乡县\"},{\"id\":127,\"text\":\"威县\"},{\"id\":128,\"text\":\"清河县\"},{\"id\":129,\"text\":\"临西县\"},{\"id\":130,\"text\":\"南宫市\"},{\"id\":131,\"text\":\"沙河市\"}]},{\"id\":8,\"text\":\"保定\",\"zip_code\":\"071000\",\"abridge\":\"BD\",\"children\":[{\"id\":132,\"text\":\"新市区\"},{\"id\":133,\"text\":\"南市区\"},{\"id\":134,\"text\":\"北市区\"},{\"id\":135,\"text\":\"满城县\"},{\"id\":136,\"text\":\"清苑县\"},{\"id\":137,\"text\":\"涞水县\"},{\"id\":138,\"text\":\"阜平县\"},{\"id\":139,\"text\":\"徐水县\"},{\"id\":140,\"text\":\"定兴县\"},{\"id\":141,\"text\":\"唐县\"},{\"id\":142,\"text\":\"高阳县\"},{\"id\":143,\"text\":\"容城县\"},{\"id\":144,\"text\":\"涞源县\"},{\"id\":145,\"text\":\"望都县\"},{\"id\":146,\"text\":\"安新县\"},{\"id\":147,\"text\":\"易县\"},{\"id\":148,\"text\":\"曲阳县\"},{\"id\":149,\"text\":\"蠡县\"},{\"id\":150,\"text\":\"顺平县\"},{\"id\":151,\"text\":\"博野县\"},{\"id\":152,\"text\":\"雄县\"},{\"id\":153,\"text\":\"涿州市\"},{\"id\":154,\"text\":\"定州市\"},{\"id\":155,\"text\":\"安国市\"},{\"id\":156,\"text\":\"高碑店市\"}]},{\"id\":9,\"text\":\"张家口\",\"zip_code\":\"075000\",\"abridge\":\"ZJK\",\"children\":[{\"id\":157,\"text\":\"桥东区\"},{\"id\":158,\"text\":\"桥西区\"},{\"id\":159,\"text\":\"宣化区\"},{\"id\":160,\"text\":\"下花园区\"},{\"id\":161,\"text\":\"宣化县\"},{\"id\":162,\"text\":\"张北县\"},{\"id\":163,\"text\":\"康保县\"},{\"id\":164,\"text\":\"沽源县\"},{\"id\":165,\"text\":\"尚义县\"},{\"id\":166,\"text\":\"蔚县\"},{\"id\":167,\"text\":\"阳原县\"},{\"id\":168,\"text\":\"怀安县\"},{\"id\":169,\"text\":\"万全县\"},{\"id\":170,\"text\":\"怀来县\"},{\"id\":171,\"text\":\"涿鹿县\"},{\"id\":172,\"text\":\"赤城县\"},{\"id\":173,\"text\":\"崇礼县\"}]},{\"id\":10,\"text\":\"承德\",\"zip_code\":\"067000\",\"abridge\":\"CD\",\"children\":[{\"id\":174,\"text\":\"双桥区\"},{\"id\":175,\"text\":\"双滦区\"},{\"id\":176,\"text\":\"鹰手营子矿区\"},{\"id\":177,\"text\":\"承德县\"},{\"id\":178,\"text\":\"兴隆县\"},{\"id\":179,\"text\":\"平泉县\"},{\"id\":180,\"text\":\"滦平县\"},{\"id\":181,\"text\":\"隆化县\"},{\"id\":182,\"text\":\"丰宁满族自治县\"},{\"id\":183,\"text\":\"宽城满族自治县\"},{\"id\":184,\"text\":\"围场满族蒙古族自治县\"}]},{\"id\":11,\"text\":\"沧州\",\"zip_code\":\"061000\",\"abridge\":\"CZ\",\"children\":[{\"id\":185,\"text\":\"新华区\"},{\"id\":186,\"text\":\"运河区\"},{\"id\":187,\"text\":\"沧县\"},{\"id\":188,\"text\":\"青县\"},{\"id\":189,\"text\":\"东光县\"},{\"id\":190,\"text\":\"海兴县\"},{\"id\":191,\"text\":\"盐山县\"},{\"id\":192,\"text\":\"肃宁县\"},{\"id\":193,\"text\":\"南皮县\"},{\"id\":194,\"text\":\"吴桥县\"},{\"id\":195,\"text\":\"献县\"},{\"id\":196,\"text\":\"孟村回族自治县\"},{\"id\":197,\"text\":\"泊头市\"},{\"id\":198,\"text\":\"任丘市\"},{\"id\":199,\"text\":\"黄骅市\"},{\"id\":200,\"text\":\"河间市\"}]},{\"id\":12,\"text\":\"廊坊\",\"zip_code\":\"065000\",\"abridge\":\"LF\",\"children\":[{\"id\":201,\"text\":\"安次区\"},{\"id\":202,\"text\":\"广阳区\"},{\"id\":203,\"text\":\"固安县\"},{\"id\":204,\"text\":\"永清县\"},{\"id\":205,\"text\":\"香河县\"},{\"id\":206,\"text\":\"大城县\"},{\"id\":207,\"text\":\"文安县\"},{\"id\":208,\"text\":\"大厂回族自治县\"},{\"id\":209,\"text\":\"霸州市\"},{\"id\":210,\"text\":\"三河市\"},{\"id\":211,\"text\":\"开发区\"}]},{\"id\":13,\"text\":\"衡水\",\"zip_code\":\"053000\",\"abridge\":\"HS\",\"children\":[{\"id\":212,\"text\":\"桃城区\"},{\"id\":213,\"text\":\"枣强县\"},{\"id\":214,\"text\":\"武邑县\"},{\"id\":215,\"text\":\"武强县\"},{\"id\":216,\"text\":\"饶阳县\"},{\"id\":217,\"text\":\"安平县\"},{\"id\":218,\"text\":\"故城县\"},{\"id\":219,\"text\":\"景县\"},{\"id\":220,\"text\":\"阜城县\"},{\"id\":221,\"text\":\"冀州市\"},{\"id\":222,\"text\":\"深州市\"}]}]},{\"id\":4,\"text\":\"山西\",\"children\":[{\"id\":14,\"text\":\"太原\",\"zip_code\":\"030000\",\"abridge\":\"TY\",\"children\":[{\"id\":223,\"text\":\"小店区\"},{\"id\":224,\"text\":\"迎泽区\"},{\"id\":225,\"text\":\"杏花岭区\"},{\"id\":226,\"text\":\"尖草坪区\"},{\"id\":227,\"text\":\"万柏林区\"},{\"id\":228,\"text\":\"晋源区\"},{\"id\":229,\"text\":\"清徐县\"},{\"id\":230,\"text\":\"阳曲县\"},{\"id\":231,\"text\":\"娄烦县\"},{\"id\":232,\"text\":\"古交市\"}]},{\"id\":15,\"text\":\"大同\",\"zip_code\":\"037000\",\"abridge\":\"DT\",\"children\":[{\"id\":233,\"text\":\"城区\"},{\"id\":234,\"text\":\"矿区\"},{\"id\":235,\"text\":\"南郊区\"},{\"id\":236,\"text\":\"新荣区\"},{\"id\":237,\"text\":\"阳高县\"},{\"id\":238,\"text\":\"天镇县\"},{\"id\":239,\"text\":\"广灵县\"},{\"id\":240,\"text\":\"灵丘县\"},{\"id\":241,\"text\":\"浑源县\"},{\"id\":242,\"text\":\"左云县\"},{\"id\":243,\"text\":\"大同县\"}]},{\"id\":16,\"text\":\"阳泉\",\"zip_code\":\"045000\",\"abridge\":\"YQ\",\"children\":[{\"id\":244,\"text\":\"城区\"},{\"id\":245,\"text\":\"矿区\"},{\"id\":246,\"text\":\"郊区\"},{\"id\":247,\"text\":\"平定县\"},{\"id\":248,\"text\":\"盂县\"}]},{\"id\":17,\"text\":\"长治\",\"zip_code\":\"046000\",\"abridge\":\"CZ\",\"children\":[{\"id\":249,\"text\":\"城区\"},{\"id\":250,\"text\":\"郊区\"},{\"id\":251,\"text\":\"长治县\"},{\"id\":252,\"text\":\"襄垣县\"},{\"id\":253,\"text\":\"屯留县\"},{\"id\":254,\"text\":\"平顺县\"},{\"id\":255,\"text\":\"黎城县\"},{\"id\":256,\"text\":\"壶关县\"},{\"id\":257,\"text\":\"长子县\"},{\"id\":258,\"text\":\"武乡县\"},{\"id\":259,\"text\":\"沁县\"},{\"id\":260,\"text\":\"沁源县\"},{\"id\":261,\"text\":\"潞城市\"}]},{\"id\":18,\"text\":\"晋城\",\"zip_code\":\"048000\",\"abridge\":\"JC\",\"children\":[{\"id\":262,\"text\":\"城区\"},{\"id\":263,\"text\":\"沁水县\"},{\"id\":264,\"text\":\"阳城县\"},{\"id\":265,\"text\":\"陵川县\"},{\"id\":266,\"text\":\"泽州县\"},{\"id\":267,\"text\":\"高平市\"}]},{\"id\":19,\"text\":\"朔州\",\"zip_code\":\"036000\",\"abridge\":\"SZ\",\"children\":[{\"id\":268,\"text\":\"朔城区\"},{\"id\":269,\"text\":\"平鲁区\"},{\"id\":270,\"text\":\"山阴县\"},{\"id\":271,\"text\":\"应县\"},{\"id\":272,\"text\":\"右玉县\"},{\"id\":273,\"text\":\"怀仁县\"}]},{\"id\":20,\"text\":\"晋中\",\"zip_code\":\"030600\",\"abridge\":\"JZ\",\"children\":[{\"id\":274,\"text\":\"榆次区\"},{\"id\":275,\"text\":\"榆社县\"},{\"id\":276,\"text\":\"左权县\"},{\"id\":277,\"text\":\"和顺县\"},{\"id\":278,\"text\":\"昔阳县\"},{\"id\":279,\"text\":\"寿阳县\"},{\"id\":280,\"text\":\"太谷县\"},{\"id\":281,\"text\":\"祁县\"},{\"id\":282,\"text\":\"平遥县\"},{\"id\":283,\"text\":\"灵石县\"},{\"id\":284,\"text\":\"介休市\"}]},{\"id\":21,\"text\":\"运城\",\"zip_code\":\"044000\",\"abridge\":\"YC\",\"children\":[{\"id\":285,\"text\":\"盐湖区\"},{\"id\":286,\"text\":\"临猗县\"},{\"id\":287,\"text\":\"万荣县\"},{\"id\":288,\"text\":\"闻喜县\"},{\"id\":289,\"text\":\"稷山县\"},{\"id\":290,\"text\":\"新绛县\"},{\"id\":291,\"text\":\"绛县\"},{\"id\":292,\"text\":\"垣曲县\"},{\"id\":293,\"text\":\"夏县\"},{\"id\":294,\"text\":\"平陆县\"},{\"id\":295,\"text\":\"芮城县\"},{\"id\":296,\"text\":\"永济市\"},{\"id\":297,\"text\":\"河津市\"}]},{\"id\":22,\"text\":\"忻州\",\"zip_code\":\"034000\",\"abridge\":\"XZ\",\"children\":[{\"id\":298,\"text\":\"忻府区\"},{\"id\":299,\"text\":\"定襄县\"},{\"id\":300,\"text\":\"五台县\"},{\"id\":301,\"text\":\"代县\"},{\"id\":302,\"text\":\"繁峙县\"},{\"id\":303,\"text\":\"宁武县\"},{\"id\":304,\"text\":\"静乐县\"},{\"id\":305,\"text\":\"神池县\"},{\"id\":306,\"text\":\"五寨县\"},{\"id\":307,\"text\":\"岢岚县\"},{\"id\":308,\"text\":\"河曲县\"},{\"id\":309,\"text\":\"保德县\"},{\"id\":310,\"text\":\"偏关县\"},{\"id\":311,\"text\":\"原平市\"}]},{\"id\":23,\"text\":\"临汾\",\"zip_code\":\"041000\",\"abridge\":\"LF\",\"children\":[{\"id\":312,\"text\":\"尧都区\"},{\"id\":313,\"text\":\"曲沃县\"},{\"id\":314,\"text\":\"翼城县\"},{\"id\":315,\"text\":\"襄汾县\"},{\"id\":316,\"text\":\"洪洞县\"},{\"id\":317,\"text\":\"古县\"},{\"id\":318,\"text\":\"安泽县\"},{\"id\":319,\"text\":\"浮山县\"},{\"id\":320,\"text\":\"吉县\"},{\"id\":321,\"text\":\"乡宁县\"},{\"id\":322,\"text\":\"大宁县\"},{\"id\":323,\"text\":\"隰县\"},{\"id\":324,\"text\":\"永和县\"},{\"id\":325,\"text\":\"蒲县\"},{\"id\":326,\"text\":\"汾西县\"},{\"id\":327,\"text\":\"侯马市\"},{\"id\":328,\"text\":\"霍州市\"}]},{\"id\":24,\"text\":\"吕梁\",\"zip_code\":\"033000\",\"abridge\":\"LL\",\"children\":[{\"id\":329,\"text\":\"离石区\"},{\"id\":330,\"text\":\"文水县\"},{\"id\":331,\"text\":\"交城县\"},{\"id\":332,\"text\":\"兴县\"},{\"id\":333,\"text\":\"临县\"},{\"id\":334,\"text\":\"柳林县\"},{\"id\":335,\"text\":\"石楼县\"},{\"id\":336,\"text\":\"岚县\"},{\"id\":337,\"text\":\"方山县\"},{\"id\":338,\"text\":\"中阳县\"},{\"id\":339,\"text\":\"交口县\"},{\"id\":340,\"text\":\"孝义市\"},{\"id\":341,\"text\":\"汾阳市\"}]}]},{\"id\":5,\"text\":\"内蒙古\",\"children\":[{\"id\":25,\"text\":\"呼和浩特\",\"zip_code\":\"010000\",\"abridge\":\"HHHT\",\"children\":[{\"id\":342,\"text\":\"回民区\"},{\"id\":343,\"text\":\"玉泉区\"},{\"id\":344,\"text\":\"新城区\"},{\"id\":345,\"text\":\"赛罕区\"},{\"id\":346,\"text\":\"土默特左旗\"},{\"id\":347,\"text\":\"托克托县\"},{\"id\":348,\"text\":\"和林格尔县\"},{\"id\":349,\"text\":\"清水河县\"},{\"id\":350,\"text\":\"武川县\"}]},{\"id\":26,\"text\":\"包头\",\"zip_code\":\"014000\",\"abridge\":\"BT\",\"children\":[{\"id\":351,\"text\":\"东河区\"},{\"id\":352,\"text\":\"昆都仑区\"},{\"id\":353,\"text\":\"青山区\"},{\"id\":354,\"text\":\"石拐区\"},{\"id\":355,\"text\":\"白云矿区\"},{\"id\":356,\"text\":\"九原区\"},{\"id\":357,\"text\":\"土默特右旗\"},{\"id\":358,\"text\":\"固阳县\"},{\"id\":359,\"text\":\"达尔罕茂明安联合旗\"}]},{\"id\":27,\"text\":\"乌海\",\"zip_code\":\"016000\",\"abridge\":\"WH\",\"children\":[{\"id\":360,\"text\":\"海勃湾区\"},{\"id\":361,\"text\":\"海南区\"},{\"id\":362,\"text\":\"乌达区\"}]},{\"id\":28,\"text\":\"赤峰\",\"zip_code\":\"024000\",\"abridge\":\"CF\",\"children\":[{\"id\":363,\"text\":\"红山区\"},{\"id\":364,\"text\":\"元宝山区\"},{\"id\":365,\"text\":\"松山区\"},{\"id\":366,\"text\":\"阿鲁科尔沁旗\"},{\"id\":367,\"text\":\"巴林左旗\"},{\"id\":368,\"text\":\"巴林右旗\"},{\"id\":369,\"text\":\"林西县\"},{\"id\":370,\"text\":\"克什克腾旗\"},{\"id\":371,\"text\":\"翁牛特旗\"},{\"id\":372,\"text\":\"喀喇沁旗\"},{\"id\":373,\"text\":\"宁城县\"},{\"id\":374,\"text\":\"敖汉旗\"},{\"id\":375,\"text\":\"新城区\"}]},{\"id\":29,\"text\":\"通辽\",\"zip_code\":\"028000\",\"abridge\":\"TL\",\"children\":[{\"id\":376,\"text\":\"科尔沁区\"},{\"id\":377,\"text\":\"科尔沁左翼中旗\"},{\"id\":378,\"text\":\"科尔沁左翼后旗\"},{\"id\":379,\"text\":\"开鲁县\"},{\"id\":380,\"text\":\"库伦旗\"},{\"id\":381,\"text\":\"奈曼旗\"},{\"id\":382,\"text\":\"扎鲁特旗\"},{\"id\":383,\"text\":\"霍林郭勒市\"}]},{\"id\":30,\"text\":\"鄂尔多斯\",\"zip_code\":\"017000\",\"abridge\":\"EEDS\",\"children\":[{\"id\":384,\"text\":\"东胜区\"},{\"id\":385,\"text\":\"达拉特旗\"},{\"id\":386,\"text\":\"准格尔旗\"},{\"id\":387,\"text\":\"鄂托克前旗\"},{\"id\":388,\"text\":\"鄂托克旗\"},{\"id\":389,\"text\":\"杭锦旗\"},{\"id\":390,\"text\":\"乌审旗\"},{\"id\":391,\"text\":\"伊金霍洛旗\"}]},{\"id\":31,\"text\":\"呼伦贝尔\",\"zip_code\":\"021000\",\"abridge\":\"HLBR\",\"children\":[{\"id\":392,\"text\":\"海拉尔区\"},{\"id\":393,\"text\":\"阿荣旗\"},{\"id\":394,\"text\":\"莫力达瓦达斡尔族自治旗\"},{\"id\":395,\"text\":\"鄂伦春自治旗\"},{\"id\":396,\"text\":\"鄂温克族自治旗\"},{\"id\":397,\"text\":\"陈巴尔虎旗\"},{\"id\":398,\"text\":\"新巴尔虎左旗\"},{\"id\":399,\"text\":\"新巴尔虎右旗\"},{\"id\":400,\"text\":\"满洲里市\"},{\"id\":401,\"text\":\"牙克石市\"},{\"id\":402,\"text\":\"扎兰屯市\"},{\"id\":403,\"text\":\"额尔古纳市\"},{\"id\":404,\"text\":\"根河市\"}]},{\"id\":32,\"text\":\"巴彦\",\"zip_code\":\"015000\",\"abridge\":\"BY\",\"children\":[{\"id\":405,\"text\":\"临河区\"},{\"id\":406,\"text\":\"五原县\"},{\"id\":407,\"text\":\"磴口县\"},{\"id\":408,\"text\":\"乌拉特前旗\"},{\"id\":409,\"text\":\"乌拉特中旗\"},{\"id\":410,\"text\":\"乌拉特后旗\"},{\"id\":411,\"text\":\"杭锦后旗\"}]},{\"id\":33,\"text\":\"乌兰察布\",\"zip_code\":\"012000\",\"abridge\":\"WLCB\",\"children\":[{\"id\":412,\"text\":\"集宁区\"},{\"id\":413,\"text\":\"卓资县\"},{\"id\":414,\"text\":\"化德县\"},{\"id\":415,\"text\":\"商都县\"},{\"id\":416,\"text\":\"兴和县\"},{\"id\":417,\"text\":\"凉城县\"},{\"id\":418,\"text\":\"察哈尔右翼前旗\"},{\"id\":419,\"text\":\"察哈尔右翼中旗\"},{\"id\":420,\"text\":\"察哈尔右翼后旗\"},{\"id\":421,\"text\":\"四子王旗\"},{\"id\":422,\"text\":\"丰镇市\"}]},{\"id\":34,\"text\":\"兴安\",\"zip_code\":\"137400\",\"abridge\":\"XA\",\"children\":[{\"id\":423,\"text\":\"乌兰浩特市\"},{\"id\":424,\"text\":\"阿尔山市\"},{\"id\":425,\"text\":\"科尔沁右翼前旗\"},{\"id\":426,\"text\":\"科尔沁右翼中旗\"},{\"id\":427,\"text\":\"扎赉特旗\"},{\"id\":428,\"text\":\"突泉县\"}]},{\"id\":35,\"text\":\"锡林郭勒盟\",\"zip_code\":\"026000\",\"abridge\":\"XLGLM\",\"children\":[{\"id\":429,\"text\":\"二连浩特市\"},{\"id\":430,\"text\":\"锡林浩特市\"},{\"id\":431,\"text\":\"阿巴嘎旗\"},{\"id\":432,\"text\":\"苏尼特左旗\"},{\"id\":433,\"text\":\"苏尼特右旗\"},{\"id\":434,\"text\":\"东乌珠穆沁旗\"},{\"id\":435,\"text\":\"西乌珠穆沁旗\"},{\"id\":436,\"text\":\"太仆寺旗\"},{\"id\":437,\"text\":\"镶黄旗\"},{\"id\":438,\"text\":\"正镶白旗\"},{\"id\":439,\"text\":\"正蓝旗\"},{\"id\":440,\"text\":\"多伦县\"}]},{\"id\":36,\"text\":\"阿拉善盟\",\"zip_code\":\"750306\",\"abridge\":\"ALSM\",\"children\":[{\"id\":441,\"text\":\"阿拉善左旗\"},{\"id\":442,\"text\":\"阿拉善右旗\"},{\"id\":443,\"text\":\"额济纳旗\"}]}]},{\"id\":6,\"text\":\"辽宁\",\"children\":[{\"id\":37,\"text\":\"沈阳\",\"zip_code\":\"110000\",\"abridge\":\"SY\",\"children\":[{\"id\":444,\"text\":\"和平区\"},{\"id\":445,\"text\":\"沈河区\"},{\"id\":446,\"text\":\"大东区\"},{\"id\":447,\"text\":\"皇姑区\"},{\"id\":448,\"text\":\"铁西区\"},{\"id\":449,\"text\":\"苏家屯区\"},{\"id\":450,\"text\":\"东陵区\"},{\"id\":451,\"text\":\"沈北新区\"},{\"id\":452,\"text\":\"于洪区\"},{\"id\":453,\"text\":\"辽中县\"},{\"id\":454,\"text\":\"康平县\"},{\"id\":455,\"text\":\"法库县\"},{\"id\":456,\"text\":\"新民市\"},{\"id\":457,\"text\":\"经济技术开发区\"},{\"id\":458,\"text\":\"浑南新区\"},{\"id\":459,\"text\":\"新城子经济技术开发区\"}]},{\"id\":38,\"text\":\"大连\",\"zip_code\":\"116000\",\"abridge\":\"DL\",\"children\":[{\"id\":460,\"text\":\"中山区\"},{\"id\":461,\"text\":\"西岗区\"},{\"id\":462,\"text\":\"沙河口区\"},{\"id\":463,\"text\":\"甘井子区\"},{\"id\":464,\"text\":\"旅顺口区\"},{\"id\":465,\"text\":\"金州区\"},{\"id\":466,\"text\":\"长海县\"},{\"id\":467,\"text\":\"瓦房店市\"},{\"id\":468,\"text\":\"普兰店市\"},{\"id\":469,\"text\":\"庄河市\"},{\"id\":470,\"text\":\"开发区\"},{\"id\":471,\"text\":\"保税区\"}]},{\"id\":39,\"text\":\"鞍山\",\"zip_code\":\"114000\",\"abridge\":\"AS\",\"children\":[{\"id\":472,\"text\":\"铁东区\"},{\"id\":473,\"text\":\"铁西区\"},{\"id\":474,\"text\":\"立山区\"},{\"id\":475,\"text\":\"千山区\"},{\"id\":476,\"text\":\"台安县\"},{\"id\":477,\"text\":\"岫岩满族自治县\"},{\"id\":478,\"text\":\"海城市\"}]},{\"id\":40,\"text\":\"抚顺\",\"zip_code\":\"113000\",\"abridge\":\"FS\",\"children\":[{\"id\":479,\"text\":\"新抚区\"},{\"id\":480,\"text\":\"东洲区\"},{\"id\":481,\"text\":\"望花区\"},{\"id\":482,\"text\":\"顺城区\"},{\"id\":483,\"text\":\"抚顺县\"},{\"id\":484,\"text\":\"新宾满族自治县\"},{\"id\":485,\"text\":\"清原满族自治县\"}]},{\"id\":41,\"text\":\"本溪\",\"zip_code\":\"117000\",\"abridge\":\"BX\",\"children\":[{\"id\":486,\"text\":\"平山区\"},{\"id\":487,\"text\":\"明山区\"},{\"id\":488,\"text\":\"溪湖区\"},{\"id\":489,\"text\":\"南芬区\"},{\"id\":490,\"text\":\"本溪满族自治县\"},{\"id\":491,\"text\":\"桓仁满族自治县\"}]},{\"id\":42,\"text\":\"丹东\",\"zip_code\":\"118000\",\"abridge\":\"DD\",\"children\":[{\"id\":492,\"text\":\"元宝区\"},{\"id\":493,\"text\":\"振兴区\"},{\"id\":494,\"text\":\"振安区\"},{\"id\":495,\"text\":\"宽甸满族自治县\"},{\"id\":496,\"text\":\"东港市\"},{\"id\":497,\"text\":\"凤城市\"}]},{\"id\":43,\"text\":\"锦州\",\"zip_code\":\"121000\",\"abridge\":\"JZ\",\"children\":[{\"id\":498,\"text\":\"古塔区\"},{\"id\":499,\"text\":\"凌河区\"},{\"id\":500,\"text\":\"太和区\"},{\"id\":501,\"text\":\"黑山县\"},{\"id\":502,\"text\":\"义县\"},{\"id\":503,\"text\":\"凌海市\"},{\"id\":504,\"text\":\"北宁市\"},{\"id\":505,\"text\":\"松山新区\"},{\"id\":506,\"text\":\"经济技术开发区\"}]},{\"id\":44,\"text\":\"营口\",\"zip_code\":\"115000\",\"abridge\":\"YK\",\"children\":[{\"id\":507,\"text\":\"站前区\"},{\"id\":508,\"text\":\"西市区\"},{\"id\":509,\"text\":\"鲅鱼圈区\"},{\"id\":510,\"text\":\"老边区\"},{\"id\":511,\"text\":\"盖州市\"},{\"id\":512,\"text\":\"大石桥市\"}]},{\"id\":45,\"text\":\"阜新\",\"zip_code\":\"123000\",\"abridge\":\"FX\",\"children\":[{\"id\":513,\"text\":\"海州区\"},{\"id\":514,\"text\":\"新邱区\"},{\"id\":515,\"text\":\"太平区\"},{\"id\":516,\"text\":\"清河门区\"},{\"id\":517,\"text\":\"细河区\"},{\"id\":518,\"text\":\"阜新蒙古族自治县\"},{\"id\":519,\"text\":\"彰武县\"}]},{\"id\":46,\"text\":\"辽阳\",\"zip_code\":\"111000\",\"abridge\":\"LL\",\"children\":[{\"id\":520,\"text\":\"白塔区\"},{\"id\":521,\"text\":\"文圣区\"},{\"id\":522,\"text\":\"宏伟区\"},{\"id\":523,\"text\":\"弓长岭区\"},{\"id\":524,\"text\":\"太子河区\"},{\"id\":525,\"text\":\"辽阳县\"},{\"id\":526,\"text\":\"灯塔市\"}]},{\"id\":47,\"text\":\"盘锦\",\"zip_code\":\"124000\",\"abridge\":\"PJ\",\"children\":[{\"id\":527,\"text\":\"双台子区\"},{\"id\":528,\"text\":\"兴隆台区\"},{\"id\":529,\"text\":\"大洼县\"},{\"id\":530,\"text\":\"盘山县\"}]},{\"id\":48,\"text\":\"铁岭\",\"zip_code\":\"112000\",\"abridge\":\"TL\",\"children\":[{\"id\":531,\"text\":\"银州区\"},{\"id\":532,\"text\":\"清河区\"},{\"id\":533,\"text\":\"铁岭县\"},{\"id\":534,\"text\":\"西丰县\"},{\"id\":535,\"text\":\"昌图县\"},{\"id\":536,\"text\":\"调兵山市\"},{\"id\":537,\"text\":\"开原市\"}]},{\"id\":49,\"text\":\"朝阳\",\"zip_code\":\"100020\",\"abridge\":\"CY\",\"children\":[{\"id\":538,\"text\":\"双塔区\"},{\"id\":539,\"text\":\"龙城区\"},{\"id\":540,\"text\":\"朝阳县\"},{\"id\":541,\"text\":\"建平县\"},{\"id\":542,\"text\":\"喀喇沁左翼蒙古族自治县\"},{\"id\":543,\"text\":\"北票市\"},{\"id\":544,\"text\":\"凌源市\"}]},{\"id\":50,\"text\":\"葫芦岛\",\"zip_code\":\"125000\",\"abridge\":\"HLD\",\"children\":[{\"id\":545,\"text\":\"连山区\"},{\"id\":546,\"text\":\"龙港区\"},{\"id\":547,\"text\":\"南票区\"},{\"id\":548,\"text\":\"绥中县\"},{\"id\":549,\"text\":\"建昌县\"},{\"id\":550,\"text\":\"兴城市\"}]}]},{\"id\":7,\"text\":\"吉林\",\"children\":[{\"id\":51,\"text\":\"长春\",\"zip_code\":\"130000\",\"abridge\":\"CC\",\"children\":[{\"id\":551,\"text\":\"南关区\"},{\"id\":552,\"text\":\"宽城区\"},{\"id\":553,\"text\":\"朝阳区\"},{\"id\":554,\"text\":\"二道区\"},{\"id\":555,\"text\":\"绿园区\"},{\"id\":556,\"text\":\"双阳区\"},{\"id\":557,\"text\":\"农安县\"},{\"id\":558,\"text\":\"九台市\"},{\"id\":559,\"text\":\"榆树市\"},{\"id\":560,\"text\":\"德惠市\"},{\"id\":561,\"text\":\"净月经济开发区\"},{\"id\":562,\"text\":\"高新技术产业开发区\"},{\"id\":563,\"text\":\"经济技术开发区\"}]},{\"id\":52,\"text\":\"吉林\",\"zip_code\":\"132000\",\"abridge\":\"JL\",\"children\":[{\"id\":564,\"text\":\"昌邑区\"},{\"id\":565,\"text\":\"龙潭区\"},{\"id\":566,\"text\":\"船营区\"},{\"id\":567,\"text\":\"丰满区\"},{\"id\":568,\"text\":\"永吉县\"},{\"id\":569,\"text\":\"蛟河市\"},{\"id\":570,\"text\":\"桦甸市\"},{\"id\":571,\"text\":\"舒兰市\"},{\"id\":572,\"text\":\"磐石市\"}]},{\"id\":53,\"text\":\"四平\",\"zip_code\":\"136000\",\"abridge\":\"SP\",\"children\":[{\"id\":573,\"text\":\"铁西区\"},{\"id\":574,\"text\":\"铁东区\"},{\"id\":575,\"text\":\"梨树县\"},{\"id\":576,\"text\":\"伊通满族自治县\"},{\"id\":577,\"text\":\"公主岭市\"},{\"id\":578,\"text\":\"双辽市\"}]},{\"id\":54,\"text\":\"辽源\",\"zip_code\":\"136200\",\"abridge\":\"LY\",\"children\":[{\"id\":579,\"text\":\"龙山区\"},{\"id\":580,\"text\":\"西安区\"},{\"id\":581,\"text\":\"东丰县\"},{\"id\":582,\"text\":\"东辽县\"}]},{\"id\":55,\"text\":\"通化\",\"zip_code\":\"134000\",\"abridge\":\"TH\",\"children\":[{\"id\":583,\"text\":\"东昌区\"},{\"id\":584,\"text\":\"二道江区\"},{\"id\":585,\"text\":\"通化县\"},{\"id\":586,\"text\":\"辉南县\"},{\"id\":587,\"text\":\"柳河县\"},{\"id\":588,\"text\":\"梅河口市\"},{\"id\":589,\"text\":\"集安市\"}]},{\"id\":56,\"text\":\"白山\",\"zip_code\":\"134300\",\"abridge\":\"BS\",\"children\":[{\"id\":590,\"text\":\"八道江区\"},{\"id\":591,\"text\":\"抚松县\"},{\"id\":592,\"text\":\"靖宇县\"},{\"id\":593,\"text\":\"长白朝鲜族自治县\"},{\"id\":594,\"text\":\"江源县\"},{\"id\":595,\"text\":\"临江市\"}]},{\"id\":57,\"text\":\"松原\",\"zip_code\":\"138000\",\"abridge\":\"SY\",\"children\":[{\"id\":596,\"text\":\"宁江区\"},{\"id\":597,\"text\":\"前郭尔罗斯蒙古族自治县\"},{\"id\":598,\"text\":\"长岭县\"},{\"id\":599,\"text\":\"乾安县\"},{\"id\":600,\"text\":\"扶余县\"}]},{\"id\":58,\"text\":\"白城\",\"zip_code\":\"137000\",\"abridge\":\"BC\",\"children\":[{\"id\":601,\"text\":\"洮北区\"},{\"id\":602,\"text\":\"镇赉县\"},{\"id\":603,\"text\":\"通榆县\"},{\"id\":604,\"text\":\"洮南市\"},{\"id\":605,\"text\":\"大安市\"}]},{\"id\":59,\"text\":\"延边\",\"zip_code\":\"133000\",\"abridge\":\"YB\",\"children\":[{\"id\":606,\"text\":\"延吉市\"},{\"id\":607,\"text\":\"图们市\"},{\"id\":608,\"text\":\"敦化市\"},{\"id\":609,\"text\":\"珲春市\"},{\"id\":610,\"text\":\"龙井市\"},{\"id\":611,\"text\":\"和龙市\"},{\"id\":612,\"text\":\"汪清县\"},{\"id\":613,\"text\":\"安图县\"}]}]},{\"id\":8,\"text\":\"黑龙江\",\"children\":[{\"id\":60,\"text\":\"哈尔滨\",\"zip_code\":\"150000\",\"abridge\":\"HRB\",\"children\":[{\"id\":614,\"text\":\"道里区\"},{\"id\":615,\"text\":\"南岗区\"},{\"id\":616,\"text\":\"道外区\"},{\"id\":617,\"text\":\"香坊区\"},{\"id\":618,\"text\":\"动力区\"},{\"id\":619,\"text\":\"平房区\"},{\"id\":620,\"text\":\"松北区\"},{\"id\":621,\"text\":\"呼兰区\"},{\"id\":622,\"text\":\"依兰县\"},{\"id\":623,\"text\":\"方正县\"},{\"id\":624,\"text\":\"宾县\"},{\"id\":625,\"text\":\"巴彦县\"},{\"id\":626,\"text\":\"木兰县\"},{\"id\":627,\"text\":\"通河县\"},{\"id\":628,\"text\":\"延寿县\"},{\"id\":629,\"text\":\"阿城市\"},{\"id\":630,\"text\":\"双城市\"},{\"id\":631,\"text\":\"尚志市\"},{\"id\":632,\"text\":\"五常市\"}]},{\"id\":61,\"text\":\"齐齐哈尔\",\"zip_code\":\"161000\",\"abridge\":\"QQHR\",\"children\":[{\"id\":633,\"text\":\"龙沙区\"},{\"id\":634,\"text\":\"建华区\"},{\"id\":635,\"text\":\"铁锋区\"},{\"id\":636,\"text\":\"昂昂溪区\"},{\"id\":637,\"text\":\"富拉尔基区\"},{\"id\":638,\"text\":\"碾子山区\"},{\"id\":639,\"text\":\"梅里斯达斡尔族区\"},{\"id\":640,\"text\":\"龙江县\"},{\"id\":641,\"text\":\"依安县\"},{\"id\":642,\"text\":\"泰来县\"},{\"id\":643,\"text\":\"甘南县\"},{\"id\":644,\"text\":\"富裕县\"},{\"id\":645,\"text\":\"克山县\"},{\"id\":646,\"text\":\"克东县\"},{\"id\":647,\"text\":\"拜泉县\"},{\"id\":648,\"text\":\"讷河市\"}]},{\"id\":62,\"text\":\"鸡西\",\"zip_code\":\"158100\",\"abridge\":\"JX\",\"children\":[{\"id\":649,\"text\":\"鸡冠区\"},{\"id\":650,\"text\":\"恒山区\"},{\"id\":651,\"text\":\"滴道区\"},{\"id\":652,\"text\":\"梨树区\"},{\"id\":653,\"text\":\"城子河区\"},{\"id\":654,\"text\":\"麻山区\"},{\"id\":655,\"text\":\"鸡东县\"},{\"id\":656,\"text\":\"虎林市\"},{\"id\":657,\"text\":\"密山市\"}]},{\"id\":63,\"text\":\"鹤岗\",\"zip_code\":\"154100\",\"abridge\":\"HG\",\"children\":[{\"id\":658,\"text\":\"向阳区\"},{\"id\":659,\"text\":\"工农区\"},{\"id\":660,\"text\":\"南山区\"},{\"id\":661,\"text\":\"兴安区\"},{\"id\":662,\"text\":\"东山区\"},{\"id\":663,\"text\":\"兴山区\"},{\"id\":664,\"text\":\"萝北县\"},{\"id\":665,\"text\":\"绥滨县\"}]},{\"id\":64,\"text\":\"双鸭山\",\"zip_code\":\"155100\",\"abridge\":\"SYS\",\"children\":[{\"id\":666,\"text\":\"尖山区\"},{\"id\":667,\"text\":\"岭东区\"},{\"id\":668,\"text\":\"四方台区\"},{\"id\":669,\"text\":\"宝山区\"},{\"id\":670,\"text\":\"集贤县\"},{\"id\":671,\"text\":\"友谊县\"},{\"id\":672,\"text\":\"宝清县\"},{\"id\":673,\"text\":\"饶河县\"}]},{\"id\":65,\"text\":\"大庆\",\"zip_code\":\"163000\",\"abridge\":\"DQ\",\"children\":[{\"id\":674,\"text\":\"萨尔图区\"},{\"id\":675,\"text\":\"龙凤区\"},{\"id\":676,\"text\":\"让胡路区\"},{\"id\":677,\"text\":\"红岗区\"},{\"id\":678,\"text\":\"大同区\"},{\"id\":679,\"text\":\"肇州县\"},{\"id\":680,\"text\":\"肇源县\"},{\"id\":681,\"text\":\"林甸县\"},{\"id\":682,\"text\":\"杜尔伯特蒙古族自治县\"}]},{\"id\":66,\"text\":\"伊春\",\"zip_code\":\"153000\",\"abridge\":\"YC\",\"children\":[{\"id\":683,\"text\":\"伊春区\"},{\"id\":684,\"text\":\"南岔区\"},{\"id\":685,\"text\":\"友好区\"},{\"id\":686,\"text\":\"西林区\"},{\"id\":687,\"text\":\"翠峦区\"},{\"id\":688,\"text\":\"新青区\"},{\"id\":689,\"text\":\"美溪区\"},{\"id\":690,\"text\":\"金山屯区\"},{\"id\":691,\"text\":\"五营区\"},{\"id\":692,\"text\":\"乌马河区\"},{\"id\":693,\"text\":\"汤旺河区\"},{\"id\":694,\"text\":\"带岭区\"},{\"id\":695,\"text\":\"乌伊岭区\"},{\"id\":696,\"text\":\"红星区\"},{\"id\":697,\"text\":\"上甘岭区\"},{\"id\":698,\"text\":\"嘉荫县\"},{\"id\":699,\"text\":\"铁力市\"}]},{\"id\":67,\"text\":\"佳木斯\",\"zip_code\":\"154000\",\"abridge\":\"JMS\",\"children\":[{\"id\":700,\"text\":\"向阳区\"},{\"id\":701,\"text\":\"前进区\"},{\"id\":702,\"text\":\"东风区\"},{\"id\":703,\"text\":\"郊区\"},{\"id\":704,\"text\":\"桦南县\"},{\"id\":705,\"text\":\"桦川县\"},{\"id\":706,\"text\":\"汤原县\"},{\"id\":707,\"text\":\"抚远县\"},{\"id\":708,\"text\":\"同江市\"},{\"id\":709,\"text\":\"富锦市\"}]},{\"id\":68,\"text\":\"七台河\",\"zip_code\":\"154600\",\"abridge\":\"QTH\",\"children\":[{\"id\":710,\"text\":\"新兴区\"},{\"id\":711,\"text\":\"桃山区\"},{\"id\":712,\"text\":\"茄子河区\"},{\"id\":713,\"text\":\"勃利县\"}]},{\"id\":69,\"text\":\"牡丹江\",\"zip_code\":\"157000\",\"abridge\":\"MDJ\",\"children\":[{\"id\":714,\"text\":\"东安区\"},{\"id\":715,\"text\":\"爱民区\"},{\"id\":716,\"text\":\"阳明区\"},{\"id\":717,\"text\":\"西安区\"},{\"id\":718,\"text\":\"东宁县\"},{\"id\":719,\"text\":\"林口县\"},{\"id\":720,\"text\":\"绥芬河市\"},{\"id\":721,\"text\":\"海林市\"},{\"id\":722,\"text\":\"宁安市\"},{\"id\":723,\"text\":\"穆棱市\"}]},{\"id\":70,\"text\":\"黑河\",\"zip_code\":\"164300\",\"abridge\":\"HH\",\"children\":[{\"id\":724,\"text\":\"爱辉区\"},{\"id\":725,\"text\":\"嫩江县\"},{\"id\":726,\"text\":\"逊克县\"},{\"id\":727,\"text\":\"孙吴县\"},{\"id\":728,\"text\":\"北安市\"},{\"id\":729,\"text\":\"五大连池市\"}]},{\"id\":71,\"text\":\"绥化\",\"zip_code\":\"152000\",\"abridge\":\"SH\",\"children\":[{\"id\":730,\"text\":\"北林区\"},{\"id\":731,\"text\":\"望奎县\"},{\"id\":732,\"text\":\"兰西县\"},{\"id\":733,\"text\":\"青冈县\"},{\"id\":734,\"text\":\"庆安县\"},{\"id\":735,\"text\":\"明水县\"},{\"id\":736,\"text\":\"绥棱县\"},{\"id\":737,\"text\":\"安达市\"},{\"id\":738,\"text\":\"肇东市\"},{\"id\":739,\"text\":\"海伦市\"}]},{\"id\":72,\"text\":\"大兴安岭\",\"zip_code\":\"165000\",\"abridge\":\"DXAL\",\"children\":[{\"id\":740,\"text\":\"呼玛县\"},{\"id\":741,\"text\":\"塔河县\"},{\"id\":742,\"text\":\"漠河县\"},{\"id\":743,\"text\":\"加格达奇区\"},{\"id\":744,\"text\":\"松岭区\"},{\"id\":745,\"text\":\"新林区\"},{\"id\":746,\"text\":\"呼中区\"}]}]},{\"id\":9,\"text\":\"上海\",\"children\":[{\"id\":73,\"text\":\"上海\",\"zip_code\":\"200000\",\"abridge\":\"SH\",\"children\":[{\"id\":747,\"text\":\"黄浦区\"},{\"id\":748,\"text\":\"卢湾区\"},{\"id\":749,\"text\":\"徐汇区\"},{\"id\":750,\"text\":\"长宁区\"},{\"id\":751,\"text\":\"静安区\"},{\"id\":752,\"text\":\"普陀区\"},{\"id\":753,\"text\":\"闸北区\"},{\"id\":754,\"text\":\"虹口区\"},{\"id\":755,\"text\":\"杨浦区\"},{\"id\":756,\"text\":\"闵行区\"},{\"id\":757,\"text\":\"宝山区\"},{\"id\":758,\"text\":\"嘉定区\"},{\"id\":759,\"text\":\"浦东新区\"},{\"id\":760,\"text\":\"金山区\"},{\"id\":761,\"text\":\"松江区\"},{\"id\":762,\"text\":\"青浦区\"},{\"id\":763,\"text\":\"南汇区\"},{\"id\":764,\"text\":\"奉贤区\"},{\"id\":765,\"text\":\"崇明县\"}]}]},{\"id\":10,\"text\":\"江苏\",\"children\":[{\"id\":74,\"text\":\"南京\",\"zip_code\":\"210000\",\"abridge\":\"NJ\",\"children\":[{\"id\":766,\"text\":\"玄武区\"},{\"id\":767,\"text\":\"白下区\"},{\"id\":768,\"text\":\"秦淮区\"},{\"id\":769,\"text\":\"建邺区\"},{\"id\":770,\"text\":\"鼓楼区\"},{\"id\":771,\"text\":\"下关区\"},{\"id\":772,\"text\":\"浦口区\"},{\"id\":773,\"text\":\"栖霞区\"},{\"id\":774,\"text\":\"雨花台区\"},{\"id\":775,\"text\":\"江宁区\"},{\"id\":776,\"text\":\"六合区\"},{\"id\":777,\"text\":\"溧水县\"},{\"id\":778,\"text\":\"高淳县\"}]},{\"id\":75,\"text\":\"无锡\",\"zip_code\":\"214000\",\"abridge\":\"WX\",\"children\":[{\"id\":779,\"text\":\"崇安区\"},{\"id\":780,\"text\":\"南长区\"},{\"id\":781,\"text\":\"北塘区\"},{\"id\":782,\"text\":\"锡山区\"},{\"id\":783,\"text\":\"惠山区\"},{\"id\":784,\"text\":\"滨湖区\"},{\"id\":785,\"text\":\"江阴市\"},{\"id\":786,\"text\":\"宜兴市\"},{\"id\":787,\"text\":\"新区\"}]},{\"id\":76,\"text\":\"徐州\",\"zip_code\":\"221000\",\"abridge\":\"XZ\",\"children\":[{\"id\":788,\"text\":\"云龙区\"},{\"id\":789,\"text\":\"鼓楼区\"},{\"id\":790,\"text\":\"九里区\"},{\"id\":791,\"text\":\"泉山区\"},{\"id\":792,\"text\":\"铜山县\"},{\"id\":793,\"text\":\"贾汪区\"},{\"id\":794,\"text\":\"丰县\"},{\"id\":795,\"text\":\"沛县\"},{\"id\":796,\"text\":\"睢宁县\"},{\"id\":797,\"text\":\"新沂市\"},{\"id\":798,\"text\":\"邳州市\"}]},{\"id\":77,\"text\":\"常州\",\"zip_code\":\"213000\",\"abridge\":\"CZ\",\"children\":[{\"id\":799,\"text\":\"天宁区\"},{\"id\":800,\"text\":\"钟楼区\"},{\"id\":801,\"text\":\"戚墅堰区\"},{\"id\":802,\"text\":\"新北区\"},{\"id\":803,\"text\":\"武进区\"},{\"id\":804,\"text\":\"溧阳市\"},{\"id\":805,\"text\":\"金坛市\"}]},{\"id\":78,\"text\":\"苏州\",\"zip_code\":\"215000\",\"abridge\":\"SZ\",\"children\":[{\"id\":806,\"text\":\"沧浪区\"},{\"id\":807,\"text\":\"平江区\"},{\"id\":808,\"text\":\"金阊区\"},{\"id\":809,\"text\":\"虎丘区\"},{\"id\":810,\"text\":\"吴中区\"},{\"id\":811,\"text\":\"相城区\"},{\"id\":812,\"text\":\"常熟市\"},{\"id\":813,\"text\":\"张家港市\"},{\"id\":814,\"text\":\"昆山市\"},{\"id\":815,\"text\":\"吴江市\"},{\"id\":816,\"text\":\"太仓市\"},{\"id\":817,\"text\":\"工业园区\"},{\"id\":818,\"text\":\"高新区\"}]},{\"id\":79,\"text\":\"南通\",\"zip_code\":\"226000\",\"abridge\":\"NT\",\"children\":[{\"id\":819,\"text\":\"崇川区\"},{\"id\":820,\"text\":\"港闸区\"},{\"id\":821,\"text\":\"海安县\"},{\"id\":822,\"text\":\"如东县\"},{\"id\":823,\"text\":\"启东市\"},{\"id\":824,\"text\":\"如皋市\"},{\"id\":825,\"text\":\"通州市\"},{\"id\":826,\"text\":\"海门市\"},{\"id\":827,\"text\":\"经济技术开发区\"}]},{\"id\":80,\"text\":\"连云港\",\"zip_code\":\"222000\",\"abridge\":\"LYG\",\"children\":[{\"id\":828,\"text\":\"连云区\"},{\"id\":829,\"text\":\"新浦区\"},{\"id\":830,\"text\":\"海州区\"},{\"id\":831,\"text\":\"赣榆县\"},{\"id\":832,\"text\":\"东海县\"},{\"id\":833,\"text\":\"灌云县\"},{\"id\":834,\"text\":\"灌南县\"}]},{\"id\":81,\"text\":\"淮安\",\"zip_code\":\"223001\",\"abridge\":\"HA\",\"children\":[{\"id\":835,\"text\":\"清河区\"},{\"id\":836,\"text\":\"楚州区\"},{\"id\":837,\"text\":\"淮阴区\"},{\"id\":838,\"text\":\"清浦区\"},{\"id\":839,\"text\":\"涟水县\"},{\"id\":840,\"text\":\"洪泽县\"},{\"id\":841,\"text\":\"盱眙县\"},{\"id\":842,\"text\":\"金湖县\"}]},{\"id\":82,\"text\":\"盐城\",\"zip_code\":\"224000\",\"abridge\":\"YC\",\"children\":[{\"id\":843,\"text\":\"亭湖区\"},{\"id\":844,\"text\":\"盐都区\"},{\"id\":845,\"text\":\"响水县\"},{\"id\":846,\"text\":\"滨海县\"},{\"id\":847,\"text\":\"阜宁县\"},{\"id\":848,\"text\":\"射阳县\"},{\"id\":849,\"text\":\"建湖县\"},{\"id\":850,\"text\":\"东台市\"},{\"id\":851,\"text\":\"大丰市\"}]},{\"id\":83,\"text\":\"扬州\",\"zip_code\":\"225000\",\"abridge\":\"YZ\",\"children\":[{\"id\":852,\"text\":\"广陵区\"},{\"id\":853,\"text\":\"邗江区\"},{\"id\":854,\"text\":\"宝应县\"},{\"id\":855,\"text\":\"仪征市\"},{\"id\":856,\"text\":\"高邮市\"},{\"id\":857,\"text\":\"江都市\"},{\"id\":858,\"text\":\"维扬区\"},{\"id\":859,\"text\":\"经济开发区\"}]},{\"id\":84,\"text\":\"镇江\",\"zip_code\":\"212000\",\"abridge\":\"ZJ\",\"children\":[{\"id\":860,\"text\":\"京口区\"},{\"id\":861,\"text\":\"润州区\"},{\"id\":862,\"text\":\"丹徒区\"},{\"id\":863,\"text\":\"丹阳市\"},{\"id\":864,\"text\":\"扬中市\"},{\"id\":865,\"text\":\"句容市\"},{\"id\":866,\"text\":\"新区\"}]},{\"id\":85,\"text\":\"泰州\",\"zip_code\":\"225300\",\"abridge\":\"TZ\",\"children\":[{\"id\":867,\"text\":\"海陵区\"},{\"id\":868,\"text\":\"高港区\"},{\"id\":869,\"text\":\"兴化市\"},{\"id\":870,\"text\":\"靖江市\"},{\"id\":871,\"text\":\"泰兴市\"},{\"id\":872,\"text\":\"姜堰市\"}]},{\"id\":86,\"text\":\"宿迁\",\"zip_code\":\"223800\",\"abridge\":\"SQ\",\"children\":[{\"id\":873,\"text\":\"宿城区\"},{\"id\":874,\"text\":\"宿豫区\"},{\"id\":875,\"text\":\"沭阳县\"},{\"id\":876,\"text\":\"泗阳县\"},{\"id\":877,\"text\":\"泗洪县\"}]}]},{\"id\":11,\"text\":\"浙江\",\"children\":[{\"id\":87,\"text\":\"杭州\",\"zip_code\":\"310000\",\"abridge\":\"HZ\",\"children\":[{\"id\":878,\"text\":\"上城区\"},{\"id\":879,\"text\":\"下城区\"},{\"id\":880,\"text\":\"江干区\"},{\"id\":881,\"text\":\"拱墅区\"},{\"id\":882,\"text\":\"西湖区\"},{\"id\":883,\"text\":\"滨江区\"},{\"id\":884,\"text\":\"萧山区\"},{\"id\":885,\"text\":\"余杭区\"},{\"id\":886,\"text\":\"桐庐县\"},{\"id\":887,\"text\":\"淳安县\"},{\"id\":888,\"text\":\"建德市\"},{\"id\":889,\"text\":\"富阳市\"},{\"id\":890,\"text\":\"临安市\"}]},{\"id\":88,\"text\":\"宁波\",\"zip_code\":\"315000\",\"abridge\":\"NB\",\"children\":[{\"id\":891,\"text\":\"海曙区\"},{\"id\":892,\"text\":\"江东区\"},{\"id\":893,\"text\":\"江北区\"},{\"id\":894,\"text\":\"北仑区\"},{\"id\":895,\"text\":\"镇海区\"},{\"id\":896,\"text\":\"鄞州区\"},{\"id\":897,\"text\":\"象山县\"},{\"id\":898,\"text\":\"宁海县\"},{\"id\":899,\"text\":\"余姚市\"},{\"id\":900,\"text\":\"慈溪市\"},{\"id\":901,\"text\":\"奉化市\"}]},{\"id\":89,\"text\":\"温州\",\"zip_code\":\"325000\",\"abridge\":\"WZ\",\"children\":[{\"id\":902,\"text\":\"鹿城区\"},{\"id\":903,\"text\":\"龙湾区\"},{\"id\":904,\"text\":\"瓯海区\"},{\"id\":905,\"text\":\"洞头县\"},{\"id\":906,\"text\":\"永嘉县\"},{\"id\":907,\"text\":\"平阳县\"},{\"id\":908,\"text\":\"苍南县\"},{\"id\":909,\"text\":\"文成县\"},{\"id\":910,\"text\":\"泰顺县\"},{\"id\":911,\"text\":\"瑞安市\"},{\"id\":912,\"text\":\"乐清市\"}]},{\"id\":90,\"text\":\"嘉兴\",\"zip_code\":\"314000\",\"abridge\":\"JX\",\"children\":[{\"id\":913,\"text\":\"秀洲区\"},{\"id\":914,\"text\":\"嘉善县\"},{\"id\":915,\"text\":\"海盐县\"},{\"id\":916,\"text\":\"海宁市\"},{\"id\":917,\"text\":\"平湖市\"},{\"id\":918,\"text\":\"桐乡市\"},{\"id\":919,\"text\":\"南湖区\"}]},{\"id\":91,\"text\":\"湖州\",\"zip_code\":\"313000\",\"abridge\":\"HZ\",\"children\":[{\"id\":920,\"text\":\"吴兴区\"},{\"id\":921,\"text\":\"南浔区\"},{\"id\":922,\"text\":\"德清县\"},{\"id\":923,\"text\":\"长兴县\"},{\"id\":924,\"text\":\"安吉县\"}]},{\"id\":92,\"text\":\"绍兴\",\"zip_code\":\"312000\",\"abridge\":\"SX\",\"children\":[{\"id\":925,\"text\":\"越城区\"},{\"id\":926,\"text\":\"绍兴县\"},{\"id\":927,\"text\":\"新昌县\"},{\"id\":928,\"text\":\"诸暨市\"},{\"id\":929,\"text\":\"上虞市\"},{\"id\":930,\"text\":\"嵊州市\"}]},{\"id\":93,\"text\":\"金华\",\"zip_code\":\"321000\",\"abridge\":\"JH\",\"children\":[{\"id\":931,\"text\":\"婺城区\"},{\"id\":932,\"text\":\"金东区\"},{\"id\":933,\"text\":\"武义县\"},{\"id\":934,\"text\":\"浦江县\"},{\"id\":935,\"text\":\"磐安县\"},{\"id\":936,\"text\":\"兰溪市\"},{\"id\":937,\"text\":\"义乌市\"},{\"id\":938,\"text\":\"东阳市\"},{\"id\":939,\"text\":\"永康市\"}]},{\"id\":94,\"text\":\"衢州\",\"zip_code\":\"324000\",\"abridge\":\"QZ\",\"children\":[{\"id\":940,\"text\":\"柯城区\"},{\"id\":941,\"text\":\"衢江区\"},{\"id\":942,\"text\":\"常山县\"},{\"id\":943,\"text\":\"开化县\"},{\"id\":944,\"text\":\"龙游县\"},{\"id\":945,\"text\":\"江山市\"}]},{\"id\":95,\"text\":\"舟山\",\"zip_code\":\"316000\",\"abridge\":\"ZS\",\"children\":[{\"id\":946,\"text\":\"定海区\"},{\"id\":947,\"text\":\"普陀区\"},{\"id\":948,\"text\":\"岱山县\"},{\"id\":949,\"text\":\"嵊泗县\"}]},{\"id\":96,\"text\":\"台州\",\"zip_code\":\"318000\",\"abridge\":\"TZ\",\"children\":[{\"id\":950,\"text\":\"椒江区\"},{\"id\":951,\"text\":\"路桥区\"},{\"id\":952,\"text\":\"黄岩区\"},{\"id\":953,\"text\":\"玉环县\"},{\"id\":954,\"text\":\"三门县\"},{\"id\":955,\"text\":\"天台县\"},{\"id\":956,\"text\":\"仙居县\"},{\"id\":957,\"text\":\"温岭市\"},{\"id\":958,\"text\":\"临海市\"}]},{\"id\":97,\"text\":\"丽水\",\"zip_code\":\"323000\",\"abridge\":\"LS\",\"children\":[{\"id\":959,\"text\":\"莲都区\"},{\"id\":960,\"text\":\"青田县\"},{\"id\":961,\"text\":\"缙云县\"},{\"id\":962,\"text\":\"遂昌县\"},{\"id\":963,\"text\":\"松阳县\"},{\"id\":964,\"text\":\"云和县\"},{\"id\":965,\"text\":\"庆元县\"},{\"id\":966,\"text\":\"景宁畲族自治县\"},{\"id\":967,\"text\":\"龙泉市\"}]}]},{\"id\":12,\"text\":\"安徽\",\"children\":[{\"id\":98,\"text\":\"合肥\",\"zip_code\":\"230000\",\"abridge\":\"HF\",\"children\":[{\"id\":968,\"text\":\"瑶海区\"},{\"id\":969,\"text\":\"庐阳区\"},{\"id\":970,\"text\":\"蜀山区\"},{\"id\":971,\"text\":\"包河区\"},{\"id\":972,\"text\":\"长丰县\"},{\"id\":973,\"text\":\"肥东县\"},{\"id\":974,\"text\":\"肥西县\"},{\"id\":975,\"text\":\"经济技术开发区\"},{\"id\":976,\"text\":\"新站试验区\"},{\"id\":977,\"text\":\"政务文化新区\"},{\"id\":978,\"text\":\"高新技术产业开发区\"}]},{\"id\":99,\"text\":\"芜湖\",\"zip_code\":\"241000\",\"abridge\":\"WH\",\"children\":[{\"id\":979,\"text\":\"镜湖区\"},{\"id\":980,\"text\":\"鸠江区\"},{\"id\":981,\"text\":\"芜湖县\"},{\"id\":982,\"text\":\"繁昌县\"},{\"id\":983,\"text\":\"南陵县\"},{\"id\":984,\"text\":\"弋江区\"},{\"id\":985,\"text\":\"三山区\"}]},{\"id\":100,\"text\":\"蚌埠\",\"zip_code\":\"233000\",\"abridge\":\"BB\",\"children\":[{\"id\":986,\"text\":\"龙子湖区\"},{\"id\":987,\"text\":\"蚌山区\"},{\"id\":988,\"text\":\"禹会区\"},{\"id\":989,\"text\":\"淮上区\"},{\"id\":990,\"text\":\"怀远县\"},{\"id\":991,\"text\":\"五河县\"},{\"id\":992,\"text\":\"固镇县\"}]},{\"id\":101,\"text\":\"淮南\",\"zip_code\":\"232000\",\"abridge\":\"HN\",\"children\":[{\"id\":993,\"text\":\"大通区\"},{\"id\":994,\"text\":\"田家庵区\"},{\"id\":995,\"text\":\"谢家集区\"},{\"id\":996,\"text\":\"八公山区\"},{\"id\":997,\"text\":\"潘集区\"},{\"id\":998,\"text\":\"凤台县\"}]},{\"id\":102,\"text\":\"马鞍山\",\"zip_code\":\"243000\",\"abridge\":\"MAS\",\"children\":[{\"id\":999,\"text\":\"雨山区\"},{\"id\":1000,\"text\":\"花山区\"},{\"id\":1001,\"text\":\"金家庄区\"},{\"id\":1002,\"text\":\"当涂县\"},{\"id\":1003,\"text\":\"经济技术开发区\"}]},{\"id\":103,\"text\":\"淮北\",\"zip_code\":\"235000\",\"abridge\":\"HB\",\"children\":[{\"id\":1004,\"text\":\"杜集区\"},{\"id\":1005,\"text\":\"相山区\"},{\"id\":1006,\"text\":\"烈山区\"},{\"id\":1007,\"text\":\"濉溪县\"}]},{\"id\":104,\"text\":\"铜陵\",\"zip_code\":\"244000\",\"abridge\":\"TL\",\"children\":[{\"id\":1008,\"text\":\"铜官山区\"},{\"id\":1009,\"text\":\"狮子山区\"},{\"id\":1010,\"text\":\"郊区\"},{\"id\":1011,\"text\":\"铜陵县\"}]},{\"id\":105,\"text\":\"安庆\",\"zip_code\":\"246000\",\"abridge\":\"AQ\",\"children\":[{\"id\":1012,\"text\":\"迎江区\"},{\"id\":1013,\"text\":\"大观区\"},{\"id\":1014,\"text\":\"怀宁县\"},{\"id\":1015,\"text\":\"枞阳县\"},{\"id\":1016,\"text\":\"潜山县\"},{\"id\":1017,\"text\":\"太湖县\"},{\"id\":1018,\"text\":\"宿松县\"},{\"id\":1019,\"text\":\"望江县\"},{\"id\":1020,\"text\":\"岳西县\"},{\"id\":1021,\"text\":\"桐城市\"},{\"id\":1022,\"text\":\"宜秀区\"}]},{\"id\":106,\"text\":\"黄山\",\"zip_code\":\"242700\",\"abridge\":\"HS\",\"children\":[{\"id\":1023,\"text\":\"屯溪区\"},{\"id\":1024,\"text\":\"黄山区\"},{\"id\":1025,\"text\":\"徽州区\"},{\"id\":1026,\"text\":\"歙县\"},{\"id\":1027,\"text\":\"休宁县\"},{\"id\":1028,\"text\":\"黟县\"},{\"id\":1029,\"text\":\"祁门县\"}]},{\"id\":107,\"text\":\"滁州\",\"zip_code\":\"239000\",\"abridge\":\"CZ\",\"children\":[{\"id\":1030,\"text\":\"琅琊区\"},{\"id\":1031,\"text\":\"南谯区\"},{\"id\":1032,\"text\":\"来安县\"},{\"id\":1033,\"text\":\"全椒县\"},{\"id\":1034,\"text\":\"定远县\"},{\"id\":1035,\"text\":\"凤阳县\"},{\"id\":1036,\"text\":\"天长市\"},{\"id\":1037,\"text\":\"明光市\"}]},{\"id\":108,\"text\":\"阜阳\",\"zip_code\":\"236000\",\"abridge\":\"FY\",\"children\":[{\"id\":1038,\"text\":\"颍州区\"},{\"id\":1039,\"text\":\"颍东区\"},{\"id\":1040,\"text\":\"颍泉区\"},{\"id\":1041,\"text\":\"临泉县\"},{\"id\":1042,\"text\":\"太和县\"},{\"id\":1043,\"text\":\"阜南县\"},{\"id\":1044,\"text\":\"颍上县\"},{\"id\":1045,\"text\":\"界首市\"},{\"id\":1046,\"text\":\"经济开发区\"}]},{\"id\":109,\"text\":\"宿州\",\"zip_code\":\"234000\",\"abridge\":\"SZ\",\"children\":[{\"id\":1047,\"text\":\"埇桥区\"},{\"id\":1048,\"text\":\"砀山县\"},{\"id\":1049,\"text\":\"萧县\"},{\"id\":1050,\"text\":\"灵璧县\"},{\"id\":1051,\"text\":\"泗县\"}]},{\"id\":110,\"text\":\"巢湖\",\"zip_code\":\"238000\",\"abridge\":\"CH\",\"children\":[{\"id\":1052,\"text\":\"居巢区\"},{\"id\":1053,\"text\":\"庐江县\"},{\"id\":1054,\"text\":\"无为县\"},{\"id\":1055,\"text\":\"含山县\"},{\"id\":1056,\"text\":\"和县\"}]},{\"id\":111,\"text\":\"六安\",\"zip_code\":\"237000\",\"abridge\":\"LA\",\"children\":[{\"id\":1057,\"text\":\"金安区\"},{\"id\":1058,\"text\":\"裕安区\"},{\"id\":1059,\"text\":\"寿县\"},{\"id\":1060,\"text\":\"霍邱县\"},{\"id\":1061,\"text\":\"舒城县\"},{\"id\":1062,\"text\":\"金寨县\"},{\"id\":1063,\"text\":\"霍山县\"}]},{\"id\":112,\"text\":\"亳州\",\"zip_code\":\"236000\",\"abridge\":\"HZ\",\"children\":[{\"id\":1064,\"text\":\"谯城区\"},{\"id\":1065,\"text\":\"涡阳县\"},{\"id\":1066,\"text\":\"蒙城县\"},{\"id\":1067,\"text\":\"利辛县\"}]},{\"id\":113,\"text\":\"池州\",\"zip_code\":\"247100\",\"abridge\":\"CZ\",\"children\":[{\"id\":1068,\"text\":\"贵池区\"},{\"id\":1069,\"text\":\"东至县\"},{\"id\":1070,\"text\":\"石台县\"},{\"id\":1071,\"text\":\"青阳县\"}]},{\"id\":114,\"text\":\"宣城\",\"zip_code\":\"242000\",\"abridge\":\"XC\",\"children\":[{\"id\":1072,\"text\":\"宣州区\"},{\"id\":1073,\"text\":\"郎溪县\"},{\"id\":1074,\"text\":\"广德县\"},{\"id\":1075,\"text\":\"泾县\"},{\"id\":1076,\"text\":\"绩溪县\"},{\"id\":1077,\"text\":\"旌德县\"},{\"id\":1078,\"text\":\"宁国市\"}]}]},{\"id\":13,\"text\":\"福建\",\"children\":[{\"id\":115,\"text\":\"福州\",\"zip_code\":\"350000\",\"abridge\":\"FZ\",\"children\":[{\"id\":1079,\"text\":\"鼓楼区\"},{\"id\":1080,\"text\":\"台江区\"},{\"id\":1081,\"text\":\"仓山区\"},{\"id\":1082,\"text\":\"马尾区\"},{\"id\":1083,\"text\":\"晋安区\"},{\"id\":1084,\"text\":\"闽侯县\"},{\"id\":1085,\"text\":\"连江县\"},{\"id\":1086,\"text\":\"罗源县\"},{\"id\":1087,\"text\":\"闽清县\"},{\"id\":1088,\"text\":\"永泰县\"},{\"id\":1089,\"text\":\"平潭县\"},{\"id\":1090,\"text\":\"福清市\"},{\"id\":1091,\"text\":\"长乐市\"}]},{\"id\":116,\"text\":\"厦门\",\"zip_code\":\"361000\",\"abridge\":\"XM\",\"children\":[{\"id\":1092,\"text\":\"思明区\"},{\"id\":1093,\"text\":\"海沧区\"},{\"id\":1094,\"text\":\"湖里区\"},{\"id\":1095,\"text\":\"集美区\"},{\"id\":1096,\"text\":\"同安区\"},{\"id\":1097,\"text\":\"翔安区\"},{\"id\":1098,\"text\":\"鼓浪屿区\"},{\"id\":1099,\"text\":\"象屿保税区\"},{\"id\":1100,\"text\":\"火炬高新区\"}]},{\"id\":117,\"text\":\"莆田\",\"zip_code\":\"351100\",\"abridge\":\"PT\",\"children\":[{\"id\":1101,\"text\":\"城厢区\"},{\"id\":1102,\"text\":\"涵江区\"},{\"id\":1103,\"text\":\"荔城区\"},{\"id\":1104,\"text\":\"秀屿区\"},{\"id\":1105,\"text\":\"仙游县\"}]},{\"id\":118,\"text\":\"三明\",\"zip_code\":\"365000\",\"abridge\":\"SM\",\"children\":[{\"id\":1106,\"text\":\"梅列区\"},{\"id\":1107,\"text\":\"三元区\"},{\"id\":1108,\"text\":\"明溪县\"},{\"id\":1109,\"text\":\"清流县\"},{\"id\":1110,\"text\":\"宁化县\"},{\"id\":1111,\"text\":\"大田县\"},{\"id\":1112,\"text\":\"尤溪县\"},{\"id\":1113,\"text\":\"沙县\"},{\"id\":1114,\"text\":\"将乐县\"},{\"id\":1115,\"text\":\"泰宁县\"},{\"id\":1116,\"text\":\"建宁县\"},{\"id\":1117,\"text\":\"永安市\"}]},{\"id\":119,\"text\":\"泉州\",\"zip_code\":\"362000\",\"abridge\":\"QZ\",\"children\":[{\"id\":1118,\"text\":\"鲤城区\"},{\"id\":1119,\"text\":\"丰泽区\"},{\"id\":1120,\"text\":\"洛江区\"},{\"id\":1121,\"text\":\"泉港区\"},{\"id\":1122,\"text\":\"惠安县\"},{\"id\":1123,\"text\":\"安溪县\"},{\"id\":1124,\"text\":\"永春县\"},{\"id\":1125,\"text\":\"德化县\"},{\"id\":1126,\"text\":\"金门县\"},{\"id\":1127,\"text\":\"石狮市\"},{\"id\":1128,\"text\":\"晋江市\"},{\"id\":1129,\"text\":\"南安市\"},{\"id\":1130,\"text\":\"经济技术开发区\"}]},{\"id\":120,\"text\":\"漳州\",\"zip_code\":\"363000\",\"abridge\":\"ZZ\",\"children\":[{\"id\":1131,\"text\":\"芗城区\"},{\"id\":1132,\"text\":\"龙文区\"},{\"id\":1133,\"text\":\"云霄县\"},{\"id\":1134,\"text\":\"漳浦县\"},{\"id\":1135,\"text\":\"诏安县\"},{\"id\":1136,\"text\":\"长泰县\"},{\"id\":1137,\"text\":\"东山县\"},{\"id\":1138,\"text\":\"南靖县\"},{\"id\":1139,\"text\":\"平和县\"},{\"id\":1140,\"text\":\"华安县\"},{\"id\":1141,\"text\":\"龙海市\"}]},{\"id\":121,\"text\":\"南平\",\"zip_code\":\"353000\",\"abridge\":\"NP\",\"children\":[{\"id\":1142,\"text\":\"延平区\"},{\"id\":1143,\"text\":\"顺昌县\"},{\"id\":1144,\"text\":\"浦城县\"},{\"id\":1145,\"text\":\"光泽县\"},{\"id\":1146,\"text\":\"松溪县\"},{\"id\":1147,\"text\":\"政和县\"},{\"id\":1148,\"text\":\"邵武市\"},{\"id\":1149,\"text\":\"武夷山市\"},{\"id\":1150,\"text\":\"建瓯市\"},{\"id\":1151,\"text\":\"建阳市\"}]},{\"id\":122,\"text\":\"龙岩\",\"zip_code\":\"364000\",\"abridge\":\"LY\",\"children\":[{\"id\":1152,\"text\":\"新罗区\"},{\"id\":1153,\"text\":\"长汀县\"},{\"id\":1154,\"text\":\"永定县\"},{\"id\":1155,\"text\":\"上杭县\"},{\"id\":1156,\"text\":\"武平县\"},{\"id\":1157,\"text\":\"连城县\"},{\"id\":1158,\"text\":\"漳平市\"}]},{\"id\":123,\"text\":\"宁德\",\"zip_code\":\"352000\",\"abridge\":\"ND\",\"children\":[{\"id\":1159,\"text\":\"蕉城区\"},{\"id\":1160,\"text\":\"霞浦县\"},{\"id\":1161,\"text\":\"古田县\"},{\"id\":1162,\"text\":\"屏南县\"},{\"id\":1163,\"text\":\"寿宁县\"},{\"id\":1164,\"text\":\"周宁县\"},{\"id\":1165,\"text\":\"柘荣县\"},{\"id\":1166,\"text\":\"福安市\"},{\"id\":1167,\"text\":\"福鼎市\"}]}]},{\"id\":14,\"text\":\"江西\",\"children\":[{\"id\":124,\"text\":\"南昌\",\"zip_code\":\"330000\",\"abridge\":\"NC\",\"children\":[{\"id\":1168,\"text\":\"东湖区\"},{\"id\":1169,\"text\":\"西湖区\"},{\"id\":1170,\"text\":\"青云谱区\"},{\"id\":1171,\"text\":\"湾里区\"},{\"id\":1172,\"text\":\"青山湖区\"},{\"id\":1173,\"text\":\"南昌县\"},{\"id\":1174,\"text\":\"新建县\"},{\"id\":1175,\"text\":\"安义县\"},{\"id\":1176,\"text\":\"进贤县\"},{\"id\":1177,\"text\":\"经济技术开发区\"},{\"id\":1178,\"text\":\"红谷滩新区\"},{\"id\":1179,\"text\":\"高新技术产业开发区\"},{\"id\":1180,\"text\":\"桑海经济技术开发区\"},{\"id\":1181,\"text\":\"英雄经济开发区\"}]},{\"id\":125,\"text\":\"景德镇\",\"zip_code\":\"333000\",\"abridge\":\"JDZ\",\"children\":[{\"id\":1182,\"text\":\"昌江区\"},{\"id\":1183,\"text\":\"珠山区\"},{\"id\":1184,\"text\":\"浮梁县\"},{\"id\":1185,\"text\":\"乐平市\"}]},{\"id\":126,\"text\":\"萍乡\",\"zip_code\":\"337000\",\"abridge\":\"PX\",\"children\":[{\"id\":1186,\"text\":\"安源区\"},{\"id\":1187,\"text\":\"湘东区\"},{\"id\":1188,\"text\":\"莲花县\"},{\"id\":1189,\"text\":\"上栗县\"},{\"id\":1190,\"text\":\"芦溪县\"}]},{\"id\":127,\"text\":\"九江\",\"zip_code\":\"332000\",\"abridge\":\"JJ\",\"children\":[{\"id\":1191,\"text\":\"庐山区\"},{\"id\":1192,\"text\":\"浔阳区\"},{\"id\":1193,\"text\":\"九江县\"},{\"id\":1194,\"text\":\"武宁县\"},{\"id\":1195,\"text\":\"修水县\"},{\"id\":1196,\"text\":\"永修县\"},{\"id\":1197,\"text\":\"德安县\"},{\"id\":1198,\"text\":\"星子县\"},{\"id\":1199,\"text\":\"都昌县\"},{\"id\":1200,\"text\":\"湖口县\"},{\"id\":1201,\"text\":\"彭泽县\"},{\"id\":1202,\"text\":\"瑞昌市\"}]},{\"id\":128,\"text\":\"新余\",\"zip_code\":\"338000\",\"abridge\":\"XY\",\"children\":[{\"id\":1203,\"text\":\"渝水区\"},{\"id\":1204,\"text\":\"分宜县\"}]},{\"id\":129,\"text\":\"鹰潭\",\"zip_code\":\"335000\",\"abridge\":\"YT\",\"children\":[{\"id\":1205,\"text\":\"月湖区\"},{\"id\":1206,\"text\":\"余江县\"},{\"id\":1207,\"text\":\"贵溪市\"}]},{\"id\":130,\"text\":\"赣州\",\"zip_code\":\"341000\",\"abridge\":\"GZ\",\"children\":[{\"id\":1208,\"text\":\"章贡区\"},{\"id\":1209,\"text\":\"赣县\"},{\"id\":1210,\"text\":\"信丰县\"},{\"id\":1211,\"text\":\"大余县\"},{\"id\":1212,\"text\":\"上犹县\"},{\"id\":1213,\"text\":\"崇义县\"},{\"id\":1214,\"text\":\"安远县\"},{\"id\":1215,\"text\":\"龙南县\"},{\"id\":1216,\"text\":\"定南县\"},{\"id\":1217,\"text\":\"全南县\"},{\"id\":1218,\"text\":\"宁都县\"},{\"id\":1219,\"text\":\"于都县\"},{\"id\":1220,\"text\":\"兴国县\"},{\"id\":1221,\"text\":\"会昌县\"},{\"id\":1222,\"text\":\"寻乌县\"},{\"id\":1223,\"text\":\"石城县\"},{\"id\":1224,\"text\":\"瑞金市\"},{\"id\":1225,\"text\":\"南康市\"}]},{\"id\":131,\"text\":\"吉安\",\"zip_code\":\"343000\",\"abridge\":\"JA\",\"children\":[{\"id\":1226,\"text\":\"吉州区\"},{\"id\":1227,\"text\":\"青原区\"},{\"id\":1228,\"text\":\"吉安县\"},{\"id\":1229,\"text\":\"吉水县\"},{\"id\":1230,\"text\":\"峡江县\"},{\"id\":1231,\"text\":\"新干县\"},{\"id\":1232,\"text\":\"永丰县\"},{\"id\":1233,\"text\":\"泰和县\"},{\"id\":1234,\"text\":\"遂川县\"},{\"id\":1235,\"text\":\"万安县\"},{\"id\":1236,\"text\":\"安福县\"},{\"id\":1237,\"text\":\"永新县\"},{\"id\":1238,\"text\":\"井冈山市\"}]},{\"id\":132,\"text\":\"宜春\",\"zip_code\":\"336000\",\"abridge\":\"YC\",\"children\":[{\"id\":1239,\"text\":\"袁州区\"},{\"id\":1240,\"text\":\"奉新县\"},{\"id\":1241,\"text\":\"万载县\"},{\"id\":1242,\"text\":\"上高县\"},{\"id\":1243,\"text\":\"宜丰县\"},{\"id\":1244,\"text\":\"靖安县\"},{\"id\":1245,\"text\":\"铜鼓县\"},{\"id\":1246,\"text\":\"丰城市\"},{\"id\":1247,\"text\":\"樟树市\"},{\"id\":1248,\"text\":\"高安市\"}]},{\"id\":133,\"text\":\"抚州\",\"zip_code\":\"344000\",\"abridge\":\"FZ\",\"children\":[{\"id\":1249,\"text\":\"临川区\"},{\"id\":1250,\"text\":\"南城县\"},{\"id\":1251,\"text\":\"黎川县\"},{\"id\":1252,\"text\":\"南丰县\"},{\"id\":1253,\"text\":\"崇仁县\"},{\"id\":1254,\"text\":\"乐安县\"},{\"id\":1255,\"text\":\"宜黄县\"},{\"id\":1256,\"text\":\"金溪县\"},{\"id\":1257,\"text\":\"资溪县\"},{\"id\":1258,\"text\":\"东乡县\"},{\"id\":1259,\"text\":\"广昌县\"}]},{\"id\":134,\"text\":\"上饶\",\"zip_code\":\"334000\",\"abridge\":\"SR\",\"children\":[{\"id\":1260,\"text\":\"信州区\"},{\"id\":1261,\"text\":\"上饶县\"},{\"id\":1262,\"text\":\"广丰县\"},{\"id\":1263,\"text\":\"玉山县\"},{\"id\":1264,\"text\":\"铅山县\"},{\"id\":1265,\"text\":\"横峰县\"},{\"id\":1266,\"text\":\"弋阳县\"},{\"id\":1267,\"text\":\"余干县\"},{\"id\":1268,\"text\":\"鄱阳县\"},{\"id\":1269,\"text\":\"万年县\"},{\"id\":1270,\"text\":\"婺源县\"},{\"id\":1271,\"text\":\"德兴市\"}]}]},{\"id\":15,\"text\":\"山东\",\"children\":[{\"id\":135,\"text\":\"济南\",\"zip_code\":\"250000\",\"abridge\":\"JN\",\"children\":[{\"id\":1272,\"text\":\"历下区\"},{\"id\":1273,\"text\":\"市中区\"},{\"id\":1274,\"text\":\"槐荫区\"},{\"id\":1275,\"text\":\"天桥区\"},{\"id\":1276,\"text\":\"历城区\"},{\"id\":1277,\"text\":\"长清区\"},{\"id\":1278,\"text\":\"平阴县\"},{\"id\":1279,\"text\":\"济阳县\"},{\"id\":1280,\"text\":\"商河县\"},{\"id\":1281,\"text\":\"章丘市\"},{\"id\":1282,\"text\":\"高新区\"},{\"id\":1283,\"text\":\"经济开发区\"}]},{\"id\":136,\"text\":\"青岛\",\"zip_code\":\"266000\",\"abridge\":\"QD\",\"children\":[{\"id\":1284,\"text\":\"市南区\"},{\"id\":1285,\"text\":\"市北区\"},{\"id\":1286,\"text\":\"四方区\"},{\"id\":1287,\"text\":\"黄岛区\"},{\"id\":1288,\"text\":\"崂山区\"},{\"id\":1289,\"text\":\"李沧区\"},{\"id\":1290,\"text\":\"城阳区\"},{\"id\":1291,\"text\":\"胶州市\"},{\"id\":1292,\"text\":\"即墨市\"},{\"id\":1293,\"text\":\"平度市\"},{\"id\":1294,\"text\":\"胶南市\"},{\"id\":1295,\"text\":\"莱西市\"}]},{\"id\":137,\"text\":\"淄博\",\"zip_code\":\"255000\",\"abridge\":\"ZB\",\"children\":[{\"id\":1296,\"text\":\"淄川区\"},{\"id\":1297,\"text\":\"张店区\"},{\"id\":1298,\"text\":\"博山区\"},{\"id\":1299,\"text\":\"临淄区\"},{\"id\":1300,\"text\":\"周村区\"},{\"id\":1301,\"text\":\"桓台县\"},{\"id\":1302,\"text\":\"高青县\"},{\"id\":1303,\"text\":\"沂源县\"},{\"id\":1304,\"text\":\"高新区\"}]},{\"id\":138,\"text\":\"枣庄\",\"zip_code\":\"277000\",\"abridge\":\"ZZ\",\"children\":[{\"id\":1305,\"text\":\"市中区\"},{\"id\":1306,\"text\":\"薛城区\"},{\"id\":1307,\"text\":\"峄城区\"},{\"id\":1308,\"text\":\"台儿庄区\"},{\"id\":1309,\"text\":\"山亭区\"},{\"id\":1310,\"text\":\"滕州市\"}]},{\"id\":139,\"text\":\"东营\",\"zip_code\":\"257000\",\"abridge\":\"DY\",\"children\":[{\"id\":1311,\"text\":\"东营区\"},{\"id\":1312,\"text\":\"河口区\"},{\"id\":1313,\"text\":\"垦利县\"},{\"id\":1314,\"text\":\"利津县\"},{\"id\":1315,\"text\":\"广饶县\"}]},{\"id\":140,\"text\":\"烟台\",\"zip_code\":\"264000\",\"abridge\":\"YT\",\"children\":[{\"id\":1316,\"text\":\"芝罘区\"},{\"id\":1317,\"text\":\"福山区\"},{\"id\":1318,\"text\":\"牟平区\"},{\"id\":1319,\"text\":\"莱山区\"},{\"id\":1320,\"text\":\"长岛县\"},{\"id\":1321,\"text\":\"龙口市\"},{\"id\":1322,\"text\":\"莱阳市\"},{\"id\":1323,\"text\":\"莱州市\"},{\"id\":1324,\"text\":\"蓬莱市\"},{\"id\":1325,\"text\":\"招远市\"},{\"id\":1326,\"text\":\"栖霞市\"},{\"id\":1327,\"text\":\"海阳市\"},{\"id\":1328,\"text\":\"开发区\"}]},{\"id\":141,\"text\":\"潍坊\",\"zip_code\":\"261000\",\"abridge\":\"WF\",\"children\":[{\"id\":1329,\"text\":\"潍城区\"},{\"id\":1330,\"text\":\"寒亭区\"},{\"id\":1331,\"text\":\"坊子区\"},{\"id\":1332,\"text\":\"奎文区\"},{\"id\":1333,\"text\":\"临朐县\"},{\"id\":1334,\"text\":\"昌乐县\"},{\"id\":1335,\"text\":\"青州市\"},{\"id\":1336,\"text\":\"诸城市\"},{\"id\":1337,\"text\":\"寿光市\"},{\"id\":1338,\"text\":\"安丘市\"},{\"id\":1339,\"text\":\"高密市\"},{\"id\":1340,\"text\":\"昌邑市\"},{\"id\":1341,\"text\":\"经济开发区\"},{\"id\":1342,\"text\":\"滨海经济开发区\"},{\"id\":1343,\"text\":\"高新技术开发区\"},{\"id\":1344,\"text\":\"出口加工区\"}]},{\"id\":142,\"text\":\"济宁\",\"zip_code\":\"272000\",\"abridge\":\"JN\",\"children\":[{\"id\":1345,\"text\":\"市中区\"},{\"id\":1346,\"text\":\"任城区\"},{\"id\":1347,\"text\":\"微山县\"},{\"id\":1348,\"text\":\"鱼台县\"},{\"id\":1349,\"text\":\"金乡县\"},{\"id\":1350,\"text\":\"嘉祥县\"},{\"id\":1351,\"text\":\"汶上县\"},{\"id\":1352,\"text\":\"泗水县\"},{\"id\":1353,\"text\":\"梁山县\"},{\"id\":1354,\"text\":\"曲阜市\"},{\"id\":1355,\"text\":\"兖州市\"},{\"id\":1356,\"text\":\"邹城市\"}]},{\"id\":143,\"text\":\"泰安\",\"zip_code\":\"271000\",\"abridge\":\"TA\",\"children\":[{\"id\":1357,\"text\":\"泰山区\"},{\"id\":1358,\"text\":\"岱岳区\"},{\"id\":1359,\"text\":\"宁阳县\"},{\"id\":1360,\"text\":\"东平县\"},{\"id\":1361,\"text\":\"新泰市\"},{\"id\":1362,\"text\":\"肥城市\"}]},{\"id\":144,\"text\":\"威海\",\"zip_code\":\"264200\",\"abridge\":\"WH\",\"children\":[{\"id\":1363,\"text\":\"环翠区\"},{\"id\":1364,\"text\":\"文登市\"},{\"id\":1365,\"text\":\"荣成市\"},{\"id\":1366,\"text\":\"乳山市\"},{\"id\":1367,\"text\":\"经济技术开发区\"},{\"id\":1368,\"text\":\"高技术开发区\"}]},{\"id\":145,\"text\":\"日照\",\"zip_code\":\"276800\",\"abridge\":\"RZ\",\"children\":[{\"id\":1369,\"text\":\"东港区\"},{\"id\":1370,\"text\":\"岚山区\"},{\"id\":1371,\"text\":\"五莲县\"},{\"id\":1372,\"text\":\"莒县\"}]},{\"id\":146,\"text\":\"莱芜\",\"zip_code\":\"271100\",\"abridge\":\"LF\",\"children\":[{\"id\":1373,\"text\":\"莱城区\"},{\"id\":1374,\"text\":\"钢城区\"}]},{\"id\":147,\"text\":\"临沂\",\"zip_code\":\"276000\",\"abridge\":\"LQ\",\"children\":[{\"id\":1375,\"text\":\"兰山区\"},{\"id\":1376,\"text\":\"罗庄区\"},{\"id\":1377,\"text\":\"河东区\"},{\"id\":1378,\"text\":\"沂南县\"},{\"id\":1379,\"text\":\"郯城县\"},{\"id\":1380,\"text\":\"沂水县\"},{\"id\":1381,\"text\":\"苍山县\"},{\"id\":1382,\"text\":\"费县\"},{\"id\":1383,\"text\":\"平邑县\"},{\"id\":1384,\"text\":\"莒南县\"},{\"id\":1385,\"text\":\"蒙阴县\"},{\"id\":1386,\"text\":\"临沭县\"}]},{\"id\":148,\"text\":\"德州\",\"zip_code\":\"253000\",\"abridge\":\"DZ\",\"children\":[{\"id\":1387,\"text\":\"德城区\"},{\"id\":1388,\"text\":\"陵县\"},{\"id\":1389,\"text\":\"宁津县\"},{\"id\":1390,\"text\":\"庆云县\"},{\"id\":1391,\"text\":\"临邑县\"},{\"id\":1392,\"text\":\"齐河县\"},{\"id\":1393,\"text\":\"平原县\"},{\"id\":1394,\"text\":\"夏津县\"},{\"id\":1395,\"text\":\"武城县\"},{\"id\":1396,\"text\":\"乐陵市\"},{\"id\":1397,\"text\":\"禹城市\"}]},{\"id\":149,\"text\":\"聊城\",\"zip_code\":\"252000\",\"abridge\":\"LC\",\"children\":[{\"id\":1398,\"text\":\"东昌府区\"},{\"id\":1399,\"text\":\"阳谷县\"},{\"id\":1400,\"text\":\"莘县\"},{\"id\":1401,\"text\":\"茌平县\"},{\"id\":1402,\"text\":\"东阿县\"},{\"id\":1403,\"text\":\"冠县\"},{\"id\":1404,\"text\":\"高唐县\"},{\"id\":1405,\"text\":\"临清市\"}]},{\"id\":150,\"text\":\"滨州\",\"zip_code\":\"256600\",\"abridge\":\"BZ\",\"children\":[{\"id\":1406,\"text\":\"滨城区\"},{\"id\":1407,\"text\":\"惠民县\"},{\"id\":1408,\"text\":\"阳信县\"},{\"id\":1409,\"text\":\"无棣县\"},{\"id\":1410,\"text\":\"沾化县\"},{\"id\":1411,\"text\":\"博兴县\"},{\"id\":1412,\"text\":\"邹平县\"}]},{\"id\":151,\"text\":\"菏泽\",\"zip_code\":\"274000\",\"abridge\":\"HZ\",\"children\":[{\"id\":1413,\"text\":\"牡丹区\"},{\"id\":1414,\"text\":\"曹县\"},{\"id\":1415,\"text\":\"单县\"},{\"id\":1416,\"text\":\"成武县\"},{\"id\":1417,\"text\":\"巨野县\"},{\"id\":1418,\"text\":\"郓城县\"},{\"id\":1419,\"text\":\"鄄城县\"},{\"id\":1420,\"text\":\"定陶县\"},{\"id\":1421,\"text\":\"东明县\"}]}]},{\"id\":16,\"text\":\"河南\",\"children\":[{\"id\":152,\"text\":\"郑州\",\"zip_code\":\"450000\",\"abridge\":\"ZZ\",\"children\":[{\"id\":1422,\"text\":\"中原区\"},{\"id\":1423,\"text\":\"二七区\"},{\"id\":1424,\"text\":\"管城回族区\"},{\"id\":1425,\"text\":\"金水区\"},{\"id\":1426,\"text\":\"上街区\"},{\"id\":1427,\"text\":\"中牟县\"},{\"id\":1428,\"text\":\"巩义市\"},{\"id\":1429,\"text\":\"荥阳市\"},{\"id\":1430,\"text\":\"新密市\"},{\"id\":1431,\"text\":\"新郑市\"},{\"id\":1432,\"text\":\"登封市\"},{\"id\":1433,\"text\":\"高新技术开发区\"},{\"id\":1434,\"text\":\"惠济区\"},{\"id\":1435,\"text\":\"经济技术开发区\"},{\"id\":1436,\"text\":\"郑东新区\"},{\"id\":1437,\"text\":\"出口加工区\"}]},{\"id\":153,\"text\":\"开封\",\"zip_code\":\"475000\",\"abridge\":\"KF\",\"children\":[{\"id\":1438,\"text\":\"龙亭区\"},{\"id\":1439,\"text\":\"顺河回族区\"},{\"id\":1440,\"text\":\"鼓楼区\"},{\"id\":1441,\"text\":\"杞县\"},{\"id\":1442,\"text\":\"通许县\"},{\"id\":1443,\"text\":\"尉氏县\"},{\"id\":1444,\"text\":\"开封县\"},{\"id\":1445,\"text\":\"兰考县\"},{\"id\":1446,\"text\":\"金明区\"},{\"id\":1447,\"text\":\"禹王台区\"}]},{\"id\":154,\"text\":\"洛阳\",\"zip_code\":\"471000\",\"abridge\":\"LY\",\"children\":[{\"id\":1448,\"text\":\"老城区\"},{\"id\":1449,\"text\":\"西工区\"},{\"id\":1450,\"text\":\"瀍河回族区\"},{\"id\":1451,\"text\":\"涧西区\"},{\"id\":1452,\"text\":\"吉利区\"},{\"id\":1453,\"text\":\"洛龙区\"},{\"id\":1454,\"text\":\"孟津县\"},{\"id\":1455,\"text\":\"新安县\"},{\"id\":1456,\"text\":\"栾川县\"},{\"id\":1457,\"text\":\"嵩县\"},{\"id\":1458,\"text\":\"汝阳县\"},{\"id\":1459,\"text\":\"宜阳县\"},{\"id\":1460,\"text\":\"洛宁县\"},{\"id\":1461,\"text\":\"伊川县\"},{\"id\":1462,\"text\":\"偃师市\"},{\"id\":1463,\"text\":\"高新技术开发区\"},{\"id\":1464,\"text\":\"经济技术开发区\"}]},{\"id\":155,\"text\":\"平顶山\",\"zip_code\":\"467000\",\"abridge\":\"PDS\",\"children\":[{\"id\":1465,\"text\":\"新华区\"},{\"id\":1466,\"text\":\"卫东区\"},{\"id\":1467,\"text\":\"石龙区\"},{\"id\":1468,\"text\":\"湛河区\"},{\"id\":1469,\"text\":\"宝丰县\"},{\"id\":1470,\"text\":\"叶县\"},{\"id\":1471,\"text\":\"鲁山县\"},{\"id\":1472,\"text\":\"郏县\"},{\"id\":1473,\"text\":\"舞钢市\"},{\"id\":1474,\"text\":\"汝州市\"}]},{\"id\":156,\"text\":\"安阳\",\"zip_code\":\"455000\",\"abridge\":\"AY\",\"children\":[{\"id\":1475,\"text\":\"文峰区\"},{\"id\":1476,\"text\":\"北关区\"},{\"id\":1477,\"text\":\"殷都区\"},{\"id\":1478,\"text\":\"龙安区\"},{\"id\":1479,\"text\":\"安阳县\"},{\"id\":1480,\"text\":\"汤阴县\"},{\"id\":1481,\"text\":\"滑县\"},{\"id\":1482,\"text\":\"内黄县\"},{\"id\":1483,\"text\":\"林州市\"}]},{\"id\":157,\"text\":\"鹤壁\",\"zip_code\":\"458000\",\"abridge\":\"HB\",\"children\":[{\"id\":1484,\"text\":\"鹤山区\"},{\"id\":1485,\"text\":\"山城区\"},{\"id\":1486,\"text\":\"淇滨区\"},{\"id\":1487,\"text\":\"浚县\"},{\"id\":1488,\"text\":\"淇县\"}]},{\"id\":158,\"text\":\"新乡\",\"zip_code\":\"453000\",\"abridge\":\"XX\",\"children\":[{\"id\":1489,\"text\":\"红旗区\"},{\"id\":1490,\"text\":\"卫滨区\"},{\"id\":1491,\"text\":\"凤泉区\"},{\"id\":1492,\"text\":\"牧野区\"},{\"id\":1493,\"text\":\"新乡县\"},{\"id\":1494,\"text\":\"获嘉县\"},{\"id\":1495,\"text\":\"原阳县\"},{\"id\":1496,\"text\":\"延津县\"},{\"id\":1497,\"text\":\"封丘县\"},{\"id\":1498,\"text\":\"长垣县\"},{\"id\":1499,\"text\":\"卫辉市\"},{\"id\":1500,\"text\":\"辉县市\"}]},{\"id\":159,\"text\":\"焦作\",\"zip_code\":\"454100\",\"abridge\":\"JZ\",\"children\":[{\"id\":1501,\"text\":\"解放区\"},{\"id\":1502,\"text\":\"中站区\"},{\"id\":1503,\"text\":\"马村区\"},{\"id\":1504,\"text\":\"山阳区\"},{\"id\":1505,\"text\":\"修武县\"},{\"id\":1506,\"text\":\"博爱县\"},{\"id\":1507,\"text\":\"武陟县\"},{\"id\":1508,\"text\":\"温县\"},{\"id\":1509,\"text\":\"沁阳市\"},{\"id\":1510,\"text\":\"孟州市\"}]},{\"id\":160,\"text\":\"濮阳\",\"zip_code\":\"457000\",\"abridge\":\"PY\",\"children\":[{\"id\":1511,\"text\":\"华龙区\"},{\"id\":1512,\"text\":\"清丰县\"},{\"id\":1513,\"text\":\"南乐县\"},{\"id\":1514,\"text\":\"范县\"},{\"id\":1515,\"text\":\"台前县\"},{\"id\":1516,\"text\":\"濮阳县\"}]},{\"id\":161,\"text\":\"许昌\",\"zip_code\":\"461000\",\"abridge\":\"XC\",\"children\":[{\"id\":1517,\"text\":\"魏都区\"},{\"id\":1518,\"text\":\"许昌县\"},{\"id\":1519,\"text\":\"鄢陵县\"},{\"id\":1520,\"text\":\"襄城县\"},{\"id\":1521,\"text\":\"禹州市\"},{\"id\":1522,\"text\":\"长葛市\"}]},{\"id\":162,\"text\":\"漯河\",\"zip_code\":\"462000\",\"abridge\":\"LH\",\"children\":[{\"id\":1523,\"text\":\"源汇区\"},{\"id\":1524,\"text\":\"郾城区\"},{\"id\":1525,\"text\":\"召陵区\"},{\"id\":1526,\"text\":\"舞阳县\"},{\"id\":1527,\"text\":\"临颍县\"}]},{\"id\":163,\"text\":\"三门峡\",\"zip_code\":\"472000\",\"abridge\":\"SMX\",\"children\":[{\"id\":1528,\"text\":\"湖滨区\"},{\"id\":1529,\"text\":\"渑池县\"},{\"id\":1530,\"text\":\"陕县\"},{\"id\":1531,\"text\":\"卢氏县\"},{\"id\":1532,\"text\":\"义马市\"},{\"id\":1533,\"text\":\"灵宝市\"}]},{\"id\":164,\"text\":\"南阳\",\"zip_code\":\"473000\",\"abridge\":\"NY\",\"children\":[{\"id\":1534,\"text\":\"宛城区\"},{\"id\":1535,\"text\":\"卧龙区\"},{\"id\":1536,\"text\":\"南召县\"},{\"id\":1537,\"text\":\"方城县\"},{\"id\":1538,\"text\":\"西峡县\"},{\"id\":1539,\"text\":\"镇平县\"},{\"id\":1540,\"text\":\"内乡县\"},{\"id\":1541,\"text\":\"淅川县\"},{\"id\":1542,\"text\":\"社旗县\"},{\"id\":1543,\"text\":\"唐河县\"},{\"id\":1544,\"text\":\"新野县\"},{\"id\":1545,\"text\":\"桐柏县\"},{\"id\":1546,\"text\":\"邓州市\"}]},{\"id\":165,\"text\":\"商丘\",\"zip_code\":\"476000\",\"abridge\":\"SQ\",\"children\":[{\"id\":1547,\"text\":\"梁园区\"},{\"id\":1548,\"text\":\"睢阳区\"},{\"id\":1549,\"text\":\"民权县\"},{\"id\":1550,\"text\":\"睢县\"},{\"id\":1551,\"text\":\"宁陵县\"},{\"id\":1552,\"text\":\"柘城县\"},{\"id\":1553,\"text\":\"虞城县\"},{\"id\":1554,\"text\":\"夏邑县\"},{\"id\":1555,\"text\":\"永城市\"}]},{\"id\":166,\"text\":\"信阳\",\"zip_code\":\"464000\",\"abridge\":\"XY\",\"children\":[{\"id\":1556,\"text\":\"浉河区\"},{\"id\":1557,\"text\":\"平桥区\"},{\"id\":1558,\"text\":\"罗山县\"},{\"id\":1559,\"text\":\"光山县\"},{\"id\":1560,\"text\":\"新县\"},{\"id\":1561,\"text\":\"商城县\"},{\"id\":1562,\"text\":\"固始县\"},{\"id\":1563,\"text\":\"潢川县\"},{\"id\":1564,\"text\":\"淮滨县\"},{\"id\":1565,\"text\":\"息县\"}]},{\"id\":167,\"text\":\"周口\",\"zip_code\":\"466000\",\"abridge\":\"ZK\",\"children\":[{\"id\":1566,\"text\":\"川汇区\"},{\"id\":1567,\"text\":\"扶沟县\"},{\"id\":1568,\"text\":\"西华县\"},{\"id\":1569,\"text\":\"商水县\"},{\"id\":1570,\"text\":\"沈丘县\"},{\"id\":1571,\"text\":\"郸城县\"},{\"id\":1572,\"text\":\"淮阳县\"},{\"id\":1573,\"text\":\"太康县\"},{\"id\":1574,\"text\":\"鹿邑县\"},{\"id\":1575,\"text\":\"项城市\"}]},{\"id\":168,\"text\":\"驻马店\",\"zip_code\":\"463000\",\"abridge\":\"ZMD\",\"children\":[{\"id\":1576,\"text\":\"驿城区\"},{\"id\":1577,\"text\":\"西平县\"},{\"id\":1578,\"text\":\"上蔡县\"},{\"id\":1579,\"text\":\"平舆县\"},{\"id\":1580,\"text\":\"正阳县\"},{\"id\":1581,\"text\":\"确山县\"},{\"id\":1582,\"text\":\"泌阳县\"},{\"id\":1583,\"text\":\"汝南县\"},{\"id\":1584,\"text\":\"遂平县\"},{\"id\":1585,\"text\":\"新蔡县\"}]},{\"id\":169,\"text\":\"济源\",\"zip_code\":\"454650\",\"abridge\":\"JY\",\"children\":[{\"id\":1586,\"text\":\"济源市\"}]}]},{\"id\":17,\"text\":\"湖北\",\"children\":[{\"id\":170,\"text\":\"武汉\",\"zip_code\":\"430000\",\"abridge\":\"WH\",\"children\":[{\"id\":1587,\"text\":\"江岸区\"},{\"id\":1588,\"text\":\"江汉区\"},{\"id\":1589,\"text\":\"硚口区\"},{\"id\":1590,\"text\":\"汉阳区\"},{\"id\":1591,\"text\":\"武昌区\"},{\"id\":1592,\"text\":\"青山区\"},{\"id\":1593,\"text\":\"洪山区\"},{\"id\":1594,\"text\":\"东西湖区\"},{\"id\":1595,\"text\":\"汉南区\"},{\"id\":1596,\"text\":\"蔡甸区\"},{\"id\":1597,\"text\":\"江夏区\"},{\"id\":1598,\"text\":\"黄陂区\"},{\"id\":1599,\"text\":\"新洲区\"}]},{\"id\":171,\"text\":\"黄石\",\"zip_code\":\"435000\",\"abridge\":\"HS\",\"children\":[{\"id\":1600,\"text\":\"黄石港区\"},{\"id\":1601,\"text\":\"西塞山区\"},{\"id\":1602,\"text\":\"下陆区\"},{\"id\":1603,\"text\":\"铁山区\"},{\"id\":1604,\"text\":\"阳新县\"},{\"id\":1605,\"text\":\"大冶市\"}]},{\"id\":172,\"text\":\"十堰\",\"zip_code\":\"442000\",\"abridge\":\"SY\",\"children\":[{\"id\":1606,\"text\":\"茅箭区\"},{\"id\":1607,\"text\":\"张湾区\"},{\"id\":1608,\"text\":\"郧县\"},{\"id\":1609,\"text\":\"郧西县\"},{\"id\":1610,\"text\":\"竹山县\"},{\"id\":1611,\"text\":\"竹溪县\"},{\"id\":1612,\"text\":\"房县\"},{\"id\":1613,\"text\":\"丹江口市\"}]},{\"id\":173,\"text\":\"宜昌\",\"zip_code\":\"443000\",\"abridge\":\"YC\",\"children\":[{\"id\":1614,\"text\":\"西陵区\"},{\"id\":1615,\"text\":\"伍家岗区\"},{\"id\":1616,\"text\":\"点军区\"},{\"id\":1617,\"text\":\"虢亭区\"},{\"id\":1618,\"text\":\"夷陵区\"},{\"id\":1619,\"text\":\"远安县\"},{\"id\":1620,\"text\":\"兴山县\"},{\"id\":1621,\"text\":\"秭归县\"},{\"id\":1622,\"text\":\"长阳土家族自治县\"},{\"id\":1623,\"text\":\"五峰土家族自治县\"},{\"id\":1624,\"text\":\"宜都市\"},{\"id\":1625,\"text\":\"当阳市\"},{\"id\":1626,\"text\":\"枝江市\"},{\"id\":1627,\"text\":\"经济技术开发区\"}]},{\"id\":174,\"text\":\"襄阳\",\"zip_code\":\"441000\",\"abridge\":\"XY\",\"children\":[{\"id\":1628,\"text\":\"襄城区\"},{\"id\":1629,\"text\":\"樊城区\"},{\"id\":1630,\"text\":\"襄阳区\"},{\"id\":1631,\"text\":\"南漳县\"},{\"id\":1632,\"text\":\"谷城县\"},{\"id\":1633,\"text\":\"保康县\"},{\"id\":1634,\"text\":\"老河口市\"},{\"id\":1635,\"text\":\"枣阳市\"},{\"id\":1636,\"text\":\"宜城市\"}]},{\"id\":175,\"text\":\"鄂州\",\"zip_code\":\"436000\",\"abridge\":\"EZ\",\"children\":[{\"id\":1637,\"text\":\"梁子湖区\"},{\"id\":1638,\"text\":\"华容区\"},{\"id\":1639,\"text\":\"鄂城区\"}]},{\"id\":176,\"text\":\"荆门\",\"zip_code\":\"448000\",\"abridge\":\"JM\",\"children\":[{\"id\":1640,\"text\":\"东宝区\"},{\"id\":1641,\"text\":\"掇刀区\"},{\"id\":1642,\"text\":\"京山县\"},{\"id\":1643,\"text\":\"沙洋县\"},{\"id\":1644,\"text\":\"钟祥市\"}]},{\"id\":177,\"text\":\"孝感\",\"zip_code\":\"432000\",\"abridge\":\"XG\",\"children\":[{\"id\":1645,\"text\":\"孝南区\"},{\"id\":1646,\"text\":\"孝昌县\"},{\"id\":1647,\"text\":\"大悟县\"},{\"id\":1648,\"text\":\"云梦县\"},{\"id\":1649,\"text\":\"应城市\"},{\"id\":1650,\"text\":\"安陆市\"},{\"id\":1651,\"text\":\"汉川市\"}]},{\"id\":178,\"text\":\"荆州\",\"zip_code\":\"434000\",\"abridge\":\"JZ\",\"children\":[{\"id\":1652,\"text\":\"沙市区\"},{\"id\":1653,\"text\":\"荆州区\"},{\"id\":1654,\"text\":\"公安县\"},{\"id\":1655,\"text\":\"监利县\"},{\"id\":1656,\"text\":\"江陵县\"},{\"id\":1657,\"text\":\"石首市\"},{\"id\":1658,\"text\":\"洪湖市\"},{\"id\":1659,\"text\":\"松滋市\"}]},{\"id\":179,\"text\":\"黄冈\",\"zip_code\":\"438000\",\"abridge\":\"HG\",\"children\":[{\"id\":1660,\"text\":\"黄州区\"},{\"id\":1661,\"text\":\"团风县\"},{\"id\":1662,\"text\":\"红安县\"},{\"id\":1663,\"text\":\"罗田县\"},{\"id\":1664,\"text\":\"英山县\"},{\"id\":1665,\"text\":\"浠水县\"},{\"id\":1666,\"text\":\"蕲春县\"},{\"id\":1667,\"text\":\"黄梅县\"},{\"id\":1668,\"text\":\"麻城市\"},{\"id\":1669,\"text\":\"武穴市\"}]},{\"id\":180,\"text\":\"咸宁\",\"zip_code\":\"437000\",\"abridge\":\"XN\",\"children\":[{\"id\":1670,\"text\":\"咸安区\"},{\"id\":1671,\"text\":\"嘉鱼县\"},{\"id\":1672,\"text\":\"通城县\"},{\"id\":1673,\"text\":\"崇阳县\"},{\"id\":1674,\"text\":\"通山县\"},{\"id\":1675,\"text\":\"赤壁市\"}]},{\"id\":181,\"text\":\"随州\",\"zip_code\":\"441300\",\"abridge\":\"SZ\",\"children\":[{\"id\":1676,\"text\":\"曾都区\"},{\"id\":1677,\"text\":\"广水市\"}]},{\"id\":182,\"text\":\"恩施\",\"zip_code\":\"445000\",\"abridge\":\"ES\",\"children\":[{\"id\":1678,\"text\":\"恩施市\"},{\"id\":1679,\"text\":\"利川市\"},{\"id\":1680,\"text\":\"建始县\"},{\"id\":1681,\"text\":\"巴东县\"},{\"id\":1682,\"text\":\"宣恩县\"},{\"id\":1683,\"text\":\"咸丰县\"},{\"id\":1684,\"text\":\"来凤县\"},{\"id\":1685,\"text\":\"鹤峰县\"}]}]},{\"id\":18,\"text\":\"湖南\",\"children\":[{\"id\":184,\"text\":\"长沙\",\"zip_code\":\"410000\",\"abridge\":\"CS\",\"children\":[{\"id\":1690,\"text\":\"芙蓉区\"},{\"id\":1691,\"text\":\"天心区\"},{\"id\":1692,\"text\":\"岳麓区\"},{\"id\":1693,\"text\":\"开福区\"},{\"id\":1694,\"text\":\"雨花区\"},{\"id\":1695,\"text\":\"长沙县\"},{\"id\":1696,\"text\":\"望城县\"},{\"id\":1697,\"text\":\"宁乡县\"},{\"id\":1698,\"text\":\"浏阳市\"}]},{\"id\":185,\"text\":\"株洲\",\"zip_code\":\"412000\",\"abridge\":\"ZZ\",\"children\":[{\"id\":1699,\"text\":\"荷塘区\"},{\"id\":1700,\"text\":\"芦淞区\"},{\"id\":1701,\"text\":\"石峰区\"},{\"id\":1702,\"text\":\"天元区\"},{\"id\":1703,\"text\":\"株洲县\"},{\"id\":1704,\"text\":\"攸县\"},{\"id\":1705,\"text\":\"茶陵县\"},{\"id\":1706,\"text\":\"炎陵县\"},{\"id\":1707,\"text\":\"醴陵市\"}]},{\"id\":186,\"text\":\"湘潭\",\"zip_code\":\"411100\",\"abridge\":\"XT\",\"children\":[{\"id\":1708,\"text\":\"雨湖区\"},{\"id\":1709,\"text\":\"岳塘区\"},{\"id\":1710,\"text\":\"湘潭县\"},{\"id\":1711,\"text\":\"湘乡市\"},{\"id\":1712,\"text\":\"韶山市\"}]},{\"id\":187,\"text\":\"衡阳\",\"zip_code\":\"421000\",\"abridge\":\"HY\",\"children\":[{\"id\":1713,\"text\":\"珠晖区\"},{\"id\":1714,\"text\":\"雁峰区\"},{\"id\":1715,\"text\":\"石鼓区\"},{\"id\":1716,\"text\":\"蒸湘区\"},{\"id\":1717,\"text\":\"南岳区\"},{\"id\":1718,\"text\":\"衡阳县\"},{\"id\":1719,\"text\":\"衡南县\"},{\"id\":1720,\"text\":\"衡山县\"},{\"id\":1721,\"text\":\"衡东县\"},{\"id\":1722,\"text\":\"祁东县\"},{\"id\":1723,\"text\":\"耒阳市\"},{\"id\":1724,\"text\":\"常宁市\"}]},{\"id\":188,\"text\":\"邵阳\",\"zip_code\":\"422000\",\"abridge\":\"SY\",\"children\":[{\"id\":1725,\"text\":\"双清区\"},{\"id\":1726,\"text\":\"大祥区\"},{\"id\":1727,\"text\":\"北塔区\"},{\"id\":1728,\"text\":\"邵东县\"},{\"id\":1729,\"text\":\"新邵县\"},{\"id\":1730,\"text\":\"邵阳县\"},{\"id\":1731,\"text\":\"隆回县\"},{\"id\":1732,\"text\":\"洞口县\"},{\"id\":1733,\"text\":\"绥宁县\"},{\"id\":1734,\"text\":\"新宁县\"},{\"id\":1735,\"text\":\"城步苗族自治县\"},{\"id\":1736,\"text\":\"武冈市\"}]},{\"id\":189,\"text\":\"岳阳\",\"zip_code\":\"414000\",\"abridge\":\"YY\",\"children\":[{\"id\":1737,\"text\":\"岳阳楼区\"},{\"id\":1738,\"text\":\"云溪区\"},{\"id\":1739,\"text\":\"君山区\"},{\"id\":1740,\"text\":\"岳阳县\"},{\"id\":1741,\"text\":\"华容县\"},{\"id\":1742,\"text\":\"湘阴县\"},{\"id\":1743,\"text\":\"平江县\"},{\"id\":1744,\"text\":\"汨罗市\"},{\"id\":1745,\"text\":\"临湘市\"}]},{\"id\":190,\"text\":\"常德\",\"zip_code\":\"415000\",\"abridge\":\"CD\",\"children\":[{\"id\":1746,\"text\":\"武陵区\"},{\"id\":1747,\"text\":\"鼎城区\"},{\"id\":1748,\"text\":\"安乡县\"},{\"id\":1749,\"text\":\"汉寿县\"},{\"id\":1750,\"text\":\"澧县\"},{\"id\":1751,\"text\":\"临澧县\"},{\"id\":1752,\"text\":\"桃源县\"},{\"id\":1753,\"text\":\"石门县\"},{\"id\":1754,\"text\":\"津市市\"}]},{\"id\":191,\"text\":\"张家界\",\"zip_code\":\"427000\",\"abridge\":\"ZJJ\",\"children\":[{\"id\":1755,\"text\":\"永定区\"},{\"id\":1756,\"text\":\"武陵源区\"},{\"id\":1757,\"text\":\"慈利县\"},{\"id\":1758,\"text\":\"桑植县\"}]},{\"id\":192,\"text\":\"益阳\",\"zip_code\":\"413000\",\"abridge\":\"YY\",\"children\":[{\"id\":1759,\"text\":\"资阳区\"},{\"id\":1760,\"text\":\"赫山区\"},{\"id\":1761,\"text\":\"南县\"},{\"id\":1762,\"text\":\"桃江县\"},{\"id\":1763,\"text\":\"安化县\"},{\"id\":1764,\"text\":\"沅江市\"}]},{\"id\":193,\"text\":\"郴州\",\"zip_code\":\"423000\",\"abridge\":\"CZ\",\"children\":[{\"id\":1765,\"text\":\"北湖区\"},{\"id\":1766,\"text\":\"苏仙区\"},{\"id\":1767,\"text\":\"桂阳县\"},{\"id\":1768,\"text\":\"宜章县\"},{\"id\":1769,\"text\":\"永兴县\"},{\"id\":1770,\"text\":\"嘉禾县\"},{\"id\":1771,\"text\":\"临武县\"},{\"id\":1772,\"text\":\"汝城县\"},{\"id\":1773,\"text\":\"桂东县\"},{\"id\":1774,\"text\":\"安仁县\"},{\"id\":1775,\"text\":\"资兴市\"}]},{\"id\":194,\"text\":\"永州\",\"zip_code\":\"425000\",\"abridge\":\"YZ\",\"children\":[{\"id\":1776,\"text\":\"冷水滩区\"},{\"id\":1777,\"text\":\"祁阳县\"},{\"id\":1778,\"text\":\"东安县\"},{\"id\":1779,\"text\":\"双牌县\"},{\"id\":1780,\"text\":\"道县\"},{\"id\":1781,\"text\":\"江永县\"},{\"id\":1782,\"text\":\"宁远县\"},{\"id\":1783,\"text\":\"蓝山县\"},{\"id\":1784,\"text\":\"新田县\"},{\"id\":1785,\"text\":\"江华瑶族自治县\"},{\"id\":1786,\"text\":\"零陵区\"}]},{\"id\":195,\"text\":\"怀化\",\"zip_code\":\"418000\",\"abridge\":\"HH\",\"children\":[{\"id\":1787,\"text\":\"鹤城区\"},{\"id\":1788,\"text\":\"中方县\"},{\"id\":1789,\"text\":\"沅陵县\"},{\"id\":1790,\"text\":\"辰溪县\"},{\"id\":1791,\"text\":\"溆浦县\"},{\"id\":1792,\"text\":\"会同县\"},{\"id\":1793,\"text\":\"麻阳苗族自治县\"},{\"id\":1794,\"text\":\"新晃侗族自治县\"},{\"id\":1795,\"text\":\"芷江侗族自治县\"},{\"id\":1796,\"text\":\"靖州苗族侗族自治县\"},{\"id\":1797,\"text\":\"通道侗族自治县\"},{\"id\":1798,\"text\":\"洪江市\"}]},{\"id\":196,\"text\":\"娄底\",\"zip_code\":\"417000\",\"abridge\":\"LD\",\"children\":[{\"id\":1799,\"text\":\"娄星区\"},{\"id\":1800,\"text\":\"双峰县\"},{\"id\":1801,\"text\":\"新化县\"},{\"id\":1802,\"text\":\"冷水江市\"},{\"id\":1803,\"text\":\"涟源市\"}]},{\"id\":197,\"text\":\"湘西\",\"zip_code\":\"416000\",\"abridge\":\"XX\",\"children\":[{\"id\":1804,\"text\":\"吉首市\"},{\"id\":1805,\"text\":\"泸溪县\"},{\"id\":1806,\"text\":\"凤凰县\"},{\"id\":1807,\"text\":\"花垣县\"},{\"id\":1808,\"text\":\"保靖县\"},{\"id\":1809,\"text\":\"古丈县\"},{\"id\":1810,\"text\":\"永顺县\"},{\"id\":1811,\"text\":\"龙山县\"}]}]},{\"id\":19,\"text\":\"广东\",\"children\":[{\"id\":198,\"text\":\"广州\",\"zip_code\":\"510000\",\"abridge\":\"GZ\",\"children\":[{\"id\":1812,\"text\":\"荔湾区\"},{\"id\":1813,\"text\":\"越秀区\"},{\"id\":1814,\"text\":\"海珠区\"},{\"id\":1815,\"text\":\"天河区\"},{\"id\":1816,\"text\":\"白云区\"},{\"id\":1817,\"text\":\"黄埔区\"},{\"id\":1818,\"text\":\"番禺区\"},{\"id\":1819,\"text\":\"花都区\"},{\"id\":1820,\"text\":\"增城市\"},{\"id\":1821,\"text\":\"从化市\"},{\"id\":1822,\"text\":\"南沙区\"},{\"id\":1823,\"text\":\"萝岗区\"}]},{\"id\":199,\"text\":\"韶关\",\"zip_code\":\"512000\",\"abridge\":\"SG\",\"children\":[{\"id\":1824,\"text\":\"武江区\"},{\"id\":1825,\"text\":\"浈江区\"},{\"id\":1826,\"text\":\"曲江区\"},{\"id\":1827,\"text\":\"始兴县\"},{\"id\":1828,\"text\":\"仁化县\"},{\"id\":1829,\"text\":\"翁源县\"},{\"id\":1830,\"text\":\"乳源瑶族自治县\"},{\"id\":1831,\"text\":\"新丰县\"},{\"id\":1832,\"text\":\"乐昌市\"},{\"id\":1833,\"text\":\"南雄市\"}]},{\"id\":200,\"text\":\"深圳\",\"zip_code\":\"518000\",\"abridge\":\"SZ\",\"children\":[{\"id\":1834,\"text\":\"罗湖区\"},{\"id\":1835,\"text\":\"福田区\"},{\"id\":1836,\"text\":\"南山区\"},{\"id\":1837,\"text\":\"宝安区\"},{\"id\":1838,\"text\":\"龙岗区\"},{\"id\":1839,\"text\":\"盐田区\"},{\"id\":1840,\"text\":\"光明新区\"},{\"id\":1841,\"text\":\"坪山新区\"}]},{\"id\":201,\"text\":\"珠海\",\"zip_code\":\"519000\",\"abridge\":\"ZH\",\"children\":[{\"id\":1842,\"text\":\"香洲区\"},{\"id\":1843,\"text\":\"斗门区\"},{\"id\":1844,\"text\":\"金湾区\"}]},{\"id\":202,\"text\":\"汕头\",\"zip_code\":\"515000\",\"abridge\":\"ST\",\"children\":[{\"id\":1845,\"text\":\"龙湖区\"},{\"id\":1846,\"text\":\"金平区\"},{\"id\":1847,\"text\":\"濠江区\"},{\"id\":1848,\"text\":\"潮阳区\"},{\"id\":1849,\"text\":\"潮南区\"},{\"id\":1850,\"text\":\"澄海区\"},{\"id\":1851,\"text\":\"南澳县\"}]},{\"id\":203,\"text\":\"佛山\",\"zip_code\":\"528000\",\"abridge\":\"FS\",\"children\":[{\"id\":1852,\"text\":\"禅城区\"},{\"id\":1853,\"text\":\"南海区\"},{\"id\":1854,\"text\":\"顺德区\"},{\"id\":1855,\"text\":\"三水区\"},{\"id\":1856,\"text\":\"高明区\"}]},{\"id\":204,\"text\":\"江门\",\"zip_code\":\"529000\",\"abridge\":\"JM\",\"children\":[{\"id\":1857,\"text\":\"蓬江区\"},{\"id\":1858,\"text\":\"江海区\"},{\"id\":1859,\"text\":\"新会区\"},{\"id\":1860,\"text\":\"台山市\"},{\"id\":1861,\"text\":\"开平市\"},{\"id\":1862,\"text\":\"鹤山市\"},{\"id\":1863,\"text\":\"恩平市\"}]},{\"id\":205,\"text\":\"湛江\",\"zip_code\":\"524000\",\"abridge\":\"ZJ\",\"children\":[{\"id\":1864,\"text\":\"赤坎区\"},{\"id\":1865,\"text\":\"霞山区\"},{\"id\":1866,\"text\":\"坡头区\"},{\"id\":1867,\"text\":\"麻章区\"},{\"id\":1868,\"text\":\"遂溪县\"},{\"id\":1869,\"text\":\"徐闻县\"},{\"id\":1870,\"text\":\"廉江市\"},{\"id\":1871,\"text\":\"雷州市\"},{\"id\":1872,\"text\":\"吴川市\"},{\"id\":1873,\"text\":\"开发区\"}]},{\"id\":206,\"text\":\"茂名\",\"zip_code\":\"525000\",\"abridge\":\"MM\",\"children\":[{\"id\":1874,\"text\":\"茂南区\"},{\"id\":1875,\"text\":\"茂港区\"},{\"id\":1876,\"text\":\"电白县\"},{\"id\":1877,\"text\":\"高州市\"},{\"id\":1878,\"text\":\"化州市\"},{\"id\":1879,\"text\":\"信宜市\"}]},{\"id\":207,\"text\":\"肇庆\",\"zip_code\":\"526000\",\"abridge\":\"ZQ\",\"children\":[{\"id\":1880,\"text\":\"端州区\"},{\"id\":1881,\"text\":\"鼎湖区\"},{\"id\":1882,\"text\":\"广宁县\"},{\"id\":1883,\"text\":\"怀集县\"},{\"id\":1884,\"text\":\"封开县\"},{\"id\":1885,\"text\":\"德庆县\"},{\"id\":1886,\"text\":\"高要市\"},{\"id\":1887,\"text\":\"四会市\"},{\"id\":1888,\"text\":\"高新技术产业开发区\"}]},{\"id\":208,\"text\":\"惠州\",\"zip_code\":\"516000\",\"abridge\":\"HZ\",\"children\":[{\"id\":1889,\"text\":\"惠城区\"},{\"id\":1890,\"text\":\"惠阳区\"},{\"id\":1891,\"text\":\"博罗县\"},{\"id\":1892,\"text\":\"惠东县\"},{\"id\":1893,\"text\":\"龙门县\"},{\"id\":1894,\"text\":\"大亚湾区\"},{\"id\":1895,\"text\":\"仲恺高新区\"}]},{\"id\":209,\"text\":\"梅州\",\"zip_code\":\"514000\",\"abridge\":\"MZ\",\"children\":[{\"id\":1896,\"text\":\"梅江区\"},{\"id\":1897,\"text\":\"梅县\"},{\"id\":1898,\"text\":\"大埔县\"},{\"id\":1899,\"text\":\"丰顺县\"},{\"id\":1900,\"text\":\"五华县\"},{\"id\":1901,\"text\":\"平远县\"},{\"id\":1902,\"text\":\"蕉岭县\"},{\"id\":1903,\"text\":\"兴宁市\"}]},{\"id\":210,\"text\":\"汕尾\",\"zip_code\":\"516600\",\"abridge\":\"SW\",\"children\":[{\"id\":1904,\"text\":\"城区\"},{\"id\":1905,\"text\":\"陆丰市\"},{\"id\":1906,\"text\":\"海丰县\"},{\"id\":1907,\"text\":\"陆河县\"}]},{\"id\":211,\"text\":\"河源\",\"zip_code\":\"517000\",\"abridge\":\"HY\",\"children\":[{\"id\":1908,\"text\":\"源城区\"},{\"id\":1909,\"text\":\"紫金县\"},{\"id\":1910,\"text\":\"龙川县\"},{\"id\":1911,\"text\":\"连平县\"},{\"id\":1912,\"text\":\"和平县\"},{\"id\":1913,\"text\":\"东源县\"}]},{\"id\":212,\"text\":\"阳江\",\"zip_code\":\"529500\",\"abridge\":\"YJ\",\"children\":[{\"id\":1914,\"text\":\"江城区\"},{\"id\":1915,\"text\":\"阳西县\"},{\"id\":1916,\"text\":\"阳东县\"},{\"id\":1917,\"text\":\"阳春市\"}]},{\"id\":213,\"text\":\"清远\",\"zip_code\":\"511500\",\"abridge\":\"QY\",\"children\":[{\"id\":1918,\"text\":\"清城区\"},{\"id\":1919,\"text\":\"佛冈县\"},{\"id\":1920,\"text\":\"阳山县\"},{\"id\":1921,\"text\":\"连山壮族瑶族自治县\"},{\"id\":1922,\"text\":\"连南瑶族自治县\"},{\"id\":1923,\"text\":\"清新县\"},{\"id\":1924,\"text\":\"英德市\"},{\"id\":1925,\"text\":\"连州市\"}]},{\"id\":214,\"text\":\"东莞\",\"zip_code\":\"523000\",\"abridge\":\"DG\",\"children\":[{\"id\":1926,\"text\":\"南城区\"},{\"id\":1927,\"text\":\"石龙镇\"},{\"id\":1928,\"text\":\"长安镇\"},{\"id\":1929,\"text\":\"虎门镇\"},{\"id\":1930,\"text\":\"横沥镇\"},{\"id\":1931,\"text\":\"寮步镇\"},{\"id\":1932,\"text\":\"黄江镇\"},{\"id\":1933,\"text\":\"清溪镇\"},{\"id\":1934,\"text\":\"莞城区\"},{\"id\":1935,\"text\":\"万江区\"},{\"id\":1936,\"text\":\"东城区\"},{\"id\":1937,\"text\":\"石碣镇\"},{\"id\":1938,\"text\":\"茶山镇\"},{\"id\":1939,\"text\":\"石排镇\"},{\"id\":1940,\"text\":\"企石镇\"},{\"id\":1941,\"text\":\"桥头镇\"},{\"id\":1942,\"text\":\"谢岗镇\"},{\"id\":1943,\"text\":\"东坑镇\"},{\"id\":1944,\"text\":\"常平镇\"},{\"id\":1945,\"text\":\"大朗镇\"},{\"id\":1946,\"text\":\"塘厦镇\"},{\"id\":1947,\"text\":\"凤岗镇\"},{\"id\":1948,\"text\":\"厚街镇\"},{\"id\":1949,\"text\":\"沙田镇\"},{\"id\":1950,\"text\":\"道滘镇\"},{\"id\":1951,\"text\":\"洪梅镇\"},{\"id\":1952,\"text\":\"麻涌镇\"},{\"id\":1953,\"text\":\"中堂镇\"},{\"id\":1954,\"text\":\"高埗镇\"},{\"id\":1955,\"text\":\"樟木头镇\"},{\"id\":1956,\"text\":\"大岭山镇\"},{\"id\":1957,\"text\":\"望牛墩镇\"},{\"id\":2998,\"text\":\"松山湖\"}]},{\"id\":215,\"text\":\"中山\",\"zip_code\":\"528400\",\"abridge\":\"ZS\",\"children\":[{\"id\":1958,\"text\":\"中山市\"}]},{\"id\":216,\"text\":\"潮州\",\"zip_code\":\"521000\",\"abridge\":\"CZ\",\"children\":[{\"id\":1959,\"text\":\"湘桥区\"},{\"id\":1960,\"text\":\"潮安县\"},{\"id\":1961,\"text\":\"饶平县\"}]},{\"id\":217,\"text\":\"揭阳\",\"zip_code\":\"522000\",\"abridge\":\"XY\",\"children\":[{\"id\":1962,\"text\":\"榕城区\"},{\"id\":1963,\"text\":\"揭东县\"},{\"id\":1964,\"text\":\"揭西县\"},{\"id\":1965,\"text\":\"惠来县\"},{\"id\":1966,\"text\":\"普宁市\"},{\"id\":1967,\"text\":\"东山区\"},{\"id\":1968,\"text\":\"普侨区\"},{\"id\":1969,\"text\":\"大南山侨区\"}]},{\"id\":218,\"text\":\"云浮\",\"zip_code\":\"527300\",\"abridge\":\"YF\",\"children\":[{\"id\":1970,\"text\":\"云城区\"},{\"id\":1971,\"text\":\"新兴县\"},{\"id\":1972,\"text\":\"郁南县\"},{\"id\":1973,\"text\":\"云安县\"},{\"id\":1974,\"text\":\"罗定市\"}]}]},{\"id\":20,\"text\":\"广西\",\"children\":[{\"id\":219,\"text\":\"南宁\",\"zip_code\":\"530000\",\"abridge\":\"NN\",\"children\":[{\"id\":1975,\"text\":\"兴宁区\"},{\"id\":1976,\"text\":\"青秀区\"},{\"id\":1977,\"text\":\"江南区\"},{\"id\":1978,\"text\":\"西乡塘区\"},{\"id\":1979,\"text\":\"良庆区\"},{\"id\":1980,\"text\":\"邕宁区\"},{\"id\":1981,\"text\":\"武鸣县\"},{\"id\":1982,\"text\":\"隆安县\"},{\"id\":1983,\"text\":\"马山县\"},{\"id\":1984,\"text\":\"上林县\"},{\"id\":1985,\"text\":\"宾阳县\"},{\"id\":1986,\"text\":\"横县\"}]},{\"id\":220,\"text\":\"柳州\",\"zip_code\":\"545000\",\"abridge\":\"LZ\",\"children\":[{\"id\":1987,\"text\":\"城中区\"},{\"id\":1988,\"text\":\"鱼峰区\"},{\"id\":1989,\"text\":\"柳南区\"},{\"id\":1990,\"text\":\"柳北区\"},{\"id\":1991,\"text\":\"柳江县\"},{\"id\":1992,\"text\":\"柳城县\"},{\"id\":1993,\"text\":\"鹿寨县\"},{\"id\":1994,\"text\":\"融安县\"},{\"id\":1995,\"text\":\"融水苗族自治县\"},{\"id\":1996,\"text\":\"三江侗族自治县\"}]},{\"id\":221,\"text\":\"桂林\",\"zip_code\":\"541000\",\"abridge\":\"GL\",\"children\":[{\"id\":1997,\"text\":\"秀峰区\"},{\"id\":1998,\"text\":\"叠彩区\"},{\"id\":1999,\"text\":\"象山区\"},{\"id\":2000,\"text\":\"七星区\"},{\"id\":2001,\"text\":\"雁山区\"},{\"id\":2002,\"text\":\"阳朔县\"},{\"id\":2003,\"text\":\"临桂县\"},{\"id\":2004,\"text\":\"灵川县\"},{\"id\":2005,\"text\":\"全州县\"},{\"id\":2006,\"text\":\"兴安县\"},{\"id\":2007,\"text\":\"永福县\"},{\"id\":2008,\"text\":\"灌阳县\"},{\"id\":2009,\"text\":\"龙胜各族自治县\"},{\"id\":2010,\"text\":\"资源县\"},{\"id\":2011,\"text\":\"平乐县\"},{\"id\":2012,\"text\":\"荔浦县\"},{\"id\":2013,\"text\":\"恭城瑶族自治县\"}]},{\"id\":222,\"text\":\"梧州\",\"zip_code\":\"543000\",\"abridge\":\"WZ\",\"children\":[{\"id\":2014,\"text\":\"万秀区\"},{\"id\":2015,\"text\":\"蝶山区\"},{\"id\":2016,\"text\":\"长洲区\"},{\"id\":2017,\"text\":\"苍梧县\"},{\"id\":2018,\"text\":\"藤县\"},{\"id\":2019,\"text\":\"蒙山县\"},{\"id\":2020,\"text\":\"岑溪市\"}]},{\"id\":223,\"text\":\"北海\",\"zip_code\":\"536000\",\"abridge\":\"BH\",\"children\":[{\"id\":2021,\"text\":\"海城区\"},{\"id\":2022,\"text\":\"银海区\"},{\"id\":2023,\"text\":\"铁山港区\"},{\"id\":2024,\"text\":\"合浦县\"}]},{\"id\":224,\"text\":\"防城港\",\"zip_code\":\"538000\",\"abridge\":\"FZG\",\"children\":[{\"id\":2025,\"text\":\"港口区\"},{\"id\":2026,\"text\":\"防城区\"},{\"id\":2027,\"text\":\"上思县\"},{\"id\":2028,\"text\":\"东兴市\"}]},{\"id\":225,\"text\":\"钦州\",\"zip_code\":\"535000\",\"abridge\":\"QZ\",\"children\":[{\"id\":2029,\"text\":\"钦南区\"},{\"id\":2030,\"text\":\"钦北区\"},{\"id\":2031,\"text\":\"灵山县\"},{\"id\":2032,\"text\":\"浦北县\"},{\"id\":2033,\"text\":\"钦州港经济开发区\"}]},{\"id\":226,\"text\":\"贵港\",\"zip_code\":\"537100\",\"abridge\":\"GG\",\"children\":[{\"id\":2034,\"text\":\"港北区\"},{\"id\":2035,\"text\":\"港南区\"},{\"id\":2036,\"text\":\"覃塘区\"},{\"id\":2037,\"text\":\"平南县\"},{\"id\":2038,\"text\":\"桂平市\"}]},{\"id\":227,\"text\":\"玉林\",\"zip_code\":\"537000\",\"abridge\":\"YL\",\"children\":[{\"id\":2039,\"text\":\"玉州区\"},{\"id\":2040,\"text\":\"容县\"},{\"id\":2041,\"text\":\"陆川县\"},{\"id\":2042,\"text\":\"博白县\"},{\"id\":2043,\"text\":\"兴业县\"},{\"id\":2044,\"text\":\"北流市\"}]},{\"id\":228,\"text\":\"百色\",\"zip_code\":\"533000\",\"abridge\":\"BS\",\"children\":[{\"id\":2045,\"text\":\"右江区\"},{\"id\":2046,\"text\":\"田阳县\"},{\"id\":2047,\"text\":\"田东县\"},{\"id\":2048,\"text\":\"平果县\"},{\"id\":2049,\"text\":\"德保县\"},{\"id\":2050,\"text\":\"靖西县\"},{\"id\":2051,\"text\":\"那坡县\"},{\"id\":2052,\"text\":\"凌云县\"},{\"id\":2053,\"text\":\"乐业县\"},{\"id\":2054,\"text\":\"田林县\"},{\"id\":2055,\"text\":\"西林县\"},{\"id\":2056,\"text\":\"隆林各族自治县\"}]},{\"id\":229,\"text\":\"贺州\",\"zip_code\":\"542800\",\"abridge\":\"HZ\",\"children\":[{\"id\":2057,\"text\":\"八步区\"},{\"id\":2058,\"text\":\"昭平县\"},{\"id\":2059,\"text\":\"钟山县\"},{\"id\":2060,\"text\":\"富川瑶族自治县\"}]},{\"id\":230,\"text\":\"河池\",\"zip_code\":\"547000\",\"abridge\":\"HC\",\"children\":[{\"id\":2061,\"text\":\"金城江区\"},{\"id\":2062,\"text\":\"南丹县\"},{\"id\":2063,\"text\":\"天峨县\"},{\"id\":2064,\"text\":\"凤山县\"},{\"id\":2065,\"text\":\"东兰县\"},{\"id\":2066,\"text\":\"罗城仫佬族自治县\"},{\"id\":2067,\"text\":\"环江毛南族自治县\"},{\"id\":2068,\"text\":\"巴马瑶族自治县\"},{\"id\":2069,\"text\":\"都安瑶族自治县\"},{\"id\":2070,\"text\":\"大化瑶族自治县\"},{\"id\":2071,\"text\":\"宜州市\"}]},{\"id\":231,\"text\":\"来宾\",\"zip_code\":\"546100\",\"abridge\":\"LB\",\"children\":[{\"id\":2072,\"text\":\"兴宾区\"},{\"id\":2073,\"text\":\"忻城县\"},{\"id\":2074,\"text\":\"象州县\"},{\"id\":2075,\"text\":\"武宣县\"},{\"id\":2076,\"text\":\"金秀瑶族自治县\"},{\"id\":2077,\"text\":\"合山市\"}]},{\"id\":232,\"text\":\"崇左\",\"zip_code\":\"532200\",\"abridge\":\"ZZ\",\"children\":[{\"id\":2078,\"text\":\"江洲区\"},{\"id\":2079,\"text\":\"扶绥县\"},{\"id\":2080,\"text\":\"宁明县\"},{\"id\":2081,\"text\":\"龙州县\"},{\"id\":2082,\"text\":\"大新县\"},{\"id\":2083,\"text\":\"天等县\"},{\"id\":2084,\"text\":\"凭祥市\"}]}]},{\"id\":21,\"text\":\"海南\",\"children\":[{\"id\":233,\"text\":\"海口\",\"zip_code\":\"570100\",\"abridge\":\"HK\",\"children\":[{\"id\":2085,\"text\":\"秀英区\"},{\"id\":2086,\"text\":\"龙华区\"},{\"id\":2087,\"text\":\"琼山区\"},{\"id\":2088,\"text\":\"美兰区\"}]},{\"id\":234,\"text\":\"三亚\",\"zip_code\":\"572000\",\"abridge\":\"SY\",\"children\":[{\"id\":2089,\"text\":\"河西区\"},{\"id\":2090,\"text\":\"河东区\"},{\"id\":2091,\"text\":\"田独镇\"},{\"id\":2092,\"text\":\"凤凰镇\"},{\"id\":2093,\"text\":\"三亚市\"},{\"id\":2094,\"text\":\"崖城镇\"},{\"id\":2095,\"text\":\"天涯镇\"},{\"id\":2096,\"text\":\"育才乡\"},{\"id\":2097,\"text\":\"海棠湾镇\"}]}]},{\"id\":22,\"text\":\"重庆\",\"children\":[{\"id\":236,\"text\":\"重庆\",\"zip_code\":\"400000\",\"abridge\":\"CQ\",\"children\":[{\"id\":2115,\"text\":\"万州区\"},{\"id\":2116,\"text\":\"涪陵区\"},{\"id\":2117,\"text\":\"渝中区\"},{\"id\":2118,\"text\":\"大渡口区\"},{\"id\":2119,\"text\":\"江北区\"},{\"id\":2120,\"text\":\"沙坪坝区\"},{\"id\":2121,\"text\":\"九龙坡区\"},{\"id\":2122,\"text\":\"南岸区\"},{\"id\":2123,\"text\":\"北碚区\"},{\"id\":2124,\"text\":\"万盛区\"},{\"id\":2125,\"text\":\"双桥区\"},{\"id\":2126,\"text\":\"渝北区\"},{\"id\":2127,\"text\":\"巴南区\"},{\"id\":2128,\"text\":\"黔江区\"},{\"id\":2129,\"text\":\"长寿区\"},{\"id\":2130,\"text\":\"綦江县\"},{\"id\":2131,\"text\":\"潼南县\"},{\"id\":2132,\"text\":\"铜梁县\"},{\"id\":2133,\"text\":\"大足县\"},{\"id\":2134,\"text\":\"荣昌县\"},{\"id\":2135,\"text\":\"璧山县\"},{\"id\":2136,\"text\":\"梁平县\"},{\"id\":2137,\"text\":\"城口县\"},{\"id\":2138,\"text\":\"丰都县\"},{\"id\":2139,\"text\":\"垫江县\"},{\"id\":2140,\"text\":\"武隆县\"},{\"id\":2141,\"text\":\"忠县\"},{\"id\":2142,\"text\":\"开县\"},{\"id\":2143,\"text\":\"云阳县\"},{\"id\":2144,\"text\":\"奉节县\"},{\"id\":2145,\"text\":\"巫山县\"},{\"id\":2146,\"text\":\"巫溪县\"},{\"id\":2147,\"text\":\"石柱土家族自治县\"},{\"id\":2148,\"text\":\"秀山土家族苗族自治县\"},{\"id\":2149,\"text\":\"酉阳土家族苗族自治县\"},{\"id\":2150,\"text\":\"彭水苗族土家族自治县\"},{\"id\":2151,\"text\":\"高新区\"},{\"id\":2152,\"text\":\"江津区\"},{\"id\":2153,\"text\":\"合川区\"},{\"id\":2154,\"text\":\"永川区\"},{\"id\":2155,\"text\":\"南川区\"}]}]},{\"id\":23,\"text\":\"四川\",\"children\":[{\"id\":237,\"text\":\"成都\",\"zip_code\":\"610000\",\"abridge\":\"CD\",\"children\":[{\"id\":2156,\"text\":\"锦江区\"},{\"id\":2157,\"text\":\"青羊区\"},{\"id\":2158,\"text\":\"金牛区\"},{\"id\":2159,\"text\":\"武侯区\"},{\"id\":2160,\"text\":\"成华区\"},{\"id\":2161,\"text\":\"龙泉驿区\"},{\"id\":2162,\"text\":\"青白江区\"},{\"id\":2163,\"text\":\"新都区\"},{\"id\":2164,\"text\":\"温江区\"},{\"id\":2165,\"text\":\"金堂县\"},{\"id\":2166,\"text\":\"双流县\"},{\"id\":2167,\"text\":\"郫县\"},{\"id\":2168,\"text\":\"大邑县\"},{\"id\":2169,\"text\":\"蒲江县\"},{\"id\":2170,\"text\":\"新津县\"},{\"id\":2171,\"text\":\"都江堰市\"},{\"id\":2172,\"text\":\"彭州市\"},{\"id\":2173,\"text\":\"邛崃市\"},{\"id\":2174,\"text\":\"崇州市\"},{\"id\":2175,\"text\":\"高新区\"},{\"id\":2176,\"text\":\"高新西区\"}]},{\"id\":238,\"text\":\"自贡\",\"zip_code\":\"643000\",\"abridge\":\"ZG\",\"children\":[{\"id\":2177,\"text\":\"自流井区\"},{\"id\":2178,\"text\":\"贡井区\"},{\"id\":2179,\"text\":\"大安区\"},{\"id\":2180,\"text\":\"沿滩区\"},{\"id\":2181,\"text\":\"荣县\"},{\"id\":2182,\"text\":\"富顺县\"}]},{\"id\":239,\"text\":\"攀枝花\",\"zip_code\":\"617000\",\"abridge\":\"PZH\",\"children\":[{\"id\":2183,\"text\":\"东区\"},{\"id\":2184,\"text\":\"西区\"},{\"id\":2185,\"text\":\"仁和区\"},{\"id\":2186,\"text\":\"米易县\"},{\"id\":2187,\"text\":\"盐边县\"}]},{\"id\":240,\"text\":\"泸州\",\"zip_code\":\"646000\",\"abridge\":\"LZ\",\"children\":[{\"id\":2188,\"text\":\"江阳区\"},{\"id\":2189,\"text\":\"纳溪区\"},{\"id\":2190,\"text\":\"龙马潭区\"},{\"id\":2191,\"text\":\"泸县\"},{\"id\":2192,\"text\":\"合江县\"},{\"id\":2193,\"text\":\"叙永县\"},{\"id\":2194,\"text\":\"古蔺县\"}]},{\"id\":241,\"text\":\"德阳\",\"zip_code\":\"618000\",\"abridge\":\"DY\",\"children\":[{\"id\":2195,\"text\":\"旌阳区\"},{\"id\":2196,\"text\":\"中江县\"},{\"id\":2197,\"text\":\"罗江县\"},{\"id\":2198,\"text\":\"广汉市\"},{\"id\":2199,\"text\":\"什邡市\"},{\"id\":2200,\"text\":\"绵竹市\"}]},{\"id\":242,\"text\":\"绵阳\",\"zip_code\":\"621000\",\"abridge\":\"MY\",\"children\":[{\"id\":2201,\"text\":\"涪城区\"},{\"id\":2202,\"text\":\"游仙区\"},{\"id\":2203,\"text\":\"三台县\"},{\"id\":2204,\"text\":\"盐亭县\"},{\"id\":2205,\"text\":\"安县\"},{\"id\":2206,\"text\":\"梓潼县\"},{\"id\":2207,\"text\":\"北川羌族自治县\"},{\"id\":2208,\"text\":\"平武县\"},{\"id\":2209,\"text\":\"江油市\"},{\"id\":2210,\"text\":\"农科区\"},{\"id\":2211,\"text\":\"经济技术开发区\"},{\"id\":2212,\"text\":\"高新区\"},{\"id\":2213,\"text\":\"仙海区\"}]},{\"id\":243,\"text\":\"广元\",\"zip_code\":\"628000\",\"abridge\":\"GY\",\"children\":[{\"id\":2214,\"text\":\"利州区\"},{\"id\":2215,\"text\":\"元坝区\"},{\"id\":2216,\"text\":\"朝天区\"},{\"id\":2217,\"text\":\"旺苍县\"},{\"id\":2218,\"text\":\"青川县\"},{\"id\":2219,\"text\":\"剑阁县\"},{\"id\":2220,\"text\":\"苍溪县\"}]},{\"id\":244,\"text\":\"遂宁\",\"zip_code\":\"629000\",\"abridge\":\"SN\",\"children\":[{\"id\":2221,\"text\":\"船山区\"},{\"id\":2222,\"text\":\"安居区\"},{\"id\":2223,\"text\":\"蓬溪县\"},{\"id\":2224,\"text\":\"射洪县\"},{\"id\":2225,\"text\":\"大英县\"}]},{\"id\":245,\"text\":\"内江\",\"zip_code\":\"641000\",\"abridge\":\"NJ\",\"children\":[{\"id\":2226,\"text\":\"市中区\"},{\"id\":2227,\"text\":\"东兴区\"},{\"id\":2228,\"text\":\"威远县\"},{\"id\":2229,\"text\":\"资中县\"},{\"id\":2230,\"text\":\"隆昌县\"}]},{\"id\":246,\"text\":\"乐山\",\"zip_code\":\"614000\",\"abridge\":\"LS\",\"children\":[{\"id\":2231,\"text\":\"市中区\"},{\"id\":2232,\"text\":\"沙湾区\"},{\"id\":2233,\"text\":\"五通桥区\"},{\"id\":2234,\"text\":\"金口河区\"},{\"id\":2235,\"text\":\"犍为县\"},{\"id\":2236,\"text\":\"井研县\"},{\"id\":2237,\"text\":\"夹江县\"},{\"id\":2238,\"text\":\"沐川县\"},{\"id\":2239,\"text\":\"峨边彝族自治县\"},{\"id\":2240,\"text\":\"马边彝族自治县\"},{\"id\":2241,\"text\":\"峨眉山市\"}]},{\"id\":247,\"text\":\"南充\",\"zip_code\":\"637000\",\"abridge\":\"NC\",\"children\":[{\"id\":2242,\"text\":\"顺庆区\"},{\"id\":2243,\"text\":\"高坪区\"},{\"id\":2244,\"text\":\"嘉陵区\"},{\"id\":2245,\"text\":\"南部县\"},{\"id\":2246,\"text\":\"营山县\"},{\"id\":2247,\"text\":\"蓬安县\"},{\"id\":2248,\"text\":\"仪陇县\"},{\"id\":2249,\"text\":\"西充县\"},{\"id\":2250,\"text\":\"阆中市\"}]},{\"id\":248,\"text\":\"眉山\",\"zip_code\":\"620000\",\"abridge\":\"MS\",\"children\":[{\"id\":2251,\"text\":\"东坡区\"},{\"id\":2252,\"text\":\"仁寿县\"},{\"id\":2253,\"text\":\"彭山县\"},{\"id\":2254,\"text\":\"洪雅县\"},{\"id\":2255,\"text\":\"丹棱县\"},{\"id\":2256,\"text\":\"青神县\"}]},{\"id\":249,\"text\":\"宜宾\",\"zip_code\":\"644000\",\"abridge\":\"YB\",\"children\":[{\"id\":2257,\"text\":\"翠屏区\"},{\"id\":2258,\"text\":\"宜宾县\"},{\"id\":2259,\"text\":\"南溪县\"},{\"id\":2260,\"text\":\"江安县\"},{\"id\":2261,\"text\":\"长宁县\"},{\"id\":2262,\"text\":\"高县\"},{\"id\":2263,\"text\":\"珙县\"},{\"id\":2264,\"text\":\"筠连县\"},{\"id\":2265,\"text\":\"兴文县\"},{\"id\":2266,\"text\":\"屏山县\"}]},{\"id\":250,\"text\":\"广安\",\"zip_code\":\"638500\",\"abridge\":\"GA\",\"children\":[{\"id\":2267,\"text\":\"广安区\"},{\"id\":2268,\"text\":\"岳池县\"},{\"id\":2269,\"text\":\"武胜县\"},{\"id\":2270,\"text\":\"邻水县\"},{\"id\":2271,\"text\":\"华蓥市\"}]},{\"id\":251,\"text\":\"达州\",\"zip_code\":\"635000\",\"abridge\":\"DZ\",\"children\":[{\"id\":2272,\"text\":\"通川区\"},{\"id\":2273,\"text\":\"达县\"},{\"id\":2274,\"text\":\"宣汉县\"},{\"id\":2275,\"text\":\"开江县\"},{\"id\":2276,\"text\":\"大竹县\"},{\"id\":2277,\"text\":\"渠县\"},{\"id\":2278,\"text\":\"万源市\"}]},{\"id\":252,\"text\":\"雅安\",\"zip_code\":\"625000\",\"abridge\":\"YA\",\"children\":[{\"id\":2279,\"text\":\"雨城区\"},{\"id\":2280,\"text\":\"名山县\"},{\"id\":2281,\"text\":\"荥经县\"},{\"id\":2282,\"text\":\"汉源县\"},{\"id\":2283,\"text\":\"石棉县\"},{\"id\":2284,\"text\":\"天全县\"},{\"id\":2285,\"text\":\"芦山县\"},{\"id\":2286,\"text\":\"宝兴县\"}]},{\"id\":253,\"text\":\"巴中\",\"zip_code\":\"636600\",\"abridge\":\"BZ\",\"children\":[{\"id\":2287,\"text\":\"巴州区\"},{\"id\":2288,\"text\":\"通江县\"},{\"id\":2289,\"text\":\"南江县\"},{\"id\":2290,\"text\":\"平昌县\"}]},{\"id\":254,\"text\":\"资阳\",\"zip_code\":\"641300\",\"abridge\":\"ZY\",\"children\":[{\"id\":2291,\"text\":\"雁江区\"},{\"id\":2292,\"text\":\"安岳县\"},{\"id\":2293,\"text\":\"乐至县\"},{\"id\":2294,\"text\":\"简阳市\"}]},{\"id\":255,\"text\":\"阿坝\",\"zip_code\":\"624000\",\"abridge\":\"AB\",\"children\":[{\"id\":2295,\"text\":\"汶川县\"},{\"id\":2296,\"text\":\"理县\"},{\"id\":2297,\"text\":\"茂县\"},{\"id\":2298,\"text\":\"松潘县\"},{\"id\":2299,\"text\":\"九寨沟县\"},{\"id\":2300,\"text\":\"金川县\"},{\"id\":2301,\"text\":\"小金县\"},{\"id\":2302,\"text\":\"黑水县\"},{\"id\":2303,\"text\":\"马尔康县\"},{\"id\":2304,\"text\":\"壤塘县\"},{\"id\":2305,\"text\":\"阿坝县\"},{\"id\":2306,\"text\":\"若尔盖县\"},{\"id\":2307,\"text\":\"红原县\"}]},{\"id\":256,\"text\":\"甘孜\",\"zip_code\":\"626000\",\"abridge\":\"GZ\",\"children\":[{\"id\":2308,\"text\":\"康定县\"},{\"id\":2309,\"text\":\"泸定县\"},{\"id\":2310,\"text\":\"丹巴县\"},{\"id\":2311,\"text\":\"九龙县\"},{\"id\":2312,\"text\":\"雅江县\"},{\"id\":2313,\"text\":\"道孚县\"},{\"id\":2314,\"text\":\"炉霍县\"},{\"id\":2315,\"text\":\"甘孜县\"},{\"id\":2316,\"text\":\"新龙县\"},{\"id\":2317,\"text\":\"德格县\"},{\"id\":2318,\"text\":\"白玉县\"},{\"id\":2319,\"text\":\"石渠县\"},{\"id\":2320,\"text\":\"色达县\"},{\"id\":2321,\"text\":\"理塘县\"},{\"id\":2322,\"text\":\"巴塘县\"},{\"id\":2323,\"text\":\"乡城县\"},{\"id\":2324,\"text\":\"稻城县\"},{\"id\":2325,\"text\":\"得荣县\"}]},{\"id\":257,\"text\":\"凉山\",\"zip_code\":\"615000\",\"abridge\":\"LS\",\"children\":[{\"id\":2326,\"text\":\"西昌市\"},{\"id\":2327,\"text\":\"木里藏族自治县\"},{\"id\":2328,\"text\":\"盐源县\"},{\"id\":2329,\"text\":\"德昌县\"},{\"id\":2330,\"text\":\"会理县\"},{\"id\":2331,\"text\":\"会东县\"},{\"id\":2332,\"text\":\"宁南县\"},{\"id\":2333,\"text\":\"普格县\"},{\"id\":2334,\"text\":\"布拖县\"},{\"id\":2335,\"text\":\"金阳县\"},{\"id\":2336,\"text\":\"昭觉县\"},{\"id\":2337,\"text\":\"喜德县\"},{\"id\":2338,\"text\":\"冕宁县\"},{\"id\":2339,\"text\":\"越西县\"},{\"id\":2340,\"text\":\"甘洛县\"},{\"id\":2341,\"text\":\"美姑县\"},{\"id\":2342,\"text\":\"雷波县\"}]}]},{\"id\":24,\"text\":\"贵州\",\"children\":[{\"id\":258,\"text\":\"贵阳\",\"zip_code\":\"550000\",\"abridge\":\"GY\",\"children\":[{\"id\":2343,\"text\":\"南明区\"},{\"id\":2344,\"text\":\"云岩区\"},{\"id\":2345,\"text\":\"花溪区\"},{\"id\":2346,\"text\":\"乌当区\"},{\"id\":2347,\"text\":\"白云区\"},{\"id\":2348,\"text\":\"小河区\"},{\"id\":2349,\"text\":\"开阳县\"},{\"id\":2350,\"text\":\"息烽县\"},{\"id\":2351,\"text\":\"修文县\"},{\"id\":2352,\"text\":\"清镇市\"},{\"id\":2353,\"text\":\"金阳新区\"}]},{\"id\":259,\"text\":\"六盘水\",\"zip_code\":\"553000\",\"abridge\":\"LPS\",\"children\":[{\"id\":2354,\"text\":\"钟山区\"},{\"id\":2355,\"text\":\"六枝特区\"},{\"id\":2356,\"text\":\"水城县\"},{\"id\":2357,\"text\":\"盘县\"}]},{\"id\":260,\"text\":\"遵义\",\"zip_code\":\"563000\",\"abridge\":\"ZY\",\"children\":[{\"id\":2358,\"text\":\"红花岗区\"},{\"id\":2359,\"text\":\"汇川区\"},{\"id\":2360,\"text\":\"遵义县\"},{\"id\":2361,\"text\":\"桐梓县\"},{\"id\":2362,\"text\":\"绥阳县\"},{\"id\":2363,\"text\":\"正安县\"},{\"id\":2364,\"text\":\"道真仡佬族苗族自治县\"},{\"id\":2365,\"text\":\"务川仡佬族苗族自治县\"},{\"id\":2366,\"text\":\"凤冈县\"},{\"id\":2367,\"text\":\"湄潭县\"},{\"id\":2368,\"text\":\"余庆县\"},{\"id\":2369,\"text\":\"习水县\"},{\"id\":2370,\"text\":\"赤水市\"},{\"id\":2371,\"text\":\"仁怀市\"}]},{\"id\":261,\"text\":\"安顺\",\"zip_code\":\"561000\",\"abridge\":\"AS\",\"children\":[{\"id\":2372,\"text\":\"西秀区\"},{\"id\":2373,\"text\":\"平坝县\"},{\"id\":2374,\"text\":\"普定县\"},{\"id\":2375,\"text\":\"镇宁布依族苗族自治县\"},{\"id\":2376,\"text\":\"关岭布依族苗族自治县\"},{\"id\":2377,\"text\":\"紫云苗族布依族自治县\"}]},{\"id\":262,\"text\":\"铜仁\",\"zip_code\":\"554300\",\"abridge\":\"TR\",\"children\":[{\"id\":2378,\"text\":\"铜仁市\"},{\"id\":2379,\"text\":\"江口县\"},{\"id\":2380,\"text\":\"玉屏侗族自治县\"},{\"id\":2381,\"text\":\"石阡县\"},{\"id\":2382,\"text\":\"思南县\"},{\"id\":2383,\"text\":\"印江土家族苗族自治县\"},{\"id\":2384,\"text\":\"德江县\"},{\"id\":2385,\"text\":\"沿河土家族自治县\"},{\"id\":2386,\"text\":\"松桃苗族自治县\"},{\"id\":2387,\"text\":\"万山特区\"}]},{\"id\":263,\"text\":\"黔西\",\"zip_code\":\"562400\",\"abridge\":\"QX\",\"children\":[{\"id\":2388,\"text\":\"兴义市\"},{\"id\":2389,\"text\":\"兴仁县\"},{\"id\":2390,\"text\":\"普安县\"},{\"id\":2391,\"text\":\"晴隆县\"},{\"id\":2392,\"text\":\"贞丰县\"},{\"id\":2393,\"text\":\"望谟县\"},{\"id\":2394,\"text\":\"册亨县\"},{\"id\":2395,\"text\":\"安龙县\"}]},{\"id\":264,\"text\":\"毕节\",\"zip_code\":\"551700\",\"abridge\":\"BJ\",\"children\":[{\"id\":2396,\"text\":\"毕节市\"},{\"id\":2397,\"text\":\"大方县\"},{\"id\":2398,\"text\":\"黔西县\"},{\"id\":2399,\"text\":\"金沙县\"},{\"id\":2400,\"text\":\"织金县\"},{\"id\":2401,\"text\":\"纳雍县\"},{\"id\":2402,\"text\":\"威宁彝族回族苗族自治县\"},{\"id\":2403,\"text\":\"赫章县\"}]},{\"id\":265,\"text\":\"黔东\",\"zip_code\":\"556000\",\"abridge\":\"QD\",\"children\":[{\"id\":2404,\"text\":\"凯里市\"},{\"id\":2405,\"text\":\"黄平县\"},{\"id\":2406,\"text\":\"施秉县\"},{\"id\":2407,\"text\":\"三穗县\"},{\"id\":2408,\"text\":\"镇远县\"},{\"id\":2409,\"text\":\"岑巩县\"},{\"id\":2410,\"text\":\"天柱县\"},{\"id\":2411,\"text\":\"锦屏县\"},{\"id\":2412,\"text\":\"剑河县\"},{\"id\":2413,\"text\":\"台江县\"},{\"id\":2414,\"text\":\"黎平县\"},{\"id\":2415,\"text\":\"榕江县\"},{\"id\":2416,\"text\":\"从江县\"},{\"id\":2417,\"text\":\"雷山县\"},{\"id\":2418,\"text\":\"麻江县\"},{\"id\":2419,\"text\":\"丹寨县\"}]},{\"id\":266,\"text\":\"黔南\",\"zip_code\":\"558000\",\"abridge\":\"QN\",\"children\":[{\"id\":2420,\"text\":\"都匀市\"},{\"id\":2421,\"text\":\"福泉市\"},{\"id\":2422,\"text\":\"荔波县\"},{\"id\":2423,\"text\":\"贵定县\"},{\"id\":2424,\"text\":\"瓮安县\"},{\"id\":2425,\"text\":\"独山县\"},{\"id\":2426,\"text\":\"平塘县\"},{\"id\":2427,\"text\":\"罗甸县\"},{\"id\":2428,\"text\":\"长顺县\"},{\"id\":2429,\"text\":\"龙里县\"},{\"id\":2430,\"text\":\"惠水县\"},{\"id\":2431,\"text\":\"三都水族自治县\"}]}]},{\"id\":25,\"text\":\"云南\",\"children\":[{\"id\":267,\"text\":\"昆明\",\"zip_code\":\"650000\",\"abridge\":\"KM\",\"children\":[{\"id\":2432,\"text\":\"五华区\"},{\"id\":2433,\"text\":\"盘龙区\"},{\"id\":2434,\"text\":\"官渡区\"},{\"id\":2435,\"text\":\"西山区\"},{\"id\":2436,\"text\":\"东川区\"},{\"id\":2437,\"text\":\"呈贡县\"},{\"id\":2438,\"text\":\"晋宁县\"},{\"id\":2439,\"text\":\"富民县\"},{\"id\":2440,\"text\":\"宜良县\"},{\"id\":2441,\"text\":\"石林彝族自治县\"},{\"id\":2442,\"text\":\"嵩明县\"},{\"id\":2443,\"text\":\"禄劝彝族苗族自治县\"},{\"id\":2444,\"text\":\"寻甸回族彝族自治县\"},{\"id\":2445,\"text\":\"安宁市\"}]},{\"id\":268,\"text\":\"曲靖\",\"zip_code\":\"655000\",\"abridge\":\"QJ\",\"children\":[{\"id\":2446,\"text\":\"麒麟区\"},{\"id\":2447,\"text\":\"马龙县\"},{\"id\":2448,\"text\":\"陆良县\"},{\"id\":2449,\"text\":\"师宗县\"},{\"id\":2450,\"text\":\"罗平县\"},{\"id\":2451,\"text\":\"富源县\"},{\"id\":2452,\"text\":\"会泽县\"},{\"id\":2453,\"text\":\"沾益县\"},{\"id\":2454,\"text\":\"宣威市\"}]},{\"id\":269,\"text\":\"玉溪\",\"zip_code\":\"653100\",\"abridge\":\"YX\",\"children\":[{\"id\":2455,\"text\":\"红塔区\"},{\"id\":2456,\"text\":\"江川县\"},{\"id\":2457,\"text\":\"澄江县\"},{\"id\":2458,\"text\":\"通海县\"},{\"id\":2459,\"text\":\"华宁县\"},{\"id\":2460,\"text\":\"易门县\"},{\"id\":2461,\"text\":\"峨山彝族自治县\"},{\"id\":2462,\"text\":\"新平彝族傣族自治县\"},{\"id\":2463,\"text\":\"元江哈尼族彝族傣族自治县\"}]},{\"id\":270,\"text\":\"保山\",\"zip_code\":\"678000\",\"abridge\":\"BS\",\"children\":[{\"id\":2464,\"text\":\"隆阳区\"},{\"id\":2465,\"text\":\"施甸县\"},{\"id\":2466,\"text\":\"腾冲县\"},{\"id\":2467,\"text\":\"龙陵县\"},{\"id\":2468,\"text\":\"昌宁县\"}]},{\"id\":271,\"text\":\"昭通\",\"zip_code\":\"657000\",\"abridge\":\"ZT\",\"children\":[{\"id\":2469,\"text\":\"昭阳区\"},{\"id\":2470,\"text\":\"鲁甸县\"},{\"id\":2471,\"text\":\"巧家县\"},{\"id\":2472,\"text\":\"盐津县\"},{\"id\":2473,\"text\":\"大关县\"},{\"id\":2474,\"text\":\"永善县\"},{\"id\":2475,\"text\":\"绥江县\"},{\"id\":2476,\"text\":\"镇雄县\"},{\"id\":2477,\"text\":\"彝良县\"},{\"id\":2478,\"text\":\"威信县\"},{\"id\":2479,\"text\":\"水富县\"}]},{\"id\":272,\"text\":\"丽江\",\"zip_code\":\"674100\",\"abridge\":\"LJ\",\"children\":[{\"id\":2480,\"text\":\"古城区\"},{\"id\":2481,\"text\":\"玉龙纳西族自治县\"},{\"id\":2482,\"text\":\"永胜县\"},{\"id\":2483,\"text\":\"华坪县\"},{\"id\":2484,\"text\":\"宁蒗彝族自治县\"}]},{\"id\":273,\"text\":\"普洱\",\"zip_code\":\"665000\",\"abridge\":\"PR\",\"children\":[{\"id\":2485,\"text\":\"思茅区\"},{\"id\":2486,\"text\":\"宁洱哈尼族彝族自治县\"},{\"id\":2487,\"text\":\"墨江哈尼族自治县\"},{\"id\":2488,\"text\":\"景东彝族自治县\"},{\"id\":2489,\"text\":\"景谷傣族彝族自治县\"},{\"id\":2490,\"text\":\"镇沅彝族哈尼族拉祜族自治县\"},{\"id\":2491,\"text\":\"江城哈尼族彝族自治县\"},{\"id\":2492,\"text\":\"孟连傣族拉祜族佤族自治县\"},{\"id\":2493,\"text\":\"澜沧拉祜族自治县\"},{\"id\":2494,\"text\":\"西盟佤族自治县\"}]},{\"id\":274,\"text\":\"临沧\",\"zip_code\":\"677000\",\"abridge\":\"LC\",\"children\":[{\"id\":2495,\"text\":\"临翔区\"},{\"id\":2496,\"text\":\"凤庆县\"},{\"id\":2497,\"text\":\"云县\"},{\"id\":2498,\"text\":\"永德县\"},{\"id\":2499,\"text\":\"镇康县\"},{\"id\":2500,\"text\":\"双江拉祜族佤族布朗族傣族自治县\"},{\"id\":2501,\"text\":\"耿马傣族佤族自治县\"},{\"id\":2502,\"text\":\"沧源佤族自治县\"}]},{\"id\":275,\"text\":\"楚雄\",\"zip_code\":\"675000\",\"abridge\":\"CX\",\"children\":[{\"id\":2503,\"text\":\"楚雄市\"},{\"id\":2504,\"text\":\"双柏县\"},{\"id\":2505,\"text\":\"牟定县\"},{\"id\":2506,\"text\":\"南华县\"},{\"id\":2507,\"text\":\"姚安县\"},{\"id\":2508,\"text\":\"大姚县\"},{\"id\":2509,\"text\":\"永仁县\"},{\"id\":2510,\"text\":\"元谋县\"},{\"id\":2511,\"text\":\"武定县\"},{\"id\":2512,\"text\":\"禄丰县\"}]},{\"id\":276,\"text\":\"红河\",\"zip_code\":\"661400\",\"abridge\":\"HH\",\"children\":[{\"id\":2513,\"text\":\"个旧市\"},{\"id\":2514,\"text\":\"开远市\"},{\"id\":2515,\"text\":\"蒙自县\"},{\"id\":2516,\"text\":\"屏边苗族自治县\"},{\"id\":2517,\"text\":\"建水县\"},{\"id\":2518,\"text\":\"石屏县\"},{\"id\":2519,\"text\":\"弥勒县\"},{\"id\":2520,\"text\":\"泸西县\"},{\"id\":2521,\"text\":\"元阳县\"},{\"id\":2522,\"text\":\"红河县\"},{\"id\":2523,\"text\":\"金平苗族瑶族傣族自治县\"},{\"id\":2524,\"text\":\"绿春县\"},{\"id\":2525,\"text\":\"河口瑶族自治县\"}]},{\"id\":277,\"text\":\"文山\",\"zip_code\":\"663000\",\"abridge\":\"WS\",\"children\":[{\"id\":2526,\"text\":\"文山县\"},{\"id\":2527,\"text\":\"砚山县\"},{\"id\":2528,\"text\":\"西畴县\"},{\"id\":2529,\"text\":\"麻栗坡县\"},{\"id\":2530,\"text\":\"马关县\"},{\"id\":2531,\"text\":\"丘北县\"},{\"id\":2532,\"text\":\"广南县\"},{\"id\":2533,\"text\":\"富宁县\"}]},{\"id\":278,\"text\":\"西双版纳\",\"zip_code\":\"666100\",\"abridge\":\"XSBN\",\"children\":[{\"id\":2534,\"text\":\"景洪市\"},{\"id\":2535,\"text\":\"勐海县\"},{\"id\":2536,\"text\":\"勐腊县\"}]},{\"id\":279,\"text\":\"大理\",\"zip_code\":\"671000\",\"abridge\":\"DL\",\"children\":[{\"id\":2537,\"text\":\"大理市\"},{\"id\":2538,\"text\":\"漾濞彝族自治县\"},{\"id\":2539,\"text\":\"祥云县\"},{\"id\":2540,\"text\":\"宾川县\"},{\"id\":2541,\"text\":\"弥渡县\"},{\"id\":2542,\"text\":\"南涧彝族自治县\"},{\"id\":2543,\"text\":\"巍山彝族回族自治县\"},{\"id\":2544,\"text\":\"永平县\"},{\"id\":2545,\"text\":\"云龙县\"},{\"id\":2546,\"text\":\"洱源县\"},{\"id\":2547,\"text\":\"剑川县\"},{\"id\":2548,\"text\":\"鹤庆县\"}]},{\"id\":280,\"text\":\"德宏\",\"zip_code\":\"678400\",\"abridge\":\"DH\",\"children\":[{\"id\":2549,\"text\":\"瑞丽市\"},{\"id\":2550,\"text\":\"潞西市\"},{\"id\":2551,\"text\":\"梁河县\"},{\"id\":2552,\"text\":\"盈江县\"},{\"id\":2553,\"text\":\"陇川县\"}]},{\"id\":281,\"text\":\"怒江\",\"zip_code\":\"673100\",\"abridge\":\"NJ\",\"children\":[{\"id\":2554,\"text\":\"泸水县\"},{\"id\":2555,\"text\":\"福贡县\"},{\"id\":2556,\"text\":\"贡山独龙族怒族自治县\"},{\"id\":2557,\"text\":\"兰坪白族普米族自治县\"}]},{\"id\":282,\"text\":\"迪庆\",\"zip_code\":\"674400\",\"abridge\":\"DQ\",\"children\":[{\"id\":2558,\"text\":\"香格里拉县\"},{\"id\":2559,\"text\":\"德钦县\"},{\"id\":2560,\"text\":\"维西傈僳族自治县\"}]}]},{\"id\":26,\"text\":\"西藏\",\"children\":[{\"id\":283,\"text\":\"拉萨\",\"zip_code\":\"850000\",\"abridge\":\"LS\",\"children\":[{\"id\":2561,\"text\":\"城关区\"},{\"id\":2562,\"text\":\"林周县\"},{\"id\":2563,\"text\":\"当雄县\"},{\"id\":2564,\"text\":\"尼木县\"},{\"id\":2565,\"text\":\"曲水县\"},{\"id\":2566,\"text\":\"堆龙德庆县\"},{\"id\":2567,\"text\":\"达孜县\"},{\"id\":2568,\"text\":\"墨竹工卡县\"}]},{\"id\":284,\"text\":\"昌都\",\"zip_code\":\"854000\",\"abridge\":\"CD\",\"children\":[{\"id\":2569,\"text\":\"昌都县\"},{\"id\":2570,\"text\":\"江达县\"},{\"id\":2571,\"text\":\"贡觉县\"},{\"id\":2572,\"text\":\"类乌齐县\"},{\"id\":2573,\"text\":\"丁青县\"},{\"id\":2574,\"text\":\"察雅县\"},{\"id\":2575,\"text\":\"八宿县\"},{\"id\":2576,\"text\":\"左贡县\"},{\"id\":2577,\"text\":\"芒康县\"},{\"id\":2578,\"text\":\"洛隆县\"},{\"id\":2579,\"text\":\"边坝县\"}]},{\"id\":285,\"text\":\"山南\",\"zip_code\":\"856000\",\"abridge\":\"SN\",\"children\":[{\"id\":2580,\"text\":\"乃东县\"},{\"id\":2581,\"text\":\"扎囊县\"},{\"id\":2582,\"text\":\"贡嘎县\"},{\"id\":2583,\"text\":\"桑日县\"},{\"id\":2584,\"text\":\"琼结县\"},{\"id\":2585,\"text\":\"曲松县\"},{\"id\":2586,\"text\":\"措美县\"},{\"id\":2587,\"text\":\"洛扎县\"},{\"id\":2588,\"text\":\"加查县\"},{\"id\":2589,\"text\":\"隆子县\"},{\"id\":2590,\"text\":\"错那县\"},{\"id\":2591,\"text\":\"浪卡子县\"}]},{\"id\":286,\"text\":\"日喀则\",\"zip_code\":\"857000\",\"abridge\":\"RKZ\",\"children\":[{\"id\":2592,\"text\":\"日喀则市\"},{\"id\":2593,\"text\":\"南木林县\"},{\"id\":2594,\"text\":\"江孜县\"},{\"id\":2595,\"text\":\"定日县\"},{\"id\":2596,\"text\":\"萨迦县\"},{\"id\":2597,\"text\":\"拉孜县\"},{\"id\":2598,\"text\":\"昂仁县\"},{\"id\":2599,\"text\":\"谢通门县\"},{\"id\":2600,\"text\":\"白朗县\"},{\"id\":2601,\"text\":\"仁布县\"},{\"id\":2602,\"text\":\"康马县\"},{\"id\":2603,\"text\":\"定结县\"},{\"id\":2604,\"text\":\"仲巴县\"},{\"id\":2605,\"text\":\"亚东县\"},{\"id\":2606,\"text\":\"吉隆县\"},{\"id\":2607,\"text\":\"聂拉木县\"},{\"id\":2608,\"text\":\"萨嘎县\"},{\"id\":2609,\"text\":\"岗巴县\"}]},{\"id\":287,\"text\":\"那曲\",\"zip_code\":\"852000\",\"abridge\":\"NQ\",\"children\":[{\"id\":2610,\"text\":\"那曲县\"},{\"id\":2611,\"text\":\"嘉黎县\"},{\"id\":2612,\"text\":\"比如县\"},{\"id\":2613,\"text\":\"聂荣县\"},{\"id\":2614,\"text\":\"安多县\"},{\"id\":2615,\"text\":\"申扎县\"},{\"id\":2616,\"text\":\"索县\"},{\"id\":2617,\"text\":\"班戈县\"},{\"id\":2618,\"text\":\"巴青县\"},{\"id\":2619,\"text\":\"尼玛县\"}]},{\"id\":288,\"text\":\"阿里\",\"zip_code\":\"859000\",\"abridge\":\"AL\",\"children\":[{\"id\":2620,\"text\":\"普兰县\"},{\"id\":2621,\"text\":\"札达县\"},{\"id\":2622,\"text\":\"噶尔县\"},{\"id\":2623,\"text\":\"日土县\"},{\"id\":2624,\"text\":\"革吉县\"},{\"id\":2625,\"text\":\"改则县\"},{\"id\":2626,\"text\":\"措勤县\"}]},{\"id\":289,\"text\":\"林芝\",\"zip_code\":\"860000\",\"abridge\":\"LZ\",\"children\":[{\"id\":2627,\"text\":\"林芝县\"},{\"id\":2628,\"text\":\"工布江达县\"},{\"id\":2629,\"text\":\"米林县\"},{\"id\":2630,\"text\":\"墨脱县\"},{\"id\":2631,\"text\":\"波密县\"},{\"id\":2632,\"text\":\"察隅县\"},{\"id\":2633,\"text\":\"朗县\"}]}]},{\"id\":27,\"text\":\"陕西\",\"children\":[{\"id\":290,\"text\":\"西安\",\"zip_code\":\"710000\",\"abridge\":\"XA\",\"children\":[{\"id\":2634,\"text\":\"新城区\"},{\"id\":2635,\"text\":\"碑林区\"},{\"id\":2636,\"text\":\"莲湖区\"},{\"id\":2637,\"text\":\"灞桥区\"},{\"id\":2638,\"text\":\"未央区\"},{\"id\":2639,\"text\":\"雁塔区\"},{\"id\":2640,\"text\":\"阎良区\"},{\"id\":2641,\"text\":\"临潼区\"},{\"id\":2642,\"text\":\"长安区\"},{\"id\":2643,\"text\":\"蓝田县\"},{\"id\":2644,\"text\":\"周至县\"},{\"id\":2645,\"text\":\"户县\"},{\"id\":2646,\"text\":\"高陵县\"},{\"id\":2647,\"text\":\"高新区\"}]},{\"id\":291,\"text\":\"铜川\",\"zip_code\":\"727000\",\"abridge\":\"TC\",\"children\":[{\"id\":2648,\"text\":\"王益区\"},{\"id\":2649,\"text\":\"印台区\"},{\"id\":2650,\"text\":\"耀州区\"},{\"id\":2651,\"text\":\"宜君县\"},{\"id\":2652,\"text\":\"新区\"}]},{\"id\":292,\"text\":\"宝鸡\",\"zip_code\":\"721000\",\"abridge\":\"BJ\",\"children\":[{\"id\":2653,\"text\":\"渭滨区\"},{\"id\":2654,\"text\":\"金台区\"},{\"id\":2655,\"text\":\"陈仓区\"},{\"id\":2656,\"text\":\"凤翔县\"},{\"id\":2657,\"text\":\"岐山县\"},{\"id\":2658,\"text\":\"扶风县\"},{\"id\":2659,\"text\":\"眉县\"},{\"id\":2660,\"text\":\"陇县\"},{\"id\":2661,\"text\":\"千阳县\"},{\"id\":2662,\"text\":\"麟游县\"},{\"id\":2663,\"text\":\"凤县\"},{\"id\":2664,\"text\":\"太白县\"}]},{\"id\":293,\"text\":\"咸阳\",\"zip_code\":\"712000\",\"abridge\":\"XY\",\"children\":[{\"id\":2665,\"text\":\"秦都区\"},{\"id\":2666,\"text\":\"渭城区\"},{\"id\":2667,\"text\":\"杨陵区\"},{\"id\":2668,\"text\":\"三原县\"},{\"id\":2669,\"text\":\"泾阳县\"},{\"id\":2670,\"text\":\"兴平市\"},{\"id\":2671,\"text\":\"乾县\"},{\"id\":2672,\"text\":\"礼泉县\"},{\"id\":2673,\"text\":\"永寿县\"},{\"id\":2674,\"text\":\"彬县\"},{\"id\":2675,\"text\":\"长武县\"},{\"id\":2676,\"text\":\"旬邑县\"},{\"id\":2677,\"text\":\"淳化县\"},{\"id\":2678,\"text\":\"武功县\"}]},{\"id\":294,\"text\":\"渭南\",\"zip_code\":\"714000\",\"abridge\":\"WN\",\"children\":[{\"id\":2679,\"text\":\"临渭区\"},{\"id\":2680,\"text\":\"华县\"},{\"id\":2681,\"text\":\"潼关县\"},{\"id\":2682,\"text\":\"大荔县\"},{\"id\":2683,\"text\":\"合阳县\"},{\"id\":2684,\"text\":\"澄城县\"},{\"id\":2685,\"text\":\"蒲城县\"},{\"id\":2686,\"text\":\"白水县\"},{\"id\":2687,\"text\":\"富平县\"},{\"id\":2688,\"text\":\"韩城市\"},{\"id\":2689,\"text\":\"华阴市\"}]},{\"id\":295,\"text\":\"延安\",\"zip_code\":\"716000\",\"abridge\":\"YA\",\"children\":[{\"id\":2690,\"text\":\"宝塔区\"},{\"id\":2691,\"text\":\"延长县\"},{\"id\":2692,\"text\":\"延川县\"},{\"id\":2693,\"text\":\"子长县\"},{\"id\":2694,\"text\":\"安塞县\"},{\"id\":2695,\"text\":\"志丹县\"},{\"id\":2696,\"text\":\"吴旗县\"},{\"id\":2697,\"text\":\"甘泉县\"},{\"id\":2698,\"text\":\"富县\"},{\"id\":2699,\"text\":\"洛川县\"},{\"id\":2700,\"text\":\"宜川县\"},{\"id\":2701,\"text\":\"黄龙县\"},{\"id\":2702,\"text\":\"黄陵县\"}]},{\"id\":296,\"text\":\"汉中\",\"zip_code\":\"723000\",\"abridge\":\"HZ\",\"children\":[{\"id\":2703,\"text\":\"汉台区\"},{\"id\":2704,\"text\":\"南郑县\"},{\"id\":2705,\"text\":\"城固县\"},{\"id\":2706,\"text\":\"洋县\"},{\"id\":2707,\"text\":\"西乡县\"},{\"id\":2708,\"text\":\"勉县\"},{\"id\":2709,\"text\":\"宁强县\"},{\"id\":2710,\"text\":\"略阳县\"},{\"id\":2711,\"text\":\"镇巴县\"},{\"id\":2712,\"text\":\"留坝县\"},{\"id\":2713,\"text\":\"佛坪县\"},{\"id\":2714,\"text\":\"经济开发区\"}]},{\"id\":297,\"text\":\"榆林\",\"zip_code\":\"719000\",\"abridge\":\"YL\",\"children\":[{\"id\":2715,\"text\":\"榆阳区\"},{\"id\":2716,\"text\":\"神木县\"},{\"id\":2717,\"text\":\"府谷县\"},{\"id\":2718,\"text\":\"横山县\"},{\"id\":2719,\"text\":\"靖边县\"},{\"id\":2720,\"text\":\"定边县\"},{\"id\":2721,\"text\":\"绥德县\"},{\"id\":2722,\"text\":\"米脂县\"},{\"id\":2723,\"text\":\"佳县\"},{\"id\":2724,\"text\":\"吴堡县\"},{\"id\":2725,\"text\":\"清涧县\"},{\"id\":2726,\"text\":\"子洲县\"}]},{\"id\":298,\"text\":\"安康\",\"zip_code\":\"725000\",\"abridge\":\"AK\",\"children\":[{\"id\":2727,\"text\":\"汉滨区\"},{\"id\":2728,\"text\":\"汉阴县\"},{\"id\":2729,\"text\":\"石泉县\"},{\"id\":2730,\"text\":\"宁陕县\"},{\"id\":2731,\"text\":\"紫阳县\"},{\"id\":2732,\"text\":\"岚皋县\"},{\"id\":2733,\"text\":\"平利县\"},{\"id\":2734,\"text\":\"镇坪县\"},{\"id\":2735,\"text\":\"旬阳县\"},{\"id\":2736,\"text\":\"白河县\"}]},{\"id\":299,\"text\":\"商洛\",\"zip_code\":\"726000\",\"abridge\":\"SL\",\"children\":[{\"id\":2737,\"text\":\"商州区\"},{\"id\":2738,\"text\":\"洛南县\"},{\"id\":2739,\"text\":\"丹凤县\"},{\"id\":2740,\"text\":\"商南县\"},{\"id\":2741,\"text\":\"山阳县\"},{\"id\":2742,\"text\":\"镇安县\"},{\"id\":2743,\"text\":\"柞水县\"}]}]},{\"id\":28,\"text\":\"甘肃\",\"children\":[{\"id\":300,\"text\":\"兰州\",\"zip_code\":\"730000\",\"abridge\":\"LZ\",\"children\":[{\"id\":2744,\"text\":\"城关区\"},{\"id\":2745,\"text\":\"七里河区\"},{\"id\":2746,\"text\":\"西固区\"},{\"id\":2747,\"text\":\"安宁区\"},{\"id\":2748,\"text\":\"红古区\"},{\"id\":2749,\"text\":\"永登县\"},{\"id\":2750,\"text\":\"皋兰县\"},{\"id\":2751,\"text\":\"榆中县\"}]},{\"id\":301,\"text\":\"嘉峪关\",\"zip_code\":\"735100\",\"abridge\":\"JYG\",\"children\":[{\"id\":2752,\"text\":\"嘉峪关市\"}]},{\"id\":302,\"text\":\"金昌\",\"zip_code\":\"737100\",\"abridge\":\"JC\",\"children\":[{\"id\":2753,\"text\":\"金川区\"},{\"id\":2754,\"text\":\"永昌县\"}]},{\"id\":303,\"text\":\"白银\",\"zip_code\":\"730900\",\"abridge\":\"BY\",\"children\":[{\"id\":2755,\"text\":\"白银区\"},{\"id\":2756,\"text\":\"平川区\"},{\"id\":2757,\"text\":\"靖远县\"},{\"id\":2758,\"text\":\"会宁县\"},{\"id\":2759,\"text\":\"景泰县\"}]},{\"id\":304,\"text\":\"天水\",\"zip_code\":\"741000\",\"abridge\":\"TS\",\"children\":[{\"id\":2760,\"text\":\"秦州区\"},{\"id\":2761,\"text\":\"麦积区\"},{\"id\":2762,\"text\":\"清水县\"},{\"id\":2763,\"text\":\"秦安县\"},{\"id\":2764,\"text\":\"甘谷县\"},{\"id\":2765,\"text\":\"武山县\"},{\"id\":2766,\"text\":\"张家川回族自治县\"}]},{\"id\":305,\"text\":\"武威\",\"zip_code\":\"733000\",\"abridge\":\"WW\",\"children\":[{\"id\":2767,\"text\":\"凉州区\"},{\"id\":2768,\"text\":\"民勤县\"},{\"id\":2769,\"text\":\"古浪县\"},{\"id\":2770,\"text\":\"天祝藏族自治县\"}]},{\"id\":306,\"text\":\"张掖\",\"zip_code\":\"734000\",\"abridge\":\"ZY\",\"children\":[{\"id\":2771,\"text\":\"甘州区\"},{\"id\":2772,\"text\":\"肃南裕固族自治县\"},{\"id\":2773,\"text\":\"民乐县\"},{\"id\":2774,\"text\":\"临泽县\"},{\"id\":2775,\"text\":\"高台县\"},{\"id\":2776,\"text\":\"山丹县\"}]},{\"id\":307,\"text\":\"平凉\",\"zip_code\":\"744000\",\"abridge\":\"PL\",\"children\":[{\"id\":2777,\"text\":\"崆峒区\"},{\"id\":2778,\"text\":\"泾川县\"},{\"id\":2779,\"text\":\"灵台县\"},{\"id\":2780,\"text\":\"崇信县\"},{\"id\":2781,\"text\":\"华亭县\"},{\"id\":2782,\"text\":\"庄浪县\"},{\"id\":2783,\"text\":\"静宁县\"}]},{\"id\":308,\"text\":\"酒泉\",\"zip_code\":\"735000\",\"abridge\":\"JQ\",\"children\":[{\"id\":2784,\"text\":\"肃州区\"},{\"id\":2785,\"text\":\"金塔县\"},{\"id\":2786,\"text\":\"安西县\"},{\"id\":2787,\"text\":\"肃北蒙古族自治县\"},{\"id\":2788,\"text\":\"阿克塞哈萨克族自治县\"},{\"id\":2789,\"text\":\"玉门市\"},{\"id\":2790,\"text\":\"敦煌市\"}]},{\"id\":309,\"text\":\"庆阳\",\"zip_code\":\"745000\",\"abridge\":\"QY\",\"children\":[{\"id\":2791,\"text\":\"西峰区\"},{\"id\":2792,\"text\":\"庆城县\"},{\"id\":2793,\"text\":\"环县\"},{\"id\":2794,\"text\":\"华池县\"},{\"id\":2795,\"text\":\"合水县\"},{\"id\":2796,\"text\":\"正宁县\"},{\"id\":2797,\"text\":\"宁县\"},{\"id\":2798,\"text\":\"镇原县\"}]},{\"id\":310,\"text\":\"定西\",\"zip_code\":\"743000\",\"abridge\":\"DX\",\"children\":[{\"id\":2799,\"text\":\"安定区\"},{\"id\":2800,\"text\":\"通渭县\"},{\"id\":2801,\"text\":\"陇西县\"},{\"id\":2802,\"text\":\"渭源县\"},{\"id\":2803,\"text\":\"临洮县\"},{\"id\":2804,\"text\":\"漳县\"},{\"id\":2805,\"text\":\"岷县\"}]},{\"id\":311,\"text\":\"陇南\",\"zip_code\":\"742500\",\"abridge\":\"LN\",\"children\":[{\"id\":2806,\"text\":\"武都区\"},{\"id\":2807,\"text\":\"成县\"},{\"id\":2808,\"text\":\"文县\"},{\"id\":2809,\"text\":\"宕昌县\"},{\"id\":2810,\"text\":\"康县\"},{\"id\":2811,\"text\":\"西和县\"},{\"id\":2812,\"text\":\"礼县\"},{\"id\":2813,\"text\":\"徽县\"},{\"id\":2814,\"text\":\"两当县\"}]},{\"id\":312,\"text\":\"临夏\",\"zip_code\":\"731100\",\"abridge\":\"LX\",\"children\":[{\"id\":2815,\"text\":\"临夏市\"},{\"id\":2816,\"text\":\"临夏县\"},{\"id\":2817,\"text\":\"康乐县\"},{\"id\":2818,\"text\":\"永靖县\"},{\"id\":2819,\"text\":\"广河县\"},{\"id\":2820,\"text\":\"和政县\"},{\"id\":2821,\"text\":\"东乡族自治县\"},{\"id\":2822,\"text\":\"积石山保安族东乡族撒拉族自治县\"}]},{\"id\":313,\"text\":\"甘南\",\"zip_code\":\"747000\",\"abridge\":\"GN\",\"children\":[{\"id\":2823,\"text\":\"合作市\"},{\"id\":2824,\"text\":\"临潭县\"},{\"id\":2825,\"text\":\"卓尼县\"},{\"id\":2826,\"text\":\"舟曲县\"},{\"id\":2827,\"text\":\"迭部县\"},{\"id\":2828,\"text\":\"玛曲县\"},{\"id\":2829,\"text\":\"碌曲县\"},{\"id\":2830,\"text\":\"夏河县\"}]}]},{\"id\":29,\"text\":\"青海\",\"children\":[{\"id\":314,\"text\":\"西宁\",\"zip_code\":\"810000\",\"abridge\":\"XN\",\"children\":[{\"id\":2831,\"text\":\"城东区\"},{\"id\":2832,\"text\":\"城中区\"},{\"id\":2833,\"text\":\"城西区\"},{\"id\":2834,\"text\":\"城北区\"},{\"id\":2835,\"text\":\"大通回族土族自治县\"},{\"id\":2836,\"text\":\"湟中县\"},{\"id\":2837,\"text\":\"湟源县\"}]},{\"id\":315,\"text\":\"海东\",\"zip_code\":\"810600\",\"abridge\":\"HD\",\"children\":[{\"id\":2838,\"text\":\"平安县\"},{\"id\":2839,\"text\":\"民和回族土族自治县\"},{\"id\":2840,\"text\":\"乐都县\"},{\"id\":2841,\"text\":\"互助土族自治县\"},{\"id\":2842,\"text\":\"化隆回族自治县\"},{\"id\":2843,\"text\":\"循化撒拉族自治县\"}]},{\"id\":316,\"text\":\"海北\",\"zip_code\":\"812200\",\"abridge\":\"HB\",\"children\":[{\"id\":2844,\"text\":\"门源回族自治县\"},{\"id\":2845,\"text\":\"祁连县\"},{\"id\":2846,\"text\":\"海晏县\"},{\"id\":2847,\"text\":\"刚察县\"}]},{\"id\":317,\"text\":\"黄南\",\"zip_code\":\"811300\",\"abridge\":\"HN\",\"children\":[{\"id\":2848,\"text\":\"同仁县\"},{\"id\":2849,\"text\":\"尖扎县\"},{\"id\":2850,\"text\":\"泽库县\"},{\"id\":2851,\"text\":\"河南蒙古族自治县\"}]},{\"id\":318,\"text\":\"海南\",\"zip_code\":\"813000\",\"abridge\":\"HN\",\"children\":[{\"id\":2852,\"text\":\"共和县\"},{\"id\":2853,\"text\":\"同德县\"},{\"id\":2854,\"text\":\"贵德县\"},{\"id\":2855,\"text\":\"兴海县\"},{\"id\":2856,\"text\":\"贵南县\"}]},{\"id\":319,\"text\":\"果洛\",\"zip_code\":\"814000\",\"abridge\":\"GL\",\"children\":[{\"id\":2857,\"text\":\"玛沁县\"},{\"id\":2858,\"text\":\"班玛县\"},{\"id\":2859,\"text\":\"甘德县\"},{\"id\":2860,\"text\":\"达日县\"},{\"id\":2861,\"text\":\"久治县\"},{\"id\":2862,\"text\":\"玛多县\"}]},{\"id\":320,\"text\":\"玉树\",\"zip_code\":\"815000\",\"abridge\":\"YS\",\"children\":[{\"id\":2863,\"text\":\"玉树县\"},{\"id\":2864,\"text\":\"杂多县\"},{\"id\":2865,\"text\":\"称多县\"},{\"id\":2866,\"text\":\"治多县\"},{\"id\":2867,\"text\":\"囊谦县\"},{\"id\":2868,\"text\":\"曲麻莱县\"}]},{\"id\":321,\"text\":\"海西\",\"zip_code\":\"817000\",\"abridge\":\"HX\",\"children\":[{\"id\":2869,\"text\":\"格尔木市\"},{\"id\":2870,\"text\":\"德令哈市\"},{\"id\":2871,\"text\":\"乌兰县\"},{\"id\":2872,\"text\":\"都兰县\"},{\"id\":2873,\"text\":\"天峻县\"},{\"id\":2874,\"text\":\"大柴旦行委\"}]}]},{\"id\":30,\"text\":\"宁夏\",\"children\":[{\"id\":322,\"text\":\"银川\",\"zip_code\":\"750000\",\"abridge\":\"YC\",\"children\":[{\"id\":2875,\"text\":\"兴庆区\"},{\"id\":2876,\"text\":\"西夏区\"},{\"id\":2877,\"text\":\"金凤区\"},{\"id\":2878,\"text\":\"永宁县\"},{\"id\":2879,\"text\":\"贺兰县\"},{\"id\":2880,\"text\":\"灵武市\"}]},{\"id\":323,\"text\":\"石嘴山\",\"zip_code\":\"753000\",\"abridge\":\"SZS\",\"children\":[{\"id\":2881,\"text\":\"大武口区\"},{\"id\":2882,\"text\":\"惠农区\"},{\"id\":2883,\"text\":\"平罗县\"}]},{\"id\":324,\"text\":\"吴忠\",\"zip_code\":\"751100\",\"abridge\":\"WZ\",\"children\":[{\"id\":2884,\"text\":\"利通区\"},{\"id\":2885,\"text\":\"盐池县\"},{\"id\":2886,\"text\":\"同心县\"},{\"id\":2887,\"text\":\"青铜峡市\"}]},{\"id\":325,\"text\":\"固原\",\"zip_code\":\"756000\",\"abridge\":\"GY\",\"children\":[{\"id\":2888,\"text\":\"原州区\"},{\"id\":2889,\"text\":\"西吉县\"},{\"id\":2890,\"text\":\"隆德县\"},{\"id\":2891,\"text\":\"泾源县\"},{\"id\":2892,\"text\":\"彭阳县\"}]},{\"id\":326,\"text\":\"中卫\",\"zip_code\":\"755000\",\"abridge\":\"ZW\",\"children\":[{\"id\":2893,\"text\":\"沙坡头区\"},{\"id\":2894,\"text\":\"中宁县\"},{\"id\":2895,\"text\":\"海原县\"}]}]},{\"id\":31,\"text\":\"新疆\",\"children\":[{\"id\":327,\"text\":\"乌鲁木齐\",\"zip_code\":\"830000\",\"abridge\":\"WLMQ\",\"children\":[{\"id\":2896,\"text\":\"天山区\"},{\"id\":2897,\"text\":\"沙依巴克区\"},{\"id\":2898,\"text\":\"新市区\"},{\"id\":2899,\"text\":\"水磨沟区\"},{\"id\":2900,\"text\":\"头屯河区\"},{\"id\":2901,\"text\":\"达坂城区\"},{\"id\":2902,\"text\":\"米东区\"},{\"id\":2903,\"text\":\"乌鲁木齐县\"}]},{\"id\":328,\"text\":\"克拉玛依\",\"zip_code\":\"834000\",\"abridge\":\"KLMY\",\"children\":[{\"id\":2904,\"text\":\"独山子区\"},{\"id\":2905,\"text\":\"克拉玛依区\"},{\"id\":2906,\"text\":\"白碱滩区\"},{\"id\":2907,\"text\":\"乌尔禾区\"}]},{\"id\":329,\"text\":\"吐鲁番\",\"zip_code\":\"838000\",\"abridge\":\"TLF\",\"children\":[{\"id\":2908,\"text\":\"吐鲁番市\"},{\"id\":2909,\"text\":\"鄯善县\"},{\"id\":2910,\"text\":\"托克逊县\"}]},{\"id\":330,\"text\":\"哈密\",\"zip_code\":\"839000\",\"abridge\":\"HM\",\"children\":[{\"id\":2911,\"text\":\"哈密市\"},{\"id\":2912,\"text\":\"巴里坤哈萨克自治县\"},{\"id\":2913,\"text\":\"伊吾县\"}]},{\"id\":331,\"text\":\"昌吉\",\"zip_code\":\"831100\",\"abridge\":\"CJ\",\"children\":[{\"id\":2914,\"text\":\"昌吉市\"},{\"id\":2915,\"text\":\"阜康市\"},{\"id\":2916,\"text\":\"米泉市\"},{\"id\":2917,\"text\":\"呼图壁县\"},{\"id\":2918,\"text\":\"玛纳斯县\"},{\"id\":2919,\"text\":\"奇台县\"},{\"id\":2920,\"text\":\"吉木萨尔县\"},{\"id\":2921,\"text\":\"木垒哈萨克自治县\"}]},{\"id\":332,\"text\":\"博尔塔拉\",\"zip_code\":\"833400\",\"abridge\":\"BRTL\",\"children\":[{\"id\":2922,\"text\":\"博乐市\"},{\"id\":2923,\"text\":\"精河县\"},{\"id\":2924,\"text\":\"温泉县\"}]},{\"id\":333,\"text\":\"巴音郭楞\",\"zip_code\":\"841000\",\"abridge\":\"BYGL\",\"children\":[{\"id\":2925,\"text\":\"库尔勒市\"},{\"id\":2926,\"text\":\"轮台县\"},{\"id\":2927,\"text\":\"尉犁县\"},{\"id\":2928,\"text\":\"若羌县\"},{\"id\":2929,\"text\":\"且末县\"},{\"id\":2930,\"text\":\"焉耆回族自治县\"},{\"id\":2931,\"text\":\"和静县\"},{\"id\":2932,\"text\":\"和硕县\"},{\"id\":2933,\"text\":\"博湖县\"}]},{\"id\":334,\"text\":\"阿克苏\",\"zip_code\":\"843000\",\"abridge\":\"AKS\",\"children\":[{\"id\":2934,\"text\":\"阿克苏市\"},{\"id\":2935,\"text\":\"温宿县\"},{\"id\":2936,\"text\":\"库车县\"},{\"id\":2937,\"text\":\"沙雅县\"},{\"id\":2938,\"text\":\"新和县\"},{\"id\":2939,\"text\":\"拜城县\"},{\"id\":2940,\"text\":\"乌什县\"},{\"id\":2941,\"text\":\"阿瓦提县\"},{\"id\":2942,\"text\":\"柯坪县\"}]},{\"id\":335,\"text\":\"克孜勒苏柯尔克孜\",\"zip_code\":\"845350\",\"abridge\":\"KZLSKRKZ\",\"children\":[{\"id\":2943,\"text\":\"阿图什市\"},{\"id\":2944,\"text\":\"阿克陶县\"},{\"id\":2945,\"text\":\"阿合奇县\"},{\"id\":2946,\"text\":\"乌恰县\"}]},{\"id\":336,\"text\":\"喀什\",\"zip_code\":\"844000\",\"abridge\":\"KS\",\"children\":[{\"id\":2947,\"text\":\"喀什市\"},{\"id\":2948,\"text\":\"疏附县\"},{\"id\":2949,\"text\":\"疏勒县\"},{\"id\":2950,\"text\":\"英吉沙县\"},{\"id\":2951,\"text\":\"泽普县\"},{\"id\":2952,\"text\":\"莎车县\"},{\"id\":2953,\"text\":\"叶城县\"},{\"id\":2954,\"text\":\"麦盖提县\"},{\"id\":2955,\"text\":\"岳普湖县\"},{\"id\":2956,\"text\":\"伽师县\"},{\"id\":2957,\"text\":\"巴楚县\"},{\"id\":2958,\"text\":\"塔什库尔干塔吉克自治县\"}]},{\"id\":337,\"text\":\"和田\",\"zip_code\":\"848000\",\"abridge\":\"HT\",\"children\":[{\"id\":2959,\"text\":\"和田市\"},{\"id\":2960,\"text\":\"和田县\"},{\"id\":2961,\"text\":\"墨玉县\"},{\"id\":2962,\"text\":\"皮山县\"},{\"id\":2963,\"text\":\"洛浦县\"},{\"id\":2964,\"text\":\"策勒县\"},{\"id\":2965,\"text\":\"于田县\"},{\"id\":2966,\"text\":\"民丰县\"}]},{\"id\":338,\"text\":\"伊犁哈萨克\",\"zip_code\":\"835000\",\"abridge\":\"YLHSK\",\"children\":[{\"id\":2967,\"text\":\"伊宁市\"},{\"id\":2968,\"text\":\"奎屯市\"},{\"id\":2969,\"text\":\"伊宁县\"},{\"id\":2970,\"text\":\"察布查尔锡伯自治县\"},{\"id\":2971,\"text\":\"霍城县\"},{\"id\":2972,\"text\":\"巩留县\"},{\"id\":2973,\"text\":\"新源县\"},{\"id\":2974,\"text\":\"昭苏县\"},{\"id\":2975,\"text\":\"特克斯县\"},{\"id\":2976,\"text\":\"尼勒克县\"}]},{\"id\":339,\"text\":\"塔城\",\"zip_code\":\"834700\",\"abridge\":\"TC\",\"children\":[{\"id\":2977,\"text\":\"塔城市\"},{\"id\":2978,\"text\":\"乌苏市\"},{\"id\":2979,\"text\":\"额敏县\"},{\"id\":2980,\"text\":\"沙湾县\"},{\"id\":2981,\"text\":\"托里县\"},{\"id\":2982,\"text\":\"裕民县\"},{\"id\":2983,\"text\":\"和布克赛尔蒙古自治县\"}]},{\"id\":340,\"text\":\"阿勒泰\",\"zip_code\":\"836500\",\"abridge\":\"ALT\",\"children\":[{\"id\":2984,\"text\":\"阿勒泰市\"},{\"id\":2985,\"text\":\"布尔津县\"},{\"id\":2986,\"text\":\"富蕴县\"},{\"id\":2987,\"text\":\"福海县\"},{\"id\":2988,\"text\":\"哈巴河县\"},{\"id\":2989,\"text\":\"青河县\"},{\"id\":2990,\"text\":\"吉木乃县\"}]}]},{\"id\":32,\"text\":\"香港\",\"children\":[{\"id\":342,\"text\":\"香港\",\"zip_code\":\"999077\",\"abridge\":\"XG\",\"children\":[{\"id\":2995,\"text\":\"香港\"}]}]},{\"id\":33,\"text\":\"澳门\",\"children\":[{\"id\":343,\"text\":\"澳门\",\"zip_code\":\"999078\",\"abridge\":\"AM\",\"children\":[{\"id\":2996,\"text\":\"澳门\"}]}]},{\"id\":34,\"text\":\"台湾\",\"children\":[{\"id\":344,\"text\":\"台湾\",\"zip_code\":\"999079\",\"abridge\":\"TW\",\"children\":[{\"id\":2997,\"text\":\"台湾\"}]}]}]");

/***/ }),

/***/ 741:
/*!**************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-swipe-action/components/uni-swipe-action-item/mpwxs.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _isPC = __webpack_require__(/*! ./isPC */ 742);var mpMixins = {};


mpMixins = {
  data: function data() {
    return {
      is_show: 'none' };

  },
  watch: {
    show: function show(newVal) {
      this.is_show = this.show;
    } },

  created: function created() {
    this.swipeaction = this.getSwipeAction();
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.is_show = this.show;
  },
  methods: {
    // wxs 中调用
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      if (this.is_show !== e.open) {
        this.is_show = e.open;
      }
    },

    appTouchStart: function appTouchStart(e) {var




      clientX =
      e.changedTouches[0].clientX;
      this.clientX = clientX;
      this.timestamp = new Date().getTime();
    },
    appTouchEnd: function appTouchEnd(e, index, item, position) {var




      clientX =
      e.changedTouches[0].clientX;
      // fixed by xxxx 模拟点击事件，解决 ios 13 点击区域错位的问题
      var diff = Math.abs(this.clientX - clientX);
      var time = new Date().getTime() - this.timestamp;
      if (diff < 40 && time < 300) {
        this.$emit('click', {
          content: item,
          index: index,
          position: position });

      }
    },
    onClickForPC: function onClickForPC(index, item, position) {








    } } };var _default =




mpMixins;exports.default = _default;

/***/ }),

/***/ 742:
/*!*************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-swipe-action/components/uni-swipe-action-item/isPC.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isPC = isPC;function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length - 1; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/***/ }),

/***/ 743:
/*!*****************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-swipe-action/components/uni-swipe-action-item/bindingx.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var bindIngXMixins = {};var _default =










































































































































































































































































































bindIngXMixins;exports.default = _default;

/***/ }),

/***/ 744:
/*!****************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-swipe-action/components/uni-swipe-action-item/mpother.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var otherMixins = {};var _default =































































































































































































































































otherMixins;exports.default = _default;

/***/ }),

/***/ 873:
/*!**********************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-search-bar/components/uni-search-bar/i18n/index.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 874));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 875));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 876));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 874:
/*!*********************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-search-bar/components/uni-search-bar/i18n/en.json ***!
  \*********************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"Search enter content\"}");

/***/ }),

/***/ 875:
/*!**************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-search-bar/components/uni-search-bar/i18n/zh-Hans.json ***!
  \**************************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"请输入搜索内容\"}");

/***/ }),

/***/ 876:
/*!**************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-search-bar/components/uni-search-bar/i18n/zh-Hant.json ***!
  \**************************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"請輸入搜索內容\"}");

/***/ }),

/***/ 891:
/*!***************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 897:
/*!**************************************************************************************************************!*\
  !*** E:/lingli-community/web/android/uni_modules/uni-datetime-picker/components/uni-datetime-picker/util.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var Calendar = /*#__PURE__*/function () {
  function Calendar()






  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},date = _ref.date,selected = _ref.selected,startDate = _ref.startDate,endDate = _ref.endDate,range = _ref.range;_classCallCheck(this, Calendar);
    // 当前日期
    this.date = this.getDate(new Date()); // 当前初入日期
    // 打点信息
    this.selected = selected || [];
    // 范围开始
    this.startDate = startDate;
    // 范围结束
    this.endDate = endDate;
    this.range = range;
    // 多选状态
    this.cleanMultipleStatus();
    // 每周日期
    this.weeks = {};
    // this._getWeek(this.date.fullDate)
    // this.multipleStatus = multipleStatus
    this.lastHover = false;
  }
  /**
     * 设置日期
     * @param {Object} date
     */_createClass(Calendar, [{ key: "setDate", value: function setDate(
    date) {
      this.selectDate = this.getDate(date);
      this._getWeek(this.selectDate.fullDate);
    }

    /**
       * 清理多选状态
       */ }, { key: "cleanMultipleStatus", value: function cleanMultipleStatus()
    {
      this.multipleStatus = {
        before: '',
        after: '',
        data: [] };

    }

    /**
       * 重置开始日期
       */ }, { key: "resetSatrtDate", value: function resetSatrtDate(
    startDate) {
      // 范围开始
      this.startDate = startDate;

    }

    /**
       * 重置结束日期
       */ }, { key: "resetEndDate", value: function resetEndDate(
    endDate) {
      // 范围结束
      this.endDate = endDate;
    }

    /**
       * 获取任意时间
       */ }, { key: "getDate", value: function getDate(
    date) {var AddDayCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
      if (!date) {
        date = new Date();
      }
      if (typeof date !== 'object') {
        date = date.replace(/-/g, '/');
      }
      var dd = new Date(date);
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
          break;
        case 'month':
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
          }
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期
          break;}

      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
      return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay() };

    }


    /**
       * 获取上月剩余天数
       */ }, { key: "_getLastMonthDays", value: function _getLastMonthDays(
    firstDay, full) {
      var dateArr = [];
      for (var i = firstDay; i > 0; i--) {
        var beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          disable: true });

      }
      return dateArr;
    }
    /**
       * 获取本月天数
       */ }, { key: "_currentMonthDys", value: function _currentMonthDys(
    dateData, full) {var _this = this;
      var dateArr = [];
      var fullDate = this.date.fullDate;var _loop = function _loop(
      i) {
        var isinfo = false;
        var nowDate = full.year + '-' + (full.month < 10 ?
        full.month : full.month) + '-' + (i < 10 ?
        '0' + i : i);
        // 是否今天
        var isDay = fullDate === nowDate;
        // 获取打点信息
        var info = _this.selected && _this.selected.find(function (item) {
          if (_this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });

        // 日期禁用
        var disableBefore = true;
        var disableAfter = true;
        if (_this.startDate) {
          // let dateCompBefore = this.dateCompare(this.startDate, fullDate)
          // disableBefore = this.dateCompare(dateCompBefore ? this.startDate : fullDate, nowDate)
          disableBefore = _this.dateCompare(_this.startDate, nowDate);
        }

        if (_this.endDate) {
          // let dateCompAfter = this.dateCompare(fullDate, this.endDate)
          // disableAfter = this.dateCompare(nowDate, dateCompAfter ? this.endDate : fullDate)
          disableAfter = _this.dateCompare(nowDate, _this.endDate);
        }
        var multiples = _this.multipleStatus.data;
        var checked = false;
        var multiplesStatus = -1;
        if (_this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex(function (item) {
              return _this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked = true;
          }
        }
        var data = {
          fullDate: nowDate,
          year: full.year,
          date: i,
          multiple: _this.range ? checked : false,
          beforeMultiple: _this.isLogicBefore(nowDate, _this.multipleStatus.before, _this.multipleStatus.after),
          afterMultiple: _this.isLogicAfter(nowDate, _this.multipleStatus.before, _this.multipleStatus.after),
          month: full.month,
          disable: !(disableBefore && disableAfter),
          isDay: isDay,
          userChecked: false };

        if (info) {
          data.extraInfo = info;
        }

        dateArr.push(data);};for (var i = 1; i <= dateData; i++) {_loop(i);
      }
      return dateArr;
    }
    /**
       * 获取下月天数
       */ }, { key: "_getNextMonthDays", value: function _getNextMonthDays(
    surplus, full) {
      var dateArr = [];
      for (var i = 1; i < surplus + 1; i++) {
        dateArr.push({
          date: i,
          month: Number(full.month) + 1,
          disable: true });

      }
      return dateArr;
    }

    /**
       * 获取当前日期详情
       * @param {Object} date
       */ }, { key: "getInfo", value: function getInfo(
    date) {var _this2 = this;
      if (!date) {
        date = new Date();
      }
      var dateInfo = this.canlender.find(function (item) {return item.fullDate === _this2.getDate(date).fullDate;});
      return dateInfo;
    }

    /**
       * 比较时间大小
       */ }, { key: "dateCompare", value: function dateCompare(
    startDate, endDate) {
      // 计算截止时间
      startDate = new Date(startDate.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      endDate = new Date(endDate.replace('-', '/').replace('-', '/'));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }

    /**
       * 比较时间是否相等
       */ }, { key: "dateEqual", value: function dateEqual(
    before, after) {
      // 计算截止时间
      before = new Date(before.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      after = new Date(after.replace('-', '/').replace('-', '/'));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }

    /**
       *  比较真实起始日期
       */ }, { key: "isLogicBefore", value: function isLogicBefore(

    currentDay, before, after) {
      var logicBefore = before;
      if (before && after) {
        logicBefore = this.dateCompare(before, after) ? before : after;
      }
      return this.dateEqual(logicBefore, currentDay);
    } }, { key: "isLogicAfter", value: function isLogicAfter(

    currentDay, before, after) {
      var logicAfter = after;
      if (before && after) {
        logicAfter = this.dateCompare(before, after) ? after : before;
      }
      return this.dateEqual(logicAfter, currentDay);
    }

    /**
       * 获取日期范围内所有日期
       * @param {Object} begin
       * @param {Object} end
       */ }, { key: "geDateAll", value: function geDateAll(
    begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDate(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }

    /**
       *  获取多选状态
       */ }, { key: "setMultiple", value: function setMultiple(
    fullDate) {var _this$multipleStatus =



      this.multipleStatus,before = _this$multipleStatus.before,after = _this$multipleStatus.after;
      if (!this.range) return;
      if (before && after) {
        if (!this.lastHover) {
          this.lastHover = true;
          return;
        }
        this.multipleStatus.before = fullDate;
        this.multipleStatus.after = '';
        this.multipleStatus.data = [];
        this.multipleStatus.fulldate = '';
        this.lastHover = false;
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
          this.lastHover = false;
        } else {
          this.multipleStatus.after = fullDate;
          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.
            after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.
            before);
          }
          this.lastHover = true;
        }
      }
      this._getWeek(fullDate);
    }

    /**
       *  鼠标 hover 更新多选状态
       */ }, { key: "setHoverMultiple", value: function setHoverMultiple(
    fullDate) {var _this$multipleStatus2 =



      this.multipleStatus,before = _this$multipleStatus2.before,after = _this$multipleStatus2.after;

      if (!this.range) return;
      if (this.lastHover) return;

      if (!before) {
        this.multipleStatus.before = fullDate;
      } else {
        this.multipleStatus.after = fullDate;
        if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
      }
      this._getWeek(fullDate);
    }

    /**
       * 更新默认值多选状态
       */ }, { key: "setDefaultMultiple", value: function setDefaultMultiple(
    before, after) {
      this.multipleStatus.before = before;
      this.multipleStatus.after = after;
      if (before && after) {
        if (this.dateCompare(before, after)) {
          this.multipleStatus.data = this.geDateAll(before, after);
          this._getWeek(after);
        } else {
          this.multipleStatus.data = this.geDateAll(after, before);
          this._getWeek(before);
        }
      }
    }

    /**
       * 获取每周数据
       * @param {Object} dateData
       */ }, { key: "_getWeek", value: function _getWeek(
    dateData) {var _this$getDate =






      this.getDate(dateData),fullDate = _this$getDate.fullDate,year = _this$getDate.year,month = _this$getDate.month,date = _this$getDate.date,day = _this$getDate.day;
      var firstDay = new Date(year, month - 1, 1).getDay();
      var currentDay = new Date(year, month, 0).getDate();
      var dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)), // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)), // 本月天数
        nextMonthDays: [], // 下个月开始几天
        weeks: [] };

      var canlender = [];
      var surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      var weeks = {};
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (var i = 0; i < canlender.length; i++) {
        if (i % 7 === 0) {
          weeks[parseInt(i / 7)] = new Array(7);
        }
        weeks[parseInt(i / 7)][i % 7] = canlender[i];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }

    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  }]);return Calendar;}();var _default =


Calendar;exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map