<template>
	<view class="content">
		<view class="head">
			<view class="homeBg">
				<image:src="imageurl+'static/image/yytop.png'" mode="widthFix"></image>
			</view>
			<view class="backs" @click="$jumpback()" :style="{top: htosp+'px'}">
				<image src="/static/image/icon_fh.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="order">
			<view class="input">
				<input type="text" v-model="name" placeholder="请输入预约人姓名" placeholder-style="color: #8b8b8b" />
			</view>
			<view class="input">
				<input type="text" v-model="phone" placeholder="请输入联系方式" placeholder-style="color: #8b8b8b" />
			</view>
			<view class="input">
				<picker class="picker" @change="bindPickerChange" :value="classfyIndex" :range="classfy" range-key="project_name">
					<view class="uni-input">{{classfy[classfyIndex].project_name}}</view>
				</picker>
			</view>
			<view class="input">
				<picker mode="date" fields='day' :start="startDate" :end="endDate" :value="date" @change="bindDateChange">
					<view class="uni-input">{{date==''?'请选择预约时间':date}}</view>
				</picker>
			</view>
			<view class="input">
				<input type="text" v-model="address" placeholder="请填写体检地址" placeholder-style="color: #8b8b8b" />
				
			</view>
			<view class="submit" @click="submit()">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				htosp: 0,
				name: '',
				phone: '',
				classfy: [{
					"id": 0,
					"project_name": "请选择预约项目"
				}],
				classfyIndex: 0,
				date: '',
				address: '',
				userId: '',
				imageurl:'',
			}
		},
		onLoad() {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.imageurl = this.globalData.imageurl
			let that=this
			this.util.ajax('appointment/projectList',{},res=>{
				that.classfy=that.classfy.concat(res.data.list)
			})
		},
		computed: {
		        startDate() {
					let time=new Date().getTime()
		            return this.$shijiandate(time);
		        },
		        endDate() {
		            let time=new Date().getTime()+604800000
					console.log(this.$shijiandate(time))
		            return this.$shijiandate(time);
		        }
		    },
		methods: {
			bindPickerChange: function(e) {
				this.classfyIndex = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			submit(){
				let that=this
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log(res);
						let obj={
						  "address": that.address,
						  "appointmentTime": that.date,
						  "contactName": that.name,
						  "latitude": res.latitude,
						  "longitude": res.longitude,
						  "phone": that.phone,
						  "projectId": that.classfy[that.classfyIndex].id,
						  "userId": that.userId
						}
						that.util.ajax('appointment/saveAppointment',obj,resx=>{
							that.$alert(resx.msg)
							setTimeout(()=>{
								that.$jumpback()
							},1000)
						})
					},
				})
				
			}
			
		}
	}
</script>

<style lang="scss">
	.head{
		position: relative;
		.backs{
			position: absolute;
			z-index: 1;
			width: 35rpx;
			left: 20rpx;
			margin: 0;
			image{
				width: 100%;
			}
			
		}
		.homeBg {
			width: 100%;
			image {
				width: 100%;
			}
		}
	}
	.order{
		padding: 40rpx;
		background-color: #fff;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		margin-top: -60rpx;
		position: relative;
		.input{
			margin-bottom: 20rpx;
			background-color: #F4F4F4;
			border-radius: 40rpx;
			line-height: 2;
			padding: 16rpx 40rpx;
			color: #8b8b8b;
			font-size: 32rpx;
			.uni-input{
				color: #8b8b8b;
				font-size: 32rpx;
			}
		}
		.submit{
			width: 500rpx;
			line-height: 2.3;
			font-size: 36rpx;
			color: #fff;
			background-color: #FF4232;
			text-align: center;
			margin: 20rpx auto;
			border-radius: 50rpx;
		}
		
	}
</style>
