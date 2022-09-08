<template>
	<view class="content">
		<view class="toptype flexd " :style="{paddingTop:htosp +'px'}">
			<image class="backs" src="/static/image/icon_gb.png" mode="" @click="back()"></image>
			<view class="titla texcenter">我的订单</view>
		</view>
		<view class="searchType flex-center flexd jubetween" :style="{paddingTop:htosp+ 40 +'px'}">
			<view class="item" v-for="(item,i) in typeList" :key="i" :class="typeIndex==i?'active':''"
				@click="typeIndex=i">
				{{item}}
				<image class="icon" src="/static/img/icon_xuanzhong.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="conBox">
			<my-apply ref='apply' v-if='typeIndex==0'></my-apply>
			<receiving ref='receiving' v-if="typeIndex==1"></receiving>
			<order ref="order" v-if="typeIndex==2"></order>
		</view>
	</view>
</template>

<script>
	import myApply from './myApply.vue'
	import receiving from './receiving.vue'
	import order from './order.vue'
	export default {
		components: {
			myApply,
			receiving,
			order
		},
		onShow() {
			if (this.first) {
				this.refresh()
			} else {
				this.first = true
			}
		},
		onLoad(e) {
			if (e.type) {
				this.typeIndex = e.type
			}
			this.htosp = uni.getStorageSync('htop')
		},
		data() {
			return {
				typeList: ['我的发布', '我的接单', '商品订单'],
				typeIndex: 0,
				first: false,
				htosp: ''
			}
		},
		methods: {
			refresh() {
				let type
				if (this.typeIndex == 0) {
					type = 'apply'
				} else if (this.typeIndex == 1) {
					type = 'receiving'
				} else {
					type = 'order'
				}
				this.$refs[type].getNewList()
			},
			back() {
				uni.switchTab({
					url: '/pages/user/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.searchType {
		padding-top: 1rpx solid #F5F5F5;
		background-color: #fff;
		padding-bottom: 15rpx;

		.item {
			line-height: 100rpx;
			position: relative;
			font-size: 28rpx;
			color: #989898;
			text-align: center;
			width: 33.3%;

			.icon {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 30rpx;
				opacity: 0;
			}

			&.active {
				font-size: 32rpx;
				color: #212121;
				font-weight: bold;

				.icon {
					opacity: 1;
				}
			}
		}
	}
</style>
