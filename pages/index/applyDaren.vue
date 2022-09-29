<template>
	<view class="content">
		<view class="head">
			<view class="homeBg">
				<image :src="imageurl+'static/image/top.png'" mode="widthFix"></image>
			</view>
			<view class="backs" @click="$jumpback()" :style="{top: htosp+'px'}">
				<image src="/static/image/icon_fh.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="order">
			<view class="bgBox">
				<view class="input">
					<input type="text" v-model="formdata.talentName" placeholder="请输入达人名称" placeholder-style="color: #8b8b8b;font-size: 30rpx;" />
				</view>
				<view class="input">
					<input type="text" v-model="formdata.talentPhone" placeholder="请输入联系方式" placeholder-style="color: #8b8b8b;font-size: 30rpx;" />
				</view>
				<!-- <view class="input"> -->
					<!-- <picker :value="rangeIndex" :range="range" range-key="title" @change="bindPickerChange2">
						<view class="uni-input">{{range[rangeIndex]?range[rangeIndex].title:''}}</view>
					</picker> -->
					<!-- <input type="text" v-model="formdata.serviceDistance" placeholder="请输入上门服务距离(公里)" placeholder-style="color: #8b8b8b;font-size: 30rpx;" /> -->
				<!-- </view> -->
				<view class="input">
					<picker :value="operationIndex" :range="operation" range-key="operation_point_name" @change="bindPickerChange">
						<view class="uni-input">{{operation[operationIndex]?operation[operationIndex].operation_point_name:''}}</view>
					</picker>
				</view>
				<!-- <view class="input">
					<picker :value="saleIndex" :range="saleType" @change="bindPickerChange3">
						<view class="uni-input">{{saleType[saleIndex]?saleType[saleIndex]:''}}</view>
					</picker>
				</view> -->
				<view class="input">
					<picker :value="shopIndex" :range="shopTpye" range-key="service_type_name" @change="bindPickerChange3">
						<view class="uni-input">{{shopTpye[shopIndex]?shopTpye[shopIndex].service_type_name:''}}</view>
					</picker>
				</view>
				<view class="zhengjian">
					<view class="title">
						*请上传身份证正反面
					</view>
					<view class="flexd">
						<view class="item">
							<view class="imageBox">
								<image @click="formdata.idcardFront=''" v-if="formdata.idcardFront" :src="Img(formdata.idcardFront)" mode=""></image>
								<image @click="onimg('idcardFront')" v-if="!formdata.idcardFront" src="/static/image/img_sfz_z.png" mode=""></image>
							</view>
							<view class="sub">
								请上传身份证正面
							</view>
						</view>
						<view class="item">
							<view class="imageBox">
								<image @click="formdata.idcardFront=''" v-if="formdata.idcardBack" :src="Img(formdata.idcardBack)" mode=""></image>
								<image @click="onimg('idcardBack')" v-if="!formdata.idcardBack" src="/static/image/img_sfz_f.png" mode=""></image>
							</view>
							<view class="sub">
								请上传身份证反面
							</view>
						</view>
					</view>
				</view>
				<view class="jineng">
					<view class="title">
						请上传技能证书
					</view>
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
					<view class="reda">
						注：技能达人需要上传技能证书
					</view>
				</view>
				<view class="foot">
					<view class="btn" @click="apply">
						提交审核
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				htosp: 0,
				userId: '',
				imageurl:'',
				imageValue: [],
				classfy: [],
				operation: [{
					operation_point_name: '请选择运营点',
					id: 0
				}],
				operationIndex: 0,
				// saleType: ['请选择达人类型','服务','商品'],
				// saleIndex: 0,
				shopTpye: [{
					service_type_name: '请选择分类',
					id:0,
				}],
				shopIndex: 0,
				range: [{
					value: 0,
					title: '请选择上门服务距离'
				},{
					value: 1,
					title: '1公里'
				},{
					value: 2,
					title: '2公里'
				},{
					value: 3,
					title: '3公里'
				},{
					value: 4,
					title: '4公里'
				},{
					value: 5,
					title: '5公里'
				}],
				rangeIndex:0,
				skilltext: '请选择擅长技能（可多选）',
				formdata: {
				  "idcardBack": "",
				  "idcardFront": "",
				  "operationPointId": 0,
				  "serviceDistance": '50',
				  "skillCertificate": "",
				  "skillIds": "",
				  "talentName": "",
				  "talentPhone": "",
				  userId: '',
				}
			}
		},
		onLoad() {
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			this.imageurl = this.globalData.imageurl
			this.formdata.userId=this.userId
			let that=this
			// 分类
			this.util.ajax('talent/getTalentServiceTypes',{},(res)=>{
				that.shopTpye=that.shopTpye.concat(res.data.list)
			})
			// 运营点
			this.util.ajax('common/operationPointList',{},res=>{
				that.operation=that.operation.concat(res.data.list) 
			})
		},
		computed:{
			
		},
		methods: {
			refreshskilltext(){
				//更新擅长技能文本
				let text=''
				for(let i=0;i<this.classfy.length;i++){
					if(this.classfy[i].checked){
						text+=this.classfy[i].name+'、'
					}
				}
				this.skilltext= text||'请选择擅长技能（可多选）'
			},
			skillCheck(i){
				if(!this.classfy[i].checked){
					this.classfy[i].checked=true
				}else{
					this.classfy[i].checked=false
				}
				this.refreshskilltext()
				this.$forceUpdate()
				
			},
			openSkill(){
				this.$refs.skill.open()
			},
			onimg(e){
				let that=this,img=[]
				this.util.sendimage(1,img,()=>{
					that.formdata[e]=img[0]
				})
			},
			bindPickerChange: function(e) {
				this.operationIndex = e.target.value
			},
			bindPickerChange3: function(e) {
				// this.saleIndex = e.target.value
				this.shopIndex = e.target.value
			},
			bindPickerChange2: function(e) {
				this.rangeIndex = e.target.value
			},
			checkboxChange: function (e) {
				var items = this.classfy,
					values = parseInt(e.detail.value);
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values==item.id){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			addImg(){
				this.util.sendimage(5-this.imageValue.length,this.imageValue)
			},
			del(index){
				this.imageValue.splice(index,1)
			},
			apply(){
				
				if(this.formdata.talentName==''){
					this.$alert('请输入达人名称')
					return
				}
				if(this.formdata.talentName==''){
					this.$alert('请输入达人联系方式')
					return
				}
				// if(this.rangeIndex==0){
				// 	this.$alert('请选择上门服务距离')
				// 	return
				// }
				if(this.operationIndex==0){
					this.$alert('请选择运营点')
					return
				}
				if(this.shopIndex==0){
					this.$alert('请选择达人分类')
					return
				}
				if(this.formdata.idcardFront==''||this.formdata.idcardBack==''){
					this.$alert('请上传身份证正反面')
					return
				}
				// this.formdata.serviceDistance=this.range[this.rangeIndex].value
				//this.formdata.sale_nature=this.saleIndex
				this.formdata.service_type_id=this.shopTpye[this.shopIndex].id
				this.formdata.operationPointId=this.operation[this.operationIndex].id
				this.formdata.skillCertificate=this.imageValue.join()
				let that=this
				this.util.ajax('talent/applyTalent',this.formdata,res=>{
					that.$alert('提交成功,请等待审核')
					setTimeout(()=>{
						that.$jumpback()
					},1000)
				})
			}
		}
	}
</script>

<style lang="scss">
	.head{
		position: relative;
		.backs{
			position: absolute;
			z-index: 1;
			width: 35rpx;
			left: 20rpx;
			margin: 0;
			image{
				width: 100%;
			}
			
		}
		.homeBg {
			width: 100%;
			image {
				width: 100%;
			}
		}
	}
	.skillBox{
		padding: 30rpx;
		background-color: #fff;
		height: 300rpx;
		.box{
			flex-wrap: wrap;
			.skillitem{
				margin: 0 10rpx;
				.check{
					background-color: $uni-color-primary;
				}
			}
		}
	}
	.skillTitle{
		padding: 20rpx 30rpx 0;
		background-color: #fff;
		.title{
			font-size: 28rpx;
		}
		.btn{
			background-color: $uni-color-primary;
		}
	}
	.order{
		padding: 40rpx;
		background-color: #fff;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		margin-top: -60rpx;
		position: relative;
		.bgBox{
			padding: 80rpx 60rpx;
			background-image: url('https://linli-community-api.niuclub.net/image/static/image/img_k.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			.input{
				margin-bottom: 20rpx;
				background-color: #F4F4F4;
				border-radius: 40rpx;
				padding: 16rpx 40rpx;
				color: #8b8b8b;
				font-size: 32rpx;
				.uni-input{
					color: #8b8b8b;
					font-size: 30rpx;
				}
			}
			.zhengjian{
				margin: 40rpx 0;
				.title{
					margin-bottom: 20rpx;
					font-size: 30rpx;
				}
				.item{
					margin-right: 80rpx;
					
					.imageBox{
						width: 180rpx;
						image{
							width: 180rpx;
							height: 180rpx;
						}
					}
				}
				label{
					margin-right: 20rpx;
				}
				
			}
			.jineng{
				margin: 40rpx 0;
				.title{
					margin-bottom: 20rpx;
					font-size: 30rpx;
				}
				.imageList{
					margin-bottom: 20rpx;
					flex-wrap: wrap;
					.item{
						width: 130rpx;
						margin-right: 20rpx;
						height: 130rpx;
						overflow: hidden;
						image{
							width: 100%;
						}
					}
				}
				
			}
		}
		
	}
	.foot{
		width: 70%;
		margin: 30rpx auto;
		.btn{
			background-color: $uni-color-primary;
			line-height: 2.8;
			text-align: center;
			border-radius: 50rpx;
			font-size: 32rpx;
		}
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
	checkbox{
		.uni-checkbox-input{
			width: 30rpx;
			height: 30rpx;
		}
	}
	checkbox-group{
		label{
			margin-right: 20rpx;
		}
	}
</style>
