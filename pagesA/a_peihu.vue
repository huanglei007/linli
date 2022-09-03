<template>
	<view class="peihu">
		<view class="peihu-head">
			<image class="peihu-head-img" :src="imageurl+'static/image/img_peihu.png'" mode="widthFix"></image>
			<view class="peihu-head-text">
				<text class="font26 fontColor-333">生病住院本司空见惯，一个人也未尝不可，虽然并不是自己
					孱弱，但还是希望在最需要的时候有家人陪护，不得已而一
					拖再拖，延误了看病的时机。</text>
			</view>
		</view>
		<view class="peihu-content">
			<view class="peihu-content-title">
				<text class="font28">陪护服务内容</text>
				<!-- <view class="peihu-content-title-before"></view> -->
			</view>
			<view class="peihu-content-content">
				<text>
					1、照料老人饮食起居，打扫卫生等。
				</text>
				<text>
					2、协助维护老人卫生、仪表、仪容，当老人因个人原因
					不能完成个人清洁、整理自己时，护工帮助其完成，如：
					洗脸、洗头、擦洗身体、换衣、协助如厕或便盆便壶等。
				</text>
				<text>
					3、协助老人满足营养供给，如：喂饭、喂水、进餐等。
				</text>
				<text>
					4、维护老人安全。协助其上下床、坐轮椅等；陪伴其户
					外活动；
					保证其安全，避免摔倒、摔伤。
				</text>
				<text>
					5、注意观察老人情况，如：精神异常、局部疼痛、发热、
					腹泻等，及时告知医护人员或通知其家属。
				</text>
				<text>
					6、房间内卫生：打扫房内卫生，开窗透气，保持地面整
					洁、房间内无异味，定期更换床单、被罩、枕套等。保持
					室内干净整洁，物品摆放整齐。
				</text>
			</view>
		</view>
		<!-- 立即预约 -->
		<a-order url="a_peihu_yuyue"></a-order>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageurl: ''
			}
		},
		onLoad() {
			this.imageurl = this.globalData.imageurl
		},
		methods: {},
	}
</script>

<style lang="less">
	.peihu {

		.peihu-head,
		.peihu-content {
			padding: 30rpx 40rpx;
		}

		.peihu-head {
			margin: 20rpx 0;
			background-color: #fff;

			.peihu-head-img {
				width: 100%;
			}

			.peihu-head-text {
				padding-top: 20rpx;

				text {
					line-height: 40rpx;
				}
			}
		}

		.peihu-content {
			margin-bottom: 150rpx;
			background-color: #fff;

			.peihu-content-title {
				padding-bottom: 30rpx;
				position: relative;
			}


			.peihu-content-content {
				text {
					font-size: 26rpx;
					color: #333333;
					display: inline-block;
					line-height: 40rpx;
				}
			}
		}
	}
</style>
