<template>
	<view class="content">
		<view class="energy" :style="{marginTop:70+'rpx'}">
			<view class="address" @click="addPicker=true">
				<view class="" v-if="!isAdd">
					请选择地址
				</view>
				<view class="flexd nicname" v-if="isAdd">
					<view class="name">{{address.name}}</view>
					<view class="shengray">{{address.phone}}</view>
				</view>
				<view class="addre flexd jubetween" v-if="isAdd">
					<view class="flexd flex-center">
						<view class="moren">地址</view>
						<view class="dress">{{address.address_abbreviation}}{{''}}{{address.address_detail}}</view>
					</view>
					<image src="/static/image/icon_jfmx.png" mode=""></image>
				</view>
			</view>
			<view class="list">
				<view class="lists" v-for="(item,index) in orderMenus" :key="index">
					<view class="detail flexd">
						<view class="ima">
							<image :src="Img(item.pro_image)" mode="aspectFill"></image>
						</view>
						<view class="tiaa">
							<view class="flexd jubetween">
								<view class="title">
									{{item.pro_name}}
								</view>
								<view>x{{item.count}}</view>
							</view>
							<view class="shengray texright">
								共{{item.count}}件商品，合计
								<text
									class="reda">{{proType==0?'￥':'积分'}}{{(item.count*item.pro_price).toFixed(2)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="lists flexd jubetween">
					<view>优惠券</view>
					<view class="reda">
						<text v-if="preferentialPrice">-￥</text>
						<text v-if="preferentialPrice">{{preferentialPrice}}</text>
						<text v-else class="fontColor-999">暂无</text>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="lists">
					<textarea class="textarea" :auto-height="true" v-model="remarks"
						placeholder-style="color:#878787;font-size: 28rpx" placeholder="请输入备注" />
				</view>
			</view>
			<view class="list">
				<view class="lists flexd jubetween flex-center">
					<view class="flexd flex-center">
						<image class="icon32" :src="imageurl+'static/image/weixin.png'" mode=""></image>
						<view>微信支付</view>
					</view>
					<radio :checked="true" />
				</view>
			</view>
		</view>
		<!-- 底部操作菜单 -->
		<view class="page-bottom flexd jubetween">
			<view class="heji flexd">
				<view class="gray">共{{totalCount}}件，</view>
				<view>合计 </view>
				<view class="reda" v-if="proType==0">
					<text class="font22">￥</text>
					<text>{{Math.floor(actualPrice)}}</text>
					<text class="font22">.{{(actualPrice).toFixed(2).split('.')[1]}}</text>
				</view>
				<view class="reda" v-if="proType==1"> {{actualPrice}}</view>
			</view>
			<view class="takea texcenter landi" @click="$shake(tijao)">提交订单</view>
		</view>
		<change-addresss ref="address" v-show='addPicker' @cancel="addPicker=false" @comfit="changeAdd">
		</change-addresss>
	</view>
</template>

<script>
	import changeAddresss from '@/components/changeAddresss.vue'
	export default {
		components: {
			changeAddresss
		},
		data() {
			return {
				htosp: 0,
				orderMenus: [],
				orderType: 0, //0 商品详情立即购买， 1 购物车购买
				addressList: [],
				address: {},
				speId: 0,
				ids: '',
				proType: 0,
				addPicker: false,
				preferentialPrice: '',
				isAdd: false,
				totalCount: 0,
				totalPrice: 0,
				actualPrice: 0,
				remarks: '',
				shopId: 0,
				imageurl: '',
				// 防抖
				onoff: true
			}
		},
		onLoad(option) {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.imageurl = this.globalData.imageurl
			this.ids = option.id
			if (option.index) {
				let obj = JSON.parse(option.index)
				let that = this
				this.util.ajax('order/buyNow', obj, res => {
					that.actualPrice = res.data.actualPrice
					that.address = res.data.address
					that.isAdd = res.data.address.name || false
					that.preferentialPrice = res.data.preferentialPrice
					that.orderMenus = res.data.productList
					that.shopId = res.data.shopId
					that.totalCount = res.data.totalCount
					that.totalPrice = res.data.totalPrice
				})
			}
		},
		onShow() {
			if (this.$refs.address) {
				// this.$refs.address.refresh()
			}
		},
		methods: {
			tijao() {
				if (!this.isAdd) {
					this.$alert('请输入地址')
					return
				}
				let that = this
				this.util.ajax('order/buyNowConfirmOrder', {
					"addressId": this.address.id,
					"productList": this.orderMenus.map(e => {
						return {
							count: e.count,
							proId: e.proId
						}
					}),
					"remarks": this.remarks,
					"shopId": this.shopId,
					"userId": this.userId
				}, res => {
					// #ifdef APP-PLUS
					let paymentType = 3
					// #endif
					// #ifdef MP-WEIXIN
					let paymentType = 4
					// #endif
					that.util.ajax('pay/toPay', {
						"orderId": res.data.orderId,
						"orderNum": res.data.orderNum,
						"payType": 1,
						"paymentType": paymentType,
						"purpose": 1,
						"subject": "商品订单",
						"userId": that.userId
					}, resx => {
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
							success(resx) {
								that.$alert('支付成功')
								setTimeout(function() {
									that.$jumpLa('/pages/user/myOrder/myOrder?type=2')
								}, 1000);
							},
							fail(e) {
								that.remark = e
								that.$alert('支付失败')
							}
						})
					})

				})
			},
			countPic(item, count) {
				if (this.orderType == 1) {
					let that = this
					this.util.ajax('shoppingCar/updateShoppingCarCount', {
						"count": count,
						"shoppingCarId": item.shopping_car_id,
						"userId": that.userId
					}, function(res) {
						item.count = count
					})
				} else {
					item.count = count
				}
			},
			order() {
				let that = this
				if (this.orderType == 1) {
					this.util.ajax('shoppingCar/updateShoppingCarCount', {
						"count": count,
						"shoppingCarId": item.shoppingCarId,
						"userId": that.userId
					}, function(res) {
						item.count = count
					})
				} else {
					item.count = count
				}
			},
			changeAdd(e) {
				this.address = e
				this.isAdd = true
				this.addPicker = false
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: #F3F3F5;
	}

	.textarea {
		height: 200rpx;
	}

	.content {
		padding-bottom: 150rpx;

		.titlaa {
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			margin-left: 13rpx;
		}

		.energy {
			.address {
				background: #FFF;
				padding: 37rpx 30rpx;

				.nicname {
					.name {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						margin-right: 11rpx;
					}

					.shengray {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						margin-top: auto;
					}
				}

				.addre {
					margin-top: 27rpx;

					.moren {
						height: 32rpx;
						line-height: 32rpx;
						border: 1rpx solid #FF403C;
						border-radius: 4rpx;
						padding: 0 10rpx;
						color: #FF403C;
					}

					.dress {
						width: 550rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						margin-left: 22rpx;
					}

					image {
						width: 32rpx;
						height: 32rpx;
						margin-top: 5rpx;
					}
				}
			}

			.list {
				width: 100%;

				.lists {
					background: #FFF;
					box-shadow: 0px 4rpx 14rpx 0px rgba(212, 239, 255, 0.47);
					border-radius: 8rpx;
					margin-top: 20rpx;
					padding: 38rpx 33rpx;

					.icon {
						width: 40rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}

					.detail {
						.ima {
							margin-right: 22rpx;

							image {
								width: 120rpx;
								height: 120rpx;
							}
						}

						.pro_count {
							width: 50rpx;
							text-align: center;
							font-size: 28rpx;
						}

						.tiaa {
							width: 100%;

							.title {
								/* width: 450rpx; */
								font-size: 28rpx;
								font-family: Microsoft YaHei;
								font-weight: 400;
								margin-bottom: 20rpx;
								padding-right: 60rpx;
							}

							.reda {
								font-size: 36rpx;
							}

							.nuber {
								image {
									width: 38rpx;
									height: 38rpx;
								}

								view {
									margin: 0 20rpx;
								}
							}

							.shengray {
								margin-top: 54rpx;
							}
						}
					}
				}
			}
		}

		/* 底部操作菜单 */
		.page-bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 99;
			width: 100%;
			height: 120rpx;
			background: #FFFFFF;
			box-shadow: 0rpx -5rpx 20rpx 0rpx rgba(214, 214, 214, 0.4);

			.heji {
				margin: auto 30rpx;

				view {
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					margin: auto 0;
				}

				.gray {
					font-size: 24rpx;
				}

				.reda {
					font-size: 44rpx;
				}
			}

			.takea {
				border: 1rpx solid $uni-color-primary;
				border-radius: 10rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 72rpx;
				margin: auto 30rpx;
				padding: 0 40rpx;
			}

			.landi {
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 10rpx;
				background: $uni-color-primary;
			}
		}
	}
</style>
