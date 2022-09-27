<template>
	<view class="evaluate">
		<view class="evaluate-news">
			<view class="news-box flexd">
				<view class="img-box">
					<image :src="form.shop_logo?form.shop_logo:'/static/HM-chat/img_ps.png'" mode=""></image>
				</view>
				<view class="name-box flexd">
					<view class="name">
						<text class="font36">{{form.shop_name}}</text>
					</view>
					<view class="star flexd flex-center">
						<text class="font22" style="margin-right: 10rpx;">店铺评价</text>
						<uni-rate v-model="rateValue" @change="onChange" />
					</view>
				</view>
			</view>
			<view class="content-box">
				<text class="font22 fontColor-ccc">{{content.length}}/100</text>
				<textarea style="padding:10rpx;background-color: #F8F8F8;" v-model="content" :maxlength="100"
					placeholder-style="color:#CCCCCC" placeholder="说说店铺的优点吧，您的鼓励特别重要" />
			</view>
		</view>
		<!-- 提交退款 -->
		<view class="sub">
			<view class="sub-btn" @click="evaluateEvent">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				// 订单ID
				orderId: 0,
				// 评价内容
				content: '',
				// 打分
				rateValue: 0,
				// 订单信息
				form: {}
			}
		},
		onLoad(e) {
			this.userId = uni.getStorageSync('userId')
			this.orderId = e.id
			this.loadmore()
		},
		methods: {
			// 获取订单详情
			loadmore() {
				let that = this
				this.util.ajax('order/myOrdersDetails', {
					orderId: this.orderId
				}, res => {
					that.form = res.data.shop
				})
			},
			// 评价订单
			evaluateEvent() {
				let that = this
				if (that.rateValue == 0 || that.content == '') {
					that.$alert('请先评价再提交')
				} else {
					that.util.ajax('order/evaluateOrder', {
						"content": that.content,
						"orderId": that.orderId,
						"score": that.rateValue,
						"userId": that.userId
					}, res => {
					that.$alert('已评价')
					setTimeout(() => {
						that.$jump('/pages/user/myOrder/myOrder?type=2')
					}, 1000)
					})
				}
			},
			// 监听评分
			onChange(e) {
				console.log('评分发生改变:' + JSON.stringify(e))
			}
		}
	}
</script>

<style lang="less">
	.evaluate {
		padding: 30rpx;

		.evaluate-news {
			padding: 41rpx;
			border-radius: 20rpx;
			background-color: #fff;
			margin-bottom: 50rpx;

			.news-box {
				margin-bottom: 40rpx;

				.img-box {
					width: 130rpx;
					height: 130rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.name-box {
					flex-direction: column;
					justify-content: space-around;
					padding-left: 20rpx;

					.name {
						text {
							font-weight: bold;
						}
					}
				}
			}

			.content-box {
				position: relative;

				.font22 {
					position: absolute;
					bottom: 0;
					right: 0;
					z-index: 1;
				}
			}
		}
	}

	.sub {
		line-height: 91rpx;
		text-align: center;

		.sub-btn {
			margin: 18rpx 100rpx;
			background: #FAD134;
			border-radius: 100rpx;
		}
	}
</style>
