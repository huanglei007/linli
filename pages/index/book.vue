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
		<view class="searchType flexd jubetween">
			<view class="item active">
				全部
			</view>
			<view class="item"
			@click="commissionSort++;commissionSort>2?commissionSort=0:'';getNewList()"
			:class="{'back': commissionSort==2}">
				<view class="text">价格</view>
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
			<list :list="shopList"></list>
		</view>
		<view class="foot" @click="$jump('/pages/from/book')">
			发布旧书出售信息
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
				menuList: [{
					img: '/static/image/icon_cs.png',
					title: '美食餐饮',
					path: ''
				}, {
					img: '/static/image/icon_ysbj.png',
					title: '养生保健',
					path: ''
				}, {
					img: '/static/image/icon_pxjg.png',
					title: '机构培训',
					path: ''
				}, {
					img: '/static/image/icon_cwyy.png',
					title: '宠物医院',
					path: ''
				}, {
					img: '/static/image/icon_cs.png',
					title: '便利店',
					path: ''
				}, {
					img: '/static/image/icon_gxd.png',
					title: '干洗店 ',
					path: ''
				}, {
					img: '/static/image/icon_sgd.png',
					title: '水果店',
					path: ''
				}, {
					img: '/static/image/icon_dyf.png',
					title: '大药房',
					path: ''
				},],
				classfy: ['需求分类', '需求分类1', '需求分类2'],
				classfyIndex: 0,
				rangeIndex: 0,
				range: [{
					name: '距离',
					value: 0
				}],
				shopList: [],
				curPage: 1,
				commissionSort: 0,
				isfoot: false,
				banner:[],
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync('userId');
			this.htosp = uni.getStorageSync('htop');
			let that=this
			this.util.ajax('release/distanceConfigList',{},(res)=>{
				that.range=that.range.concat(res.data.list)
			})
			this.util.ajax('advertising/listPage',{
				"type": 1
			},(res)=>{
				that.banner=res.data.list
			})
			
		},
		onShow() {
			this.getNewList()
		},
		methods: {
			bindPickerChange2: function(e) {
				this.rangeIndex = e.target.value
				this.getNewList()
			},
			getlist(){
				let that=this
				this.util.ajax('oldBookTrading/listPage',{
				  "curPage": this.curPage,
				  "priceSort": this.commissionSort,
				  "distanceValue": this.range[this.rangeIndex].value,
				  "pageSize": 20,
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
	.banner{
		margin-bottom: 30rpx;
		.swiper{
			height: 300rpx;
			
			image{
				width: 100%;
			}
		}
	}
	.searchType {
		padding: 0 30rpx;
	
		.item {
			display: flex;
			align-items: center;
			.text{
				color: #888;
			}
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
