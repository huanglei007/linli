<script>
	export default {
		data() {
			return {};
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			})
			// #endif
		},
		onShow() {
			// #ifdef MP-WEIXIN
			setInterval(() => { // 定时更新wx token
				this.util.get_wx_access_token()
			}, 6000000)

			// wx更新版本
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				console.log('新版本', res.hasUpdate);
			});
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					showCancel: false,
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});

			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				console.log('download error')
				uni.showModal({
					title: '提示',
					content: '新版小程序下载失败\n请自行退出程序，手动卸载本程序，再运行',
					confirmText: "知道了"
				});
			});
			// #endif

			// 当前用户不是游客则打开websocket链接
			if (uni.getStorageSync('userId') && uni.getStorageSync('userId') != 40) {
				this.util.weeksort()
			}
		},
		onHide() {
			// 页面隐藏时关闭websocket链接
			uni.closeSocket()
		},
		beforeDestroy() {},
		methods: {}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss';
	@import '@/static/css/a-index';

	.uni-checkbox-input {
		width: 28rpx !important;
		height: 28rpx !important;
	}

	page {
		-webkit-text-size-adjust: 100% !important;

	}

	.gender uni-radio .uni-radio-input {
		width: 30rpx;
		height: 30rpx;
	}

	uni-radio .uni-radio-input.uni-radio-input-checked {
		background-color: $uni-color-primary !important;
		border-color: $uni-color-primary !important;
	}

	/*每个页面公共css */
	view {
		font-size: 28rpx;
		color: #212121;
	}

	button {
		background-color: none;
		background: none;
		border: none;
		margin: 0;
		padding: 0;
	}

	button::after {
		content: " ";
		width: 200%;
		height: 200%;
		display: none;
	}

	.content {
		padding-bottom: 100rpx;
	}

	.kong {
		width: 100%;
		text-align: center;
		padding-top: 134rpx;

		image {
			width: 230rpx;
			height: 230rpx;
		}
	}

	.mb-20 {
		margin-bottom: 20rpx;
	}

	.mb-10 {
		margin-bottom: 10rpx;
	}

	.placeholder {
		color: #808080;
		font-size: 28rpx;
	}

	.uni-textarea-placeholder {
		color: #808080;
		font-size: 28rpx;
	}

	.uni-input-placeholder {
		color: #808080;
		font-size: 28rpx !important;
	}

	page {
		background: #f5f5f5;
	}

	/* 解决小程序和app滚动条的问题 */
	/* #ifdef MP-WEIXIN || APP-PLUS */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	/* #endif */
	/* 解决H5的问题 */
	/* #ifdef H5 */

	uni-scroll-view .uni-scroll-view::webkit-scrollbar {
		/* 隐藏滚动条,但依旧具备可以滚动的功能 */
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	/* #endif */

	/* #ifdef APP-PLUS */
	// scroll-view ::-webkit-scrollbar {
	// 	width: 0;
	// 	height: 0;
	// 	display: none;
	// 	background-color: transparent;
	// }
	/* #endif */

	.toptype {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		padding-bottom: 20rpx;
		background: #FFF;
		width: 100%;
	}

	.titla {
		width: 50%;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		position: absolute;
		right: 0;
		bottom: 20rpx;
		left: 0;
		margin: auto;
	}

	.backs {
		width: 32rpx;
		height: 32rpx;
		padding: 12rpx 20rpx;
	}

	.call {
		width: 58rpx;
		height: 58rpx;
		margin: auto 0;
	}

	.uni-picker-container {
		z-index: 999999 !important;
	}

	.flexd {
		display: flex;
	}

	.black {
		color: #212121;
	}

	.texleft {
		text-align: left;
	}

	.texcenter {
		text-align: center;
	}

	.texright {
		text-align: right;
	}

	.jucenter {
		justify-content: center;
	}

	.juaround {
		justify-content: space-around;
	}

	.jubetween {
		justify-content: space-between;
	}

	.juend {
		justify-content: flex-end;
	}

	.flex-end {
		align-items: flex-end;
	}

	.flex-start {
		align-items: flex-start;
	}

	.flex-center {
		align-items: center;
	}

	.blue {
		color: #0084FF;
	}

	.gray {
		color: #C2C2C2;
	}

	.green {
		color: #00DBB4;
	}

	.shengray {
		color: #646464;
	}

	.reda {
		color: red;
	}

	.yinlv {
		color: #00FFA6;
	}

	.huan {
		color: #FFF600;
	}

	.yello {
		color: #FFAE00;
	}

	.orgen {
		color: #FC950D;
	}

	.white {
		color: #FFF;
	}

	uni-modal .uni-modal {
		border-radius: 20rpx;
	}

	.flex1-textRight {
		flex: 1;
		text-align: right;
		justify-content: flex-end;
	}

	.flex1-textLeft {
		flex: 1;
		text-align: left;
		justify-content: flex-start;
	}

	.peihu-yuyue-uptime .uni-calendar__mask,
	.peihu-yuyue-uptime .uni-calendar__content {
		transform: none !important;
		transition: none;
		transition-property: none !important;
		transition-duration: 0s !important;
	}

	.peihu-yuyue-uptime .uni-calendar__mask {
		opacity: 1 !important;
	}

	.label-text {
		font-size: 14px !important;
		color: #212121 !important;
	}
</style>
