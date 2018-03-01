import axios from 'axios'
import Qs from 'qs'
import iView from 'iview'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000,                  // 请求超时时间
  headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
  transformRequest: [(data) => Qs.stringify(data)]
  // withCredentials: true
});
// request拦截器
let methodTp;
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (localStorage.getItem('tx-st')) {
    config.headers['cas-client-st'] = localStorage.getItem('tx-st')
    // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  methodTp = config.method;
  if(config.method === 'post'){
    iView.Spin.show();
  }
  return config
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error)
});

// response拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    const cfg = response.config;
    if(cfg.method === 'post'){
      setTimeout(() => iView.Spin.hide(), 300)
    }
    if (res.code !== 200) {
      // 501:登录过期;
      if (res.code === 501) {
        iView.Modal.confirm({
          'title': '登录过期',
          'content': '你已被登出，可以取消继续留在该页面，或者重新登录',
          'ok-text': '重新登录',
          'cancel-text': '取消',
          'onOk': () => {
            location.href = '/#/login'
            //location.reload();// 为了重新实例化vue-router对象 避免bug
          },
          'onCancel': () => {

          }
        })
        //502:系统升级
      }else if (res.code === 502) {
        iView.Modal.info({
          "title": '系统升级',
          "content": res.message,
          "onOk": () => {
            location.href = '/#/login'
          }
        })
      }else {
        iView.Message.error({
          content: res.message,
          duration: 3
        });
      }
      return Promise.reject('error');
      // return new Promise(() => {});
      // return response.data;
    } else {
      return response.data;
    }
  },
  error => {
    if(methodTp === 'post'){
      setTimeout(() => iView.Spin.hide(), 300)
    }
    console.log('err' + error)// for debug
    iView.Message.error('网络错误，请稍后再试');
    return Promise.reject(error)
  }
);

export default service
