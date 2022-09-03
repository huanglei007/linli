<template>
	<view class="">
		<view @click="open">
			<slot></slot>
		</view>
		<view class="pag" v-if="visible">
			<view class="bg" @click="cancel"></view>
			<view class="list">
				<view class="title flexd flex-center jubetween">
					<view @click="cancel()">取消</view>
					<view class="blue" @click="sumbit()">确定</view>
				</view>
				<picker-view :indicator-style="indicatorStyle" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item,index) in hours" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in mins" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"timePicker",
		data() {
			const mins=[]
			for(let i=0;i<60;i++){
				let x=''+i
				if(x.length==1) x=0+x
				mins.push(x)
			}
			return {
				hours: [],
				mins,
				hour: '',
				min: '',
				visible: false,
				indicatorStyle: `height: 50px;`
			};
		},
		props:{
			star: {
				default: 1,
				type: Number
			},
			end: {
				default: 24,
				type: Number
			},
		},
		mounted(){
			
		},
		methods: {
			bindChange: function (e) {
				console.log(e)
				const val = e.detail.value
				this.hour = this.hours[val[0]||0]
				this.min = this.mins[val[1]||0]
				
			},
			sumbit(){
				let e=this.hour+':'+this.min
				this.$emit('change',e)
				this.visible=false
			},
			cancel(){
				this.visible=false
			},
			open(){
				//console.log(this.star)
				for(let i=this.star;i<this.end+1;i++){
					let x=''+i
					if(x.length==1) x=0+x
					this.hours.push(i)
				}
				this.visible=true
				this.hour=this.hours[0]
				this.min=this.mins[0]
			}
		}
	}
</script>

<style lang="scss">
	.pag{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		.bg{
			background-color: rgba($color: #000000, $alpha: .3);
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
		.list{
			background-color: #fff;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			max-height: 60%;
			z-index: 1;
			padding: 20rpx;
			border-top-right-radius: 30rpx;
			border-top-left-radius: 30rpx;
			box-sizing: border-box;
		}
		.title{
			view{
				font-size: 28rpx;
				padding: 0 20rpx;
			}
			.blue{
				color: #007AFF;
			}
		}
	}
	.picker-view {
		width: 100%;
		height: 400rpx;
	}
	.item {
		line-height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 28rpx;
	}
</style>
