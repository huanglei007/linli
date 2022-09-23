<template>
	<view class="content">
		<view class="row flexd" :style="{marginTop:20+'rpx'}">
			<view>姓名</view>
			<input class="input" type="text" v-model="username" placeholder="请输入姓名" placeholder-style="color:#888888" />
		</view>
		<view class="row flexd flex-center">
			<view>手机号</view>
			<input class="input" type="number" :value="phone" placeholder="手机号码" placeholder-style="color:#888888;"
				maxlength="11" @input="inputchange($event, 'phone')" />
		</view>
		<view class="row flexd">
			<view>所在地区</view>
			<pickerAddress class="flex1-textLeft" :class="{'addressColor':txt!='省市区县、乡镇等'}" @change="change"
				:data="location" style='line-height:110rpx;'>
				<text>{{txt}}</text>
			</pickerAddress>

			<!-- app -->
			<!-- <view class="input" :class="!geted?'gray':''" @click="onChooseLocation">
				{{location?location.address:'选择地址'}}
			</view> -->

			<!-- wx h5 -->
			<!-- <view class="input" :class="!geted?'gray':''" @click="onChooseLocation2">
				{{location?location.name:'选择地址'}}
			</view> -->
		</view>
		<!-- <view class="row flexd">
			<view>所在地区</view>
			<view class="input" @click="onChooseLocation2">
				{{location?location.address:'选择地址'}}
			</view>
		</view> -->
		<view class="row flexd">
			<view>详细地址</view>
			<input class="input" type="text" :value="street" placeholder="街道、牌楼号等" placeholder-style="color:#888888"
				@input="inputchange($event, 'street')" />
		</view>
		<view class="row flexd jubetween" style="margin-top: 16rpx;">
			<view>设为默认</view>
			<view class="take flexd" :class="{takelv:is_default==1}" @click="is_default^=1">
				<view class="yuan"></view>
			</view>
		</view>
		<button class="add-btn" @click="tijiao">保存</button>
	</view>
</template>

<script>
	import pickerAddress from '@/components/wangding-pickerAddres/wangding-pickerAddress.vue'
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				htosp: 0,
				imageurl: '',
				username: '',
				phone: '',
				street: '',
				is_default: 0,
				// 三级联动地址
				txt: '省市区县、乡镇等',
				id: 0,
				prov_id: 0,
				city_id: 0,
				area_id: 0,
				// 定位
				location: {
					point: {
						longitude: 22.22222,
						latitude: 22.22222,
					},
					address: '请选择地图定位',
					name: '请选择地图定位'
				},
				geted: false,
			}
		},
		onLoad(option) {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.imageurl = this.globalData.imageurl;
			if (option.id) {
				uni.setNavigationBarTitle({
					title: '修改地址'
				});
				let that = this
				that.id = option.id
				that.util.ajax('address/queryAddressById', {
					id: that.id
				}, function(res) {
					that.username = res.data.name
					that.phone = res.data.phone
					that.is_default = res.data.is_default
					that.location = {
						point: {
							longitude: res.data.longitude,
							latitude: res.data.latitude,
						},
						address: res.data.address,
						name: res.data.address_abbreviation
					}
					that.geted = true
					that.street = res.data.address_detail
				})
			}
		},
		onShow() {
			// #ifdef APP-PLUS
			uni.$once('location', (data) => {
				this.geted = true
				this.location = data;
				this.$forceUpdate()
			});
			// #endif
		},
		methods: {
			change(e) {
				this.txt = e.data.join(' ')
				this.prov_id = e.index[0]
				this.city_id = e.index[1]
				this.area_id = e.index[2]
			},
			// 微信定位
			onChooseLocation2() {
				let that = this
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success(response) {
						uni.chooseLocation({
							latitude: response.latitude,
							longitude: response.longitude,
							keyword: response.address ? response.address.city + response.address.district +
								response.address.street : '',
							success: res => {
								that.geted = true
								that.location = {
									point: {
										longitude: res.longitude,
										latitude: res.latitude,
									},
									address: res.address,
									name: res.name
								}
							}
						})
					},
					fail(err) {
						plus.nativeUI.toast('读取当前地理位置失败');
					}
				});
			},
			// 高德定位
			onChooseLocation() {
				uni.navigateTo({
					url: '/pages/chooselocation/index',
				});
			},
			// 输入框监听
			inputchange(e, flag) {
				let that = this
				if (flag == 'phone') {
					that.phone = e.target.value
				} else if (flag == 'street') {
					that.street = e.target.value
				}
			},
			// 保存地址
			tijiao() {
				if (this.username == '') {
					this.$alert('请填写收货人姓名')
					return
				}
				if (this.phone == '') {
					this.$alert('请填写收货人手机号码')
					return
				}
				if (this.phone.length != 11) {
					this.$alert('请正确填写收货人手机号码')
					return
				}
				// if (!this.geted) {
				// 	this.$alert('请定位您的收货地址')
				// 	return
				// }
				if (this.txt == '省市区县、乡镇等' || this.street == '') {
					this.$alert('请填写所在地区与详细地址')
					return
				}
				let that = this
				let text = this.txt.split(' ')
				let address_A = ''
				if (text[0] != text[1]) {
					address_A = text[0] + '省' + text[1] + '市' + text[2]
				} else {
					address_A = text[1] + '市' + text[2]
				}
				// 获取经纬度
				// let address = that.txt + that.street
				let address = address_A + that.street
				that.util.ajax('address/queryLatitudeAndLongitudeByAddress', {
					address: address
				}, function(res) {
					// 保存地址
					let geocode = res.data.addressMap.geocodes[0]
					if (that.id != 0) {
						that.util.ajax('address/updateAddress', {
							"id": that.id,
							"isDefault": that.is_default,
							"name": that.username,
							"phone": that.phone,
							"userId": that.userId,
							"longitude": geocode.location.split(',')[0],
							"latitude": geocode.location.split(',')[1],
							"address": that.txt,
							"addressDetail": that.street,
							"address_abbreviation": address_A,
							// "address": that.location.address,
							// "address_abbreviation": that.location.name,
							// "latitude": that.location.point.latitude,
							// "longitude": that.location.point.longitude,
						}, function(res) {
							that.$alert(res.msg)
							that.$emit('refresh')
							// #ifdef APP-NVUE
							const eventChannel = that.$scope.eventChannel; // 兼容APP-NVUE
							// #endif
							// #ifndef APP-NVUE
							const eventChannel = that.getOpenerEventChannel();
							// #endif
							eventChannel.emit('acceptDataFromOpenedPage', true);
							setTimeout(() => {
								that.$jumpback()
							}, 500)
						})
					} else {
						that.util.ajax('address/addAddress', {
							"isDefault": that.is_default,
							"name": that.username,
							"phone": that.phone,
							"userId": that.userId,
							"longitude": geocode.location.split(',')[0],
							"latitude": geocode.location.split(',')[1],
							"address": that.txt,
							"addressDetail": that.street,
							"address_abbreviation": address_A,
							// "address": that.location.address,
							// "address_abbreviation": that.location.name,
							// "latitude": that.location.point.latitude,
							// "longitude": that.location.point.longitude,
						}, function(res) {
							that.$alert('保存地址成功')

							// #ifdef APP-NVUE
							const eventChannel = that.$scope.eventChannel; // 兼容APP-NVUE
							// #endif
							// #ifndef APP-NVUE
							const eventChannel = that.getOpenerEventChannel();
							// #endif
							eventChannel.emit('acceptDataFromOpenedPage', true);
							setTimeout(function() {
								that.$jumpback()
							}, 500);
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.toptype {
		.titlaa {
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			margin-left: 20rpx;
		}
	}

	.row {
		padding: 0 30upx;
		min-height: 110upx;
		background: #fff;
		color: #888888;

		.flex1-textLeft {
			font-size: 32rpx;
			font-weight: 400;
		}

		.addressColor {
			color: #212121;
		}

		view {
			width: 180rpx;
			margin: auto 0;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
		}

		.input {
			flex: 1;
			font-size: 32rpx;
			color: #212121;
			margin: auto 0;

			.uni-input-placeholder {
				font-weight: 400;
				font-size: 32rpx !important;
			}

			&.gray {
				color: #808080;
			}
		}

		.take {
			width: 85rpx;
			height: 54rpx;
			border-radius: 40rpx;
			background: #E9E9EA;
			margin: auto 0;

			.yuan {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				background: #C9C9C9;
				border: 1rpx solid #c9c9c9;
			}
		}

		.takelv {
			background: $uni-color-primary !important;

			.yuan {
				margin-left: auto;
				background-color: #fff;
			}
		}
	}

	.add-btn {
		width: 690rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: $uni-color-primary;
		border-radius: 43rpx;
		font-size: 34rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		margin: 200rpx auto;
	}
</style>
