<template>
	<view class="content">
		<view class="fill flexd" :style="{marginTop:htosp +70+'rpx'}">
			<view class="sanhei">旧密码</view>
			<uni-easyinput v-model="oldpass" :inputBorder="false" type="password" placeholder="请输入旧密码"></uni-easyinput>
			
		</view>
		<view class="fill flexd">
			<view class="sanhei">新密码</view>
			<uni-easyinput v-model="pass" :inputBorder="false" type="password" placeholder="请输入新密码"></uni-easyinput>
		</view>
		<view class="fill flexd">
			<view class="sanhei">确认密码</view>
			<uni-easyinput v-model="passagain" :inputBorder="false" type="password" placeholder="请再一次输入密码"></uni-easyinput>
		</view>
		<view class="loginbtn">
			<button class="white" @tap="navswto">确认</button>
		</view>
	</view>
</template>

<script>
	
	export default {	
		data() {
			return {
				htosp:0,
				pass:'',
				passagain:'',
				oldpass: '',
			}
		},
		onLoad() {
			this.htosp = uni.getStorageSync('htop');
		},
		methods: {
			navswto(){
				let that = this;
				that.util.ajax('user/updatePwd',{
						  "old_password": that.oldpass,
						  "new_password": that.pass,
						  "affirm_new_password": that.passagain,
						  "user_id": uni.getStorageSync('userId')
					},function (res) {
						that.$alert(res.data)
						setTimeout(()=>{
							that.$jumpback();
						},1000)
					}
				)
			}
		},
	}
</script>

<style lang='scss'>
	page{
		background: #F5F5F5;
	}
	.content{
		.fill{
			padding: 0 31rpx;
			position: relative;
			background: #FFF;
			border-bottom: 20rpx solid #F5F5F5;
			.sanhei{
				width: 200rpx;
				font-size: 28rpx;
				margin: auto 0;
			}
			input{
				width: 50%;
				height: 98rpx;
				line-height: 98rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #212121;
			}
			.flexd{
				margin: auto 0;
				.seco{
					width: 160rpx;
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #549EFE;
					letter-spacing:5rpx;
				}
				image{
					width: 32rpx;
					height: 32rpx;
					margin: auto 10rpx;
				}
			}
		}
		.loginbtn button {
			width: 623rpx;
			height: 98rpx;
			line-height: 98rpx;
			font-size: 32rpx;
			border-radius: 25rpx;
			outline: 0;
			display: block;
			margin: 0;
			font-family: inherit;
			background: #15BB86;
			margin: 100rpx auto 37rpx;
		}
	}
</style>
