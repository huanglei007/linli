<template>
	<view class="maogou">
		<view class="maogou-img">
			<image :src="imageurl+'static/image/img_maogou.png'" mode="widthFix"></image>
		</view>
		<view class="maogou-title">
			<image :src="imageurl+'static/image/img_maogou_text.png'" mode="widthFix"></image>
		</view>
		<!-- 立即预约 -->
		<a-order url='a_maogou_yuyue'></a-order>
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
		}
	}
</script>

<style lang="less">
	.maogou-img,
	.maogou-title {
		image {
			width: 100%;
		}
	}
</style>
