<template>
	<view class="content">
		<view class="typeBox2 flexd jubetween">
			<view class="item" v-for="(item,i) in typeList" :key="i" :class="typeIndex==i?'active':''"
				@click="typeIndex=i">
				{{item}}
			</view>
		</view>
		<uni-forms ref='form'>
			<view class="form" style="background-color: initial;">
				<view class="address flexd jubetween flex-center" style="margin-bottom: 10rpx;"
					@click="addIndex='buyAdd';isAddress=true">
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
				<view class="wx_form">
					<uni-forms-item labelWidth="80" label="佣金" name="commission">
						<uni-easyinput class="input" :inputBorder="false" type="digit" v-model="formdata.commission"
							placeholder="请输入佣金" placeholder-style="color:#878787" />
					</uni-forms-item>
				</view>
				<view class="item flexd flex-center">
					<view class="label">配送时间</view>
					<view class="time flexd jubetween flex-center">
						<time-picker @change="bindTimeChange">
							<view class="flexd">
								<view class="uni-input">{{timeTxt}}</view>
							</view>
						</time-picker>
					</view>
				</view>
			</view>

			<view class="form">
				<view class="item flexd flex-center">
					<view class="label">商品类别</view>
					<picker :value="cateIndex" :range="cateList" range-key="name" @change="bindPickerChange">
						<view class="uni-input">{{cateList[cateIndex]?cateList[cateIndex].name: '1'}}</view>
					</picker>
				</view>
				<view class="wx_form">
					<uni-forms-item labelWidth="80" label="重量预估" name="goodsWeight">
						<uni-easyinput class="input" :inputBorder="false" type="digit" v-model="formdata.goodsWeight"
							placeholder="请输入预估重量(KG)" placeholder-style="color:#878787" />
					</uni-forms-item>
				</view>
				<view class="item flexd flex-center">
					<view class="label">大小预估</view>
					<picker :value="sizeIndex" :range="size" range-key="size_evaluation" @change="bindPickerChange2">
						<view class="uni-input">{{size[sizeIndex]?size[sizeIndex].size_evaluation: '1'}}</view>
					</picker>
				</view>
				<view class="item size flexd jubetween flex-center" v-if="size[sizeIndex].id==4">
					<uni-easyinput class="input" placeholder="长" v-model="otherSize[0]" type="number"
						placeholder-style="color:#878787" />
					<view class="">CM * </view>
					<uni-easyinput class="input" placeholder="宽" v-model="otherSize[1]" type="number"
						placeholder-style="color:#878787" />
					<view class="">CM*</view>
					<uni-easyinput class="input" placeholder="高" v-model="otherSize[2]" type="number"
						placeholder-style="color:#878787" />
					<view class="">CM</view>
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
		</uni-forms>

		<view class="foot flexd jubetween flex-center">
			<view class="cost">
				跑腿费 <text>{{formdata.commission==''?0:formdata.commission}}</text> 元
			</view>
			<view class="btn" @click="$shake(submit)">
				下单
			</view>
		</view>
		<picker-address ref='add' v-if="isAddress" @cancel="cancel()" @comfit="changeAdd"></picker-address>
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
		data() {
			return {
				htosp: 0,
				buyAdd: {},
				sentAdd: {},
				typeIndex: 0,
				typeList: ['帮送', '帮取'],
				isAddress: false,
				addIndex: 'buyAdd',
				imageValue: [],
				cateList: [{
					"name": "请选择物品类别",
					"id": 0
				}],
				cateIndex: 0,
				timeTxt: '请选择配送时间',
				size: [{
					"size_evaluation": '请选择预估大小',
					"id": 0
				}],
				sizeIndex: 0,
				otherSize: ['', '', ''],
				formdata: {
					categoryId: 4,
					publisherSex: 0,
					leaveMessage: '',
					deliveryStartTime: '',
					deliveryEndTime: '',
					publisherName: '',
					publisherPhone: '',
					senderName: '',
					senderPhone: '',
					senderSex: 0,
					commission: '',
					goodsSize: '',
					goodsWeight: '',
					specialDelivery: 0,
					delivery_date: ''
				},
				disable: false,
				// 防抖
				onoff:true
			}
		},
		mounted() {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.formdata.startTime = this.$shijianhour(new Date().getTime() + 3600000)
			this.formdata.endTime = this.$shijianhour(new Date().getTime() + 7200000)
			let that = this
			this.util.ajax('release/getSendGoodsCategoryList', {}, res => {
				that.cateList = that.cateList.concat(res.data.list)
			})
			this.util.ajax('release/sizeEvaluationList', {}, res => {
				that.size = that.size.concat(res.data.list)
			})
			// this.loadmore();
		},
		methods: {
			cancel() {
				this.isAddress = false
			},
			bindPickerChange: function(e) {
				this.cateIndex = e.target.value
			},
			bindPickerChange2(e) {
				this.sizeIndex = e.target.value
				this.$forceUpdate()
			},
			bindTimeChange: function(e) {
				this.formdata.startTime = e.star
				this.formdata.endTime = e.end
				this.timeTxt = e.text
				this.formdata.delivery_date = e.date
			},
			changeAdd(e) {
				this[this.addIndex] = e
				this.isAddress = false
			},
			addImg() {
				this.util.sendimage(5 - this.imageValue.length, this.imageValue)
			},
			del(index) {
				this.imageValue.splice(index, 1)
			},
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
				if (this.timeTxt == '请选择配送时间') {
					this.$alert('请选择配送时间')
					this.disable = false;
					return
				}
				if (!this.formdata.commission) {
					this.$alert('请输入佣金')
					this.disable = false;
					return
				}
				if (!this.cateIndex) {
					this.$alert('请选择商品类别')
					this.disable = false;
					return
				}
				if(!this.formdata.goodsWeight){
					this.$alert('请输入预估重量')
					this.disable = false;
					return
				}
				if (!this.sizeIndex) {
					this.$alert('请选择预估大小')
					this.disable = false;
					return
				}
				let that = this
				this.$refs.form.validate().then(res => {
					uni.showLoading({
						title: ''
					})
					let obj = res
					obj.publisherName = that.typeIndex == 0 ? that.buyAdd.name : that.sentAdd.name
					obj.publisherPhone = that.typeIndex == 0 ? that.buyAdd.phone : that.sentAdd.phone
					obj.senderName = that.typeIndex == 0 ? that.sentAdd.name : that.buyAdd.name
					obj.senderPhone = that.typeIndex == 0 ? that.sentAdd.phone : that.buyAdd.phone
					obj.getAndSendType = that.typeIndex + 1
					if (this.size[this.sizeIndex].id !== 4) {
						obj.goodsSize = this.size[this.sizeIndex].size_evaluation
					} else {
						obj.goodsSize = this.otherSize.join('cm*') + 'cm'
					}
					obj.goodsCategoryId = this.cateList[this.cateIndex].id
					obj.startTime = that.formdata.startTime
					obj.endTime = that.formdata.endTime
					obj.delivery_date = that.formdata.delivery_date
					obj.categoryId = that.formdata.categoryId
					obj.publisherSex = that.formdata.publisherSex
					obj.appointShop = that.formdata.appointShop
					obj.leaveMessage = that.formdata.leaveMessage
					obj.images = that.imageValue.join()
					obj.addressId = that.buyAdd.id
					obj.addressId2 = that.sentAdd.id
					obj.userId = that.userId
					console.log(obj)
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
					console.log('表单错误信息：', err);
					that.disable = false
				})
			},
			refresh() {
				if (this.isAddress) {
					this.$refs.add.refresh()
				}
			}
		}
	}
</script>

<style lang="scss">
	.typeBox2 {
		width: 400rpx;
		margin: 30rpx auto;

		.item {
			width: 45%;
			background-color: #fff;
			font-size: 32rpx;
			font-weight: bold;
			opacity: .6;
			line-height: 2;
			text-align: center;
			border: 1px solid #ccc;
			border-radius: 20rpx;

			&.active {
				opacity: 1;
			}
		}
	}

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
					width: 80px;
				}

				.time {
					flex: 1;
				}

				.uni-input {
					font-weight: 300;
					padding-left: 20rpx;
					color: rgb(135, 135, 135);
				}
			}

			.size>* {
				width: 17%;
				text-align: center;
			}

			.address {
				padding: 20rpx 30rpx;
				background-color: #fff;
				border-radius: 20rpx;

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

		.wx_form {
			padding: 0 40rpx;
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
				margin: 0 10rpx;
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
