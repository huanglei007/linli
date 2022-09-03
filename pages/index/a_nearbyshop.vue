<template>
	<view class="nearbyshop">
		<!-- 分段 商圈类别 -->
		<view class="nearbyshop-segmented">
			<scroll-view class="scroll-view" scroll-x="true" :scroll-left="scrollIndex">
				<view :id="'demo'+index" class="scroll-view-item" v-for="(item,index) in shopTypeList" :key="index">
					<view class="title" :class="{'active':shopTypeIndex == index}"
						@click="shopTypeIndex=index;getNewList(index)">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<!-- 筛选 -->
			<view class="screen" @click="openpop">
				<text>更多</text>
				<image src="/static/svg/arrow-down-s-fill.svg" mode=""></image>
			</view>
		</view>
		<!-- 商家列表 -->
		<view class="list">
			<view v-if="!shopList[0]" class="fontColor-ccc" style="padding: 50rpx 0;text-align: center;">
				<text>暂无商家</text>
			</view>
			<view class="item flexd" v-for="(item,index) in shopList" :key="index"
				@click="$jump('/pages/index/shopDetail?id='+item.id)">
				<view>
					<image style="width:160rpx;height:160rpx;" :src="Img(item.shop_logo)" mode=""></image>
				</view>
				<view class="message">
					<!-- 商铺名称 商家类别 -->
					<view class="title">
						<text>{{item.shop_name}} {{' '}}</text>
						<text class="font22" style="color:#0B4EA5;">{{item.shop_sub_type_name}}</text>
					</view>
					<!-- 距离 -->
					<view class="range">
						<view class="tab-box">
							<text class="font22 tab">阾里专送</text>
						</view>
						<view class="distance">
							<text class="font22">最快15分钟</text>
						</view>
					</view>
					<!-- 起送费 -->
					<view>
						<text class="font22 fontColor-999">起送费{{item.initial_delivery_fee||0}}元</text>
						{{' '}}
						<text class="font22 fontColor-999">配送费0元</text>
					</view>
					<!-- 代金卷 -->
					<view class="voucher flexd">
						<view v-if="!item.coupon_msg" class="piece">
							<text>暂无优惠</text>
						</view>
						<view v-else class="piece">
							<text>{{item.coupon_msg}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 筛选弹出层 -->
		<uni-popup ref="popup" type="top" :mask-click="false" backgroundColor="#ffffff">
			<view class="pop-right">
				<view class="pop-type" style="padding: 30rpx 0 0 0;">
					<text class="font36">商家类型</text>
				</view>
				<view class="list-box">
					<view class="pop-right-list" :class="{'active-list':screenIndex==index}"
						v-for="(item,index) in shopTypeList" :key="index" @click="screenIndex=index">
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="sub">
				<view class="cancel" @click="cancelEvent">
					<text>取消</text>
				</view>
				<view class="confirm" @click="confirmEvent">
					<text>确认</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: ['type'],
		name: 'nearbyshop',
		data() {
			return {
				userId: '',
				htosp: 0,
				commissionSort: 0,
				isfoot: false,
				curPage: 1,
				//商铺列表
				shopList: [],
				//商铺类型
				shopType: [{

				}],
				shopTypeList: [],
				//当前商铺类型
				shopTypeIndex: 0,
				// 来自哪个页面
				fromPage: '',
				// 当前筛选
				screenIndex: 0,
				// 商家类别滚动条位置
				scrollIndex: 0,
			}
		},
		onReachBottom() {
			if (!this.isfoot) {
				this.curPage++
				this.getlist()
			}
		},
		created() {
			this.userId = uni.getStorageSync('userId');
			this.htosp = uni.getStorageSync('htop');
			this.getType()
			this.getUrlIndex()
		},
		watch: {
			type(newVal, oldVal) {
				this.getType(newVal)
			}
		},
		methods: {
			// 获取商家类别列表
			getType(type) {
				let that = this
				this.util.ajax('shop/getShopTypeList', {
					"parentId": 0,
					"secondType": 1
				}, (res) => {
					that.shopTypeList = []
					that.shopTypeList.push({
						name: '全部',
						id: 0,
						parent_id: 0
					})
					that.shopTypeList = that.shopTypeList.concat(res.data.list)
					if (type) {
						this.scrollEvent(type, res.data.list)
					} else {
						this.getlist()
					}
				})
			},
			// 获取商家列表
			getlist() {
				let that = this
				this.util.ajax('shop/shopList', {
					"shopTypeId": this.shopTypeList[this.shopTypeIndex].id, //类别ID
					"scoreSort": this.commissionSort + 1, //评分排序：1最高 2最低
					"curPage": this.curPage, //当前页页码,示例值(1)
					"pageSize": 20, //分页大小,示例值(20)
					"userId": this.userId //用户ID
				}, (res) => {
					let array = []
					// 筛选营业中的商家
					if (res.data.list.length > 0) {
						for (let a = 0; a < res.data.list.length; a++) {
							if (res.data.list[a].business_status != 0) {
								array.push(res.data.list[a])
							}
						}
					} else {
						that.shopList = []
						return
					}
					// 是否分页
					if (that.curPage !== res.data.page.curPage) {
						that.isfoot = true
						that.shopList = that.shopList.concat(array)
					}
					// 根据商家类型查询商家列表
					else {
						this.screenTypeEvent(array)
					}
				})
			},
			// 筛选商家
			screenTypeEvent(list) {
				let that = this
				if (that.shopTypeIndex == 0) {
					that.shopList = list
				} else {
					let arr = []
					for (let i = 0; i < list.length; i++) {
						if (list[i].shop_sub_type_id == that.shopTypeList[that.shopTypeIndex].id) {
							arr.push(list[i])
							this.shopList = arr
						}
					}
				}
			},
			// 商家类型滚动定点
			scrollEvent(type, list) {
				let that = this
				for (let i = 0; i < list.length; i++) {
					if (type == list[i].name) {
						that.shopTypeIndex = i + 1
					}
				}
				let info = uni.createSelectorQuery().in(this).select(".scroll-view");
				info.boundingClientRect(function(data) {
					that.scrollIndex = parseInt(data.width / 4 * that.shopTypeIndex)
				}).exec(function(res) {
					// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
				})
				this.getlist()
			},
			// 重新获取商家列表
			getNewList() {
				this.shopList = []
				this.curPage = 1
				this.getlist()
			},
			// 获取当前页面路由
			getUrlIndex() {
				let currentRoutes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let currentRoute = currentRoutes[currentRoutes.length - 1].route //获取当前页面路由
				let currentParam = currentRoutes[currentRoutes.length - 1].options; //获取路由参数
				// 拼接参数
				let param = ''
				for (let key in currentParam) {
					param += '?' + key + '=' + currentParam[key]
				}
				let localRoute = currentRoute + param;
				this.fromPage = localRoute
			},
			// 筛选弹出层
			// 打开
			openpop() {
				// this.$alert('开发中')
				this.$refs.popup.open()
				uni.hideTabBar();
			},
			// 取消
			cancelEvent() {
				let that = this
				that.screenIndex = 0
				this.$refs.popup.close()
				uni.showTabBar();
			},
			// 确认
			confirmEvent() {
				let that = this
				that.shopTypeIndex = that.screenIndex
				this.getType(that.shopTypeList[that.shopTypeIndex].name)
				this.$refs.popup.close()
				uni.showTabBar();
			}
		}
	}
</script>

<style lang="less">
	.nearbyshop-segmented {
		padding: 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		position: relative;

		.scroll-view {
			white-space: nowrap;
			width: 82vw;

			.scroll-view-item {
				width: 135rpx;
				display: inline-block;
				text-align: center;
				background-color: #fff;
				margin-right: 20rpx;
				border-radius: 10rpx;

				.title {
					line-height: 40rpx;
					font-size: 28rpx;
					padding: 12rpx 0rpx;
					color: #666666;
				}

				.active {
					color: #FF7827;
					position: relative;
				}
			}
		}

		.screen {
			flex: 1;
			border-radius: 10rpx;
			padding: 12rpx 0;
			background-color: #fff;
			justify-content: center;
			display: flex;
			align-items: center;

			text {
				line-height: 40rpx;
				font-size: 25rpx;
				color: #333333;

			}

			image {
				width: 28rpx;
				height: 28rpx;
			}
		}
	}

	.list {
		padding: 20rpx 25rpx;
		/* #ifdef APP-PLUS */
		padding: 10rpx 30rpx;
		/* #endif */
		padding-top: 0;
		.item {
			margin-bottom: 10rpx;
			background-color: #fff;
			padding: 24rpx;
			border-radius: 20rpx;

			.image {
				width: 150rpx;
				height: 150rpx;
				overflow: hidden;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				.renzhen {
					width: 60rpx;
					height: 30rpx;
					position: absolute;
					right: 0;
					top: 0;
				}
			}

			.message {
				width: 500rpx;
				margin-left: 20rpx;
				position: relative;

				.title {
					font-size: 32rpx;
					position: relative;
					padding-bottom: 10rpx;
				}

				.nickname {
					color: #888
				}

				.price {
					color: #888;
				}

				.range {
					text-align: right;
					position: absolute;
					top: 2rpx;
					right: 0;

					.tab-box {
						color: #999999;

						.tab {
							padding: 6rpx 14rpx;
							border: 1px solid #999999;
							border-radius: 8rpx;
						}
					}

					.distance {
						color: #999999;
						padding-top: 12rpx;

						image {
							width: 20rpx;
							height: 20rpx;
							margin-right: 6rpx;
						}
					}
				}

				.mgb {
					margin-bottom: 10rpx;
				}

				.text {
					color: #888;
					max-width: 400rpx;
				}

				.voucher {
					padding-top: 20rpx;
					flex-wrap: wrap;

					.piece {
						font-size: 22rpx;
						line-height: 2.2;
						padding: 0 20rpx;
						background-color: #FFF5EC;
						margin-right: 10rpx;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						margin-bottom: 10rpx;
						color: #FF7827;
					}
				}

				.taketo {
					image {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.jineng {
					.piece {
						padding: 0 10rpx;
						color: #FF5648;
						border: 2rpx solid #FF5648;
						margin-right: 20rpx;
						flex-wrap: wrap;
						line-height: 1.5;
					}
				}

				.btn {
					line-height: 2;
					font-size: 28rpx;
					padding: 0 40rpx;
					margin-left: 20rpx;
					border: 2rpx solid #aaa;
					border-radius: 30rpx;
				}
			}
		}
	}

	.pop-right {
		padding: 0 30rpx;
		padding-bottom: 88rpx;

		/* #ifdef MP-WEIXIN */
		padding-top: 88rpx;

		/* #endif */
		.list-box {
			display: flex;
			flex-wrap: wrap;
			margin: 50rpx 0;

			.pop-right-list {
				width: 140rpx;
				line-height: 70rpx;
				text-align: center;
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				margin-right: 20rpx;
				color: #333333;
				background-color: #F6F6F6;
			}

			.active-list {
				color: #FF8D1E;
				background-color: #FFF5EC;
			}
		}

	}

	.sub {
		width: 100%;
		line-height: 100rpx;
		display: flex;
		text-align: center;
		position: absolute;
		bottom: 0;
		border-top: 1px solid #E9EAEC;

		.cancel,
		.confirm {
			flex: 1;
		}

		.confirm {
			color: #fff;
			padding-left: 2rpx;
			background: linear-gradient(270deg, #FEB980 0%, #EFD05B 100%);
		}
	}
</style>
