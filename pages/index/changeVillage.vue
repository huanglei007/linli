<template>
	<view class="content">
		<view class="head flexd jubetween flex-center" :style="{paddingTop: htosp+'px'}">
			<view class="left flexd flex-center">
				<image @click="$jumpback()" class="backs" src="/static/image/icon_gb.png" mode=""></image>
				选择小区
			</view>
			<view class="city" @click="$jump('/pages/index/changeCity')">
				切换城市
			</view>
		</view>
		<view class="search flexd jubetween flex-center">
			<view class="city">
				{{city}}
			</view>
			<view class="searchBox flexd jubetween flex-center">
				<image src="/static/image/icon_ss.png" mode=""></image>
				<input class="input" v-model="residential_quarter_name" type="text" value="" placeholder="请输入达人/商家名称" placeholder-style="font-size:28rpx;color:#888"/>
				<view class="btn" @click="getNewList()">
					搜索
				</view>
			</view>
		</view>
		<view class="mine" v-if="myList.residential_quarter_name!==''&&myList.residential_quarter_name">
			<view class="title">
				我的小区
			</view>
			<view class="list">
				<view class="item flexd jubetween flex-center">
					<view>
						<view class="village">
							{{myList.residential_quarter_name}}
						</view>
						<view class="address">
							{{myList.address}} 
						</view>
					</view>
					<view>
						<view class="btn" @click="jiebang()">
							解绑
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="villageBox">
			<view class="title">
				附近小区
			</view>
			<view class="list">
				<view class="item flexd jubetween flex-center"
				v-for="(item,i) in list" :key="i">
					<view>
						<view class="village">
							{{item.residential_quarter_name}}
						</view>
						<view class="address">
							{{item.address}}
						</view>
					</view>
					<view>
						<view class="btn" @click="change(item.id)">
							绑定
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
				userId: '',
				htosp: 0,
				curPage: 1,
				residential_quarter_name: '',
				myList: {},
				list: [],
				latitude: '',
				longitude: '',
				city: '中国',
				isfoot: false,
				cityId: 0,
			}
		},
		onReachBottom() {
			if(!this.isfoot){
				this.curPage++
				this.getList()
			}
		},
		onShow() {
			let that=this
			uni.$on('city',res=>{
				that.cityId=res.id
				that.city=res.text
				that.getNewList()
			})
		},
		onLoad(){
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			let that=this
			uni.getLocation({
				type: 'gcj02',
				geocode: true,
				success(e) {
					that.longitude=e.longitude
					that.latitude=e.latitude
					if(e.address){
						that.city=e.address.city.substring(0,e.address.city.lastIndexOf('市'))
					}
					that.getList()
					console.info(e)
				},
				fail(e) {
					console.info(e)
					that.getList()
				}
			})
		},
		methods: {
			jiebang(){
				this.myList.residential_quarter_name=''
			},
			getList(){
				let that=this
				this.util.ajax('residentialQuarter/listPage',{
					"cityId": this.cityId,
					"curPage": this.latitude,
					"latitude": this.latitude,
					"longitude": this.longitude,
					"pageSize": 20,
					"residential_quarter_name": this.residential_quarter_name,
					"userId": this.userId
				},res=>{
					if(that.curPage!==res.data.page.curPage) that.isfoot=true
					that.myList=res.data.myXQ
					that.list=this.list.concat(res.data.list)
				})
			},
			getNewList(){
				this.list=[]
				this.curPage=1
				this.getList()
			},
			change(id){
				let that=this
				this.util.ajax('residentialQuarter/binding',{
					"residential_quarter_id": id,
					"userId": this.userId
				},res=>{
					that.$alert('绑定成功')
					setTimeout(e=>{
						that.$jumpback()
					},1000)
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f3f3f3;
	}
	.head{
		padding: 20rpx 30rpx 20rpx 0;
		background-color: #fff;
		.left{
			font-size: 32rpx;
			font-weight:  bold;
			image{
				margin-right: 10rpx;
			}
		}
	}
	.search{
		padding: 30rpx;
		.city{
			font-weight: bold;
			font-size: 30rpx;
		}
		.searchBox{
			background-color: #fff;
			border-radius: 30rpx;
			line-height: 2;
			width: 570rpx;
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
				background-color: $uni-color-primary;
				border-radius: 30rpx;
				font-size: 30rpx;
			}
		}
	}
	.mine{
		margin: 0 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx;
		.title{
			font-size: 30rpx;
			margin-bottom: 20rpx;
		}
		.list{
			.item{
				margin-bottom: 10rpx;
				//background-color: #F3F3F8;
				padding: 30rpx 0;
				border-radius: 10rpx;
				.village{
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}
				.address{
					color: #989898;
					max-width: 460rpx;
				}
				.btn{
					line-height: 2.3;
					background-color: #03CA7D;
					color: #fff;
					padding: 0 30rpx;
					border-radius: 40rpx;
				}
			}
		}
	}
	.villageBox{
		margin: 30rpx;
		.title{
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.list{
			.item{
				margin-bottom: 10rpx;
				background-color: #fff;
				padding: 30rpx 20rpx;
				border-radius: 10rpx;
				.village{
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}
				.address{
					color: #989898;
					max-width: 460rpx;
				}
				.btn{
					line-height: 2.3;
					background-color: $uni-color-primary;
					padding: 0 30rpx;
					border-radius: 40rpx;
				}
			}
		}
	}
</style>
