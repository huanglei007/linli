<template>
	<view class="conten">
		<view class="header " :style="{paddingTop: htosp+'px'}">
			<view class="flexd jubetween">
				<view class="city flexd flex-center" @click="$jumpsw('/pages/user/index')">
					<image src="/static/image/icon_gb.png" mode=""></image>
					我的钱包
				</view>
				<view class="village" @click="$jump('/pages/user/tixian')">
					提现
				</view>
			</view>
		</view>
		<view class="total flexd jubetween">
			<view class="item active">
				<view class="num">
					<text>{{Math.floor(balance)}}</text>.{{balance.toFixed(2).split('.')[1]}}
				</view>
				<view class="sub">
					可提现
				</view>
			</view>
			<view class="item active">
				<view class="num">
					<text>{{Math.floor(frozen_amount)}}</text>.{{frozen_amount.toFixed(2).split('.')[1]}}
				</view>
				<view class="sub">
					已冻结
				</view>
			</view>
		</view>
		<view class="flexd flex-center">
			<view class="timeBox flexd flex-center">
				<view class="time">
					<dyDatePicker timeType="month" @getData="getDate" :placeholder="timetun(date)" minSelect="2010/01/01" maxSelect="2050/12/31"></dyDatePicker>
				</view>
				<image src="/static/image/icon_down.png" mode="widthFix"></image>
			</view>
			<picker :value="shopIndex" :range="shopList" @change="bindPickerChange">
				<view class="uni-input">{{shopList[shopIndex]}}</view>
			</picker>
		</view>
		<view class="list">
			<view class="item flexd flex-center jubetween" v-for="(item,i) in list" :key="i">
				<view class="left flexd flex-center">
					<image class="img" src="/static/image/icon_tx.png" mode="widthFix"></image>
					<view class="mess">
						<view class="title mb-10">{{item.typeName}}</view>
						<view class="gray">{{$shijian(item.createtime)}}</view>
					</view>
				</view>
				<view class="price">
					￥<text>{{item.amount}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import dyDatePicker from '@/components/dy-Date/dy-Date.vue';
	export default {
		components: {
			dyDatePicker
		},
		data() {
			const currentDate = this.$shijianymd(new Date())
			return {
				htosp: 0,
				userId: 0,
				list: [],
				balance: 0,
				frozen_amount: 0,
				date: currentDate,
				curPage: 1,
				type: 0,
				isfoot: false,
				shopList: ['全部','提现记录','冻结记录'],
				shopIndex: 0,
			}
		},
		computed: {
			// startDate() {
			// 	return this.getDate('start');
			// },
			// endDate() {
			// 	return this.getDate('end');
			// }
		},
		onLoad() {
			this.htosp=uni.getStorageSync('htop')
			this.userId=uni.getStorageSync('userId')
			let that=this
			this.util.ajax('member/myWallet',{
				"userId": this.userId
			},res=>{
				that.balance=res.data.balance
				that.frozen_amount=res.data.frozen_amount
			})
			this.getNewList()
		},
		onReachBottom() {
			if(!this.isfoot){
				this.curPage++
				this.getlist()
			}
		},
		methods: {
			timetun(data){
				return data.split('-')[0]+'年'+data.split('-')[1] + '月';
			},
			bindPickerChange: function(e) {
				this.shopIndex = e.target.value
				this.getNewList()
			},
			getlist(){
				let that=this
				this.util.ajax('member/withdrawalRecords',{
					"curPage": this.curPage,
					"pageSize": 20,
					"selectType": this.shopIndex,
					"yearMonth": this.date,
					"userId": this.userId
				},res=>{
					if(that.curPage!=res.data.page.curPage) that.isfoot=true
					if(that.curPage==res.data.page.curPage){
						that.list=that.list.concat(res.data.list)
					}
				})
			},
			getNewList(){
				this.list=[]
				this.curPage=1
				this.getlist()
			},
			getDate(e){
				this.date = e;
				this.getNewList()
			},
		}
	}
</script>

<style lang="scss">
	.header {
		position: relative;
		z-index: 1;
		background-color: #fff;
		.city {
			line-height: 30rpx;
			font-size: 34rpx;
			padding: 20rpx;
			font-weight: bold;
			image {
				width: 30rpx;
				height: 30rpx;
				margin: 0 10rpx;
			}
		}
	
		.village {
			line-height: 30rpx;
			font-size: 30rpx;
			padding: 20rpx 30rpx;
			color: #505050;
			image {
				width: 20rpx;
				height: 30rpx;
				margin-left: 10rpx;
			}
		}
	}
	.total{
		margin: 30rpx 0;
		padding: 0 80rpx;
		.item{
			width: 280rpx;
			text-align: center;
			border-radius: 10rpx;
			padding: 40rpx 0;
			background-color: #fff;
			position: relative;
			.num{
				margin-bottom: 10rpx;
				text{
					font-size: 32rpx;
					font-weight: bold;
				}
			}
			.sub{
				color: #989898
			}
			&::before{
				content: '';
				display: block;
				box-sizing: border-box;
				width: 20rpx;
				height: 30rpx;
				border: 16rpx solid #ff881e;
				border-left: 10rpx solid transparent;
				border-right: 10rpx solid transparent;
				border-bottom: 0;
				position: absolute;
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				opacity: 0;
			}
			&.active{
				background-image: linear-gradient(to bottom,#ffc600,#ff881e);
				.num,.sub{
					color: #fff;
				}
				// &::before{
				// 	opacity: 1;
				// }
			}
		}
	}
	.timeBox{
		margin: 30rpx;
		image{
			width: 20rpx;
			margin-left: 10rpx;
		}
		.time{
			font-size: 30rpx;
			font-weight: bold;
			.uni-input{
				font-size: 30rpx;
				font-weight: bold;
			}
		}
	}
	.list{
		padding: 0 30rpx;
		background-color: #fff;
		.item{
			padding: 30rpx 0;
			border-bottom: 1rpx solid #eee;
			.left{
				width: 300rpx;
				.img{
					width: 90rpx;
					margin-right: 20rpx;
				}
				.title{
					font-size: 32rpx;
				}
			}
			.price{
				font-weight: bold;
				text{
					font-size: 32rpx;
				}
			}
		}
	}
</style>
