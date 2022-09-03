<template>
	<view v-if="form.order" class="content">
		<!-- 配送状态 -->
		<view class="flexd jubetween flex-center">
			<view class="status-box">
				<image v-if="statusIndex==2" src="/static/image/icon_dps.png" mode=""></image>
				<image v-else-if="statusIndex==3" src="/static/image/icon_psz.png" mode=""></image>
				<image v-else-if="statusIndex==4||statusIndex==6" src="/static/image/icon_ywc.png" mode=""></image>
				<image v-else-if="statusIndex==5" src="/static/image/icon_qx.png" mode=""></image>
				<text class="font36">{{status[statusIndex].label}}</text>
			</view>
			<view class="font24 fontColor-666" v-if="type == 1">
				<text>下单时间：</text>
				<uni-dateformat :date="form.order.createtime" format='yyyy-MM-dd hh:mm'></uni-dateformat>
			</view>
		</view>
		<!-- 下单用户信息 -->
		<view class="customer-box" v-if="type == 1">
			<view class="news-box font36">
				<text class="name">{{form.address.name}}</text>
				<text class="phone" @click="phone(form.address.phone)">{{form.address.phone}}</text>
				<image class="icon32" src="/static/image/icon_dh.png" mode=""></image>
			</view>
			<view class="address-box flexd jubetween">
				<text class="font30 fontColor-666">{{form.address.address}}</text>
				<view class="location-box">
					<image class="icon22" src="/static/image/icon_dw.png" mode=""></image>
					<text class="font22 fontColor-999">1.9Km</text>
				</view>
			</view>
			<view class="text-box font36">
				<text>备注：</text>
				<text>{{form.order.remarks}}</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="detail-box">
			<!-- 编号 -->
			<view class="box-num flexd jubetween">
				<text v-if="type==1" class="font30 fontColor-666">商品</text>
				<view class="font24 fontColor-999">
					<text>订单编号：</text>
					<text>{{form.order.order_num}}</text>
				</view>
			</view>

			<!-- 商品 -->
			<view class="box-news">
				<view class="news-product">
					<!-- 购买的商品 -->
					<view class="products flexd jubetween" v-for="(item,index) in form.orderDetails" :key="index">
						<view class="news flexd">
							<view class="products-img">
								<image :src="item.pro_image?item.pro_image:'/static/image/icon_tj.png'" mode=""></image>
							</view>
							<view class="products-name">
								<text class="font28 fontColor-666">{{item.pro_name}}</text>
								<text class="font22 fontColor-999">x{{item.buy_count}}</text>
							</view>
						</view>
						<view class="products-price">
							<text class="font28">
								<text class="font18">¥</text>
								<text>{{item.buy_price}}</text>
							</text>
						</view>
					</view>

					<!-- 店铺满减 -->
					<view class="reduce-box flexd jubetween flex-center">
						<view class="font26">
							<text class="_jian">减</text>
							<text>店铺满减</text>
						</view>
						<view class="reduceNum">
							<text class="font28">
								<text class="font18">¥</text>
								<text>{{form.order.preferential_price}}</text>
							</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 总价 -->
			<view class="price-box">
				<!-- 优惠 -->
				<view class="discount">
					<view class="already" v-if="type == 0">
						<text class="font24">已优惠</text>
						<text class="num font18 fontColor-FF6000">
							¥
							<text class="font30">{{form.order.preferential_price}}</text>
						</text>
					</view>
					<view class="total" :class="{'total_between':type==1}">
						<text class="font24">合计</text>
						<text class="num font18">
							¥
							<text class="font30">{{form.order.pro_price}}</text>
						</text>
					</view>
				</view>
				<!-- 待配送 -->
				<view class="handel font32" v-if="statusIndex==2||statusIndex==3">
					<text @click="cancelEvent">取消订单</text>
					<text v-if="type == 1 && statusIndex == 2" @click="startEvent">开始配送</text>
					<text v-else-if="type == 1 && statusIndex == 3" @click="confirmEvent">确认送达</text>
					<text v-else @click="handelEvent('提醒配送')">提醒配送</text>
				</view>
				<!-- 已完成 -->
				<view class="handel font32"
					v-if="statusIndex==4&&type==0||statusIndex==6&&type==0||statusIndex==5&&type==0">
					<text @click="deleteEvent">删除订单</text>
					<text v-if="statusIndex==4" @click="handelEvent('评论')"
						style="border:none;background: linear-gradient(180deg, #F9D448 0%, #FFCA00 100%, #D8D8D8 100%);">评论</text>
				</view>
			</view>
		</view>
		<!-- 下单时间 备注 -->
		<view v-if="type==0" class="time_remarks">
			<view class="time font24 fontColor-666">
				<text>下单时间：</text>
				<uni-dateformat :date="form.order.createtime" format='yyyy-MM-dd hh:mm'></uni-dateformat>
			</view>
			<view class="remarks font24 fontColor-666" v-if="statusIndex!=5">
				<text>备注：</text>
				<text>{{form.order.remarks}}</text>
			</view>
			<view class="remarks font24 fontColor-666" v-else>
				<text>退款原因：</text>
				<text>不想要了/临时有事</text>
			</view>
		</view>
		<!-- 已取消 -->
		<view class="time_remarks" style="padding: 24rpx;" v-if="statusIndex==5">
			<text class="font28">退款明细</text>
			<view style="padding: 10rpx 25rpx;">
				<view class="font24 fontColor-666">
					<text>实付金额 </text>
					<text style="padding-left: 41rpx;"> ¥ {{''}}{{form.order.pro_price}}</text>
				</view>
				<view class="font24 fontColor-666">
					<text>退回方式</text>
					<text style="padding-left: 41rpx;">原路返回</text>
				</view>
			</view>
		</view>
		<!-- 联系商家 -->
		<view v-if="type==0" class="contact font28 flexd flex-center" @click="phone(form.shop.contact_phone)">
			<image class="icon32" src="/static/image/icon_dh.png" mode=""></image>
			<text>联系商家</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				// 订单类别
				type: 1,
				// 订单id
				orderId: 0,
				// 订单详情
				form: {},
				// 订单状态列表
				status: [{
					id: 0,
					label: '0',
				}, {
					id: 1,
					label: '代付款',
				}, {
					id: 2,
					label: '待配送',
				}, {
					id: 3,
					label: '配送中',
				}, {
					id: 4,
					label: '已完成',
				}, {
					id: 5,
					label: '已取消',
				}, {
					id: 6,
					label: '已评价',
				}],
				statusIndex: 0,
				// 开始配送 or 确认送达
				delivery: '开始配送'
			}
		},
		onLoad(e) {
			this.userId = uni.getStorageSync('userId')
			this.orderId = e.id
			this.type = e.type
			this.loadmore()
		},
		methods: {
			loadmore() {
				let that = this
				this.util.ajax('order/myOrdersDetails', {
					orderId: this.orderId
				}, res => {
					that.form = res.data
					this.statusEvent()
				})
			},
			copy(e) {
				uni.setClipboardData({
					data: e, //要被复制的内容
				});
			},
			upStatu(e) {
				let that = this
				this.util.ajax('order/updateOrderStatus', {
					orderId: this.orderId,
					"type": e
				}, res => {
					that.$alert('订单已更新')
					that.loadmore()
				})
			},
			// 订单状态
			statusEvent() {
				let that = this
				for (let i = 0; i < that.status.length; i++) {
					if (that.status[i].id == that.form.order.order_status) {
						that.statusIndex = i
					}
				}
			},
			// 拨打电话
			phone(e) {
				uni.makePhoneCall({
					phoneNumber: e //仅为示例
				});
			},
			// 开始配送
			startEvent() {
				let that = this
				uni.showModal({
					title: '',
					content: '开始配送',
					success: function(res) {
						if (res.confirm) {
							that.util.ajax('order/deliveryOrder', {
								'orderId': that.orderId,
								"userId": that.userId
							}, res => {
								that.$alert('开始配送')
								setTimeout(() => {
									that.delivery = '确认送达'
								}, 500)
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 确认送达
			confirmEvent() {
				let that = this
				uni.showModal({
					title: '',
					content: '确认送达',
					success: function(res) {
						if (res.confirm) {
							that.util.ajax('order/completeOrder', {
								'orderId': that.orderId,
								"userId": that.userId
							}, res => {
								that.$alert('已送达')
								setTimeout(() => {
									that.loadmore()
								}, 500)
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 取消订单
			cancelEvent() {
				let that = this
				let url = '/pagesA/a_orderDetail_cancel?type='
				uni.showModal({
					title: '',
					content: '确认取消订单?',
					success: function(e) {
						if (e.confirm) {
							that.$jump(url + that.type + '&id=' + that.orderId + '&price=' + that.form.order.pro_price)
						} else if (e.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 删除订单
			deleteEvent() {
				let that = this
				uni.showModal({
					title: '',
					content: '确认删除订单?',
					success: function(e) {
						if (e.confirm) {
							that.util.ajax('order/deleteOrder', {
								'orderId': that.orderId,
								"userId": that.userId
							}, res => {
								that.$alert('订单已删除')
								setTimeout(() => {
									that.$jump('/pages/user/myOrder/myOrder?type=2')
								}, 500)
							})
						} else if (e.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//提醒配送 评论
			handelEvent(val) {
				let that = this
				if (val == '评论') {
					let url = '/pagesA/a_orderDetail_evaluate?id='
					that.$jump(url + that.orderId)
				} else if (val == '提醒配送') {
					that.$alert('已提醒配送')
				}
			}
		}
	}
</script>

<style lang="scss">
	// 2022-8-22
	.content{
		padding: 0 25rpx 100rpx 25rpx;
	}
	//
	// 2022-7-28
	// 
	.status-box {
		padding: 35rpx 0;
		display: flex;
		align-items: center;

		image {
			width: 36rpx;
			height: 36rpx;
		}

		.font36 {
			margin-left: 10rpx;
		}
	}

	.customer-box {
		padding: 25rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 30rpx;

		.news-box {

			.name,
			.phone {
				font-weight: 400;
			}

			.phone {
				margin: 0 25rpx;
			}
		}

		.address-box {
			padding: 20rpx 0;
			flex-wrap: wrap;

			.font30 {
				flex: 1;
			}

			.location-box {
				margin-left: 20rpx;
			}
		}

		.text-box {
			font-weight: 400;

			text:nth-child(2) {
				color: #F60000;
			}
		}
	}

	.detail-box {
		background-color: #fff;
		border-radius: 20rpx;

		.box-num {
			padding: 25rpx;
			border-bottom: 1px solid #E5E5E5;
		}

		.box-news {
			padding: 30rpx;

			.news-product {
				padding-right: 22rpx;

				.products {
					padding-bottom: 30rpx;

					.news {
						.products-img {
							width: 130rpx;
							height: 130rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.products-name {
							padding-left: 20rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
						}
					}
				}

				.reduce-box {
					padding: 50rpx 0 30rpx 0;
					padding-left: 20rpx;

					._jian {
						padding: 8rpx 12rpx;
						border-radius: 5rpx;
						background-color: #ED5637;
						color: #fff;
						margin-right: 15rpx;
					}
				}
			}
		}
	}

	.price-box {
		padding: 41rpx;
		border-top: 1px solid #E5E5E5;
		text-align: right;

		.discount {
			padding-right: 22rpx;

			.already,
			.total {
				display: inline;
			}

			.already {
				.num {
					margin: 0 30rpx 0 10rpx;
				}
			}

			.total {
				.num {
					margin-left: 10rpx;
				}
			}

			.total_between {
				display: flex;
				justify-content: space-between;
			}
		}

		.handel {
			display: flex;
			padding: 60rpx 0 15rpx 0;
			justify-content: flex-end;

			text {
				width: 172rpx;
				padding: 8rpx 0;
				border-radius: 30rpx;
				border: 1px solid #CCCCCC;
				text-align: center;
				margin-right: 15rpx;
			}
		}
	}

	.time_remarks {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 12rpx 24rpx;
		margin-top: 30rpx;

		.time,
		.remarks {
			padding: 12rpx 0;
		}
	}

	.contact {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 24rpx;
		margin-top: 30rpx;
		justify-content: center;

		image {
			margin-right: 10rpx;
		}
	}
</style>
