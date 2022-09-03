<template>
	<view class="baojie-yuyue-text">
		<view class="baojie-yuyue-text-title">
			<text class="font30">备注</text>
		</view>
		<view class="baojie-yuyue-text-textarea">
			<textarea v-model="textarea" placeholder-style="color:#CCCCCC" placeholder="补充描述您的要求，或其他特殊情况" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textarea: ''
			}
		},
		watch: {
			// 传值给父组件
			textarea(newVal, oldVal) {
				// #ifdef APP-PLUS || MP-WEIXIN
				this.$parent.getSubComponentData('备注', newVal)
				// #endif
				// #ifdef H5
				this.$parent.$parent.getSubComponentData('备注', newVal)
				// #endif
			}
		},
	}
</script>

<style lang="less">
	.baojie-yuyue-text {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;

		.baojie-yuyue-text-title {
			margin-bottom: 20rpx;
		}

		.baojie-yuyue-text-textarea {
			textarea {
				height: 150rpx
			}
		}
	}
</style>
