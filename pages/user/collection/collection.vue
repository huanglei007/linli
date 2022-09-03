<template>
	<view class="content">
		<view class="conBox">
			<shop v-if="typeIndex==0"></shop>
			<daren v-if="typeIndex==1"></daren>
		</view>
	</view>
</template>

<script>
	import shop from './shop.vue'
	import daren from './daren.vue'
	export default {
		components:{
			shop,
			daren
		},
		data() {
			return {
				typeList: ['商家','达人'],
				typeIndex: 1,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.conBox{
		margin: 30rpx 0;
	}
</style>
