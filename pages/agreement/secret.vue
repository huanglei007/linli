<template>
	<view class="content">
		<rich-text :nodes="cont"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cont: '',
				type: 1,
			}
		},
		onLoad(e) {
			this.type=e.type
			if(this.type==2){
				uni.setNavigationBarTitle({
					title: '隐私协议'
				})
			}
			this.loadmore()
		},
		methods: {
			loadmore(){
				let that=this
				this.util.ajax('agreement/info',{
					"agreement_type": this.type,
				},res=>{
					that.cont=res.data.agreement_content
				})
			}
		}
	}
</script>

<style>
	.content{
		padding: 30rpx;
	}
</style>
