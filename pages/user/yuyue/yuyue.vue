<template>
	<view class="content">
		<view class="list">
			<view class="item" v-for="(item,i) in list" :key="i">
				<view class="top flexd flex-center jubetween">
					<view class="flexd flex-center">
						<view class="title">{{item.contact_name}}</view>
						<view v-if="!item.isvalid&&item.appointment_time>new Date().getTime()" class="cancle" @click="cancle(item.id)">
							取消
						</view>
					</view>
					<view class="time flexd flex-center">
						<view>{{$shijiandate(item.createtime)}}</view>
					</view>
				</view>
				<view class="mess">
					<view class="flexd jubetween mb-10">
						<view class="gray">联系方式</view>
						<view class="">{{item.phone}}</view>
					</view>
					<view class="flexd jubetween mb-10">
						<view class="gray">预约时间</view>
						<view class=""> {{$shijian(item.appointment_time)}}</view>
					</view>
					<view class="flexd jubetween mb-10">
						<view class="gray">预约项目</view>
						<view class="">{{item.project_name}}</view>
					</view>
					<view class="flexd jubetween mb-10">
						<view class="gray">体检地址</view>
						<view class="">{{item.address}}</view>
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
				list: [],
			}
		},
		onLoad() {
			this.userId= uni.getStorageSync('userId')
			this.getList();
		},
		methods: {
			getList(){
				let that=this
				this.util.ajax('appointment/appointmentList',{
					userId: this.userId
				},res=>{
					this.list=res.data.list
				})
			},
			cancle(id){
				let that=this
				this.util.ajax('appointment/cancelAppointment',{
					appointmentId: id
				},res=>{
					this.$alert('取消成功')
					this.getList()
				})
			}
		}
	}
</script>

<style lang="scss">
	.list{
		margin: 0 30rpx;
		.item{
			margin: 30rpx 0;
			background-color: #fff;
			padding: 30rpx;
			border-radius: 10rpx;
			.top{
				padding-bottom: 30rpx;
				position: relative;
				background-image: url('/static/image/dian.png');
				background-repeat: no-repeat;
				background-position: bottom center;
				&::before,&::after{
					content: '';
					display: block;
					width: 25rpx;
					height: 25rpx;
					position: absolute;
					bottom: -13rpx;
					background-color: #f5f5f5;
					border-radius: 50%;
				}
				&::before{
					left: -43rpx;
				}
				&::after{
					right: -43rpx;
				}
				.title{
					font-size: 32rpx;
					font-weight: bold;
				}
				.cancle{
					color: #5394F6;
					border: 1rpx solid #5394F6;
					border-radius: 50rpx;
					line-height: 1.8;
					padding: 0 20rpx;
					margin-left: 10rpx;
				}
			}
			.mess{
				margin-top: 30rpx;
			}
		}
	}
</style>
