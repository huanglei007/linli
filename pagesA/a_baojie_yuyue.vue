<template>
	<view class="baojie-yuyue yuyue-box">
		<!-- 服务类别 -->
		<view class="baojie-yuyue-type">
			<view class="baojie-yuyue-type-title">
				<text class="font30">服务类别</text>
			</view>
			<view class="baojie-yuyue-type-select flex1-textRight">
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
		<a-upTime :start_time="form.start_time" :end_time="form.end_time"></a-upTime>
		<!-- 优惠券 -->
		<a-discount :type="3" :price='price'></a-discount>
		<!-- 备注 -->
		<a-remarks></a-remarks>
		<!-- 提交预约 -->
		<a-submit type='家政保洁' :form='form'></a-submit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 服务类别
				typelist: [{
					"category_name": "", //服务类别
					"id": 0, //编号
					"price": 0, //单价
					"service_introduction": "" //服务介绍
				}],
				index: null,
				form: {
					"address": "", //上门地址
					"categoryId": 9, //需求类别ID(9.家政保洁)
					"category_id2": 0, //服务类别id
					"commission": 0, //上门服务费
					"contact_name": "", //联系人姓名
					"contact_phone": "", //联系电话
					"coupon_amount": 0, //优惠券价格
					"coupon_id": 0, //优惠券id
					"duration": 0, //时长
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
				price: 0
			}
		},
		onLoad(option) {
			this.getTypeList()
			this.form.category_id2 = option.typeId
			this.form.userId = uni.getStorageSync('userId');
		},
		onShow() {
			let that = this
			uni.$on('upAddressData', function(id) {
				that.upAddressId = id
			})
		},
		watch: {
			typelist(newVal, oldVal) {
				for (let i = 0; i < newVal.length; i++) {
					if (newVal[i].id == this.form.category_id2) {
						this.index = i
					}
				}
			},
			index(newVal, oldVal) {
				this.form.category_id2 = this.typelist[newVal].id
				this.form.commission = this.typelist[newVal].price
				this.price = this.typelist[newVal].price
			},
		},
		methods: {
			// 获取服务类型
			getTypeList() {
				this.util.ajax('personalDemand/housekeepingCategory', {
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
					that.form.address = data.address + data.address_detail
					that.form.contact_name = data.name
					that.form.contact_phone = data.phone
					that.form.latitude = data.latitude
					that.form.longitude = data.longitude
				} else if (type == '上门时间') {
					this.getDateBeforeNow(data.split('/')[0], data.split('/')[1])
					that.form.start_time = data.split('/')[0]
					that.form.end_time = data.split('/')[1]
				} else if (type == '优惠券') {
					that.form.coupon_id = data.id
					that.form.coupon_amount = data.amount
					that.form.commission = that.typelist[that.index].price - data.amount
				} else if (type == '备注') {
					that.form.remark = data
				}
			},
			// 时间格式化时间为：刚刚、多少分钟前、多少天前
			getDateBeforeNow(time0, time1) {
				time0 = new Date(time0.replace(/-/g, '/'))
				time1 = new Date(time1.replace(/-/g, '/'))

				// 统一单位换算
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var week = day * 7;
				var month = day * 30;
				var year = month * 12;

				// 对时间进行毫秒单位转换
				var time0 = new Date(time0).getTime(); //指定时间的时间戳
				var time1 = new Date(time1).getTime(); //指定时间的时间戳

				var time = time1 - time0;
				this.form.duration = parseInt(time / hour)
			},
		}
	}
</script>

<style lang="less">
	.baojie-yuyue-type {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
	}

	.baojie-yuyue-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
