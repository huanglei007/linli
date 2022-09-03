<template>
	<view class="content">
		<!-- <view class="searchType flex-center flexd jubetween">
			<view class="item" v-for="(item,i) in typeList" :key="i"
			:class="typeIndex==i?'active':''"
			@click="typeIndex=i">
				{{item}}
				<image class="icon" src="/static/image/icon_xzr.png" mode="widthFix"></image>
			</view>
		</view> -->
		<view class="conBox">
			<message v-if="typeIndex==0"></message>
			<!-- <fuli v-if="typeIndex==1"></fuli> -->
			<!-- <product v-if="typeIndex==1"></product> -->
		</view>
	</view>
</template>

<script>
	import message from './message.vue'
	import product from './product.vue'
	export default {
		components:{
			message,
			product
		},
		data() {
			return {
				typeList: ['达人信息'],// '福利' '服务/商品信息'
				typeIndex: 0,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.searchType{
		padding-top: 1rpx solid #F5F5F5;
		background-color: #fff;
		padding: 10rpx 0;
		.item{
			line-height: 100rpx;
			position: relative;
			font-size: 28rpx;
			color: #989898;
			text-align: center;
			width: 50%;
			.icon{
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 30rpx;
				opacity: 0;
			}
			&.active{
				font-size: 32rpx;
				color: #212121;
				font-weight: bold;
				.icon{
					opacity: 1;
				}
			}
		}
	}
	.conBox{
		margin: 30rpx;
	}
</style>
