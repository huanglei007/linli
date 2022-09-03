<template>

	<picker class="piacks" @change="bindPickerChange" @columnchange="columnchange" :range="array" range-key="name"
		:value="value" mode="multiSelector">
		<slot></slot>
	</picker>
</template>

<script>
	import AllAddress from './city.json';
	let selectVal = ['', '', '']

	export default {
		props: ['data'],
		data() {
			return {
				value: [0, 0, 0],
				array: [],
				index: 0,
				addressList: []
			}
		},
		created() {
			// this.addressMerge()
			this.initSelect()
		},
		watch: {
			data(newVal, oldVal) {
				let add = newVal.address.split(' ')
				let arr = []
				for (let i = 0; i < AllAddress.length; i++) {

					if (AllAddress[i].text == add[0]) {
						arr.push(i)
						let children_1 = AllAddress[i].children

						for (let a = 0; a < children_1.length; a++) {

							if (children_1[a].text == add[1]) {
								arr.push(a)
								let children_2 = children_1[a].children

								for (let k = 0; k < children_2.length; k++) {

									if (children_2[k].text == add[2]) {
										arr.push(k)
										this.value = arr
										this.updateSourceDate()
										this.updateAddressDate()
										this.bindPickerChange()
									}
								}
							}
						}
					}
				}
			}
		},
		methods: {
			// 初始化地址选项
			initSelect() {
				this.updateSourceDate() // 更新源数据
					.updateAddressDate() // 更新结果数据
					.$forceUpdate() // 触发双向绑定
			},
			// 地址控件改变控件
			columnchange(d) {
				this.updateSelectIndex(d.detail.column, d.detail.value) // 更新选择索引
					.updateSourceDate() // 更新源数据
					.updateAddressDate() // 更新结果数据
					.$forceUpdate() // 触发双向绑定
			},

			/**
			 * 更新源数据
			 * */
			updateSourceDate() {
				this.array = []
				this.array[0] = AllAddress.map(obj => {
					return {
						name: obj.text,
						id: obj.id
					}
				})
				this.array[1] = AllAddress[this.value[0]].children.map(obj => {
					return {
						name: obj.text,
						id: obj.id
					}
				})
				this.array[2] = AllAddress[this.value[0]].children[this.value[1]].children.map(obj => {
					return {
						name: obj.text,
						id: obj.id
					}
				})

				return this
			},

			/**
			 * 更新索引
			 * */
			updateSelectIndex(column, value) {
				let arr = JSON.parse(JSON.stringify(this.value))
				arr[column] = value
				if (column === 0) {
					arr[1] = 0
					arr[2] = 0
				}
				if (column === 1) {
					arr[2] = 0
				}
				this.value = arr
				return this
			},

			/**
			 * 更新结果数据 
			 * */
			updateAddressDate() {
				selectVal[0] = this.array[0][this.value[0]].name
				selectVal[1] = this.array[1][this.value[1]].name
				if (this.array[2].length !== 0) {
					selectVal[2] = this.array[2][this.value[2]].name
				}
				return this
			},

			/**
			 * 点击确定
			 * */
			bindPickerChange(e) {
				this.$emit('change', {
					index: this.value.map((item, i) => {
						return this.array[i][item].id
					}),
					data: selectVal
				})
				return this
			},
		}
	}
</script>

<style>
	.piacks {
		/* z-index: 99999999; */
		font-size: initial;
	}
</style>
