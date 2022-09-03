<template>
	<view class="content">
		<!-- <view class="toptype flexd " :style="{paddingTop:htosp +'rpx'}">
			<image class="backs" src="/static/image/icon_gb.png" mode="" @click="$jumpback()"></image>
			<view class="titlaa texcenter">地址管理</view>
		</view> -->
		<!-- <view class="list" :style="{marginTop:htosp +90+'rpx'}"> -->
		<view class="list">
			<uni-swipe-action>
				<uni-swipe-action-item class="swipe" v-for="(item, index) in addressList" :key="index">
					<view class="wrapper" @click="addressClickEvent(item.id)">
						<view class="address-box flexd">
							<text class="titas" style="margin-right: 69rpx;">{{item.name}}</text>
							<view class="flexd">
								<view class="titas">{{$hidePhone(item.phone)}}</view>
								<view class="moren texcenter" v-if="item.is_default == 1">默认</view>
							</view>
						</view>
						<view class="shengray">{{item.address_abbreviation}} {{item.address_detail}}</view>
						<image @click.stop="$jump('/pages/user/addressManage?id='+item.id)"
							src="/static/image/icon_update.png" mode="" class="bianji"></image>
					</view>
					<template class="right" v-slot:right>
						<view class="slot-button"><text class="slot-button-text" @click="delAdd(item.id)">删除</text>
						</view>
					</template>
				</uni-swipe-action-item>
			</uni-swipe-action>

		</view>
		<button class="add-btn" @click="$jump('./addressManage')">添加地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				htosp: 0,
				imageurl: '',
				userId: '',
				addressList: [{
					"address": "地址1", //地址
					"address_detail": "详细地址1", //详细地址
					"id": 0, //编号
					"is_default": 0, //是否为默认地址 0否 1是
					"latitude": "", //维度
					"longitude": "", //经度
					"name": "收件人1", //收件人
					"phone": "手机号1", //手机号
					"userId": 0 //用户ID
				}],
			}
		},
		onLoad(option) {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.imageurl = this.globalData.imageurl;
		},
		onShow() {
			this.loadmore()
		},
		methods: {
			loadmore() {
				let that = this
				that.util.ajax('address/myAddress', {
					userId: that.userId
				}, function(res) {
					that.addressList = res.data.list
				})
			},
			refresh() {
				loadmore()
			},
			delAdd(id) {
				uni.showLoading()
				let that = this
				that.util.ajax('address/deleteAddress', {
					"id": id,
					userId: that.userId
				}, function(res) {
					uni.hideLoading()
					that.$alert('删除成功')
					that.loadmore()

				})
			},

			// 地址点击
			addressClickEvent(id) {
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				if (prePage.route != 'pages/user/index') {
					uni.$emit('upAddressData', id)
					uni.navigateBack({
						delta: 1
					})
				}else{
					return
				}
				// this.$jump(localRoute+'?addressId='+id)
			}
		}
	}
</script>

<style lang='scss'>
	.toptype {
		.titlaa {
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			margin-left: 20rpx;
		}
	}

	.list {
		padding-top: 20rpx;

		.swipe {
			.wrapper {
				background: #fff;
				padding: 31rpx;
				position: relative;

				.address-box {
					.titas {
						height: 34rpx;
						line-height: 34rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
					}

					.moren {
						width: 64rpx;
						height: 32rpx;
						border: 1rpx solid #FF6000;
						color: #FF6000;
						border-radius: 4rpx;
						line-height: 32rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						margin-left: 21rpx;
					}
				}

				.shengray {
					width: 558rpx;
					margin-top: 28rpx;
				}

				.bianji {
					width: 32rpx;
					height: 32rpx;
					position: absolute;
					top: 0;
					right: 35rpx;
					bottom: 0;
					margin: auto;
				}
			}
		}

	}

	.add-btn {
		width: 599rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: $uni-color-primary;
		border-radius: 43rpx;
		font-size: 34rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		margin: 100rpx auto 50rpx;
	}

	.swipe {
		margin-bottom: 20rpx;
	}

	.slot-button {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		background-color: #ff5a5f;
	}

	.slot-button-text {
		color: #ffffff;
		font-size: 28rpx;
	}
</style>
