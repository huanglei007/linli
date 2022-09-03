<template>
	<view class="content">
		<view class="header " :style="{paddingTop: htosp+'px'}">
			<view class="flexd jubetween">
				<view class="city flexd flex-center">
					<image @click="$jumpback()" src="/static/image/icon_gb.png" mode=""></image>
					提现
				</view>
			</view>
		</view>
		<view class="asdoa">
			<view class="tit flexd flex-center" @click="showInput=!showInput">
				<image src="/static/image/icon_zfb.png" mode="widthFix"></image>
				<view>支付宝</view>
			</view>
			<view style="margin-top: 30rpx" v-show="showInput">
				<view class="rechtype flexd">
					<view class="titis">真实姓名</view>
					<input type="text" v-model="trueName" placeholder="请输入真实姓名" />
				</view>
				<view class="rechtype flexd">
					<view class="titis">支付宝账号</view>
					<input type="text" v-model="accountNumber" placeholder="请输入支付宝账号" />
				</view>
			</view>
		</view>
		<view class="outlsit">
			<view class="titi">转出金额</view>
			<view class="liast flexd">
				<view class="renming">￥</view>
				<input type="digit" v-model="price" placeholder="0.00"/>
			</view>
			<view class="xian"></view>
			<view class="tips flexd">
				<view class="shengray">可提现 ￥{{surplus_virtual_currency_quantity}}，</view>
				<view class="reda" @click="price = surplus_virtual_currency_quantity">全部提现</view>
			</view>
			<view class="gobuy white texcenter" @click="tixian">立即提现</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				htosp:0,
				price:'',
				aritup:false,
				trueName:'',
				accountNumber:'',
				surplus_virtual_currency_quantity:0,
				showInput: false,
			} 
		},
		onLoad() {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			
		},
		onShow() {
			this.loadmore();
		},
		methods: {
			loadmore(){
				let that=this
				this.util.ajax('member/memberGoToWithdrawal',{
					userId: this.userId
				},res=>{
					that.trueName=res.data.ali_true_name
					that.accountNumber=res.data.ali_account
					that.surplus_virtual_currency_quantity=res.data.balance
					if(that.trueName==''||that.accountNumber==''){
						this.showInput=true
					}
				})
			},
			tixian(){
				let that = this;
				if(that.trueName == ''){
					this.$alert('姓名不能为空')
				}else if(that.accountNumber == ''){
					this.$alert('账号不能为空')
				}else if(that.price > this.surplus_virtual_currency_quantity){
					this.$alert('提现金额不能大于余额')
				}else{
					that.util.ajax('member/memberWithdrawal',{
						"userId": that.userId,
						"aliTrueName":that.trueName,
					    "aliAccount":that.accountNumber,
					    "amount":that.price,
					},function (res) {
							that.$alert(res.data)
							that.$twoback();
						}
					);
				}
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: #f4f6fb;
	}
	.header {
		position: relative;
		z-index: 1;
		.city {
			line-height: 30rpx;
			font-size: 34rpx;
			padding: 20rpx;
			font-weight: bold;
			image {
				width: 30rpx;
				height: 30rpx;
				margin: 0 10rpx;
			}
		}
	}
	.content{
		.asdoa{
			padding: 30rpx;
			background: #FFFFFF;
			margin: 30rpx;
			box-sizing: border-box;
			border-radius: 10rpx;
			.tit{
				image{
					width: 60rpx;
				}
				view{
					font-size: 32rpx;
					color: #212121;
					margin-left: 20rpx;
					font-weight: bold;
				}
			}
		}
		.titi{
			.gray{
				font-size: 24rpx;
				margin-left: 8rpx;
			}
		}
		.rechtype{
			width: 100%;
			height: 130rpx;
			background: #f5f5f5;
			padding: 0 30rpx;
			margin: 0 auto 40rpx;
			border-radius: 12rpx;
			line-height: 130rpx;
			box-sizing: border-box;
			input{
				margin: auto 0;
				font-size: 30rpx;
			}
			.logo{
				width: 48rpx;
				height: 48rpx;
				margin: auto 0;
			}
			.rifg{
				width: 20rpx;
				height: 20rpx;
				margin: auto 0;
			}
			
			.titis{
				min-width: 250rpx;
				font-size: 30rpx;
				margin: 0 10rpx;
			}
			.blue{
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				color: #4D9AFF;
			}
		}
		.outlsit{
			margin: 30rpx;
			padding: 40rpx 68rpx;
			background: #FFF;
			border-radius: 32rpx 32rpx 0 0 !important;
			.liast{
				flex-wrap: wrap;
				padding: 30rpx 0;
				.renming{
					font-size: 48rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #212121;
					margin-top: auto;
				}
				image{
					width: 76rpx;
					height: 76rpx;
					margin-left: 15rpx;
					margin-right: 30rpx;
				}
				input{
					width: 90%;
					margin-top: auto;
					/* font-size: 36rpx; */
					font-size: 56rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
				}
			}
		}
		.xian{
			width: 100%;
			height: 1rpx;
			background: #F1F1F1;
			margin-bottom: 31rpx;
		}
		.tips{
			margin-bottom: 20rpx;
			view{
				height: 30rpx;
				line-height: 30rpx;
				font-size: 25rpx;
			}
			image{
				width: 24rpx;
				height: 24rpx;
				margin: auto 5rpx;
			}
		}
		.gobuy{
			width: 100%;
			height: 98rpx;
			background: #FF3336;
			border-radius: 24rpx;
			line-height: 98rpx;
			font-size: 30rpx;
			margin: 120rpx auto 0;
		}
		.model{
			position: fixed;
			z-index: 99;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			.modelBG{
				background-color: rgba($color: #000000, $alpha: .2);
				width: 100%;
				height: 100%;
			}
			.modelContent{
				position: fixed;
				top: 50%;
				left: 50%;
				width: 80%;
				transform: translate(-50%,-50%);
				background-color: #fff;
				padding: 30rpx 60rpx;
				overflow-y: scroll;
				max-height: 400rpx;
				.closeBox{
					position: relative;
					.modelClose{
						position: absolute;
						left: 100%;
						width: 30rpx;
						image{
							max-width: 100%;
						}
					}
				}
			}
			
		}
		.guize{
			color: #FF3336;
			margin-top: 20rpx;
		}
	}
</style>
