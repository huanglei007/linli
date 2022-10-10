<template>
	<view class="list">
		<view class="item texcenter" v-if="list.length==0">
			<image :src="imageurl+'/static/image/icon_wjl.png'" style="width: 300rpx;height: 256rpx;" mode="widthFix">
			</image>
			<view class="gray">未搜索到订单信息</view>
		</view>
		<view class="item" v-for="(item,index) in list" :key="index" @click="godetail(item.id)">
			<view class="flexd">
				<view class="image flexd flex-center circle">
					<image :src="Img(item.image)" mode=""></image>
				</view>
				<view class="message">
					<view class="top-box flexd jubetween flex-center">
						<view class="box-title flexd">
							<view class="title" :class="{'urgent':item.now_delivery==1}">
								<text class="font32">{{item.category_name}}</text>
								<text v-if="item.shop_name" class="type">{{item.shop_name}}</text>
							</view>
							<view v-if="item.publisher_name">
								<text class="font30">{{item.publisher_name}}</text>
							</view>
						</view>
						<view class="time">
							<uni-dateformat class="font24 fontColor-999" :date="item.createtime" format="MM-dd hh:mm"></uni-dateformat>
						</view>
					</view>
					<view class="min-box flexd jubetween flex-center">
						<view class="price">
							￥<text>{{item.commission}}</text>
						</view>
						<view class="range">
							<image class="icon22" src="/static/image/icon_dw.png" mode=""></image>
							<text class="font24 fontColor-999">{{item.distance}}</text>
						</view>
					</view>
					<view class="bottom-box flexd jubetween flex-center">
						<view class="remake fontColor-999">
							<text>{{item.requirement_introduction}}</text>
						</view>
						<view class="btn flexd flex-center" v-if="userId!=item.user_id"
							@click.stop="talkto(item.user_id,item.publisher_name)">
							<image class="icon32" src="/static/image/icon_lt.png"></image>
						</view>
						<!-- <text class="font28 active" @click.stop='jiedan(item.id)'>我要接单</text> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "menuList",
		data() {
			return {
				imageurl: '',
				userId: '',
				lists: [{
					"category_id": 0, //需求分类ID
					"category_name": "陪护", //需求分类名称
					"commission": 100, //佣金
					"createtime": "2022-7-26", //发布时间
					"data_status": 0, //数据状态（0待付款 1待接单 2已接单 3完成接单 4已取消）
					"distance": "10Km", //距离
					"head_img": "", //发布人头像
					"id": 0, //编号
					"publisher_name": "张三", //发布人
					"requirement_introduction": "陪护介绍", //需求介绍
					"user_id": 0 //发布人用户ID
				}]
			};
		},
		props: ['list'],
		mounted() {
			this.userId = uni.getStorageSync('userId')
			this.imageurl = this.globalData.imageurl
		},
		methods: {
			talkto(id, name) {
				if (!id) return
				if (id == this.userId) {
					this.$alert('无法和自己聊天')
					return
				}
				this.$jump('/pages/chat/HM-chat?idse=' + id)
			},
			jiedan(id) {
				// this.$jump('/pages/order/orderDetail?id=' + id)
				if (uni.getStorageSync('userInfo').user_type != 4) {
					this.$alert('请先注册达人才可接单')
				} else {
					let that = this
					this.util.ajax('myOrder/saveOrder', {
						"releaseRequirementId": id,
						"userId": this.userId
					}, res => {
						that.$alert('接单成功')
						that.refresh()
					})
				}

			},
			refresh() {
				this.$emit('refresh')
			},
			godetail(id) {
				if (uni.getStorageSync('userInfo').user_type != 4) {
					this.$alert('请先注册达人才可接单')
				} else {
					this.$jump('/pages/order/orderDetail?id=' + id)
				}
			}
		}
	}
</script>

<style lang="scss">
	.list {
		.item {
			margin-bottom: 20rpx;
			background-color: #fff;
			padding: 30rpx 40rpx;

			.image {

				width: 120rpx;
				overflow: hidden;
				position: relative;

				image {
					border-radius: 50%;
					width: 120rpx;
					height: 120rpx;
				}

				.renzhen {
					width: 80rpx;
					height: 40rpx;
					position: absolute;
					right: 0;
					top: 0;
				}
			}

			.message {
				flex: 1;
				margin-left: 20rpx;

				.top-box {
					.box-title {
						flex: 1;
						margin-right: 30rpx;
						overflow: hidden;

						.title {
							position: relative;
							padding-right: 15rpx;

							.font32 {
								font-weight: bold;
								width: fit-content;
								padding-right: 7rpx;
							}
							.type{
								font-size: 24rpx;
								color: #144ed5;
							}
						}
					}

				}

				.min-box {
					padding: 20rpx 0;

					.price {
						color: #FF3336;

						text {
							font-size: 32rpx;
							font-weight: bold;
						}
					}
				}

				.bottom-box {

					.btn {
						line-height: 1.5;
						font-size: 24rpx;
						padding: 10rpx 5rpx;
						margin-left: 20rpx;
						background-color: $uni-color-primary;
						border-radius: 30rpx;
						width: 90rpx;
						text-align: center;

						image {
							width: 28rpx;
							height: 28rpx;
							margin: 0 auto;
						}
					}
				}
			}
		}
	}

	.urgent {
		color: #e43d33;
	}
</style>
