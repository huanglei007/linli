<template>
	<view class="content">
		<view class="">
			<image style="width: 100%;" :src="imageurl+'/static/image/img_top.png'" mode="widthFix"></image>
		</view>
		<uni-forms ref='form' :rules="globalData.rules">
			<view class="form">
				<view class="item flexd flex-center">
					<view class="label">地址</view>
					<view class="text" @click="addIndex='buyAdd';isAddress=true">
						{{buyAdd.address?buyAdd.address+buyAdd.address_detail:'请选择地址'}}
					</view>
				</view>
			</view>
			<view class="form">
				<view class="item flexd">
					<view class="label">需求类别</view>
					<picker :value="cateIndex" :range="cateList" range-key="category_name" @change="bindPickerChange">
						<view class="uni-input">{{cateList[cateIndex]?cateList[cateIndex].category_name: '1'}}</view>
					</picker>
				</view>
				<uni-forms-item class="itemx" labelWidth="60" label="佣金" name="commission">
					<uni-easyinput @input="commissionChange" class="input" :inputBorder="false" type="digit"
						v-model="formdata.commission" placeholder="请输入佣金" placeholder-style="color:#878787" />
				</uni-forms-item>
			</view>

			<!-- <view class="form">
				<view class="item flexd flex-center jubetween">
					<view class="label">跑腿卷</view>
					<view @click="selectEvent">
						<text v-if="couponlist.length<1" class="font28 fontColor-ccc">暂无</text>
						<text v-else-if="couponlist.length>1&&!couponform.amount"
							class="font28 fontColor-FF6000">可使用</text>
						<text v-else class="font28 fontColor-FF6000">-{{couponform.amount}}</text>
						<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
					</view>
				</view>
			</view> -->

			<view class="form">
				<view class="item">
					<textarea class="textarea" v-model="formdata.leaveMessage" placeholder-style="color:#878787"
						placeholder="请输入留言" />
				</view>
			</view>
			<view class="form">
				<view class="item">
					<view class="out">
						<block v-for="(item,index) in imageValue" :key='index'>
							<view class="peop">
								<image :src="Img(item)" mode=""></image>
								<image @click="del(index)" src="/static/image/icon_jian.png" mode="" class="del icon32">
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
			<view class="foot flexd jubetween flex-center">
				<view class="cost">
					佣金 <text>{{commission||0}}</text>元
				</view>
				<view class="btn" @click="$shake(nextStep)">
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
		data() {
			return {
				imageurl:'',
				htosp: 0,
				userId: '',
				imageValue: [],
				buyAdd: {},
				isAddress: false,
				addIndex: 'buyAdd',
				cateList: [],
				cateIndex: 0,
				formdata: {
					categoryId: 6,
					publisherName: '',
					publisherSex: 0,
					leaveMessage: '',
					publisherPhone: '',
					commission: null
				},
				disable: false,
				// 跑腿卷
				couponform: {},
				couponlist: [],
				commission:null,
				// 防抖
				onoff:true
			}
		},
		onShow() {
			if (this.$refs.add) {
				this.$refs.add.refresh()
			}
			let that = this
			// 获取选择的跑腿卷
			uni.$on('couponChange', function(data) {
				that.couponform = data
				that.commission = that.formdata.commission - data.amount
			})
		},
		onLoad(option) {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.imageurl = this.globalData.imageurl
			let that = this
			this.util.ajax('release/categoryList', {
				"otherCategory": true
			}, res => {
				that.cateList = res.data.list
			})
		},
		methods: {
			cancel() {
				this.isAddress = false
			},
			bindPickerChange: function(e) {
				this.cateIndex = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			// 获取子组件地址
			changeAdd(e) {
				this.buyAdd = e
				this.isAddress = false
			},
			addImg() {
				this.util.sendimage(5 - this.imageValue.length, this.imageValue)
			},
			del(index) {
				this.imageValue.splice(index, 1)
			},
			// 监听佣金变化
			commissionChange(val) {
				this.commission = val
				this.getRun()
			},
			// 获取跑腿卷
			getRun() {
				let that = this;
				this.util.ajax('release/errandCouponList', {
					"curPage": 1,
					"pageSize": 15,
					"userId": uni.getStorageSync('userId')
				}, res => {
					this.couponlist = []
					for (let i = 0; i < res.data.coupon.length; i++) {
						if (that.formdata.commission >= res.data.coupon[i].min_order_amount && res.data
							.coupon[i]
							.use_status == 0) {
							that.couponlist.push(res.data.coupon[i])
						}
					}
				})
			},
			// 选择跑腿卷
			selectEvent() {
				let that = this
				if (that.couponform.amount) {
					this.$jump('/pagesA/a_myWelfare?price=' + this.formdata.commission + '&id=' + that.couponform.id)
				} else if (this.couponlist.length > 0) {
					this.$jump('/pagesA/a_myWelfare?price=' + this.formdata.commission)
				}
			},
			// 下单
			nextStep() {
				if (this.disable) return
				this.disable = true;
				if (!this.buyAdd.address) {
					this.$alert('请选择取件地址')
					this.disable = false;
					return
				}

				let that = this
				this.$refs.form.validate().then(res => {
					// uni.showModal({
					// 	title: '下单须知',
					// 	content: '如遇订单问题请及时在我的订单中申请售后，订单完成默认无售后',
					// 	confirmText: '发布',
					// 	success: function (e) {
					// 		if (e.confirm) {
					uni.showLoading({
						title: '正在加载',
						mask: true
					})
					let obj = res
					obj.publisherName = that.buyAdd.name
					obj.publisherPhone = that.buyAdd.phone
					obj.categoryId = that.formdata.categoryId
					obj.publisherSex = that.formdata.publisherSex
					obj.leaveMessage = that.formdata.leaveMessage
					obj.categoryId = that.cateList[that.cateIndex].id
					obj.images = that.imageValue.join()
					obj.addressId = that.buyAdd.id
					obj.userId = that.userId
					that.util.ajax('release/saveRelease', obj, res => {
						// #ifdef APP-PLUS
						let paymentType = 3
						// #endif
						// #ifdef MP-WEIXIN
						let paymentType = 4
						// #endif

						that.util.ajax('pay/toPay', {
							// "orderId": res.data.id,
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
		padding-bottom: 200rpx;

		.form {
			margin: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			padding: 0 40rpx;

			.item {
				padding: 40rpx 0;

				.textarea {
					height: 200rpx;
				}

				.name {
					width: 380rpx;
				}

				.label {
					width: 60px;
					font-size: 28rpx;
				}

				picker {
					width: 440rpx;
				}

				.text {
					color: #808080;
					padding-left: 20rpx;
					width: 480rpx;
				}

				.uni-input {
					color: #808080;
					padding-left: 20rpx;
					width: 480rpx;
				}
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
		/* #ifdef MP-WEIXIN || APP-PLUS */
		bottom: 0;
		/* #endif */
		/* #ifdef H5 */
		bottom: 100rpx;
		/* #endif */
		left: 0;
		width: 100%;
		padding: 1vh 30rpx;
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
