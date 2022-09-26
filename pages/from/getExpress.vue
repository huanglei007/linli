<template>
	<view class="content">
		<uni-forms ref='form'>
			<view class="form">
				<view class="address flexd jubetween flex-center" @click="addIndex='buyAdd';isAddress=true">
					<view class="icon">
						<image src="/static/image/icon_q.png" mode="widthFix"></image>
					</view>
					<view class="text">
						{{buyAdd.address_abbreviation?buyAdd.address_abbreviation+buyAdd.address_detail:'请选择取件地址'}}
					</view>
					<view class="more">
						<image src="/static/image/icon_gd.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="address flexd jubetween flex-center" @click="addIndex='sentAdd';isAddress=true">
					<view class="icon">
						<image src="/static/image/icon_s.png" mode="widthFix"></image>
					</view>
					<view class="text">
						{{sentAdd.address_abbreviation?sentAdd.address_abbreviation+sentAdd.address_detail:'请选择送货地址'}}
					</view>
					<view class="more">
						<image src="/static/image/icon_gd.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="form">
				<view class="item flexd flex-center">
					<view class="label">配送时间</view>
					<view class="time flexd jubetween flex-center">
						<radio-group class="flexd" @change="radioChange" style="transform:scale(0.9)">
							<label class="flexd flex-center" style="padding-right: 30rpx;"
								v-for="(item, index) in arr_time" :key="item.value">
								<view>
									<radio :value="item.value" :checked="index === radio_time" />
								</view>
								<view>{{item.text}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="item flexd flex-center">
					<view class="label">取件数量</view>
					<picker style="flex: 1;" @change="bindPickerChange" :value="take_index" :range="takeParts"
						range-key="number">
						<view class="uni-input">{{takeParts[take_index].number?takeParts[take_index].number:'请选择取件数量'}}
						</view>
					</picker>
				</view>
			</view>

			<view class="form">
				<view class="item flexd flex-center jubetween">
					<view class="label">跑腿劵</view>
					<view style="flex: 1;text-align:right;padding-left:20rpx;" @click="selectEvent">
						<text class="fontColor-ccc" v-if="couponlist.length<1&&!couponform.amount">暂无</text>
						<text class="fontColor-FF6000" v-else-if="couponlist.length>0&&!couponform.amount">可使用</text>
						<text class="fontColor-FF6000" v-else>-{{couponform.amount}}</text>
						<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="form">
				<view class="item">
					<textarea class="textarea" :maxlength="20" v-model="formdata.leaveMessage"
						placeholder-style="color:#878787" placeholder="请给接单者留言(最多20字)" />
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
					<view style="font-size: 24rpx;line-height: 1.3;color: #888;">请上传取件相关截图信息（如取件码截图）</view>
				</view>
			</view>
			<!-- <view style="padding: 0 30rpx;">
				<view class="reda">
					注：
				</view>
				<view class="reda">
					1.单件重量不超过5kg
				</view>
			</view> -->
			<view class="foot flexd jubetween flex-center">
				<view class="cost">
					<!-- takeParts[take_index].commission?takeParts[take_index].commission:0 -->
					<text>跑腿费 </text>
					<text>{{commission}}元</text>
				</view>
				<view class="btn" @click="$shake(submit)">
					下单
				</view>
			</view>
		</uni-forms>
		<picker-address ref='add' v-if="isAddress" @cancel="cancel" @comfit="changeAdd"></picker-address>
	</view>
</template>

<script>
	import timePicker from '@/components/timeRange.vue'
	import pickerAddress from '@/components/changeAddresss.vue'
	export default {
		components: {
			pickerAddress,
			timePicker
		},
		props: ['list'],
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				htosp: 0,
				name: '',
				time: '12:01',
				buyAdd: {},
				sentAdd: {},
				addIndex: 'buyAdd',
				isAddress: false,
				phone: '',
				imageValue: [],
				startTimeShow: false,
				// 取件数量
				takeParts: [{
					"commission": 0,
					"id": 0,
					"number": '请选择取件数量'
				}],
				take_index: 0,
				formdata: {
					categoryId: 1,
					publisherName: '',
					publisherSex: 0,
					leaveMessage: '',
					publisherPhone: '',
					delivery_date: '',
					deliveryStartTime: '',
					deliveryEndTime: '',
					now_delivery: 0
				},
				disalbe: false,
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
					text: '立即配送',
					value: '1'
				}],
				// 防抖
				onoff: true
			}
		},
		mounted(option) {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			let that = this
			// 取件数量列表
			this.util.ajax('release/getExpressNumberList', {}, res => {
				that.takeParts = that.takeParts.concat(res.data.list)
				if (!that.couponform.amount) {
					that.commission = that.takeParts[that.take_index].commission
				}
			})
		},
		watch: {
			list(newVal, oldVal) {
				let that = this
				if (newVal.length > 0) {
					setTimeout(() => {
						that.screenEvent(newVal)
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
			getAdd(e) {
				this[this.addIndex] = e
			},
			change(e) {
				this.address = e
				this.txt = e.data.join('-')
			},
			changeAdd(e) {
				this[this.addIndex] = e
				this.isAddress = false
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			addImg() {
				this.util.sendimage(5 - this.imageValue.length, this.imageValue)
			},
			del(index) {
				this.imageValue.splice(index, 1)
			},
			// 监听取件数量
			bindPickerChange(e) {
				let that = this
				that.take_index = e.target.value
				this.screenEvent(that.list)

				if (that.radio_time == 0) {
					if (that.couponform.amount) {
						that.commission = that.takeParts[e.target.value].commission - that.couponform.amount
					} else {
						that.commission = that.takeParts[e.target.value].commission
					}
				} else {
					if (that.couponform.amount) {
						that.commission = that.takeParts[e.target.value].commission + 1 - that.couponform.amount
					} else {
						that.commission = that.takeParts[e.target.value].commission + 1
					}
				}
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
				that.formdata.deliveryStartTime = this.$shijian(new Date().getTime()).split(' ')[1]
				that.formdata.deliveryEndTime = this.$shijian(new Date().getTime() + (3600000 * 2)).split(' ')[1]
				that.formdata.delivery_date = this.$shijian(new Date()).split(' ')[0]
			},
			// 筛选可用卷
			screenEvent(list) {
				let that = this
				let commission = that.takeParts[that.take_index].commission
				that.couponlist = []
				for (let i = 0; i < list.length; i++) {
					if (commission >= list[i].min_order_amount && list[i].use_status == 0) {
						that.couponlist.push(list[i])
					}
				}
			},
			// 选择跑腿卷
			selectEvent() {
				let that = this
				if (that.couponlist.length > 0) {
					let number = that.takeParts[that.take_index]
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
					this.$alert('请选择取件地址')
					this.disable = false;
					return
				}
				if (!this.sentAdd.address) {
					this.$alert('请选择送货地址')
					this.disable = false;
					return
				}
				if (this.take_index == 0) {
					this.$alert('请选择取件数量')
					this.disable = false;
					return
				}
				if (!this.imageValue.length) {
					this.$alert('请上传快递取件码截图')
					this.disable = false;
					return
				}
				// 初始化起始时间
				this.initTime()
				let that = this
				that.$refs.form.validate().then(res => {
					uni.showLoading({
						title: ''
					})
					let obj = res
					obj.publisherName = that.sentAdd.name
					obj.publisherPhone = that.sentAdd.phone
					obj.categoryId = that.formdata.categoryId
					obj.publisherSex = that.formdata.publisherSex
					obj.leaveMessage = that.formdata.leaveMessage
					obj.numberId = that.takeParts[that.take_index].id
					obj.images = that.imageValue.join()
					obj.addressId = that.buyAdd.id
					obj.addressId2 = that.sentAdd.id
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
										that.$jump(
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
			// 刷新地址
			refresh() {
				if (this.isAddress) {
					this.$refs.add.refresh()
				}
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

				.textarea {
					height: 100rpx;
				}

				.label {
					width: 120rpx;
					font-size: 28rpx;
				}

				.time {
					flex: 1;
				}

				.text {
					color: #808080;
					padding-left: 20rpx;
				}

				.uni-input {
					color: #808080;
					padding-left: 20rpx;
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
					height: 50rpx;
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
			border-radius: 20rpx;
			padding: 0 70rpx;
		}
	}
</style>
