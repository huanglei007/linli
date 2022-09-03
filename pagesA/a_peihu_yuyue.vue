<template>
	<view class="peihu-yuyue yuyue-box">
		<!-- 服务类别 -->
		<view class="peihu-yuyue-type">
			<view class="peihu-yuyue-type-title">
				<text class="font30">服务项目</text>
			</view>
			<view class="peihu-yuyue-type-select flex1-textRight">
				<picker @change="bindPickerChange" :value="index" :range="typelist" range-key="category_name">
					<view class="uni-input">
						<text v-if="index==null" class="font28 fontColor-ccc">请选择</text>
						<text v-else class="font28">{{typelist[index].category_name}}</text>
						<image class="icon22" src="/static/image/icon_gd.png" alt=""></image>
					</view>
				</picker>
			</view>
		</view>
		<!-- 服务对象 -->
		<view class="peihu-yuyue-obj">
			<view class="peihu-yuyue-obj-title">
				<text class="font30">服务对象</text>
				<image v-if="objform.service_object_age" class="icon32" src="/static/img/icon_edit.png" mode=""
					@click="subEvent">
				</image>
			</view>
			<view class="peihu-yuyue-obj-add">
				<view v-if="objform.service_object_name==''" class="addbtn" @click="subEvent">
					<text>+ 添加服务对象</text>
				</view>
				<view v-else class="objbox" style="text-align:left;padding-left: 30rpx;">
					<view class="name">
						<text>姓名：</text>
						<text class="font28">{{objform.service_object_name}}</text>
					</view>
					<view class="age">
						<text>年龄：</text>
						<text class="font28">{{objform.service_object_age}}</text>
					</view>
					<view class="sex">
						<text>性别：</text>
						<text class="font28">
							<text v-if="objform.service_object_sex==0">
								男
							</text>
							<text v-else>
								女
							</text>
						</text>
					</view>
					<view class="guanx">
						<text>关系：</text>
						<text class="font28">{{objform.service_object_relation}}</text>
					</view>
					<view>
						<text>症状：</text>
						<text class="font28">{{objform.service_object_symptom}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 服务对象信息 -->
		<view class="peihu-yuyue-news">
			<view class="peihu-yuyue-news-age">
				<view class="peihu-yuyue-news-age-title">
					<text class="font30">陪护年龄</text>
				</view>
				<view class="peihu-yuyue-news-age-val flex1-textRight">
					<picker @change="bindPickerChange_age" :value="ageIndex" :range="agelist" range-key="age">
						<view class="uni-input">
							<text v-if="ageIndex==null" class="font28 fontColor-ccc">请选择</text>
							<text v-else class="font28">{{agelist[ageIndex].age}}</text>
							<image class="icon22" src="/static/image/icon_gd.png" alt=""></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="peihu-yuyue-news-gender">
				<view class="peihu-yuyue-news-gender-title">
					<text class="font30">陪护性别</text>
				</view>
				<view class="peihu-yuyue-news-gender-radio">
					<text class="radio1" :class="{'news-active':form.accompany_sex == 0}" @click="form.accompany_sex=0">
						男
					</text>
					<text class="radio2" :class="{'news-active':form.accompany_sex == 1}" @click="form.accompany_sex=1">
						女
					</text>
				</view>
			</view>
			<view class="peihu-yuyue-news-place">
				<view class="peihu-yuyue-news-place-title">
					<text class="font30" v-show="typelist[index].category_name=='陪护'">陪护场所</text>
					<text class="font30" v-show="typelist[index].category_name=='看病'">看病场所</text>
				</view>
				<view class="peihu-yuyue-news-place-val flex1-textRight">
					<input style="text-align: right;" v-if="typelist[index].category_name=='看病'" type="text"
						placeholder="请输入具体地址" />
					<picker v-else="typelist[index].category_name=='陪护'" @change="bindPickerChange_place"
						:value="placeIndex" :range="placelist">
						<view class="uni-input">
							<text v-if="placeIndex==null" class="font28 fontColor-ccc">请选择</text>
							<text v-else class="font28">{{placelist[placeIndex]}}</text>
							<image class="icon22" src="/static/image/icon_gd.png" alt=""></image>
						</view>
					</picker>
				</view>
			</view>
		</view>
		<!-- 上门地址 -->
		<a-upAddress :upAddressId='upAddressId'></a-upAddress>
		<!-- 上门时间 -->
		<a-upTime></a-upTime>
		<!-- 服务时间 -->
		<view class="peihu-yuyue-time">
			<view class="peihu-yuyue-time-title">
				<text class="font30" v-show="typelist[index].category_name=='陪护'">陪护时间</text>
				<text class="font30" v-show="typelist[index].category_name=='看病'">看病时间</text>
			</view>
			<view class="peihu-yuyue-time-select flex1-textRight">
				<picker @change="bindPickerChange_time" :value="timeIndex" :range="timelist" range-key="accompany_time">
					<view class="uni-input">
						<text v-if="timeIndex==null" class="font28 fontColor-ccc">请选择</text>
						<text v-else class="font28">{{timelist[timeIndex].accompany_time}}</text>
						<image class="icon22" src="/static/image/icon_gd.png" alt=""></image>
					</view>
				</picker>
			</view>
		</view>
		<!-- 优惠卷 -->
		<a-discount :type="6" :price='price'></a-discount>
		<!-- 备注 -->
		<a-remarks></a-remarks>
		<!-- 提交预约 -->
		<a-submit type='陪护看病' :form='form'></a-submit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 服务类别
				typelist: [{
					"category_name": "陪护", //预约性质
					"id": 1, //编号
				}, {
					"category_name": "看病",
					"id": 2,
				}],
				index: 0,
				// 场所
				placelist: ['室内', '室外'],
				placeIndex: null,
				// 年龄列表
				agelist: [],
				ageIndex: null,
				//时间列表
				timelist: [{
					"accompany_time": "", //陪护看病时间
					"id": 0, //编号
					"price": 0, //价格
					"type": 0 //类型(1.陪护 2.看病)
				}],
				timeIndex: null,
				// 陪护看病表单
				form: {
					"accompany_age": "", //陪护年龄
					"accompany_place": "", //陪护看病场所
					"accompany_sex": 0, //陪护性别(0.男 1.女)
					"accompany_time_id": 0, //陪护看病时间id
					"address": "", //	地址
					"categoryId": 19, //需求类别ID(19.陪诊陪护)
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
					"service_item": 1, //服务项目(1.陪护 2.看病)
					"service_object_age": 0, //服务对象-年龄
					"service_object_name": "", //服务对象-姓名
					"service_object_relation": "", //服务对象-与本人关系
					"service_object_sex": 0, //服务对象-性别(0.男 1.女)
					"service_object_symptom": "", //服务对象-症状
					"start_time": "", //上门开始时间
					"userId": 0 //发布用户ID
				},
				// 上门地址ID
				upAddressId: null,
				// 服务对象
				objform: {
					"service_object_age": null, //服务对象-年龄
					"service_object_name": "", //服务对象-名称
					"service_object_relation": "", //服务对象-与本人关系
					"service_object_sex": 0, //服务对象-性别(0.男 1.女)
					"service_object_symptom": "", //服务对象-症状
				},
				// 价格
				price: 0
			}
		},
		onLoad() {
			this.getTimeList()
			this.getAgeList()
			this.form.userId = uni.getStorageSync('userId');
		},
		onShow() {
			let that = this
			// 地址
			uni.$on('upAddressData', function(id) {
				that.upAddressId = id
			})
			// 服务对象
			uni.$on('upObjData', function(data) {
				that.objform = data
				that.form.service_object_age = data.service_object_age
				that.form.service_object_name = data.service_object_name
				that.form.service_object_relation = data.service_object_relation
				that.form.service_object_sex = data.service_object_sex
				that.form.accompany_sex = data.service_object_sex
				that.form.service_object_symptom = data.service_object_symptom
				let objage = data.service_object_age
				for (let i = 0; i < that.agelist.length; i++) {
					if (objage > that.agelist[i].age.split('-')[0] && objage < that.agelist[i].age.split('-')[1]) {
						that.ageIndex = i
						that.form.accompany_age = that.agelist[i].age
					}
				}
			})
		},
		watch: {
			timeIndex(newVal, oldVal) {
				this.price = this.timelist[newVal].price
			}
		},
		methods: {
			// 时间列表
			getTimeList() {
				this.util.ajax('personalDemand/accompanyingDoctorTime', {
					'type': this.typelist[this.index].id
				}, res => {
					this.timelist = res.data.list
				})
			},
			// 年龄列表
			getAgeList() {
				this.util.ajax('personalDemand/accompanyingDoctorAge', {
					'type': this.typelist[this.index].id
				}, res => {
					this.agelist = res.data.list
				})
			},
			// 监听服务项目
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.form.service_item = this.typelist[e.detail.value].id
			},
			// 监听陪护看病年龄
			bindPickerChange_age: function(e) {
				this.ageIndex = e.detail.value
				this.form.accompany_age = this.agelist[e.detail.value].age
			},
			// 监听陪护看病时间
			bindPickerChange_time: function(e) {
				this.timeIndex = e.detail.value
				this.form.accompany_time_id = this.timelist[e.detail.value].id
				this.form.commission = this.timelist[e.detail.value].price
			},
			// 监听陪护看病场所
			bindPickerChange_place: function(e) {
				this.placeIndex = e.detail.value
				this.form.accompany_place = this.placelist[e.detail.value]
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
					that.form.start_time = data.split('/')[0]
					that.form.end_time = data.split('/')[1]
				} else if (type == '优惠卷') {
					that.form.coupon_id = data.id
					that.form.coupon_amount = data.amount
					that.form.commission = parseInt(that.timelist[that.timeIndex].price - data.amount)
				} else if (type == '备注') {
					that.form.remark = data
				}
			},
			// 跳转路由
			subEvent() {
				uni.navigateTo({
					url: 'a_peihu_yuyue_obj',
				})
			}
		},
	}
</script>

<style lang="less">
	.peihu-yuyue-type,
	.peihu-yuyue-obj,
	.peihu-yuyue-news,
	.peihu-yuyue-time {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
	}

	.peihu-yuyue-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.peihu-yuyue-obj {
		position: relative;

		.peihu-yuyue-obj-title {
			.icon32 {
				position: absolute;
				right: 40rpx;
			}
		}

		.peihu-yuyue-obj-add {
			padding: 40rpx 0;
			text-align: center;
		}
	}

	.peihu-yuyue-news {

		.peihu-yuyue-news-age,
		.peihu-yuyue-news-gender,
		.peihu-yuyue-news-place {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.peihu-yuyue-news-age {
			padding-bottom: 30rpx;
		}

		.peihu-yuyue-news-place {
			padding-top: 30rpx;
		}

		.peihu-yuyue-news-gender {
			padding: 30rpx 0;
			border-bottom: 1px solid #E8E8E8;
			border-top: 1px solid #E8E8E8;

			.peihu-yuyue-news-gender-radio {
				.news-active {
					background-color: #F9D448;
				}
			}
		}
	}

	.peihu-yuyue-time {
		display: flex;
		justify-content: space-between;
	}
</style>
