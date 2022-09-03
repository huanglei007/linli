<template>
	<view class="content">
		<view class="list">
			<view class="item flexd jubetween">
				<view>客服热线</view>
				<view class="flexd flex-center">
					<view>{{kf_hotline}}</view>
					<image @click="$callphone(kf_hotline)" src="/static/image/icon_dh.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item flexd jubetween ">
				<view>客服微信</view>
				<view>{{kf_wechat}}</view>
			</view>
		</view>
		<view class="foot">
			&copy;深圳市洋鲸科技有限公司
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kf_hotline: '',
				kf_wechat: ''
			}
		},
		onLoad() {
			let that=this
			this.util.ajax('aboutUs/info',{},res=>{
				that.kf_hotline=res.data.kf_hotline
				that.kf_wechat=res.data.kf_wechat
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.list{
		margin-top: 20rpx;
		.item{
			padding: 20rpx 30rpx;
			background-color: #fff;
			margin-bottom: 4rpx;
			view{
				font-size: 30rpx;
				line-height: 2;
				image{
					width: 26rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.foot{
		text-align: center;
		margin-top: 100rpx;
		color: #666;
	}
</style>
