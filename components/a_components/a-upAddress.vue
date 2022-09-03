<template>
	<view class="baojie-yuyue-address">
		<view class="baojie-yuyue-address-title">
			<text class="font30" v-if="title=='交接方式'">交接方式</text>
			<text class="font30" v-else>上门地址</text>
			<image v-if="addressForm.address&&title=='上门地址'" class="icon32" src="/static/img/icon_edit.png" mode=""
				@click="$jump('/pages/user/address')">
			</image>
		</view>
		<view class="baojie-yuyue-address-list">
			<view v-if="title=='交接方式'" class="peihu-yuyue-handover-address-radio"
				:class="!addressForm.address?'marginDown':''">
				<text class="radio1" :class="{'mode-active':modeIndex == 0}" @click="modeIndex=0">
					上门服务
				</text>
				<text class="radio2" :class="{'mode-active':modeIndex == 1}" @click="modeIndex=1">
					指定位置
				</text>
			</view>
			<view class="wrapper" v-if='addressForm.address'>
				<view class="address-box flexd">
					<text class="titas" style="margin-right: 69rpx;">{{addressForm.name}}</text>
					<view class="flexd">
						<view class="titas">{{$hidePhone(addressForm.phone)}}</view>
						<view class="moren texcenter" v-if="addressForm.is_default == 1">
							<text>默认</text>
						</view>
					</view>

					<image v-if="addressList.length>0&&title=='交接方式'" class="icon32" src="/static/img/icon_edit.png"
						mode="" @click="$jump('/pages/user/address')"></image>

				</view>
				<view class="shengray">{{addressForm.address}} {{addressForm.address_detail}}</view>
			</view>

		</view>
		<view class="baojie-yuyue-address-add" v-if="!addressForm.address">
			<view class="addbtn" @click="$jump('/pages/user/address')">
				<text>+ 添加地址</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['upAddressId'],
		data() {
			return {
				// 监听是否切换为-交接方式，默认-上门地址
				title: '上门地址',
				// 选中的地址
				addressForm: {},
				// 我的地址列表
				addressList: [],
				// 交接方式
				modeIndex: 0,
			}
		},
		created() {
			this.loadmore();
			this.getIndexUrl();
		},
		watch: {
			// 传值给父组件
			addressForm(newVal, oldVal) {
				setTimeout(() => {
					// #ifdef H5 
					this.$parent.$parent.getSubComponentData(this.title, newVal, this.modeIndex)
					// #endif
					// #ifdef APP-PLUS || MP-WEIXIN
					this.$parent.getSubComponentData(this.title, newVal, this.modeIndex)
					// #endif
				}, 300)
			},
			// 我的地址列表
			addressList(newVal, oldVal) {
				for (let i = 0; i < newVal.length; i++) {
					if (newVal[i].is_default == 1) {
						this.addressForm = newVal[i]
					}
				}
			},
			// 上门地址ID
			upAddressId(newVal, oldVal) {
				for (let i = 0; i < this.addressList.length; i++) {
					if (this.addressList[i].id == newVal) {
						this.addressForm = this.addressList[i]
					}
				}
			},
		},
		methods: {
			// 获取地址
			loadmore() {
				let that = this
				that.util.ajax('address/myAddress', {
					userId: uni.getStorageSync('userId')
				}, function(res) {
					that.addressList = res.data.list
				})
			},

			// 判断当前路由
			getIndexUrl() {
				let that = this;
				let currentRoutes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let currentRoute = currentRoutes[currentRoutes.length - 1].route //获取上一个页面路由
				let currentParam = currentRoutes[currentRoutes.length - 1].options; //获取上一个页面路由参数

				if (currentRoute == 'pagesA/a_maogou_yuyue') {
					that.title = '交接方式'
				} else {
					that.title = '上门地址'
				}
			}
		}
	}
</script>

<style lang="less">
	.baojie-yuyue-address {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;

		.baojie-yuyue-address-title {
			display: flex;
			justify-content: space-between;
		}

		.baojie-yuyue-address-add {
			padding: 40rpx 0;
			text-align: center;
		}
	}

	.peihu-yuyue-handover-address-radio {
		text-align: center;
		margin-top: 35rpx;
		margin-bottom: 25rpx;

		.mode-active {
			color: #fff;
			background-color: #FF8D1E;
		}
	}

	.marginDown {
		margin-bottom: 80rpx;
	}

	.radio1,
	.radio2 {
		padding: 15rpx 55rpx;
		border: 1rpx solid #E5E5E5;
		background-color: #fff;
	}

	.radio1 {
		border-radius: 10px 0px 0px 10px;
		border-right: none;
	}

	.radio2 {
		border-radius: 0px 10px 10px 0px;
		border-left: none;
	}

	.addbtn {
		color: #FF8D1E;
		display: inline-block;
		padding: 15rpx 25rpx;
		text-align: center;
		border: 1px solid #FF8D1E;
		border-radius: 12rpx;
	}

	.wrapper {
		background: #fff;
		padding: 30rpx;
		position: relative;

		.address-box {
			position: relative;

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

			.icon32 {
				position: absolute;
				right: 0;
			}
		}

		.shengray {
			width: 558rpx;
			margin-top: 10rpx;
		}
	}
</style>
