<template>
	<view class="content">
		<view class="toptype flexd jubetween " :style="{paddingTop:htosp +'px'}">
			<image class="backs" src="/static/image/icon_gb.png" mode="" @click="$jumpback()"></image>
			<view class="typeBox flexd jucenter">
				<view class="item" v-for="(item,i) in typeList" :key="i"
				:class="typeIndex==i?'active':''"
				@click="typeIndex=i;getNewList()">
					{{item}}
				</view>
			</view>
			<view></view>
		</view>
		<view class="statusBox flexd flex-center" :style="{paddingTop:htosp +50+'px'}">
			<view class="item" v-for="(item,i) in statusList" :key="i"
			:class="statusIndex==i?'active':''"
			@click="statusIndex=i;getNewList()">
				<text>{{item}}</text>
				<image class="icon" src="/static/img/icon_xuanzhong.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="list">
			<view class="item" 
			:class="{lived: statusIndex==1,out: statusIndex==2}"
			v-for="(item,i) in list" :key="i"
			>
				<view class="flexd jubetween flex-center" @click="jumpto(item.type,item.infoid)">
					<view class="name">{{item.shop}}</view>
					<image class="more" src="/static/image/icon_gd.png" mode="widthFix"></image>
				</view>
				<view class="ticket flexd flex-center jubetween">
					<view class="left">
						￥<text>{{item.amount}}</text>
					</view>
					<view class="center">
						<view class="title">
							{{item.rule}}
						</view>
						<view class="time">{{item.time}}</view>
					</view>
					<view class="right">
						<view class="btn" @click="toDetail(item.type,item.infoid,item.id)">
							去使用
						</view>
						<image class="used" src="/static/image/icon_ysy.png" mode="widthFix"></image>
						<image class="timeout" src="/static/image/icon_ygq.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				htosp: 0,
				typeList: ['代金券','优惠券'],
				typeIndex: 0,
				statusList: ['待使用','已使用','已过期'],
				statusIndex: 0,
				list: [],
			}
		},
		onLoad() {
			this.htosp=uni.getStorageSync('htop')
			this.userId=uni.getStorageSync('userId')
			this.getNewList()
		},
		onReachBottom() {
			if(!this.isfoot){
				this.curPage++
				this.getlist()
			}
		},
		methods: {
			getlist(){
				let that=this
				if(this.typeIndex){
					this.util.ajax('userWelfare/couponList',{
						userId: this.userId,
						"pageSize": 20,
						"status": this.statusIndex,
						"curPage": 1,
					},res=>{
						if(that.curPage!==res.data.page.curPage) that.isfoot=true
						if(that.curPage==res.data.page.curPage){
							that.list=that.list.concat(res.data.list.map(e=>{
								return {
									amount: e.amount,
									time: that.$shijiandate(e.begin_time)+' - '+that.$shijiandate(e.expiration_time),
									rule: e.coupon_name,
									shop: e.shop_name,
									infoid: e.info_id,
									type: e.type,
									id: e.id,
								}
							}))
						}
					})
				}else{
					this.util.ajax('userWelfare/voucherList',{
						userId: this.userId,
						"pageSize": 20,
						"status": this.statusIndex,
						"curPage": 1,
					},res=>{
						if(that.curPage!==res.data.page.curPage) that.isfoot=true
						if(that.curPage==res.data.page.curPage){
							that.list=that.list.concat(res.data.list.map(e=>{
								return {
									amount: e.original_price,
									time: that.$shijiandate(e.begin_time)+' - '+that.$shijiandate(e.expiration_time),
									rule: e.voucher_name+' 实付'+e.real_pay_amount+'元',
									shop: e.shop_name,
									infoid: e.info_id,
									type: e.type,
									id: e.id,
								}
							}))
						}
					})
				}
			},
			getNewList(){
				this.list=[]
				this.curPage=1
				this.isfoot=false
				this.getlist()
			},
			jumpto(type,id){
				if(type==1){
					this.$jump('/pages/index/shopDetail?id='+id)
				}else{
					this.$jump('/pages/index/darenDetail?id='+id)
				}
			},
			toDetail(type,info,id){
				if(this.typeIndex==0&&this.statusIndex==0){
					this.$jump('/pages/user/tickitDetail?id='+id)
				}else{
					this.jumpto(type,info)
				}
			}
		}
	}
</script>

<style lang="scss">
	.toptype{
		border-bottom: 1rpx solid #ececec;
	}
	.typeBox{
		.item{
			color: #989898;
			border: 1rpx solid #e5e5e5;
			font-size: 30rpx;
			text-align: center;
			width: 150rpx;
			line-height: 2;
			&.active{
				color: #212121;
				background-color: $uni-color-primary;
				border-color: $uni-color-primary;
			}
		}
	}
	.statusBox{
		padding-top: 1rpx solid #F5F5F5;
		background-color: #fff;
		padding: 10rpx 0;
		.item{
			line-height: 100rpx;
			position: relative;
			font-size: 28rpx;
			color: #989898;
			text-align: center;
			width: 33.3%;
			.icon{
				position: absolute;
				bottom: 10rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 30rpx;
				opacity: 0;
			}
			&.active{
				font-size: 32rpx;
				color: #212121;
				font-weight: bold;
				.icon{
					opacity: 1;
				}
			}
		}
	}
	.list{
		margin: 20rpx;
		.item{
			background-color: #fff;
			padding: 10rpx 20rpx;
			border-radius: 10rpx;
			margin-bottom: 10rpx;
			.name{
				margin-bottom: 10rpx;
			}
			.more{
				width: 30rpx;
				margin-bottom: 10rpx;
			}
			.ticket{
				min-height: 172rpx;
				background-color: rgba($color: #FF581E, $alpha: .1);
				padding: 0 10rpx;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
				.left{
					width: 130rpx;
					color: #FF581E;
					text{
						font-size: 46rpx;
						font-weight: bold;
					}
				}
				.center{
					flex: 1;
					padding:0 30rpx;
					.title{
						color: #FF581E;
						font-size: 30rpx;
					}
					.time{
						color: #FF581E;
					}
				}
				.right{
					text-align: center;
					.btn{
						width: 160rpx;
						background-color: #FF581E;
						color: #fff;
						line-height: 2;
						border-radius: 30rpx;
						margin-bottom: 10rpx;
						
					}
					.sub{
						color: #FF581E;
					}
					image{
						width: 90rpx;
						display: none;
					}
				}
			}
			&.lived,&.out{
				.ticket{
					background-color: #EBEBEB;
				}
				.left{
					color: #aaa;
				}
				.center{
					border-right: 1rpx solid #aaa;
					.title{
						color: #aaa;
					}
					.time{
						color: #aaa;
					}
				}
				.right{
					.btn{
						display: none;
					}
					
				}
			}
			&.lived{
				.right{
					.used{
						display: block;
					}
				}
			}
			&.out{
				.right{
					.timeout{
						display: block;
					}
				}
			}
		}
	}
</style>
