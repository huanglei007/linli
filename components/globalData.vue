<template>
</template>

<script>
	var globalData = {
		// url:'http://192.168.1.115:8892/apiModule/',//本地接口请求前缀
		url:'https://linli-community-api.niuclub.net/apiModule/',//线上接口请求前缀
		// url:'https://dietitian.niuclub.net/apiModule/',//接口请求前缀
		// imageurl:'http://192.168.1.14/',//图片链接前缀
		imageurl:'https://linli-community-api.niuclub.net/image/',//图片链接前缀
		appId:'wx552b5634f0d4d44b',//appId
		key:'dfd69a784ecd287e5c44f417d2bcaaed',//高德地图web key
		openId:'111',//openId
		userId:'',//userId
		clientid:'',//设备唯一标识CID
		rules: {
			address: {
				rules: [{
						required: true,
						errorMessage: '请输入地址',
					},]
			},
			requirementIntroduction:{
				rules: [{
						required: true,
						errorMessage: '请输入需求介绍',
					},]
			},
			goodsName:{
				rules: [{
						required: true,
						errorMessage: '请输入商品名称',
					}]
			},
			goodsValuation:{
				rules: [{
						required: true,
						errorMessage: '请输入商品估价',
					},{
						format: 'number',
						errorMessage: '估价只能输入数字'
					 },{
						minimum:0,
						maximum: 500, 
						errorMessage: '商品估价应在0-500之间'
					}]
			},
			bookName:{
				rules: [{
						required: true,
						errorMessage: '请输入书名',
					},]
			},
			commission: {
				rules: [{
						required: true,
						errorMessage: '请填写佣金',
					},]
			},
			publisherName:{
				rules: [{
						required: true,
						errorMessage: '请输入发布人姓名',
					},{
						minLength: 1,
						maxLength: 5,
						errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
					}]
			},
			publisherPhone:{
				rules: [{
					required: true,
					errorMessage: '请输入发布人手机号',
				},{
					minLength: 11,
					maxLength: 11,
					errorMessage: '请正确填写手机号',
				}]
			},
			senderName:{
				rules: [{
						required: true,
						errorMessage: '请输入给件人/收件人姓名',
					},{
						minLength: 1,
						maxLength: 5,
						errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
					}]
			},
			senderPhone:{
				rules: [{
					required: true,
					errorMessage: '请输入给件人/收件人手机号',
				},{
					minLength: 11,
					maxLength: 11,
					errorMessage: '请正确填写手机号',
				}]
			},
			goodsSize: {
				rules: [{
					required: true,
					errorMessage: '请输入物品大小',
				}]
			},
			goodsWeight: {
				rules: [{
					required: true,
					errorMessage: '请输入物品重量，单位kg',
				}]
			},
			bookName:{
				rules: [{
					required: true,
					errorMessage: '请输入书名',
				}]
			},
			petKind:{
				rules: [{
					required: true,
					errorMessage: '请输入宠物种类',
				}]
			},
			petAge:{
				rules: [{
					required: true,
					errorMessage: '请输入宠物年龄,单位为岁',
				},{
					format: 'number',
					errorMessage: '年龄只能输入数字'
				 },{
					minimum:0,
					errorMessage: '宠物年龄应大于0'
				}]
			},
			sellingPrice:{
				rules: [{
					required: true,
					errorMessage: '请输入价格',
				},{
					format: 'number',
					errorMessage: '价格只能输入数字'
				 },{
					minimum:0,
					errorMessage: '出售价格应大于0元'
				}]
			},
		}
	} 
	export default globalData;
</script>

<style>
</style>
