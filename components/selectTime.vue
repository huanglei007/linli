<template name="selectTime">
	<view>
		<view class="btn">
			<slot name="cancle">
				<view @click="cancle">取消</view>
			</slot>
			<slot name="confirm">
				<view @click="getTime">确定</view>
			</slot>
			
		</view>
		<picker-view style="background-color: #fff;" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange"
			class="picker-view">
			<picker-view-column>
				<view class="item" style="color: #212121;" v-for="(item,index) in years" :key="index">{{item}}年</view>
			</picker-view-column>
			<picker-view-column v-if="mode != 'year'">
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
			<picker-view-column v-if="mode == 'date'">
				<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		name: 'selectTime',
		props:{
			mode:String
		},
		data: function() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: 50px;`,
				timeData:{}
			}
		},
		methods: {
			bindChange: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				if(this.mode=='date'){
					this.timeData = {
						year:this.year,
						month:this.month>=10?this.month:'0'+this.month,
						day:this.day>=10?this.day:'0'+this.day,
					}
					
				}else if(this.mode == 'month'){
					this.timeData = {
						year:this.year,
						month:this.month>=10?this.month:'0'+this.month
					}
				}else{
					this.timeData = {
						year:this.year
					}
				}
			},
			getTime(){
				this.$emit('getdate',this.timeData)
				console.log(this.timeData)
			},
			cancle(){
				this.$emit('cancle')
			}
		}
	}
</script>

<style>
	.picker-view {
		width: 100vw;
		height: 200px;
	}

	.item {
		height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
		line-height: 50px;
	}
	
	.btn{
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		padding: 24rpx;
		border-bottom: 1px solid rgba(153,153,153,.1);
		background: #fff;
		border-bottom: 1rpx solid #999;
		border-radius: 16rpx 16rpx 0 0;
	}
	
	.btn>view:nth-child(2){
		color: #007AFF;
	}
	
	.btn>view:nth-child(1){
		color: rgba(188,188,188,1);
	}
</style>
