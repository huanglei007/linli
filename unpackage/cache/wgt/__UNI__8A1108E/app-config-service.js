
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/login/register","pages/agreement/secret","pages/index/index","pages/index/search","pages/index/daren","pages/index/applyDaren","pages/index/tijian","pages/index/changeVillage","pages/index/changeCity","pages/index/shangquan","pages/index/shopDetail","pages/index/darenDetail","pages/index/xianzhi","pages/index/shopOrder","pages/from/xianzhi","pages/from/pet","pages/index/pet","pages/from/book","pages/index/book","pages/from/clothes","pages/index/shopList","pages/index/darenList","pages/index/wuye","pages/from/apply","pages/from/currency","pages/order/index","pages/order/orderList","pages/order/orderDetail","pages/order/shop","pages/order/get","pages/chat/index","pages/chat/HM-chat","pages/user/index","pages/user/applyShop","pages/user/ticket","pages/user/wallet","pages/user/tixian","pages/user/address","pages/user/addressManage","pages/user/orderDetail","pages/user/shopSet/shopSet","pages/user/set","pages/user/pass","pages/user/about","pages/user/tickitDetail","pages/user/myOrder/myOrder","pages/user/orderDetail","pages/user/yuyue/yuyue","pages/user/collection/collection","pages/chooselocation/index"],"window":{"navigationStyle":"custom","navigationBarTextStyle":"black","navigationBarTitleText":"邻里","navigationBarBackgroundColor":"#fff","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#212121","selectedColor":"#212121","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/image/icon_syw.png","selectedIconPath":"static/image/icon_syx.png","text":"首页"},{"pagePath":"pages/from/currency","iconPath":"static/image/icon_fbxqw.png","selectedIconPath":"static/image/icon_fbxqx.png","text":"发布需求"},{"pagePath":"pages/chat/index","iconPath":"static/image/icon_xxw.png","selectedIconPath":"static/image/icon_message.png","text":"消息"},{"pagePath":"pages/order/index","iconPath":"static/image/icon_jddt.png","selectedIconPath":"static/image/icon_jd.png","text":"接单大厅"},{"pagePath":"pages/user/index","iconPath":"static/image/icon_syw.png","selectedIconPath":"static/image/icon_syx.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"linli","compilerVersion":"3.3.11","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{}},{"path":"/pages/login/register","meta":{},"window":{}},{"path":"/pages/agreement/secret","meta":{},"window":{}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/index/search","meta":{},"window":{}},{"path":"/pages/index/daren","meta":{},"window":{}},{"path":"/pages/index/applyDaren","meta":{},"window":{}},{"path":"/pages/index/tijian","meta":{},"window":{}},{"path":"/pages/index/changeVillage","meta":{},"window":{}},{"path":"/pages/index/changeCity","meta":{},"window":{}},{"path":"/pages/index/shangquan","meta":{},"window":{}},{"path":"/pages/index/shopDetail","meta":{},"window":{}},{"path":"/pages/index/darenDetail","meta":{},"window":{}},{"path":"/pages/index/xianzhi","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"闲置买卖","titleNView":{"titleAlign":"left"}}},{"path":"/pages/index/shopOrder","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"订单详情","titleNView":{"titleAlign":"left"}}},{"path":"/pages/from/xianzhi","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"闲置买卖","titleNView":{"titleAlign":"left"}}},{"path":"/pages/from/pet","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"宠物买卖","titleNView":{"titleAlign":"left"}}},{"path":"/pages/index/pet","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"宠物买卖","titleNView":{"titleAlign":"left"}}},{"path":"/pages/from/book","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"旧书买卖","titleNView":{"titleAlign":"left"}}},{"path":"/pages/index/book","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"旧书买卖","titleNView":{"titleAlign":"left"}}},{"path":"/pages/from/clothes","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"旧衣出售","titleNView":{"titleAlign":"left"}}},{"path":"/pages/index/shopList","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"商圈分类","titleNView":{"titleAlign":"left"}}},{"path":"/pages/index/darenList","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"商圈分类","titleNView":{"titleAlign":"left"}}},{"path":"/pages/index/wuye","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"社区物业","titleNView":{"titleAlign":"left"}}},{"path":"/pages/from/apply","meta":{},"window":{}},{"path":"/pages/from/currency","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/order/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/order/orderList","meta":{},"window":{}},{"path":"/pages/order/orderDetail","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/order/shop","meta":{},"window":{}},{"path":"/pages/order/get","meta":{},"window":{}},{"path":"/pages/chat/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/chat/HM-chat","meta":{},"window":{}},{"path":"/pages/user/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/user/applyShop","meta":{},"window":{}},{"path":"/pages/user/ticket","meta":{},"window":{}},{"path":"/pages/user/wallet","meta":{},"window":{}},{"path":"/pages/user/tixian","meta":{},"window":{}},{"path":"/pages/user/address","meta":{},"window":{}},{"path":"/pages/user/addressManage","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"新增收货地址","titleNView":{"titleAlign":"left"}}},{"path":"/pages/user/orderDetail","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"订单详情"}},{"path":"/pages/user/shopSet/shopSet","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"商家设置","titleNView":{"titleAlign":"left"}}},{"path":"/pages/user/set","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"设置","titleNView":{"titleAlign":"left"}}},{"path":"/pages/user/pass","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"修改密码","titleNView":{"titleAlign":"left"}}},{"path":"/pages/user/about","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"关于我们","titleNView":{"titleAlign":"left"}}},{"path":"/pages/user/tickitDetail","meta":{},"window":{"navigationStyle":"default","navigationBarTextStyle":"white","navigationBarTitleText":"代金券详情","navigationBarBackgroundColor":"#ffac46"}},{"path":"/pages/user/myOrder/myOrder","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"我的订单","titleNView":{"titleAlign":"left"}}},{"path":"/pages/user/yuyue/yuyue","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"我的预约","titleNView":{"titleAlign":"left"}}},{"path":"/pages/user/collection/collection","meta":{},"window":{"navigationStyle":"default","navigationBarTitleText":"我的收藏","titleNView":{"titleAlign":"left"}}},{"path":"/pages/chooselocation/index","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
