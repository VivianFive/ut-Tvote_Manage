import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import moment from 'moment'
import 'iview/dist/styles/iview.css';    // 使用 CSS
// import './assets/style/theme.less';
import './assets/style/main.less';

Vue.use(iView);

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if(!localStorage.getItem('tx-st')){
    if(to.path !== '/login'){
      next({ path: '/login' })
    }else {
      iView.LoadingBar.start();
      next();
    }
  }else {
    iView.LoadingBar.start();
    next();
  }
});
router.afterEach(route => {
  iView.LoadingBar.finish();
});
Vue.filter('timeFormat', (v, f) => moment(v).format(f || 'YYYY-MM-DD HH:mm'));
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});


