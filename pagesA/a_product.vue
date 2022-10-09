<template>
	<view class="product">
		<!-- 搜索商品 -->
		<view class="product-search">
			<uni-search-bar @confirm="inputEvent" :radius="15" cancelButton="none" placeholder="搜索商品名称"
				bgColor='#F5F5F5'>
			</uni-search-bar>
		</view>
		<!-- 商品标签 商品类别 商品信息 -->
		<view class="product-list">
			<!-- 标签 -->
			<view class="searchType">
				<view class="item" v-for="(data,i) in statusList" :key="i"
					:class="statusIndex==data.isvalid?'active':''" @click="statusIndex=data.isvalid;shopTypeIndex=0">
					{{data.status}}
					<image class="icon" src="/static/img/icon_xuanzhong.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 类别 信息 -->
			<view class="product-list-box">
				<!-- 类别 -->
				<view class="type">
					<view class="type-list" :class="shopTypeIndex==index?'active':''" v-for="(d,index) in shopType"
						:key="index" @click="shopTypeIndex = index">
						<text>{{d.category_name}}</text>

						<image v-show="shopTypeIndex == index&&statusIndex==1"
							@click="shopTypeHandlePop('edit',d.category_name)" src="/static/image/icon_update.png"
							class="edit" mode=""></image>

						<image v-show="shopTypeIndex == index" @click="shopTypeHandlePop('delete')"
							src="/static/img/icon_delete.png" class="delete" mode=""></image>
					</view>
					<view v-show="statusIndex==1">
						<view class="type-list new-type" @click="shopTypeHandlePop('add')">
							<image class="icon32" src="/static/img/icon_+.png" mode=""></image>
							<text>新建分类</text>
						</view>
					</view>
				</view>
				<!-- 信息 -->
				<view class="right-box" v-if="shopType[shopTypeIndex]">
					<view v-if="!shopType[shopTypeIndex].productVos[0]" class="fontColor-ccc noData">
						<text>暂无</text>
					</view>
					<view v-else class="product-box">
						<block v-for="(item,index) in shopType[shopTypeIndex].productVos" :key="index">
							<view v-if="statusIndex==item.isvalid" class="products">
								<!-- 商品图片 updateImg(index)-->
								<view class="product-logo" @click="openImagePop(index)">
									<image class="logo"
										:src="item.images?item.images.split(',')[0]:Img(item.images.split(',')[0])"
										mode=""></image>
									<view class="black" v-if="item.stock<1&&item.id">
										<text>售罄</text>
									</view>
								</view>
								<view class="product-news">
									<input type="text" v-model="item.name"
										:placeholder="'请输入'+(userinfo.user_type==3?'商品':'服务')+'名称'"
										placeholder-class="placeholder" />
									<view class="stock">
										<text>库存</text>
										<view class="del" @click.stop="stockEvent('del',index)">-</view>
										<input class="input" type="number" v-model="item.stock" placeholder="" />
										<view class="add" @click.stop="stockEvent('add',index)">+</view>
									</view>
									<block>
										<view v-if="!input_price||index!=input_index" class="price_sub price-input"
											@click="priceSubClick(true,index)">
											<text>{{item.selling_price}}</text>
										</view>
										<input v-else class="price-input" type="digit" :focus="inputFocus_price"
											placeholder="请输入商品价格" placeholder-class="placeholder"
											@input="checkNum($event,index)" />
									</block>
									<view class="meth">
										<view class="sale">
											<text class="font22">月销 {{item.month_sale?item.month_sale:0}}</text>
										</view>
										<view v-if="statusIndex!=3" class="handel">
											<text class="delete" @click="productPopEvent('delete',index)">删除</text>
											<text v-if="statusIndex==1" class="shelf"
												@click="productPopEvent('shelf',index)">下架</text>
											<text v-else-if="statusIndex==2" class="shelf"
												@click="productPopEvent('upshelf',index)">上架</text>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
				<view class="foot-box flexd">
					<view class="foot-save" v-if="shopType[shopTypeIndex]" @click="saveEvent">
						<text>保存</text>
					</view>
					<view class="foot-add" @click="productHandle('add')">
						<image class="icon32" src="/static/img/icon_+.png" mode=""></image>
						<text>添加商品</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 分类弹出层 -->
		<uni-popup ref="typePopup" type="center">
			<view class="type-popup">
				<view class="popup-add" v-if="handleIndex=='add'">
					<view class="title">
						<text class="font36">新增分类</text>
					</view>
					<view class="valuebox">
						<input class="product-search-input" v-model="addVal" placeholder="请输入分类名称" />
					</view>
				</view>
				<view class="popup-edit" v-else-if="handleIndex=='edit'">
					<view class="title">
						<text class="font36">修改分类</text>
					</view>
					<view class="valuebox">
						<input class="product-search-input" v-model="editVal" placeholder="请输入分类名称" />
					</view>
				</view>
				<view class="popup-delete" v-else>
					<view class="deleteText">
						<text class="font36">确定删除该分类?</text>
					</view>
				</view>
				<view class="type-popup-submit">
					<button type="primary" class="cancel" @click="cancelEvent_type">取消</button>
					<view style="width:2rpx;background-color: #F6F6F6;"></view>
					<button type="primary" class="confirm" @click="confimeEvent_type">确定</button>
				</view>
			</view>

		</uni-popup>

		<!-- 产品弹出层 -->
		<uni-popup ref="productPopup" type="center">
			<view class="product-popup">
				<view class="title">
					<text v-if="productShelf=='delete'" class="font36">确定删除该商品?</text>
					<text v-else-if="productShelf=='shelf'" class="font36">确定下架该商品?</text>
					<text v-else class="font36">确定上架该商品?</text>
				</view>
				<view class="product-popup-submit">
					<button type="primary" class="cancel" @click="cancelEvent_type_product">取消</button>
					<view style="width:2rpx;background-color: #F6F6F6;"></view>
					<button type="primary" class="confirm" @click="confimeEvent_type_product">确定</button>
				</view>
			</view>
		</uni-popup>

		<!-- 商品图片弹出层 -->
		<uni-popup ref="imgaesPopup" type="bottom" background-color='#fff'>
			<view class="imgaes-box">
				<view class="box-head flexd jubetween">
					<text @click="closeImagePop">取消</text>
					<text @click="confirmImagePop">确认</text>
				</view>
				<view class="box-body flexd">
					<view class="body-images" v-for="(url,index) in imageValue_index" :key="index">
						<block v-if="url">
							<image :src="url" mode=""></image>
							<image @click="imagesDel(index)" class="del-icon" src="/static/image/icon_jian.png" mode="">
							</image>
						</block>
					</view>
					<block v-if="imageValue_index.length<6">
						<image @click="updateImg" src="/static/image/icon_tj.png" mode=""></image>
					</block>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				userinfo: {},
				imageurl: '',
				// 搜索商品
				searchVal: '',
				// 商品分类
				statusList: [{
						status: '已上架',
						isvalid: 1
					}, {
						status: '已下架',
						isvalid: 2
					},
					// {
					// 	status: '已售罄',
					// 	isvalid: 4
					// }
				],
				statusIndex: 1,
				// 商品列表
				shopType: [],
				shopTypeIndex: 0,
				// 分类的更改/删除/添加 
				handleIndex: '',
				editVal: '',
				addVal: '',
				// 商品的上架/下架
				productShelf: '',
				productIndex: 0,
				// 商品图片
				imageValue: [],
				imageValue_index: [],
				imageIndex: null,
				// 价格输入框
				input_price: false,
				inputFocus_price: false,
				input_index: 0,
			}
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
			this.userinfo = uni.getStorageSync('userInfo')
			this.imageurl = this.globalData.imageurl
			this.getList()
		},
		watch: {
			// 切换商品状态刷新商品列表
			statusIndex(newVal, oldVal) {
				this.getList()
				this.input_price = false
				this.inputFocus_price = false
			},
			imageValue(newVal, old) {
				let that = this
				if (newVal[0]) {
					that.imageValue_index.push(that.imageurl + newVal[newVal.length - 1])
				} else {
					return
				}
			}
		},
		methods: {
			// 获取商品列表
			getList() {
				if (this.statusIndex != 4) {
					this.util.ajax('shop/getShopProducts', {
						"userId": this.userId,
						"searchType": this.statusIndex
					}, res => {
						this.shopType = res.data.categoryVos
						if (res.data.categoryVos[0]) {
							this.shopType = res.data.categoryVos
						} else {
							if (this.statusIndex != 1) {
								this.shopType = res.data.categoryVos
							} else if (!this.shopType[0]) {
								// this.shopType.push({
								// 	"category_name": "类别1",
								// 	"productVos": [{
								// 		"images": "",
								// 		"isvalid": 1,
								// 		"name": "",
								// 		"selling_price": 0,
								// 		"stock": 0
								// 	}]
								// })
							}
						}
					})
				}
			},
			// 保存商品信息
			saveEvent() {
				let that = this
				that.util.ajax('shop/saveShopProduct', {
					"categoryVos": that.shopType,
					"userId": that.userId
				}, res => {
					that.$alert('成功')
				})
			},
			// 商品类别
			// (添加 删除 更改)弹窗
			shopTypeHandlePop(val, name) {
				let that = this
				that.$refs.typePopup.open()
				that.handleIndex = val
				if (name) {
					that.editVal = name
				}
			},
			// 取消
			cancelEvent_type() {
				this.addVal = ''
				this.$refs.typePopup.close()
			},
			// 确认
			confimeEvent_type() {
				let that = this
				if (that.handleIndex == 'edit') {
					that.shopType[that.shopTypeIndex].category_name = that.editVal
				} else if (that.handleIndex == 'delete') {
					let arr = that.shopType[that.shopTypeIndex].productVos
					for (let i = 0; i < arr.length; i++) {
						arr[i].isvalid = 3
					}
					that.shopTypeIndex = 0
					that.saveEvent()
				} else {
					that.shopType.push({
						"category_name": that.addVal,
						"productVos": [
							// 	{
							// 	"isvalid": that.statusIndex,
							// 	"name": "",
							// 	"selling_price": 0,
							// 	"stock": 0,
							// },
						]
					})
				}
				this.addVal = ''
				// 关闭弹窗
				this.$refs.typePopup.close()
			},
			//商品列表
			// (删除 下架 上架)弹窗
			productPopEvent(val, index) {
				let that = this
				that.$refs.productPopup.open()
				that.productShelf = val
				that.productIndex = index
			},
			// 取消
			cancelEvent_type_product() {
				this.$refs.productPopup.close()
			},
			// 确认
			confimeEvent_type_product() {
				let that = this
				let arr = that.shopType[that.shopTypeIndex].productVos
				if (that.productShelf == 'delete') { // 删除
					if (arr[that.productIndex].id) {
						arr[that.productIndex].isvalid = 3
					} else {
						arr.splice(that.productIndex, 1)
					}
				} else if (that.productShelf == 'shelf') { // 下架
					arr[that.productIndex].isvalid = 2
				} else { // 上架
					arr[that.productIndex].isvalid = 1
				}
				this.$refs.productPopup.close()
			},
			// 商品列表(添加)
			productHandle(val, index) {
				let that = this
				if (val == 'add') {
					that.shopType[that.shopTypeIndex].productVos.push({
						"images": "",
						"isvalid": that.statusIndex,
						"name": "",
						"selling_price": '0',
						"stock": 0,
						"month_sale": 0
					})
				}
			},
			// 商品图片
			openImagePop(index) { // 打开图片弹窗
				let that = this
				if (that.statusIndex == 1) {
					that.imageIndex = index
					let img = that.shopType[that.shopTypeIndex].productVos[index].images
					if (img) {
						that.imageValue_index = img.split(',')
					}else{
						that.imageValue_index = []
					}
					that.$refs.imgaesPopup.open()
				}
			},
			closeImagePop() { // 关闭图片弹窗
				this.$refs.imgaesPopup.close()
			},
			imagesDel(index) { // 删除图片
				let that = this
				that.imageValue_index.splice(index, 1)
			},
			confirmImagePop() { // 确认
				let that = this
				that.shopType[that.shopTypeIndex].productVos[that.imageIndex].images = that.imageValue_index.join(",")
				that.closeImagePop()
			},
			updateImg(index) { // 上传图片
				let that = this
				that.imageValue = []
				that.util.sendimage(5 - that.imageValue_index.length, that.imageValue)
			},
			// 搜索
			inputEvent(e) {
				uni.showLoading({
					title: '检索中',
					mask: true
				});
				setTimeout(() => {
					this.util.ajax('shop/getShopProducts', {
						"searchName": e.value,
						"userId": this.userId,
						"searchType": this.statusIndex
					}, res => {
						if (res.data.categoryVos[0].productVos[0]) {
							this.shopType = res.data.categoryVos
						} else {
							this.$alert('暂无您想要的商品')
						}
					})

					uni.hideLoading()
				}, 2000)
			},
			// 商品价格格式化
			priceSubClick(val, index) {
				let that = this
				that.input_price = val;
				that.inputFocus_price = val
				that.input_index = index
			},
			checkNum(e, index) {
				let data = this.shopType[this.shopTypeIndex].productVos
				let num = e.detail.value
				let dot = num.indexOf('.')
				let dotLast = num.lastIndexOf('.')
				if (dot == 0) {
					this.$nextTick(() => {
						data[index].selling_price = num.slice(0, dot)
					})
				} else if (dot !== dotLast) {
					this.$nextTick(() => {
						data[index].selling_price = num.slice(0, dotLast)
					})
				} else {
					data[index].selling_price = num
				}
			},
			// 库存加减
			stockEvent(type, index) {
				let that = this
				let arr = that.shopType[that.shopTypeIndex].productVos[index]
				if (type == 'del') {
					if (arr.stock <= 0) {
						return
					} else {
						arr.stock -= 1
					}
				} else {
					arr.stock += 1
				}
			}
		}
	}
</script>

<style lang="less">
	.product-search {
		padding: 20rpx 50rpx;
		padding-top: 0;
		background-color: #fff;
		position: relative;
	}

	.product-list {
		margin-top: 14rpx;

		.searchType {
			padding-top: 1rpx solid #F5F5F5;
			background-color: #fff;
			padding: 8rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.item {
				line-height: 100rpx;
				position: relative;
				font-size: 28rpx;
				text-align: center;
				width: 33.3%;

				&:last-child {
					color: #666666;
				}

				.icon {
					position: absolute;
					bottom: 10rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 30rpx;
					opacity: 0;
				}

				&.active {
					font-size: 32rpx;
					color: #212121;
					font-weight: bold;

					.icon {
						opacity: 1;
					}
				}
			}
		}

		.product-list-box {
			display: flex;

			.type {
				width: 212rpx;
				text-align: center;
				background-color: #F5F6FA;
				overflow-y: scroll;
				padding-top: 10rpx;
				padding-bottom: 100rpx;

				.type-list {
					color: #666666;
					position: relative;
					padding: 40rpx 0;

					image {
						width: 24rpx;
						height: 24rpx;
					}

					.edit {
						position: absolute;
						top: 20rpx;
						right: 20rpx;
					}

					.delete {
						position: absolute;
						bottom: 20rpx;
						right: 20rpx;
					}
				}

				.active {
					background-color: #fff;
				}

				.new-type {
					display: flex;
					justify-content: center;
					align-items: center;

					.icon32 {
						margin-right: 10rpx;
					}
				}
			}

			.right-box {
				flex: 1;
				height: calc(100vh - 450rpx);
				/* #ifdef MP-WEIXIN || APP-PLUS */
				height: calc(100vh - 250rpx);
				/* #endif */
				padding: 12rpx 30rpx;
				background-color: #fff;
				overflow-y: scroll;
				padding-bottom: 100rpx;

				.noData {
					text-align: center;
					padding-top: 100rpx;
				}

				.products {
					display: flex;
					justify-content: space-between;
					margin-bottom: 70rpx;
					position: relative;

					.product-logo {
						width: 120rpx;
						height: 120rpx;
						text-align: center;
						background-color: #CCCCCC;
						border-radius: 12rpx;
						position: relative;
						overflow: hidden;

						.xiangji {
							width: 60rpx;
							height: 60rpx;
							margin-top: 30rpx;
						}

						.logo {
							width: 100%;
							height: 100%;
						}

						.black {
							width: 100%;
							height: 100%;
							background: rgba(51, 51, 51, 0.5500);
							position: absolute;
							left: 0;
							top: 0;
							display: flex;
							align-items: center;
							justify-content: center;

							text {
								color: #fff;
								letter-spacing: 8rpx;
							}
						}
					}

					.product-news {
						flex: 1;
						padding-left: 25rpx;

						.stock {
							display: flex;
							align-items: center;
							padding: 20rpx 0;

							.del,
							.add {
								height: 100%;
								padding: 6rpx 22rpx;
								background: #F5F5F5;
							}

							.input {
								flex: 1;
								margin: 0 10rpx;
								text-align: center;
							}

							text {
								margin-right: 10rpx;
							}
						}

						.price_sub {
							line-height: 1.4em;
							padding: 6rpx 15rpx;
							background-color: #f5f5f5;
						}

						.price-input {
							color: #FF6000;
							font-size: 42rpx;
							position: relative;
							padding-left: 35rpx;

							&:before {
								content: '¥';
								display: flex;
								align-items: center;
								position: absolute;
								height: 100%;
								top: 0rpx;
								left: 5rpx;

							}
						}

						.meth {
							display: flex;
							justify-content: space-between;
							margin-top: 24rpx;

							.sale {
								text {
									color: #666666;
								}
							}
						}

						.handel {
							padding-bottom: 10rpx;

							.delete {
								margin-right: 15rpx;
								padding: 9rpx 20rpx;
								border-radius: 21rpx;
								border: 1px solid #979797;
							}

							.shelf {
								color: #FF6000;
								padding: 9rpx 20rpx;
								border-radius: 21rpx;
								border: 1px solid #FF6000;
							}
						}

						input {
							padding: 6rpx 15rpx;
							background-color: #F5F5F5;
						}
					}
				}
			}
		}
	}

	.product-popup {
		width: 530rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}

	.type-popup {
		width: 530rpx;
		background-color: #fff;
		border-radius: 10rpx;

		.popup-add,
		.popup-edit,
		.popup-delete {
			padding: 35rpx 60rpx;

			.title {
				text-align: center;
				margin-bottom: 35rpx;
			}

			.valuebox {
				input {
					padding: 25rpx 35rpx;
					border: 1px solid #CCCCCC;
					border-radius: 10rpx;
				}
			}
		}

		.popup-delete {
			.deleteText {
				padding: 30rpx 0;
				text-align: center;
			}
		}
	}

	.product-popup {
		.title {
			padding: 65rpx 0;
			text-align: center;
		}
	}

	.product-popup-submit,
	.type-popup-submit {
		display: flex;
		border-top: 1px solid #F6F6F6;

		.cancel {
			flex: 1;
			background-color: #fff;
			color: #0091FF;
			border-right: 1prx solid #F6F6F6;
		}

		.confirm {
			flex: 1;
			background-color: #fff;
			color: #0091FF;
			border-left: 1prx solid #F6F6F6;
		}
	}

	.imgaes-box {
		padding: 20rpx 40rpx 10rpx 40rpx;

		.box-head {
			font-size: 32rpx;
			padding: 0 10rpx;
			padding-bottom: 20rpx;

			text:nth-child(2) {
				color: #0091FF;
			}
		}

		.box-body {
			flex-wrap: wrap;

			.body-images {
				position: relative;

				.del-icon {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 5rpx;
					right: 5rpx;
				}
			}

			image {
				width: 200rpx;
				height: 200rpx;
				margin: 0 15rpx 15rpx 0;
				border-radius: 15rpx;
			}
		}
	}

	.foot-box {
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		box-shadow: 0 -2px 5px -1px #888888;
		z-index: 2;

		.foot-save {
			width: 212rpx;
			background-image: linear-gradient(to right, #f9db58, #f5c353);
		}

		.foot-add {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				margin-right: 10rpx;
			}
		}

		.foot-save,
		.foot-add {
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
		}
	}
</style>
