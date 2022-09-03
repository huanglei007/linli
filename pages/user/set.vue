<template>
	<view class="content">
		<view class="operation">
			<view class="hui"></view>
			<view class="list harda" @click="onimg">
				<view class="flexd">
					<view>头像</view>
				</view>
				<view class="flexd">
					<image :src="Img(userinfo.head_img)" mode=""></image>
					<image src="/static/image/icon_gd.png" mode="" class="right"></image>
				</view>
			</view>
			<view class="list harda">
				<view class="flexd">
					<view>账号</view>
				</view>
				<view class="flexd">
					<view>{{userinfo.phone}}</view>
				</view>
			</view>
			<view class="list" @click="isNick=true;$refs.nickBox.focus">
				<view class="flexd">
					<view>昵称</view>
				</view>
				<view class="flexd">
					<view v-show="!isNick">{{userinfo.nick_name}}</view>
					<image v-show="!isNick" src="/static/image/icon_gd.png" mode="" class="right"></image>
					<uni-easyinput ref='nickBox' :inputBorder="false" v-show="isNick" :focus="isNick" v-model="newNick" @blur="changeNick"></uni-easyinput>
				</view>
			</view>
			<view class="hui"></view>
		</view>
		<view class="sren" @click="send">退出登录</view>
		<view class="sren" @click="cancellation">注销帐号</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				firsa:false,
				userId:'',
				imageurl:'',
				iima:[],
				imaga:'',
				htosp:0,
				list:[
					{title:'账号',fixs:'1233123211',url:''},
					{title:'昵称',fixs:'1233123211',url:''},
					{title:'修改登录密码',fixs:'',url:'./pass'}
				],
				userinfo: {},
				newNick: '',
				isNick: false,
			}
		},
		onLoad() {
			this.htosp = uni.getStorageSync('htop');
			this.userId=uni.getStorageSync('userId');
			this.getlist()
			this.imageurl = this.globalData.imageurl;
		},
		onShow() {
		},
		computed:{
			
		},
		methods: {
			changeNick(){
				let that=this
				if(this.newNick!==''){
					this.util.ajax('user/updateNickName',{
						"nickName": this.newNick,
						"userId": this.userId
					},res=>{
						that.$alert('昵称修改成功')
						this.getlist()
						that.newNick=''
					})
				}
				that.isNick=false
			},
			getlist(){
				let that=this
				this.util.ajax('user/getUserInfo',{
					"userId": this.userId
				},res=>{
					that.userinfo=res.data
					uni.setStorageSync('userInfo',res.data)
				})
			},
			onimg(){
				let that=this
				this.iima = [];
				this.util.sendimage(1,this.iima,()=>{
					this.util.ajax('user/updateHeadImg',{
						headImg: that.iima[0],
						userId: this.userId
					},function(res){
						that.getlist()
						uni.showModal({
							title: '提示',
							content: res.data,
							showCancel: false
						})
					})
				})
			},
			navto(item,index){
				if(item.title != '账号'){
					this.$jump(item.url)
				}
			},
			// 退出登录
			send(){
				let that = this;
				uni.showModal({
				  title: '提示',
				  content: '是否退出登录',
				  showCancel: true,
				  success: function (res) {
						if (res.confirm) {
							uni.removeStorageSync('userId');
							uni.removeStorageSync('userInfo');
							uni.removeStorageSync('access_token');
							uni.reLaunch({
								url: '/pages/login/login',
								
							})
							// console.log('用户点击确定');
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
				  }
				})
			},
			// 注销帐号
			cancellation(){
				let that = this;
				uni.showModal({
				  title: '提示',
				  content: '是否确定注销帐号',
				  showCancel: true,
				  success: function (res) {
						if (res.confirm) {
							uni.removeStorageSync('userId');
							uni.removeStorageSync('userInfo');
							uni.removeStorageSync('access_token');
							uni.reLaunch({
								url: '/pages/login/login',
								
							})
							// console.log('用户点击确定');
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
				  }
				})
			}
		}
	}
</script>

<style lang='scss'> 
	page{
		background:#f5f5f5 ;
	}
	.content{
		padding-bottom: 30rpx;
		margin-bottom: 50rpx;
		.operation{
			.hui{
				width: 100%;
				height: 20rpx;
				background: #F1F5F5;
			}
			.harda{
				height: 120rpx !important;
				line-height: 120rpx !important;
				border-bottom: none !important;
			}
			.list:last-child{
				border-bottom: none;
			}
			.list{
				height: 98rpx;
				line-height: 98rpx;
				display: flex;
				justify-content: space-between;
				padding: 0 30rpx;
				padding-left: 40rpx;
				border-bottom: 1rpx solid #e6e6e6;
				background: #FFF;
				view{
					font-size: 28rpx;
				}
				image{
					width: 98rpx;
					height: 98rpx;
					margin: auto 0;
					border-radius: 50%;
				}
				.right{
					width: 32rpx;
					height: 32rpx;
					margin-left: 29rpx;
				}
			}
		}
		.sren{
			width: 100%;
			height: 98rpx;
			line-height: 98rpx;
			text-align: center;
			margin-top:  21rpx;
			font-size: 32rpx;
			background: #FFF;
		}
	}
</style>
