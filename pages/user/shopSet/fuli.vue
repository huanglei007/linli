<template>
	<view>
		<view class="typeBox flexd jucenter">
			<view class="item" v-for="(item,i) in typeList" :key="i" :class="typeIndex==i?'active':''"
				@click="typeIndex=i">
				{{item}}
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,i) in list" :key="i" :class="item.isDelect==1?'hide':''"
				v-if="item.isDelete == 0">
				<view class="flexd juend">
					<image @click="del(i)" class="icon32" src="/static/image/icon_jian.png" mode="widthFix"></image>
				</view>
				<view class="itemBox flexd jucenter flex-center">
					<view class="input">
						<input type="text" v-model="item.left" :placeholder="typeIndex==0?'请输入现价':'请输入消费满额'" />
					</view>
					<view class="center">
						{{typeIndex==0?'抵':'减'}}
					</view>
					<view class="input">
						<input type="text" v-model="item.right" :placeholder="typeIndex==0?'请输入原价':'请输入减额'" />
					</view>
				</view>
				<view class="itemBox flexd jucenter flex-center">
					<picker class="input" mode="date" :value="item.begin" @change="bindDateChange($event,item,'begin')">
						<view class="uni-input">{{item.begin}}</view>
					</picker>
					<view class="center">
						-
					</view>
					<picker class="input" mode="date" :value="item.end" @change="bindDateChange($event,item,'end')">
						<view class="uni-input">{{item.end}}</view>
					</picker>
				</view>
			</view>
			<view class="item flexd jucenter">
				<image @click="newArr" class="add" src="/static/image/icon_add.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="foot">
			<view class="btn" @click="$shake(submit)">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				typeList: ['代金券', '优惠券'],
				typeIndex: 0,
				list: [],
				// 防抖
				onoff: true
			}
		},
		mounted() {
			this.userId = uni.getStorageSync('userId')
			this.getList()
		},
		watch: {
			typeIndex(newVal, oldVal) {
				this.typeIndex = newVal
				this.getList()
			}
		},
		methods: {
			bindDateChange: function(e, item, key) {
				item[key] = e.target.value
			},
			getList() { // 券列表
				this.list = []
				let that = this
				let date = new Date().getFullYear()
				if (this.typeIndex == 0) {
					this.util.ajax('shop/getVouchers', {
						userId: this.userId
					}, res => {
						if (res.data.list.length > 0) {
							that.list = res.data.list.map(item => {
								return {
									left: item.present_price,
									right: item.original_price,
									begin: item.begin_time,
									end: item.expiration_time,
									begin: date + '-' + that.$shijiandate(item.begin_time),
									end: date + '-' + that.$shijiandate(item.expiration_time),
									id: item.id,
									isDelete: 0,
								}
							})
						}
					})
				} else {
					this.util.ajax('shop/getCoupons', {
						userId: this.userId
					}, res => {
						if (res.data.list.length > 0) {
							that.list = res.data.list.map(item => {
								return {
									left: item.min_order_amount,
									right: item.amount,
									begin: date + '-' + that.$shijiandate(item.begin_time),
									end: date + '-' + that.$shijiandate(item.expiration_time),
									id: item.id,
									isDelete: 0,
								}
							})
						}
					})
				}
			},
			newArr() { // 添加券
				this.list.push({
					left: '',
					right: '',
					begin: '开始时间',
					end: '结束时间',
					isDelete: 0,
				})
			},
			del(e) { // 删除券
				let that = this
				if (that.list[e].id) {
					that.list[e].isDelete = 1
				} else {
					that.list.splice(e, 1)
				}
			},
			submit() { // 保存券
				let that = this
				let data = []
				let url = ''
				let open = false
				if (that.typeIndex == 0) {
					url = 'shop/saveVoucher'
					data = that.list.map(item => {
						if (item.begin == '开始时间' || item.end == '结束时间' || !item.right || !item.left) {
							open = true
						} else {
							open = false
							return {
								beginTime: item.begin,
								expirationTime: item.end,
								isDelete: item.isDelete,
								originalPrice: item.right,
								presentPrice: item.left,
								voucherName: '',
								id: item.id
							}
						}
					})
				} else {
					url = 'shop/saveCoupon'
					data = that.list.map(item => {
						if (item.begin == '开始时间' || item.end == '结束时间' || !item.right || !item.left) {
							open = true
						} else {
							open = false
							return {
								beginTime: item.begin,
								expirationTime: item.end,
								isDelete: item.isDelete,
								amount: item.right,
								minOrderAmount: item.left,
								couponName: '',
								id: item.id
							}
						}
					})
				}
				if (open == true) {
					this.$alert('请输入完成')
				} else {
					this.util.ajax(url, {
						list: data,
						userId: that.userId
					}, res => {
						that.$alert(res.msg)
						that.getList()
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.typeBox {
		margin-bottom: 60rpx;

		.item {
			color: #989898;
			border: 1rpx solid #e5e5e5;
			font-size: 30rpx;
			text-align: center;
			width: 150rpx;
			line-height: 2;

			&.active {
				color: #212121;
				background-color: $uni-color-primary;
				border-color: $uni-color-primary;
			}
		}
	}

	.list {
		.hide {
			display: none;
		}

		.item {
			background-color: #fff;
			border-radius: 30rpx;
			padding: 10rpx;
			margin-bottom: 20rpx;

			.icon32 {
				margin-bottom: 10rpx;
			}

			.itemBox {
				margin-bottom: 20rpx;
			}

			.input {
				width: 40%;
				background-color: #F5F5F5;
				padding: 20rpx;
				box-sizing: border-box;
			}

			.add {
				width: 60rpx;
			}

			.center {
				width: 10%;
				font-size: 30rpx;
				color: #FF581E;
				text-align: center;
			}
		}
	}

	.foot {
		width: 70%;
		margin: 50rpx auto;

		.btn {
			background-color: $uni-color-primary;
			line-height: 2.8;
			text-align: center;
			border-radius: 50rpx;
			font-size: 32rpx;
		}
	}
</style>
