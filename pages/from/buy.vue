<template>
	<view class="content">
		<uni-forms ref='form' :rules="form_rules">
			<view class="form">
				<view class="address flexd jubetween flex-center" v-show="formdata.appointShop==1"
					@click="addIndex='buyAdd';isAddress=true">
					<view class="icon">
						<image src="/static/image/icon_g.png" mode="widthFix"></image>
					</view>
					<view class="text">
						{{buyAdd.address_abbreviation?buyAdd.address_abbreviation+buyAdd.address_detail:'请选择购买地址'}}
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
				<view class="item flexd jubetween flex-center">
					<view class="label" style="width: auto;">是否指定商家购买</view>
					<radio-group class="gender flexd jubetween flex-center">
						<label class="uni-list-cell uni-list-cell-pd flexd flex-center" @click="formdata.appointShop=1">
							<view>
								<radio class="flexd flex-center" :checked="formdata.appointShop==1" />
							</view>
							<view>需要</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd flexd flex-center" @click="formdata.appointShop=0">
							<view>
								<radio class="flexd flex-center" :checked="formdata.appointShop==0" />
							</view>
							<view>不需要</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="form wx_form_goodsName">
				<uni-forms-item name="goodsName">
					<uni-easyinput class="input" :inputBorder="false" type="text" v-model="formdata.goodsName"
						placeholder="请输入需要帮购商品名称" placeholder-style="color:#878787" />
				</uni-forms-item>
			</view>
			<!-- <view class="form wx_form">
				<uni-forms-item style="color:#212121;" labelWidth="80" label="佣金" name="commission">
					<uni-easyinput class="input" :inputBorder="false" type="digit" v-model="formdata.commission"
						placeholder="请输入佣金" placeholder-style="color:#878787" />
				</uni-forms-item>
			</view> -->
			<view class="wares-num form flexd">
				<view class="label">商品数量</view>
				<picker style="flex:1;" @change="bindPickerChange" :value="take_index" :range="takeParts"
					range-key="number">
					<view class="uni-input">{{takeParts[take_index].number?takeParts[take_index].number:'请选择数量'}}
					</view>
				</picker>
			</view>
			<view class="form wx_form" style="padding-bottom: 0;">
				<uni-forms-item labelWidth="80" label="商品估价" name="goodsValuation">
					<uni-easyinput class="input" :inputBorder="false" type="digit" v-model="formdata.goodsValuation"
						placeholder="估价供骑士参考(最高500元)" placeholder-style="color:#878787" />
					<!-- <view class="uni-warning" style="padding-left: 20rpx;">骑士帮购时预先垫付，送货时当面结清</view> -->
				</uni-forms-item>
			</view>

			<view class="form" style="padding-top: 0;">
				<view class="item">
					<textarea class="textarea" :maxlength="20" v-model="formdata.leaveMessage"
						placeholder-style="color:#878787" placeholder="请给接单者留言(最多20字)" />
				</view>
			</view>
			<view class="form" style="padding-top: 0;">
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
			<view class="foot flexd jubetween flex-center">
				<view>
					<view class="cost">
						跑腿费 <text> {{formdata.commission==''?0:formdata.commission}}元</text>
					</view>
					<view class="uni-warning">
						此费用不含商品费用
					</view>
				</view>
				<button class="btn" @click="submit">
					<text>下单</text>
				</button>
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
				htosp: 0,
				form_rules: {},
				imageValue: [],
				isAddress: false,
				addIndex: 'buyAdd',
				rules: {},
				buyAdd: {},
				sentAdd: {},
				formdata: {
					categoryId: 3,
					publisherName: '',
					goodsValuation: '',
					appointShop: 0,
					publisherSex: 0,
					goodsName: '',
					leaveMessage: '',
					commission: '',
					publisherPhone: ''
				},
				disable: false,
				// 取件数量
				takeParts: [{
					"commission": 0,
					"id": 0,
					"number": ''
				}],
				take_index: 0,
			}
		},
		mounted() {
			this.form_rules = this.globalData.rules;
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');

			let that = this
			// 取件数量列表
			this.util.ajax('release/buyGoodsNumberList', {}, res => {
				that.takeParts = that.takeParts.concat(res.data.list)
			})
		},
		methods: {
			refresh() {
				this.formdata = {
					categoryId: 3,
					publisherName: '',
					goodsValuation: '',
					appointShop: 0,
					publisherSex: 0,
					goodsName: '',
					leaveMessage: '',
					commission: '',
					publisherPhone: ''
				}

			},
			cancel() {
				this.isAddress = false
			},
			bindDateChange: function(e) {
				this.date = e.target.value
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
				that.formdata.commission = that.takeParts[e.target.value].commission
			},
			submit() {
				if (this.disable) return
				this.disable = true;
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
				let that = this
				this.$refs.form.validate().then(res => {
					// uni.showModal({
					// 	title: '下单须知',
					// 	content: '如遇订单问题请及时在我的订单中申请售后，订单完成默认无售后',
					// 	confirmText: '发布',
					// 	success: function (e) {
					// 		if (e.confirm) {
					uni.showLoading({
						title: ''
					})
					let obj = res
					obj.publisherName = that.sentAdd.name
					obj.publisherPhone = that.sentAdd.phone
					obj.categoryId = that.formdata.categoryId
					obj.publisherSex = that.formdata.publisherSex
					obj.appointShop = that.formdata.appointShop
					obj.leaveMessage = that.formdata.leaveMessage
					obj.numberId = that.takeParts[that.take_index].id
					obj.images = that.imageValue.join()
					obj.addressId = that.buyAdd.id
					obj.addressId2 = that.sentAdd.id
					obj.commission = that.formdata.commission
					obj.userId = that.userId
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
					// } else if (e.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// })
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

				.text {
					color: #808080;
					padding-left: 20rpx;
					width: 490rpx;
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

		.wx_form,
		.wx_form_goodsName {
			padding: 0 40rpx;
		}
		.wx_form_goodsName{
			padding-left: 20rpx;
		}

		.out {
			display: flex;
			flex-wrap: wrap;

			.peop {
				width: 140rpx;
				height: 140rpx;
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

	.gender {
		.uni-list-cell:nth-child(1) {
			padding-right: 20rpx;
		}
	}

	.wares-num {
		height: 36px;
		line-height: 36px;
		padding: 0 40rpx;

		.label {
			width: 160rpx;
		}

		picker {
			.uni-input {
				font-weight: 300;
				color: rgb(135, 135, 135);
				padding-left: 20rpx;
			}
		}
	}
</style>
