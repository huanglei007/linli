<template>
	<view class="order_detail-box">
		<!-- 类别 -->
		<view class="type-box">
			<view class="type-box-text flexd jubetween">
				<view class="text-title">
					<text class="font32">{{form.categoryName}}</text>
				</view>
				<view class="text-price fontColor-FF6000">
					<text class="font32">￥</text>
					<text class="font42">{{form.commission}}</text>
				</view>
			</view>
			<view class="type-box-upTime flexd jubetween">
				<view class="upTime-title">
					<text class="font28 fontColor-999">上门时间</text>
				</view>
				<view class="upTime-time font28">
					<uni-dateformat :date="form.start_time" format='MM/dd hh:mm '></uni-dateformat>
					<text> 至 </text>
					<uni-dateformat :date="form.end_time" format=' MM/dd hh:mm'></uni-dateformat>
				</view>
			</view>
			<!-- 陪护看病 -->
			<view class="escort-box" v-if="form.categoryId == 19">
				<view v-if="timelist[timeIndex]" class="escort-time flexd jubetween">
					<text class="font28 fontColor-999">
						<text v-if="form.service_item==1">陪护</text>
						<text v-else>看病</text>
						时间</text>
					<text class="font28">{{timelist[timeIndex].accompany_time}}</text>
				</view>
				<view class="escort-age flexd jubetween">
					<text class="font28 fontColor-999">陪护年龄</text>
					<text class="font28">{{form.accompany_age}}</text>
				</view>
				<view class="escort-sex flexd jubetween">
					<text class="font28 fontColor-999">陪护性别</text>
					<text v-if="form.accompany_sex==0" class="font28">男</text>
					<text v-else class="font28">女</text>
				</view>
				<view class="escort-place flexd jubetween">
					<text class="font28 fontColor-999">
						<text v-if="form.service_item==1">陪护</text>
						<text v-else>看病</text>
						场所</text>
					<text class="font28">{{form.accompany_place}}</text>
				</view>
			</view>
			<!-- 私厨预约 -->
			<view v-if="form.categoryId == 11" class="kitchen-box">
				<view class="kitchen-num flexd jubetween">
					<text class="font28 fontColor-999">菜品数量</text>
					<text class="font28">{{form.dishes_number}}</text>
				</view>
				<view class="kitchen-type flexd jubetween">
					<text class="font28 fontColor-999">菜品</text>
					<text v-if="form.type == 0" class="font28">自备</text>
					<text v-else class="font28">代买</text>
				</view>
			</view>
			<!-- 喂猫喂狗 -->
			<view v-if="form.categoryId == 10" class="catdog-box flexd jubetween">
				<view class="catdog-title">
					<text class="font28 fontColor-999">宠物</text>
				</view>
				<view class="catdog-type font28">
					<text>{{form.category_name2}}</text>
				</view>
			</view>
		</view>
		<!-- 陪护看病-服务对象 -->
		<view class="escort-obj-box" v-if="form.categoryId == 19">
			<view class="obj-title">
				<text class="font28">服务对象</text>
			</view>
			<view class="obj-relationship flexd jubetween">
				<text class="font28 fontColor-999">与本人关系</text>
				<text class="font28">{{form.service_object_relation}}</text>
			</view>
			<view class="obj-name flexd jubetween">
				<text class="font28 fontColor-999">姓名</text>
				<text class="font28">{{form.service_object_name}}</text>
			</view>
			<view class="obj-sex flexd jubetween">
				<text class="font28 fontColor-999">性别</text>
				<text v-if="form.service_object_sex==0" class="font28">男</text>
				<text v-else class="font28">女</text>
			</view>
			<view class="obj-age flexd jubetween">
				<text class="font28 fontColor-999">年龄</text>
				<text class="font28">{{form.service_object_age}}</text>
			</view>
			<view class="obj-symptom flexd jubetween">
				<text class="font28 fontColor-999">症状</text>
				<text class="font28">{{form.service_object_symptom}}</text>
			</view>
		</view>
		<!-- 地址 -->
		<view class="address-box">
			<view class="box-title">
				<!-- 喂猫喂狗 -->
				<text v-if="form.categoryId == 10" class="font28 fontColor-999">
					<text v-if="form.handover_mode==0">上门自取</text>
					<text v-else>指定位置</text>
				</text>
				<!-- 陪护看病 -->
				<text v-else-if="form.categoryId == 19||form.categoryId == 10" class="font28 fontColor-999">
					<text v-if="form.handover_mode==0">上门服务</text>
					<text v-else>指定地点</text>
				</text>
				<!-- 默认 -->
				<text v-else class="font28 fontColor-999">上门地址</text>
			</view>
			<view class="address-news">
				<view class="news-contact flexd flex-center jubetween">
					<text class="font30">{{form.contact_name}} {{form.contact_phone}}</text>
					<image @click="phone(form.contact_phone)" class="icon32" src="/static/image/icon_phone.png" mode="">
					</image>
				</view>
				<view class="news-address flexd flex-center jubetween">
					<text class="font28 fontColor-666">{{form.address}}</text>
					<image class="icon32" src="/static/image/icon_dw.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="remarks-box">
			<text v-if="!form.leaveMessag" class="fontColor-999">没留下什么, 试试线上沟通~</text>
			<text v-else>{{form.leaveMessage}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['datas', 'orderId'],
		data() {
			return {
				userId: uni.getStorageSync('userId'),
				userInfo: uni.getStorageSync('userInfo'),
				form: {},
				timelist: [],
				timeIndex: null,
			}
		},
		created() {
			this.form = this.datas
			if (this.form.categoryId == 19) {
				this.getTimeList()
			}
		},
		methods: {
			// 陪护时间列表
			getTimeList() {
				this.util.ajax('personalDemand/accompanyingDoctorTime', {
					'type': this.form.service_item
				}, res => {
					this.timelist = res.data.list
					for (let i = 0; i < res.data.list.length; i++) {
						if (res.data.list[i].id == this.form.accompany_time_id) {
							this.timeIndex = i
						}
					}
				})
			},
			// 拨打电话
			phone(e) {
				uni.makePhoneCall({
					phoneNumber: e
				});
			}
		}
	}
</script>

<style lang="less">
	.order_detail-box {
		padding: 0 30rpx;

		.type-box,
		.address-box,
		.remarks-box,
		.escort-obj-box {
			padding: 35rpx;
			margin-top: 35rpx;
			background-color: #fff;
			border-radius: 20rpx;
		}

		.type-box {
			.type-box-text {
				border-bottom: 1px solid #E8E8E8;
				padding-bottom: 30rpx;
				margin-bottom: 30rpx;
			}

			.type-box-upTime {
				padding-bottom: 15rpx;
			}

			.kitchen-box {
				.kitchen-num {
					padding-bottom: 15rpx;
				}
			}

			.escort-box {
				view {
					padding-bottom: 15rpx;
				}
			}
		}

		.escort-obj-box {
			padding: 35rpx 0;

			.obj-title {
				border-bottom: 1px solid #E8E8E8;
				margin-bottom: 30rpx;
			}

			view {
				padding: 0 35rpx 15rpx 35rpx;
			}
		}

		.address-box {
			padding: 35rpx 0;

			.box-title {
				padding: 0 35rpx 15rpx 35rpx;
				border-bottom: 1px solid #E8E8E8;
			}

			.address-news {
				padding: 30rpx 35rpx 0 35rpx;

				.news-contact {
					padding-bottom: 10rpx;

					.font30 {
						font-weight: 500;
					}
				}
			}
		}

		.remarks-box {
			min-height: 150rpx;
		}
	}

	.commBox {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 8;
		background-color: #fff;

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
				background: linear-gradient(180deg, #FDEC7E 0%, #F9D448 100%);
				line-height: 2.3;
				padding: 0 20rpx;
				border-radius: 10rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
