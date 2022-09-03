/**
 * @description 用户打开订阅提示
 * @param {Array}tmplIds  模版id
 * */
export const openSubscription = () => {
	uni.requestSubscribeMessage({
		tmplIds: ['iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE','LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw'],
		success: (res) => {
			console.log(res)
		},
		fail: function(err) {
			uni.showToast({
				title: err,
				duration: 2000,
				icon: 'error'
			});
		}
	})
}

/**
 * @description 发送订阅消息
 * @param {String}miniprogram_state  小程序状态
 * @param {String}openid  用户openid
 * @param {String}tmplId  模版id
 * @param {String}params  传递参数
 * */
export const send_msg = async (tmplId, params) => {
	let openid = uni.getStorageSync('userInfo').open_id;
	let wx_access_token = uni.getStorageSync('access_token');
	let page = ''
	if (tmplId == 'iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE') { // 达人抢单
		page = '/pages/order/index'
	} else if(tmplId == 'LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw') { // 商家新单
		page = '/pages/user/myOrder/myOrder?type=2'
	}
	return uni.request({
		url: `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${wx_access_token}`,
		method: "POST",
		data: {
			access_token: wx_access_token, //access_token
			touser: `${openid}`, //用户openid
			template_id: `${tmplId}`, //模板ID
			page: `${page}`, //进入哪个页面   非必传
			data: {
				...params //自己选择模版的参数 'key':{value:'...'}
			},
			miniprogram_state: "developer", //developer为开发版；trial为体验版；formal为正式版；非必传
		}
	})
}
