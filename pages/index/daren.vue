<template>
	<view class="content">
		<view class="banner">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color="rgba(255,255,255,.3)" indicator-active-color="rgba(255,255,255,1)">
				<swiper-item v-for="(item, i) in banner" :key='i'>
					<uni-link :href="item.url" :text="item.url">
						<image :src="Img(item.image)" mode="widthFix"></image>
					</uni-link>
				</swiper-item>
			</swiper>
		</view>
		<view class="menu flexd">
			<swiper class="swiper" :indicator-dots="true" :duration="200">
				<swiper-item v-for="i in Math.floor(menuList.length/8)+(menuList.length%8?1:0)" :key="i">
					<view class="menuBox flexd">
						<view class="item" v-for="(item,index) in menuList" v-if="index<8*i&&index>=8*(i-1)" :key="index" @click="classfyIndex=index+1;getNewList()">
							<view class="image">
								<image :src="Img(item.service_icon)" mode=""></image>
							</view>
							<view class="title">
								{{item.service_type_name}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="cenhead flexd jucenter flex-center">
			<image src="/static/image/zuo.png" mode="widthFix"></image>
			<image class="center" :src="imageurl+'/static/image/fjdr.png'" mode="widthFix"></image>
			<image src="/static/image/you.png" mode="widthFix"></image>
		</view>
		<view class="searchType flexd jubetween">
			<view class="item active">
				全部
			</view>
			<view class="item">
				<picker class="picker" @change="bindPickerChange" :value="classfyIndex" :range="classfy" range-key="service_type_name">
					<view class="uni-input">{{classfy[classfyIndex]?classfy[classfyIndex].service_type_name:'达人分类'}}</view>
				</picker>
				<image src="/static/image/icon_xw.png" mode="widthFix"></image>
			</view>
			<view class="item">
				<picker class="picker" @change="bindPickerChange2" :value="rangeIndex" :range="range" range-key="name">
					<view class="uni-input">{{range[rangeIndex].name}}</view>
				</picker>
				<image src="/static/image/icon_xw.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="list">
			<view class="item flexd" v-for="(item,index) in shopList" :key="index" @click="$jump('/pages/index/darenDetail?id='+item.id)">
				<view class="image flexd">
					<image :src="Img(item.photo)" mode=""></image>
					<image v-if="item.levelName=='金牌达人'" class="renzhen" src="/static/image/icon_rz.png" mode="widthFix"></image>
				</view>
				<view class="message">
					<view class="title">
						{{item.talent_name}}
					</view>
					<view class="mgb flexd flex-center">
						<view class="flexd gold">
							<image v-if="item.levelName=='金牌达人'" class="renzhen" src="/static/image/gold.png" mode="widthFix"></image>
							<image v-if="item.levelName!='金牌达人'" class="renzhen" src="/static/image/silver.png" mode="widthFix"></image>
						</view>
						<view class="nickname">
							{{item.levelName}}
						</view>
					</view>
					<view class="mgb flexd jubetween flex-center">
						<view class="nickname">
							服务时间：{{item.business_hours}}
						</view>
						<view class="range">
							<image src="/static/image/icon_dw.png" mode=""></image>
							{{item.distance}}
						</view>
					</view>
					<view class="flexd jubetween flex-center">
						<view class="voucher flexd">
							<view class="piece" v-for="(x,i) in item.skillNames" :key="i">
								{{x}}
							</view>
						</view>
						<view class="taketo flexd"  @click.stop="talkto(item.user_id)">
							<image src="/static/image/icon_lt.png" mode="widthFix"></image>
						</view>
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
				imageurl:'',
				htosp: 0,
				menuList: [],
				classfy: [{
					service_type_name: '达人类别',
					id: 0
				}],
				classfyIndex: 0,
				range: [{
					name: '距离',
					value: 0
				}],
				commissionSort: 0,
				rangeIndex: 0,
				shopList: [],
				isfoot: false,
				curPage:1,
				banner: [],
				userinfo: {}
			}
		},
		onLoad(){
			this.imageurl = this.globalData.imageurl
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.userinfo = uni.getStorageSync('userInfo');
			let that=this
			this.util.ajax('release/distanceConfigList',{},(res)=>{
				that.range=that.range.concat(res.data.list)
			})
			this.util.ajax('talent/getTalentServiceTypes',{},(res)=>{
				that.classfy=that.classfy.concat(res.data.list)
				that.menuList=res.data.list
				console.log(that.menuList.length)
			})
			this.util.ajax('advertising/listPage',{
				"type": 4
			},(res)=>{
				that.banner=res.data.list
			})
			this.getlist()
		},
		onReachBottom() {
			if(!this.isfoot){
				this.curPage++
				this.getlist()
			}
		},
		methods: {
			talkto(id){
				if(!id) return
				if(id==this.userId){
					this.$alert('无法和自己聊天')
					return
				}
				this.$jump('/pages/chat/HM-chat?idse='+id)
			},
			bindPickerChange: function(e) {
				this.classfyIndex = e.target.value
				this.getNewList()
			},
			bindPickerChange2(e){
				this.rangeIndex = e.target.value
				this.getNewList()
			},
			getlist(){
				let that=this
				this.util.ajax('talent/listPage',{
				  "serviceTypeId": this.classfy[this.classfyIndex].id,
				  "distanceValue": this.range[this.rangeIndex].value,
				  "curPage": this.curPage,
				  "pageSize": 20,
				  "userId": this.userId
				},(res)=>{
					if(that.curPage!==res.data.page.curPage) that.isfoot=true
					if(that.curPage==res.data.page.curPage){
						that.shopList=that.shopList.concat(res.data.list)
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
	.content{
		background-color: #f5f5f5;
		position: relative;
		.homeBg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		
			image {
				width: 100%;
			}
		}
		
		.header {
			position: relative;
			z-index: 1;
		
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
		
		}
		.banner{
			margin-bottom: 30rpx;
			.swiper{
				height: 300rpx;
				
				image{
					width: 100%;
				}
			}
		}
		.menu {
			position: relative;
			z-index: 1;
			background-color: #fff;
			padding: 20rpx 30rpx;
			flex-wrap: wrap;
			.swiper{
				height: 400rpx;
				width: 100%;
			}
			.menuBox{
				flex-wrap: wrap;
			}
			.item {
				flex: 0 0 25%;
				text-align: center;
				margin-bottom: 20rpx;
		
				image {
					width: 100rpx;
					height: 100rpx;
				}
		
				.title {
					font-size: 28rpx;
					color: #505050;
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
		
		.classify {
			margin-bottom: 30rpx;
		
			.scroll {
				padding-left: 30rpx;
			}
		
			.item {
				min-width: 100rpx;
				flex: none;
				padding: 0 20rpx;
				text-align: center;
				background-color: #fff;
				line-height: 1.8;
				font-size: 28rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
		
				&.active {
					background-color: #FF5648;
					color: #fff;
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
		
					width: 150rpx;
					overflow: hidden;
					position: relative;
					image {
						width: 150rpx;
						height: 150rpx;
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
					width: 500rpx;
					margin-left: 20rpx;
		
					.title {
						font-size: 30rpx;
						position: relative;
						width: fit-content;
						margin-bottom: 10rpx;
					}
					.gold{
						image{
							width: 30rpx;
							height: 30rpx;
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
						color: #888
					}
		
					.price {
						color: #888;
					}
		
					.range {
						color: #888;
		
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
						.piece {
							line-height: 1.5;
							padding: 0 13rpx;
							font-size: 24rpx;
							color: #FF5648;
							background-color: #FFEBEA;
							border: 2rpx solid #FF5648;
							margin-right: 10rpx;
							border-radius: 10rpx;
						}
					}
					.taketo{
						line-height: 1.5;
						font-size: 24rpx;
						padding: 10rpx 5rpx;
						margin-left: 20rpx;
						background-color: $uni-color-primary;
						border-radius: 30rpx;
						width: 90rpx;
						text-align: center;
						image{
							width: 28rpx;
							height: 28rpx;
							margin: 0 auto;
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
	}
</style>
