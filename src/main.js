import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import axios from 'axios';

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});



axios.defaults.baseURL = process.env.API_ROOT;

Vue.prototype.$axios = axios;

/*设置每次请求的拦截器 用来设置token到header*/
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  alert(222)

  let token = sessionStorage.getItem('usertoken');
  if (token && !config.url.includes('login')) {
    config.headers.common['USERTOKEN'] = token
  }
  alert(222)

  return config;
}, function (error) {
  // 对请求错误做些什么
  alert(333)

  return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
  alert(111)
  // token 已过期，重定向到登录页面
  if (res.data.success === false && res.data.value === 'tokeninvalid') {
    sessionStorage.clear()

    router.replace({
      path: '/dashboard'
    })

  }
  return res
}, function (err) {
  alert(444)

  return Promise.reject(err)
})

/*使用钩子函数对路由进行权限跳转*/
router.beforeEach((to, from, next) => {
/*  alert(55)

  const role = sessionStorage.getItem('usertoken');
  //暂时加上菜单访问路径控制
  if (!role && to.path !== '/login') {
    alert(66)

    next('/dashboard');
  }*/
  next();

});



new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
