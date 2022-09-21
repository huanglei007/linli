<template>
	<view class="yuyue-box">
		<!-- 店铺logo 名称 -->
		<view class="my-shop view-diy">
			<view class="my-shop-left">
				<view class="my-shop-left-img">
					<image :src="form.shop_logo?form.shop_logo:'/static/HM-chat/img_ps.png'" mode=""></image>
				</view>
				<view class="my-shop-left-news">
					<view class="name">
						<text>{{form.shop_name}}</text>
					</view>
					<view class="status" v-if="shopStatus[form.business_status]">
						<view class="status-switch">
							<text class="switch" :class="{'shut':form.business_status==0}"></text>
							<text class="text">{{shopStatus[form.business_status].label}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="my-shop-right">
				<text class="preview" @click="$jump('/pages/index/shopDetail?id='+form.id)">预览门店</text>
			</view>
		</view>
		<!-- 商品管理 -->
		<view class="product view-diy" @click="urlchange('/pagesA/a_product')">
			<view class="iconTitle">
				<image class="icon32" src="/static/img/icon_shoptype.png" mode=""></image>
				<text>商品管理</text>
			</view>
			<view class="iconRight">
				<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
			</view>
		</view>
		<!-- 优惠劵管理 -->
		<view class="coupon view-diy" @click="urlchange('fuli')">
			<view class="iconTitle">
				<image class="icon32" src="/static/img/icon_coupon.png" mode=""></image>
				<text>优惠劵管理</text>
			</view>
			<view class="iconRight">
				<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
			</view>
		</view>
		<!-- 店铺管理 -->
		<view class="shop view-diy" @click="urlchange('/pagesA/a_shop')">
			<view class="iconTitle">
				<image class="icon32" src="/static/img/icon_shoprun.png" mode=""></image>
				<text>店铺管理</text>
			</view>
			<view class="iconRight">
				<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
			</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" confirmText="确认" :title="popupForm.title" :content="popupForm.content"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import fuli from './fuli.vue'
	import message from './message.vue'
	import product from './product.vue'
	export default {
		components: {
			fuli,
			message,
			product
		},
		data() {
			return {
				// 我的商铺信息
				form: {},
				// 店铺状态
				shopStatus: [{
						label: '休息',
						business_status: 0
					},
					{
						label: '营业',
						business_status: 1
					}
				],
				// 店铺审核通知
				popupForm: {
					title: '',
					content: ''
				}
			}
		},
		onShow() {
			this.getMyShop()
		},
		methods: {
			// 获取我的店铺信息
			getMyShop() {
				this.util.ajax('shop/getShopInfo', {
					"userId": uni.getStorageSync('userId'),
				}, res => {
					this.form = res.data
				})
			},
			// 路由跳转
			urlchange(url) {
				// 审核状态(-1申请入驻审核中 -2申请入驻被拒绝 0商家设置审核中 1审核通过 2商家设置被拒绝)
				// 1、商家入驻：等于null或-2时，可以申请，其余提示已入驻
				// 2、商家管理：等于0时提示审核中，其余可以进入 
				// if (this.form.status == 0) {
				// 	if (url == 'a_product') {
				// 		this.popupForm.title = '商品审核中'
				// 	} else {
				// 		this.popupForm.title = '店铺管理审核中'
				// 	}
				// 	this.popupForm.content = '请耐心等待，预计1个工作日'
				// 	this.$refs.alertDialog.open()
				// } else {
					uni.navigateTo({
						url: url
					})
				// }
			},
			//店铺审核弹窗
			//确认
			dialogConfirm() {
				this.$refs.alertDialog.open()
			},
		}
	}
</script>

<style lang="scss">
	.my-shop {
		display: flex;
		justify-content: space-between;

		.my-shop-left {
			display: flex;
			justify-content: space-between;

			.my-shop-left-img {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.my-shop-left-news {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					text {
						font-size: 36rpx;
					}
				}

				.status {
					text {
						font-size: 26rpx;
					}

					.status-switch {
						padding: 8rpx 19rpx;
						border-radius: 25rpx;
						background-color: #F6F6F6;
						display: flex;
						align-items: center;
						text-align: center;


						.switch {
							background-color: #6ED500;
							padding: 8rpx;
							border-radius: 8rpx;
						}

						.shut {
							background-color: red;
						}

						.text {
							margin-left: 15rpx;
						}
					}
				}
			}
		}

		.my-shop-right {
			.preview {
				padding: 10rpx 30rpx;
				background: linear-gradient(180deg, #FDEC7E 0%, #F9D448 100%);
				border-radius: 25rpx;
			}
		}
	}

	.view-diy {
		display: flex;
		justify-content: space-between;
	}

	.iconTitle,
	.iconRight {
		display: flex;
		align-items: center;
	}

	.iconTitle {
		.icon32 {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
	}

	.icon60 {
		width: 60rpx;
		height: 60rpx;
		margin-right: 15rpx;
	}
</style>
