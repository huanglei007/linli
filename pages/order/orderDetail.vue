<template>
	<view class="content">
		<view class="head " :style="{paddingTop: htosp+'px'}">
			<view class="flexd jubetween flex-center">
				<view class="left flexd flex-center">
					<image @click="$jumpback()" class="backs" src="/static/image/icon_gb.png" mode=""></image>
					{{formdata.categoryName||'订单详情'}}
				</view>
			</view>
		</view>
		<!-- 旧版 2022-4 -->
		<view class="old"
			v-if="formdata.categoryId!=9&&formdata.categoryId!=10&&formdata.categoryId!=11&&formdata.categoryId!=15&&formdata.categoryId!=19">
			<view class="form">
				<view class="address flexd jubetween flex-center"
					@click="daohang(formdata.address,formdata.latitude,formdata.longitude)" v-if="formdata.address">
					<view class="icon">
						<image src="/static/image/icon_q.png" mode="widthFix"></image>
					</view>
					<view class="text">
						{{formdata.address}}
					</view>
					<view class="more">
						<image src="/static/image/icon_dw.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="address flexd jubetween flex-center"
					@click="daohang(formdata.deliveryAddress,formdata.deliveryLatitude,formdata.deliveryLongitude)"
					v-if="formdata.deliveryAddress">
					<view class="icon">
						<image src="/static/image/icon_s.png" mode="widthFix"></image>
					</view>
					<view class="text">
						{{formdata.deliveryAddress}}
					</view>
					<view class="more">
						<image src="/static/image/icon_dw.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.distance">
					<view class="item name flexd flex-center jubetween">
						<view class="label">距离</view>
						<view class="text">{{formdata.distance}}</view>
					</view>
				</view>
			</view>
			<view class="form">
				<view class="flexd jubetween">
					<view class="item name flexd flex-center jubetween">
						<view class="label">发布人</view>
						<view class="text">{{formdata.publisherName}}<!-- /{{formdata.publisherSex?'女士':'先生'}} -->
						</view>
					</view>
				</view>
				<view class="item flexd flex-center jubetween">
					<view class="label">手机号</view>
					<view class="text flexd flex-center">
						<view>{{formdata.publisherPhone}}</view>
						<image @click="phone(formdata.publisherPhone)" src="/static/image/icon_dh.png" mode="widthFix">
						</image>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.petKind">
					<view class="item name flexd flex-center jubetween">
						<view class="label">宠物种类</view>
						<view class="text">{{formdata.petKind}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.petAge">
					<view class="item name flexd flex-center jubetween">
						<view class="label">宠物年龄</view>
						<view class="text">{{formdata.petAge}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.vaccinated==0||formdata.vaccinated">
					<view class="item name flexd flex-center jubetween">
						<view class="label">已打疫苗</view>
						<view class="text">{{formdata.vaccinated?'否':'是'}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.bookName">
					<view class="item name flexd flex-center jubetween">
						<view class="label">书籍名称</view>
						<view class="text">《{{formdata.bookName}}》</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.clothesCategoryName">
					<view class="item name flexd flex-center jubetween">
						<view class="label">衣服类型</view>
						<view class="text">{{formdata.clothesCategoryName}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.goodsCategoryName">
					<view class="item name flexd flex-center jubetween">
						<view class="label">物品类型</view>
						<view class="text">{{formdata.goodsCategoryName}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.goodsName">
					<view class="item name flexd flex-center jubetween">
						<view class="label">物品名称</view>
						<view class="text">{{formdata.goodsName}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.goodsName">
					<view class="item name flexd flex-center jubetween">
						<view class="label">商品估价</view>
						<view class="text">￥{{formdata.goodsValuation}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.goodsSize">
					<view class="item name flexd flex-center jubetween">
						<view class="label">大小预估</view>
						<view class="text">{{formdata.goodsSize}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.goodsWeight">
					<view class="item name flexd flex-center jubetween">
						<view class="label">重量预估</view>
						<view class="text">{{formdata.goodsWeight}}(KG)</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.goodsName">
					<view class="item name flexd flex-center jubetween">
						<view class="label">是否指定商家购买</view>
						<view class="text">{{formdata.appointShop?'是':'否'}}</view>
					</view>
				</view>
				<!-- 帮取快递 帮送外卖 帮丢垃圾 -->
				<view class="flexd jubetween" v-if="formdata.now_delivery&&formdata.now_delivery!=0">
					<view class="item name flexd flex-center jubetween">
						<view class="label" v-if="formdata.categoryId == 2">上门时间</view>
						<view class="label" v-else>配送时间</view>
						<view class="text">立即</view>
					</view>
				</view>
				<!-- 配送时间 -->
				<view class="flexd jubetween" v-else-if="formdata.deliveryStartTime||formdata.startTime">
					<view class="item name flexd flex-center jubetween">
						<view class="label" v-if="formdata.categoryId == 2">上门时间</view>
						<view class="label" v-else>配送时间</view>
						<view class="text">
							<text v-if="formdata.delivery_date">{{formdata.delivery_date.split('-')[1]+'月'+formdata.delivery_date.split('-')[2]+'日'}}</text>
							<text v-if="formdata.startTime">
								{{formdata.startTime+'-'+formdata.endTime}}
							</text>
							<text v-else>{{formdata.deliveryStartTime+'-'+formdata.deliveryEndTime}}</text>
						</view>
					</view>
				</view>

				<view class="flexd jubetween" v-if="formdata.numberId">
					<view class="item name flexd flex-center jubetween">
						<view class="label" v-if="formdata.categoryId == 1">取件数量</view>
						<view class="label" v-else-if="formdata.categoryId == 3">商品种类数量</view>
						<view class="label" v-else-if="formdata.categoryId == 21">外卖数量</view>
						<view class="text">{{takeNum}}</view>
					</view>
				</view>

				<view class="flexd jubetween" v-if="formdata.commission">
					<view class="item name flexd flex-center jubetween">
						<view class="label">佣金
							<!-- <text>(平台抽佣{{Math.floor(formdata.platformCommission*100)}}%)</text> -->
						</view>
						<view class="text">￥{{formdata.commission}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.sellingPrice">
					<view class="item name flexd flex-center jubetween">
						<view class="label">出售价格</view>
						<view class="text">￥{{formdata.sellingPrice}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.transactionModeName">
					<view class="item name flexd flex-center jubetween">
						<view class="label">交易方式</view>
						<view class="text">{{formdata.transactionModeName}}</view>
					</view>
				</view>
				<view class="flexd jubetween" v-if="formdata.js_operation_point_name">
					<view class="item name flexd flex-center jubetween">
						<view class="label">运营点</view>
						<view class="text">{{formdata.js_operation_point_name}}</view>
					</view>
				</view>
			</view>
			<view class="form" v-if="formdata.getAndSendType==0||formdata.getAndSendType">
				<view class="flexd jubetween">
					<view class="item name flexd flex-center jubetween">
						<view class="label">帮取帮送</view>
						<view class="text">{{formdata.getAndSendType==1?'帮送':'帮取'}}</view>
					</view>
				</view>
				<view class="flexd jubetween">
					<view class="item name flexd flex-center jubetween">
						<view class="label">{{formdata.getAndSendType==1?'收件人':'给件人'}}</view>
						<view class="text">{{formdata.senderName}}<!-- /{{formdata.senderSex?'女士':'先生'}} -->
						</view>
					</view>
				</view>
				<view class="flexd jubetween">
					<view class="item name flexd flex-center jubetween">
						<view class="label">{{formdata.getAndSendType==1?'收件人':'给件人'}}手机号</view>
						<view class="text flexd flex-center">
							<view>{{formdata.senderPhone}}</view>
							<image @click="phone(formdata.publisherPhone)" src="/static/image/icon_dh.png"
								mode="widthFix">
							</image>
						</view>
					</view>
				</view>
			</view>
			<view class="form" v-if="formdata.requirementIntroduction">
				<view class="item">
					<textarea class="textarea" disabled v-model="formdata.requirementIntroduction"
						placeholder-style="color:#878787" placeholder="请给接单者留言" />
				</view>
			</view>
			<view class="form">
				<view class="item" v-if="formdata.leaveMessage">
					<textarea class="textarea" disabled v-model="formdata.leaveMessage"
						placeholder-style="color:#878787" placeholder="请给接单者留言" />
				</view>
			</view>
			<view class="form" v-if="imageValue.length">
				<view class="item">
					<view class="out">
						<!-- <block v-for="(item,index) in imageValue" :key='index'> -->
						<view v-for="(item,index) in imageValue" :key='index' class="peop" @click="preview(item)">
							<image :src="Img(item)" mode=""></image>
						</view>
						<!-- </block> -->
					</view>
				</view>
			</view>
			<view class="form" v-if="formdata.dataStatus!=1&&formdata.dataStatus!=4">
				<view class="flexd jubetween">
					<view class="item name flexd flex-center jubetween">
						<view class="label">接单人</view>
						<view class="text flexd flex-center">
							<view>{{formdata.order_receiving_nick_name}}</view>
							<image @click="talkto(formdata.order_receiving_user_id)" src="/static/image/icon_lt.png"
								mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="flexd jubetween">
					<view class="item name flexd flex-center jubetween">
						<view class="label">手机号</view>
						<view class="text flexd flex-center">
							<view>{{formdata.order_receiving_phone}}</view>
							<image @click="phone(formdata.order_receiving_phone)" src="/static/image/icon_dh.png"
								mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="flexd jubetween">
					<view class="item name flexd flex-center jubetween">
						<view class="label">接单时间</view>
						<view class="text">{{$shijian(formdata.order_receiving_time)}}
							<!-- /{{formdata.senderSex?'女士':'先生'}} -->
						</view>
					</view>
				</view>

			</view>

		</view>

		<!-- 2022-7 -->
		<AOrderDetail v-else :datas="formdata" :orderId="id"></AOrderDetail>

		<!-- 旧版 底部功能 -->
		<view class="foot flexd jubetween flex-center">
			<!-- <view
				v-if="formdata.commission&&formdata.dataStatus==1&&userId!=formdata.userId&&formdata.categoryId!=6&&formdata.categoryId!=7">
				<view @click="talkto(form.order_receiving_user_id)" class="sub-connect">
					<image src="/static/image/icon_lt.png" mode=""></image>
					<text class="font22">线上沟通</text>
				</view>
			</view> -->
			<text class="font42 fontColor-FF6000">￥{{formdata.commission}}</text>
			<view class="flexd flex-center">
				<view class="btn" @click="take"
					v-if="formdata.dataStatus==1&&userId!=formdata.userId&&formdata.categoryId!=6&&formdata.categoryId!=7">
					接单
				</view>
				<view class="btnWhite" @click="phone(kf_hotline)"
					v-if="formdata.dataStatus==2&&userId==formdata.userId">
					申请售后
				</view>
				<view class="btn" @click="finish" v-if="formdata.dataStatus==2&&userId==formdata.userId">
					完成订单
				</view>
				<view class="btnWhite" @click="showComm"
					v-if="formdata.dataStatus==1&&userId==formdata.userId&&formdata.categoryId!=6&&formdata.categoryId!=7">
					加佣
				</view>
				<view class="btnWhite" @click="cancel" v-if="formdata.dataStatus==1&&userId==formdata.userId">
					取消订单
				</view>
			</view>
		</view>
		<!-- 旧版 加佣弹窗 -->
		<view class="commBox" v-show="isMore">
			<view class="cont" @click="isMore=false">
				<view class="form" @click.stop="">
					<view class="flexd jubetween flex-center">
						<view class="itemx">
							<uni-easyinput ref='more' :focus="isMore" errorMessage class="input" :inputBorder="false"
								type="digit" v-model="moreComm" placeholder="请输加佣金额"
								placeholder-style="color:#878787" />
						</view>
						<view class="btn" @click="$shake(morecomiss)">
							提交
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pickerAddress from '@/components/wangding-pickerAddres/wangding-pickerAddress.vue'
	import AOrderDetail from './a_order_detail.vue'
	export default {
		components: {
			pickerAddress,
			AOrderDetail
		},
		data() {
			return {
				htosp: 0,
				userId: '',
				imageValue: [],
				id: 0,
				salesman_number: '',
				formdata: {},
				moreComm: '',
				isMore: false,
				userInfo: {},
				kf_hotline: '',
				// 商品数量
				takeNum: 0,
				// 防抖
				onoff: true
			}
		},
		onLoad(option) {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.userInfo = uni.getStorageSync('userInfo');
			if (option.id) {
				this.id = option.id
				this.refresh()
			}
			let that = this
			this.util.ajax('aboutUs/info', {}, res => {
				that.kf_hotline = res.data.kf_hotline
			})
		},
		onPullDownRefresh() {
			this.refresh()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			preview(item) {
				uni.previewImage({
					urls: [this.Img(item)],
					longPressActions: {
						itemList: [],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			showComm() {
				this.isMore = true;
				this.moreComm = '';
			},
			refresh() {
				let that = this
				this.util.ajax('release/getInfoById', {
					"id": this.id
				}, res => {
					that.formdata = res.data
					if (res.data.images != '') {
						that.imageValue = res.data.images.split(',')
					}
					// 筛选对应数量列表
					let url = ''
					let nums = [1, 3, 21]
					if (nums.indexOf(res.data.categoryId) > -1) {
						if (res.data.categoryId == 1) { // 帮取快递
							url = 'release/getExpressNumberList'
						} else if (res.data.categoryId == 3) { // 帮购商品
							url = 'release/buyGoodsNumberList'
						} else if (res.data.categoryId == 21) { // 帮送外卖
							url = 'release/deliverTakeoutNumberList'
						}
						this.util.ajax(url, {}, res => {
							for (let i in res.data.list) {
								if (res.data.list[i].id == that.formdata.numberId) {
									that.takeNum = res.data.list[i].number
								}
							}
						})
					}

				})
			},
			bindPickerChange: function(e) {
				this.attrIndex = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			change(e) {
				this.address = e
				this.txt = e.data.join('-')
			},
			// 接单
			take() {
				let that = this
				uni.showModal({
					title: '是否接取该订单',
					success(e) {
						if (e.confirm) {
							uni.showLoading({
								title: ''
							})
							that.util.ajax('myOrder/saveOrder', {
								"releaseRequirementId": that.id,
								"userId": that.userId
							}, res => {
								uni.hideLoading()
								if (!res.data.canNotTakeOrders) {
									that.$alert('接单成功')
									that.refresh()
								} else {
									if (that.userInfo.user_type == 3) {
										that.$alert('商家无法接单')
									} else {
										that.$alert('接单请先进行达人认证!')
										setTimeout(e => {
											that.$jump('/pages/index/applyDaren')
										}, 1000)
									}

								}
							})
						} else if (e.cancel) {
							console.log('用户点击取消');
						}

					}
				})
			},
			// 完成订单
			finish() {
				let that = this
				uni.showModal({
					title: '是否确认完成订单',
					success(e) {
						if (e.confirm) {
							that.util.ajax('myOrder/completeOrder', {
								"releaseRequirementId": that.id,
								"userId": that.userId
							}, res => {
								that.$alert('订单已完成')
								that.refresh()
							})
						}

					}
				})
			},
			// 提交加佣
			morecomiss() {
				uni.showLoading({
					title: ''
				})
				let that = this
				that.util.ajax('myOrder/addCommission', {
					"releaseRequirementId": that.id,
					"userId": that.userId,
					"addCommission": that.moreComm,
				}, res => {
					// #ifdef APP-PLUS
					let paymentType = 3
					// #endif
					// #ifdef MP-WEIXIN
					let paymentType = 4
					// #endif
					that.util.ajax('pay/toPay', {
						"orderId": res.data.id,
						"orderNum": res.data.orderNum,
						"payType": 1,
						"paymentType": paymentType,
						"purpose": 4,
						"subject": "发布需求",
						"userId": that.userId
					}, resx => {
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
								uni.hideLoading()
								that.$alert('支付成功')
								setTimeout(function() {
									that.$jumpLa('/pages/user/myOrder/myOrder?type=0')
								}, 1000);
							},
							fail(e) {
								uni.hideLoading()
								that.remark = e
								that.$alert('支付失败')
							}
						})
					})
				})
			},
			// 取消订单
			cancel() {
				let that = this
				uni.showModal({
					title: '是否取消订单',
					success() {
						that.util.ajax('myOrder/cancelOrder', {
							"releaseRequirementId": that.id,
							"userId": that.userId
						}, res => {
							that.$alert('订单已取消')
							that.refresh()
						})
					}
				})
			},
			// 线上聊天
			talkto(id) {
				if (this.userId == id) {
					this.$alert('无法跟自己聊天')
					return
				}
				this.$jump('/pages/chat/HM-chat?idse=' + id)
			},
			// 拨打电话
			phone(e) {
				uni.makePhoneCall({
					phoneNumber: e //仅为示例
				});
			},
			//
			daohang(name, latitude, longitude) {
				if (this.userId !== this.formdata.order_receiving_user_id) return
				let that = this
				uni.openLocation({
					longitude: parseFloat(longitude),
					latitude: parseFloat(latitude),
					name: name,
					fail(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.head {
		padding: 20rpx 0;

		.left {
			font-size: 32rpx;
			font-weight: bold;

			image {
				margin-right: 10rpx;
			}
		}
	}

	.typeBox {
		width: 400rpx;
		margin: 30rpx auto;

		.item {
			width: 45%;
			background-color: #fff;
			font-size: 32rpx;
			font-weight: bold;
			opacity: .3;
			line-height: 2;
			text-align: center;

			&.active {
				opacity: 1;
			}
		}
	}

	.content {
		padding-bottom: 200rpx;

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

				.label {
					color: #888;

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
				}

				.textarea {
					height: 100rpx;
					padding: 20rpx 0;
				}

				.text {
					image {
						width: 36rpx;
						margin-left: 20rpx;
					}
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

			.address {
				padding: 20rpx 30rpx;

				image {
					width: 100%;
					margin-top: 10rpx;
				}

				.icon {
					width: 50rpx;
				}

				.more {
					width: 30rpx;
				}

				.text {
					width: 500rpx;
					font-size: 28rpx;
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
			width: 100%;
			display: flex;
			justify-content: start;
			overflow-x: auto;

			.peop {
				margin: 20rpx 0;
				margin-right: 12rpx;
				position: relative;

				image,
				video {
					width: 154rpx;
					height: 154rpx;
					border-radius: 8rpx;
				}

				video {
					width: 100%;
					height: 100%;
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
	}

	.foot {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 30rpx 30rpx 40rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow: 0px 6rpx 30rpx #888888;


		.sub-connect {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 44rpx;
				height: 44rpx;
			}
		}


		.btn {
			line-height: 4vh;
			font-size: 30rpx;
			border-radius: 10rpx;
			padding: 0 40rpx;
			// background-image: $uni-bg-color;
			background: linear-gradient(180deg, #FDEC7E 0%, #F9D448 100%);
		}

		.btnWhite {
			line-height: 4vh;
			font-size: 30rpx;
			border-radius: 10rpx;
			padding: 10rpx 40rpx;
			margin-left: 20rpx;
			// background-image: $uni-bg-color;
			background: linear-gradient(180deg, #FDEC7E 0%, #F9D448 100%);
		}
	}

	.commBox {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 8;
		background-color: rgba($color: #000000, $alpha: .3);

		.cont {
			position: relative;
			height: 100%;

			.form {
				position: absolute;
				width: 80%;
				z-index: 9;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				padding: 30rpx;
				box-sizing: border-box;
			}

			.btn {
				background-color: $uni-color-primary;
				line-height: 2.3;
				padding: 0 20rpx;
				border-radius: 10rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
