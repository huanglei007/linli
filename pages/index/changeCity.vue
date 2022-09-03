<template>
	<view class="content">
		<view class="head flexd jubetween flex-center" :style="{paddingTop: htosp+'px'}">
			<view class="left flexd flex-center">
				<image @click="$jumpback()" class="backs" src="/static/image/icon_gb.png" mode=""></image>
				切换城市
			</view>
		</view>
		<view class="search flexd juaround flex-center">
			<view class="searchBox flexd jubetween flex-center">
				<image src="/static/image/icon_ss.png" mode=""></image>
				<input class="input" type="text" @input="cityInput" placeholder="请输入城市名称" placeholder-style="font-size:28rpx;color:#888"/>
				<!-- <view class="btn">
					搜索
				</view> -->
			</view>
		</view>
		<view class="mine">
			<view class="title">
				当前城市
			</view>
			<view class="list flexd">
				<view class="item" @click="$jumpback()">
					<image src="/static/image/ixon_dw.png" mode="widthFix"></image>
					{{city}}
				</view>
			</view>
		</view>
		<view class="txlBox">
			<txl ref="txl" color="red" :index="true" @ev="changeCity" name="text"></txl>
		</view>
	</view>
</template>

<script>
	import txl from '@/components/yt-txl/index.vue';
	export default {
		components:{txl},
		data() {
			return {
				userId: '',
				htosp: 0,
				city: ''
			}
		},
		onLoad(){
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			let that=this
			uni.getLocation({
				type: 'gcj02',
				geocode: true,
				success(e) {
					if(e.address){
						that.city=e.address.city.substring(0,e.address.city.lastIndexOf('市'))
					}
				}
			})
		},
		methods: {
			changeCity(e){
				uni.$emit('city', e);
				uni.navigateBack();
			},
			cityInput(e){
				this.$refs.txl.inputFunc(e)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f3f3f3;
	}
	.content{
		padding: 0;
	}
	.head{
		padding: 20rpx 0;
		background-color: #fff;
		.left{
			font-size: 32rpx;
			font-weight:  bold;
			image{
				margin-right: 10rpx;
			}
		}
	}
	.search{
		padding: 30rpx;
		.city{
			font-weight: bold;
			font-size: 30rpx;
		}
		.searchBox{
			background-color: #fff;
			border-radius: 30rpx;
			line-height: 2;
			width: 600rpx;
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 0 20rpx;
			}
			input{
				width: 450rpx;
				padding: 10rpx 0;
			}
			.btn{
				width: 130rpx;
				text-align: center;
				background-color: #FF5648;
				color: #fff;
				border-radius: 30rpx;
				font-size: 30rpx;
			}
		}
	}
	.mine{
		margin: 0 30rpx;
		.title{
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.list{
			.item{
				background-color: #fff;
				padding: 0 20rpx;
				line-height: 2;
				image{
					width: 24rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	.txlBox{
		margin-top: 1vh;
		height: calc(99vh - 182px);
		position: relative;
		background-color: #fff;
	}
</style>
