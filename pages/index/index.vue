<template>
	<view class="content">
		<view class="header" :style="{paddingTop: htosp+'px'}">
			<view class="flexd jubetween">
				<view class="city flexd flex-center" @click="$jump('/pages/index/changeVillage')">
					<image src="/static/image/icon_dw.png" mode=""></image>
					<text v-if="userId==40">请选择小区</text>
					<text v-else>{{village.residential_quarter_name?village.residential_quarter_name:'请选择小区'}}</text>
					<image src="/static/image/icon_gd.png" mode=""></image>
				</view>
				<view class="village flexd" @click="$jump('/pages/index/search')">
					<image src="/static/image/icon_ss.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="menu">
			<swiper :indicator-dots="true" :duration="200" :style="{'height':swiperHeight+'px'}">
				<swiper-item v-for="(d,i) in  menuList_new" :key="i">
					<view class="menuBox flexd">
						<view id="itemList" class="item" v-for="(item,index) in d" :key="index"
							@click="menuClick(menuList[i][index],i,index)">
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
		<!-- 附近商家 -->
		<nearbyshop :type="shopType_index" ref="nearbyshop"></nearbyshop>
		<!-- 微信订阅消息弹窗 -->
		<uni-popup ref="wxMessage" type="dialog" :mask-click="false">
			<uni-popup-dialog type="info" cancelText="关闭" confirmText="同意" title="通知" :content="wxMessage_text"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<!-- 新人福利 -->
		<uni-popup ref="newPeople" type="center" :mask-click="false">
			<view class="newUser-box">
				<uni-icons type="closeempty" size="15" color="#fff" class="closeX" @click="closePop"></uni-icons>
				<image v-if="imageurl" class="box-body-img" :src="imageurl+'static/img/img_xrfl_body.png'"
					mode="widthFix"></image>
				<image class="box-btn-img" src="/static/img/img_xrfl_btn.png" mode="widthFix"></image>
				<view class="box">
					<!-- 优惠券 -->
					<view class="box-list" v-for="(item,index) in coupons" :key="index">
						<view class="list-left">
							<text style="font-size:50rpx;color: #FF2D51;">劵</text>
						</view>
						<view class="list-right">
							<view class="title">
								<text class="font32">{{item.coupon_name}}</text>
							</view>
							<view class="time">
								<text class="font24">有效期至</text>
								<uni-dateformat class="font24" :date="item.expiration_time" format="yyyy/MM/dd">
								</uni-dateformat>
							</view>
						</view>
						<image class="list-img" src="/static/img/img_xrfl_list.png" mode=""></image>
					</view>
				</view>

				<view class="btn">
					<!-- 领取 -->
					<view class="box-confirm">
						<text class="font36" @click="closePop">一键领取</text>
					</view>
					<!-- 适用范围 -->
					<view class="box-apply">
						<view class="text">仅适用于抵扣以下服务</view>
						<view class="text">帮送外卖 / 帮取快递 / 帮丢垃圾</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// 微信订阅消息
	import {
		openSubscription
	} from '@/static/js/wx_messagePush.js'
	// 附近商家
	import nearbyshop from '@/pages/index/a_nearbyshop.vue'
	// 
	import list from '@/components/menuList.vue'
	export default {
		components: {
			list,
			nearbyshop,
		},
		data() {
			return {
				imageurl: '',
				userId: '',
				htosp: 0,
				menuList_new: [],
				menuList: [
					[{
							img: '/static/image/icon_bqkd.png',
							title: '帮取快递',
							path: '/pages/from/apply?id=0'
						}, {
							img: '/static/image/icon_bqwm.png',
							title: '帮送外卖',
							path: '/pages/from/apply?id=1'
						}, {
							img: '/static/image/icon_bdlj.png',
							title: '帮丢垃圾',
							path: '/pages/from/apply?id=2'
						}, {
							img: '/static/image/icon_bgw.png',
							title: '帮购商品',
							path: '/pages/from/apply?id=3'
						}, {
							img: '/static/image/icon_tcps.png',
							title: '帮取帮送',
							path: '/pages/from/apply?id=4'
						},
						{
							img: '/static/image/huang/icon_cyd.png',
							title: '餐饮店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_bld.png',
							title: '便利店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_sgd.png',
							title: '水果店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_gxd.png',
							title: '干洗店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_cwd.png',
							title: '宠物店',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/mipmap-mdpi/icon_baojie.png',
							title: '家政保洁',
							path: '/pagesA/a_baojie'
						},
						{
							img: '/static/image/huang/mipmap-mdpi/icon_weixiu.png',
							title: '安装维修',
							path: '/pagesA/a_weixiu'
						},
						{
							img: '/static/image/huang/mipmap-mdpi/icon_maogou.png',
							title: '喂猫遛狗',
							path: '/pagesA/a_maogou'
						},
						{
							img: '/static/image/huang/mipmap-mdpi/icon_peihu.png',
							title: '陪诊陪护',
							path: '/pagesA/a_peihu'
						},
						{
							img: '/static/image/huang/mipmap-mdpi/icon_jiachu.png',
							title: '百味家厨',
							path: '/pagesA/a_jiachu'
						},
					],
					[{
							img: '/static/image/huang/icon_jyhs.png',
							title: '旧衣回收',
							path: '/pages/from/clothes'
						},
						{
							img: '/static/image/huang/icon_xzmm.png',
							title: '闲置买卖',
							path: '/pages/index/xianzhi'
						},
						{
							img: '/static/image/huang/icon_fwzp.png',
							title: '房屋租赁',
							path: ''
						},
						{
							img: '/static/image/huang/icon_bjlh.png',
							title: '搬家拉货',
							path: ''
						},
						{
							img: '/static/image/huang/icon_yyjj.png',
							title: '预约寄件',
							path: ''
						},
						{
							img: '/static/image/huang/icon_sqsq.png',
							title: '社区商圈',
							path: '/pages/index/shangquan'
						},
						{
							img: '/static/image/huang/icon_sqtg.png',
							title: '社区团购',
							path: ''
						},
						{
							img: '/static/image/huang/icon_sqhd.png',
							title: '社区活动',
							path: ''
						},
						{
							img: '/static/image/huang/icon_sqdr.png',
							title: '社区达人',
							path: '/pages/index/daren'
						},
						{
							img: '/static/image/huang/icon_sqwy.png',
							title: '社区物业',
							path: '/pages/index/wuye'
						},
						// {
						// 	img: '/static/image/icon_jsmm.png',
						// 	title: '旧书买卖',
						// 	path: '/pages/index/book',
						// 	tag: '/static/image/icon_gr.png'
						// }, {
						// 	img: '/static/image/icon_es3c.png',
						// 	title: '宠物买卖',
						// 	path: '/pages/index/pet',
						// 	tag: '/static/image/icon_gr.png'
						// },
						// {
						// 	img: '/static/image/tjyy.png',
						// 	title: '体检预约',
						// 	path: '/pages/index/tijian',
						// 	tag: '/static/image/icon_mf.png'
						// },
					]
				],
				village: {},
				// 新用户福利
				coupons: [],
				// 微信订阅消息
				wxMessage_text: '为了及时获取订单状态，您是否想接收订单状态的消息提醒？',
				// swiper高度
				swiperHeight: '0',
				// 当前商家类别
				shopType_index: ''
			}
		},
		// 分享给朋友
		onShareAppMessage(res) {
			if (res.from === 'button') {
				console.log(res.target)
			}
			return {
				title: '阾里',
				path: 'pages/index/index',
				mpId: 'wx6ae9f157d9b35d24',
				// imageUrl: '@/'
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: '阾里',
				type: 0,
				summary: "",
				// imageUrl: this.info.shop_logo
			}
		},
		onLoad(e) {
			this.userId = uni.getStorageSync('userId');
			this.htosp = uni.getStorageSync('htop');
			this.village = uni.getStorageSync('village');
			this.imageurl = this.globalData.imageurl
			this.getUserInfo()
			let that = this
			// 是否游客
			if (that.userId != 40) {
				// 是否新用户
				if (e.new && e.new == 1) {
					this.$nextTick(() => {
						that.getDiscount()
						that.$refs.newPeople.open()
						uni.hideTabBar();
					})
				} else {
					// 微信订阅弹窗
					// #ifdef MP-WEIXIN
					uni.getSetting({
						"withSubscriptions": true,
						success(res) {
							let itemSettings = res.subscriptionsSetting.itemSettings
							if (itemSettings) {
								if (itemSettings.LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw) {
									let tmpl_1 = itemSettings.LCKpmzf8qAd8XdsRcGl6N6pCmM205WGImmZ6ZDBTGCw
								}

								if (itemSettings.iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE) {
									let tmpl_2 = itemSettings.iXmb8LUNIb_VP_KaNq5avEPVrZLdfBbQBNrrRelJfhE
								}
								if (tmpl_1 != 'accept' || tmpl_2 != 'accept') {
									that.$refs.wxMessage.open()
									uni.hideTabBar();
								}
							} else {
								that.$refs.wxMessage.open()
								uni.hideTabBar();
							}
						}
					})
					// #endif
				}
			}
			// 需求类别列表
			this.getTypeList()
			// swiper高度适应
			if (uni.getStorageSync('swiper')) {
				this.swiperHeight = uni.getStorageSync('swiper')
			} else {
				setTimeout(() => {
					this.setSwiperHeight()
				}, 500)
			}
		},
		onShow() {
			this.getUserInfo()
			setTimeout(() => {
				this.$refs.nearbyshop.getNewList()
			}, 500)
			// 审核机制开关
			this.util.ajax('user/closeWithdrawal', {}, res => {
				uni.setStorageSync('examine', res.data.close_withdrawal)
			})
		},
		methods: {
			menuClick(item, page, index) {
				// item.path == '' 
				if (index > 9 || page == 1) {
					this.$alert('功能开发中')
				} else {
					if (item.path == '/pages/index/shangquan') {
						this.shopType_index = item.title
						// wx.reLaunch({
						// 	url: item.path + '?type=' + item.title,
						// })
					} else if (index < 5) {
						this.util.ajax('shop/queryWorkTime', {}, res => {
							let data = res.data.set
							let date = new Date()
							let time = this.$shijianhour(date.getTime()).split(':')[0]
							if (parseInt(time) >= data.on_duty_time && parseInt(time) < data.off_duty_time) {
								this.$jump(item.path)
							} else {
								let text = data.on_duty_time + '点' + ' 至 ' + data.off_duty_time + '点'
								this.$alert('开放时间为 ' + text)
							}
						})
					} else {
						this.$jump(item.path)
					}
				}
			},
			// 需求类别列表
			getTypeList() {
				let that = this
				this.util.ajax('release/categoryList', {}, (res) => {
					let arr = []
					for (let i = 0; i < res.data.list.length / 15; i++) {
						arr.push(res.data.list.slice(i * 15, i * 15 + 15))
					}
					this.menuList_new = arr
				})
			},
			//关闭新人福利弹窗
			closePop() {
				this.$refs.newPeople.close()
				uni.showTabBar();
				// #ifdef MP-WEIXIN
				this.$refs.wxMessage.open()
				uni.hideTabBar();
				// #endif
			},
			// 获取新人福利跑腿卷
			getDiscount() {
				this.util.ajax('release/errandCouponList', {
					"userId": uni.getStorageSync('userId')
				}, res => {
					for (let i = 0; i < 3; i++) {
						this.coupons.push(res.data.coupon[i])
					}
				})
			},
			// 微信订阅消息弹窗
			dialogConfirm() {// 确认
				openSubscription()
				uni.showTabBar();
			},
			dialogClose() {// 关闭
				this.$refs.wxMessage.close()
				uni.showTabBar();
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
						uni.setStorageSync('swiper', that.swiperHeight)
					}
				});
			},
			// 个人信息
			getUserInfo() { 
				let that = this
				this.util.ajax('user/getUserInfo', {
					"userId": this.userId
				}, res => {
					that.village = res.data.residentialQuarterVo
					uni.setStorageSync('userInfo', res.data)
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #f5f5f5;
		position: relative;

		.header {
			position: relative;
			z-index: 1;
			padding: 30rpx 40rpx;
			background-color: $uni-color-primary;

			.city {
				line-height: 44rpx;
				font-size: 30rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}

			.village {
				line-height: 30rpx;
				font-size: 30rpx;

				image {
					width: 36rpx;
					height: 36rpx;
				}
			}
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

			swiper {
				// transition: height 0.5s linear;
			}

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
	}

	// 新人福利
	.newUser-box {
		text-align: center;

		.closeX {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 1;
			color: #fff;
		}

		.box-body-img {
			// width: 100%;
		}

		.box-btn-img {
			width: calc(100% - 29px);
			z-index: 2;
			position: absolute;
			bottom: 5rpx;
			left: 15px;
		}

		.box {
			width: 100%;
			position: absolute;
			left: 0;
			top: 140px;

			.box-list {
				width: 70%;
				margin: 0 15% 20rpx 15%;
				padding: 15rpx 0;
				border-radius: 20rpx;
				position: relative;
				display: flex;
				align-items: center;

				.list-left {
					width: 35%;
					z-index: 1;
				}

				.list-right {
					width: 60%;
					margin-left: 5%;
					z-index: 1;

					.title,
					.time {
						text-align: left;

						text {
							color: #313131;
						}
					}
				}

				.list-img {
					position: absolute;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}


		}

		.btn {
			width: 100%;
			z-index: 2;
			position: absolute;
			bottom: 0;

			.box-confirm {
				width: 50%;
				text-align: center;
				background: linear-gradient(90deg, #FEA01C, #FDD46D);
				box-shadow: 0 6rpx 0 0 #93061E;
				border-radius: 65rpx;
				margin: 0 25%;
				padding: 8rpx 0;

				.font36 {
					letter-spacing: 10rpx;
					color: #fff;
				}
			}

			.box-apply {
				text-align: center;
				padding: 20rpx 0 10rpx 0;

				.text {
					font-size: 12px;
					line-height: 30rpx;
					color: #313131;
				}
			}
		}
	}
</style>
