<template>
	<view class="content">
		<view class="head">
			<view class="homeBg">
				<image :src="imageurl+'static/image/ruzhu.png'" mode="widthFix"></image>
			</view>
			<view class="backs" @click="$jumpback()" :style="{top: htosp+'px'}">
				<image src="/static/image/icon_fh.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="picBox">
			<view class="title">
				商家类型
			</view>
			<view class="flexd flex-center jubetween">
				<view class="item">
					<picker :value="typeIndex" :range="typeList" range-key="name" @change="bindPickerChange2">
						<view class="uni-input">{{typeList[typeIndex]?typeList[typeIndex].name: ''}}</view>
					</picker>
				</view>
				<view class="item">
					<picker :value="saleIndex" :range="saleType" range-key="name" @change="bindPickerChange3">
						<view class="uni-input">{{saleType[saleIndex]?saleType[saleIndex].name: ''}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">商家名称</view>
				<input class="input" type="text" v-model="formdata.shopName" placeholder="请输入店铺名称"
					placeholder-style="color:#878787" />
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">押金</view>
				<radio-group class="flexd" @change="radioChange" style="transform:scale(0.9)">
					<label class="flexd flex-center" style="padding-right: 30rpx;" v-for="(item, index) in deposit_arr"
						:key="item.value">
						<view>
							<radio :value="item.value" :checked="item.value == deposit_index" />
						</view>
						<view>{{item.text}}</view>
					</label>
				</radio-group>
			</view>
			<view v-if="deposit_index=='1'" class="item flexd flex-center">
				<view class="label">押金金额</view>
				<picker @change="depositChange" :value="deposit_array_index" :range="deposit_array" range-key="amount">
					<view class="uni-input">{{deposit_array[deposit_array_index].amount}}</view>
				</picker>
			</view>
		</view>
		<view class="form">
			<!-- #ifdef APP-PLUS -->
			<view class="item right flexd flex-center" @click="onChooseLocation">
				<view class="label">商家地址</view>
				<view class="address">{{location.address?location.address:'选择地址'}}</view>
				<image class="right" src="/static/image/icon_gd.png" mode="widthFix"></image>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || H5 -->
			<view class="item right flexd flex-center" @click="onChooseLocation2">
				<view class="label">商家地址</view>
				<view class="address">{{location.address?location.address:'选择地址'}}</view>
				<image class="right" src="/static/image/icon_gd.png" mode="widthFix"></image>
			</view>
			<!-- #endif -->
			<view class="item flexd flex-center">
				<view class="label">详细地址</view>
				<input class="input" type="text" v-model="formdata.houseNumber" placeholder="请输入门牌号"
					placeholder-style="color:#878787" />
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">运营点</view>
				<picker :value="operationIndex" :range="operation" range-key="operation_point_name"
					@change="bindPickerChange4">
					<view class="uni-input">
						{{operation[operationIndex]?operation[operationIndex].operation_point_name:''}}
					</view>
				</picker>
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">联系人</view>
				<input class="input" type="text" v-model="formdata.contactName" placeholder="请输入联系人姓名"
					placeholder-style="color:#878787" />
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">联系方式</view>
				<input class="input" type="number" step='1' placeholder="请输入联系方式" placeholder-style="color:#878787;"
					maxlength="11" @input="inputchange($event, 'contactPhone')" />
			</view>
		</view>
		<view class="picBox">
			<view class="title">
				服务时间
			</view>
			<view class="flexd flex-center jubetween">
				<view class="item">
					<time-picker :star="starTime" @change="bindTimeChange">
						<view class="uni-input">{{formdata.serviceBeginTime}}</view>
					</time-picker>
				</view>
				<view class="item">
					<time-picker :star="starTime2" @change="bindTimeChange2">
						<view class="uni-input">{{formdata.serviceEndTime}}</view>
					</time-picker>
				</view>
			</view>
		</view>
		<view class="outBox">
			<view style="font-size: 28rpx;line-height: 1.3;">上传营业执照</view>
			<view class="out">
				<block v-for="(item,index) in imageValue" :key='index'>
					<view class="peop">
						<image :src="Img(item)" mode=""></image>
						<image @click="del(index)" src="/static/image/icon_jian.png" mode="" class="del icon32"></image>
					</view>
				</block>
				<view class="peop" v-if="!imageValue.length" @click="addImg()">
					<image src="/static/image/icon_tj.png" mode="" style="border-radius: 0;"></image>
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="btn" @click="$shake(apply)">
				提交审核
			</view>
		</view>
	</view>
</template>

<script>
	import timePicker from '@/components/timePicker.vue'
	import pickerAddress from '@/components/wangding-pickerAddres/wangding-pickerAddress.vue'
	export default {
		components: {
			pickerAddress,
			timePicker
		},
		data() {
			let starTime = 6
			let starTime2 = starTime + 1
			return {
				imageurl: '',
				userId: '',
				htosp: 0,
				imageValue: [],
				typeList: [],
				typeIndex: 0,
				saleType: [],
				saleIndex: 0,
				operation: [],
				operationIndex: 0,
				starTime,
				starTime2,
				location: {
					point: {
						longitude: 22.22222,
						latitude: 22.22222,
					},
					address: '请选择地图定位',
					name: '请选择地图定位'
				},
				geted: false,
				formdata: {
					shopName: '',
					contactName: '',
					contactPhone: '',
					houseNumber: '',
					serviceBeginTime: '08:00',
					serviceEndTime: '21:00',
				},
				// 押金
				deposit_index: 0,
				deposit_arr: [{
					text: '不交押金',
					value: '0'
				}, {
					text: '交押金',
					value: '1'
				}],
				deposit_array_index: 0,
				deposit_array: [],
				// 防抖
				onoff: true,
			}
		},
		onShow() {
			uni.$once('location', (data) => {
				this.location = data;
			});
		},
		onLoad() {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.imageurl = this.globalData.imageurl

			this.getShopType(0)
			this.getShopType(1)
			this.getOperation()
		},
		methods: {
			// 获取商家类型列表
			getShopType(index) {
				let that = this;
				this.util.ajax('shop/getShopTypeList', {
					"parentId": 0,
					"secondType": index
				}, res => {
					if (index == 0) {
						that.typeList = res.data.list
					} else {
						that.saleType = res.data.list
					}
				})
			},
			// 获取运营点列表
			getOperation() {
				let that = this;
				this.util.ajax('common/operationPointList', {}, res => {
					that.operation = that.operation.concat(res.data.list)
				})
			},
			// 监听是否交押金
			radioChange(e) {
				let that = this;
				that.deposit_index = e.detail.value
				if (e.detail.value == '1') {
					this.util.ajax('shop/queryShopDepositSet', {}, res => {
						that.deposit_array = res.data.list
					})
				}
			},
			// 监听押金金额
			depositChange(e) {
				this.deposit_array_index = e.detail.value
			},
			// 输入框监听
			inputchange(e, val) {
				let that = this
				if (val == 'contactPhone') { // 联系方式
					that.formdata.contactPhone = e.detail.value
				}
			},
			//
			bindPickerChange2: function(e) {
				this.typeIndex = e.target.value
			},
			bindPickerChange3: function(e) {
				this.saleIndex = e.target.value
			},
			bindPickerChange4: function(e) {
				this.operationIndex = e.target.value
			},
			bindTimeChange: function(e) {
				this.formdata.serviceBeginTime = e
				this.updatestarTime()
			},
			updatestarTime() {
				let obj = this.formdata.serviceBeginTime.split(':')
				this.starTime2 = parseInt(obj[0]) + 1
				if (parseInt(this.formdata.serviceEndTime.split(':')[0]) <= this.starTime2) {
					this.formdata.serviceEndTime = this.starTime2 + ':00'
				}
				this.$forceUpdate()
			},
			bindTimeChange2: function(e) {
				this.formdata.serviceEndTime = e
			},
			// 地图定位 app
			onChooseLocation() {
				uni.navigateTo({
					url: '/pages/chooselocation/index',
				});
			},
			// 地图定位 wx
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
			addImg() {
				this.util.sendimage(1 - this.imageValue.length, this.imageValue)
			},
			del(index) {
				this.imageValue.splice(index, 1)
			},
			apply() {
				if (this.formdata.shopName == '') {
					this.$alert('请输入店铺名称')
					return
				}
				if (!this.location.address) {
					this.$alert('请选择地址')
					return
				}
				if (this.formdata.houseNumber == '') {
					this.$alert('请输入店铺门牌号')
					return
				}
				if (this.formdata.contactName == '') {
					this.$alert('请输入联系人姓名')
					return
				}
				if (this.formdata.contactPhone == '') {
					this.$alert('请输入联系人电话')
					return
				}
				if (this.imageValue.length == 0) {
					this.$alert('请上传营业执照')
					return
				}
				let obj = this.formdata

				obj.address = this.location.address //地址
				obj.businessLicense = this.imageValue[0] //营业执照
				obj.contactName = this.formdata.contactName //联系人
				obj.contactPhone = this.formdata.contactPhone //联系电话
				obj.houseNumber = this.formdata.houseNumber //门牌号
				obj.latitude = this.location.point.latitude //维度
				obj.longitude = this.location.point.longitude //经度
				obj.operationPointId = this.operation[this.operationIndex].id //运营点
				obj.serviceBeginTime = this.formdata.serviceBeginTime //开始时间
				obj.serviceEndTime = this.formdata.serviceEndTime //结束时间
				obj.shopName = this.formdata.shopName //商家名称
				obj.shopSubTypeId = this.saleType[this.saleIndex].id //商家子类型
				obj.shopTypeId = this.typeList[this.typeIndex].id //商家类型
				obj.userId = this.userId //用户id
				uni.showLoading({
					title: ''
				})
				let that = this
				that.util.ajax('shop/saveShopSettled', obj, res => {
					if (that.deposit_index == '1') {
						that.util.ajax('shop/submitShopDepositOrder', {
							amount: that.deposit_array[that.deposit_array_index].amount,
							userId: that.userId,
						}, res => {
							// #ifdef APP-PLUS
							let paymentType = 3
							// #endif
							// #ifdef MP-WEIXIN
							let paymentType = 4
							// #endif
							that.util.ajax('pay/toPay', {
								"orderNum": res.data.order_num,
								"payType": 1,
								"paymentType": paymentType,
								"purpose": 5,
								"subject": "押金",
								"userId": that.userId
							}, resx => {
								uni.hideLoading()
								// #ifdef APP-PLUS
								let response = JSON.parse(resx.data)
								// #endif
								uni.requestPayment({
									"provider": "wxpay",
									// #ifdef APP-PLUS
									"orderInfo": {
										"appid": response
											.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
										"noncestr": response.noncestr, // 随机字符串
										"package": response.package, // 固定值
										"partnerid": response.partnerid, // 微信支付商户号
										"prepayid": response.prepayid, // 统一下单订单号 
										"timestamp": response.timestamp, // 时间戳（单位：秒）
										"sign": response.sign // 签名，这里用的 MD5 签名
									},
									// #endif
									// #ifdef MP-WEIXIN
									"timeStamp": resx.data.timeStamp,
									"nonceStr": resx.data.nonceStr,
									"package": resx.data.packageValue,
									"signType": 'MD5',
									"paySign": resx.data.paySign,
									// #endif
									success(e) {
										that.$alert('提交成功')
										setTimeout(() => {
											that.$jumpback()
										}, 1000)
									},
									fail(e) {
										that.$alert('支付失败')
									}
								})
							})
						})
					} else {
						that.$alert('提交成功')
						setTimeout(() => {
							that.$jumpback()
						}, 1000)
					}

				})
			},
		}
	}
</script>

<style lang="scss">
	.head {
		position: relative;

		.backs {
			position: absolute;
			z-index: 1;
			width: 35rpx;
			left: 20rpx;
			margin: 0;

			image {
				width: 100%;
			}

		}

		.homeBg {
			width: 100%;

			image {
				width: 100%;
			}
		}
	}

	.outBox {
		margin: 30rpx;
	}

	.picBox {
		margin: 30rpx;

		.title {
			margin-bottom: 20rpx;
			font-size: 28rpx;
		}

		.item {
			width: 45%;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 10rpx 40rpx;
			box-sizing: border-box;

			.uni-input {
				text-align: center;
				line-height: 2;
				font-size: 28rpx;
				color: #808080;
			}
		}
	}

	.form {
		margin: 30rpx;
		background-color: #fff;
		border-radius: 10rpx;

		.item {
			padding: 10rpx 40rpx;
			border-bottom: 1rpx solid #f5f5f5;
			line-height: 80rpx;
			width: 100%;
			box-sizing: border-box;
			position: relative;

			.right {
				position: absolute;
				right: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 24rpx;
			}

			.label {
				width: 130rpx;

				text {
					font-size: 24rpx;
				}
			}

			&:last-child {
				border-bottom: 1rpx solid #fff;
			}

			view {
				font-size: 28rpx;
			}

			.input {
				width: 400rpx;
				color: #808080;
				padding-left: 20rpx;
			}

			.textarea {
				height: 200rpx;
				padding: 20rpx 0;
			}

			.text {
				color: #808080;
				padding-left: 20rpx;

				image {
					width: 36rpx;
					margin-left: 20rpx;
				}
			}

			.uni-input {
				color: #808080;
				padding-left: 20rpx;
			}

			.address {
				flex: 1;
				padding-left: 20rpx;
				color: #808080;
			}

			&.name {
				input {
					width: 200rpx;
				}
			}

		}

		.time {
			padding: 10rpx 40rpx;

			.timeItem {
				padding: 20rpx;
				width: 230rpx;
				background-color: #f6f6f6;
				text-align: center;
				position: relative;

				&::before {
					content: '';
					position: absolute;
					display: block;
					width: 14rpx;
					height: 22rpx;
					right: 20rpx;
					top: 50%;
					transform: translateY(-50%);
					background-image: url('/static/image/icon_gd.png');
					background-size: cover;
				}

				.uni-input {
					color: #888;
					line-height: 2;
				}
			}
		}

		.gender {
			padding: 0 20rpx;
			width: 240rpx;

			view {
				margin: 0;
				font-size: 24rpx;
			}
		}
	}

	.out {
		display: flex;
		flex-wrap: wrap;

		.peop {
			width: 154rpx;
			height: 154rpx;
			margin: 20rpx 0;
			margin-right: 12rpx;
			position: relative;

			image,
			video {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}

			.del {
				width: 30rpx;
				height: 30rpx;
				position: absolute;
				top: 2rpx;
				right: 2rpx;
			}
		}
	}

	.foot {
		width: 70%;
		margin: 30rpx auto;

		.btn {
			background-color: $uni-color-primary;
			line-height: 2.8;
			text-align: center;
			border-radius: 50rpx;
			font-size: 32rpx;
		}
	}
</style>
