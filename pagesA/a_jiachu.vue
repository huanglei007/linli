<template>
	<view class="jiachu yuyue-box">
		<!-- 家厨预约类型 -->
		<view class="jiachu-yuyue-type">
			<view class="jiachu-yuyue-type-title">
				<text class="font30">预约性质</text>
			</view>
			<view class="jiachu-yuyue-type-select flex1-textRight">
				<picker @change="bindPickerChange" :value="index" :range="typelist" range-key="category_name">
					<view class="uni-input">
						<text v-if="index==null" class="font28 fontColor-ccc">请选择</text>
						<text v-else class="font28">{{typelist[index].category_name}}</text>
						<image class="icon22" src="/static/image/icon_gd.png" alt=""></image>
					</view>
				</picker>
			</view>
		</view>
		<!-- 菜 -->
		<view class="jiachu-yuyue-food">
			<view class="jiachu-yuyue-food-num">
				<view class="title">
					<text>菜品数量</text>
				</view>
				<view class="num">
					<uni-number-box v-model="form.dishes_number"></uni-number-box>
				</view>
			</view>
			<view class="jiachu-yuyue-food-type">
				<view class="title">
					<text>菜品</text>
				</view>
				<view class="type">
					<text class="radio1" :class="{'news-active':form.type == 0}" @click="form.type=0">
						自备
					</text>
					<text class="radio2" :class="{'news-active':form.type == 1}" @click="form.type=1">
						代买
					</text>
				</view>
			</view>
		</view>
		<!-- 上门地址 -->
		<a-upAddress :upAddressId='upAddressId'></a-upAddress>
		<!-- 上门时间 -->
		<a-upTime :start_time="form.start_time" :end_time="form.end_time"></a-upTime>
		<!-- 优惠卷 -->
		<a-discount :type="7" :price='price'></a-discount>
		<!-- 备注 -->
		<a-remarks></a-remarks>
		<!-- 注: -->
		<view class="zhu" style="margin-top: 10rpx;">
			<text class="font28" style="color:#FF6000;">注：如需代买菜品具体菜品产生的费用另算</text>
		</view>
		<!-- 提交预约 -->
		<a-submit type='百味家厨' :form='form'></a-submit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 预约性质
				typelist: [{
					"category_name": "", //预约性质
					"id": 0, //编号
					"price": 0 //价格
				}],
				index: null,
				// 家厨表单
				form: {
					"address": "", //上门地址
					"categoryId": 11, //需求类别ID(11.百味家厨)
					"category_id2": 0, //预约性质id
					"commission": 0, //上门服务费
					"contact_name": "", //联系人姓名
					"contact_phone": "", //联系电话
					"coupon_amount": 0, //优惠券价格
					"coupon_id": 0, //优惠券id
					"dishes_number": 0, //菜品数量
					"end_time": "", //上门结束时间
					"latitude": "", //上门地址纬度
					"longitude": "", //上门地址经度
					"remark": "", //备注
					"start_time": "", //上门开始时间
					"type": 0, //类型（0:自备 1:代买）
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
			this.form.userId = uni.getStorageSync('userId');
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
				this.util.ajax('personalDemand/chefAppointmentCategory', {
					"fromUserId": uni.getStorageSync('userId')
				}, res => {
					this.typelist = res.data.list
				})
			},
			// 监听预约性质
			bindPickerChange: function(e) {
				this.index = e.detail.value
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
	.jiachu-yuyue-type,
	.jiachu-yuyue-food {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
	}

	.jiachu-yuyue-type,
	.jiachu-yuyue-food-num,
	.jiachu-yuyue-food-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.jiachu-yuyue-food-type {
		padding-top: 30rpx;
		margin-top: 30rpx;
		border-top: 1px solid #E8E8E8;

		.type {
			.news-active {
				background-color: #F9D448;
			}
		}
	}
</style>
