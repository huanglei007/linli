<template>
	<view class="sub">
		<view class="sub-text">
			<text class="font30">上门服务费</text>
			<text class="sub-text-cost">
				￥
				<text v-if="form">{{form.commission}}</text>
				<text v-else>0.00</text>
			</text>
		</view>
		<view class="sub-btn" @click="$shake(SubmitAppointment)">
			<text>提交预约</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['type', 'form'],
		data() {
			return {
				disable: false,
				// 防抖
				onoff:true
			}
		},
		created() {

		},
		methods: {
			// 提交预约
			SubmitAppointment() {
				let that = this
				let form = this.form
				form.userId = uni.getStorageSync('userId')
				let url = 'personalDemand/'
				console.log(form)
				if (form.address == '' || form.start_time == '') {
					that.$alert('地址 时间不能为空')
				} else {
					if (that.type == '百味家厨') {
						if (form.category_id2 && form.dishes_number != 0) {
							this.pay(url + 'saveChefAppointment', '百味家厨')
						} else {
							that.$alert('预约性质及菜品数量不能为空')
						}
					} else if (that.type == '安装维修') {
						if (form.category_id2) {
							this.pay(url + 'saveInstallMaintenance', '安装维修')
						} else {
							that.$alert('维修类别不能为空')
						}
					} else if (that.type == '喂猫喂狗') {
						if (form.category_id2 && form.combo_id && form.start_time != '') {
							this.pay(url + 'saveFeedPet', '喂猫喂狗')
						} else {
							that.$alert('套餐 日期 类别不能为空')
						}
					} else if (that.type == '家政保洁') {
						if (form.category_id2) {
							this.pay(url + 'saveHousekeeping', '家政保洁')
						} else {
							that.$alert('服务类别不能为空')
						}
					} else if (that.type == '陪护看病') {
						if (form.service_object_name != '' && form.accompany_age != '' && form.accompany_place != '' && form.accompany_time_id != '') {
							this.pay(url + 'saveAccompanyingDoctor', '陪护看病')
						} else {
							that.$alert('服务对象 年龄 场所 时间不能为空')
						}
					}
				}
			},
			// 支付
			pay(url, subject) {
				let that = this
				// 提交预约
				that.util.ajax(url, that.form, res => {
					uni.showLoading({
						title: '',
					});
					// #ifdef APP-PLUS
					let paymentType = 3
					// #endif
					// #ifdef MP-WEIXIN
					let paymentType = 4
					// #endif

					that.util.ajax('pay/toPay', {
						"orderNum": res.data.orderNum,
						"payType": 1,
						"paymentType": paymentType,
						"purpose": 2,
						"subject": subject,
						"userId": uni.getStorageSync('userId')
					}, resx => {
						uni.hideLoading()
						// #ifdef APP-PLUS
						let response = JSON.parse(resx.data)
						// #endif
						uni.requestPayment({
							"provider": "wxpay",
							// #ifdef APP-PLUS
							"orderInfo": {
								"appid": response
									.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
								"noncestr": response.noncestr, // 随机字符串
								"package": response.package, // 固定值
								"partnerid": response.partnerid, // 微信支付商户号
								"prepayid": response.prepayid, // 统一下单订单号 
								"timestamp": response.timestamp, // 时间戳（单位：秒）
								"sign": response.sign // 签名，这里用的 MD5 签名
							},
							// #endif
							// #ifdef MP-WEIXIN
							"timeStamp": resx.data.timeStamp,
							"nonceStr": resx.data.nonceStr,
							"package": resx.data.packageValue,
							"signType": 'MD5',
							"paySign": resx.data.paySign,
							// #endif
							success(e) {
								that.$alert('提交成功')
								that.disable = false
								setTimeout(function() {
									that.$jump('/pages/user/myOrder/myOrder?type=0')
								}, 1000);
							},
							fail(e) {
								that.$alert('支付失败')
								that.disable = false
							}
						})
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.sub {
		width: calc(100vw - 100rpx);
		padding: 20rpx 40rpx 20rpx 60rpx;
		background-color: #fff;
		border-top: 1px solid #D4D4D4;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2;
		box-shadow: 0px 6rpx 30rpx #888888;

		.sub-text {
			.sub-text-cost {
				font-size: 42rpx;
				color: #FF6000;
				padding-left: 20rpx;
			}
		}

		.sub-btn {
			padding: 20rpx 60rpx;
			background: linear-gradient(180deg, #FDEC7E 0%, #F9D448 100%);
			border-radius: 12px;
		}
	}
</style>
