<template>
	<view class="content">
		<view class="head ">
			<view class="operation flexd jucenter flex-center">
				<view class="searchBox flexd jucenter flex-center" @click="$jump('/pages/index/search')">
					<view class="btn flexd flex-center">
						<image src="/static/image/icon_ss.png" mode=""></image>
						请输入
					</view>
				</view>
			</view>
		</view>
		<view class="banner">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color="rgba(255,255,255,.3)" indicator-active-color="rgba(255,255,255,1)">
				<swiper-item v-for="(item, i) in banner" :key='i'>
					<image :src="Img(item.image)" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="searchType flexd jubetween">
			<view class="item active">
				全部
			</view>
			<view class="item">
				<picker class="picker" @change="bindPickerChange" :value="classfyIndex" :range="classfy" range-key="name">
					<view class="uni-input">{{classfy[classfyIndex]?classfy[classfyIndex].name:'需求'}}</view>
				</picker>
				<image src="/static/image/icon_xw.png" mode="widthFix"></image>
			</view>
			<view class="item"
			@click="commissionSort=commissionSort^1;getNewList()"
			:class="{'back': commissionSort}">
				价格
				<image src="/static/image/icon_xw.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="list">
			<list :list="shopList"></list>
		</view>
		<view class="foot" @click="$jump('/pages/from/xianzhi')">
			发布闲置出售信息
		</view>
	</view>
</template>

<script>
	import list from '@/components/menuList.vue'
	export default {
		components:{list},
		data() {
			return {
				userId: '',
				htosp: 0,
				classfy: [{
					name: '需求分类',
					id: 0
				}],
				classfyIndex: 0,
				shopList: [],
				commissionSort: 0,
				curPage: 1,
				banner: [],
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync('userId');
			this.htosp = uni.getStorageSync('htop');
			let that=this
			this.util.ajax('release/idleTradingCategoryList',{},(res)=>{
				that.classfy=that.classfy.concat(res.data.list)
			})
			this.util.ajax('advertising/listPage',{
				"type": 3
			},(res)=>{
				that.banner=res.data.list
			})
			this.getlist()
		},
		methods: {
			bindPickerChange: function(e) {
				this.classfyIndex = e.target.value
				this.getNewList()
			},
			getlist(){
				let that=this
				this.util.ajax('idleTrading/listPage',{
				  "goodsCategoryId": this.classfy[this.classfyIndex].id,
				  "curPage": this.curPage,
				  "pageSize": 20,
				  "userId": this.userId,
				  "priceSort": this.commissionSort+1,
				},(res)=>{
					if(that.curPage!==res.data.page.curPage) that.isfoot=true
					if(that.curPage==res.data.page.curPage){
						that.shopList=that.shopList.concat(res.data.list.map((e)=>{
							return {
								"category_name": e.goods_name,
								"commission": e.selling_price,
								"createtime": '',
								"distance": e.residential_quarter_name,
								"id": e.id,
								"image": e.image,
								"publisher_name": e.publisher_name,
								"requirement_introduction": "交易方式："+(e.transaction_mode_name||'无数据'),
								"hideBtn": 1
							}
						}))
					}
					
				})
			},
			getNewList(){
				this.shopList=[]
				this.curPage=1
				this.getlist()
			}
		}
	}
</script>

<style lang="scss">
	.head{
		
		background-color: #fff;
		.left{
			font-size: 32rpx;
			font-weight:  bold;
			image{
				margin-right: 10rpx;
			}
		}
	}
	.operation {
		padding: 30rpx;
			
		.searchBox {
			background-color: #F5F5F5;
			border-radius: 40rpx;
			width: 96%;
			text-align: center;
			padding: 16rpx 0;
			
			image {
				width: 25rpx;
				height: 25rpx;
				margin: 0 10rpx;
			}
			
			input {
				width: 350rpx;
			}
			
			.btn {
				text-align: center;
				color: #888;
				border-radius: 30rpx;
				font-size: 24rpx;
			}
		}
			
		.add-btn {
			width: 50rpx;
			
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.banner{
		padding: 0 30rpx;
		margin: 30rpx 0;
		.swiper{
			height: 280rpx;
			
			image{
				width: 100%;
				border-radius: 10rpx;
			}
		}
	}
	.searchType {
		padding: 0 30rpx;
	
		.item {
			display: flex;
			align-items: center;
			color: #888;
			font-size: 28rpx;
			image {
				width: 10rpx;
				margin-left: 10rpx;
			}
			
			.uni-input {
				color: #888;
				font-size: 28rpx;
			}
		
			&.active {
				color: #202020;
				border-bottom: 3rpx solid $uni-color-primary;
				font-weight: bold;
				.uni-input {
					color: #202020;
					font-weight: bold;
				}
			}
		}
	}
	.list {
		margin-top: 30rpx;
	
		.item {
			margin-bottom: 10rpx;
			background-color: #fff;
			padding: 30rpx;
	
			.image {
	
				width: 90rpx;
				overflow: hidden;
				position: relative;
				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}
	
				.renzhen {
					width: 60rpx;
					height: 30rpx;
					position: absolute;
					right: 0;
					top: 0;
				}
			}
	
			.message {
				width: 540rpx;
				margin-left: 20rpx;
	
				.title {
					font-size: 32rpx;
					position: relative;
					width: fit-content;
					margin-bottom: 20rpx;
					font-weight: bold;
					.tage{
						position: absolute;
						left: 110%;
						bottom: 0;
						line-height: 1.3;
						color: #FF7827;
						border: 1rpx solid #FF7827;
						border-radius: 10rpx;
						background-color: rgba($color: #FF7827, $alpha: .08);
						width: fit-content;
						padding: 0 14rpx;
					}
				}
				
				.star{
					image{
						width:28rpx;
						height: 28rpx;
						margin-right: 6rpx;
					}
				}
				.nickname {
					font-size: 28rpx;
				}
	
				.price {
					color: #FF3336;
					text{
						font-size: 32rpx;
						font-weight: bold;
					}
				}
				.talk{
					width: 40rpx;
					margin-top: 20rpx;
				}
	
				.range {
					color: #505050;
					
					image {
						width: 20rpx;
						height: 20rpx;
						margin-right: 6rpx;
					}
				}
	
				.mgb {
					margin-bottom: 10rpx;
				}
	
				.text {
					color: #888;
					max-width: 400rpx;
				}
	
				.voucher {
					flex-wrap: wrap;
					.piece {
						line-height: 2.2;
						padding: 0 40rpx;
						background-image: url('/static/image/djq.png');
						margin-right: 10rpx;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						width: fit-content;
						margin-bottom: 10rpx;
						color: #FF7827;
					}
				}
				.taketo{
					image{
						width: 32rpx;
						height: 32rpx;
					}
				}
	
				.jineng {
					.piece {
						padding: 0 10rpx;
						color: #FF5648;
						border: 2rpx solid #FF5648;
						background-color: rgba($color: #FF5648, $alpha: .08);
						margin-right: 20rpx;
						width: fit-content;
						flex-wrap: wrap;
						line-height: 1.5;
					}
				}
	
				.btn {
					line-height: 2;
					font-size: 28rpx;
					padding: 0 40rpx;
					margin-left: 20rpx;
					border: 2rpx solid #aaa;
					border-radius: 30rpx;
				}
			}
		}
	}
	.cenhead {
		padding: 30rpx;
	
		image {
			width: 50rpx;
		}
	
		image.center {
			width: 180rpx;
			margin: 0 20rpx;
		}
	
		.more {
			color: #888;
	
			image {
				width: 20rpx;
				height: 15rpx;
			}
		}
	}
	.foot{
		background-image: $uni-bg-color;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		line-height: 3;
	}
</style>
