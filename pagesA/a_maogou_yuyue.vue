<template>
	<view class="maogou-yuyue yuyue-box">
		<!-- 套餐选择 -->
		<view class="maogou-yuyue-taocan">
			<view class="maogou-yuyue-taocan-title">
				<text class="font30">选择套餐</text>
				<view class="icon-i">
					<text class="font30">i</text>
				</view>
			</view>
			<view v-if="combolist[0]" class="maogou-yuyue-taocan-list">
				<view class="list" v-for="(item,index) in combolist" :key="index" @click="comboIndex = index"
					:class="comboIndex==index?'active':''">
					<view class="list-title">
						<text class="font24">{{item.combo_name}}</text>
					</view>
					<view class="list-price">
						<text class="font42">￥{{item.combo_price}}</text>
					</view>
					<view class="list-type">
						<text class="font18 fontColor-999">{{item.combo_describe}}</text>
					</view>
					<view class="list-time">
						<text class="font18 fontColor-999">({{item.combo_detail}})</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 上门地址 -->
		<a-upAddress :upAddressId='upAddressId'></a-upAddress>
		<!-- 上门日期 -->
		<view class="maogou-yuyue-upDate">
			<view class="maogou-yuyue-upDate-title">
				<text class="font30">上门日期</text>
			</view>
			<view class="maogou-yuyue-upDate-select flex1-textRight">
				<uni-datetime-picker @change="dateChange" v-model="timePicker" type="datetimerange" :hide-second="true">
					<text v-if="!times[0]" class="font28 fontColor-ccc">请选择</text>
					<text v-else>{{times[0]}}-{{times[1]}}</text>
					<image class="icon22" src="/static/image/icon_gd.png" alt=""></image>
				</uni-datetime-picker>

			</view>
		</view>
		<!-- 宠物类别 -->
		<view class="maogou-yuyue-type">
			<view class="maogou-yuyue-type-title">
				<text class="font30">宠物类别</text>
			</view>
			<view class="maogou-yuyue-type-val flex1-textRight">
				<picker @change="typeChange" :value="typeIndex" :range="typelist" range-key="category_name">
					<view class="uni-input">
						<text v-if="typeIndex==null" class="font28 fontColor-ccc">请选择</text>
						<text v-else class="font28">{{typelist[typeIndex].category_name}}</text>
						<image class="icon22" src="/static/image/icon_gd.png" alt=""></image>
					</view>
				</picker>
			</view>
		</view>
		<!-- 优惠券 -->
		<a-discount :type="7" :price='price'></a-discount>
		<!-- 备注 -->
		<a-remarks></a-remarks>
		<!-- 提交预约 -->
		<a-submit type='喂猫喂狗' :form='form'></a-submit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 套餐列表
				combolist: [],
				comboIndex: null,
				// 宠物类别
				typelist: [{
					"category_name": "", //遛狗喂猫宠物类别
					"id": 0 //编号
				}],
				typeIndex: null,
				// 猫狗表单
				form: {
					"address": "", //地址
					"categoryId": 10, //需求类别ID(10.喂猫遛狗)
					"category_id2": 0, //宠物类别id
					"category_name2": "", //宠物类别名称
					"combo_id": 0, //套餐id
					"commission": 0, //上门服务费
					"contact_name": "", //联系人姓名
					"contact_phone": "", //联系电话
					"coupon_amount": 0, //优惠券价格
					"coupon_id": 0, //优惠券id
					"end_time": "", //上门结束时间
					"handover_mode": 0, //交接方式(0.上门服务 1.指定位置)
					"latitude": "", //地址纬度
					"longitude": "", //地址经度
					"remark": "", //备注
					"start_time": "", //上门开始时间
					"userId": 0 //发布用户ID
				},
				// 开始 结束时间
				timePicker: [],
				// 开始 结束时间(格式化)
				times: [],
				// 上门地址ID
				upAddressId: null,
				// 价格
				price: 0
			}
		},
		onLoad() {
			this.getSetMeal()
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
			// 宠物类别
			typeIndex(newVal, oldVal) {
				this.form.category_id2 = this.typelist[newVal].id
				this.form.category_name2 = this.typelist[newVal].category_name
			},
			// 宠物套餐
			comboIndex(newVal, oldVal) {
				this.form.combo_id = this.combolist[newVal].id
				this.form.commission = this.combolist[newVal].combo_price
				this.price = this.combolist[newVal].combo_price
			},
			// 开始结束时间
			timePicker(newVal, oldVal) {
				this.form.start_time = newVal[0]
				this.form.end_time = newVal[1]
			}
		},
		methods: {
			// 获取宠物套餐
			getSetMeal() {
				this.util.ajax('personalDemand/feedPetCombo', {
					"fromUserId": uni.getStorageSync('userId')
				}, res => {
					this.combolist = res.data.list
				})
			},
			// 获取宠物类型
			getTypeList() {
				this.util.ajax('personalDemand/feedPetCategory', {
					"fromUserId": uni.getStorageSync('userId')
				}, res => {
					this.typelist = res.data.list
				})
			},
			//监听服务类别
			typeChange(e) {
				let that = this
				that.typeIndex = e.detail.value
				that.form.category_id2 = that.typelist[e.detail.value].id
			},
			// 监听上门日期
			dateChange(newval) {
				let that = this
				for (let i = 0; i < newval.length; i++) {
					let month = newval[i].split(' ')[0].split('-')[1]
					let day = newval[i].split(' ')[0].split('-')[2]
					let hour = newval[i].split(' ')[1].split(':')[0]
					let branch = newval[i].split(' ')[1].split(':')[1]
					let time = month + '月' + day + '日' + hour + ':' + branch
					that.times.push(time)
				}
			},
			// 获取子组件数据
			getSubComponentData(type, data, mode) {
				let that = this
				console.log('类别:', type)
				if (type == '交接方式') {
					that.form.address = data.address + data.address_detail
					that.form.contact_name = data.name
					that.form.contact_phone = data.phone
					that.form.latitude = data.latitude
					that.form.longitude = data.longitude
					that.form.handover_mode = mode
				} else if (type == '优惠券') {
					that.form.coupon_id = data.id
					that.form.coupon_amount = data.amount
					that.form.commission = parseInt(that.combolist[that.comboIndex].combo_price - data.amount)
				} else if (type == '备注') {
					that.form.remark = data
				}
			}
		}
	}
</script>

<style lang="less">
	.maogou-yuyue-taocan,
	.maogou-yuyue-upDate,
	.maogou-yuyue-type {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
	}

	.maogou-yuyue-taocan {
		.maogou-yuyue-taocan-title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.icon-i {
				width: 25rpx;
				height: 25rpx;
				line-height: 25rpx;
				padding: 8rpx;
				text-align: center;
				color: #FF8D1E;
				border: 1px solid #FF8D1E;
				border-radius: 50%;
			}
		}

		.maogou-yuyue-taocan-list {
			display: flex;
			justify-content: space-between;
			padding-top: 20rpx;
			flex-wrap: wrap;

			.list {
				width: 26%;
				height: 230rpx;
				padding: 15rpx;
				margin-right: 15rpx;
				margin-bottom: 20rpx;
				border: 1px solid #CCCCCC;
				text-align: center;
				border-radius: 8rpx;

				.list-price {
					padding-top: 15rpx;

					text {
						color: #FF6000;
					}
				}
			}

			.list:nth-child(3n) {
				margin-right: 0;
			}

			.active {
				border: 1px solid #FA6400;
			}
		}
	}

	.maogou-yuyue-upDate,
	.maogou-yuyue-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
