<template>
	<view class="tabBar flexd jubetween">
		<view class="item" :class="{active: chiose==index}" :style="{width: 100/list.length+'%'}" v-for="(item,index) in list" :key="index" @click="changeIndex(index)">
			<image :src="choise(item,index)" style="max-width: 50rpx;" mode="widthFix"></image>
			<view class="text">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabBar",
		data() {
			return {
				chiose: this.tabIndex,
			};
		},
		props:{
			list: {
				default: [],
				type: Array
			},
			tabIndex: {
				default: 0,
				type: Number
			}
		},
		methods:{
			choise(item,index){
				return this.chiose==index?item.selectedIcon:item.icon
			},
			changeIndex(e){
				this.chiose=e
				this.$emit('changeIndex',e)
			}
		}
	}
</script>

<style lang="scss">
	.tabBar{
		background-color: #fff;
		border-top: 1rpx solid #f5f5f5;
		padding: 10rpx 0;
		.item{
			text-align: center;
			image{
				width: 100%;
			}
			&.active .text{
				color: #007AFF;
			}
		}
	}
</style>
