<template>
	<view class="content">
		<view class="topheard">
			<view class="tias" :style="{paddingTop:htosp +'px'}">
				<view class="bap flexd jubetween">
					<view class="user flexd">
						<image :src="userData.head_img!==''?Img(userData.head_img):'/static/image/icon_mr.png'" mode="">
						</image>
						<view>
							<view class="nickname">{{userData.nick_name||'用户名称'}}</view>
							<view class="shengray">{{userData.phone||''}}</view>
						</view>
					</view>
					<image @click="$jump('/pages/user/set')" src="/static/image/icon_sz.png" mode="" class="shezhi">
					</image>
				</view>
				<!-- 我的店铺 -->
				<view class="my-shop">
					<navigator v-if="userData.user_type==3" class="my-shop-title" hover-class="none"
						url="/pages/user/shopSet/shopSet">
						<view class="my-shop-title-icon">
							<image style="width:40rpx;height:40rpx;margin-right: 10rpx;" src="/static/img/icon_shop.png"
								mode=""></image>
							<text class="font30">我的店铺</text>
						</view>
						<image style="width:15rpx;height:15rpx;" src="/static/img/icon_right.png" mode=""></image>
					</navigator>
				</view>
			</view>
			<view class="flexd juaround tapeu">
				<view class="item" @click="$jump('./collection/collection')">
					<view class="zhonum">{{userData.collection_count}}</view>
					<view class="gray">关注</view>
				</view>
				<!-- <view class="item" @click="$jump('./ticket')">
					<view class="zhonum">{{userData.voucher_count}}</view>
					<view class="gray">我的福利</view>
				</view> -->
				<view class="item">
					<view class="zhonum">{{userData.integral_count}}</view>
					<view class="gray">积分</view>
				</view>
			</view>
		</view>
		<view class="uesermore">
			<view class="order-wrapper" @click="$jump('/pages/user/wallet')">
				<view class="order-hd flexd jubetween">
					<view class="left">我的钱包</view>
					<view class="right flexd">
						<image src="/static/image/icon_gd.png" mode=""></image>
					</view>
				</view>
				<view class="order-bd flexd juaround">
					<block>
						<view class="order-item texcenter" hover-class="none">
							<view class="pic">
								<text>{{Math.floor(userData.balance)}}</text>
								.{{userData.balance.toFixed(2).split('.')[1]}}
							</view>
							<view class="txt shengray">待提现</view>
						</view>
					</block>
					<block>
						<view class="order-item texcenter" hover-class="none">
							<view class="pic">
								<text>{{Math.floor(userData.transfer_amount)}}</text>
								.{{userData.transfer_amount.toFixed(2).split('.')[1]}}
							</view>
							<view class="txt shengray">已提现</view>
						</view>
					</block>
				</view>
			</view>
			<view class="order-wrapper">
				<view class="order-hd flexd jubetween">
					<view class="left">我的订单</view>
					<view class="right flexd" @click="$jump('/pages/user/myOrder/myOrder')">
						<image src="/static/image/icon_gd.png" mode=""></image>
					</view>
				</view>
				<view class="order-bd flexd juaround">
					<block v-for="(item,index) in orderMenu" :key="index">
						<div class="order-item texcenter" hover-class="none" @click="$jump(item.url)">
							<view class="order-status-num white" v-if="item.len!==0">{{item.len}}</view>
							<view class="pic">
								<image :src="item.img" mode=""></image>
							</view>
							<view class="txt shengray">{{item.title}}</view>
						</div>
					</block>
				</view>
			</view>
			<view class="title">
				我的服务
			</view>
			<view class="outtake">
				<view v-if="userData.user_type==3" class="oulist flexd jubetween" hover-class="none"
					url="/pages/user/shopSet/a_shop" @click="$jump('/pagesA/a_shop')">
					<view class="flexd">
						<image src="/static/image/icon_sj.png" mode=""></image>
						<view>商家设置</view>
					</view>
					<image src="/static/image/icon_gd.png" mode="" class="you"></image>
				</view>
				<view v-if="userData.user_type==4" class="oulist flexd jubetween" hover-class="none"
					@click="$jump(userData.status!=-1?'/pages/user/darenSet/darenSet':'')">
					<view class="flexd">
						<image src="/static/image/icon_dr.png" mode=""></image>
						<view>达人设置</view>
					</view>
					<image src="/static/image/icon_gd.png" mode="" class="you"></image>
				</view>
				<view v-if="userData.user_type==5" class="oulist flexd jubetween" hover-class="none"
					url="/pages/user/applyShop" @click="$jump('/pages/user/applyShop')">
					<view class="flexd">
						<image src="/static/image/icon_sj.png" mode=""></image>
						<view>商家入驻</view>
					</view>
					<image src="/static/image/icon_gd.png" mode="" class="you"></image>
				</view>

				<view v-if="userData.user_type==5" class="oulist flexd jubetween" hover-class="none"
					@click="$jump('/pages/index/applyDaren')">
					<view class="flexd">
						<image src="/static/image/icon_dr.png" mode=""></image>
						<view>达人入驻</view>
					</view>
					<view class="flexd">
						<view :class="{'uni-warning': userData.status==-2,'uni-success': userData.status==-1}">
							{{userData.status==-1?'审核中':''}}
							{{userData.status==-2?'未通过':''}}
						</view>
						<image src="/static/image/icon_gd.png" mode="" class="you"></image>
					</view>
					<view class="remark" v-if="userData.remarks">
						{{userData.remarks}}
					</view>
				</view>

				<block v-for="(item,index) in usout" :key="index">
					<div class="oulist flexd jubetween" hover-class="none" @click="$jump(item.url)">
						<view class="flexd">
							<image :src="item.img" mode=""></image>
							<view>{{item.title}}</view>
						</view>
						<image src="/static/image/icon_gd.png" mode="" class="you"></image>
					</div>
				</block>
			</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" confirmText="确认" :title="popupForm.title" :content="popupForm.content"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				htosp: 0,
				imageurl: '',
				userId: '',
				usout: [
					// {
					// 	img: '/static/image/icon_yy.png',
					// 	title: '我的预约',
					// 	url: '/pages/user/yuyue/yuyue',
					// 	len: 0
					// },
					{
						img: '/static/image/icon_fuli.png',
						title: '我的福利',
						// url: '/pagesA/a_myWelfare',
						url: "./ticket",
						len: 0
					},
					{
						img: '/static/image/icon_dw.png',
						title: '我的地址',
						url: '/pages/user/address',
						len: 0
					}, {
						img: '/static/image/icon_gywm.png',
						title: '关于我们',
						url: '/pages/user/about',
						len: 0
					}
				],
				orderMenu: [{
						img: '/static/image/wdfb.png',
						title: '我的发布',
						url: '/pages/user/myOrder/myOrder?type=0',
						len: 0
					},
					{
						img: '/static/image/icon_wdjd.png',
						title: '我的接单',
						url: '/pages/user/myOrder/myOrder?type=1',
						len: 0
					},
					{
						img: '/static/image/icon_wdjd.png',
						title: '商品订单',
						url: '/pages/user/myOrder/myOrder?type=2',
						len: 0
					}
				],
				userData: {
					"balance": 0,
					"collection_count": 0,
					"head_img": "",
					"integral_count": 0,
					"phone": "",
					"transfer_amount": 0,
					"user_id": 5,
					"user_type": 0,
					"voucher_count": 0
				},
				// 我的店铺
				form: {
					"address": "", //商家地址
					"business_license": "", //营业执照
					"business_status": 0, //	营业状态(0.休息中 1.营业中)
					"contact_name": "", //联系人
					"contact_phone": "", //联系电话
					"createtime": "", //创建时间
					"house_number": "", //门牌号
					"id": 0, //编号
					"images": "../../../static/img/icon_xiangji.png", //相关图片
					"initial_delivery_fee": 0, //起送费
					"isvalid": 0, //是否有效(0有效 1无效)
					"latitude": "", //纬度
					"longitude": "", //经度
					"operation_point_id": 0, //所属运营点ID
					"refuse_reason": "", //拒绝原因
					"remarks": "", //审核备注
					"score": 0, //评分
					"service_begin_time": "", //服务开始时间
					"service_content": "", //服务内容
					"service_end_time": "", //服务结束时间
					"service_guarantee": "", //服务保障
					"service_process": "", //服务流程
					"shop_logo": "", //商家展示logo
					"shop_name": "大龙燚", //商家名称
					"shop_sub_type_id": 0, //商家子类型ID
					"shop_type_id": 1, //商家类型ID
					"status": 0, //审核状态(-1申请入驻审核中 -2申请入驻被拒绝 0商家设置审核中 1审核通过 2商家设置被拒绝),1、商家入驻：等于null或-2时，可以申请，其余提示已入驻；2、商家管理：等于0时提示审核中，其余可以进入
					"user_id": 0 //用户ID
				},
				// 店铺审核通知
				popupForm: {
					title: '',
					content: ''
				}
			}
		},
		onShow() {
			this.loadmore();
			this.getMyShop()
		},
		onLoad() {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId')
			this.imageurl = this.globalData.imageurl
		},
		methods: {
			loadmore() {
				let that = this;
				that.util.ajax('user/getUserInfo', {
					"userId": that.userId
				}, function(res) {
					that.userData = res.data
					uni.setStorageSync('userInfo', res.data)
				})
			},
			// 获取我的店铺信息
			getMyShop() {
				this.util.ajax('shop/getShopInfo', {
					"userId": uni.getStorageSync('userId'),
				}, res => {
					this.form = res.data
				})
			},
			//店铺审核弹窗
			//确认
			dialogConfirm() {
				this.$refs.alertDialog.open()
			},
		}
	}
</script>

<style lang='scss'>
	.content {
		padding-bottom: 47rpx;

		.topheard {
			width: 100%;
			position: relative;
			background-image: url('https://linli-community-api.niuclub.net/image/static/image/my_bg.png');
			background-size: 100% auto;
			background-repeat: no-repeat;

			.chendi {
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
			}

			.tias {
				width: 100%;

				.bap {
					padding: 0 30rpx 64rpx 30rpx;
				}

				.user {
					image {
						width: 120rpx;
						height: 120rpx;
						margin-right: 20rpx;
						border-radius: 50%;
					}

					.nickname {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						margin-bottom: 21rpx;
					}
				}

				.shezhi {
					width: 40rpx;
					height: 40rpx;
				}

				.my-shop-title {
					padding: 20rpx 30rpx;
					border-radius: 20rpx;
					margin: 0 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					background: linear-gradient(273deg, #FFB881 0%, #EFD05B 100%);

					.my-shop-title-icon {
						display: flex;
						align-items: center;

						text {
							color: #fff;
						}

					}
				}
			}

			.tapeu {
				background: #fff;
				margin-top: 20rpx;
				padding: 45rpx 0;

				.zhonum {
					font-size: 36rpx;
					font-weight: bold;
				}

				.item {
					/* width: 33%; */
					flex: 1;
					position: relative;
					text-align: center;

					&::before {
						content: '';
						display: block;
						position: absolute;
						top: 50%;
						right: 0;
						transform: translateY(-50%);
						width: 4rpx;
						height: 40rpx;
						background-color: #d8d8d8;
					}

					&:last-child {
						&::before {
							display: none;
						}
					}
				}
			}
		}

		.uesermore {
			padding: 0 20rpx;
			margin-bottom: 150rpx;

			.title {
				font-size: 30rpx;
				line-height: 2;
				margin-top: 20rpx;
				margin-left: 20rpx;
			}

			.repair {
				width: 100%;
				margin-top: 20rpx;

				.commission {
					width: 350rpx;
					height: 160rpx;
					background: #FFFFFF;
					border-radius: 8rpx;

					view {
						margin: auto 0;
					}

					image {
						width: 94rpx;
						height: 94rpx;
						margin: auto 0;
					}
				}
			}

			.order-wrapper {
				width: 100%;
				margin-top: 20rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				padding: 33rpx 0;

				.order-hd {
					padding: 0 34rpx;
					color: #282828;

					view {
						margin: auto 0;
					}

					.left {
						font-weight: bold;
						font-size: 32rpx;
					}

					image {
						width: 18rpx;
						height: 18rpx;
						margin: auto 0;
						margin-left: 10rpx;
					}
				}

				.order-bd {
					margin-top: 47rpx;

					.order-item {
						width: 25%;
						position: relative;

						.pic {
							text {
								font-size: 40rpx;
								font-weight: bold;
							}

							image {
								width: 50rpx;
								height: 50rpx;
							}
						}

						.order-status-num {
							width: 35rpx;
							height: 35rpx;
							background: #FF3709;
							border-radius: 50%;
							position: absolute;
							font-size: 20rpx;
							right: 45rpx;
							top: -15rpx;
							z-index: 9;
						}

						.txt {
							margin-top: 15rpx;
						}
					}
				}
			}

			.outtake {
				.oulist {
					height: 98rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					margin-top: 25rpx;
					padding: 0 30rpx;

					image {
						width: 40rpx;
						height: 40rpx;
						margin: auto 0;
						margin-right: 20rpx;
					}

					view {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 400;
						margin: auto 0;
					}

					.you {
						width: 24rpx;
						height: 24rpx;
						margin-right: 0;
					}
				}
			}
		}

	}
</style>
