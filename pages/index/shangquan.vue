<template>
	<view class="content">
		<view :style="{paddingTop: htosp+'px'}" class="head flexd flex-center jubetween">
			<view class="left flexd flex-center">
				<!-- <image @click="$jumpback()" class="icon22" src="/static/image/icon_gb.png"></image> -->
				<text class="font32">社区商圈</text>
			</view>
			<view class="reda" @click="$jump('/pages/user/applyShop')">
				<!-- 入驻商圈 -->
			</view>
		</view>
		<!-- 轮播图 -->
		<!-- <view class="swiper-box">
			<swiper class="swiper" :circular="true" :indicator-dots="true" :autoplay="true">
				<swiper-item>
					<image :src="imageurl+'static/image/img_baojie.png'" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image :src="imageurl+'static/image/img_baojie.png'" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image :src="imageurl+'static/image/img_baojie.png'" mode=""></image>
				</swiper-item>
			</swiper>
		</view> -->
		<view class="menu">
			<swiper :indicator-dots="true" :duration="200">
				<swiper-item v-for="(d,i) in  shopType_icon" :key="i">
					<view class="menuBox flexd">
						<view class="item" v-for="(item,index) in d.list" :key="index" @click="menuClick(item,index)">
							<view class="image">
								<image :src="item.img" mode=""></image>
								<image v-if="item.tag" class="tag" :src="item.tag" mode="widthFix"></image>
							</view>
							<view class="title">
								{{item.title}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 附近商家 -->
		<nearbyshop ref="ref_nearbyshop" :type='shopType_sq'></nearbyshop>

	</view>
</template>

<script>
	// 附近商家
	import nearbyshop from '@/pages/index/a_nearbyshop.vue'
	export default {
		components: {
			nearbyshop
		},
		data() {
			return {
				imageurl: '',
				userId: '',
				htosp: 0,
				// 商家类型
				shopType_sq: '',
				//  商家类型图标
				shopType_icon: [{
					page: 1,
					list: [{
							img: '/static/image/huang/icon_cyd.png',
							title: '餐饮店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_bld.png',
							title: '便利店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_sgd.png',
							title: '水果店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_gxd.png',
							title: '洗衣店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_cwd.png',
							title: '宠物店',
							path: '/pages/index/shangquan'
						}
					],
				}]
			}
		},
		onLoad(e) {
			this.userId = uni.getStorageSync('userId');
			this.htosp = uni.getStorageSync('htop');
			this.imageurl = this.globalData.imageurl
			if (e.type) {
				this.shopType_sq = e.type
			}
		},
		mounted() {
			if (this.shopType_sq) {
				this.$refs.ref_nearbyshop.getType(this.shopType_sq)
			}
		},
		methods: {
			menuClick(item, index) {
				if (item.path == '') {
					this.$alert('功能开发中')
				} else {
					this.shopType_sq = item.title
				}
			},
		}
	}
</script>

<style lang="scss">
	.head {
		padding: 30rpx;
		background-color: #FFD200;

		.left {
			font-size: 32rpx;
			font-weight: bold;
		}
	}


	.menu {
		position: relative;
		z-index: 1;
		background-color: #fff;
		padding: 20rpx;
		flex-wrap: wrap;

		swiper {
			height: 200rpx;
		}

		.menuBox {
			flex-wrap: wrap;
		}

		.item {
			flex: 0 0 20%;
			text-align: center;
			margin-bottom: 20rpx;

			image {
				width: 100rpx;
				height: 100rpx;
			}

			.image {
				position: relative;
			}

			.tag {
				width: 56rpx;
				position: absolute;
				top: 0;
				right: 0rpx;
			}

			.title {
				font-size: 28rpx;
				color: #505050;
			}
		}
	}
</style>
