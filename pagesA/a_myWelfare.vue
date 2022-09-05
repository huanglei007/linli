<template>
	<view class="welfare">
		<view v-if="!select" class="head">
			<uni-segmented-control @clickItem="shopTypeChange" :current="index"
				:values="typelist.map(value => value.label)" styleType="text" activeColor="#FF8D1E">
			</uni-segmented-control>
		</view>
		<view class="body">
			<radio-group>
				<label class="listbox" v-for="(item,index) in coupons" :key="index" @click="listClickEvent(index)">
					<view class="list flexd flex-center jubetween" :key="index"
						:class="{'out-text':item.use_status != 0}">
						<view class="status" :class="{'out-status':item.use_status != 0}">
							<text v-if="item.use_status == 1">已使用</text>
							<text v-else-if="item.use_status == 2">已过期</text>
							<text v-else>未使用</text>
						</view>
						<view class="list-left">
							<text>￥</text>
							<text style="font-size:70rpx;">{{item.amount}}</text>
						</view>
						<view class="list-right">
							<view class="title">
								<text class="font36">{{item.coupon_name}}</text>
							</view>
							<view class="time">
								<uni-dateformat class="font24 fontColor-999" :date="item.expiration_time"
									format="yyyy/MM/dd"></uni-dateformat>
								<text class="font24 fontColor-999">到期</text>
							</view>
							<view class="type">
								<text class="font24 fontColor-999">帮送外卖/帮取快递/帮丢垃圾</text>
							</view>
						</view>
					</view>
					<view v-if="select">
						<radio :value="String(item.id)" :checked="index === current" />
					</view>
				</label>
			</radio-group>
		</view>

		<view v-if="select" class="sub">
			<text class="sub-btn" @click="confirm">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 类别
				typelist: [{
					id: 0,
					label: '全部',
				}, {
					id: 1,
					label: '未使用',
				}, {
					id: 2,
					label: '已使用',
				}, {
					id: 3,
					label: '已过期',
				}],
				index: 0,
				// 优惠券
				coupons: [],
				// 是否进入选择模式
				select: false,
				// 当前选择
				current: null,
				// 分页
				curPage: 1,
				isfoot: false,
				// 上一页的参数
				param: {}
			}
		},
		onLoad(e) {
			this.getDiscount()
			if (e.price) {
				this.param = e
				this.select = true
				if (e.coup_id) {
					setTimeout(() => {
						for (let i = 0; i < this.coupons.length; i++) {
							if (this.coupons[i].id == parseInt(e.coup_id)) {
								this.current = i
							}
						}
					}, 500)
				}
			}
		},
		onReachBottom() {
			if (!this.isfoot && this.select == false) {
				this.curPage++
				this.getDiscount()
			}
		},
		watch: {
			select(newVal, oldVal) {
				this.select = newVal
				if (newVal == true) {
					let data = this.coupons
					let arr = []
					for (let i = 0; i < data.length; i++) {
						if (this.param.price >= data[i].min_order_amount && data[i].use_status == 0) {
							arr.push(data[i])
						}
					}
					this.coupons = arr
				}
			}
		},
		methods: {
			// 获取跑腿卷
			getDiscount() {
				uni.showLoading({
					title: '',
					mask: false
				});
				let that = this;
				this.util.ajax('release/errandCouponList', {
					"type": that.typelist[that.index].id,
					"curPage": that.curPage,
					"pageSize": 15,
					"userId": uni.getStorageSync('userId')
				}, res => {
					uni.hideLoading()
					if (this.coupons.length > 0) {
						this.coupons = this.coupons.concat(res.data.coupon)
					} else {
						this.coupons = res.data.coupon
					}
				})
			},
			// 切换状态
			shopTypeChange(e) {
				let that = this;
				that.index = e.currentIndex;
				that.curPage = 1;
				that.coupons = [];
				this.getDiscount();
			},
			// 点击优惠券
			listClickEvent(index) {
				let that = this
				if (that.current == index) {
					that.current = null
				} else {
					that.current = index
				}
			},
			// 确定优惠券
			confirm() {
				let that = this
				// #ifdef APP-NVUE
				const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
				// #endif
				// #ifndef APP-NVUE
				const eventChannel = this.getOpenerEventChannel();
				// #endif
				// 给上一页面传递数据
				eventChannel.emit('acceptDataFromOpenedPage', {
					data: that.coupons[that.current]
				});
				uni.navigateBack()

				// let data_url = '&coup_id=' + this.coupons[this.current].id
				// let par_url = '&num_id=' + this.param.num_id
				// uni.redirectTo({
				// 	url: '/pages/from/apply?id=' + this.param.id + par_url + data_url
				// });
			}
		}
	}
</script>

<style lang="less">
	.head {
		padding: 20rpx 0;
		background-color: #fff;
	}

	.body {
		padding: 0 30rpx;
		padding-bottom: 150rpx;

		.listbox {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.list {
			flex: 1;
			position: relative;
			margin: 0 15rpx 0 0;
			padding: 20rpx 0;
			background-image: url('/static/img/img_xrfl_list.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			border-radius: 28rpx;

			.list-left {
				width: 35%;
				color: #FF8740;
				text-align: center;
			}

			.list-right {
				width: 60%;
				margin-left: 5%;
			}
		}
	}

	.status {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0 10rpx;
		border-radius: 28rpx 0 28rpx 0;
		background-color: #FF8740;

		text {
			font-size: 24rpx;
			color: #fff;
		}
	}


	.out-text {
		text {
			color: #BBBEC4;
		}
	}


	.out-status {
		background-color: #BBBEC4;

		text {
			color: #fff;
		}
	}

	.sub {
		width: 100vw;
		padding: 40rpx 0;
		background-color: #fff;
		border-top: 1px solid #D4D4D4;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2;
		box-shadow: 0px 6rpx 30rpx #888888;

		.sub-btn {
			margin: 30rpx 0;
			padding: 20rpx 100rpx;
			background: linear-gradient(180deg, #FDEC7E 0%, #F9D448 100%);
			border-radius: 12px;
		}
	}
</style>
