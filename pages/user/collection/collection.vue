<template>
	<view class="content">
		<view class="type">
			<view class="type-select" :class="{'active':typeIndex == index}" v-for="(d,index) in typeList"
				@click="typeIndex = index">
				<text>{{d}}</text>
			</view>
		</view>
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
		components: {
			shop,
			daren
		},
		data() {
			return {
				typeList: ['商家', '达人'],
				typeIndex: 0,
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.type {
		padding-bottom: 30rpx;
		display: flex;
		justify-content: center;

		.type-select {
			color: #212121;
			padding: 10rpx 40rpx;
			text-align: center;
			background-color: #fff;
			border: 0.5rpx solid #e5e5e5;
		}

		.active {
			background-color: #FFD200;
		}
	}
</style>
