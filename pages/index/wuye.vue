<template>
	<view class="content">
		<view class="cost">
			<view class="title">
				生活缴费
			</view>
			<view class="list flexd jubetween flex-center">
				<view class="item" v-for="(item,index) in costList" :key="index" @click="$alert('功能正在开发中')">
					<image :src="item.icon" mode="widthFix"></image>
					<view class="sub">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
		<view class="cost">
			<view class="title">
				社区人员
			</view>
			<view class="list flexd jubetween flex-center">
				<view class="item" v-for="(item,index) in people" :key="index" @click="$alert('功能正在开发中')">
					<image :src="item.icon" mode="widthFix"></image>
					<view class="sub">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
		<view class="news">
			<view class="item flexd jubetween">
				<view class="message">
					<view class="title">
						客户关系营销随着竞争的日
						益激烈
					</view>
					<view class="text">
						以产品为中心的竞争优势正在逐步失
						去,此时,以客户为中心
					</view>
					<view class="viewer flexd flex-center">
						<image src="/static/image/icon_ck.png" mode="widthFix"></image>
						1320
					</view>
				</view>
				<view class="image">
					<image :src="imageurl+'static/image/rm3.png'" mode="widthFix"></image>
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
				costList: [{
					title: '话费',
					icon: '/static/image/icon_chf.png'
				},{
					title: '水电费',
					icon: '/static/image/icon_sdf.png'
				},{
					title: '燃气费',
					icon: '/static/image/icon_rqf.png'
				},{
					title: '物业费',
					icon: '/static/image/icon_wyf.png'
				},{
					title: '车位费',
					icon: '/static/image/icon_cwf.png'
				}],
				people:[{
					title: '我的管家',
					icon: '/static/image/icon_wdgj.png'
				},{
					title: '阾里客服',
					icon: '/static/image/icon_kf.png'
				},{
					title: '街道办',
					icon: '/static/image/icon_jdb.png'
				},{
					title: '警务员',
					icon: '/static/image/icon_jwy.png'
				}]
			}
		},
		onLoad() {
			this.imageurl = this.globalData.imageurl
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5
	}
	.cost{
		margin: 20rpx 0;
		background-color: #fff;
		padding: 20rpx;
		.title{
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.list{
			
			.item{
				width: 18%;
				text-align: center;
				image{
					width: 60%;
				}
			}
		}
	}
	.news{
		.item{
			background-color: #fff;
			border-bottom: 1rpx solid #ddd;
			padding: 30rpx;
			&:last-child{
				border-bottom: 0;
			}
			.message{
				width: 400rpx;
				.title{
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}
				.text{
					color: #989898;
					margin-bottom: 10rpx;
				}
				.viewer{
					color: #D1D1D1;
					image{
						width: 20rpx;
						margin-right: 10rpx;
					}
				}
			}
			.image{
				width: 260rpx;
				image{
					width: 100%;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>
