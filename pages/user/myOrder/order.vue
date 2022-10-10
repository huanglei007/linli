<template>
	<view>
		<!-- 我的订单 客户订单 -->
		<view class="typeBox flexd jubetween" style="background-color: #fff;">
			<view class="item" v-for="(item,i) in typeList" :key="i" @click="typeIndex=i;getNewList()"
				:class="typeIndex==i?'active':''">
				{{item}}
			</view>
		</view>
		<!-- 订单状态 -->
		<view class="statusBox flexd jubetween">
			<view class="item" v-for="(item,i) in status" :key="i" @click="statusIndex=i;getNewList()"
				v-if="typeIndex==0||typeIndex==1&&status[i].label!='配送中'" :class="statusIndex==i?'status_active':''">
				{{item.label}}
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="list">
			<view v-if="!list[0]" class="fontColor-ccc texcenter" style="padding-top: 200rpx;">
				<text>暂无订单信息</text>
			</view>
			<view class="item" v-for="(item,i) in list" :key="i"
				@click="$jump('/pages/user/orderDetail?type='+typeIndex+'&id='+item.order_id)">
				<view class="top flexd flex-center jubetween">
					<view class="flexd jubetween mb-10">
						<view class="gray">订单编号：</view>
						<view class="cont fontColor-999">{{item.order_num}}</view>
					</view>
					<view class="flexd jubetween mb-10">
						<view class="cont" :class="{'fontBold':item.order_status != 3}">
							<text v-if="item.order_status == 1" class="fontColor-FF6000">代付款</text>
							<text v-else-if="item.order_status == 2" class="fontColor-FF6000">待配送</text>
							<text v-else-if="item.order_status == 3" class="fontColor-FF6000">配送中</text>
							<text v-else-if="item.order_status == 4||item.order_status == 6"
								class="fontColor-FF6000">已完成</text>
							<text v-else-if="item.order_status == 5" class="fontColor-FF6000">已取消</text>
						</view>
					</view>
				</view>
				<view class="mess">
					<view class="mess-box flexd jubetween flex-center">
						<view class="box-left flexd">
							<view class="left-img" v-if="typeIndex==0">
								<image src="/static/image/icon_mr.png" mode="widthFix"></image>
							</view>
							<view class="left-name">
								<view class="name">
									<text class="font32">{{item.contact_name}}</text>
								</view>
								<view class="time">
									<text class="fontColor-999 font24">{{$shijian(item.createtime)}}</text>
								</view>
							</view>
						</view>
						<view class="box-right flexd jubetween mb-10">
							<view class="cont">
								<text class="font32">￥</text>
								<text class="font42">{{item.order_price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				// 商品订单类别
				typeList: ['我的订单', '客户订单'],
				typeIndex: 0,
				// 订单列表
				list: [],
				curPage: 1,
				isfoot: false,
				// 订单状态列表
				status: [{
					id: 0,
					label: '全部',
				}, {
					id: 2,
					label: '待配送',
				}, {
					id: 3,
					label: '配送中',
				}, {
					id: 4,
					label: '已完成',
				}],
				statusIndex: 0
			}
		},
		mounted(e) {
			this.userId = uni.getStorageSync('userId')
			this.getlist()
		},
		onReachBottom() {
			if (!this.isfoot) {
				this.curPage++
				this.getlist()
			}
		},
		methods: {
			getlist() {
				let that = this
				this.util.ajax('order/myOrders', {
					"curPage": this.curPage,
					"orderType": this.typeIndex,
					"pageSize": 20,
					"userId": this.userId
				}, (res) => {
					if (that.curPage !== res.data.page.curPage) {
						that.isfoot = true
						that.list = that.list.concat(res.data.orders)
					} else {
						if (that.status[that.statusIndex].id == 0) {
							that.list = res.data.orders
						} else {
							let arr = []
							for (let i = 0; i < res.data.orders.length; i++) {
								if (res.data.orders[i].order_status == that.status[that.statusIndex].id) {
									arr.push(res.data.orders[i])
								}
							}
							setTimeout(() => {
								this.list = arr
							}, 500)
						}
					}
				})
			},
			getNewList() {
				let that = this
				that.list = []
				that.curPage = 1
				that.getlist()
			}
		}
	}
</script>

<style lang="scss">
	.typeBox {
		padding: 0 150rpx;
		padding-bottom: 30rpx;

		.item {
			line-height: 2.3;
			padding: 0 40rpx;
			border-radius: 50rpx;
			background-color: #fff;
			color: #959595;
			font-size: 28rpx;

			&.active {
				color: #FF8D1E;
				// background-color: $uni-color-primary;
			}
		}
	}

	.statusBox {
		margin: 30rpx 50rpx;

		.item {
			width: 100rpx;
			text-align: center;
			padding: 10rpx 20rpx;
			background-color: #fff;
			border-radius: 50rpx;
			font-size: 28rpx;
			color: #959595;

			&.status_active {
				color: #212121;
				background-color: #FFD200;
			}
		}

	}

	.list {
		.item {
			background-color: #fff;
			margin-bottom: 20rpx;

			.top {
				margin: 0 40rpx;
				padding: 20rpx 0 15rpx 0;
				border-bottom: 1rpx solid #eee;

				.gray {
					color: #999999;
					width: 140rpx;
				}
			}

			.mess {
				padding: 20rpx 40rpx;

				.gray {
					color: #999999;
					width: 120rpx;
				}

				.cont {
					max-width: 520rpx;
				}

				.mess-box {
					.left-img {
						width: 130rpx;
						height: 130rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.left-name {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
					}
				}
			}
		}
	}

	.fontBold {
		font-weight: bold;
	}
</style>
