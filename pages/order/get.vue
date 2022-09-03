<template>
	<view class="content">
		<view class="head " :style="{paddingTop: htosp+'px'}">
			<view class="flexd jubetween flex-center">
				<view class="left flexd flex-center">
					<image @click="$jumpback()" class="icon32" src="/static/image/icon_gb.png" mode="widthFix"></image>
					帮取帮送
				</view>
			</view>
		</view>
		<view class="form">
			<view class="address flexd jubetween flex-center">
				<view class="icon">
					<image src="/static/image/icon_q.png" mode="widthFix"></image>
				</view>
				<view class="text">
					<picker mode="date" disabled :value="date" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
				<view class="more">
					<image src="/static/image/icon_gd.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="address flexd jubetween flex-center">
				<view class="icon">
					<image src="/static/image/icon_s.png" mode="widthFix"></image>
				</view>
				<view class="text">
					<picker mode="date" disabled :value="date" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
				<view class="more">
					<image src="/static/image/icon_gd.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="form">
			
			<view class="flexd jubetween">
				<view class="item name flexd flex-center jubetween">
					<view class="label">发布人</view>
					<view class="text">杨大大/先生</view>
				</view>
			</view>
			<view class="item flexd flex-center jubetween">
				<view class="label">手机号</view>
				<view class="text flexd flex-center">
					<view>18246589202</view>
					<image src="/static/image/icon_dh.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="flexd jubetween">
				<view class="item name flexd flex-center jubetween">
					<view class="label">取件时间</view>
					<view class="text">13:00-14:00</view>
				</view>
			</view>
			<view class="flexd jubetween">
				<view class="item name flexd flex-center jubetween">
					<view class="label">帮购劳费<text>(平台抽佣10%)</text></view>
					<view class="text">￥4</view>
				</view>
			</view>
			<view class="flexd jubetween">
				<view class="item name flexd flex-center jubetween">
					<view class="label">专人专送</view>
					<view class="text">不需要</view>
				</view>
			</view>
		</view>
		<view class="form">
			<view class="flexd jubetween">
				<view class="item name flexd flex-center jubetween">
					<view class="label">收件人</view>
					<view class="text">杨大大/先生</view>
				</view>
			</view>
			<view class="item flexd flex-center jubetween">
				<view class="label">手机号</view>
				<view class="text flexd flex-center">
					<view>18246589202</view>
					<image src="/static/image/icon_dh.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="form">
			<view class="item flexd flex-center jubetween">
				<view class="label">商品类别</view>
				<view class="text">文件</view>
			</view>
			<view class="item flexd flex-center jubetween">
				<view class="label">重量预估</view>
				<view class="text">1kg</view>
			</view>
			<view class="item flexd flex-center jubetween">
				<view class="label">大小预估</view>
				<view class="text">1kg</view>
			</view>
			<view class="item flexd flex-center jubetween">
				<view class="label">专人专送</view>
				<view class="text">不需要</view>
			</view>
		</view>
		<view class="form">
			<view class="item">
				<textarea class="textarea" disabled value="不在家，放在门口谢谢" placeholder-style="color:#878787" placeholder="请给接单者留言"/>
			</view>
		</view>
		<view class="form">
			
			<view class="item">
				<view style="font-size: 28rpx;line-height: 2;color: #202020;">帮送信息</view>
				<view class="out">
					<block v-for="(item,index) in imageValue" :key='index'>
						<view class="peop">
							<image :src="Img(item)" mode=""></image>
							<image src="/static/image/icon_j.png" mode="" class="del"></image>
						</view>
					</block>
					<view class="peop" @click="addImg()">
						<image src="/static/image/icon_tj.png" mode="" style="border-radius: 0;"></image>
					</view>
				</view>
				
			</view>
			
		</view>
		<view class="foot flexd jubetween flex-center">
			<image src="/static/image/icon_lt.png" mode="widthFix"></image>
			<view class="flexd flex-center">
				<view class="cost">
					帮送费 <text>4元</text>
				</view>
				<view class="btn">
					接单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pickerAddress from '@/components/wangding-pickerAddres/wangding-pickerAddress.vue'
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
				name:'',
				date: currentDate,
				txt:'省市区县、乡镇等',
				typeList: ['帮送','帮取'],
				typeIndex: 0,
				time: '取件开始时间',
				address: '',
				street: '',
				phone: '',
				imageValue:[],
				upstyle: {
				    "borderStyle":{
				        "color":"#eee",     // 边框颜色
				        "width":"1px",      // 边框宽度
				        "style":"solid",    // 边框样式
				        "radius":"10rpx"      // 边框圆角，不支持百分比
				    },
				    "border":false, // 是否显示边框
				    "dividline":true // 是否显示分隔线
				},
				id: 0,
				salesman_number: ''
			}
		},
		onLoad(option) {
			// this.imageurl = this.globalData.imageurl;
			this.htosp = uni.getStorageSync('htop');
			this.userId = uni.getStorageSync('userId');
			if(option.id){
				this.id=option.id
				let that=this
				this.util.ajax('agent/querySalesmanDetail',{
					"salesmanUserId": this.id
				},res=>{
					that.name=res.data.salesman_name
					that.phone=res.data.salesman_phone
					that.attrIndex=res.data.salesman_type
					that.street=res.data.address_detail
					that.txt=res.data.address
					that.address=res.data.area_id
					that.street=res.data.address_detail
					that.imageValue=res.data.electronic_material||[]
					that.date=res.data.entry_time
					that.salesman_number=res.data.salesman_number
				})
			}
			// this.loadmore();
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.attrIndex = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			change(e){
				this.address=e
				this.txt=e.data.join('-')
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
				
			},
		}
	}
</script>

<style lang="scss">
	.head{
		padding: 20rpx 0;
		.left{
			font-size: 32rpx;
			font-weight:  bold;
			padding-left: 20rpx;
			image{
				margin-right: 10rpx;
			}
		}
	}
	.typeBox{
		width: 400rpx;
		margin: 30rpx auto;
		.item{
			width: 45%;
			background-color: #fff;
			font-size: 32rpx;
			font-weight: bold;
			opacity: .3;
			line-height: 2;
			text-align: center;
			&.active{
				opacity: 1;
			}
		}
	}
	.content{
		padding-bottom: 200rpx;
		.form{
			margin: 30rpx;
			background-color: #fff;
			border-radius: 10rpx;
			.item{
				padding: 10rpx 40rpx;
				border-bottom: 1rpx solid #f5f5f5;
				line-height: 80rpx;
				width: 100%;
				box-sizing: border-box;
				.label{
					color: #888;
					text{
						font-size: 24rpx;
					}
				}
				&:last-child{
					border-bottom: 1rpx solid #fff;
				}
				view{
					font-size: 28rpx;
				}
				.input{
					width: 400rpx;
				}
				.textarea{
					height: 200rpx;
					padding: 20rpx 0;
				}
				.text{
					image{
						width: 36rpx;
						margin-left: 20rpx;
					}
				}
				&.name{
					input{
						width: 200rpx;
					}
				}
				
			}
			.time{
				padding: 10rpx 40rpx;
				.timeItem{
					padding: 20rpx;
					width: 230rpx;
					background-color: #f6f6f6;
					text-align: center;
					position: relative;
					&::before{
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
					.uni-input{
						color: #888;
						line-height: 2;
					}
				}
			}
			.address{
				padding: 20rpx 30rpx;
				image{
					width: 100%;
					margin-top: 10rpx;
				}
				.icon{
					width: 50rpx;
				}
				.more{
					width: 30rpx;
				}
				.text{
					width: 500rpx;
					font-size: 28rpx;
				}
			}
			.gender{
				padding: 0 20rpx;
				width: 240rpx;
				view{
					margin: 0;
					font-size: 24rpx;
				}
			}
		}
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
	}
	.foot{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1vh 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		image{
			width: 40rpx;
		}
		.cost{
			font-size: 28rpx;
			margin-right: 20rpx;
			text{
				font-size: 32rpx;
				margin-left: 20rpx;
			}
		}
		.btn{
			line-height: 5vh;
			font-size: 32rpx;
			background-image: $uni-bg-color;
			border-radius: 10rpx;
			padding: 0 70rpx;
		}
	}
</style>
