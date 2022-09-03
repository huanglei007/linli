<template>
	<view class="content">
		<view class="head">
			<view class="operation flexd jubetween flex-center" :style="{paddingTop: htosp+'px'}">
				<view class="backs" @click="$jumpback()">
					<image src="/static/image/icon_gb.png" mode="widthFix"></image>
				</view>
				<view class="searchBox flexd jubetween flex-center">
					<image src="/static/image/icon_ss.png" mode=""></image>
					<input class="input" @confirm="getNewList()" confirm-type="search" @focus="gethistory();isWhite=true" type="text" v-model="searchParam" placeholder="请输入达人/商家名称" placeholder-style="font-size:28rpx;color:#888"/>
					<view class="btn" @click="getNewList()">
						搜索
					</view>
				</view>
			</view>
		</view>
		<view class="list" v-if="!isWhite">
			<list :list="shopList"></list>
		</view>
		<view class="searchTip" v-if="isWhite">
			<view class="title">
				搜索历史
			</view>
			<view class="itemBox flexd">
				<view class="item" v-for="(item,i) in historyList" :key="i" @click="search(item.search_content)">
					{{item.search_content}}
				</view>
			</view>
		</view>
		<view class="searchTip" v-if="isWhite">
			<view class="title">
				推荐搜索
			</view>
			<view class="itemBox flexd">
				<view class="item" v-for="(item,i) in hotList" :key="i" @click="search(item.search_content)">
					{{item.search_content}}
				</view>
			</view>
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
				categoryId: 0
			}
		},
		onLoad(e) {
			if(e.id){
				this.categoryId=e.id
			}
			this.htosp=uni.getStorageSync('htop')
			this.userId=uni.getStorageSync('userId')
			this.gethistory()
		},
		onReachBottom() {
			if(!this.isfoot){
				this.curPage++
				this.getlist()
			}
		},
		methods: {
			gethistory(){
				//获取搜索历史记录
				let that=this
				this.util.ajax('search/searchList',{
					userId: that.userId
				},res=>{
					that.hotList=res.data.hotList
					that.historyList=res.data.historyList
				})
			},
			search(e){
				this.searchParam=e
				this.getNewList()
			},
			getlist(){
				//更新列表
				let that=this
				this.util.ajax('release/releaseList',{
				  "categoryId": that.categoryId,
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
								"category_name": e.category_name,
								"commission": e.commission,
								"createtime": that.$shijian(e.createtime),
								"distance": e.distance,
								"id": e.id,
								"image": e.image,
								"publisher_name": e.publisher_name,
								"requirement_introduction": "备注："+e.requirement_introduction,
								"user_id": e.user_id,
								"user_name": e.publisher_name,
								
							}
						}))
					}
				})
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
	.head{
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
