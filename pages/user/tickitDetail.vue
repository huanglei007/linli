<template>
	<view class="wtbox">
		<view class="bg">
			<view class="top">
				<image class="code" src="/static/image/img_sfz_z.png" mode=""></image>
				<!-- <view class="btn">
					去使用
				</view> -->
			</view>
			<view class="bottom">
				<view class="flexd jubetween">
					<image class="img" :src="Img(message.shop_logo)" mode="widthFix"></image>
					<view class="mess">
						<view class="title">
							{{message.shop_name}}
						</view>
						<view class="star flexd flex-center">
							<uni-rate v-model="message.score" />
							<!-- <image v-for="n in 5" :key="n" :src="n<message.score?imageurl+'/static/image/icon_xx.png':imageurl+'/static/image/icon_wxzxx.png'" mode=""></image> -->
							<view class="gray">{{message.score}}.0</view>
						</view>
						<view class="phone gray">
							电话：{{message.phone}}
						</view>
						<view class="flexd">
							<view class="add flexd">
								<image src="/static/image/icon_dw.png" mode="widthFix"></image>
								<view class="gray font22">{{message.address}}</view>
							</view>
							<view class="reda font22">{{parseInt(message.distance)}}km</view>
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
				imageurl: '',
				id: 0,
				userId: '',
				message: {
					"address": "",
					"distance": "",
					"id": 0,
					"phone": "",
					"score": 0,
					"shop_logo": "",
					"shop_name": ""
				},
			}
		},
		onLoad(e) {
			this.imageurl = this.globalData.imageurl
			this.userId = uni.getStorageSync('userId')
			this.id = e.id
			this.refresh()
		},
		methods: {
			refresh() {
				let that = this
				that.util.ajax('userWelfare/voucherDetail', {
					"id": this.id,
					"userId": this.userId
				}, res => {
					console.log(res.data)
					that.message = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #ffac46;
	}

	.wtbox {
		padding: 30rpx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.bg {
			width: 100%;
			height: 100%;
			background-color: #fff;
			border-radius: 30rpx;
			position: relative;
			padding: 100rpx 30rpx;
			box-sizing: border-box;

			&::before {
				content: '';
				width: 40rpx;
				height: 40rpx;
				display: block;
				border-radius: 50%;
				background-color: #ffac46;
				position: absolute;
				left: -22rpx;
				top: 50%;
				transform: translateY(-50%);
			}

			&::after {
				content: '';
				width: 40rpx;
				height: 40rpx;
				display: block;
				border-radius: 50%;
				background-color: #ffac46;
				position: absolute;
				right: -22rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.top {
			border-bottom: 1rpx solid #DCDCDC;
			text-align: center;

			.code {
				width: 280rpx;
				height: 280rpx;
			}

			.btn {
				margin: 68rpx auto;
				line-height: 2.5;
				width: 230rpx;
				border-radius: 40rpx;
				background-color: $uni-color-primary;
				font-size: 28rpx;
			}
		}

		.bottom {
			margin-top: 100rpx;

			.img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 30rpx;
			}

			.mess {
				width: 450rpx;

				.title {
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}
			}

			.add {
				padding-right: 10rpx;
				image {
					width: 24rpx;
					margin-right: 6rpx;
					margin-top: 6rpx;
				}
			}

			.phone {
				margin-bottom: 10rpx;
			}

			.star {
				margin-bottom: 10rpx;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 6rpx;
				}
			}
		}
	}
</style>
