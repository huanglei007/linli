<template>
	<view>
		<view class="login_title">注册</view>
		<view class="item">
			<label>账 号:</label>
			<input type="number" placeholder="请输入手机号" v-model="phone" />
		</view>
		<view class="msg_box">
			<label>验证码:</label>
			<input placeholder="请输入验证码~"  v-model="msg"/>
			<view @click="getMsg">{{msgBoxShow[checkIndex]+(checkIndex==2?'s':'')}}</view>
		</view>
		<view class="item">
			<label>密 码:</label>
			<input type="password" placeholder="请输入注册的密码"  v-model="pass"/>
		</view>
		<view class="item">
			<label>确认密码:</label>
			<input type="password" placeholder="请再次输入密码"  v-model="affirmPassword"/>
		</view>

		<view class="btn_box" @click="saveUserInfo">注册</view>
		<view class="rule_box" @click="getCheckRule">
			<view :class="checkRule?'cehck':''"></view>
			<view>请同意<label @click.stop="getRuleInfomation">《隐私协议》</label>和<label>《用户协议》</label></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgBoxShow: ['获取验证码', '重获验证码', 60],//验证码按钮显示
				checkIndex: 0,//验证码状态
				checkRule:false,//协议同意状态
				phone:'',
				msg:'',
				pass:'',
				affirmPassword: '',
			}
		},
		onLoad() {
			this.checkRule = false;
			this.phone = '';
			this.msg = '';
			this.pass = '';
		},
		methods: {
			getCheckRule(){//是否同意协议
				this.checkRule = !this.checkRule;
			},
			getRuleInfomation(){//查看协议详情
				this.util.go('./ruleInfo')
			},
			getMsg() {//获取验证码
				this.$alert('暂时无需填写验证码')
				return
				if(this.util.isEmpty(this.phone)){
					this.util.toast('请输入手机号码')
				}else if (!this.util.regular.mobile(this.phone)) {
					this.util.toast('请输入正确的手机号码')
				} else{
					this.util.ajax('user/sendMsg',{
						phone:this.phone,
						type:1
					},(json)=>{
						this.checkIndex = 2;
						this.getSecendTime();
					})
					
				}
			},
			saveUserInfo(){//注册
				if (!this.checkRule) {
					this.$alert('请同意隐私政策与用户协议')
				} else if (this.util.isEmpty(this.phone)) {
					this.$alert('请输入手机号码')
				} else if (this.util.isEmpty(this.pass)) {
					this.$alert('请输入登陆密码')
				}else if (!this.phone.length==11) {
					this.$alert('请输入正确的手机号码')
				}  else {
					let that=this
					this.util.ajax('user/register', {
						"code":this.msg,
						"phone": this.phone,
						"password": this.pass,
						"affirmPassword": this.affirmPassword
					}, json=> {
						uni.setStorageSync('userInfo',json.data)
						uni.setStorageSync('userId',json.data.user_id)
						uni.switchTab({
							url: '/pages/index/index'
						})
					})
				}
			},
			getSecendTime() {//验证码倒计时
				setTimeout(() => {
					this.msgBoxShow[this.checkIndex] = this.msgBoxShow[this.checkIndex] - 1;
					this.$set(this.msgBoxShow, 2, this.msgBoxShow[this.checkIndex])
					if (this.msgBoxShow[this.checkIndex] > 0) {
						this.getSecendTime();
					} else {
						this.msgBoxShow[this.checkIndex] = 60
						this.checkIndex = 1;
					}
				}, 1000)
			}
		}
	}
</script>

<style>
	.rule_box label{
		color: #ffaa00;
	}
	
	.rule_box .cehck{
		background-color: rgba(255, 210, 0, 1);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 0 1px rgba(255, 210, 0, 1)!important;
	}
	
	.rule_box .cehck::before{
		content: '';
		width: 40%;
		height: 40%;
		border-radius: 50%;
		background-color: rgba(255,255,255,1);
		
	}
	
	.rule_box>view:first-child{
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		box-shadow: 0 0 0 1px rgba(153, 153, 153, 1);
		margin-right: 20rpx;
	}
	
	.rule_box{
		width: calc(100% - 160rpx);
		margin-left: 80rpx;
		font-size: 24rpx;
		color: rgba(131,131,131,1);
		display: flex;
		align-items: center;
		margin-top: 50rpx;
	}
	
	.msg_box{
		width: calc(100% - 160rpx);
		margin-left: 80rpx;
		display: flex;
		align-items: center;
		margin-top: 48rpx;
		background-color: #fff;
		border-radius: 60rpx;
	}
	
	.msg_box>label{
		height: 48rpx;
		line-height: 48rpx;
		width: 150rpx;
		padding-right: 10rpx;
		font-size: 28rpx;
		text-align: right;
	}
	
	.msg_box>view{
		font-size: 26rpx;
		margin-left: 10rpx;
		width: calc(100% - 420rpx);
		text-align: center;
		color: #007AFF;
	}
	
	.msg_box>input{
		width: 220rpx;
		height: 88rpx;
		border: 1px solid rgba(247, 247, 247, 1);
		padding: 0px 30rpx;
		font-size: 28rpx;
	}
	
	.login_title {
		text-align: center;
		font-weight: bold;
		font-size: 58rpx;
		padding-top: 160rpx;
		color: rgba(33, 33, 33, .6);
		padding-bottom: 88rpx;
	}

	.item {
		display: flex;
		background-color: rgba(255, 255, 255, 1);
		width: calc(100% - 160rpx);
		margin-left: 80rpx;
		margin-top: 48rpx;
		align-items: center;
		border-radius: 60rpx;
	}

	.item>label {
		height: 48rpx;
		line-height: 48rpx;
		width: 180rpx;
		font-size: 28rpx;
		text-align: right;
		width: 150rpx;
		padding-right: 10rpx;
	}

	.item>input {
		width: calc(100% - 260rpx);
		height: 88rpx;
		border: 1px solid rgba(247, 247, 247, 1);
		padding: 0px 30rpx;
		font-size: 28rpx;
	}

	.btn_box {
		width: calc(100% - 160rpx);
		margin-left: 80rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 32rpx;
		background-color: rgba(255, 210, 0, 1);
		margin-top: 60rpx;
		border-radius: 44rpx;

	}
</style>
