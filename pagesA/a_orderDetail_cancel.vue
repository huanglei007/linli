<template>
	<view class="cancel-box">
		<!-- 退款金额 -->
		<view class="cancel-price font28 flexd jubetween">
			<text>退款金额</text>
			<text class="fontColor-FF6000">¥ {{price}}</text>
		</view>

		<!-- 退款原因 -->
		<view class="reason-box">
			<view class="reason-title">
				<text v-if="type==1" class="font28 fontColor-333">退款原因*</text>
				<text v-else class="font28 fontColor-333">取消原因*</text>
			</view>
			<view class="radio-box">
				<radio-group @change="radioChange">
					<label class="radios flexd jubetween" v-for="(item, index) in reasonlist" :key="index">
						<view>{{item.reason}}</view>
						<view>
							<radio :value="item.reason" :checked="index === current" />
						</view>
					</label>
				</radio-group>
			</view>
		</view>

		<!-- 提交退款 -->
		<view class="sub">
			<view class="sub-btn" @click="$shake(submit)">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 登录用户
				userId: '',
				// 订单类别
				type: 0,
				// 订单ID
				orderId: '',
				// 退款价格
				price: '',
				// 取消原因
				current: 0,
				// 原因列表
				reasonlist: [],
				// 防抖
				onoff:true
			}
		},
		onLoad(e) {
			this.userId = uni.getStorageSync('userId')
			this.orderId = e.id
			this.type = e.type + 1
			this.price = e.price
			// 取消订单原因
			this.cancellist()
		},
		methods: {
			// 取消原因列表
			cancellist() {
				let that = this
				that.util.ajax('order/cancelReasons', {
					"type": 1
				}, res => {
					if (res.data.list[0]) {
						that.reasonlist = res.data.list
					} else {
						return
					}
				})
			},
			// 取消订单
			submit() {
				let that = this
				that.util.ajax('order/cancelOrder', {
					'orderId': that.orderId,
					"reason": that.reasonlist[that.current].label,
					"userId": that.userId
				}, res => {
					that.$alert('已取消订单')
					setTimeout(() => {
						that.$jump('/pages/user/orderDetail?id=' + that.orderId)
					}, 1000)
				})
			},
			// 监听原因选择
			radioChange: function(evt) {
				let that = this
				for (let i = 0; i < that.reasonlist.length; i++) {
					if (that.reasonlist[i].value === evt.detail.value) {
						that.current = i;
						break;
					}
				}
			},
		}
	}
</script>

<style lang="less">
	.cancel-box {
		padding: 0 27rpx;

		.cancel-price {
			margin-top: 34rpx;
			padding: 36rpx 48rpx;
			background-color: #fff;
			border-radius: 20rpx;
		}

		.reason-box {
			margin-top: 34rpx;
			padding: 36rpx 48rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.radio-box {
				padding-top: 30rpx;

				.radios {
					margin-bottom: 30rpx;
				}
			}
		}
	}

	.sub {
		width: 100vw;
		line-height: 91rpx;
		text-align: center;
		background-color: #fff;
		border-top: 1px solid #D4D4D4;
		position: fixed;
		bottom: 0;
		left: 0;
		box-shadow: 0px 6rpx 30rpx #888888;

		.sub-btn {
			margin: 18rpx 100rpx;
			background: #FAD134;
			border-radius: 100rpx;
		}
	}
</style>
