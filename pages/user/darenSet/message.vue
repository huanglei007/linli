<template>
	<view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">达人名称</view>
				<input class="input" type="text" v-model="detail.talent_name"
					:placeholder="'请输入'+(userInfo.user_type==3?'店铺':'达人')+'名称'" placeholder-style="color:#878787" />
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center">
				<view class="label">达人地址</view>
				<input class="input" type="text" v-model="detail.address"
					:placeholder="'请输入'+(userInfo.user_type==3?'商家':'达人')+'地址'" placeholder-style="color:#878787" />
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
				<input class="input" type="number" v-model="detail.talent_phone" placeholder="请输入联系方式"
					placeholder-style="color:#878787" />
			</view>
		</view>

		<view class="form">
			<view class="item flexd flex-center">
				<text class="label">分类</text>
				<picker @change="bindPickerChange" :value="classIndex" :range="classArray"
					range-key="service_type_name">
					<text
						style="color: rgb(135, 135, 135);">{{classArray[classIndex]?classArray[classIndex].service_type_name:''}}</text>
				</picker>
			</view>
		</view>
		<!-- <view class="form">
			<view class="item flexd flex-center">
				<view class="label">擅长技能</view>
				<view class="uni-input" @click="openSkill">
					{{skilltext}}
				</view>
			</view>
		</view> -->
		<!-- <uni-popup ref="skill" type="bottom" background-color="#fff">
			<view class="skillTitle flexd jubetween flex-center">
				<view class="title">
					*擅长技能（可多选）
				</view>
				<button @click="$refs.skill.close()" size="mini" class="btn" type="default">完成</button>
			</view>
			<scroll-view scroll-y="true" class="skillBox">
				<view class="box flexd flex-center">
					<view class="skillitem" v-for="(item,i) in classfy" :key="item.id">
						<button @click="skillCheck(i)" size="mini" :class="item.checked?'check':''" type="default">{{item.name}}</button>
					</view>
				</view>
			</scroll-view>
		</uni-popup> -->
		<!-- <view class="form">
			<view class="item">
				<view style="font-size: 28rpx;line-height: 1.3;margin-top: 10rpx;">服务内容</view>
				<textarea class="textarea" v-model="detail.service_content" placeholder-style="color:#878787" placeholder="请输入服务内容"/>
			</view>
		</view> -->
		<!-- <view class="form">
			<view class="item">
				<view style="font-size: 28rpx;line-height: 1.3;margin-top: 10rpx;">服务流程</view>
				<textarea class="textarea" v-model="detail.service_process" placeholder-style="color:#878787" placeholder="请输入服务流程"/>
			</view>
		</view> -->
		<!-- <view class="form">
			<view class="item">
				<view style="font-size: 28rpx;line-height: 1.3;margin-top: 10rpx;">服务保障</view>
				<textarea class="textarea" v-model="detail.service_guarantee" placeholder-style="color:#878787" placeholder="请输入服务保障"/>
			</view>
		</view> -->
		<view class="foot">
			<view class="btn" @click="$shake(submit)">
				提交审核
			</view>
		</view>
	</view>
</template>

<script>
	import timePicker from '@/components/timePicker.vue'
	import pickerAddress from '@/components/wangding-pickerAddres/wangding-pickerAddress.vue'
	export default {
		components: {
			pickerAddress,
			timePicker
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			let starTime = 6
			let starTime2 = starTime + 1
			return {
				htosp: 0,
				date: currentDate,
				address: '请选择地址',
				shopTpye: [{
					service_type_name: '请选择类型',
					id: 0,
				}],
				shopIndex: 0,
				classfy: [],
				skilltext: '请选择擅长技能（可多选）',
				starTime,
				starTime2,
				subList: [],
				imageValue: [],
				userId: '',
				userInfo: {},
				detail: {
					"address": "",
					"id": 0,
					"images": "",
					"important_files": "",
					"latitude": "",
					"longitude": "",
					"operation_point_id": 0,
					"photo": "",
					"refuse_reason": "",
					"service_begin_time": "",
					"service_distance": 0,
					"service_end_time": "",
					"service_content": "",
					"service_guarantee": "",
					"service_process": "",
					"talent_name": '',
					"talent_phone": "",
					"skillIds": ''
				},
				// 分类
				classIndex: 0,
				classArray: [{
					service_type_name: '请选择分类',
					id: 0,
				}],
				// 防抖
				onoff: true
			}
		},
		mounted() {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId')
			this.userInfo = uni.getStorageSync('userInfo')
			if (this.userInfo.user_type == 4) {
				uni.setNavigationBarTitle({
					title: '达人设置'
				})
			}
			this.loadmore()
			// 服务分类
			let that = this
			this.util.ajax('talent/getTalentServiceTypes', {}, (res) => {
				that.classArray = that.classArray.concat(res.data.list)
			})
		},
		methods: {
			refreshskilltext() {
				//更新擅长技能文本
				let text = ''
				for (let i = 0; i < this.classfy.length; i++) {
					if (this.classfy[i].checked) {
						text += this.classfy[i].name + '、'
					}
				}
				console.log(text)
				this.skilltext = text || '请选择擅长技能（可多选）'
			},
			openSkill() {
				this.$refs.skill.open()
			},
			skillCheck(i) {
				if (this.classfy[i].checked) {
					this.classfy[i].checked = false
				} else {
					let index = 0
					for (let i = 0; i < this.classfy.length; i++) {
						if (this.classfy[i].checked) {
							index++
						}
					}
					if (index == 3) {
						this.$alert('最多选择3个擅长技能')
						return
					}
					this.classfy[i].checked = true
				}

				this.refreshskilltext()
				this.$forceUpdate()

			},
			loadmore() {
				let that = this
				this.util.ajax('talent/getTalentServiceTypes', {}, (res) => {
					that.shopTpye = that.shopTpye.concat(res.data.list)
				})
				this.util.ajax('talent/skillList', {
					userId: that.userId
				}, res => {
					that.classfy = res.data.list
					that.util.ajax('talent/getTalentInfo', {
						userId: that.userId
					}, (res) => {
						that.detail = res.data
						if (res.data.images) that.imageValue = res.data.images.split(',')
						if (!that.detail.service_type_id) that.detail.service_type_id = 0
						if (!that.detail.service_begin_time) that.detail.service_begin_time = '8:00'
						if (!that.detail.service_end_time) that.detail.service_end_time = '21:00'
						if (that.detail.skillIds) {
							for (let i = 0; i < that.classfy.length; i++) {
								if (that.detail.skillIds.indexOf(that.classfy[i].id) != -1) {
									that.classfy[i].checked = true
								} else {
									that.classfy[i].checked = false
								}
							}
							that.refreshskilltext()
						}
						for (let i in that.classArray) {
							if (that.classArray[i].id == res.data.service_type_id) {
								that.classIndex = i
							}
						}
					})
				})
			},
			subType(id) {
				this.detail.shop_sub_type_id = id
				this.$forceUpdate()
			},
			bindPickerChange: function(e) {
				this.shopIndex = e.target.value
			},
			bindTimeChange: function(e) {
				this.detail.service_begin_time = e
				this.updatestarTime()
			},
			updatestarTime() {
				let obj = this.detail.service_begin_time.split(':')
				this.starTime2 = parseInt(obj[0]) + 1
				if (parseInt(this.detail.service_end_time.split(':')[0]) <= this.starTime2) {
					this.detail.service_end_time = this.starTime2 + ':00'
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
			addImg(e, num) {
				if (num < 0) return
				this.util.sendimage(num, this[e])
			},
			del(e, x) {
				this[e].splice(x, 1)
			},
			addImg2() {
				let box = []
				let that = this
				this.util.sendimage(1, box, (res) => {
					console.log(box)
					that.detail.photo = box[0]
					that.$forceUpdate()
				})
			},
			submit() {
				// let arr = []
				// for (let i = 0; i < this.classfy.length; i++) {
				// 	if (this.classfy[i].checked) {
				// 		arr.push(this.classfy[i].id)
				// 	}
				// }
				// if (arr.length == 0) {
				// 	this.$alert('请选择擅长技能')
				// 	return
				// }
				// this.detail.skillIds = arr.join()
				if (this.classIndex == 0) {
					this.$alert('请选择服务分类')
					return
				}
				this.detail.skillIds = this.classArray[this.classIndex].id
				this.detail.images = this.imageValue.join()
				this.detail.userId = this.userId

				let that = this
				this.util.ajax('talent/saveTalentSet', this.detail, (res) => {
					that.$alert(res.msg)

					this.loadmore()
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: 0, //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
					})
				})
			},
			// 监听服务分类
			bindPickerChange(e) {
				let that = this
				that.classIndex = e.detail.value
				that.detail.service_type_id = that.classArray[that.classIndex].id
			}
		}
	}
</script>

<style lang="scss">
	.picBox {
		margin: 30rpx 0;

		.title {
			margin-bottom: 20rpx;
			font-size: 28rpx;
		}

		.item {
			width: 45%;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 10rpx 40rpx;
			box-sizing: border-box;

			.uni-input {
				text-align: center;
				line-height: 2;
				font-size: 28rpx;
			}
		}
	}

	.skillBox {
		padding: 30rpx;
		background-color: #fff;
		height: 300rpx;

		.box {
			flex-wrap: wrap;

			.skillitem {
				margin: 0 10rpx;

				.check {
					background-color: $uni-color-primary;
				}
			}
		}
	}

	.skillTitle {
		padding: 20rpx 30rpx 0;
		background-color: #fff;

		.title {
			font-size: 28rpx;
		}

		.btn {
			background-color: $uni-color-primary;
		}
	}

	.form {
		margin: 30rpx 0;
		background-color: #fff;
		border-radius: 10rpx;

		.list {
			padding: 0 30rpx;
			flex-wrap: wrap;

			.pic {
				margin: 10rpx 0;
				width: 23%;
				line-height: 2.6;
				border: 1rpx solid #E5E5E5;
				border-radius: 10rpx;
				text-align: center;

				&.active {
					border-color: #FF3336;
					border-style: dotted;
					color: #FF3336;

				}
			}
		}

		.item {
			padding: 10rpx 40rpx;
			border-bottom: 1rpx solid #f5f5f5;
			line-height: 80rpx;
			width: 100%;
			box-sizing: border-box;
			position: relative;

			.right {
				position: absolute;
				right: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 24rpx;
			}

			.label {
				margin-right: 20rpx;
			}

			&:last-child {
				border-bottom: 1rpx solid #fff;
			}

			view {
				font-size: 28rpx;
			}

			.input {
				width: 400rpx;
			}

			.textarea {
				height: 200rpx;
				padding: 20rpx 0;
			}

			.text {
				image {
					width: 36rpx;
					margin-left: 20rpx;
				}
			}

			&.name {
				input {
					width: 200rpx;
				}
			}

		}

		.time {
			padding: 10rpx 40rpx;

			.timeItem {
				padding: 20rpx;
				width: 230rpx;
				background-color: #f6f6f6;
				text-align: center;
				position: relative;

				&::before {
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

				.uni-input {
					color: #888;
					line-height: 2;
				}
			}
		}

		.address {
			padding: 20rpx 30rpx;

			image {
				width: 100%;
				margin-top: 10rpx;
			}

			.icon {
				width: 50rpx;
			}

			.more {
				width: 30rpx;
			}

			.text {
				width: 500rpx;
				font-size: 28rpx;
			}
		}

		.gender {
			padding: 0 20rpx;
			width: 240rpx;

			view {
				margin: 0;
			}
		}
	}

	.foot {
		width: 70%;
		margin: 30rpx auto;

		.btn {
			background-color: $uni-color-primary;
			line-height: 2.8;
			text-align: center;
			border-radius: 50rpx;
			font-size: 32rpx;
		}
	}
</style>
