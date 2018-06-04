// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
import MintUI from 'mint-ui'
//字体
import '../src/assets/font/iconfont.css';
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import $ from 'jquery'
import moment from 'moment/moment'
Vue.use(Mint);
window.baseUrl= 'https://opplatform.eatjoys.com'

Vue.filter('TIMEDF', function (value, format) {

	return 	moment(value).format('YYYY-MM-DD HH:mm:ss')

});

// Vue.use(MuseUI);

// import $ from 'jquery'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
