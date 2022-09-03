import Vue from 'vue'
import App from './App'
import all from './util/all.js'
import apisa from './util/api.js'
import util from './util/util.js'
// import modulcon from './util/converse_module.js'
import globalData from './components/globalData.vue'

Vue.config.productionTip = false
Vue.prototype.util = util;
Vue.prototype.apisa = apisa;
Vue.prototype.globalData = globalData;
Vue.prototype.url = 'http://192.168.1.115:8074/apiModule/'; 
// Vue.prototype.url = 'http://air-conditioner.niuclub.net/apiModule/';  
Vue.prototype.backtall = null; 
// Vue.prototype.modulcon = modulcon;
Vue.use(all)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()