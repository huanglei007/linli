<template>
	<view>
		<view class="typeBox flexd jubetween">
			<view class="item" v-for="(item,i) in typeList" :key="i" @click="typeIndex=i;getNewList()"
				:class="typeIndex==i?'active':''">
				{{item}}
			</view>
		</view>
		<view class="list">
			<list :list="list" @refresh="getNewList()"></list>
		</view>
	</view>
</template>

<script>
	import list from '@/components/menuList.vue'
	export default {
		components: {
			list
		},
		data() {
			return {
				userId: '',
				typeList: ['待完成', '已完成'],
				typeIndex: 0,
				list: [],
				curPage: 1,
				isfoot: false,
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
				this.util.ajax('myOrder/myOrderList', {
					"curPage": this.curPage,
					"orderStatus": this.typeIndex,
					"pageSize": 20,
					"userId": this.userId
				}, (res) => {
					if (that.curPage !== res.data.page.curPage) that.isfoot = true
					if (that.curPage == res.data.page.curPage) {
						that.list = that.list.concat(res.data.list.map((e) => {
							return {
								"category_name": e.category_name,
								"commission": e.commission,
								"createtime": that.$shijian(e.createtime),
								"distance": e.distance,
								"id": e.id,
								"image": e.head_img,
								"publisher_name": e.publisher_name,
								"requirement_introduction": "备注：" + e.leave_message,
								"user_id": e.user_id,
								"user_name": e.publisher_name,
								"now_delivery": e.now_delivery,
								"shop_name": e.shop_name
							}
						}))
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
		padding: 30rpx 150rpx;

		.item {
			line-height: 2.3;
			padding: 0 40rpx;
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
				height: 80rpx;
				border-radius: 50%;
			}

			.mess {
				width: 580rpx;

				.title {
					font-size: 30rpx;
					font-weight: bold;
				}

				.price {
					color: #FF3336;

					text {
						font-size: 32rpx;
					}
				}

				.nickname {
					font-size: 30rpx;
				}

				.address {
					image {
						width: 26rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
