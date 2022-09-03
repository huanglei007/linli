<template>
	<view class="peihu-yuyue-uptime">
		<view class="peihu-yuyue-uptime-title">
			<text class="font30">上门时间</text>
		</view>
		<view class="peihu-yuyue-uptime-body" @click="openTimePicker">
			<view class="peihu-yuyue-uptime-body-start">
				<view class="start-text">
					<text>开始时间</text>
				</view>
				<view class="time-start">
					<text v-if="times[0]">{{times[0]}}</text>
				</view>
			</view>
			<view class="peihu-yuyue-uptime-body-mid"></view>
			<view class="peihu-yuyue-uptime-body-end">
				<view class="end-text">
					<text>结束时间</text>
				</view>
				<view class="time-end">
					<text v-if="times[1]">{{times[1]}}</text>
				</view>
			</view>
			<uni-datetime-picker ref="timePicker" class="uni-datetime-picker" v-model="timePicker" type="datetimerange"
				@change="dateChange" :hide-second='true' :border="false" rangeSeparator=" " />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 开始 结束时间
				timePicker:[],
				// 开始 结束时间(格式化)
				times: []
			}
		},
		watch:{
			// 传值给父组件
			timePicker(newVal,oldVal){
				// #ifdef APP-PLUS || MP-WEIXIN
				this.$parent.getSubComponentData('上门时间',newVal[0]+'/'+newVal[1])
				// #endif
				// #ifdef H5
				this.$parent.$parent.getSubComponentData('上门时间',newVal[0]+'/'+newVal[1])
				// #endif
			}
		},
		methods: {
			// 监听上门时间
			dateChange(newval) {
				let that = this
				for(let i = 0; i < newval.length; i++){
					let month = newval[i].split(' ')[0].split('-')[1]
					let day = newval[i].split(' ')[0].split('-')[2]
					let hour = newval[i].split(' ')[1].split(':')[0]
					let branch = newval[i].split(' ')[1].split(':')[1]
					let time = month+'月'+day+'日'+hour+':'+branch
					that.times.push(time)
				}
			},
			// 打开时间弹窗
			openTimePicker(){
				this.$refs.timePicker.show()
			},
		}
	}
</script>

<style lang="less">
	.peihu-yuyue-uptime {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		position: relative;

		.peihu-yuyue-uptime-title {
			margin-bottom: 30rpx;
		}

		.peihu-yuyue-uptime-body {
			height: 175rpx;
			padding: 20rpx 0;
			border-radius: 12rpx;
			background-color: #F5F5F5;
			display: flex;
			justify-content: space-between;
			position: relative;
			
			.peihu-yuyue-uptime-body-mid {
				width: 2rpx;
				background-color: #CCCCCC;
			}

			.peihu-yuyue-uptime-body-start {
				flex: 1;
				padding-left: 30rpx;

				.start-text {
					text {
						color: #666666;
					}
				}
			}

			.peihu-yuyue-uptime-body-end {
				flex: 1;
				padding-left: 30rpx;

				.end-text {
					text {
						color: #666666;
					}
				}
			}
		}
	}

	.uni-datetime-picker {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.time-start,
	.time-end{
		margin-top: 50rpx;
		margin-left: 20rpx;
	}
</style>
