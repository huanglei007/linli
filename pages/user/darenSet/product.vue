<template>
	<view>
		<view class="list">
			<view class="class" v-for="(item,i) in categoryVos" :key="i">
				<view class="flexd jubetween" v-if="item.isHide" @click="showItem(item)">
					<view class="bigTitle">
						{{item.category_name}}
					</view>
					<view>+</view>
				</view>
				<view class="mb-20 flexd jubetween flex-center" v-if="!item.isHide">
					<view class="input">
						<input type="text" v-model="item.category_name" placeholder="请输入类别名称" placeholder-class="placeholder"/>
					</view>
					<view class="right" @click="addPro(item)">
						创建商品+
					</view>
				</view>
				<view class="proList" v-if="!item.isHide">
					<view class="item" v-for="(itemx,x) in item.productVos" :key="x" :class="itemx.isDelete?'hidden':''">
						<view class="mb-20 flexd jubetween flex-center">
							<view class="input">
								<input type="text" v-model="itemx.name" placeholder="请输入服务/商品名称" placeholder-class="placeholder"/>
							</view>
							<view class="right">
								<image @click="delPro(item,x)" class="add" src="/static/image/icon_jian.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="mb-20 flexd jubetween flex-center">
							<view class="input">
								<input type="number" v-model="itemx.market_price" placeholder="请设置市场价" placeholder-class="placeholder"/>
							</view>
							<view class="center">
								-
							</view>
							<view class="input">
								<input type="number" v-model="itemx.selling_price" placeholder="请设置销售价" placeholder-class="placeholder"/>
							</view>
						</view>
						<view class="outBox">
							<view style="font-size: 28rpx;line-height: 1.3;">上传服务/商品图片</view>
							<view class="out">
								<block>
									<view class="peop" v-if="itemx.images!=''">
										<image :src="Img(itemx.images)" mode=""></image>
										<image @click="del(itemx)" src="/static/image/icon_jian.png" mode="" class="del"></image>
									</view>
								</block>
								<view class="peop" >
									<image @click="addImg(itemx)" v-if="itemx.images==''" src="/static/image/icon_tj.png" mode="" style="border-radius: 0;"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="class flexd jucenter">
				<image @click="newArr" class="addcar" src="/static/image/icon_add.png" mode="widthFix"></image>
			</view>
			<view class="foot">
				<view class="btn" @click="submit()">
					提交审核
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				userId: '',
				categoryVos: [
					{
						"category_name": "",
						"change": true,
						"productVos": [
						  {
							"selling_price": '',
							"images": "",
							"name": "",
							"market_price": '',
						  }
						]
					}
				]
			}
		},
		mounted() {
			this.userId=uni.getStorageSync('userId')
			this.getList()
		},
		methods: {
			getList(){
				let that=this
				this.util.ajax('talent/getTalentService',{
					userId: this.userId
				},res=>{
					if(res.data.categoryVos.length){
						that.categoryVos=res.data.categoryVos
						for(let i=0;i<that.categoryVos.length;i++){
							that.categoryVos[i].isHide=1
						}
					}
				})
			},
			showItem(e){
				e.isHide=0
				e.change=true
				this.$forceUpdate()
			},
			addPro(e){
				e.productVos.push({
					"selling_price": '',
					"images": "",
					"name": "",
					"market_price": '',
				  })
			},
			delPro(item,x){
				if(item.productVos[x].id){
					item.productVos[x].isDelete=1
				}else{
					item.productVos.splice(x,1)
				}
			},
			addImg(itemx){
				let img=[],that=this
				this.util.sendimage(1,img,e=>{
					itemx.images=img[0]
				})
			},
			del(itemx){
				itemx.images=''
			},
			newArr(){
				this.categoryVos.push({
					"category_name": "",
					"change": true,
					"productVos": [
					  {
						"selling_price": '',
						"images": "",
						"name": "",
						"market_price": '',
					  }
					]
				})
			},
			submit(){
				
				let list=[]
				for(let i=0;i<this.categoryVos.length;i++){
					if(this.categoryVos[i].change){
						list.push(this.categoryVos[i])
					}
				}
				let that=this
				this.util.ajax('talent/saveTalentService',{
					categoryVos: list,
					userId:this.userId
				},res=>{
					that.$alert(res.msg)
					this.getList()
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.out{
		display: flex;
		flex-wrap: wrap;
		.peop{
			width: 154rpx;
			height: 154rpx;
			margin: 20rpx 0;
			margin-right: 12rpx;
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
	.list{
		margin-bottom: 30rpx;
		.class{
			background-color: #fff;
			border-radius: 30rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			.bigTitle{
				font-size: 32rpx;
			}
			.add{
				width: 30rpx;
			}
			.input{
				width: calc(100% - 200rpx);
				background-color: #F5F5F5;
				border-radius: 10rpx;
				padding: 20rpx 30rpx;
			}
			.addcar{
				width: 50rpx;
			}
			.right{
				color: #FF2834;
			}
			.center{
				width: 20%;
				text-align: center;
			}
			.proList{
				.item{
					border-bottom: 1rpx solid #eee;
					margin-bottom: 20rpx;
					&:last-child{
						border-color: #fff;
						margin-bottom: 0;
					}
					&.hidden{
						display: none;
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
</style>
