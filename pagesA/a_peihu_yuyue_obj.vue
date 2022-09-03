<template>
	<view class="obj yuyue-box">
		<!-- 与本人关系 -->
		<view class="obj-relation">
			<view class="obj-relation-title">
				<text class="font30">与本人关系</text>
			</view>
			<view class="obj-relation-select flex1-textRight">
				<picker @change="bindPickerChange" :value="index" :range="relationlist" range-key="relation">
					<view class="uni-input">
						<text v-if="index==null" class="font28 fontColor-ccc">请选择</text>
						<text v-else class="font28">
							<text>{{relationlist[index].relation}}</text>
						</text>
						<image class="icon22" src="/static/image/icon_gd.png" mode=""></image>
					</view>
				</picker>
			</view>
		</view>
		<!-- 名字 -->
		<view class="obj-name">
			<view class="obj-name-title">
				<text class="font30">姓名</text>
			</view>
			<view class="obj-name-input flex1-textRight">
				<input v-model="form.service_object_name" style="text-align: right;" type="text" placeholder="请输入姓名" />
			</view>
		</view>
		<!-- 性别 -->
		<view class="obj-gender">
			<view class="obj-gender-title">
				<text class="font30">性别</text>
			</view>
			<view class="obj-gender-radio">
				<text class="radio1" :class="{'news-active':form.service_object_sex == 0}"
					@click="form.service_object_sex=0">
					男
				</text>
				<text class="radio2" :class="{'news-active':form.service_object_sex == 1}"
					@click="form.service_object_sex=1">
					女
				</text>
			</view>
		</view>
		<!-- 年龄 -->
		<view class="obj-age">
			<view class="obj-age-title">
				<text class="font30">年龄</text>
			</view>
			<view class="obj-age-input flex1-textRight">
				<input v-model="form.service_object_age" style="text-align: right;" type="number" placeholder="请输入年龄" />
			</view>
		</view>
		<!-- 症状 -->
		<view class="obj-symptom">
			<view class="obj-symptom-title">
				<text class="font30">症状</text>
			</view>
			<view class="obj-symptom-textarea">
				<textarea v-model="form.service_object_symptom" placeholder-style="color:#CCCCCC"
					placeholder="补充描述症状" />
			</view>
		</view>

		<view class="sub">
			<view class="sub-btn" @click="subEvent">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//关系列表
				relationlist: [{
					"id": 0, //编号
					"relation": "" //关系
				}],
				index: null,
				//服务对象表单
				form: {
					"service_object_age": null, //服务对象-年龄
					"service_object_name": "", //服务对象-名称
					"service_object_relation": "", //服务对象-与本人关系
					"service_object_sex": 0, //服务对象-性别(0.男 1.女)
					"service_object_symptom": "", //服务对象-症状
				}
			}
		},
		onLoad() {
			this.getrelationlist()
		},
		methods: {
			// 获取关系列表
			getrelationlist(type) {
				let that = this
				that.util.ajax('personalDemand/accompanyingDoctorRelation', {
					"type": 1
				}, res => {
					that.relationlist = res.data.list
					// 判断是更改还是添加
					this.getUpPageData()
				})
			},
			// 监听关系选择
			bindPickerChange(e) {
				let that = this
				that.index = e.detail.value
				that.form.service_object_relation = that.relationlist[e.detail.value].relation
			},
			// 提交
			subEvent() {
				let that = this
				if (that.form.service_object_relation == '') {
					that.$alert('关系不能为空')
				} else if (that.form.service_object_name == '') {
					that.$alert('姓名不能为空')
				} else if (that.form.service_object_age == null) {
					that.$alert('年龄不能为空')
				} else if (that.form.service_object_symptom == '') {
					that.$alert('症状不能为空')
				} else {
					uni.$emit('upObjData', this.form)
					uni.navigateBack({
						delta: 1
					})
				}
			},
			// 判断是更改还是添加
			getUpPageData() {
				let that = this
				var pages = getCurrentPages();
				for (let i = 0; i < pages.length; i++) {
					if (pages[i].$vm._data.objform) {
						if (pages[i].$vm._data.objform.service_object_nam != '') {
							that.form = pages[i].$vm._data.objform
							for (let a = 0; a < that.relationlist.length; a++) {
								if (that.relationlist[a].relation == pages[i].$vm._data.objform.service_object_relation) {
									that.index = a
								}
							}
						}
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.obj-relation,
	.obj-name,
	.obj-gender,
	.obj-age {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.obj-gender {
		.obj-gender-radio {
			.news-active {
				background-color: #F9D448;
			}
		}
	}

	.obj-symptom {
		padding: 30rpx 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;

		.obj-symptom-title {
			margin-bottom: 20rpx;

		}
	}

	.sub {
		width: 100vw;
		line-height: 91rpx;
		text-align: center;
		background-color: #fff;
		border-top: 1px solid #D4D4D4;
		position: fixed;
		bottom: 0;
		left: 0;
		box-shadow: 0px 6rpx 30rpx #888888;

		.sub-btn {
			margin: 18rpx 100rpx;
			background: linear-gradient(180deg, #FDEC7E 0%, #F9D448 100%);
			border-radius: 100rpx;
		}
	}
</style>
