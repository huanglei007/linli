<template>
	<view class="">
		<view @click="open">
			<slot></slot>
		</view>
		<uni-popup ref='popup' type="bottom" background-color="#fff">
			<view class="list">
				<view class="title flexd flex-center jubetween">
					<view @click="cancel()">取消</view>
					<view class="blue" @click="submit()">确定</view>
				</view>
				<view class="flexd listBox">
					<scroll-view scroll-y="true" class="left">
						<view>
							<view class="item" 
							@click="changeList(i)"
							:class="i==dateIndex?'active':''" v-for="(item,i) in date" :key="i">
								{{item.text}}
							</view>
						</view>
					</scroll-view>
					<scroll-view scroll-y="true" class="right">
						<view>
							<view class="item flexd jubetween flex-center"
							@click="chiose(i)"
							v-for="(item,i) in list" :key="i"
							:class="i==listIndex[1]&&dateIndex==listIndex[0]?'active':''">
								<view class="text">{{dateIndex==0&&i==0?'1小时内': item.star+' - '+item.end}}</view>
								
								<!-- <image src="/static/image/icon_jd.png" mode=""></image> -->
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"timeRange",
		data() {
			
			return {
				date: [],
				dateIndex: 0,
				list: [],
				listIndex: [0,0]
			};
		},
		mounted(){
			
		},
		methods:{
			open(){
				let that=this
				let systemTime=new Date().getTime()
				
				this.util.ajax('common/getSystemTime',{},e=>{
					systemTime=e.data.systemTime
					let time=parseInt(systemTime.toString())
					let date=[],text
					for(let i=0;i<2;i++){
						if(time==systemTime){
							text='今天'
						}else if(time==systemTime+86400000){
							text='明天'
						}else{
							text=this.$shijiandate(time)
						}
						date.push({
							text: text,
							value: this.$shijiandate(time),
							children: []
						})
						if(time!==systemTime){
							for(let x=7;x<21;x++){
								date[i].children.push({
									star: (x<9?'0'+(x+1):(x+1))+':00',
									end: (x<9?'0'+(x+2):(x+2))+':00',
									parent: i
								})
							}
						}
						time+=86400000
					}
					let dayStar=new Date(new Date().toLocaleDateString()).getTime()+28800000
					time=Math.max(parseInt(systemTime.toString()),dayStar)
					let endToday=new Date(new Date().toLocaleDateString()).getTime()+79200000
					if(time>endToday){
						date.splice(0,1)
					}else{
						for(let i=time;i<=endToday;i+=3600000){
							date[0].children.push({
								star: this.$shijianhour2(i),
								end: this.$shijianhour2(i+3600000),
								parent: 0
							})
						}
					}
					this.date=date
					this.list=date[0].children
					this.$refs.popup.open()
				})
			},
			cancel(){
				this.$refs.popup.close()
			},
			changeList(i){
				this.dateIndex=i
				this.list=this.date[i].children
			},
			chiose(i){
				this.listIndex=[this.dateIndex,i]
			},
			submit(){
				this.$emit('change',{
					date: this.date[this.listIndex[0]].value,
					star: this.date[this.listIndex[0]].children[this.listIndex[1]].star,
					end: this.date[this.listIndex[0]].children[this.listIndex[1]].end,
					text: this.listIndex[0]==0&&this.listIndex[1]==0?'1小时内':this.date[this.listIndex[0]].text+ ' '+ this.date[this.listIndex[0]].children[this.listIndex[1]].star+'-'+this.date[this.listIndex[0]].children[this.listIndex[1]].end
				})
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	.list{
		background-color: #fff;
		z-index: 1;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		box-sizing: border-box;
		.listBox{
			height: 400rpx;
			scroll-view{
				height: 100%;
			}
			.left{
				background-color: #f5f5f5;
				width: 30%;
				.item{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 28rpx;
					&.active{
						background-color: #fff;
					}
				}
			}
			.right{
				background-color: #fff;
				width: 70%;
				.item{
					padding: 0 30rpx;
					.text{
						font-size: 28rpx;
						height: 80rpx;
						line-height: 80rpx;
					}
					image{
						width: 24rpx;
						height: 24rpx;
						display: none;
					}
					&.active{
						background-color: #f5f5f5;
					}
				}
			}
		}
	}
	.title{
		view{
			font-size: 28rpx;
			padding: 20rpx 30rpx;
		}
		.blue{
			color: #007AFF;
		}
	}
</style>
