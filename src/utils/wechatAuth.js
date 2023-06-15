import Vue from 'vue';
import store from '../store/root';
export function postWechatCode(path, params) {
  const vue = new Vue({
    store,
  });

  vue.$store.dispatch('getAppId').then((res) => {
    if (res.data.appId) {
      const appid = res.data.appId;
      let redirectUrl = `${getPageUrl(path)}?${params}`;
      redirectUrl = encodeURIComponent(redirectUrl);
      var targetUrl =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirectUrl + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
      location.href = targetUrl;
    }
  });
}

// 获取路径
export function getPageUrl(path) {
  return process.env.VUE_APP_SERVICE_URL + process.env.VUE_APP_BASE_URL + path;
}

// 获取code
// export function getUrlParam() {
//   return decodeURIComponent((new RegExp('[?|&]' + 'code' + '=' + '([^&;]+?)(&|#|;|$)').exec(location) || [, ''])[1].replace(/\+/g, '%20')) || null;
// }

// 分享点击
export function shareClick(path, params) {
  let paramsIndex = 0;
  let urlParams = '';
  for (var key in params) {
    paramsIndex++;
    urlParams += `${paramsIndex !== 1 ? '&' + key : key}=${params[key]}`;
  }
  console.log(getPageUrl(path) + `${urlParams ? '?' + urlParams : ''}`);
  return getPageUrl(path) + `${urlParams ? '?' + urlParams : ''}`;
}
