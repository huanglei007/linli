<template>
	<view>
		<view class="typeBox flexd jubetween">
			<view class="item" v-for="(item,i) in typeList" :key="i" @click="typeIndex=i;getNewList()"
				:class="typeIndex==i?'active':''">
				{{item}}
			</view>
		</view>
		<view class="list">
			<view class='gray texcenter' v-if="!list.length" style="padding-top: 200rpx;">
				暂时没有订单信息
			</view>
			<view class="item flexd jubetween flex-center " :class="item.data_status!=1?'active':''"
				@click="$jump('/pages/order/orderDetail?id='+item.id)" v-for="(item,i) in list" :key="i">
				<view class="left flexd flex-center">
					<image class="img" :src="Img(item.head_img)" mode="widthFix"></image>
					<view class="mess">
						<view class="flexd">
							<view class="title">{{item.category_name}}</view>
							<view class="tag">
								{{(item.category_id==6||item.category_id==7)&&item.data_status==1?'出售中':status[item.data_status-1]}}
							</view>
						</view>
						<view class="gray">
							{{$shijian(item.createtime)}}
						</view>
					</view>
				</view>
				<view class="reda" v-if="item.category_id!=6&&item.category_id!=7">
					佣金:￥{{item.commission}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: ['待接单', '已接单', '已完成', '已取消'],
				typeIndex: 0,
				list: [],
				curPage: 1,
				isfoot: false,
				status: ['待接单', '已接单', '已完成', '已取消'],
			}
		},
		mounted(e) {
			this.userId = uni.getStorageSync('userId')
			this.getlist()
		},
		onReachBottom() {
			if (!this.isfoot) {
				this.curPage++
				this.getlist()
			}
		},
		methods: {
			getlist() {
				let that = this
				this.util.ajax('myOrder/myReleaseList', {
					"curPage": this.curPage,
					"orderStatus": this.typeIndex + 1,
					"pageSize": 20,
					"userId": this.userId
				}, (res) => {
					if (that.curPage !== res.data.page.curPage) that.isfoot = true
					if (that.curPage == res.data.page.curPage) {
						that.list = that.list.concat(res.data.list)
					}
				})
			},
			getNewList() {
				this.list = []
				this.curPage = 1
				this.getlist()
			}
		}
	}
</script>

<style lang="scss">
	.typeBox {
		padding: 30rpx 80rpx;

		.item {
			line-height: 2.3;
			padding: 0 20rpx;
			border-radius: 50rpx;
			background-color: #fff;
			color: #959595;
			font-size: 28rpx;

			&.active {
				color: #212121;
				background-color: $uni-color-primary;
			}
		}
	}

	.list {
		.item {
			background-color: #fff;
			border-bottom: 1rpx solid #eee;
			padding: 30rpx;

			.img {
				width: 80rpx;
			}

			.mess {
				margin-left: 20rpx;

				.title {
					font-size: 32rpx;
					margin-right: 10rpx;
					font-weight: bold;
				}

				.tag {
					background-color: $uni-color-primary;
					line-height: 1.6;
					padding: 0 16rpx;
					border-radius: 10rpx;
				}

				.gray {
					margin-top: 10rpx;
				}
			}

			.reda {
				color: #FF581E;
			}

			&.active {
				.mess {
					.tag {
						background-color: rgba($color: #00D071, $alpha: .1);
						color: #00C36A;
					}
				}
			}
		}
	}
</style>
