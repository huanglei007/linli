<template>
	<view class="content">
		<view class="bigTitle" :style="{paddingTop: htosp+'px'}">
			接单大厅
		</view>
		<view class="menu">
			<swiper :indicator-dots="true" :duration="200" :style="{'height':swiperHeight+'px'}">
				<swiper-item v-for="(d,i) in  menuList" :key="i">
					<view class="menuBox flexd">
						<view id="itemList" class="item" v-for="(item,index) in d" :key="index"
							@click="typeClick(item)">
							<view class="image">
								<image :src="Img(item.icon)" mode=""></image>
							</view>
							<view class="title">
								{{item.category_name}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="searchType flexd jubetween">
			<view class="item" @click="ability='全部';allList()" :class="{'active':ability=='全部'}">
				全部
			</view>
			<view class="item" @click="ability='需求';" :class="{'active':ability=='需求'}">
				<picker class="picker" @change="bindPickerChange" :value="classfyIndex" :range="classfy"
					range-key="category_name">
					<view class="uni-input">{{classfy[classfyIndex].category_name||'需求类别'}}</view>
				</picker>
				<image src="/static/image/icon_xw.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="ability='佣金';commissionSort=commissionSort^1;getNewList()"
				:class="{'active':ability=='佣金'}">
				佣金
				<image src="/static/image/icon_xw.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="ability='距离';" :class="{'active':ability=='距离'}">
				<picker class="picker" @change="bindPickerChange2" :value="rangeIndex" :range="range" range-key="name">
					<view class="uni-input">{{range[rangeIndex].name}}</view>
				</picker>
				<image src="/static/image/icon_xw.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="list">
			<list :list="shopList"></list>
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
				htosp: 0,
				menuList: [],
				classfy: [{
					category_name: '需求类别',
					id: 0
				}],
				classfyIndex: 0,
				range: [{
					name: '距离',
					id: 0
				}],
				rangeIndex: 0,
				shopChoise: 0,
				shopList: [],
				curPage: 1,
				commissionSort: 0,
				isfoot: false,
				// swiper高度
				swiperHeight: '',
				// 功能分类
				ability: '全部',
			}
		},
		mounted() {
			// swiper高度适应
			this.$nextTick(() => {
				this.setSwiperHeight();
			});
		},
		onLoad() {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.getTypeList()
			this.getDistance()
		},
		onShow() {
			this.classfyIndex = 0
			this.getNewList()
			this.setSwiperHeight();
		},
		onReachBottom() {
			if (!this.isfoot) {
				this.curPage++
				this.getlist()
			}
		},
		watch: {},
		methods: {
			// 获取列表数据
			getlist() {
				let that = this
				this.util.ajax('release/releaseList', {
					"categoryId": this.classfy[this.classfyIndex].id,
					"commissionSort": this.commissionSort,
					"curPage": this.curPage,
					"distanceValue": this.range[this.rangeIndex].value,
					"pageSize": 20,
					"userId": this.userId
				}, (res) => {
					if (that.curPage !== res.data.page.curPage) that.isfoot = true
					if (that.curPage == res.data.page.curPage) {
						that.shopList = that.shopList.concat(res.data.list.map((e) => {
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
					uni.setStorageSync('orderList', that.shopList)
				})
			},
			// 需求类别列表
			getTypeList() {
				let that = this
				this.util.ajax('release/categoryList', {}, (res) => {
					that.classfy = that.classfy.concat(res.data.list)
					let arr = []
					for (let i = 0; i < res.data.list.length / 15; i++) {
						arr.push(res.data.list.slice(i * 15, i * 15 + 15))
					}
					this.menuList = arr
				})
			},
			// 距离配置列表
			getDistance() {
				let that = this
				this.util.ajax('release/distanceConfigList', {}, (res) => {
					that.range = that.range.concat(res.data.list)
				})
			},
			// 接单类别筛选
			typeClick(data) {
				let that = this
				let list = this.menuList
				for (let i = 0; i < list.length; i++) {
					for (let a = 0; a < list[i].length; a++) {
						if (list[i][a].category_name == data.category_name) {
							if (i == 0) {
								that.classfyIndex = a + 1;
							} else {
								that.classfyIndex = a + 1 + 15;
							}
						}
					}
				}
				this.getNewList();
			},
			allList() {
				this.classfyIndex = 0
				this.getNewList()
			},
			bindPickerChange: function(e) {
				this.classfyIndex = e.target.value
				this.getNewList()
			},
			bindPickerChange2: function(e) {
				this.rangeIndex = e.target.value
				this.getNewList()
			},
			getNewList() {
				let that = this
				let datas = uni.getStorageSync('orderList')
				if (datas[0]&&that.classfyIndex==0) {
					that.shopList = datas
				} else {
					that.shopList = []
					that.curPage = 1
					that.getlist()
				}
			},
			// swiper高度适应
			setSwiperHeight() {
				let that = this;
				let query = uni.createSelectorQuery().in(this);
				query.select('#itemList').boundingClientRect();
				query.exec(res => {
					if (res && res[0]) {
						// #ifdef APP-PLUS || H5
						that.swiperHeight = (res[0].height + 2) * 3
						// #endif
						// #ifdef MP-WEIXIN
						that.swiperHeight = (res[0].height + 5) * 3
						// #endif
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #f5f5f5;
		position: relative;

		.bigTitle {
			font-size: 32rpx;
			font-weight: bold;
			background-color: $uni-color-primary;
			padding: 30rpx;
		}

		.menu {
			position: relative;
			z-index: 1;
			background-color: #fff;
			padding: 20rpx;
			flex-wrap: wrap;
			/* #ifdef MP-WEIXIN */
			padding-bottom: 0;
			/* #endif */
			.menuBox {
				flex-wrap: wrap;
			}

			.item {
				flex: 0 0 20%;
				text-align: center;
				padding-bottom: 20rpx;

				image {
					width: 100rpx;
					height: 100rpx;
				}

				.image {
					position: relative;
				}

				.tag {
					width: 56rpx;
					position: absolute;
					top: 0;
					right: 0rpx;
				}

				.title {
					font-size: 28rpx;
					color: #505050;
				}
			}
		}

		.cenhead {
			padding: 30rpx;

			image {
				width: 50rpx;
			}

			image.center {
				width: 180rpx;
				margin: 0 20rpx;
			}

			.more {
				color: #888;

				image {
					width: 20rpx;
					height: 15rpx;
				}
			}
		}

		.classify {
			margin-bottom: 30rpx;

			.scroll {
				padding-left: 30rpx;
			}

			.item {
				min-width: 100rpx;
				flex: none;
				padding: 0 20rpx;
				text-align: center;
				background-color: #fff;
				line-height: 1.8;
				font-size: 28rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;

				&.active {
					background-color: #FF5648;
					color: #fff;
				}
			}
		}

		.searchType {
			padding: 30rpx;

			.item {
				display: flex;
				align-items: center;
				color: #888;
				font-size: 28rpx;

				image {
					width: 10rpx;
					margin-left: 10rpx;
				}

				.uni-input {
					color: #888;
					font-size: 28rpx;
				}

				&.active {
					color: #202020;
					border-bottom: 3rpx solid $uni-color-primary;
					font-weight: bold;

					.uni-input {
						color: #202020;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
