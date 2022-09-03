// import uCharts from '../js_sdk/u-charts/u-charts/u-charts.js';
// import eCharts from '../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue';
// import uCharts from '../uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts-v2.0.0.js';
// import configu from '../uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
// import confige from '../uni_modules/qiun-data-charts/js_sdk/u-charts/config-echarts.js';
// import  { isJSON } from '../../js_sdk/u-charts/checker.js';
var _self;
var canvaLineA=null;
var canvaArcbar1=null;
var canvaRing=null;
var canvasCozhu=null;
var shiti = null;
exports.install = function(Vue, options) {
	// 提示弹窗
	Vue.prototype.$alert = function(title,icon,time,mask){
	        title = title == undefined ? "系统繁忙" : title;
	        icon = icon == undefined ? "none" : icon;
	        time = time == undefined ? 2000 : time;
	        mask = mask == undefined ? true : mask;
	        uni.showToast({
	            title:title,
	            icon:icon,
	            mask:mask,
	            duration:time
	        })
	}
	// 确认弹窗
	Vue.prototype.$tipMsg = function (str) {
	  uni.showModal({
	    title: '提示',
	    content: str,
	    showCancel: true,
	    success: function (res) {
	      uni.navigateBack({
	      	success: function() {
	      	        beforePage.onLoad(); // 执行上一页的onLoad方法
	      	    }
	      })
	    }
	  })
	},
	// 返回上页
	Vue.prototype.$jumpback = function (url) {
	  uni.navigateBack({
	  	
	  })
	},
	// 关闭页面跳转
	Vue.prototype.$jumpLa = function (url) {
	  uni.redirectTo({
		url: url,
		animationType: 'zoom-fade-out',
		animationDuration: 200,
		fail: (e)=>{
			console.log(e)
		}
	  })
	},
	// 普通页面跳转
	Vue.prototype.$jump = function (url) {
	  uni.navigateTo({
		url: url,
		animationType: 'zoom-fade-out',
		animationDuration: 200,
		fail: (e)=>{
			console.log(e)
		}
	  })
	},
	
	// tab页面跳转
	Vue.prototype.$jumpsw = function (url) {
	  uni.switchTab({
	  	url: url,
	  	animationType: 'zoom-fade-out',
	  	animationDuration: 200
	  })
	},
	
	// 拨打电话
	Vue.prototype.$callphone = function (phone) {
	  uni.makePhoneCall({
	    phoneNumber: phone
	  })
	},
	
	// 两秒后返回
	Vue.prototype.$twoback = function () {
		  let timeout = setTimeout(function () {
			  uni.navigateBack()
			  clearTimeout(timeout)
		  }, 2000)
	},
	
	// 修改tab页面
	Vue.prototype.$settab = function (ind,text,icon,select) {
		  uni.setTabBarItem({
		    index: ind,
		    text: text,
		    iconPath: "static/tab/"+icon,
		    selectedIconPath: "static/tab/"+select
		  })
	},
	
	//判断是否在国内，不在国内则不做偏移
	Vue.prototype.$out_of_china = function(lng, lat) {
	  var lat = +lat;
	  var lng = +lng;
	  // 纬度3.86~53.55,经度73.66~135.05 
	  return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
	}
	//检查是否授权
	// Vue.prototype.$checkUserSetting = function (cb) {
	//   uni.getSetting({
	//     success(dataShow) {
	//       if (dataShow.authSetting['scope.userInfo']) {
	//         cb(true)
	//       } else if (!dataShow.authSetting['scope.userInfo']) {
	//         cb(false)
	//       }
	//     }
	//   })
	// }
	
	
	Vue.prototype.$email = function (str) { //邮箱
	  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str);
	}
	Vue.prototype.$chineseName = function (str) { //中文姓名
	  return /^[\u4E00-\u9FA5]{2,4}$/.test(str);
	}
	Vue.prototype.$mobile = function (str) { //手机
	  return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(str);
	}
	Vue.prototype.$tel = function (str) { //固话
	  return /^0[\d]{2,3}-[\d]{7,8}$/.test(str);
	}
	Vue.prototype.$idCard = function (str) { //身份证
	  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
	}
	Vue.prototype.$amount = function (str) { //金额(8位整数2位小数)
	  return /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(str);
	}
	Vue.prototype.$positiveInt = function (str) { //正整数
	  return /^[1-9]*[1-9][0-9]*$/.test(str);
	}
	Vue.prototype.$integer = function (str) { //整数(不限位数)
	  return /^-?\d+$/.test(str);
	}
	Vue.prototype.$chinese = function (str) { //判断是不是中文
	  return /[\u4e00-\u9fa5]/g.test(str);
	}
	Vue.prototype.$carNum = function (str) {
	  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/.test(str);
	}
	Vue.prototype.$isEmpty = function (str) { //判断字符串是否为空
	  return str == null || str.length == 0 || typeof (str) == "undefined" || str == '' || str == {};
	}
	// 获取当前日期
	Vue.prototype.$date = function () { 
	  let date = new Date();
	  let year = date.getFullYear();
	  let month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	  let day = date.getDate() <10 ? "0" + date.getDate() : date.getDate();
	  return year+"/"+month+"/"+day;
	}
	
	// 获取当前时分
	Vue.prototype.$dateshifen = function () { 
	  let date = new Date();
	  let hh = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
	  let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
	  let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
	  return hh+":"+mf+":"+ss;
	}
	
	// 获取当前月
	Vue.prototype.$datemon = function () { 
	  let date = new Date();
	  let year = date.getFullYear();
	  let month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	  let day = date.getDate() <10 ? "0" + date.getDate() : date.getDate();
	  return year+"/"+month;
	}
	
	// 转换时间格式
	Vue.prototype.$timeturn = function (tims) { 
		let tiam = tims.replace(/\//g,"-");
		return tiam;
	}
	
	// 获取前50年
	Vue.prototype.$lastfive = function () { 
		let date = new Date();
		let nowyear = date.getFullYear();
		let fiveyear = date.getFullYear() -50;
		let yearmore = [];
		for (let i = fiveyear;i<=nowyear;i++) {
			yearmore.push(fiveyear);
			fiveyear ++;
		}
		return yearmore;
	}
	
	// 获取明天
	Vue.prototype.$grttomorr = function(){
		//明天的时间
		var day = new Date();
		day.setTime(day.getTime()+24*60*60*1000);
		let month = day.getMonth() < 10 ? "0" + (day.getMonth() + 1) : day.getMonth() + 1;
		let dayas = day.getDate() <10 ? "0" + day.getDate() : day.getDate();
		return month+"-"+dayas;
	}
	
	// 获取当天
	Vue.prototype.$grttnowdate = function(){
		let date = new Date();
		let yy = date.getFullYear();
		let mm = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let dd = date.getDate() <10 ? "0" + date.getDate() : date.getDate();
		return yy+'-'+mm + '-' +dd;
	}
	
	// 获取当前日期时间
	Vue.prototype.$datetime = function () { 
	  let date = new Date();
	  let yy = date.getFullYear();
	  let mm = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	  let dd = date.getDate() <10 ? "0" + date.getDate() : date.getDate();
	  let hh = date.getHours();
	  let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
	  let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
	  return yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
	}
	
	// 计算时间差
	Vue.prototype.$hourss = function(dateBegin,dateEnd){
		let dateDiff = new Date(dateEnd).getTime() - new Date(dateBegin).getTime();//时间差的毫秒数
		//计算相差天数
		let dayDiff = Math.floor(dateDiff / (24* 3600 * 1000));//计算出相差天数
		//计算相差小时数
		let hours = Math.floor(dateDiff / ( 3600 * 1000));//计算出相差小时数
		return dayDiff+"/"+hours;
	}
	
	// 时间戳转换
	Vue.prototype.$shijian = function(timea){
		let date = new Date(timea);
		let yy = date.getFullYear();
		let mm = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let dd = date.getDate() <10 ? "0" + date.getDate() : date.getDate();
		let hh = date.getHours();
		let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
		let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
		return mm+'-'+dd+' '+hh+':'+mf;
	}
	// 时间戳转换
	Vue.prototype.$shijianymd = function(timea){
		let date = new Date(timea);
		let yy = date.getFullYear();
		let mm = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let dd = date.getDate() <10 ? "0" + date.getDate() : date.getDate();
		let hh = date.getHours();
		let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
		let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
		return yy+'-'+mm;
	}
	
	// 时间戳转换
	Vue.prototype.$shijiandate = function(timea){
		let date = new Date(timea);
		let yy = date.getFullYear();
		let mm = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let dd = date.getDate() <10 ? "0" + date.getDate() : date.getDate();
		let hh = date.getHours();
		let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
		let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
		return mm+'-'+dd;
	}
	
	Vue.prototype.$shijiansp = function(timea){
		let date = new Date(timea);
		let yy = date.getFullYear();
		let mm = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let dd = date.getDate() <10 ? "0" + date.getDate() : date.getDate();
		let hh = date.getHours();
		let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
		let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
		return mm+'-'+dd+' '+hh+':'+mf+':'+ss ;
	}
	
	// 时间戳转换
	Vue.prototype.$shijianhour = function(timea){
		let date = new Date(timea);
		let hh = date.getHours();
		let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
		let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
		return hh+':00';
	}
	// 时间戳转换
	Vue.prototype.$shijianhour2 = function(timea){
		let date = new Date(timea);
		let hh = date.getHours();
		let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
		let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
		return hh+':'+mf;
	}
	
	// 计算时间差
	Vue.prototype.$timend = function(dateBegin,dateEnd){
		let dateDiff = new Date(dateEnd).getTime() - new Date(dateBegin).getTime();//时间差的毫秒数
		//计算相差天数
		let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
		let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
		let hours=Math.floor(leave1/(3600*1000))//计算出小时数
		//计算相差分钟数
		let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
		let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
		//计算相差秒数
		let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
		let seconds=Math.round(leave3/1000)
		return dayDiff+"天"+hours+"小时"+minutes+"分钟"+seconds+"秒";
	}
	
	// 获取当月天数
	Vue.prototype.$getDaysInMonth = function(year,month){
		month = parseInt(month,10);  //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
		var temp = new Date(year,month,0);
		return temp.getDate();
	}
	
	// 修改月份
	Vue.prototype.$changemont = function(datetime,more){
		let year = datetime.split('-')[0]*1;
		let mon = datetime.split('-')[1]*1;
		if(more == 'jian'){
			if(mon > 1){
				-- mon;
			}else{
				-- year;
				mon = 12;
			}
		}else{
			if(mon < 12){
				mon ++;
			}else{
				year ++;
				mon = 1;
			}
		}
		mon = mon < 10 ? '0' + mon : mon;
		return year + '-' + mon;
	}
	
	Vue.prototype.$hidePhone=function(cellValue){
		if (Number(cellValue) && String(cellValue).length === 11) {
			var mobile = String(cellValue)
			var reg = /^(\d{3})\d{4}(\d{4})$/
			return mobile.replace(reg, '$1****$2')
		} else {
			return cellValue
		}
	}
	
	// 修改日期
	Vue.prototype.$changedate = function(datetime,daymonth,more){
		let year = datetime.split('-')[0]*1;
		let mon = datetime.split('-')[1]*1;
		let dauy = datetime.split('-')[2]*1;
		if(more == 'add'){
			if(dauy < daymonth){
				dauy ++;
			}else{
				dauy = 1;
				if(mon < 12){
					mon ++;
				}else{
					mon = 1;
					year ++;
				}
			}
			if(mon < 10){
				  mon = '0' + mon
			}
			if(dauy < 10){
				  dauy = '0' + dauy
			}
		}else if(more == 'jian'){
			if(dauy > 1){
				dauy --;
			}else{
				dauy = daymonth;
				if(mon > 1){
					mon --;
				}else{
					mon = 12;
					year --;
				}
			}
			if(mon < 10){
				  mon = '0' + mon
			}
			if(dauy < 10){
				  dauy = '0' + dauy
			}
		}
		return year+"-"+mon+"-"+dauy;
	}
	
	// 切换选中样式
	Vue.prototype.$tunrncss = function(item,index,leist){
		for (let i in leist) {
			leist[i].typeap = false
		}
		leist[index].typeap = true;
	}
	
	// 阿拉伯数字转中文
	Vue.prototype.$turan = function(num){
		let cnnum = '';
		if(num == 1){
			cnnum = '一';
		}else if(num == 2){
			cnnum = '二';
		}else if(num == 3){
			cnnum = '三';
		}else if(num == 4){
			cnnum = '四';
		}else if(num == 5){
			cnnum = '五';
		}else if(num == 6){
			cnnum = '六';
		}else if(num == 7){
			cnnum = '七';
		}else if(num == 8){
			cnnum = '八';
		}else if(num == 9){
			cnnum = '九';
		}else if(num == 10){
			cnnum = '十';
		}
		return cnnum;
	}
	
	Vue.prototype.Img= function(url){
		if(url&&url.indexOf('http')!==-1){
			return url
		}
		return !url||url==''?'/static/image/without.png':this.globalData.imageurl+url
	}
	
	// 获取地址
	Vue.prototype.$getas = function(lats,lngs,dizhis){
		let dizhi = dizhis;
		let lat = lats;
		let lng = lngs;
		uni.getLocation({
		  type: 'wgs84', 
		  success: function (res) {
			  console.log(res)
			  uni.openLocation({//​使用微信内置地图查看位置。
				  latitude:lat,//要去的纬度-地址
				  longitude:lng,//要去的经度-地址
				  name: dizhi,
				  address: dizhi
			  })
		  }
		})
	}
	
	// 随机色
	Vue.prototype.$rabcolor = function(){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
		return color;
	}
	
	// 创建ucharts折线图
	Vue.prototype.$canva = function(canvasId,chartData,cWidth,cHeight,maxs,top,bottom){
		// console.log(maxs)
		// console.log(top)
		// console.log(bottom)
		shiti = chartData.shiji;
		canvaLineA=new uCharts({
			$this:this,
			canvasId: canvasId,
			type: 'area',
			fontSize:11,
			legend:{show:false},
			dataLabel:false,//峰值
			dataPointShape:true,//峰点
			// dataPointShapeType:'hollow',//实心或空心
			background:'#FFFFFF',
			pixelRatio:1,
			categories: chartData.categories,
			series: chartData.series,
			animation: false,
			enableScroll: true,
			xAxis: {
				disableGrid:true,
				type:'line',
				gridType:'solid',
				itemCount:4,
				scrollShow:true,
				scrollAlign:'left',
				scrollBackgroundColor:'#FFF',
				scrollColor:'#FFF',
				// boundaryGap:'justify',
				// disabled:true,
				// gridColor:'#d8d8d8',
				// axisLineColor:'#d8d8d8',
				// disableGrid:true,
				// addLine:true,
				// type:'line',
				// gridType:'solid',
				// dashLength:8,
				// labelCount: 4,
			},
			yAxis: {
				// disabled:true,
				// disableGrid:true,
				gridType:'solid',
				dashLength:8,
				splitNumber:4,
				data:[{
					min:0,
					max:maxs*10,
					axisLine: false,//隐藏y轴
					position: 'left',
					// format:(val)=>{return val.toFixed(0)}
					format:(val)=>{
						// console.log(val)
						if (val == 0) {
							val = ''
						} else if (val == maxs*2.5) {
							val = bottom
						} else if (val == maxs*5) {
							val = maxs*0.5
						} else if (val == maxs*7.5) {
							val = top
						} else{
							val = ''
						}
						return val;
					}
				},
				{
					min:0,
					max:maxs*10,
					axisLine: false,//隐藏y轴
					position: 'right',
					// format:(val)=>{return val.toFixed(0)}
					format:(val)=>{
						if (val == 0) {
							val = ''
						} else if (val == maxs*2.5) {
							val = '下限'
						} else if (val == maxs*5) {
							val = '推荐值'
						} else if (val == maxs*7.5) {
							val = '上限'
						} else{
							val = ''
						}
						return val;
					}
				}]
			},
			width: cWidth,
			height: cHeight,
			extra: {
				area:{
					gradient:true,//渐变
					type: 'straight',//直线或者弧线
					opacity:0,
					addLine:true,//有无线
					width:2
				}
			}
		});
	}
	// 折线图
	Vue.prototype.$touchA = function(e){
		canvaLineA.scrollStart(e);
	}
	// 折线图
	Vue.prototype.$moveA = function(e){
		canvaLineA.scroll(e);
	}
	// 折线图
	Vue.prototype.$touchEndA = function(e){	
		canvaLineA.scrollEnd(e);
		var dataIndex=canvaLineA.getCurrentDataIndex(e) 
		// let food_nutrient_element_value = shiti[dataIndex].valueAverage;
		// console.log(dataIndex)
		// console.log(shiti[dataIndex])
		return shiti[dataIndex];
		//下面是toolTip事件，如果滚动后不需要显示，可不填写
		// canvaLineA.showToolTip(e, {
		// 	format: function (item, category) {
		// 		return category + ' ' + food_nutrient_element_value + item.name
		// 	}
		// });
	}
	
	// 创建ucharts圆环图
	Vue.prototype.$canvayuan = function(canvasId,chartData,cWidth,cHeight,arcbarWidth){
		canvaArcbar1=new uCharts({
			$this:_self,
			canvasId: canvasId,
			type: 'arcbar',
			fontSize:10,
			legend:{show:false},
			background:'#FFFFFF',
			pixelRatio:1,
			series: chartData.series,
			animation: false,
			width: cWidth,
			height: cHeight,
			dataLabel: true,
			subtitle: {
				name: chartData.series[0].name,//这里您可以直接给任意字符串
				color: '#666666',
				fontSize: 12,
				offsetY: -25
			},
			title: {
				name: chartData.series[0].number,
				color: chartData.series[0].color,
				fontSize: 16,
				offsetY: 15
			},
			extra: {
				arcbar:{
					type:'circle',//整圆类型进度条图
					width: arcbarWidth,//圆弧的宽度
					startAngle:1.5,//整圆类型只需配置起始角度即可
					backgroundColor:'#FEFAEB'
				}
			}
		});
	}
	
	// 创建ucharts三圆环图
	Vue.prototype.$canvayuans = function(canvasId,chartData,cWidth,cHeight,arcbarWidth){
		canvaArcbar1=new uCharts({
			$this:_self,
			canvasId: canvasId,
			type: 'arcbar',
			fontSize:10,
			legend:{show:false},
			background:'#FFFFFF',
			pixelRatio:1,
			series: chartData.series,
			animation: true,
			width: cWidth,
			height: cHeight,
			dataLabel: true,
			subtitle: {
				name: chartData.series[0].name,//这里您可以直接给任意字符串
				color: '#212121',
				fontSize: 18,
				offsetY: 0
			},
			title: {
				name: chartData.series[0].number,
				color: chartData.series[0].color,
				fontSize: 16,
				offsetY: 15
			},
			extra: {
				arcbar:{
					type:'circle',//整圆类型进度条图
					width: arcbarWidth,//圆弧的宽度
					startAngle:1.5,//整圆类型只需配置起始角度即可
					backgroundColor:'#F4F5F9'
				}
			}
		});
	}
	
	// 创建ucharts圆形图
	Vue.prototype.$canvaRing = function(canvasId,chartData,cWidth,cHeight){
		canvaRing=new uCharts({
			$this:_self,
			canvasId: canvasId,
			type: 'ring',
			fontSize:11,
			legend:true,
			// title: {
			// 	name: '70%',
			// 	color: '#7cb5ec',
			// 	fontSize: 25*1,
			// 	offsetY:-20*1,
			// },
			// subtitle: {
			// 	name: '收益率',
			// 	color: '#666666',
			// 	fontSize: 15*1,
			// 	offsetY:30*1,
			// },
			extra: {
				pie: {
				  offsetAngle: -90,
				  ringWidth: 30*1,
				  labelWidth:15,
				  borderColor:'#000'
				}
			},
			background:'#FFFFFF',
			pixelRatio:1,
			series: chartData.series,
			animation: true,
			width:cWidth*1,
			height:cHeight*1,
			disablePieStroke: true,
			dataLabel: true,
		});
	}
	// 圆环图点击
	Vue.prototype.$RingA = function(e){
		canvaRing.showToolTip(e, {
			format: function (item) {
				return item.name + ':' + item.data 
			}
		});
	}
	
	
	// 柱形图
	Vue.prototype.$canvasCozhusa = function(canvasId,chartData,cWidth,cHeight){
		canvasCozhu={
		    type: "column",
		    canvasId: canvasId,
		    canvas2d: false,
		    background: "none",
		    animation: true,
		    timing: "easeOut",
		    duration: 1000,
			categories: chartData.categories,
			series: chartData.series,
		    color: [
		        "#255CFD"
		    ],
		    rotate: false,
		    reserve: false,
		    fontSize: 13,
		    fontColor: "#666666",
		    enableScroll: false,
		    touchMoveLimit: 60,
		    enableMarkLine: false,
		    dataLabel: true,
		    dataPointShape: true,
		    dataPointShapeType: "solid",
		    xAxis: {
		        disabled: false,
		        axisLine: true,
		        axisLineColor: "#EAEAEA",
		        calibration: false,
		        fontColor: "#666666",
		        fontSize: 13,
		        rotateLabel: false,
		        itemCount: 5,
		        boundaryGap: "center",
		        disableGrid: true,
		        gridColor: "#EAEAEA",
		        gridType: "solid",
		        dashLength: 4,
		        gridEval: 1,
		        scrollShow: false,
		        scrollAlign: "left",
		        scrollColor: "#A6A6A6",
		        scrollBackgroundColor: "#EFEBEF"
		    },
		    yAxis: {
		        disabled: false,
		        disableGrid: false,
		        splitNumber: 5,
		        gridType: "solid",
		        dashLength: 8,
		        gridColor: "#EAEAEA",
		        padding: 10,
		        showTitle: false,
		    },
		    legend: {
		        show: false,
		        position: "bottom",
		        float: "center",
		        padding: 5,
		        margin: 5,
		        backgroundColor: "rgba(0,0,0,0)",
		        borderColor: "rgba(0,0,0,0)",
		        borderWidth: 0,
		        fontSize: 13,
		        fontColor: "#666666",
		        lineHeight: 11,
		        hiddenColor: "#CECECE",
		        itemGap: 10
		    },
		    extra: {
		        column: {
		            type: "group",
		            width: 20,
		            seriesGap: 2,
		            categoryGap: 3,
		            barBorderCircle: true,
		            linearType: "none",
		            linearOpacity: 1,
		            colorStop: 0,
		            meterBorder: 1,
		            meterFillColor: "#FFFFFF",
		            activeBgColor: "#255CFD",
		            activeBgOpacity: 0.1,
		            meterBorde: 1
		        },
		        tooltip: {
		            showBox: true,
		            showArrow: true,
		            borderWidth: 0,
		            borderRadius: 0,
		            borderColor: "#000000",
		            borderOpacity: 0.7,
		            bgColor: "#000000",
		            bgOpacity: 0.7,
		            gridType: "solid",
		            dashLength: 4,
		            gridColor: "#CCCCCC",
		            fontColor: "#FFFFFF",
		            splitLine: true,
		            horizentalLine: false,
		            xAxisLabel: false,
		            yAxisLabel: false,
		            labelBgColor: "#FFFFFF",
		            labelBgOpacity: 0.7,
		            labelFontColor: "#666666"
		        },
		        markLine: {
		            type: "solid",
		            dashLength: 4,
		            data: []
		        }
		    }
		}
	}
	
}