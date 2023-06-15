import axios from 'axios';
import { Toast } from 'vant';
import encrypt from '@manniu-core/EncryptProvider';
const service = axios.create({
  baseURL: '/', // api 的 base_url
  timeout: 30000 // 请求超时时间
});

const isDevelopment = process.env.NODE_ENV === 'development';
// const userInfo = 'eyJuaWNrTmFtZSI6IuaIkeaYr+S4gOWPquWwj+ibrueJmyIsIm1vYmlsZSI6IjE3NTIxNTAwNTE1IiwibGV2ZWwiOjIsImxvZ09mZlN0YXR1cyI6MCwicmVnQ2hhbm5lbCI6Im1hbml1amstY2hhbm5lbC1yZXByZXNlbnRhdGl2ZS1hcHAiLCJyZWdUaW1lIjoiMjAyMC0wNi0wN1QxMDoxMToyNC4wMDArMDAwMCIsImFjY291bnRJbmZvIjp7ImlkY2FyZE5vIjoiMjIwMjIxMTk5MzA5MTUzNjY4IiwicGVyc29uTmFtZSI6IuWui+e+jummqCIsImdlbmRlciI6IjIifSwidXNlcklkIjoiNzE5MjUyMTgzNzU2OTY3OTM2In0=';
// const userInfo = 'eyJuaWNrTmFtZSI6IuaIkeaYr+S4gOWPquWwj+ibrueJmyIsIm1vYmlsZSI6IjE4NjcyMjg2OTI2IiwibGV2ZWwiOjIsImxvZ09mZlN0YXR1cyI6MCwicmVnQ2hhbm5lbCI6Im1hbml1amstY2hhbm5lbC1yZXByZXNlbnRhdGl2ZS1hcHAiLCJyZWdUaW1lIjoiMjAyMC0wNi0wN1QxMDoxMToyNC4wMDArMDAwMCIsImFjY291bnRJbmZvIjp7ImlkY2FyZE5vIjoiMjIwMjIxMTk5MzA5MTUzNjY4IiwicGVyc29uTmFtZSI6IumCk+WonyIsImdlbmRlciI6IjIifSwidXNlcklkIjoiNzIyMDkyOTExNjAwMDc0NzUyIn0=';
const userInfo =
  'eyJhdmF0YXIiOm51bGwsIm1vYmlsZSI6IjE4ODQ0MTg0MzI1Iiwibmlja05hbWUiOiIxODgqKioqNDMyNSIsImlkZW50aWZ5U3RhdHVzIjpudWxsLCJ1c2VySWQiOiI3NjYwMDIzNzU4OTM3MTI4OTYiLCJsb2dpbkNoYW5uZWwiOiJtYW5pdWprLWNoYW5uZWwtcmVwcmVzZW50YXRpdmUtYXBwIn0K'; // c端邓娟
// const userInfo ='eyJhdmF0YXIiOm51bGwsIm1vYmlsZSI6IjE4ODQ0MTg0MzI1Iiwibmlja05hbWUiOiIxODgqKioqNDMyNSIsImlkZW50aWZ5U3RhdHVzIjpudWxsLCJ1c2VySWQiOiI3MTkyNTIxODM3NTY5Njc5MzYiLCJsb2dpbkNoYW5uZWwiOiJtYW5pdWprLWNoYW5uZWwtcmVwcmVzZW50YXRpdmUtYXBwIn0NCg==';
// request 拦截器
service.interceptors.request.use(
  (config) => {
    if (
      process.env.VUE_APP_ENCRYPT === 'true' &&
      config.url !== '/agent-app-gateway/agent-h5/rest/withoutToken/uploadGetKeys'
    ) {
      config = encrypt.encryptConfig(config);
    }
    if (isDevelopment) {
      config.headers['userInfo'] = userInfo;
    }
    config.headers['X-Origin-maniujk'] = 'GATEWAY-H5'; // 本地不走网关
    getCode() && (config.headers['oauth-code'] = getCode());
    config.headers['x-requested-with'] = 'XMLHttpRequest';
    console.log('config', config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const specialUrl = '/morningPaperProxy/agent-moments/withoutToken/weather/getCustomWeatherByLatAndLon';
    if (response.data.code && response.data.code !== 200 && !response.config.url.includes(specialUrl)) {
      console.log('response.data', response.data);
      Toast.loading({
        type: 'fail',
        message: response.data.message,
        duration: 2000
      });
      return Promise.reject(response);
    }
    if (response.data.code === 200 && response.config.url !== '/agent-h5/normal/key/uploadGetKeys') {
      response = encrypt.encryptResponse(response);
    }
    return response.data;
  },

  (error) => {
    var redirect = error.response?.headers.redirect;
    if (redirect === 'REDIRECT') {
      console.log('error', error.response.headers);
      window.location.href = error.response.headers.contextpath;
    }

    return Promise.reject(error);
  }
);

// 如果存在code参数，return code对应的值
function getCode() {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + 'code' + '=' + '([^&;]+?)(&|#|;|$)').exec(location) || [, ''])[1].replace(/\+/g, '%20')
    ) || null
  );
}
export default service;
