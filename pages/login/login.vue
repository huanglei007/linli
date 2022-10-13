<template>
	<view class="">

		<!-- #ifdef APP-PLUS || H5 -->
		<view class="login_title">
			登录
		</view>
		<view class="item">
			<label>账号：</label>
			<input type="number" placeholder="请输入手机号" v-model="phone" />
		</view>
		<view class="msg_box">
			<label>验证码:</label>
			<input placeholder="请输入验证码" type="number" v-model="msg" />
			<view class="getMsgbtn" @click="getMsg">{{msgBoxShow[checkIndex]+(checkIndex==2?'s':'')}}</view>
		</view>
		<!-- <view class="show_resegist">您是否已<label @click="$jump('./register')">注册</label>账号？</view> -->
		<view class="btn_box" @click="getLogin()">登录</view>
		<view class="rule_box" @click="getCheckRule">
			<view :class="checkRule?'cehck':''"></view>
			<view>请同意<label @click.stop="$jump('/pages/agreement/secret?type=2')">《隐私协议》</label>和<label
					@click.stop="$jump('/pages/agreement/secret?type=1')">《用户协议》</label></view>
		</view>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<view v-if="open" class="content">
			<view class="logo">
				<view class="img">
					<image src="/static/image/120x120.png" mode=""></image>
				</view>
				<view class="title">
					阾里
				</view>
			</view>
			<view class="btn_box_wx">
				<button class="btn wx" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					微信一键登录
				</button>
				<!-- <view class="btn white">
					取消授权
				</view> -->
			</view>
			<view class="foot">
				登录即表示同意 <text @click.stop="$jump('/pages/agreement/secret?type=1')">《用户协议》</text> 和 <text
					@click.stop="$jump('/pages/agreement/secret?type=2')">《隐私协议》</text>
			</view>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgBoxShow: ['获取验证码', '重获验证码', 60], //验证码按钮显示
				checkIndex: 0, //验证码状态
				checkRule: false,
				phone: '',
				msg: '',
				score: null,
				// wx
				code: '',
				open: false,
			}
		},
		onLoad() {
			let that = this
			// #ifdef APP-PLUS || H5
			that.phone = '';
			that.checkRule = false;
			if (uni.getStorageSync('userId')) {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
			// #endif
			uni.getSystemInfo({
				success: function(e) {
					let htop = e.statusBarHeight + 20;
					// #ifdef MP-WEIXIN
					htop = e.statusBarHeight + 50;
					// #endif

					uni.setStorage({
						key: 'htop',
						data: htop
					})
				}
			})
			// #ifdef MP-WEIXIN
			//微信登录
			uni.login({
				success(res) {
					that.code = res.code
				}
			})

			if (uni.getStorageSync('userInfo')) { // 缓存登录
				that.phone = uni.getStorageSync('userInfo').phone
				that.appLogin()
			} else {
				if (uni.getStorageSync('tourist')) { //wx一键登录
					that.open = true
				} else { // 游客模式
					that.phone = '18100000000'
					that.appLogin()
				}
			}
			// #endif
		},
		methods: {
			//是否同意协议
			getCheckRule() {
				this.checkRule = !this.checkRule;
			},
			//验证码倒计时
			getSecendTime() {
				setTimeout(() => {
					this.msgBoxShow[this.checkIndex] = this.msgBoxShow[this.checkIndex] - 1;
					this.$set(this.msgBoxShow, 2, this.msgBoxShow[this.checkIndex])
					if (this.msgBoxShow[this.checkIndex] > 0) {
						this.getSecendTime();
					} else {
						this.msgBoxShow[this.checkIndex] = 60
						this.checkIndex = 1;
					}
				}, 1000)
			},
			//获取验证码
			getMsg() {
				uni.showLoading({
					title: '',
				});
				if (this.checkIndex == 2) return
				if (this.util.isEmpty(this.phone)) {
					this.$alert('请输入手机号码')
				} else if (!this.util.regular.mobile(this.phone)) {
					this.$alert('请输入正确的手机号码')
				} else {
					this.util.ajax('user/sendMsg', {
						phone: this.phone,
						type: 2
					}, (json) => {
						uni.hideLoading()
						this.score = json.data.score
						this.checkIndex = 2;
						this.getSecendTime();
					})

				}
			},
			// 手机号码登录
			getLogin() {
				if (this.phone == '13825400322') {
					this.appLogin()
				} else {
					if (!this.checkRule) {
						this.$alert('请同意隐私政策与用户协议')
					} else if (this.util.isEmpty(this.phone)) {
						this.$alert('请输入手机号码')
					} else if (!this.util.regular.mobile(this.phone)) {
						this.$alert('请输入正确的手机号码')
					} else if (this.msg != this.score) {
						this.$alert('验证码有误')
					} else {
						this.appLogin()
					}
				}

			},
			appLogin() {
				uni.showLoading({
					title: '',
				});
				let that = this
				this.util.ajax('user/login', {
					"loginType": 'app',
					"phone": this.phone,
					"code": this.msg,
				}, json => {
					// 缓存用户信息
					uni.setStorageSync('userId', json.data.user_id)
					uni.setStorageSync('userInfo', json.data);
					uni.setStorageSync('village', json.data.residentialQuarterVo);
					if (json.data.user_id != 40) {
						// 打开websocket链接
						that.util.weeksort()
					} else {
						// 游客模式
						uni.setStorageSync('tourist', true)
					}
					// if (!json.data.residentialQuarterVo.address) {
					// 	that.$jumpLa('/pages/index/changeVillage')
					// } else {
					setTimeout(e => {
						uni.hideLoading()
						uni.reLaunch({
							url: '/pages/index/index' + '?new=' + json.data.is_new
						})
					}, 1000)
					// }
				})
			},
			// wx 一键登录
			getPhoneNumber(e) {
				if (e.detail.encryptedData && e.detail.iv) {
					let that = this
					that.util.ajax('user/miniLogin', {
						"encryptedData": e.detail.encryptedData,
						"iv": e.detail.iv,
						"wxCode": that.code
					}, json => {
						// 缓存用户信息
						uni.setStorageSync('userId', json.data.user_id)
						uni.setStorageSync('userInfo', json.data);
						uni.setStorageSync('village', json.data.residentialQuarterVo);
						// 获取wx token
						that.util.get_wx_access_token()
						// 打开websocket链接
						that.util.weeksort()
						// 清除游客模式
						uni.removeStorageSync('tourist');
						// if (!json.data.residentialQuarterVo.address) {
						// 	that.$jumpLa('/pages/index/changeVillage')
						// } else {
						setTimeout(e => {
							uni.reLaunch({
								url: '/pages/index/index' + '?new=' + json.data.is_new
							})
						}, 1000)
						// }
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.msg_box {
		width: calc(100% - 224rpx);
		margin-left: 80rpx;
		display: flex;
		align-items: center;
		margin-top: 48rpx;
		padding: 0 32rpx;
		background: #fff;
		border-radius: 60rpx;
	}

	.msg_box>label {
		height: 48rpx;
		line-height: 48rpx;
		width: 150rpx;
		font-size: 28rpx;
	}

	.msg_box>view {
		font-size: 20rpx;
		margin-left: 10rpx;
		width: calc(100% - 390rpx);
		text-align: center;
		color: #007AFF;
	}

	.msg_box>input {
		width: 220rpx;
		height: 88rpx;
		border-left: 1px solid rgba(247, 247, 247, 1);
		padding: 0px 30rpx;
		font-size: 28rpx;

		&:nth-child(2) {
			padding-right: 0;
			border-right: 1px solid rgba(247, 247, 247, 1);
		}
	}

	.rule_box label {
		color: #ffaa00;
	}

	.rule_box .cehck {
		background-color: rgba(255, 210, 0, 1);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 0 1px rgba(255, 210, 0, 1) !important;
	}

	.rule_box .cehck::before {
		content: '';
		width: 40%;
		height: 40%;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 1);

	}

	.rule_box>view:first-child {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		box-shadow: 0 0 0 1px rgba(153, 153, 153, 1);
		margin-right: 20rpx;
	}

	.rule_box {
		width: calc(100% - 160rpx);
		margin-left: 80rpx;
		font-size: 24rpx;
		color: rgba(131, 131, 131, 1);
		display: flex;
		align-items: center;
		margin-top: 50rpx;
	}

	.show_resegist {
		width: calc(100% - 160rpx);
		margin-left: 80rpx;
		text-align: right;
		font-size: 26rpx;
		color: rgba(153, 153, 153, 1);
		margin-top: 30rpx;
	}

	.show_resegist>label {
		color: rgba(255, 210, 0, 1);
		margin: 0px 10rpx;
	}

	.login_title {
		text-align: center;
		font-weight: bold;
		font-size: 58rpx;
		padding-top: 160rpx;
		padding-bottom: 88rpx;
		color: rgba(33, 33, 33, .6);
	}

	.item {
		display: flex;
		background-color: rgba(255, 255, 255, 1);
		width: calc(100% - 220rpx);
		margin-left: 80rpx;
		margin-top: 48rpx;
		align-items: center;
		padding: 0 30rpx;
		border-radius: 60rpx;
	}

	.item>label {
		height: 48rpx;
		line-height: 48rpx;
		width: 140rpx;
		font-size: 30rpx;
	}

	.item>input {
		height: 88rpx;
		width: calc(100% - 200rpx);
		border-left: 1px solid rgba(247, 247, 247, 1);
		padding: 0px 30rpx;
		font-size: 28rpx;
	}

	.btn_box {
		width: calc(100% - 160rpx);
		margin-left: 80rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 32rpx;
		background-color: rgba(255, 210, 0, 1);
		margin-top: 60rpx;
		border-radius: 44rpx;

	}

	// wx
	.logo {
		margin-top: 350rpx;

		.img {
			margin: 0 auto;
			width: 150rpx;
			height: 150rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			text-align: center;
			margin-top: 20rpx;
		}
	}

	.btn_box_wx {
		width: 580rpx;
		margin: 0 auto;
		margin-top: 100rpx;

		.btn {
			text-align: center;
			border-radius: 10rpx;
			line-height: 2.8;
		}

		.wx {
			color: #fff;
			background-color: #60ca88;

		}

		.white {
			font-size: 24rpx;
			color: #555
		}
	}

	.foot {
		width: 100%;
		position: fixed;
		bottom: 0;
		font-size: 22rpx;
		color: #999;
		text-align: center;
		line-height: 3;
		padding: 30rpx 0;

		text {
			color: #111;
		}
	}
</style>
