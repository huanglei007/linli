<template>
	<view>
		<view class="list">
			<view class='gray texcenter' v-if="!shopList.length" style="padding-top: 200rpx;">
				你还没有关注过达人
			</view>
			<view class="item flexd" v-for="(item,index) in shopList" :key="index" @click="$jump('/pages/index/darenDetail?id='+item.id)">
				<view class="image flexd">
					<image :src="Img(item.photo)" mode=""></image>
					<image class="renzhen" src="/static/image/icon_rz.png" mode="widthFix"></image>
				</view>
				<view class="message">
					<view class="title">
						{{item.talent_name}}
					</view>
					<view class="mgb flexd ">
						<view class="star flexd">
							<image v-for="n in 5" :key="n" :src="n<item.score?'/static/image/icon_xx.png':'/static/image/icon_wxzxx.png'" mode=""></image>
						</view>
						<view class="nickname">
							{{item.roleName}}
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
					<view class="flexd jubetween flex-center">
						<view class="voucher flexd">
							<view class="piece" v-for="(x,i) in item.skillNames" :key="i">
								{{x}}
							</view>
						</view>
						<view class="taketo" v-if="userId!=item.user_id" @click.stop="talkto(item.user_id)">
							<image src="/static/image/icon_lt.png" mode=""></image>
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
				shopList: [],
				curPage: 1,
				userId: '',
			}
		},
		mounted() {
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
				console.log({
					userId: this.userId,
					type: 2,
					"curPage": 1,
				})
				this.util.ajax('collection/collectList',{
					userId: this.userId,
					type: 2,
					"curPage": this.curPage,
					"pageSize": 20,
				},res=>{
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
			},
			talkto(id){
				if(this.userId==id){
					this.$alert('无法跟自己聊天')
					return
				}
				this.$jump('/pages/chat/HM-chat?idse='+id)
			},
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
