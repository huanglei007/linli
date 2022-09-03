<template>
	<view class="content">
		<view class="head">
			<view class="operation flexd jubetween flex-center" :style="{paddingTop: htosp+'px'}">
				<view class="backs" @click="$jumpback()">
					<image src="/static/image/icon_gb.png" mode="widthFix"></image>
				</view>
				<view class="searchBox flexd jubetween flex-center">
					<image src="/static/image/icon_ss.png" mode=""></image>
					<input class="input" @confirm="getNewList()" confirm-type="search" type="text" v-model="searchParam" placeholder="请输入关键词" placeholder-style="font-size:28rpx;color:#888"/>
					<view class="btn" @click="getNewList()">
						搜索
					</view>
				</view>
			</view>
		</view>
		<view class="list" v-if="!isWhite">
			<list :list="shopList"></list>
		</view>
	</view>
</template>

<script>
	import list from '@/components/menuList.vue'
	export default {
		components: {
			list
		},
		data() {
			return {
				htosp:0,
				userId: '',
				shopList: [],
				isfoot: true,
				curPage: 1,
				isWhite: true,
				historyList: [],
				hotList: [],
				searchParam: '',
				type: 0
			}
		},
		onLoad(e) {
			if(e.type){
				this.type=parseInt(e.type)
			}
			this.htosp=uni.getStorageSync('htop')
			this.userId=uni.getStorageSync('userId')
		},
		onReachBottom() {
			if(!this.isfoot){
				this.curPage++
				this.getlist()
			}
		},
		methods: {
			search(e){
				this.searchParam=e
				this.getNewList()
			},
			getlist(){
				//更新列表
				let that=this
				if(this.type==0){
					this.util.ajax('oldBookTrading/listPage',{
					  "commissionSort": 0,
					  "curPage": this.curPage,
					  "distanceValue": 0,
					  "pageSize": 20,
					  "searchParam": this.searchParam,
					  "userId": this.userId
					},(res)=>{
						if(that.curPage!==res.data.page.curPage) that.isfoot=true
						if(that.curPage==res.data.page.curPage){
							that.shopList=that.shopList.concat(res.data.list.map((e)=>{
								return {
									"category_name": e.book_name,
									"commission": e.selling_price,
									"createtime": that.$shijian(e.createtime),
									"distance": e.distance,
									"id": e.id,
									"user_id": e.user_id,
									"image": e.head_img,
									"publisher_name": e.publisher_name,
									"requirement_introduction": e.transaction_mode_name,
									"hideBtn": 1
								}
							}))
						}
					})
				}else{
					this.util.ajax('release/petTradingList',{
					  "searchParam": this.searchParam,
					  "curPage": this.curPage,
					  "pageSize": 20,
					  "vaccinated": this.vaccin,
					  "userId": this.userId
					},(res)=>{
						if(that.curPage!==res.data.page.curPage) that.isfoot=true
						if(that.curPage==res.data.page.curPage){
							that.shopList=that.shopList.concat(res.data.list.map((e)=>{
								return {
									"category_name": e.pet_kind,
									"commission": e.selling_price,
									"createtime": that.$shijian(e.createtime),
									"distance": e.distance||'无数据',
									"id": e.id,
									"image": e.head_img,
									"publisher_name": e.publisher_name,
									"requirement_introduction": e.transaction_mode_name,
									"hideBtn": 1
								}
							}))
						}
					})
				}
				
			},
			getNewList(){
				//获取新列表
				this.shopList=[]
				this.curPage=1
				this.isfoot=false
				this.isWhite=false
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
		padding: 30rpx;
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
			width: 600rpx;
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 0 20rpx;
			}
			input{
				width: 350rpx;
			}
			.btn{
				width: 130rpx;
				text-align: center;
				background-color: #FF5648;
				color: #fff;
				border-radius: 30rpx;
				font-size: 30rpx;
			}
		}
		.add-btn{
			width: 50rpx;
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.searchTip{
		padding: 0 30rpx;
		margin-bottom: 30rpx;
		.title{
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
		.itemBox{
			flex-wrap: wrap;
			.item{
				line-height: 2;
				font-size: 28rpx;
				background-color: #ECECEE;
				margin-right: 15rpx;
				padding: 0 30rpx;
				border-radius: 30rpx;
				margin-bottom: 15rpx;
			}
		}
	}
</style>
