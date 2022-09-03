<template>
	<view>
		<view class="list">
			<view class='gray texcenter' v-if="!shopList.length" style="padding-top: 200rpx;">
				你还没有关注过商家
			</view>
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
		mounted(e) {
			this.userId=uni.getStorageSync('userId')
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
				this.util.ajax('collection/collectList',{
				  userId: this.userId,
				  type: 1,
				  "curPage": 1,
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
					border-radius: 10rpx;
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
