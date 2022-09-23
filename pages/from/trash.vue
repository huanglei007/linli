<template>
	<view class="content">
		<uni-forms ref='form'>
			<view class="form">
				<view class="address flexd jubetween flex-center" @click="addIndex='buyAdd';isAddress=true">
					<view class="icon">
						<image src="/static/image/icon_q2.png" mode="widthFix"></image>
					</view>
					<view class="text">
						{{buyAdd.address_abbreviation?buyAdd.address_abbreviation+buyAdd.address_detail:'请选择取垃圾地址'}}
					</view>
					<view class="more">
						<image src="/static/image/icon_gd.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			
			<view class="form">
				<view class="item flexd flex-center">
					<view class="label">上门时间</view>
					<view class="time flexd jubetween flex-center">
						<radio-group class="flexd" @change="radioChange" style="transform:scale(0.9)">
							<label class="flexd flex-center" style="padding-left:20rpx;"
								v-for="(item, index) in arr_time" :key="item.value">
								<view>
									<radio :value="item.value" :checked="index === radio_time" />
								</view>
								<view>{{item.text}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			
			<view class="form">
				<view class="item flexd flex-center jubetween">
					<view class="label">跑腿劵</view>
					<view style="flex: 1;text-align: right;padding-left:20rpx;" @click="selectEvent">
						<text class="fontColor-ccc" v-if="couponlist.length<1&&!couponform.amount">暂无</text>
						<text class="fontColor-FF6000" v-else-if="couponlist.length>0&&!couponform.amount">可使用</text>
						<text class="fontColor-FF6000" v-else-if="couponform.amount">-{{couponform.amount}}</text>
						<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="form">
				<view class="item">
					<textarea class="textarea" v-model="formdata.leaveMessage" :maxlength="20"
						placeholder-style="color:#878787" placeholder="请输入留言(最多20字)" />
				</view>
			</view>
			<view class="form">
				<view class="item">
					<view class="out">
						<block v-for="(item,index) in imageValue" :key='index'>
							<view class="peop">
								<image :src="Img(item)" mode=""></image>
								<image @click="del(index)" src="/static/image/icon_jian.png" mode="" class="del">
								</image>
							</view>
						</block>
						<view class="peop" @click="addImg()">
							<image src="/static/image/icon_tj.png" mode="" style="border-radius: 0;"></image>
						</view>
					</view>
					<view style="font-size: 24rpx;line-height: 1.3;color: #888;">请上传相关截图信息</view>
				</view>
			</view>
			<view style="padding: 0 30rpx;">
				<view class="reda">
					注：
				</view>
				<view class="reda">
					1.下单后，将垃圾放在门口即可
				</view>
				<view class="reda">
					2.该服务只帮丢生活垃圾，不含装修建筑垃圾
				</view>
			</view>
			<view class="foot flexd jubetween flex-center">
				<view class="cost">
					<!-- {{timeList[timeIndex]?timeList[timeIndex].commission: '0'}} -->
					跑腿费
					<text>{{commission}}元</text>
				</view>
				<view class="btn" @click="$shake(submit)">
					下单
				</view>
			</view>
		</uni-forms>
		<picker-address ref='add' v-if="isAddress" @cancel="cancel()" @comfit="changeAdd"></picker-address>
	</view>
</template>

<script>
	import pickerAddress from '@/components/changeAddresss.vue'
	export default {
		components: {
			pickerAddress
		},
		props: ['list'],
		data() {
			return {
				htosp: 0,
				imageValue: [],
				buyAdd: {},
				isAddress: false,
				addIndex: 'buyAdd',
				timeList: [],
				timeIndex: 0,
				formdata: {
					categoryId: 2,
					goodsValuation: '',
					publisherSex: 0,
					leaveMessage: '',
					publisherName: '',
					publisherPhone: '',
					delivery_date: '',
					deliveryStartTime: '',
					deliveryEndTime: '',
					now_delivery:0
				},
				// 跑腿卷
				couponform: {},
				couponlist: [],
				commission: 0,
				// 配送时间
				radio_time: 0,
				arr_time: [{
					text: '两小时内',
					value: '0'
				}, {
					text: '立即上门',
					value: '1'
				}],
				// 防抖
				onoff:true
			}
		},
		mounted(option) {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			
			this.formdata.deliveryStartTime = this.$shijianhour(new Date().getTime())
			this.formdata.deliveryEndTime = this.$shijianhour(new Date().getTime() + (3600000 * 2))
			this.formdata.delivery_date = this.$shijian(new Date()).split(' ')[0]
			
			let that = this
			this.util.ajax('release/throwGarbageCycleList', {}, res => {
				that.timeList = res.data.list
				if (!that.couponform.amount) {
					that.commission = that.timeList[that.timeIndex].commission
				}
			})
		},
		watch: {
			list(newVal, oldVal) {
				let that = this
				if (newVal.length > 0) {
					setTimeout(() => {
						this.screenEvent(newVal)
					}, 1000)
				}
			},
			radio_time(newVal, oldVal) {
				let that = this
				if (newVal == 1) {
					that.commission += 1
				} else {
					that.commission -= 1
				}
			},
			commission(newVal, oldVal) {
				this.commission = Number(newVal.toFixed(2))
			}
		},
		methods: {
			cancel() {
				this.isAddress = false
			},
			// 监听取件数量
			bindPickerChange: function(e) {
				let that = this
				that.index = e.target.value
				this.screenEvent(that.list)
				if (that.radio_time == 0) {
					if (that.couponform.amount) {
						that.commission = that.timeList[e.target.value].commission - that.couponform.amount
					} else {
						that.commission = that.timeList[e.target.value].commission
					}
				} else {
					if (that.couponform.amount) {
						that.commission = that.timeList[e.target.value].commission + 1 - that.couponform.amount
					} else {
						that.commission = that.timeList[e.target.value].commission + 1
					}
				}
			},
			changeAdd(e) {
				this[this.addIndex] = e
				this.isAddress = false
			},
			refresh() {
				if (this.isAddress) {
					this.$refs.add.refresh()
				}
			},
			addImg() {
				this.util.sendimage(5 - this.imageValue.length, this.imageValue)
			},
			del(index) {
				this.imageValue.splice(index, 1)
			},
			// 监听配送时间
			radioChange(e) {
				let that = this
				for (let i = 0; i < that.arr_time.length; i++) {
					if (that.arr_time[i].value == e.detail.value) {
						that.radio_time = i
						that.formdata.now_delivery = i
					}
				}
			},
			// 初始化配送时间(两小时内)
			initTime() {
				let that = this
				that.formdata.deliveryStartTime = this.$dateshifen(new Date().getTime())
				that.formdata.deliveryEndTime = this.$dateshifen(new Date().getTime() + (3600000 * 2))
				that.formdata.delivery_date = this.$shijian(new Date()).split(' ')[0]
			},
			// 筛选可用卷
			screenEvent(list) {
				let that = this
				that.couponlist = []
				for (let i = 0; i < list.length; i++) {
					if (that.timeList[that.timeIndex].commission >= list[i].min_order_amount && list[i].use_status == 0) {
						that.couponlist.push(list[i])
					}
				}
			},
			// 选择跑腿卷
			selectEvent() {
				let that = this
				if(that.couponlist.length > 0){
					let number = that.timeList[that.timeIndex]
					let param = '?price=' + number.commission
					if (that.couponform.amount) {
						param = param + '&coup_id=' + that.couponform.id
					}
					uni.navigateTo({
						url: '/pagesA/a_myWelfare' + param,
						events: {
							// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
							acceptDataFromOpenedPage: function(data) {
								if (that.radio_time == 0) {
									if (data.data) {
										that.couponform = data.data
										that.commission = number.commission - data.data.amount
									} else {
										that.couponform = {}
										that.commission = number.commission
									}
								} else {
									if (data.data) {
										that.couponform = data.data
										that.commission = number.commission + 1 - data.data.amount
									} else {
										that.couponform = {}
										that.commission = number.commission + 1 
									}
								}
							}
						},
					})
				}
			},
			// 下单
			submit() {
				if (this.disable) return
				this.disable = true;
				if (!this.buyAdd.address) {
					this.$alert('请选择丢垃圾地址')
					this.disable = false;
					return
				}
				if (!this.imageValue.length) {
					this.$alert('请上传截图')
					this.disable = false;
					return
				}
				let that = this
				if (that.radio_time == 0) {
					that.initTime()
				}
				that.$refs.form.validate().then(res => {
					uni.showLoading({
						title: ''
					})
					let obj = res
					obj.publisherName = that.buyAdd.name
					obj.publisherPhone = that.buyAdd.phone
					obj.categoryId = that.formdata.categoryId
					obj.publisherSex = that.formdata.publisherSex
					obj.leaveMessage = that.formdata.leaveMessage
					obj.images = that.imageValue.join()
					obj.addressId = that.buyAdd.id
					obj.cycleId = that.timeList[that.timeIndex].id
					obj.commission = that.commission
					obj.couponId = that.couponform.id
					obj.userId = that.userId
					obj.delivery_date = that.formdata.delivery_date
					obj.deliveryStartTime = that.formdata.deliveryStartTime
					obj.deliveryEndTime = that.formdata.deliveryEndTime
					obj.now_delivery = that.formdata.now_delivery
					that.util.ajax('release/saveRelease', obj, res => {
						// #ifdef APP-PLUS
						let paymentType = 3
						// #endif
						// #ifdef MP-WEIXIN
						let paymentType = 4
						// #endif
						that.util.ajax('pay/toPay', {
							"orderId": res.data.id,
							"orderNum": res.data.orderNum,
							"payType": 1,
							"paymentType": paymentType,
							"purpose": 2,
							"subject": "发布需求",
							"userId": that.userId
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
									that.$alert('支付成功')
									that.disable = false
									setTimeout(function() {
										that.$jumpLa(
											'/pages/user/myOrder/myOrder?type=0'
										)
									}, 1000);
								},
								fail(e) {
									that.remark = e
									that.$alert('支付失败')
									that.disable = false
								}
							})
						})
					})
				}).catch(err => {
					that.disable = false
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 100rpx;

		.form {
			margin: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.item {
				padding: 20rpx 40rpx;
				
				.label{
					width: 120rpx;
				}
				.textarea {
					height: 100rpx;
				}

				.uni-input {
					color: #808080;
					width: 400rpx;
				}
			}

			.itemx {
				padding: 0 40rpx;
			}

			.address {
				padding: 20rpx 30rpx;

				image {
					width: 100%;
					height: 50rpx;
				}

				.icon {
					width: 50rpx;

				}

				.more {
					width: 30rpx;
				}

				.text {
					width: 500rpx;
					font-size: 28rpx;
					color: #808080;
				}
			}
		}

		.next {
			position: fixed;
			bottom: 40rpx;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			background-image: $uni-bg-color;
			font-size: 32rpx;
			padding: 30rpx 0;
			text-align: center;
			border-radius: 60rpx;
		}

		.out {
			display: flex;
			flex-wrap: wrap;

			.peop {
				width: 154rpx;
				height: 154rpx;
				margin: 20rpx 0;
				margin-right: 12rpx;
				position: relative;

				image,
				video {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}

				.del {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					top: 2rpx;
					right: 2rpx;
				}
			}
		}
	}

	.foot {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 2vh 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow: 0px 6rpx 30rpx #888888;

		.cost {
			font-size: 28rpx;

			text {
				font-size: 32rpx;
			}
		}

		.btn {
			line-height: 5vh;
			font-size: 32rpx;
			background-image: $uni-bg-color;
			border-radius: 10rpx;
			padding: 0 70rpx;
		}
	}
</style>
