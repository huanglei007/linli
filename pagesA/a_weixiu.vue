<template>
	<view class="weixiu yuyue-box">
		<!-- 维修类型 -->
		<view class="weixiu-yuyue-type">
			<view class="weixiu-yuyue-type-title">
				<text class="font30">维修类别</text>
			</view>
			<view class="weixiu-yuyue-type-select flex1-textRight">
				<picker @change="typeChange" :value="index" :range="typelist" range-key="category_name">
					<view class="uni-input">
						<text v-if="index==null" class="font28 fontColor-ccc">请选择</text>
						<text v-else class="font28">{{typelist[index].category_name}}</text>
						<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
					</view>
				</picker>
			</view>
		</view>
		
		<!-- 上门地址 -->
		<a-upAddress :upAddressId='upAddressId'></a-upAddress>
		<!-- 上门时间 -->
		<a-upTime></a-upTime>
		<!-- 优惠卷 -->
		<a-discount :type="4" :price='price'></a-discount>
		<!-- 备注 -->
		<a-remarks></a-remarks>
		<!-- 注: -->
		<view class="zhu" style="margin-top: 10rpx;">
			<text class="font28" style="color:#FF6000;">注：如需更换零部件额外单算</text>
		</view>
		<!-- 提交预约 -->
		<a-submit type='安装维修' :form='form'></a-submit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 服务类别
				typelist: [{
					"category_name": "",//类别
					"id": 0,//编号
					"price": 0 //价格
				}],
				index: null,
				form: {
					"address": "", //上门地址
					"categoryId": 15, //需求类别ID(9.家政保洁)
					"category_id2": 0, //服务类别id
					"commission": 0, //上门服务费
					"contact_name": "", //联系人姓名
					"contact_phone": "", //联系电话
					"coupon_amount": 0, //优惠券价格
					"coupon_id": 0, //优惠券id
					"end_time": "", //上门结束时间
					"latitude": "", //上门地址纬度
					"longitude": "", //上门地址经度
					"remark": "", //备注
					"start_time": "", //上门开始时间
					"userId": 0 //发布用户ID
				},
				// 上门地址ID
				upAddressId: null,
				// 价格
				price:0
			}
		},
		onLoad() { 
			this.getTypeList()
		},
		onShow() {
			let that = this
			uni.$on('upAddressData', function(id) {
				that.upAddressId = id
			})
		},
		watch: {
			index(newVal, oldVal) {
				this.form.category_id2 = this.typelist[newVal].id
				this.form.commission = this.typelist[newVal].price
				this.price = this.typelist[newVal].price
			},
		},
		methods: {
			// 获取服务类型
			getTypeList() {
				this.util.ajax('personalDemand/installMaintenanceCategory', {
					"fromUserId": uni.getStorageSync('userId')
				}, res => {
					this.typelist = res.data.list
				})
			},
			//监听服务类别
			typeChange(e) {
				let that = this
				that.index = e.detail.value
				that.form.category_id2 = that.typelist[e.detail.value].id
			},
			// 获取子组件数据
			getSubComponentData(type, data) {
				let that = this
				console.log('类别:', type)
				if (type == '上门地址') {
					that.form.address = data.address+data.address_detail
					that.form.contact_name = data.name
					that.form.contact_phone = data.phone
					that.form.latitude = data.latitude
					that.form.longitude = data.longitude
				}else if(type == '上门时间'){
					that.form.start_time = data.split('/')[0]
					that.form.end_time =  data.split('/')[1]
				}else if(type == '优惠卷'){
					that.form.coupon_id = data.id
					that.form.coupon_amount =  data.amount
					that.form.commission = parseInt(that.typelist[that.index].price - data.amount)
				}else if(type == '备注'){
					that.form.remark = data
				}
			}
		}
	}
</script>

<style lang="less">
	.weixiu-yuyue-type {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
