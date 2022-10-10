<template>
	<view class="content">
		<uni-forms ref='form' :rules="globalData.rules">
			<view class="form">
				<view class="item flexd flex-center">
					<view class="label">地址</view>
					<view class="text" @click="addIndex='buyAdd';isAddress=true">
						{{buyAdd.address_abbreviation?buyAdd.address_abbreviation+buyAdd.address_detail:'请选择取件地址'}}
					</view>
				</view>
			</view>
			<view class="form">
				<uni-forms-item class="itemx" labelWidth="60" label="书名" name="bookName">
					<uni-easyinput class="input" :inputBorder="false" type="text" v-model="formdata.bookName"
						placeholder="请输入书名" placeholder-style="color:#878787" />
				</uni-forms-item>
				<uni-forms-item class="itemx" labelWidth="60" label="价格" name="sellingPrice">
					<uni-easyinput class="input" :inputBorder="false" type="digit" v-model="formdata.sellingPrice"
						placeholder="请输入出售价格" placeholder-style="color:#878787" />
				</uni-forms-item>
				<view class="item">
					<view class="flexd">
						<view class="label">交易方式</view>
						<picker :value="cateIndex" :range="cateList" range-key="name" @change="bindPickerChange">
							<view class="uni-input">{{cateList[cateIndex]?cateList[cateIndex].name: '1'}}</view>
						</picker>
					</view>
					<view class="reda" v-if="cateList.length&&cateList[cateIndex].id==1">快递送达默认货到付款</view>
				</view>
				<view class="item" v-if="cateList.length&&cateList[cateIndex].id==2">
					<view class="flexd">
						<view class="label">运营点</view>
						<picker :value="shopIndex" :range="shopList" range-key="operation_point_name"
							@change="bindPickerChange2">
							<view class="uni-input">
								{{shopList[shopIndex]?shopList[shopIndex].operation_point_name: '1'}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="reda" style="margin: 0 30rpx;">
				注：出售旧书不得影响阅读
			</view>
			<view class="form">
				<view class="item">
					<view style="font-size: 24rpx;margin-bottom: 10rpx;">请上传书籍照片</view>
					<view class="out">
						<block v-for="(item,index) in imageValue" :key='index'>
							<view class="peop">
								<image :src="Img(item)" mode=""></image>
								<image @click="del(index)" src="/static/image/icon_jian.png" mode="" class="del icon32">
								</image>
							</view>
						</block>
						<view class="peop" @click="addImg()">
							<image src="/static/image/icon_tj.png" mode="" style="border-radius: 0;"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="next" @click="nextStep">
				确认发布
			</view>
		</uni-forms>
		<picker-address ref='add' v-if="isAddress" @cancel="cancel" @comfit="changeAdd"></picker-address>
	</view>
</template>

<script>
	import pickerAddress from '@/components/changeAddresss.vue'
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				htosp: 0,
				userId: '',
				imageurl: '',
				imageValue: [],
				buyAdd: {},
				isAddress: false,
				addIndex: 'buyAdd',
				cateList: [{
					name: '请选择交易方式',
					id: 0
				}],
				cateIndex: 0,
				shopList: [{
					operation_point_name: '请选择运营点',
					id: 0
				}],
				shopIndex: 0,
				formdata: {
					categoryId: 6,
					publisherName: '',
					publisherSex: 0,
					leaveMessage: '',
					publisherPhone: '',
					sellingPrice: '',
					commission: '',
					goodsSize: '',
					goodsWeight: '',
					specialDelivery: 0,
				}
			}
		},
		onShow() {
			if (this.$refs.add) {
				this.$refs.add.refresh()
			}
		},
		onLoad(option) {
			// this.imageurl = this.globalData.imageurl;
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			let that = this
			this.util.ajax('common/transactionModeList', {}, res => {
				that.cateList = that.cateList.concat(res.data.list)
			})
			this.util.ajax('common/operationPointList', {}, res => {
				that.shopList = that.shopList.concat(res.data.list)
			})
			// this.loadmore();
		},
		methods: {
			cancel() {
				this.isAddress = false
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.cateIndex = e.target.value
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.shopIndex = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			changeAdd(e) {
				this[this.addIndex] = e
				this.isAddress = false
			},
			addImg() {
				this.util.sendimage(5 - this.imageValue.length, this.imageValue)
			},
			del(index) {
				this.imageValue.splice(index, 1)
			},
			nextStep() {
				if (!this.buyAdd.address) {
					this.$alert('请选择取件地址')
					return
				}
				if (this.cateIndex == 0) {
					this.$alert('请选择交易方式')
					return
				}
				if (this.cateList.length && this.cateList[this.cateIndex].id == 2 && this.shopIndex == 0) {
					this.$alert('请选择运营点')
					return
				}

				let that = this
				this.$refs.form.validate().then(res => {
					uni.showLoading({
						title: ''
					})
					let obj = res
					obj.publisherName = that.buyAdd.name
					obj.publisherPhone = that.buyAdd.phone
					obj.categoryId = that.formdata.categoryId
					obj.publisherSex = that.formdata.publisherSex
					obj.leaveMessage = that.formdata.leaveMessage
					obj.transactionModeId = that.cateList[that.cateIndex].id
					obj.js_operation_point_id = that.shopList[that.shopIndex].id
					obj.images = that.imageValue.join()
					obj.addressId = that.buyAdd.id
					obj.userId = that.userId
					that.util.ajax('release/saveRelease', obj, resx => {
						uni.hideLoading()
						that.$alert('发布成功')
						setTimeout(() => {
							that.$jumpLa('/pages/user/myOrder/myOrder?type=0')
						}, 1000)
					})
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 200rpx;

		.form {
			margin: 30rpx;
			background-color: #fff;
			border-radius: 10rpx;

			.item {
				padding: 20rpx 40rpx;

				.textarea {
					height: 200rpx;
					padding: 20rpx 0;
				}

				.name {
					width: 380rpx;
				}

				.label {
					width: 60px;
					font-size: 28rpx;
				}

				.text {
					color: #808080;
					padding-left: 20rpx;
				}

				.uni-input {
					color: #808080;
					padding-left: 20rpx;
				}
			}

			.itemx {
				padding: 0 40rpx;
			}
		}

		.next {
			position: fixed;
			bottom: 40rpx;
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			background-image: $uni-bg-color;
			font-size: 32rpx;
			padding: 30rpx 0;
			text-align: center;
			border-radius: 60rpx;
		}

		.out {
			display: flex;
			flex-wrap: wrap;

			.peop {
				width: 154rpx;
				height: 154rpx;
				margin-right: 12rpx;
				margin-bottom: 20rpx;
				position: relative;

				image,
				video {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}

				.del {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					top: 2rpx;
					right: 2rpx;
				}
			}
		}
	}
</style>
