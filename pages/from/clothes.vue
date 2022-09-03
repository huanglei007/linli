<template>
	<view class="content">
		<view class="form">
			<view class="address flexd jubetween flex-center" @click="addIndex='buyAdd';isAddress=true">
				<view class="icon">
					<image src="/static/image/icon_q.png" mode="widthFix"></image>
				</view>
				<view class="text">
					{{buyAdd.address_abbreviation?buyAdd.address_abbreviation+buyAdd.address_detail:'请选择取货地址'}}
				</view>
				<view class="more">
					<image src="/static/image/icon_gd.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<uni-forms ref='form' :rules="globalData.rules">
			<view class="form">
				<view class="itemx flexd jubetween">
					<uni-forms-item labelWidth="60" class="name" label="发布人" name="publisherName">
						<view>
							<uni-easyinput :inputBorder="false" class="input" type="text" v-model="formdata.publisherName" placeholder="请输入姓名" placeholder-style="color:#878787"/>
						</view>
					</uni-forms-item>
					<radio-group class="gender flexd jubetween">
						<label class="uni-list-cell uni-list-cell-pd flexd" @click="formdata.publisherSex=0">
							<view>
								<radio :checked="formdata.publisherSex==0"/>
							</view>
							<view>先生</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd flexd" @click="formdata.publisherSex=1">
							<view>
								<radio :checked="formdata.publisherSex==1"/>
							</view>
							<view>女士</view>
						</label>
					</radio-group>
				</view>
				<uni-forms-item class="itemx" labelWidth="60" label="手机号" name="publisherPhone">
					<uni-easyinput class="input" :inputBorder="false" type="number" v-model="formdata.publisherPhone" placeholder="请输入手机号" placeholder-style="color:#878787"/>
				</uni-forms-item>
				<view class="item flexd">
					<view class="label">旧衣类别</view>
					<picker :value="cateIndex" :range="cateList" range-key="category_name" @change="bindPickerChange">
						<view class="uni-input">{{cateList[cateIndex]?cateList[cateIndex].category_name: '1'}}</view>
					</picker>
				</view>
				<view class="item flexd flex-center">
					<view class="label">取件上门</view>
					<uni-datetime-picker type="date" :border="false" :start="start" :end="end" :clear-icon="false" v-model="formdata.startTime" @maskClick="maskClick" />
				</view>
			</view>
			<view class="form">
				<view class="item">
					<textarea class="textarea" v-model="formdata.leaveMessage" placeholder-style="color:#878787" placeholder="请输入留言"/>
				</view>
			</view>
			<view class="form">
				<view class="item">
					<view class="out">
						<block v-for="(item,index) in imageValue" :key='index'>
							<view class="peop">
								<image :src="Img(item)" mode=""></image>
								<image @click="del(index)" src="/static/image/icon_jian.png" mode="" class="del"></image>
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
		<picker-address ref='add' v-if="isAddress" @cancel="cancel()" @comfit="changeAdd"></picker-address>
	</view>
</template>

<script>
	import pickerAddress from '@/components/changeAddresss.vue'
	export default {
		components:{
			pickerAddress
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				htosp:0,
				imageurl:'',
				imageValue:[],
				isAddress: false,
				addIndex: 'buyAdd',
				buyAdd: {},
				cateList: [],
				cateIndex: 0,
				typeList: [],
				typeIndex: 0,
				start: '',
				end: '',
				formdata: {
					categoryId: 5,
					publisherName: '',
					goodsValuation: '',
					appointShop: 0,
					publisherSex: 0,
					goodsName: '',
					leaveMessage:'',
					commission: '',
					publisherPhone: '',
					startTime: currentDate,
				}
			}
		},
		onShow() {
			if(this.$refs.add){
				this.$refs.add.refresh()
			}
		},
		onLoad(option) {
			// this.imageurl = this.globalData.imageurl;
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.start=this.$shijiandate(new Date().getTime())
			this.end=this.$shijiandate(new Date().getTime()+604800000)
			let that=this
			this.util.ajax('release/oldClothesCategoryList',{},res=>{
				that.cateList=res.data.list
			})
			// this.loadmore();
		},
		methods: {
			cancel(){
				this.isAddress=false
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.cateIndex = e.target.value
			},
			maskClick(e){
				console.log('maskClick事件:', e);
			},
			change(e){
				this.address=e
				this.txt=e.data.join('-')
			},
			changeAdd(e){
				this[this.addIndex]=e
				this.isAddress=false
			},
			addImg(){
				this.util.sendimage(5-this.imageValue.length,this.imageValue)
			},
			del(index){
				this.imageValue.splice(index,1)
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
			nextStep(){
				if(!this.buyAdd.address){
					this.$alert('请选择收货地址')
					return
				}
				let that=this
				this.$refs.form.validate().then(res=>{
					uni.showLoading({
						title: ''
					})
					let obj=res
					obj.categoryId=that.formdata.categoryId
					obj.publisherSex=that.formdata.publisherSex
					obj.clothesCategoryId=that.cateList[that.cateIndex].id
					obj.leaveMessage=that.formdata.leaveMessage
					obj.images=that.imageValue.join()
					obj.addressId=that.buyAdd.id
					obj.startTime=that.formdata.startTime
					obj.userId=that.userId
					that.util.ajax('release/saveRelease',obj,resx=>{
						uni.hideLoading()
						that.$alert('发布成功')
						setTimeout(()=>{
							that.$jumpLa('/pages/user/myOrder/myOrder?type=0')
						},1000)
					})
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
		}
	}
</script>

<style lang="scss">
	.content{
		padding-bottom: 200rpx;
		.form{
			margin: 30rpx;
			background-color: #fff;
			border-radius: 10rpx;
			.item{
				padding: 20rpx 40rpx;
				.textarea{
					height: 200rpx;
					padding: 20rpx 0;
				}
				.name{
					width: 380rpx;
				}
				.label{
					width: 60px;
					color: #666;
					font-size: 28rpx;
					margin-right: 30rpx;
				}
			}
			.itemx{
				padding: 0 40rpx;
			}
			.gender{
				padding: 20rpx;
				width: 240rpx;
			}
			.address{
				padding: 20rpx 30rpx;
				image{
					width: 100%;
					height: 50rpx;
				}
				.icon{
					width: 50rpx;
					height: 50rpx;
				}
				.more{
					width: 30rpx;
				}
				.text{
					width: 500rpx;
					font-size: 28rpx;
				}
			}
		}
		.next{
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
		.out{
			display: flex;
			flex-wrap: wrap;
			.peop{
				width: 154rpx;
				height: 154rpx;
				margin-right: 12rpx;
				margin-bottom: 20rpx;
				position: relative;
				image,video{
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
				.del{
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
