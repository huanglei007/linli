<template>
	<view class="content">
		<view class="toptype" :style="{paddingTop: htosp+'px'}">
			<view class="flexd jubetween ">
				<view></view>
				<view class="titla texcenter">我的消息</view>
				<image class="backs" src="/static/image/icon_ss.png" mode="" @click="showSearch()"></image>
			</view>
		</view>
		<view class="operation flexd jucenter flex-center" v-show="isSearch" :style="{paddingTop:htosp +'rpx'}">
			<view class="searchBox flexd jubetween flex-center">
				<view class=" flexd jucenter flex-center">
					<image src="/static/image/icon_ss.png" mode=""></image>
					<input @confirm="getNewList()" confirm-type="search" class="input" type="text" v-model="searchParam"
						placeholder="请输入用户昵称" placeholder-style="font-size:24rpx;color:#888" />
				</view>
				<view class="btn" @click="getNewList();">
					搜索
				</view>
			</view>
		</view>
		<view class="peops">
			<view class="kong texcenter" v-if="lista.length == 0">
				<image src="/static/image/img_zwsh.png" mode=""></image>
				<view class="gray">暂无消息记录哟~</view>
			</view>
			<block v-for="(item,index) in lista" :key='index'>
				<view class="list flexd jubetween"
					@click="$jump('/pages/chat/HM-chat?idse='+item.to_user_id+'&tita='+item.nick_name);item.isNotreadCount=0">
					<view class="lefimg">
						<image :src="Img(item.head_img)" mode=""></image>
						<view class="dian" v-if="item.isNotreadCount != 0"></view>
					</view>
					<view class="texright">
						<view class="nickname texleft">{{item.nick_name}}</view>
						<view class="title texleft" v-html="item.finallyGroupMessage"></view>
						<view class="tima gray">{{$shijian(item.createtime)}}</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				htosp: 0,
				tablsit: [],
				lista: [],
				imageurl: '',
				fromUserId: '',
				searchParam: '',
				isfoot: false,
				curPage: 1,
				isSearch: false,
			}
		},
		onReachBottom() {
			if (!this.isfoot) {
				this.curPage++
				this.getlist()
			}
		},
		onLoad() {
			this.globalData.chonglian = false
			let userType = uni.getStorageSync('userType');
			this.htosp = uni.getStorageSync('htop');

		},
		onShow() {
			this.fromUserId = uni.getStorageSync('userId');
			this.getConnection();
			this.getNewList()
		},
		methods: {
			showSearch() {
				this.isSearch = !this.isSearch;
				this.$forceUpdate()
			},
			loadmore(e = false) {
				let that = this;
				that.util.ajax('contact/queryChatList', {
					"fromUserId": that.fromUserId,
					"pageSize": 20,
					"curPage": that.curPage,
					"searchParam": that.searchParam
				}, function(res) {
					if (that.curPage !== res.data.page.curPage) that.isfoot = true
					let box = res.data.chatList
					for (let i in res.data.chatList) {
						if (res.data.chatList[i].message_type == '0') {
							let cont = res.data.chatList[i].message_content;
							let caijian = cont.replace(/display: flex;/,
								"width: 90%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;line-height:29px"
								);
							box[i].finallyGroupMessage = caijian;
						} else {
							box[i].finallyGroupMessage = '[图片]'
						}
					}
					if (e) {
						that.lista = box;
					} else {
						that.lista = that.lista.concat(box);
					}
					that.$forceUpdate()
				})
			},
			getNewList() {
				this.curPage = 1
				this.isfoot = false
				this.loadmore(true)
			},
			getConnection() {
				let that = this;
				that.util.weeksort(function(res) {
					that.globalData.chonglian = true;
					that.getlianjie();
				})
			},
			getlianjie() {
				let that = this;
				that.util.getsort(function(res) {
					let mysid = res.data.messageContent;
					let tophone = mysid.substring(0, mysid.indexOf('@'));
					that.getNewList();
					// let isphone = uni.getStorageSync('salesmaninfo').member.phone;
					// if(tophone != isphone){
					// 	that.loadmore();
					// }
				})
			},
		},
		onUnload() {
			getApp().backtall = null;
			uni.closeSocket();
		}
	}
</script>

<style lang='scss'>
	.pageTitle {
		font-size: 32rpx;
		font-weight: bold;
	}

	.operation {
		padding: 20rpx 30rpx;
		margin-bottom: 30rpx;

		.backs {
			padding: 0 20rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.searchBox {
			background-color: #fff;
			border-radius: 30rpx;
			line-height: 2;
			padding: 10rpx 20rpx;
			width: 600rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				margin: 0 20rpx;
			}

			input {
				width: 450rpx;
			}

			.btn {
				width: 130rpx;
				text-align: center;
				background-color: #fff;
				border-radius: 30rpx;
				line-height: 2;
				margin-left: 20rpx;
			}
		}

		.add-btn {
			width: 50rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.content {
		padding-bottom: 150rpx;

		.toptype {
			background: #FFF;
			position: relative;
		}

		.baidi {
			width: 100%;
			background: #FFF;

			.toptit {
				height: 80rpx;

				.title {
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: bold;
					margin-left: 34rpx;
				}
			}
		}

		.peops {
			.kong {
				margin: 80rpx auto;

				image {
					width: 480rpx;
					height: 330rpx;
				}

				view {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					margin-top: 10rpx;
				}
			}

			.list:last-child {
				.texright {
					border-bottom: none;
				}
			}

			.list {
				background: #FFF;
				padding: 26rpx 30rpx 0;
				padding-right: 0;

				.lefimg {
					width: 88rpx;
					height: 88rpx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
					}

					.num {
						width: 45rpx;
						line-height: 45rpx;
						padding: 5rpx;
						background: #FF3709;
						border-radius: 50%;
						position: absolute;
						right: -15rpx;
						top: -15rpx;
						font-size: 24rpx;
					}

					.dian {
						width: 20rpx;
						height: 20rpx;
						background: #FF3709;
						border-radius: 50%;
						position: absolute;
						right: -8rpx;
						top: -8rpx;
					}
				}

				.texright {
					width: 83%;
					padding-bottom: 34rpx;
					border-bottom: 1rpx solid rgba(229, 229, 229, .7);
					position: relative;

					.nickname {
						font-size: 32rpx;
						margin-bottom: 20rpx;
					}

					.title {
						width: 85%;
						color: #B3B3B3;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 28rpx;
					}

					.tima {
						font-size: 20rpx;
						position: absolute;
						right: 31rpx;
						top: 0;
					}
				}
			}
		}
	}
</style>
