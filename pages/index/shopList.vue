<template>
	<view class="content">
		<view class="operation flexd jucenter flex-center">
			<view class="flexd jubetween flex-center">
				<view class="searchBox flexd jucenter flex-center">
					<image src="/static/image/icon_ss.png" mode=""></image>
					<input class="input" type="text" v-model="searchParam" placeholder="请输入商家名称" placeholder-style="font-size:24rpx;color:#888"/>
				</view>
				<view class="btn" @click="getNewList()">
					搜索
				</view>
			</view>
		</view>
		<view class="searchType flexd jubetween">
			<view class="item active">
				全部
			</view>
			<view class="item"
			@click="commissionSort=commissionSort^1;getNewList()"
			:class="{'back': commissionSort}">
				评分
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
			<view class="item flexd" v-for="(item,index) in shopList" :key="index" @click="$jump('/pages/index/shopDetail?id='+item.id)">
				<view class="image flexd">
					<image :src="Img(item.shop_logo)" mode=""></image>
				</view>
				<view class="message">
					<view class="title">
						{{item.shop_name}}
						<view class="tage">
							{{item.shop_type_name}}
						</view>
					</view>
					<view class="mgb flexd ">
						<view class="star flexd">
							<image v-for="n in 5" :key="n" :src="n<item.score?'/static/image/icon_xx.png':'/static/image/icon_wxzxx.png'" mode=""></image>
						</view>
					</view>
					<view class="mgb flexd jubetween flex-center">
						<view class="nickname">
							{{item.address}}
						</view>
						<view class="range">
							<image src="/static/image/icon_dw.png" mode=""></image>
							{{item.distance}}
						</view>
					</view>
					<view class="voucher flexd">
						<view class="piece">
							{{item.voucher_msg}}
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
				classfy: ['需求分类', '需求分类1', '需求分类2'],
				classfyIndex: 0,
				range: [{
					name: '距离',
					value: 0
				}],
				rangeIndex: 0,
				shopList: [],
				curPage: 1,
				commissionSort: 0,
				isfoot: false,
				classfyId: 0,
				classTitle: '',
				searchParam:''
			}
		},
		onLoad(e) {
			this.classTitle=e.title
			this.classfyId=e.id
			let that=this
			uni.setNavigationBarTitle({
				title: that.classTitle
			})
			this.util.ajax('release/distanceConfigList',{},(res)=>{
				that.range=that.range.concat(res.data.list)
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
			bindPickerChange2: function(e) {
				this.rangeIndex = e.target.value
				this.getNewList()
			},
			getlist(){
				let that=this
				this.util.ajax('shop/shopList',{
				  "shopTypeId": this.classfyId,
				  "scoreSort": this.commissionSort+1,
				  "curPage": this.curPage,
				  "pageSize": 20,
				  "searchParam": this.searchParam,
				  "distanceValue": this.range[this.rangeIndex].value,
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
	page{
		background-color: #f5f5f5;
	}
	.operation{
		padding: 20rpx 30rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		.backs{
			width: 35rpx;
			image{
				width: 100%;
			}
		}
		.searchBox{
			background-color: #F5F5F5;
			border-radius: 30rpx;
			line-height: 2;
			padding: 10rpx 20rpx;
			width: 480rpx;
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 0 20rpx;
			}
			input{
				width: 400rpx;
			}
			
		}
		.btn{
			width: 130rpx;
			text-align: center;
			background-color: #FF5648;
			color: #fff;
			border-radius: 30rpx;
			font-size: 30rpx;
			line-height: 2;
			margin-left: 20rpx;
		}
		.add-btn{
			width: 50rpx;
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.searchType {
		padding: 0 30rpx;
	
		.item {
			display: flex;
			align-items: center;
			color: #888;
			&.back{
				image{
					transform: rotate(180deg);
				}
			}
			image {
				width: 10rpx;
				margin-left: 10rpx;
			}
	
			.uni-input {
				color: #888;
			}
	
			&.active {
				color: $uni-color-primary;
	
				.uni-input {
					color: $uni-color-primary;
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
					font-size: 32rpx;
					position: relative;
					width: fit-content;
					margin-bottom: 10rpx;
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
</style>
