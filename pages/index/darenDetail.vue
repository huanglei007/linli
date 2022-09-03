<template>
	<view class="content">
		<view class="homeBg">
			<image :src="imageurl+'/static/image/img_bj.png'" mode="widthFix"></image>
		</view>
		<view class="head " :style="{paddingTop: htosp+'px'}">
			<view class="flexd jubetween flex-center">
				<view class="left flexd flex-center">
					<image @click="$jumpback()" class="backs" src="/static/image/icon_fh.png" mode=""></image>
				</view>
				<view class="flexd jubetween shareBox">
					<image @click="collect" v-if="info.collected" src="/static/image/icon_sc.png" mode="widthFix"></image>
					<image @click="collect" v-if="!info.collected" src="/static/image/icon_wsc.png" mode="widthFix"></image>
					<image @click="onShare()" src="/static/image/icon_fx.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="shopMessage">
			<view class="flexd flex-center">
				<view class="image">
					<image :src="Img(info.photo)" mode=""></image>
				</view>
				<view class="message">
					<view class="flexd jubetween">
						<view class="title">{{info.talent_name}}</view>
						<image @click="phone(info.talent_phone)" class="call" src="/static/image/icon_dh.png" mode="widthFix"></image>
					</view>
					<view class="gray">
						达人等级：{{info.levelName}}
					</view>
					<view class="gray">
						服务时间：{{info.business_hours}}
					</view>
					<view class="gray">
						服务距离：{{info.service_distance}} 公里
					</view>
				</view>
			</view>
		</view>
		<view class="typeBox flexd">
			<view class="item" 
			:class="typeIndex==i?'active':''"
			v-for="(item,i) in typeList" :key="i"
			@click="test(i)">
				{{item}}
			</view>
		</view>
		<swiper class="swiper" :current="typeIndex" :indicator-dots="false" :autoplay="false"
		@change="changeType">
			<swiper-item>
				<view class="swiper-item list flexd">
					<scroll-view class="left" scroll-y="true" >
						<view class="item"
						:class="ListIndex==i?'active':''"
						v-for="(item,i) in categoryVos" :key="i"
						@click="changeList(i)">
							{{item.category_name}}
						</view>
					</scroll-view>
					<scroll-view scroll-y="true" class="right">
						<view class="item flexd jubetween"
						v-for="(item,i) in List" :key="i">
							<view class="image">
								<image :src="Img(item.images)" mode=""></image>
							</view>
							<view class="message">
								<view class="title">{{item.name}}</view>
								<!-- <view class="gray">保修30天 | 免费上门</view> -->
								<view class="flexd jubetween flex-center">
									<view class="price">
										￥<text>{{item.market_price.toString().split('.')[0]}}</text>{{item.market_price.toString().indexOf('.')!==-1?'.':''}}{{item.market_price.toString().split('.')[1]}}
									</view>
									<view class="btn" @click="talkto(info.user_id)">预约</view>
									
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item business">
					<scroll-view scroll-y="true" >
						<view class="shopMessBox">
							<view class="sever">
								<view class="title">达人服务</view>
								<view class="item flexd">
									<view class="icon">
										<image src="/static/image/icon_fwnr.png" mode="widthFix"></image>
									</view>
									<view class="cont">
										<view class="tlt">
											服务地址
										</view>
										<view class="rich">
											{{info.address}}
										</view>
									</view>
								</view>
								<view class="item flexd">
									<view class="icon">
										<image src="/static/image/icon_fwnr.png" mode="widthFix"></image>
									</view>
									<view class="cont">
										<view class="tlt">
											服务内容
										</view>
										<rich-text class="rich" :nodes="info.service_content"></rich-text>
									</view>
								</view>
								<view class="item flexd">
									<view class="icon">
										<image src="/static/image/icon_fwbz.png" mode="widthFix"></image>
									</view>
									<view class="cont">
										<view class="tlt">
											服务保障
										</view>
										<rich-text class="rich" :nodes="info.service_guarantee"></rich-text>
									</view>
								</view>
								<view class="item flexd">
									<view class="icon">
										<image src="/static/image/icon_fwlc.png" mode="widthFix"></image>
									</view>
									<view class="cont">
										<view class="tlt">
											服务流程
										</view>
										<rich-text class="rich" :nodes="info.service_process"></rich-text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item card">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view class="menu">
							<view class="item flexd flex-center jubetween"
							v-for="(item,i) in welfareList" :key="i">
								<view class="left">
									￥<text>{{item.amount}}</text>
								</view>
								<view class="center">
									<view class="title">
										{{item.name}}
									</view>
									<view class="time">有效期： {{$shijiandate(item.begin_time)}} - {{$shijiandate(item.expiration_time)}}</view>
								</view>
								<view class="right">
									<view class="btn" :class="item.received==1?'active':''"
									@click="$shake(getwel(item))">
										{{item.received==1?'已':'去'}}领取
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import appShare, { closeShare } from '@/uni_modules/zhouWei-APPshare/js_sdk/appShare';
	export default {
		data() {
			return {
				imageurl:'',
				htosp: 0,
				userId: '',
				typeList: ['服务项目','服务内容'],
				typeIndex: 0,
				isBottom: false,
				List: [],
				ListIndex: 0,
				categoryVos: [],
				welfareList: [],
				info: {
					"address": "",
					"business_hours": "",
					"contact_phone": "",
					"distance": "",
					"images": "",
					"score": 0,
					"service_content": "",
					"service_guarantee": "",
					"service_process": "",
					"shop_id": 0,
					"photo": "",
					"talent_name": "",
					"user_id": 0
				},
				getPro: new Map(),
				sumPrice: 0,
				ListIndex: 0,
				id: 0,
				// 防抖
				onoff:true
			}
		},
		onLoad(e) {
			this.htosp=uni.getStorageSync('htop')
			this.userId=uni.getStorageSync('userId')
			this.imageurl = this.globalData.imageurl
			if(e.id){
				this.id=e.id
				let that=this
				this.util.ajax('talent/talentContentDetail',{
					"talentId": e.id,
					"userId": this.userId
				},res=>{
					that.categoryVos=res.data.categoryVos
					if(that.categoryVos.length>0) that.List=res.data.categoryVos[0].productVos
					that.ListIndex=0
					that.info=res.data.info
					that.welfareList=res.data.welfareList
				})
			}
		},
		onPageScroll(e) {
			if(e.scrollTop<this.bottomTop-10){
				this.isBottom=false
			}
			if(this.isBottom){
				this.bottomTop=e.scrollTop
			}
			
		},
		onReachBottom(){
			this.isBottom=true
		},
		methods: {
			test(i){
				this.typeIndex=i
			},
			collect(){
				let that=this
				this.util.ajax('collection/addCollect',{
					"infoId": this.id,
					"type": 2,
					"userId": this.userId
				},res=>{
					this.$alert('收藏成功')
					this.info.collected=!this.info.collected
				})
			},
			changeType(e){
				this.typeIndex = e.detail.current
			},
			changeList(i){
				this.ListIndex=i
				let arr=this.categoryVos[i].productVos
				this.List=arr
			},
			phone(e){
				uni.makePhoneCall({
					phoneNumber: e //仅为示例
				});
			},
			onShare(){
				let shareData = {
					shareUrl:"https://kemean.com/",
					shareTitle:this.info.talent_name,
					shareContent:this.info.talent_phone,
					shareImg: this.Img(this.info.photo),
					appId : "wx6ae9f157d9b35d24", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
					appPath : "/pages/index/darenDetail?id="+this.id,
					//appWebUrl : "https://kemean.com/",
				};
				// 调用
				let shareObj = appShare(shareData,res => {
					this.$alter('分享成功')
					// 分享成功后关闭弹窗
					// 第一种关闭弹窗的方式
					closeShare();
				});
				setTimeout(() => {
					// 第二种关闭弹窗的方式
					shareObj.close();
				},5000);
			},
			talkto(id){
				if(!id) return
				console.log(this.userId,id)
				if(id==this.userId){
					this.$alert('无法和自己聊天')
					return
				}
				this.$jump('/pages/chat/HM-chat?idse='+id)
			},
			getwel(item){
				if(item.received) return
				let that=this
				this.util.ajax('userWelfare/receiveWelfare',{
					"userId": this.userId,
					"welfare_id": item.id,
					"welfare_type": item.welfare_type
				},res=>{
					if(item.welfare_type==2){
						this.$alert('领取成功')
						item.received=1
					}else if(item.welfare_type==1){
						that.util.ajax('pay/toPay',{
							  "orderId": res.data.orderId,
							  "orderNum": res.data.orderNum,
							  "payType": 1,
							  "paymentType": 3,
							  "purpose": 3,
							  "subject": "购买代金券",
							  "userId": that.userId
						},resx=>{
							uni.requestPayment({
							    "provider": "wxpay", 
							    "orderInfo": {
							        "appid": response.appid,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
							        "noncestr": response.noncestr, // 随机字符串
							        "package": response.package,        // 固定值
							        "partnerid": response.partnerid,      // 微信支付商户号
							        "prepayid": response.prepayid, // 统一下单订单号 
							        "timestamp": response.timestamp,        // 时间戳（单位：秒）
							        "sign": response.sign // 签名，这里用的 MD5 签名
							    },
							    success(resx) {
									that.$alert('支付成功')
									setTimeout(function() {
										that.jumpHome()
									}, 1000);
								},
							    fail(e) {
									that.remark=e
									that.$alert('支付失败')
									that.loadmore()
								}
							})
						})
					}
				})
				
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.content{
		padding-bottom: 0;
		position: relative;
		.homeBg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			&::after{
				content: '';
				width: 100%;
				height: 100%;
				background-color: rgba($color: #000000, $alpha: .3);
				display: block;
				position: absolute;
				top: 0;
				left: 0;
			}
			image {
				width: 100%;
			}
		}
	}
	.head{
		padding: 20rpx;
		.left{
			font-size: 32rpx;
			font-weight:  bold;
			image{
				margin-right: 10rpx;
			}
		}
		.shareBox{
			width: 120rpx;
			image{
				width: 46rpx;
			}
		}
	}
	.card{
		height: 100%;
		background-color: #fff;
		.menu{
			padding: 30rpx;
			.item{
				background-color: rgba($color: #FF581E, $alpha: .1);
				padding: 30rpx 20rpx;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
				.left{
					color: #FF581E;
					text{
						font-size: 46rpx;
						font-weight: bold;
					}
				}
				.center{
					padding-right: 30rpx;
					border-right: 1rpx solid #FF581E;
					.title{
						color: #FF581E;
						font-size: 30rpx;
					}
					.time{
						color: #FF581E;
					}
				}
				.right{
					text-align: center;
					.btn{
						background-color: #FF581E;
						color: #fff;
						line-height: 2;
						padding: 0 30rpx;
						border-radius: 30rpx;
						margin-bottom: 10rpx;
						&.active{
							background-color: #fff;
							color: #ff581e;
						}
					}
					.sub{
						color: #FF581E;
					}
				}
			}
		}
	}
	.shopMessage{
		margin-top: 80rpx;
		background-color: #fff;
		border-top-right-radius: 50rpx;
		border-top-left-radius: 50rpx;
		position: relative;
		z-index: 1;
		padding: 30rpx;
		.message{
			width: 500rpx;
		}
		.call{
			width: 40rpx;
		}
		.title{
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.image{
			margin-right: 30rpx;
			image{
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}
		}
		.star{
			margin-left: 10rpx;
			//margin-bottom: 10rpx;
			image{
				width: 26rpx;
				margin-right: 4rpx;
			}
		}
	}
	.typeBox{
		margin-bottom: 2vh;
		background-color: #f5f5f5;
		position: relative;
		z-index: 1;
		.item{
			padding: 0 30rpx;
			font-size: 32rpx;
			line-height: 6vh;
			color: #989898;
			position: relative;
			
			&::before{
				content:'';
				display:block;
				width: 50rpx;
				height: 4rpx;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}
			&.active{
				color: #212121;
				font-weight: bold;
				&::before{
					background-color: $uni-color-primary;
				}
			}
		}
	}
	.foot{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		.cost{
			font-size: 28rpx;
			text{
				font-size: 32rpx;
			}
		}
		.btn{
			line-height: 2.3;
			font-size: 32rpx;
			background-image: $uni-bg-color;
			border-radius: 10rpx;
			padding: 0 70rpx;
		}
	}
	.swiper{
		height: 92vh;
	}
	.list{
		height: 100vh;
		position: relative;
		z-index: 1;
		.left{
			width: 180rpx;
			background-color: #f5f5f5;
			.item{
				line-height: 3;
				text-align: center;
				font-size: 28rpx;
				&.active{
					background-color: #fff;
				}
			}
		}
		.right{
			width: 570rpx;
			background-color: #fff;
			.item{
				padding: 30rpx;
				border-bottom: 1rpx solid #ddd;
				.image{
					width: 160rpx;
					position: relative;
					image{
						width: 160rpx;
						height: 160rpx;
					}
					.renzhen{
						position: absolute;
						width: 70rpx;
						top: 0;
						right: 0;
					}
				}
				.message{
					width: 320rpx;
					.title{
						font-size: 32rpx;
						margin-bottom: 10rpx;
					}
					.gray{
						margin-bottom: 20rpx;
					}
					.price{
						text{
							font-size: 40rpx;
						}
					}
					.btn{
						line-height: 2.3;
						padding: 0 40rpx;
						border-radius: 10rpx;
						background-image: $uni-bg-color;
						font-size: 30rpx;
					}
				}
			}
		}
	}
	.shopMessBox{
		padding: 40rpx 30rpx;
		.title{
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			margin-bottom: 30rpx;
		}
		.sever{
			.tlt{
				font-size: 32rpx;
				margin-bottom: 10rpx;
			}
			.icon{
				width: 40rpx;
				margin-right: 20rpx;
				margin-top: 6rpx;
				image{
					width: 100%;
				}
			}
			.rich{
				font-size: 28rpx;
				color: #666;
			}
			.item{
				margin-bottom: 30rpx;
			}
		}
	}
</style>
