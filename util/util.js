// var domain = "http://192.168.0.118:8769/apiModule/";//本地
var domain = "https://linli-community-api.niuclub.net/apiModule/"; //线上 
var openIds = '111'; //openId
var userId = ''; //userId
var PI = 3.1415926535897932384626;
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var a = 6378245.0;
var ee = 0.00669342162296594323;
var imgRList = []; //图片集合
var systemData = null;
var appId = 'wx8cd0cfe284e7e4c0'; //appId
var tempFilePathsIndex = 0; //遍历选择图片的下标
import {
	send_msg
} from '@/static/js/wx_messagePush.js'

function ajax(url, data, cb, header, flag) {
	header ? header['content-type'] = 'application/json' : header = {
		'content-type': 'application/json'
	};

	uni.request({
		url: domain + url,
		method: "POST",
		data: data,
		header: header,
		success: function(res) {
			if (res.statusCode == 200) {
				if (res.data.code == 1 || res.data.code == 200) {
					cb(res.data)
				} else {
					let thias = res.data.msg;
					if (thias == 'staffId参数不能为空') {
						thias = '请登录'
					}
					if (thias == '用户ID不存在,请重新登录' || thias == '用户ID不能为空') {
						uni.reLaunch({
							url: '/pages/login/login',
						})
					} else {
						uni.showToast({
							title: thias,
							icon: 'none'
						})
					}
				}
			} else if (res.statusCode == 404) {
				uni.showModal({
					title: '提示',
					content: '404,访问地址不存在！',
					showCancel: false
				})
			} else if (res.statusCode == 502) {
				uni.showModal({
					title: '提示',
					content: '502,服务器无响应！',
					showCancel: false
				})
			}
		},
		fail: function(err) {
			// uni.hideLoading();
			uni.showModal({
				title: '提示',
				content: '网络状态不佳,请稍后再试！',
				showCancel: false
			})
		}
	})
}

function out_of_china(lng, lat) { //判断是否在国内，不在国内则不做偏移
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
	return ret
}

function transformlng(lng, lat) {
	var lat = +lat;
	var lng = +lng;
	var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
	ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
	ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
	return ret
}

function getWxUser(cb) {
	var that = this
	//调用登录接口
	wx.showLoading({
		title: '加载中',
	});
	wx.getUserInfo({
		withCredentials: false,
		success: function(res) {
			module.exports.wxUser = res.userInfo;
			wx.getStorageSync('wxUser', JSON.stringify(res.userInfo))
			typeof cb == "function" && cb(res.userInfo)
		},
		fail: function(err) {
			wx.showModal({
				title: '提示',
				content: err.errMsg,
				showCancel: false
			})
		}
	})
}

Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //月
		"d+": this.getDate(), //日
		"H+": this.getHours(), //时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1
		.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k])
				.length));
	return format;
};

var wxUser, user, shop;
// user={userId:33,personalId:34,sex:1,shopId:1};//店铺
// user={userId:3,personalId:4,sex:1};//非店铺

module.exports = {
	ajax: function(url, data, cb, flag) {
		var header = {};
		flag = flag ? flag : false;
		wx.getStorage({
			key: 'sessionId',
			success: function(res) {
				header = {
					'Cookie': 'JSESSIONID=' + res.data
				};
				ajax(url, data, cb, header, flag);
			},
			fail: function() {
				ajax(url, data, cb, header, flag);
			}
		})
	},
	imageUrl: domain,
	apiUrl: domain,
	openid: openIds,
	userId: userId,
	user: user,
	wxUser: wxUser,
	shop: shop,
	call: function(phone) {
		wx.makePhoneCall({
			phoneNumber: phone,
		})
	},
	//清除缓存
	clearhuan: function() {
		let os = plus.os.name;
		if (os == 'Android') {
			let main = plus.android.runtimeMainActivity();
			let sdRoot = main.getCacheDir();
			let files = plus.android.invoke(sdRoot, "listFiles");
			let len = files.length;
			for (let i = 0; i < len; i++) {
				let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
				plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
					if (entry.isDirectory) {
						entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
							// console.log('1')
						}, function(e) {
							// console.log(e.message)  
						});
					} else {
						entry.remove();
					}
				}, function(e) {
					// console.log('文件路径读取失败')  
				});
			}
		}
	},
	noMultipleClicks: function(noClick, cb) {
		if (noClick) {
			cb();
		} else {
			uni.showToast({
				title: '不要连续点击哦',
				icon: 'none'
			})
		}
	},
	getImageUrl: function(url) {
		if (url.indexOf('http') > -1) {
			return url;
		} else {
			return domain + 'image/' + url;
		}
	},
	weeksort: function(cb) { //长链接
		var toUserId = uni.getStorageSync('userInfo').phone;
		// var socketlink = "ws://192.168.1.26:9077/apiModule/ws/chat/" + toUserId + "/123456/0/O4HpflBADiZu3Ue@";
		var socketlink = "wss://chat2.niuclub.net/apiModule/ws/chat/" + toUserId + "/111111/0/jqDpwZCDEMw37Uh3"
		uni.closeSocket() //创建新的socket连接前确保旧的已关闭
		clearTimeout(this.hearinva); //关闭心跳包
		//创建一个socket连接
		uni.connectSocket({
			url: socketlink,
			success: res => {}
		})
		//监听socket打开
		uni.onSocketOpen(() => {
			console.log('WebSocket连接已打开！');
			getApp().backtall = '0';
			if (cb) {
				cb();
			} else {
				this.getsort();
			}
		})
		//监听socket关闭
		uni.onSocketClose((e) => {
			console.log('WebSocket连接已关闭！');
			// if(getApp().backtall == 0){
			// 	setTimeout(()=>{
			// 		this.weeksort(); 
			// 	},50)
			// } 

		})
		//监听socket错误 
		uni.onSocketError((e) => {
			console.log(e);
			uni.closeSocket();
			setTimeout(() => {
				this.weeksort();
			}, 50)
		})
	},
	getsort: function(cb) { //监听
		//监听socket消息
		uni.onSocketMessage((res) => {
			let that = this;
			that.hearinva = setTimeout(() => {
				let jsonsa = {};
				jsonsa.messageType = 0; //0.心跳包 1.单聊 2群聊
				jsonsa.toUserName = '';
				jsonsa.messageContent = 'ping';
				jsonsa.roomId = 0;
				jsonsa.appId = 'jqDpwZCDEMw37Uh3';
				uni.sendSocketMessage({
					data: JSON.stringify(jsonsa),
					success: (res) => {
						clearTimeout(that.hearinva);
					},
					fail: () => {
						that.weeksort(function() {
							that.getsort(cb)
						});
					}
				});
				var infos = JSON.parse(res.data);
				console.log('WebSocket:', infos)
				// 用户ID
				let userid = uni.getStorageSync('userId')
				// 用户类型 (1.平台 2.运营点 3.商家 4.达人 5.普通会员)
				let usertype = uni.getStorageSync('userInfo').user_type
				if (infos != null && infos != '' && infos != undefined && infos !=
					'用户未登录,请先登录') {
					// 推送订单消息或语音
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					// 根据用户推送
					if (usertype == 3) { //用户是商家
						// 通知列表
						that.ajax('message/listPage', {
							"userId": userid,
							"isRead": 1,
						}, res => {
							let arr = res.data.list
							for (let i = 0; i < arr.length; i++) {
								if (arr[i].title == '有新订单') {
									// #ifdef APP-PLUS
									innerAudioContext.src =
										'../../static/mp3/newOrder.mp3';
									innerAudioContext.onPlay(() => {
										console.log('您有新的订单, 请及时处理');
									});
									innerAudioContext.onError((res) => {
										console.log(res.errMsg);
										console.log(res.errCode);
									});
									// #endif

									// #ifdef MP-WEIXIN
									send_msg(
										'LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw', {
											"character_string1": {
												"value": arr[i].createtime
											},
											"time4": {
												"value": this.dateFormat(
													'yyyy-MM-dd HH:mm', arr[i]
													.createtime)
											},
										})
									// #endif
								}
							}
						})
					} else if (usertype == 4) { //用户是达人
						// 发布需求列表
						that.ajax('release/releaseList', {
							"userId": that.userid
						}, (res) => {
							let arr = res.data.list
							let time = new Date().getTime()
							for (let i = 0; i < arr.length; i++) {
								if ((time - arr[0].createtime) <= 10000) {
									// #ifdef APP-PLUS
									innerAudioContext.src =
										'../../static/mp3/grabbingOrder.mp3';
									innerAudioContext.onPlay(() => {
										console.log('接单大厅有新的需求发布，快来抢单吧');
									});
									innerAudioContext.onError((res) => {
										console.log(res.errMsg);
										console.log(res.errCode);
									});
									// #endif

									// #ifdef MP-WEIXIN
									send_msg(
										'iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE', {
											"amount2": {
												"value": arr[i].commission
											},
											"time4": {
												"value": this.dateFormat(
													'yyyy-MM-dd HH:mm', arr[i]
													.createtime)
											},
											"thing3": {
												"value": arr[i]
													.requirement_introduction
											}
										})
									// #endif
								}
							}
						})
					}

					// 消息类别 1 => 图片
					if (infos.data.messageType == 1) {
						if (userid) {
							that.ajax('contact/queryAllUnreadMessage', {
								"fromUserId": userid,
							}, res => {
								if (res.data.unreadCount) {
									if (res.data.unreadCount > 99) {
										uni.showTabBarRedDot({
											index: 2
										})
									} else {
										uni.setTabBarBadge({
											index: 2,
											text: res.data.unreadCount > 99 ?
												'99+' : res.data.unreadCount
												.toString()
										})
									}
								} else {
									uni.hideTabBarRedDot({
										index: 2
									})
									uni.removeTabBarBadge({
										index: 2
									})
								}
							})
						}
						setTimeout(() => {
							cb && cb(infos)
						}, 50)
					} else {
						console.log('heart***');
					}
				} else {
					that.$jump('/pages/login/login')
				}
			}, 10000)

		})
	},
	// 获取wx access_token
	get_wx_access_token: function() {
		uni.request({
			url: 'https://linli-community-api.niuclub.net/apiModule/member/querySecret',
			method: 'POST',
			data: {},
			success: json => {
				let id = json.data.data.set.app_id
				let key = json.data.data.set.app_secret
				return uni.request({
					method: 'get',
					url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${id}&secret=${key}`,
					dataType: 'json',
					timeout: 30000
				}).then(res => {
					let [err, success] = res
					if (success.statusCode == 200) {
						// return success.data.access_token
						uni.setStorageSync('access_token', success.data.access_token)
					}
				})
			},
		});
	},
	//上传图片
	sendimage: function(imagele, iima, cb) {
		uni.chooseImage({
			count: imagele, //默认9
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				// 1TB=1024GB 1GB=1024MB 1MB=1024KB 1KB=1024Byte
				// let sizes = res.tempFiles[0].size / 1024 /1024;
				const tempFilePaths = res.tempFilePaths;
				// imalist.push(res.tempFilePaths[0]);
				for (let i = 0; i < tempFilePaths.length; i++) {
					uni.uploadFile({
						url: domain + 'CrossDomainOrdinaryServlet',
						name: 'image',
						formData: {},
						filePath: tempFilePaths[i],
						success: function(res) {
							if (res.statusCode == 200) {
								let data = JSON.parse(res.data);
								if (data.state == 'SUCCESS') {
									iima.push(data.url);
									cb && cb()
								} else {
									uni.showToast({
										title: '上传失败',
										icon: 'none'
									})

								}
							} else if (res.statusCode == 404) {
								uni.showModal({
									title: '提示',
									content: '404,访问地址不存在！',
									showCancel: false
								})
							} else if (res.statusCode == 502) {
								uni.showModal({
									title: '提示',
									content: '502,服务器无响应！',
									showCancel: false
								})
							}
						},
						fail: function(err) {
							uni.showModal({
								title: '提示',
								content: '网络状态不佳,请稍后再试！',
								showCancel: false
							})
						}
					});
				}
			}
		});
	},
	//上传视频
	sendvidd: function(cb) {
		uni.chooseVideo({
			count: 1,
			maxDuration: 13,
			sourceType: ['camera'],
			success: function(res) {
				// 1TB=1024GB 1GB=1024MB 1MB=1024KB 1KB=1024Byte
				let duration = res.duration;
				if (duration == 14) {
					uni.showToast({
						title: '视频不得大于13秒',
						icon: 'none'
					})
				} else {
					const vidwhidth = res.width;
					const vidheight = res.height;
					const tempFilePaths = res.tempFilePath;
					uni.showLoading({
						title: '上传中'
					})
					uni.uploadFile({
						url: domain + 'CrossDomainOrdinaryServlet',
						name: 'image',
						filePath: tempFilePaths,
						formData: {
							'image': tempFilePaths,
							'videoHigth': vidwhidth,
							'videoWidth': vidheight,
						},
						success: function(res) {
							uni.hideLoading();
							if (res.statusCode == 200) {
								let data = JSON.parse(res.data);
								cb && cb(data);
							} else if (res.statusCode == 404) {
								uni.showModal({
									title: '提示',
									content: '404,访问地址不存在！',
									showCancel: false
								})
							} else if (res.statusCode == 502) {
								uni.showModal({
									title: '提示',
									content: '502,服务器无响应！',
									showCancel: false
								})
							}
						},
						fail: function(err) {
							uni.showModal({
								title: '提示',
								content: '网络状态不佳,请稍后再试！',
								showCancel: false
							})
						}
					});
				}
			}
		});
	},

	//检查登录
	checkLogin: function(cb) {
		//this.user = { bindPhone: 1, nickName: "梦想", personalId: 20, userId: 556, userName: "18218285793" };
		if (module.exports.user) {
			cb();
		} else {
			if (wx.getStorageSync('user')) {
				var user = JSON.parse(wx.getStorageSync('user'))
				module.exports.user = user;
				var wxUser = JSON.parse(wx.getStorageSync('wxUser'))
				module.exports.wxUser = wxUser;

			} else {
				if (wx.getStorageSync('wxUser')) {
					var wxUser = JSON.parse(wx.getStorageSync('wxUser'))
					module.exports.wxUser = wxUser;
					module.exports.quetyUserInfoByopenId(cb)
				} else {
					cb()
				}
			}
		}
	},
	register: function(cb) { //一次注册
		var shopId = wx.getStorageSync('shopId') ? wx.getStorageSync('shopId') : 0
		if (module.exports.wxUser.phone) {
			ajax('user/bindPhoneByOpenId', {
				openId: module.exports.wxUser.openId,
				headImg: module.exports.wxUser.headImage,
				nickName: module.exports.wxUser.nickName,
				sex: module.exports.wxUser.sex,
				shopId: shopId,
				phone: module.exports.wxUser.phone,
				area: module.exports.wxUser.address
			}, function(json) {
				module.exports.user = json.data;
				wx.getStorageSync('user', JSON.stringify(module.exports.user));
				cb();
			})
		} else {
			cb({
				flag: false,
				type: 1
			}); //没有手机号码
		}
	},
	quetyUserInfoByopenId: function(cb) { //根据openid查询用户信息
		ajax('user/queryUserByOpenId', {
			type: 2,
			openId: module.exports.wxUser.openId,
		}, function(json) {
			if (!json.data) {
				module.exports.register(cb)
			} else {
				module.exports.user = json.data;
				wx.getStorageSync('user', JSON.stringify(module.exports.user))
				cb();
			}
		})
	},
	checkUserSetting: function(cb) { //检查是否授权
		wx.getSetting({
			success(dataShow) {
				if (dataShow.authSetting['scope.userInfo']) {
					cb(true)
				} else if (!dataShow.authSetting['scope.userInfo']) {
					cb(false)
				}
			}
		})
	},
	getUserInfo: function(cb) { //获取用户信息
		if (wx.getStorageSync('wxUser')) {
			cb();
		} else {
			wx.getUserInfo({
				lang: "zh_CN",
				complete: (codeInfo) => {
					var wxUser = {
						headImage: codeInfo.userInfo.avatarUrl,
						nickName: codeInfo.userInfo.nickName,
						sex: codeInfo.userInfo.gender
					}
					console.info(codeInfo)
					wx.login({
						complete: (res) => {
							wx.getStorageSync('wxcode', res.code);
							module.exports.ajax(
								'wxcore/getUserOpenId?code=' +
								res
								.code, {},
								function(json) {
									wx.checkSession({
										success: function() {
											console.info(
												codeInfo
											)
											wx.getStorageSync(
												'session_key',
												json
												.session_key
											);
											module.exports
												.getAddress(
													codeInfo,
													function(
														infoInfomation
													) {
														wxUser
															[
																'address'
															] =
															infoInfomation
															.province +
															infoInfomation
															.city
														wxUser
															[
																'openId'
															] =
															infoInfomation
															.openId;
														module
															.exports
															.wxUser =
															wxUser;
														wx.getStorageSync(
															'wxUser',
															JSON
															.stringify(
																module
																.exports
																.wxUser
															)

														)
														module
															.exports
															.quetyUserInfoByopenId(
																cb
															);
													})
										},
										fail: function() {
											module.exports
												.getUserInfo(
													cb)

										}
									})

								})
						},
					})
				},
			})
		}
	},
	checkBindPhone: function() { //检查是否
		if (!wx.getStorageSync('phone')) {
			cb(false);
		} else {
			module.exports.getUserInfo(cb)
		}
	},
	getAddress: function(info, cb) { //获取地址
		wx.checkSession({
			success: function() {
				module.exports.ajax('wxcore/getPhoneNumber?code=' + wx.getStorageSync(
						'wxcode') +
					'&encryptedData=' + info.encryptedData + '&iv=' + info.iv +
					'&session_key=' + wx.getStorageSync('session_key'), {},
					function(json) {
						cb(json)
					})
			},
			fail: function() {
				wx.login({
					success: res => {
						module.exports.ajax('wxcore/getUserOpenId?code=' +
							res
							.code, {},
							function(json) {
								wx.getStorageSync('session_key', json
									.code)
								wx.getStorageSync('wxcode', res.code)
								module.exports.getAddress(info, cb)
							});


					}
				})
			}
		})
	},
	bindPhone: function(info, cb) {
		wx.checkSession({
			success: function() {
				module.exports.ajax('wxcore/getPhoneNumber?code=' + wx.getStorageSync(
						'wxcode') +
					'&encryptedData=' + info.encryptedData + '&iv=' + info.iv +
					'&session_key=' + wx.getStorageSync('session_key'), {},
					function(json) {
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
							module.exports.register(cb)
						} else {
							wx.showModal({
								content: JSON.stringify(json),
								showCancel: false,
								title: '错误',
							})
						}
					})
			},
			fail: function() {
				wx.login({
					success: res => {
						module.exports.ajax('wxcore/getUserOpenId?code=' +
							res
							.code, {},
							function(json) {
								wx.getStorageSync('session_key', json
									.code)
								wx.getStorageSync('wxcode', res.code)
								module.exports.bindPhone(info, cb)
							});


					}
				})
			}
		})
	},
	regular: {
		email: function(email) { //邮箱
			return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email);
		},
		chineseName: function(str) { //中文姓名
			return /^[\u4E00-\u9FA5]{2,4}$/.test(str);
		},
		mobile: function(str) { //手机
			return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(str);
		},
		tel: function(str) { //固话
			return /^0[\d]{2,3}-[\d]{7,8}$/.test(str);
		},
		idCard: function(str) { //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		},
		amount: function(str) { //金额(8位整数2位小数)
			return /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(str);
		},
		positiveInt: function(str) { //正整数
			return /^[1-9]*[1-9][0-9]*$/.test(str);
		},
		integer: function(str) { //整数(不限位数)
			return /^-?\d+$/.test(str);
		},
		chinese: function(str) { //判断是不是中文
			return /[\u4e00-\u9fa5]/g.test(str);
		},
		carNum: function(str) {
			return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
				.test(str);
		}
	},
	isEmpty: function(str) { //判断字符串是否为空
		return str == null || str.length == 0 || typeof(str) == "undefined" || str == '' || str == {};
	},
	alert: function(str, cb) {
		wx.showModal({
			title: '提示',
			content: str,
			showCancel: false,
			success: function(res) {
				if (cb) {
					cb();
				}
			}
		})
	},
	/**
	 * 日期格式化
	 * @param {String} dateStr	日期字符串
	 * @param {String} format	格式
	 */
	dateFormat: function(format, dateStr) {
		var d = new Date(dateStr);
		if (dateStr.toString().indexOf('-') > 0) {
			d = new Date(dateStr.replace(/-/g, '/'));
		}
		return d.format(format);
	},
	getSystemSet: function(cb) { //获取系统设置
		if (module.exports.systemData) {
			cb(module.exports.systemData)
		} else {
			this.ajax('systemSet/querySystemSet', {}, function(json) {
				module.exports.systemData = json.data.systemSet;
				cb(module.exports.systemData)
			});
		}
	},
	systemData: systemData,
	getDistance: function(lat1, lng1, lat2, lng2) { //根据坐标获取两点距离
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
	bd09togcj02: function(bd_lon, bd_lat) { //百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换<即 百度 转 谷歌、高德>
		var bd_lon = +bd_lon;
		var bd_lat = +bd_lat;
		var x = bd_lon - 0.0065;
		var y = bd_lat - 0.006;
		var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
		var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
		var gg_lng = z * Math.cos(theta);
		var gg_lat = z * Math.sin(theta);
		return [gg_lng, gg_lat]
	},
	gcj02tobd09: function(lng, lat) { //火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换<即谷歌、高德 转 百度>
		var lat = +lat;
		var lng = +lng;
		var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
		var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
		var bd_lng = z * Math.cos(theta) + 0.0065;
		var bd_lat = z * Math.sin(theta) + 0.006;
		return [bd_lng, bd_lat]
	},
	wgs84togcj02: function(lng, lat) { //WGS84转GCj02
		var lat = +lat;
		var lng = +lng;
		if (out_of_china(lng, lat)) {
			return [lng, lat]
		} else {
			var dlat = transformlat(lng - 105.0, lat - 35.0);
			var dlng = transformlng(lng - 105.0, lat - 35.0);
			var radlat = lat / 180.0 * PI;
			var magic = Math.sin(radlat);
			magic = 1 - ee * magic * magic;
			var sqrtmagic = Math.sqrt(magic);
			dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
			dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
			var mglat = lat + dlat;
			var mglng = lng + dlng;
			return [mglng, mglat]
		}
	},
	gcj02towgs84: function(lng, lat) { //GCJ02 转换为 WGS84
		var lat = +lat;
		var lng = +lng;
		if (out_of_china(lng, lat)) {
			return [lng, lat]
		} else {
			var dlat = transformlat(lng - 105.0, lat - 35.0);
			var dlng = transformlng(lng - 105.0, lat - 35.0);
			var radlat = lat / 180.0 * PI;
			var magic = Math.sin(radlat);
			magic = 1 - ee * magic * magic;
			var sqrtmagic = Math.sqrt(magic);
			dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
			dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
			var mglat = lat + dlat;
			var mglng = lng + dlng;
			return [lng * 2 - mglng, lat * 2 - mglat]
		}
	},
	regular: { //正则表达式验证
		email: function(str) { //邮箱
			return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str);
		},
		chineseName: function(str) { //中文姓名
			return /^[\u4E00-\u9FA5]{2,4}$/.test(str);
		},
		mobile: function(str) { //手机
			return /^0?1[3|4|5|7|8|9][0-9]\d{8}$/.test(str);
		},
		tel: function(str) { //固话
			return /^0[\d]{2,3}-[\d]{7,8}$/.test(str);
		},
		idCard: function(str) { //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		},
		amount: function(str) { //金额(8位整数2位小数)
			return /^([1-9][\d]{0,20}|0)(\.[\d]{1,2})?$/.test(str);
		},
		positiveInt: function(str) { //正整数
			return /^[1-9]*[1-9][0-9]*$/.test(str);
		},
		integer: function(str) { //整数(不限位数)
			return /^-?\d+$/.test(str);
		},
		chinese: function(str) { //判断是不是中文
			return /[\u4e00-\u9fa5]/g.test(str);
		}
	},
	getRndNum: function(n) { //获取随机正整数
		var num = '';
		for (var i = 0; i < n; i++)
			num += Math.floor(Math.random() * 10)
		return num;
	},
	/**
	 * 图片上传
	 * config为object
	 * count选择图片的数量
	 * success为function函数<用于接收图片的地址>U.upLoadImage({
	 *  success:function(res){
	 * }
	 * })
	 */
	upLoadImage: function(config) {
		var configs = {
			count: module.exports.isEmpty(config.count) ? 1 : config.count,
			success: config.success ? config.success : null
		}
		wx.chooseImage({
			count: configs.count,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths;
				imgRList = [];
				tempFilePathsIndex = 0; //遍历选择图片的下标
				getImageUrl(tempFilePaths, configs);
			}
		})
	}
}

/**
 * 上传图片到服务器
 */
function getImageUrl(imgList, configs) {
	wx.uploadFile({
		url: module.exports.apiUrl + 'CrossDomainOrdinaryServlet',
		filePath: imgList[tempFilePathsIndex],
		name: 'image',
		formData: {},
		success(res) {
			var dataInfo = JSON.parse(res.data); //返回的数据
			imgRList.push(dataInfo.url);
			if (tempFilePathsIndex == imgList.length - 1) {
				configs.success ? configs.success(imgRList) : null
			} else {
				tempFilePathsIndex = tempFilePathsIndex + 1;
				getImageUrl(imgList, configs)
			}
		}
	})
}

wx.getStorage({
	key: 'user',
	success: function(res) {
		var user = res.data ? JSON.parse(res.data) : null;
		module.exports.user = user;
	}
});
wx.getStorage({
	key: 'wxUser',
	success: function(res) {
		var wxUser = res.data ? JSON.parse(res.data) : null;
		module.exports.wxUser = wxUser;
	}
});
