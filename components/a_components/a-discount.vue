<template>
	<view class="baojie-yuyue-disc">
		<view class="baojie-yuyue-disc-title">
			<text class="font30">
				领取优惠券
			</text>
		</view>
		<view class="baojie-yuyue-disc-select" style="flex: 1;text-align: right;" @click="selectEvent">
			<text v-if="discount_ok.length<1&&disNum==0" class="font28 fontColor-ccc">暂无</text>
			<text v-else-if="discount_ok.length>0&&disNum==0" class="font28 fontColor-FF6000">可使用</text>
			<text v-else class="font28 fontColor-FF6000">-{{disNum}}</text>
			<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
		</view>

		<uni-popup ref="popup" background-color="#f5f5f5" style="max-height:686rpx;overflow-y:auto;">
			<view class="pop-box">
				<view class="head-handel flexd flex-center jubetween">
					<text class="font32" style="color: #8f939c;" @click="cancel">取消</text>
					<text class="font32" style="color: #2979ff;" @click="confirm">确定</text>
				</view>
				<radio-group>
					<label class="flexd flex-center jubetween" v-for="(item,index) in discount_ok" :key="index"
						@click="listClickEvent(index)" style="margin-top: 30rpx;">
						<view class="list flexd flex-center">
							<view class="list-left">
								<text>￥</text>
								<text style="font-size:60rpx;">{{item.amount}}</text>
							</view>
							<view class="list-right">
								<view class="title">
									<text class="font36">{{item.coupon_name}}</text>
								</view>
								<view class="time">
									<uni-dateformat class="font24 fontColor-999" :date="item.expiration_time"
										format="yyyy/MM/dd"></uni-dateformat>
									<text class="font24 fontColor-999">到期</text>
								</view>
							</view>
						</view>
						<view>
							<radio :value="item.coupon_name" :checked="index === current" />
						</view>
					</label>
				</radio-group>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: ['type', 'price'],
		data() {
			return {
				// 优惠券类别
				title: '',
				// 优惠券
				discount: [{
					"amount": 0, //金额
					"min_order_amount": 0, //使用金额
					"begin_time": "", //有效期开始时间
					"coupon_name": "", //优惠券名称
					"expiration_time": "", //有效期结束时间
					"id": 0 //编号
				}],
				// 可用的优惠券
				discount_ok: [],
				// 当前选择
				current: null,
				disNum: 0
			}
		},
		created() {},
		watch: {
			// 监听父组件传过来的服务费筛选可用的优惠券
			price(newVal, oldVal) {
				this.getDiscount(this.type)
			},
		},

		methods: {
			// 获取优惠券
			getDiscount(type) {
				this.util.ajax('personalDemand/xqCouponList', {
					"type": type
				}, res => {
					this.discount = res.data.list
					// 筛选可用优惠券
					this.discountScreen()
				})
			},
			// 筛选可用优惠券
			discountScreen() {
				let that = this
				that.discount_ok = []
				for (let i = 0; i < that.discount.length; i++) {
					if (that.price >= that.discount[i].min_order_amount) {
						that.discount_ok.push(that.discount[i])
					}
				}
			},
			// 打开优惠券弹窗
			selectEvent() {
				if (this.discount_ok.length > 0) {
					this.$refs.popup.open('bottom')
				}
			},
			// 取消
			cancel() {
				this.$refs.popup.close()
			},
			// 确认
			confirm() {
				let that = this
				if (that.current != null) {
					// #ifdef APP-PLUS || MP-WEIXIN
					this.$parent.getSubComponentData('优惠券', that.discount_ok[that.current])
					// #endif
					// #ifdef H5
					this.$parent.$parent.getSubComponentData('优惠券', that.discount_ok[that.current])
					// #endif
					that.disNum = that.discount_ok[that.current].amount
				} else {
					// #ifdef APP-PLUS || MP-WEIXIN
					this.$parent.getSubComponentData('优惠券', {
						id: '',
						amount: 0
					})
					// #endif
					// #ifdef H5
					this.$parent.$parent.getSubComponentData('优惠券', {
						id: '',
						amount: 0
					})
					// #endif
					that.disNum = 0
				}
				this.$refs.popup.close()
			},
			// 点击优惠券
			listClickEvent(index) {
				let that = this
				if (that.current == index) {
					that.current = null
				} else {
					that.current = index
				}
			},
		}
	}
</script>

<style lang="less">
	// 优惠券
	.baojie-yuyue-disc {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.baojie-yuyue-disc-select {
			// flex: 1;
			text-align: right;
			margin-left: 20rpx;
		}
	}

	// 跑腿卷

	.pop-box {
		padding: 30rpx;

		.list {
			flex: 1;
			position: relative;
			line-height: 40rpx;
			margin: 0 15rpx 0 0;
			padding: 20rpx 0;
			// padding: 20rpx 40rpx 20rpx 70rpx;
			background-image: url('/static/img/img_xrfl_list.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			border-radius: 28rpx;

			.list-left {
				width: 35%;
				color: #FF8740;
				text-align: center;
			}

			.list-right {
				width: 60%;
				margin-left: 5%;
			}
		}
	}

	.status {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0 10rpx;
		border-radius: 28rpx 0 28rpx 0;
		background-color: #FF8740;

		text {
			font-size: 24rpx;
			color: #fff;
		}
	}
</style>
