<template>
	<view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">{{userInfo.user_type==3?'商家':'达人'}}名称</view>
				<input class="input" type="text" v-model="detail.shop_name" :placeholder="'请输入'+(userInfo.user_type==3?'店铺':'达人')+'名称'" placeholder-style="color:#878787"/>
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">{{userInfo.user_type==3?'商家':'达人'}}地址</view>
				<input class="input" type="text" v-model="detail.address" :placeholder="'请输入'+(userInfo.user_type==3?'商家':'达人')+'地址'" placeholder-style="color:#878787"/>
			</view>
		</view>
		<view class="picBox">
			<view class="title">
				服务时间
			</view>
			<view class="flexd flex-center jubetween">
				<view class="item">
					<time-picker :star="starTime" @change="bindTimeChange">
						<view class="uni-input">{{detail.service_begin_time}}</view>
					</time-picker>
				</view>
				<view class="item">
					<time-picker :star="starTime2" @change="bindTimeChange2">
						<view class="uni-input">{{detail.service_end_time}}</view>
					</time-picker>
				</view>
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">联系电话</view>
				<input class="input" type="number" v-model="detail.contact_phone" placeholder="请输入联系方式" placeholder-style="color:#878787"/>
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">{{userInfo.user_type==3?'商家':'达人'}}类型</view>
				<picker class="picker" @change="bindPickerChange" :value="shopIndex" :range="shopTpye" range-key="name">
					<view class="uni-input">{{shopTpye[shopIndex].name}}</view>
				</picker>
			</view>
			<view class="list flexd flex-center jubetween" v-if="subList.length>0">
				<view class="pic" v-for="(item,i) in subList" :key="i"
				:class="item.id==detail.shop_sub_type_id?'active':''"
				@click="subType(item.id)">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="form">
			<view class="item">
				<view style="font-size: 28rpx;line-height: 1.3;margin-top: 10rpx;">服务内容</view>
				<textarea class="textarea" v-model="detail.service_content" placeholder-style="color:#878787" placeholder="请输入服务内容"/>
			</view>
		</view>
		<view class="form">
			<view class="item">
				<view style="font-size: 28rpx;line-height: 1.3;margin-top: 10rpx;">服务流程</view>
				<textarea class="textarea" v-model="detail.service_process" placeholder-style="color:#878787" placeholder="请输入服务流程"/>
			</view>
		</view>
		<view class="form">
			
			<view class="item">
				<view style="font-size: 28rpx;line-height: 1.3;margin-top: 10rpx;">服务保障</view>
				<textarea class="textarea" v-model="detail.service_guarantee" placeholder-style="color:#878787" placeholder="请输入服务保障"/>
			</view>
		</view>
		
		<view class="outBox">
			<view style="font-size: 28rpx;line-height: 1.3;">上传商家logo</view>
			<view class="out">
				<block>
					<view class="peop" v-if="detail.shop_logo!=''">
						<image :src="Img(detail.shop_logo)" mode=""></image>
						<image @click="detail.shop_logo='',$forceUpdate()" src="/static/image/icon_jian.png" mode="" class="del icon32"></image>
					</view>
				</block>
				<view class="peop" @click="addImg2()" v-if="detail.shop_logo==''">
					<image src="/static/image/icon_tj.png" mode="" style="border-radius: 0;"></image>
				</view>
			</view>
		</view>
		<view class="outBox">
			<view style="font-size: 28rpx;line-height: 1.3;">上传店铺图片</view>
			<view class="out">
				<block v-for="(item,index) in imageValue" :key='index'>
					<view class="peop">
						<image :src="Img(item)" mode=""></image>
						<image @click="del('imageValue',index)" src="/static/image/icon_jian.png" mode="" class="del icon32"></image>
					</view>
				</block>
				<view class="peop" @click="addImg('imageValue',5-imageValue.length)">
					<image src="/static/image/icon_tj.png" mode="" style="border-radius: 0;"></image>
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="btn" @click="submit()">
				提交审核
			</view>
		</view>
	</view>
</template>

<script>
	import timePicker from '@/components/timePicker.vue'
	import pickerAddress from '@/components/wangding-pickerAddres/wangding-pickerAddress.vue'
	export default {
		components:{
			pickerAddress,
			timePicker
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			let starTime=6
			let starTime2=starTime+1
			return {
				htosp: 0,
				date: currentDate,
				address: '请选择地址',
				shopTpye: [{
					name: '请选择类型',
					id:0,
				}],
				shopIndex: 0,
				starTime,
				starTime2,
				subList: [],
				imageValue: [],
				userId: '',
				userInfo: {},
				detail: {
					address: '',
					business_license: '',
					contact_name: '',
					contact_phone: '',
					createtime: '',
					house_number: '',
					images: "",
					isvalid: 0,
					latitude: '',
					longitude: '',
					operation_point_id: 0,
					remarks: '',
					sale_nature: 1,
					service_begin_time: '',
					service_end_time: '',
					service_content: '',
					service_guarantee: '',
					service_process: '',
					shop_logo: '',
					shop_name: '',
					shop_sub_type_id: 1,
					status: 1
				},
			}
		},
		mounted() {
			this.htosp = uni.getStorageSync('htop');
			this.userId= uni.getStorageSync('userId')
			this.userInfo= uni.getStorageSync('userInfo')
			if(this.userInfo.user_type==4){
				uni.setNavigationBarTitle({
					title: '达人设置'
				})
			}
			this.loadmore()
		},
		methods: {
			loadmore(){
				let that=this
				if(this.userInfo.user_type==3){
					this.util.ajax('shop/getShopTypeList',{},(res)=>{
						that.shopTpye=that.shopTpye.concat(res.data.list)
						that.util.ajax('shop/getShopInfo',{
							userId: that.userId
						},(res)=>{
							that.detail=res.data
							if(res.data.images) that.imageValue=res.data.images.split(',')
							if(!that.detail.shop_sub_type_id) that.detail.shop_sub_type_id=0
							if(res.data.shop_type_id){
								for(let i=0;i<that.shopTpye.length;i++){
									if(that.shopTpye[i].id==res.data.shop_type_id){
										that.shopIndex=i
										break
									}
								}
								that.util.ajax('shop/getShopTypeList',{
									parentId: res.data.shop_type_id
								},(res)=>{
									that.subList=res.data.list
								})
							}
							if(!that.detail.service_begin_time) that.detail.service_begin_time='8:00'
							if(!that.detail.service_end_time) that.detail.service_end_time='21:00'
						})
					})
				}else{
					this.util.ajax('talent/getTalentServiceTypes',{},(res)=>{
						that.shopTpye=that.shopTpye.concat(res.data.list.map(e=>{
							return {
								"icon": e.service_icon,
								"id": e.id,
								"name": e.service_type_name,
							}
						}))
						that.util.ajax('talent/getTalentInfo',{
							userId: that.userId
						},(res)=>{
							that.detail=res.data
							if(res.data.images) that.imageValue=res.data.images.split(',')
							if(!that.detail.service_type_id) that.detail.service_type_id=0
							if(res.data.service_type_id){
								for(let i=0;i<that.shopTpye.length;i++){
									if(that.shopTpye[i].id==res.data.service_type_id){
										that.shopIndex=i
										break
									}
								}
								that.util.ajax('shop/getShopTypeList',{
									parentId: res.data.service_type_id
								},(res)=>{
									that.subList=res.data.list
								})
							}
							if(!that.detail.service_begin_time) that.detail.service_begin_time='8:00'
							if(!that.detail.service_end_time) that.detail.service_end_time='21:00'
						})
					})
				}
				
			},
			subType(id){
				this.detail.shop_sub_type_id=id
				this.$forceUpdate()
			},
			bindPickerChange: function(e) {
				this.shopIndex = e.target.value
				let that=this
				if(this.userInfo.user_type==3){
					this.util.ajax('shop/getShopTypeList',{
						parentId: this.detail.shop_type_id
					},(res)=>{
						that.subList=res.data.list
						that.detail.shop_sub_type_id=0
					})
				}
			},
			bindTimeChange: function(e) {
				this.detail.service_begin_time = e
				this.updatestarTime()
			},
			updatestarTime(){
				let obj=this.detail.service_begin_time.split(':')
				this.starTime2=parseInt(obj[0])+1
				if(parseInt(this.detail.service_end_time.split(':')[0])<=this.starTime2){
					this.detail.service_end_time=this.starTime2+':00'
				}
				this.$forceUpdate()
			},
			bindTimeChange2: function(e) {
				this.detail.service_end_time = e
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			addImg(e,num){
				if(num<0) return
				this.util.sendimage(num,this[e])
			},
			del(e,x){
				this[e].splice(x,1)
			},
			addImg2(){
				let box=[]
				let that=this
				this.util.sendimage(1,box,(res)=>{
					that.detail.shop_logo=box[0]
					that.$forceUpdate()
				})
			},
			submit(){
				this.detail.images=this.imageValue.join()
				this.detail.userId=this.userId
				
				let that=this
				this.util.ajax('shop/saveShopSet',this.detail,(res)=>{
					that.$alert(res.msg)
					this.loadmore()
				})
			}
		}
	}
</script>

<style lang="scss">
	.outBox{
		margin: 30rpx 0;
		padding: 30rpx;
		background-color: #fff;
	}
	.picBox{
		margin: 30rpx 0;
		
		.title{
			margin-bottom: 20rpx;
			font-size: 28rpx;
		}
		.item{
			width: 45%;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 10rpx 40rpx;
			box-sizing: border-box;
			.uni-input{
				text-align: center;
				line-height: 2;
				font-size: 28rpx;
			}
		}
	}
	.form{
		margin: 30rpx 0;
		background-color: #fff;
		border-radius: 10rpx;
		.list{
			padding: 0 30rpx;
			flex-wrap: wrap;
			.pic{
				margin: 10rpx 0;
				width: 23%;
				line-height: 2.6;
				border: 1rpx solid #E5E5E5;
				border-radius: 10rpx;
				text-align: center;
				&.active{
					border-color: #FF3336;
					border-style: dotted;
					color: #FF3336;
					
				}
			}
		}
		.item{
			padding: 10rpx 40rpx;
			border-bottom: 1rpx solid #f5f5f5;
			line-height: 80rpx;
			width: 100%;
			box-sizing: border-box;
			position: relative;
			.right{
				position: absolute;
				right: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 24rpx;
			}
			.label{
				margin-right: 20rpx;
			}
			&:last-child{
				border-bottom: 1rpx solid #fff;
			}
			view{
				font-size: 28rpx;
			}
			.input{
				width: 400rpx;
			}
			.textarea{
				height: 200rpx;
				padding: 20rpx 0;
			}
			.text{
				image{
					width: 36rpx;
					margin-left: 20rpx;
				}
			}
			&.name{
				input{
					width: 200rpx;
				}
			}
			
		}
		.time{
			padding: 10rpx 40rpx;
			.timeItem{
				padding: 20rpx;
				width: 230rpx;
				background-color: #f6f6f6;
				text-align: center;
				position: relative;
				&::before{
					content: '';
					position: absolute;
					display: block;
					width: 14rpx;
					height: 22rpx;
					right: 20rpx;
					top: 50%;
					transform: translateY(-50%);
					background-image: url('/static/image/icon_gd.png');
					background-size: cover;
				}
				.uni-input{
					color: #888;
					line-height: 2;
				}
			}
		}
		.address{
			padding: 20rpx 30rpx;
			image{
				width: 100%;
				margin-top: 10rpx;
			}
			.icon{
				width: 50rpx;
			}
			.more{
				width: 30rpx;
			}
			.text{
				width: 500rpx;
				font-size: 28rpx;
			}
		}
		.gender{
			padding: 0 20rpx;
			width: 240rpx;
			view{
				margin: 0;
			}
		}
	}
	.out{
		display: flex;
		flex-wrap: wrap;
		.peop{
			width: 144rpx;
			height: 144rpx;
			margin: 20rpx 0;
			margin-right: 12rpx;
			position: relative;
			image,video{
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
			.del{
				width: 30rpx;
				height: 30rpx;
				position: absolute;
				top: 2rpx;
				right: 2rpx;
			}
		}
	}
	.foot{
		width: 70%;
		margin: 30rpx auto;
		.btn{
			background-color: $uni-color-primary;
			line-height: 2.8;
			text-align: center;
			border-radius: 50rpx;
			font-size: 32rpx;
		}
	}
</style>
