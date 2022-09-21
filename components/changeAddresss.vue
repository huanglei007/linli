<template>
	<view class="pag">
		<view class="bg" @click="cancel"></view>
		<view class="list">
			<view class="title">
				<view class="texcenter">选择地址</view>
				<view class="icon" @click="cancel()">
					<image src="/static/image/icon_gbbl.png" mode="widthFix"></image>
				</view>
			</view>
			<scroll-view class="scroll-view_H" scroll-y="true">
				<block v-for="(item, index) in list" :key="index">
					<view class="wrapper" @click="sumbit(item)">
						<view class="address-box flexd">
							<text class="titas" style="margin-right: 69rpx;">{{item.name}}</text>
							<view class="flexd">
								<view class="titas">{{item.phone}}</view>
								<view class="moren blue texcenter" v-if="item.is_default == 1">默认</view>
							</view>
						</view>
						<view class="shengray">{{item.address}} {{item.address_detail}}</view>
						<image src="/static/image/icon_update.png"
							@click.stop="urlChange('/pages/user/addressManage?id='+item.id)" mode="" class="bianji">
						</image>
					</view>
				</block>

			</scroll-view>
			<block>
				<button class="add-btn" @click="$jump('/pages/user/addressManage')">添加地址</button>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: "changeAddresss",
		data() {
			return {
				list: [],
				userId: ''
			};
		},
		mounted() {
			this.userId = uni.getStorageSync('userId')
			this.getList()
		},
		methods: {
			getList() {
				let that = this
				that.util.ajax('address/myAddress', {
					userId: that.userId
				}, function(res) {
					that.list = res.data.list
				})
			},
			urlChange(url) {
				let that = this
				uni.navigateTo({
					url: url,
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						acceptDataFromOpenedPage: function(data) {
							setTimeout(()=>{
								that.getList()
							},500)
						}
					}
				});
			},
			cancel() {
				this.$emit('cancel')
			},
			refresh() {
				this.getList()
			},
			sumbit(e) {
				this.$emit('comfit', e)
			}
		}
	}
</script>

<style lang="scss">
	.add-btn {
		width: 90%;
		height: 70rpx;
		line-height: 70rpx;
		background: #ddd;
		border-radius: 10rpx;
		font-size: 30rpx;
		font-weight: normal;
		margin: 50rpx auto 50rpx;

	}

	.scroll-view_H {
		box-sizing: border-box;
		max-height: 400rpx;
	}

	.pag {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;

		.bg {
			background-color: rgba($color: #000000, $alpha: .3);
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		.list {
			background-color: #fff;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			max-height: 60%;
			z-index: 1;
			padding: 20rpx;
			border-top-right-radius: 30rpx;
			border-top-left-radius: 30rpx;
			box-sizing: border-box;

			.title {
				position: relative;

				.texcenter {
					font-size: 28rpx;
				}

				.icon {
					position: absolute;
					right: 0;
					top: 0;

					image {
						width: 30rpx;
					}
				}
			}

			.wrapper {
				margin-bottom: 20rpx;
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
						border: 1rpx solid $uni-color-primary;
						border-radius: 4rpx;
						line-height: 32rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						margin-left: 21rpx;
					}
				}

				.shengray {
					width: 90%;
					margin-top: 18rpx;
				}

				.bianji {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 0;
					right: 35rpx;
					bottom: 0;
					margin: auto;
				}
			}
		}
	}
</style>
