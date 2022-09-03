<template>
	<view class="content">
		<view class="head flexd jubetween flex-center" :style="{paddingTop: htosp+'px'}">
			<view class="left flexd flex-center">
				<image @click="goback" class="backs" src="/static/image/icon_gb.png" mode=""></image>
				发布
			</view>
		</view>
		<view class="typeBox flexd jubetween flex-center">
			<view class="item" v-for="(item,i) in typeList" :key="i" :class="typeIndex==i?'active':''"
				@click="typeIndex=i">
				{{item}}
			</view>
		</view>
		<view class="formBox">
			<get-express ref='getExpress' v-show="typeIndex==0" :list="couponlist">
			</get-express>
			<food ref='food' v-show="typeIndex==1" :list="couponlist"></food>
			<trash ref='trash' v-show="typeIndex==2" :list="couponlist"></trash>
			<buy ref='buy' v-show="typeIndex==3"></buy>
			<get ref='get' v-show="typeIndex==4"></get>
		</view>
	</view>
</template>

<script>
	import getExpress from './getExpress.vue'
	import food from './food.vue'
	import trash from './trash.vue'
	import buy from './buy.vue'
	import get from './get.vue'
	export default {
		components: {
			getExpress,
			food,
			trash,
			buy,
			get
		},
		data() {
			return {
				htosp: 0,
				typeList: ['帮取快递', '帮送外卖', '帮丢垃圾', '帮购商品', '帮送帮取'],
				typeIndex: 0,
				notfirst: false,
				// 跑腿卷
				couponlist: [],
			}
		},
		onShow() {
			setTimeout(() => {
				if (this.notfirst) {
					this.refresh()
				} else {
					this.notfirst = true
				}
			}, 1000)
		},
		onLoad(e) {
			this.htosp = uni.getStorageSync('htop')
			// #ifdef MP-WEIXIN
			this.htosp -= 20
			// #endif
			if (e.id) {
				this.typeIndex = e.id
			}
			if (e.data_id) {
				this.getRun(e.data_id)
			} else {
				this.getRun()
			}
		},
		methods: {
			refresh() {
				if (this.typeIndex == 0) {
					// this.$refs.getExpress.refresh()
				} else if (this.typeIndex == 1) {
					// this.$refs.food.refresh()
				} else if (this.typeIndex == 2) {
					// this.$refs.trash.refresh()
				} else if (this.typeIndex == 3) {
					// this.$refs.buy.refresh()
				} else {
					// this.$refs.get.refresh()
				}
			},
			// 获取跑腿卷
			getRun(id) {
				let that = this;
				this.util.ajax('release/errandCouponList', {
					"curPage": 1,
					"pageSize": 20,
					"userId": uni.getStorageSync('userId')
				}, res => {
					this.couponlist = res.data.coupon
				})
			},
			// 返回
			goback() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: relative;

		.head {
			background-color: $uni-color-primary;
			position: relative;
			/* #ifdef MP-WEIXIN */
			padding-top: 88rpx;
			/* #endif */

			.left {
				font-size: 32rpx;
				font-weight: bold;

				image {
					margin-right: 10rpx;
				}
			}
		}
	}

	.typeBox {
		background-color: $uni-color-primary;
		padding: 30rpx 0;

		.item {
			text-align: center;
			font-size: 28rpx;
			flex: 0 0 20%;
			line-height: 2;
			position: relative;

			&.active {
				font-size: 32rpx;
				font-weight: bold;

				&::before {
					content: '';
					position: absolute;
					width: 30rpx;
					height: 30rpx;
					display: block;
					background-image: url('/static/image/icon_xzr.png');
					background-repeat: no-repeat;
					background-size: cover;
					left: 50%;
					bottom: -20rpx;
					transform: translateX(-50%);
				}
			}
		}
	}

	.formBox {
		position: relative;
		z-index: 1;
	}
</style>
