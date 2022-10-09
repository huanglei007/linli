<template>
	<view class="shop">
		<view class="shop-news">
			<text class="font24">店铺信息</text>
			<view class="news-box">
				<view class="box1 view-diy">
					<!-- 店铺名称 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">店铺名称</text>
						</view>
						<view class="relive-icon">
							<input placeholder-style="color:#CCCCCC" v-model="form.shop_name" placeholder="请填写店铺名称" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 商家类型 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">商家类型</text>
						</view>
						<view class="relive-icon">
							<picker mode="selector" @change="shopTypeChange" :value="typeIndex" :range="shopType"
								range-key="name">
								<text class="fontColor-666">{{shopType[typeIndex].name}}</text>
							</picker>
							<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 店铺头像 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">店铺头像</text>
						</view>
						<view class="relive-icon" @click="updateImg('logo')">
							<image class="icon60" :src="form.shop_logo?form.shop_logo:Img(imageValue_logo[0])" mode="">
							</image>
							<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="box2 view-diy">
					<!-- 营业状态 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">营业状态</text>
						</view>
						<view class="relive-icon">
							<picker mode="selector" @change="shopStatusChange" :value="form.business_status"
								:range="shopStatus" range-key="label">
								<view class="status" v-if="shopStatus[form.business_status]">
									<view class="status-switch">
										<text class="switch" :class="form.business_status==0?'shut':'open'"></text>
										<text class="text">{{shopStatus[form.business_status].label}}</text>
									</view>
								</view>
							</picker>
							<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 商家地址 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">商家地址</text>
						</view>
						<view class="relive-icon">
							<input placeholder-style="color:#CCCCCC" v-model="form.address" placeholder="请填写商家地址" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 营业时间 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">营业时间</text>
						</view>
						<view class="relive-icon" @click="hoursShow=true">
							<text
								class="font26 fontColor-666">{{form.service_begin_time}}-{{form.service_end_time}}</text>
							<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 起送费 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">起送费</text>
						</view>
						<view class="relive-icon">
							<input v-model="form.initial_delivery_fee" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 额外配送费 ( 起送费不足时 ) -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">配送费</text>
						</view>
						<view class="relive-icon">
							<input v-model="form.delivery_fee" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="box3 view-diy">
					<!-- 运营点 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">运营点</text>
						</view>
						<view class="relive-icon" v-if="operation[operationIndex]">
							<picker :value="operationIndex" :range="operation" range-key="operation_point_name"
								@change="operationChange">
								<view class="fontColor-666"
									:class="{'fontColor-ccc':!operation[operationIndex].operation_point_name}">
									{{operation[operationIndex]?operation[operationIndex].operation_point_name:'请填写运营点'}}
								</view>
							</picker>
							<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 联系人 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">联系人</text>
						</view>
						<view class="relive-icon">
							<input placeholder-style="color:#CCCCCC" v-model="form.contact_name" placeholder="请填写联系人" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 联系方式 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">联系方式</text>
						</view>
						<view class="relive-icon">
							<view @click="phoneClick(true)" v-if="!phoneInput" style="flex:1;color:#666666">{{form.contact_phone}}</view>
							<input v-if="phoneInput" class="input" :focus="phoneInput_focus" type="number" step='1'
								placeholder="请输入联系方式" placeholder-style="color:#CCCCCC;" maxlength="11"
								@input="inputchange($event, 'contact_phone')" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="box4 view-diy">
					<!-- 服务内容 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">服务内容</text>
						</view>
						<view class="relive-icon">
							<input placeholder-style="color:#CCCCCC" v-model="form.service_content"
								placeholder="请填写服务内容" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 服务流程 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">服务流程</text>
						</view>
						<view class="relive-icon">
							<input placeholder-style="color:#CCCCCC" v-model="form.service_process"
								placeholder="请填写服务流程" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
					<view class="fengexian"></view>
					<!-- 服务保障 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">服务保障</text>
						</view>
						<view class="relive-icon">
							<input placeholder-style="color:#CCCCCC" v-model="form.service_guarantee"
								placeholder="请填写服务保障" />
							<image class="icon32" src="/static/image/icon_update.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="box5 view-diy">
					<!-- 押金 -->
					<view class="flex-center">
						<view class="relive-title">
							<text class="font28">押金</text>
							<text v-if="form.deposit_amount>0" class="font22" style="color:#2979ff;"
								@click="returnDeposit">{{' '}}(申请退还)</text>
						</view>
						<radio-group class="flexd" @change="radioChange" style="transform:scale(0.9)">
							<label class="flexd flex-center" style="padding-left: 30rpx;"
								v-for="(item, index) in deposit_arr" :key="item.value"
								v-if="form.deposit_amount==0||item.value == '1'&&form.deposit_amount>0">
								<view>
									<radio :value="item.value" :checked="item.value == deposit_index" />
								</view>
								<view>{{item.text}}</view>
							</label>
						</radio-group>
					</view>
					<block v-if="deposit_index=='1'">
						<view class="fengexian"></view>
						<!-- 押金金额 -->
						<view class="flex-center">
							<view class="relive-title">
								<text class="font28">押金金额</text>
							</view>
							<view class="relive-icon" v-if="deposit_array[deposit_array_index]">
								<picker @change="depositChange" :value="deposit_array_index" :range="deposit_array"
									range-key="amount">
									<view class="fontColor-666 uni-input">{{deposit_array[deposit_array_index].amount}}
									</view>
								</picker>
								<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
							</view>

						</view>
					</block>
				</view>
			</view>
			<view class="box6 view-diy">
				<!-- 营业资质 -->
				<view class="flex-center">
					<view class="relive-title">
						<text class="font28">营业资质</text>
					</view>
					<view class="relive-icon" @click="doBusiness">
						<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
					</view>
				</view>
				<view>
					<view class="peop" v-if="form.business_license!=''">
						<image class="icon60"
							:src="form.business_license?Img(form.business_license):Img(imageValue_license[0])" mode="">
							<image @click="delImg" src="/static/image/icon_jian.png" mode="" class="del icon32">
					</view>
					<view v-if="!form.business_license" class="peop" @click="updateImg('license')">
						<image src="/static/image/icon_tj.png" mode="" style="border-radius: 0;"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 设置 -->
		<view class="shop-setting">
			<text class="font24">设置</text>
			<view class="setting-relive flex-center view-diy" @click="relieve">
				<view class="relive-title">
					<text class="font28">申请解除合作</text>
				</view>
				<view class="relive-icon">
					<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
				</view>
			</view>
		</view>


		<!-- 营业时间弹窗 -->
		<view class="pickerBox" v-if="hoursShow">
			<view class="black" @click="hoursShow=false"></view>

			<view class="pickerDate">
				<view class="handelBox">
					<view class="_cancel">
						<text class="font36" @click="hoursShow=false">取消</text>
					</view>
					<view class="_confirm">
						<text class="font36" style="color:cornflowerblue" @click="confirmEvent">确认</text>
					</view>
				</view>
				<view class="content">
					<picker-view :value="timeVal_start" @change="bindChange_start" class="picker-view"
						style="height:600rpx;flex: 1;">
						<picker-view-column>
							<view class="item" v-for="(item,index) in 24" :key="index">
								<text>{{index<10?'0'+index:index}}时</text>
							</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item,index) in 60" :key="index">
								{{index<10?'0'+index:index}}分
							</view>
						</picker-view-column>
					</picker-view>
					<view class="">
						<text>至</text>
					</view>
					<picker-view :value="timeVal_end" @change="bindChange_end" class="picker-view"
						style="height:600rpx;flex: 1;">
						<picker-view-column>
							<view class="item" v-for="(item,index) in 24" :key="index">
								{{index<10?'0'+index:index}}时
							</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item,index) in 60" :key="index">
								{{index<10?'0'+index:index}}分
							</view>
						</picker-view-column>
					</picker-view>

				</view>
			</view>

		</view>

		<!-- 保存 -->
		<view class="saveBox" v-show="!hoursShow">
			<text @click="$shake(saveEvent)">提交审核</text>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				imageurl: "",
				userId: '',
				// 我的店铺信息
				form: {},
				imageValue_logo: [],
				imageValue_license: [],
				// 店铺类型
				shopType: [{
					"icon": "", //图标
					"id": 0, //编号
					"name": "", //商户类型名称
					"parentId": 0 //父级id
				}],
				typeIndex: 0,
				// 店铺状态
				shopStatus: [{
						label: '休息',
						business_status: 0
					},
					{
						label: '营业',
						business_status: 1
					}
				],
				// 营业时间
				hoursShow: false,
				businessHours: ['开始时间', '结束时间'],
				timeVal_start: [9, 0],
				timeVal_end: [15, 0],
				// 运营点
				operation: [],
				operationIndex: 0,
				// 押金
				deposit_index: 0,
				deposit_arr: [{
					text: '不交押金',
					value: '0'
				}, {
					text: '交押金',
					value: '1'
				}],
				deposit_array_index: 0,
				deposit_array: [],
				// 防抖
				onoff: true,
				// 是否审核
				examine: true,
				examine_s: null,
				// 手机号输入框
				phoneInput: false, //false=>DIV  true=>手机框
				phoneInput_focus: false, //手机框焦点
			}
		},
		onLoad() {
			this.getTypeList()
			this.getOperation()
			this.userId = uni.getStorageSync('userId')
			this.imageurl = this.globalData.imageurl
		},
		computed: {
			newAddRuleForm() {
				return JSON.parse(JSON.stringify(this.form));
			},
		},
		watch: {
			imageValue(newVal, oldVal) {
				this.form.shop_logo = this.Img(newVal[0])
			},
			imageValue_license(newVal, oldVal) {
				if (newVal[0]) {
					this.form.business_license = this.Img(newVal[0])
				} else {
					this.form.business_license = ''
				}
			},
			form: {
				handler(newVal, oldVal) {},
				deep: true
			},
			newAddRuleForm: {
				handler(newVal, oldVal) {
					let that = this
					if (oldVal.id != undefined) {
						if (newVal.business_status != oldVal.business_status ||
							newVal.service_begin_time != oldVal.service_begin_time ||
							newVal.service_end_time != oldVal.service_end_time ||
							newVal.initial_delivery_fee != oldVal.initial_delivery_fee ||
							newVal.delivery_fee != oldVal.delivery_fee ||
							newVal.service_content != oldVal.service_content ||
							newVal.service_process != oldVal.service_process ||
							newVal.service_guarantee != oldVal.service_guarantee) {
							that.examine = false
						} else {
							that.examine = true
							that.examine_s = true
						}
					}
				},
				deep: true,
			},
		},
		methods: {
			// 获取商铺类型
			getTypeList() {
				let that = this
				this.util.ajax('shop/getShopTypeList', {
					"parentId": 0,
					"secondType": 1
				}, res => {
					that.shopType = res.data.list
					that.getMyShop()
				})
			},
			// 获取我的店铺信息
			getMyShop() {
				let that = this
				this.util.ajax('shop/getShopInfo', {
					"userId": that.userId
				}, res => {
					that.form = res.data
					let delivery = res.data.initial_delivery_fee
					if (!delivery || delivery == 0) {
						that.form.initial_delivery_fee = 20
					}
					that.timeVal_start = res.data.service_begin_time.split(':').map(i => i / 1)
					that.timeVal_end = res.data.service_end_time.split(':').map(i => i / 1)
					if (res.data.deposit_amount > 0) {
						that.deposit_index = '1'
						this.util.ajax('shop/queryShopDepositSet', {}, res => {
							that.deposit_array = res.data.list
							for (let i = 0; i < res.data.list.length; i++) {
								if (that.form.deposit_amount == res.data.list[i].amount) {
									that.deposit_array_index = i
								}
							}
						})
					}
					for (let a = 0; a < that.shopType.length; a++) {
						if (res.data.shop_sub_type_id == that.shopType[a].id) {
							that.typeIndex = a
						}
					}
					for (let i in that.operation) {
						if (that.operation[i].id == res.data.operation_point_id) {
							that.operationIndex = i
						}
					}
				})
			},
			// 保存我的店铺信息
			saveEvent() {
				let that = this
				if (that.examine == false && that.examine_s != true) {
					this.notExamine()
					this.$alert('审核成功')
					setTimeout(() => {
						that.$jumpback()
					}, 1000)
				} else {
					this.util.ajax('shop/saveShopSet', that.form, res => {
						if (res.statusCode != 500) {
							if (that.examine == false) {
								this.notExamine()
							}
							if (that.deposit_index == '1' && that.form.deposit_amount == 0) {
								this.util.ajax('shop/submitShopDepositOrder', {
									"amount": that.deposit_array[that.deposit_array_index].amount,
									"userId": that.userId,
								}, res => {
									// #ifdef APP-PLUS
									let paymentType = 3
									// #endif
									// #ifdef MP-WEIXIN
									let paymentType = 4
									// #endif
									that.util.ajax('pay/toPay', {
										"orderNum": res.data.order_num,
										"payType": 1,
										"paymentType": paymentType,
										"purpose": 5,
										"subject": "押金",
										"userId": that.userId
									}, resx => {
										uni.hideLoading()
										// #ifdef APP-PLUS
										let response = JSON.parse(resx.data)
										// #endif
										uni.requestPayment({
											"provider": "wxpay",
											// #ifdef APP-PLUS
											"orderInfo": {
												"appid": response
													.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
												"noncestr": response.noncestr, // 随机字符串
												"package": response.package, // 固定值
												"partnerid": response.partnerid, // 微信支付商户号
												"prepayid": response.prepayid, // 统一下单订单号 
												"timestamp": response
													.timestamp, // 时间戳（单位：秒）
												"sign": response.sign // 签名，这里用的 MD5 签名
											},
											// #endif
											// #ifdef MP-WEIXIN
											"timeStamp": resx.data.timeStamp,
											"nonceStr": resx.data.nonceStr,
											"package": resx.data.packageValue,
											"signType": 'MD5',
											"paySign": resx.data.paySign,
											// #endif
											success(e) {
												that.$alert('提交成功')
												setTimeout(() => {
													that.$jumpback()
												}, 1000)
											},
											fail(e) {
												that.$alert('支付失败')
											}
										})
									})
								})
							} else {
								this.$alert('提交成功,请等待审核')
								setTimeout(() => {
									that.$jumpback()
								}, 1000)
							}
						} else {
							return
						}
					})
				}
			},
			// 获取营业点列表
			getOperation() {
				let that = this
				this.util.ajax('common/operationPointList', {}, res => {
					that.operation = res.data.list
				})
			},
			// 监听商家类型变换
			shopTypeChange(e) {
				let that = this
				that.typeIndex = e.detail.value
				that.form.shop_sub_type_id = that.shopType[e.detail.value].id
			},
			// 监听营业点变换
			operationChange(e) {
				let that = this
				that.operationIndex = e.detail.value
				that.form.operation_point_id = that.operation[that.operationIndex].id
			},
			// 输入框监听
			inputchange(e, flag) {
				let that = this
				if (flag == 'contact_phone') {
					that.form.contact_phone = e.target.value
				}
			},
			phoneClick(val) { // false=>DIV  true=>输入框
				let that = this
				that.phoneInput = val
				that.phoneInput_focus = val
			},
			// 监听是否交押金
			radioChange(e) {
				let that = this;
				that.deposit_index = e.detail.value
				if (e.detail.value == '1') {
					this.util.ajax('shop/queryShopDepositSet', {}, res => {
						that.deposit_array = res.data.list
					})
				}
			},
			// 监听押金金额
			depositChange(e) {
				this.deposit_array_index = e.detail.value
			},
			// 退还押金
			returnDeposit() {
				let that = this
				uni.showModal({
					title: '',
					content: '确认退还押金吗?',
					success: function(res) {
						if (res.confirm) {
							that.util.ajax('shop/submitShopDepositRefund', {
								'amount': that.form.deposit_amount,
								"userId": that.form.user_id
							}, res => {
								that.$alert('已提交申请，请等待审核')
								// that.deposit_index = '0' //不交押金
								// that.deposit_array_index = 0 //初始化押金金额
								// that.form.deposit_amount = 0 //初始化店铺押金金额
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 监听不需要审核的数据保存
			notExamine() {
				let that = this
				// 营业时间
				// this.confirmEvent(true)

				this.util.ajax('shop/editShopStatus', {
					"business_status": that.form.business_status + 1, // 营业状态
					"initial_delivery_fee": that.form.initial_delivery_fee, // 起送费
					"delivery_fee": that.form.delivery_fee, // 配送费
					"service_content": that.form.service_content, // 服务内容
					"service_process": that.form.service_process, // 服务流程
					"service_guarantee": that.form.service_guarantee, // 服务保障
					"service_begin_time": that.form.service_begin_time,
					"service_end_time": that.form.service_end_time,
					"user_id": that.userId
				}, res => {})
			},
			// 监听营业状态变换
			shopStatusChange(e) {
				let that = this
				that.form.business_status = that.shopStatus[e.detail.value].business_status
			},
			// 营业时间
			// 开始 结束时间监听
			bindChange_start(e) {
				let that = this
				that.timeVal_start = e.detail.value
			},
			bindChange_end(e) {
				let that = this
				that.timeVal_end = e.detail.value
			},
			// 确认
			confirmEvent(val) {
				let that = this

				let start = this.timeVal_start;
				let start_h = start[0] < 10 ? '0' + start[0] : String(start[0]);
				let start_s = start[1] < 10 ? '0' + start[1] : String(start[1]);

				let end = this.timeVal_end;
				let end_h = end[0] < 10 ? '0' + end[0] : String(end[0]);
				let end_s = end[1] < 10 ? '0' + end[1] : String(end[1]);

				that.form.service_begin_time = start_h + ':' + start_s
				that.form.service_end_time = end_h + ':' + end_s

				that.hoursShow = false
			},
			// 上传 -店铺头像 -营业资质
			updateImg(val) {
				if (val == 'logo') {
					this.util.sendimage(5 - this.imageValue_logo.length, this.imageValue_logo)
				} else if (val == 'license') {
					this.util.sendimage(5 - this.imageValue_license.length, this.imageValue_license)
				}
			},
			delImg(index) {
				this.form.business_license = ''
				if (this.imageValue_license[0]) {
					this.imageValue_license.splice(0, 1)
				}
			},
			// 营业资质
			doBusiness() {
				let that = this
				let licens = this.form.business_license
				let img = []
				img.push(that.imageurl + licens)
				uni.previewImage({
					current: img[0],
					urls: img,
				});
			},
			// 解除合作
			relieve() {
				uni.showModal({
					title: '提示',
					content: '确定解除合作吗',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.$alert('请于运营点联系解除合作事宜！')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.flex-center {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.relive-title {
			position: relative;
		}
	}

	.fengexian {
		height: 1px;
		background: #E8E8E8;
		margin: 20rpx 0;
	}

	.shop-setting {
		padding-bottom: 100rpx;
	}

	.relive-icon {
		flex: 1;
		text-align: right;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: relative;


		.timeSlot,
		.uni-datetime-picker {
			position: absolute;
		}

		.icon32 {
			margin-left: 5rpx;
		}

		uni-picker {
			flex: 1;
			text-align: right;
		}

		/* #ifdef MP-WEIXIN */
		picker {
			flex: 1;
			text-align: right;
		}

		/* #endif */

		input {
			width: 400rpx;
			color: #666666;
			font-size: 26rpx;
			text-align: right;
		}
	}

	.shop {
		padding: 25rpx;

		.setting-relive,
		.news-box {
			margin-top: 20rpx;
		}
	}

	.status {
		display: flex;
		justify-content: flex-end;

		text {
			font-size: 26rpx;
		}

		.status-switch {
			width: fit-content;
			padding: 8rpx 19rpx;
			border-radius: 25rpx;
			background-color: #F6F6F6;
			display: flex;
			align-items: center;
			text-align: center;

			.switch {
				padding: 8rpx;
				border-radius: 8rpx;
			}

			.shut {
				background-color: red;
			}

			.open {
				background-color: #6ED500;
			}

			.text {
				color: #666666;
				margin-left: 15rpx;
			}
		}
	}

	.pickerBox {
		.black {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.pickerDate {
			width: 100%;
			background-color: #fff;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;

			.handelBox {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 30rpx;
			}

			.content {
				display: flex;
				align-items: center;
				padding-bottom: 0;

				.item {
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
				}
			}
		}
	}

	.saveBox {
		width: 100%;
		padding: 30rpx 0 40rpx 0;
		background-color: #fff;
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 0;
		box-shadow: 0px 6rpx 30rpx #888888;
		z-index: 2;

		text {
			font-size: 36rpx;
			padding: 10rpx 80rpx;
			background: linear-gradient(180deg, #FDEC7E 0%, #F9D448 100%);
			border-radius: 7px;
		}
	}

	.peop {
		width: 154rpx;
		height: 154rpx;
		margin: 20rpx 0;
		margin-right: 12rpx;
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
</style>
