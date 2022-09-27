<template>
	<view class="content">
		<view v-if="imageurl" class="homeBg">
			<image :src="imageurl+'/static/image/img_bj.png'" mode="widthFix"></image>
		</view>
		<view class="head" :style="{paddingTop: htosp+'px'}">
			<view class="flexd jubetween flex-center">
				<view class="left flexd flex-center">
					<image @click="$jumpsw('/pages/index/index')" class="backs icon22" src="/static/image/icon_fh.png"
						mode=""></image>
				</view>
				<view class="flexd jubetween shareBox">
					<image @click="collect" v-if="info.collected" src="/static/image/icon_sc.png" mode="widthFix">
					</image>
					<image @click="collect" v-if="!info.collected" src="/static/image/icon_wsc.png" mode="widthFix">
					</image>
					<!-- #ifdef APP-PLUS -->
					<image src="/static/image/icon_fx.png" @click="onShare" mode="widthFix"></image>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="shopMessage">
			<view class="flexd flex-center">
				<view class="image">
					<image style="width:174rpx;height:174rpx;" :src="Img(info.shop_logo)" mode=""></image>
				</view>
				<view class="message">
					<view class="flexd jubetween">
						<view class="title">{{info.shop_name}}</view>
						<image @click="phone(info.contact_phone)" class="call" src="/static/image/icon_dh.png"
							mode="widthFix"></image>
					</view>
					<!-- <image v-for="n in 5" :key="n"
							:src="n<info.score?'/static/image/icon_xx.png':'/static/image/icon_wxzxx.png'"
							mode="widthFix"></image> -->
					<!-- <view class="flexd flex-center">
						<view class="gray">推荐指数</view>
						<view class="star flexd">
							<uni-rate :disabled="true" v-model="info.score" />
						</view>
					</view> -->
					<view class="discount-box flexd">
						<view class="box-list" v-if="index<2" v-for="(item,index) in welfareList" :key="index"
							@click="test(2)">
							<text class="text fontColor-FF6000">{{item.name.split(' ')[0]}}</text>
							<text class="get fontColor-FF6000">领</text>
						</view>
					</view>
					<view class="gray">
						营业时间：{{info.business_hours}}
					</view>
				</view>
			</view>
			<view class="address flexd flex-center">
				<view class="flexd">
					<image src="/static/image/icon_dw.png" mode="widthFix"></image>
				</view>
				<view class="gray">
					{{info.address}} {{info.distance}}
				</view>
			</view>
		</view>
		<view class="typeBox flexd">
			<view class="item" :class="typeIndex==i?'active':''" v-for="(item,i) in typeList" :key="i" @click="test(i)">
				{{item}}
			</view>
		</view>
		<swiper class="swiper" :current="typeIndex" :indicator-dots="false" :autoplay="false" @change="changeType">
			<!-- 商品 -->
			<swiper-item>
				<view class="swiper-item list flexd">
					<scroll-view class="left" :scroll-y="isBottom">
						<view class="item" :class="ListIndex==i?'active':''" v-for="(item,i) in categoryVos" :key="i"
							@click="changeList(i)">
							{{item.category_name}}
						</view>
					</scroll-view>
					<scroll-view :scroll-y="isBottom" class="right">
						<view class="item flexd jubetween" v-for="(item,i) in List" :key="i">
							<!-- 售罄 -->
							<!-- <view v-if="item.stock<1" class="audit-layers">
								<text class="font36">售罄</text>
							</view> -->
							<view class="image">
								<image class="product-img" :src="Img(item.images)" mode=""></image>
								<view class="black" v-if="item.stock<1">
									<text>售罄</text>
								</view>
							</view>
							<view class="message">
								<view class="title">{{item.name}}</view>
								<view class="flexd jubetween flex-center">
									<view class="price">
										￥<text>{{item.selling_price}}</text>
										<!-- {{item.selling_price.toString().split('.')[0]}} -->
										<!-- {{item.selling_price.toString().indexOf('.')!==-1?'.':''}}{{item.selling_price.toString().split('.')[1]}} -->
									</view>
									<view class="btnBox flexd jubetween flex-center">
										<block v-if="item.stock>0">
											<image src="/static/image/icon_j.png" @click="reduce(i)" mode="widthFix">
											</image>
											<view class="num">{{item.count||0}}</view>
											<image src="/static/image/icon_jia.png" @click="addPro(i)" mode="widthFix">
											</image>
										</block>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<!-- 商家信息 -->
			<swiper-item>
				<view class="swiper-item business">
					<scroll-view scroll-y="true">
						<view class="shopMessBox">
							<!-- <view class="banner">
								<swiper :indicator-dots="true" :interval="3000" :duration="1000">
									<swiper-item v-for="(item , i) in info.images.split()" :key="i">
										<view class="swiper-item">
											<image :src="Img(item)" mode="" style="width:100%;"></image>
										</view>
									</swiper-item>
								</swiper>
							</view> -->
							<view class="sever">
								<view class="title">商家服务</view>
								<view class="item flexd">
									<view class="icon">
										<image src="/static/image/icon_fwnr.png" mode="widthFix"></image>
									</view>
									<view class="cont">
										<view class="tlt">
											服务内容
										</view>
										<rich-text class="rich" :nodes="info.service_content"></rich-text>
									</view>
								</view>
								<view class="item flexd">
									<view class="icon">
										<image src="/static/image/icon_fwbz.png" mode="widthFix"></image>
									</view>
									<view class="cont">
										<view class="tlt">
											服务保障
										</view>
										<rich-text class="rich" :nodes="info.service_guarantee"></rich-text>
									</view>
								</view>
								<view class="item flexd">
									<view class="icon">
										<image src="/static/image/icon_fwlc.png" mode="widthFix"></image>
									</view>
									<view class="cont">
										<view class="tlt">
											服务流程
										</view>
										<rich-text class="rich" :nodes="info.service_process"></rich-text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<!-- 在线福利 -->
			<swiper-item>
				<view class="swiper-item card">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view class="menu">
							<view class="item flexd flex-center jubetween" v-for="(item,i) in welfareList" :key="i">
								<view class="left">
									￥<text>{{item.amount}}</text>
								</view>
								<view class="center">
									<view class="title">
										{{item.name}}
									</view>
									<view class="time">{{$shijiandate(item.begin_time)}} -
										{{$shijiandate(item.expiration_time)}}
									</view>
								</view>
								<view class="right">
									<view class="btn" :class="item.received==1?'active':''" @click="getwel(item)">
										{{item.received==1?'已':'去'}}领取
									</view>
									<!-- <view class="sub">销量 1852</view> -->
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
		<view v-show="typeIndex==0" class="foot flexd jubetween flex-center">
			<view class="cost">
				费用 <text>{{sumPrice.toFixed(2)}}元</text>
			</view>
			<view class="right flexd flex-center">
				<block v-if="sumPrice.toFixed(2)<info.initial_delivery_fee">
					<text class="differ fontColor-666">差￥{{info.initial_delivery_fee-sumPrice.toFixed(2)}}起送</text>
				</block>
				<block v-else>
					<view class="btn" :class="{'btn-no':sumPrice.toFixed(2)<info.initial_delivery_fee}">
						<text @click="$shake(orderto)">下单</text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import appShare, {
		closeShare
	} from '@/uni_modules/zhouWei-APPshare/js_sdk/appShare';
	export default {
		data() {
			return {
				imageurl: "",
				htosp: 0,
				userId: '',
				typeList: ['商品', '商家信息', '在线福利'],
				typeIndex: 0,
				bottomTop: 0,
				isBottom: false,
				List: [],
				ListIndex: 0,
				categoryVos: [],
				welfareList: [],
				info: {
					"address": "",
					"business_hours": "",
					"contact_phone": "",
					"distance": "",
					"images": "",
					"score": 0,
					"service_content": "",
					"service_guarantee": "",
					"service_process": "",
					"shop_id": 0,
					"shop_logo": "",
					"shop_name": ""
				},
				getPro: new Map(),
				sumPrice: 0,
				id: 0,
				// 防抖
				onoff: true
			}
		},
		// 分享给朋友
		onShareAppMessage(res) {
			if (res.from === 'button') {
				console.log(res.target)
			}
			return {
				title: this.info.shop_name,
				path: 'pages/index/shopDetail?id=' + this.info.shop_id,
				mpId: 'wx6ae9f157d9b35d24',
				imageUrl: this.info.shop_logo
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: this.info.shop_name,
				type: 0,
				summary: "",
				imageUrl: this.info.shop_logo
			}
		},
		onLoad(e) {
			this.htosp = uni.getStorageSync('htop')
			this.userId = uni.getStorageSync('userId')
			this.imageurl = this.globalData.imageurl
			if (e.id) {
				this.id = e.id
				let that = this
				this.util.ajax('shop/shopProductDetail', {
					"shopId": e.id,
					"userId": this.userId
				}, res => {
					that.categoryVos = res.data.categoryVos
					if (that.categoryVos.length > 0) that.List = res.data.categoryVos[0].productVos
					that.ListIndex = 0
					that.info = res.data.info
					that.welfareList = res.data.welfareList
				})
			}
		},
		onPageScroll(e) {
			if (e.scrollTop < this.bottomTop - 10) {
				this.isBottom = false
			}
			if (this.isBottom) {
				this.bottomTop = e.scrollTop
			}

		},
		onReachBottom() {
			this.isBottom = true
		},
		methods: {
			phone(e) {
				uni.makePhoneCall({
					phoneNumber: e //仅为示例
				});
			},
			getwel(item) {
				if (item.received) return
				let that = this
				this.util.ajax('userWelfare/receiveWelfare', {
					"userId": this.userId,
					"welfare_id": item.id,
					"welfare_type": item.welfare_type
				}, res => {
					if (item.welfare_type == 2) {
						this.$alert('领取成功')
						item.received = 1
					} else if (item.welfare_type == 1) {
						uni.showLoading({
							title: '',
						});
						// #ifdef APP-PLUS
						let paymentType = 3
						// #endif
						// #ifdef MP-WEIXIN
						let paymentType = 4
						// #endif

						that.util.ajax('pay/toPay', {
							"orderId": res.data.orderId,
							"orderNum": res.data.orderNum,
							"payType": 1,
							"paymentType": paymentType,
							"purpose": 3,
							"subject": "购买代金券",
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
								success(resx) {
									that.$alert('支付成功')
									setTimeout(function() {
										item.received = 1
									}, 1000);
								},
								fail(e) {
									that.remark = e
									that.$alert('支付失败')
									that.loadmore()
								}
							})
						})
					}
				})
			},
			// 收藏
			collect() {
				let that = this
				this.util.ajax('collection/addCollect', {
					"infoId": this.id,
					"type": 1,
					"userId": this.userId
				}, res => {
					this.$alert(res.msg)
					this.info.collected = !this.info.collected
				})
			},
			getsum() {
				let sum = 0
				this.getPro.forEach(item => {
					sum += item.count * item.selling_price
				})
				this.sumPrice = sum
			},
			changeType(e) {
				this.typeIndex = e.detail.current
			},
			test(i) {
				this.typeIndex = i
			},
			addPro(i) {
				let pro = this.List[i]
				if (!pro.count) {
					pro.count = 1
				} else {
					pro.count++
				}
				this.getPro.set(this.List[i].id, pro)
				this.getsum()
				this.$forceUpdate()
			},
			reduce(i) {
				if (!this.List[i].count) return
				this.List[i].count--
				if (this.List[i].count == 0) {
					this.getPro.delete(this.List[i].id)
				} else {
					this.getPro.set(this.List[i].id, this.List[i])
				}

				this.getsum()
				this.$forceUpdate()
			},
			changeList(i) {
				this.ListIndex = i
				let arr = this.categoryVos[i].productVos
				for (let i = 0; i < arr.length; i++) {
					if (this.getPro.has(arr[i].id)) {
						arr[i].count = this.getPro.get(arr[i].id).count
					}
				}
				this.List = i
			},
			// 分享
			onShare() {
				// 调用
				// #ifdef APP-PLUS
				let shareData = {
					// shareUrl: "pages/index/shopDetail?id=" + this.info.shop_type_id,
					shareTitle: this.info.shop_name,
					shareContent: this.info.address,
					shareImg: this.Img(this.info.shop_logo),
					appId: "wx6ae9f157d9b35d24", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
					appPath: "pages/index/shopDetail?id=" + this.info.shop_type_id,
					//appWebUrl : "https://kemean.com/",
				}
				let shareObj = appShare(shareData, res => {
					console.log("分享成功回调", res);
					// 分享成功后关闭弹窗
					// 第一种关闭弹窗的方式
					closeShare()
				})
				setTimeout(() => {
					// 第二种关闭弹窗的方式
					shareObj.close()
				}, 5000)
				// #endif
			},
			orderto() {
				let obj = []
				this.getPro.forEach(item => {
					obj.push({
						count: item.count,
						proId: item.id
					})
				})
				if (obj.length == 0) {
					this.$alert('请选择商品')
					return
				}
				let json = JSON.stringify({
					productList: obj,
					shopId: this.id,
					userId: this.userId
				})
				setTimeout(() => {
					this.$jump('./shopOrder?id=' + this.id + '&index=' + json)
				}, 1000)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.content {
		padding-bottom: 0;
		position: relative;

		.homeBg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			/* #ifdef MP-WEIXIN */
			z-index: -1;
			/* #endif */

			&::after {
				content: '';
				width: 100%;
				height: 100%;
				background-color: rgba($color: #000000, $alpha: .3);
				display: block;
				position: absolute;
				top: 0;
				left: 0;
			}

			image {
				width: 100%;
			}
		}
	}

	.head {
		padding: 40rpx 40rpx 0 0;

		.left {
			font-size: 32rpx;
			font-weight: bold;

			image {
				margin-right: 10rpx;
			}
		}

		.shareBox {
			image {
				width: 46rpx;
			}
		}
	}

	.shopMessage {
		margin-top: 60rpx;
		background-color: #fff;
		border-top-right-radius: 50rpx;
		border-top-left-radius: 50rpx;
		position: relative;
		z-index: 1;
		padding: 30rpx;

		.message {
			width: 500rpx;
		}

		.call {
			width: 40rpx;
		}

		.title {
			font-size: 36rpx;
			font-weight: bold;
		}

		.image {
			width: 160rpx;
			margin-right: 30rpx;

			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}
		}

		.star {
			margin-left: 10rpx;

			image {
				width: 26rpx;
				margin-right: 4rpx;
			}
		}

		.address {
			margin-top: 20rpx;

			image {
				width: 30rpx;
				margin-right: 10rpx;
			}
		}
	}

	.typeBox {
		position: relative;
		z-index: 1;
		background-color: #f5f5f5;

		.item {
			padding: 0 30rpx;
			font-size: 32rpx;
			line-height: 6vh;
			color: #989898;
			position: relative;

			&::before {
				content: '';
				display: block;
				width: 50rpx;
				height: 4rpx;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}

			&.active {
				color: #212121;
				font-weight: bold;

				&::before {
					background-color: $uni-color-primary;
				}
			}
		}
	}

	.foot {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1vh 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow: 0px 6rpx 30rpx #888888;

		.cost {
			font-size: 28rpx;

			text {
				font-size: 32rpx;
			}
		}

		.right {
			.differ {
				margin-right: 20rpx;
				line-height: 5vh;
			}

			.btn {
				line-height: 5vh;
				font-size: 32rpx;
				background-image: $uni-bg-color;
				border-radius: 10rpx;
				padding: 0 70rpx;
			}

			.btn-no {
				color: #fff;
				background-color: #999;
				background-image: none;
			}
		}
	}

	.swiper {
		height: 94vh;
	}

	.list {
		height: 100%;

		.left {
			width: 180rpx;
			height: 87vh;

			.item {
				line-height: 3;
				text-align: center;
				font-size: 28rpx;

				&.active {
					background-color: #fff;
				}
			}
		}

		.right {
			width: 570rpx;
			height: 87vh;
			background-color: #fff;

			.item {
				padding: 30rpx;
				border-bottom: 1rpx solid #ddd;
				position: relative;
				// .audit-layers {
				// 	position: absolute;
				// 	top: 0;
				// 	left: 0;
				// 	bottom: 0;
				// 	right: 0;
				// 	color: #fff;
				// 	background-color: rgba(0, 0, 0, 0.4);
				// 	z-index: 2;
				// 	display: flex;
				// 	align-items: center;
				// 	justify-content: center;

				// 	text {
				// 		font-size: 41rpx;
				// 		letter-spacing: 15rpx;
				// 	}
				// }

				.image {
					width: 160rpx;
					height: 160rpx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
						border-radius: 12rpx;
					}

					.renzhen {
						position: absolute;
						width: 70rpx;
						top: 0;
						right: 0;
					}

					.black {
						width: 100%;
						height: 100%;
						background: rgba(51, 51, 51, 0.5500);
						position: absolute;
						left: 0;
						top: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 12rpx;

						text {
							color: #fff;
							font-size: 41rpx;
							letter-spacing: 8rpx;
						}
					}
				}

				.message {
					width: 320rpx;

					.title {
						font-size: 32rpx;
						margin-bottom: 50rpx;
					}

					.price {
						text {
							font-size: 40rpx;
						}
					}

					.btnBox {
						width: 140rpx;

						image {
							width: 40rpx;
						}

						.num {
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}

	.business {
		height: 100%;
		background-color: #fff;
	}

	.card {
		height: 100%;
		background-color: #fff;

		.menu {
			padding: 30rpx;

			.item {
				min-height: 172rpx;
				background-color: rgba($color: #FF581E, $alpha: .1);
				padding: 0 20rpx;
				border-radius: 10rpx;
				margin-bottom: 10rpx;

				.left {
					width: 130rpx;
					color: #FF581E;

					text {
						font-size: 46rpx;
						font-weight: bold;
					}
				}

				.center {
					flex: 1;
					padding: 0 30rpx;

					.title {
						color: #FF581E;
						font-size: 28rpx;
					}

					.time {
						color: #FF581E;
					}
				}

				.right {
					text-align: center;

					.btn {
						width: 160rpx;
						background-color: #FF581E;
						color: #fff;
						line-height: 2;
						border-radius: 30rpx;

						&.active {
							background-color: #fff;
							color: #ff581e;
						}
					}

					.sub {
						color: #FF581E;
					}
				}
			}
		}
	}

	.shopMessBox {
		padding: 40rpx 30rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			margin-bottom: 30rpx;
		}

		.banner {
			margin-bottom: 30rpx;

			swiper {
				height: 400rpx;
			}
		}

		.sever {
			.tlt {
				font-size: 32rpx;
				margin-bottom: 10rpx;
			}

			.icon {
				width: 40rpx;
				margin-right: 20rpx;
				margin-top: 6rpx;

				image {
					width: 100%;
				}
			}

			.rich {
				font-size: 28rpx;
				color: #666;
			}

			.item {
				margin-bottom: 30rpx;
			}
		}
	}

	.discount-box {
		padding: 10rpx 0;

		.box-list {
			border-radius: 5rpx;
			padding: 2rpx 10rpx;
			margin-right: 10rpx;
			background: rgba(255, 88, 30, 0.1);

			.get {
				margin-left: 8rpx;
				padding-left: 8rpx;
				border-left: 1px dashed #fff;
			}
		}
	}
</style>
