<template>
	<view class="baojie">
		<view class="swiperbox">
			<swiper class="swiper" :circular="true" :indicator-dots="true" :autoplay="true">
				<swiper-item>
					<image :src="imageurl+'static/image/img_baojie.png'" alt=""></image>
				</swiper-item>
				<swiper-item>
					<image :src="imageurl+'static/image/img_baojie.png'" alt=""></image>
				</swiper-item>
				<swiper-item>
					<image :src="imageurl+'static/image/img_baojie.png'" alt=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="typebox">
			<view class="typebox-price">
				<view class="typebox-price-top">
					<view class="typebox-price-top-left">
						￥<text>{{typelist[typeIndex].price}}</text>起
					</view>
					<view class="typebox-price-top-title fontColor-999">
						已服务<text>1234</text>
					</view>
				</view>
				<view class="typebox-price-down">
					<text>{{typelist[typeIndex].category_name}}</text>
				</view>
			</view>
			<view class="typebox-type">
				<view class="typebox-type-left fontColor-999">
					<text>服务类别</text>
				</view>
				<view v-if="typelist" class="typebox-type-right flex1-textRight">
					<picker @change="typeChange" :value="typeIndex" :range="typelist" range-key="category_name">
						<view class="uni-input">
							<text v-if="typeIndex==null" class="font28 fontColor-ccc">请选择</text>
							<text v-else class="font28">{{typelist[typeIndex].category_name}}</text>
							<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
						</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="introduce-title">
				<text>服务介绍</text>
			</view>
			<view class="introduce-text">
				<image :src="imageurl+'static/image/introduce.png'" mode="widthFix"></image>
			</view>
		</view>
		<!-- 立即预约 -->
		<a-order url='a_baojie_yuyue' type="家政保洁" :typeId='typelist[typeIndex].id'></a-order>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageurl:'',
				// 保洁类别
				typelist: [{
					"category_name": "", //服务类型
					"id": 0, //编号
					"price": 0, //单价
					"service_introduction": ""//服务介绍
				}],
				typeIndex: 0
			}
		},

		onLoad() {
			this.getBaojieTypeList()
			this.imageurl = this.globalData.imageurl
		},
		methods: {
			// 获取服务类型
			getBaojieTypeList() {
				this.util.ajax('personalDemand/housekeepingCategory', {
					"fromUserId": uni.getStorageSync('userId')
				}, res => {
					this.typelist = res.data.list
				})
			},
			// 监听服务类型
			typeChange(e){
				let that = this
				that.typeIndex = e.detail.value
			}
		},
	}
</script>

<style lang='less'>
	.baojie {
		background-color: #F6F6F6;

		.swiper {
			height: 503rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.typebox {
			margin: 16rpx 0;
			padding: 26rpx 46rpx;
			background-color: #fff;

			.typebox-price {
				.typebox-price-top {
					display: flex;
					justify-content: space-between;

					.typebox-price-top-left {
						color: #FF6000;

						text {
							font-size: 50rpx;
							margin: 0 20rpx;
						}
					}
				}

				.typebox-price-down {
					padding: 24rpx 0;
					margin-bottom: 24rpx;
					border-bottom: 2rpx solid #E5E5E5;

					text {
						font-size: 50rpx;
					}
				}
			}


			.typebox-type {
				display: flex;
				justify-content: space-between;

				.typebox-type-left {}

				.typebox-type-right {
					image {
						margin-left: 10rpx;
					}
				}
			}
		}

		.introduce {
			background-color: #fff;
			padding: 26rpx 46rpx;
			padding-bottom: 150rpx;

			.introduce-title {
				position: relative;

				text {
					font-size: 35rpx;
				}
			}

			.introduce-text {
				margin-top: 26rpx;
				text-align: center;
			}
		}
	}
</style>
