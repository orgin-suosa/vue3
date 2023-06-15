import { getAppId, weixinByCode, getSignature } from '../api/wechat/public.js';

const SESSION_KEY = 'userInfo';
const { location, localStorage } = window || {};
const weChatUserInfo = localStorage.getItem(SESSION_KEY);
/**
 * 初始化微信活动主流程
 * 1. 获取微信用户信息
 * 2. 动态加载微信 SDK
 * 3. 获取微信签名
 * 4. 初始化微信 SDK
 * @export
 */
export async function initWeChatActivity(code) {
  // code 可能为一个数组，取数组未尾 code
  const transCode = code && Array.isArray(code) ? code[code.length - 1] : code;
  // 获取用户信息
  const userInfo = await getWeChatUserInfoByCode(transCode);
  // 动态加载微信 SDK
  await loadWeChatSDKScript();
  // 获取微信签名
  const signature = await handleGetSignature();
  // 初始化微信 SDK
  await initWeChatSDK(signature);
  console.log('userInfo------------->', userInfo);
  return userInfo;
}

/**
 * 第一步：获取公众号 appId 微信授权
 * @export
 * @param {Object} params
 */
export async function redirectWeChatByAppId(params) {
  await getAppId({}).then(({ data } = {}) => {
    const { appId } = data || {};
    if (!appId) return;
    const redirect_uri = encodeURIComponent(transFullPath() + serialize(params));
    const redirectParams = {
      appid: appId,
      redirect_uri,
      response_type: 'code',
      scope: 'snsapi_userinfo',
    };
    console.log(redirectParams, 'redirectParams');
    const targetUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize' + serialize(redirectParams) + '#wechat_redirect';
    if (!weChatUserInfo) {
      location.replace(targetUrl);
    }
  });
}

/**
 * 第二步：动态加载微信 SDK
 * @export
 * @returns Promise
 */
export function loadWeChatSDKScript() {
  return new Promise((resolve) => {
    const src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js';
    const check = document.querySelectorAll(`script[src="${src}"]`);
    if (check.length > 0) {
      check[0].addEventListener('load', function() {
        resolve();
      });
      resolve();
      return;
    }
    const script = document.createElement('script');
    const head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
      script.addEventListener('load', () => resolve(), false);
    } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', () => {
        const target = window.event.srcElement;
        if (target.readyState === 'loaded') {
          resolve();
        }
      });
    }
    head.appendChild(script);
  });
}

/**
 * 第三步：获取微信签名
 * @export
 * @returns Promise
 */
export function handleGetSignature() {
  const params = { url: location.href.split('#')[0] };
  return getSignature(params).then(({ data } = {}) => data);
}

/**
 * 第四步：初始化微信 SDK
 * @export
 * @param {Object}
 *  {
 *   appId		公众号的唯一标识
 *   timeStamp 	生成签名的时间戳
 *   nonceStr	生成签名的随机串
 *   signature	签名
 *  }
 * @returns Promise
 */
export function initWeChatSDK({ appId, timeStamp: timestamp, nonceStr, signature }) {
  const debug = false;
  // 需要使用的JS接口列表
  const jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage'];
  return new Promise((resolve) => {
    window.wx.config({ debug, appId, timestamp, nonceStr, signature, jsApiList });
    window.wx.ready(() => resolve());
  });
}

/**
 * 第五步：监听微信转发
 * @export
 * @param {Object} activityInfo
 *  {
 *   activityName		分享标题
 *   activityPurpose 	分享描述
 *   activityPicture	分享图片
 *  }
 */
export function addListenWeChatForward({ title, desc, imgUrl, link }, cb) {
  const data = {
    title: title,
    desc: desc,
    imgUrl: imgUrl,
    link: link,
    type: '', // 分享类型 music、video、link，默认为 link
    dataUrl: '', // 如果 type 是 music 或 video，则要提供数据链接，默认为空
    success: () => {
      console.log('微信分享成功回调', { title, desc, imgUrl, link });
      cb && cb();
    },
  };
  console.log('addListenWeChatForward: ', data);
  window.wx.onMenuShareTimeline(data); // 分享好友
  console.log('分享好友------>');
  window.wx.onMenuShareAppMessage(data); // 分享到朋友圈
  console.log('分享到朋友圈------>');

  // if (judgingIsIOS()) {
  //   // iOS平台采用新api
  //   window.wx.updateAppMessageShareData(data);
  //   window.wx.updateTimelineShareData(data);
  // } else {
  //   window.wx.onMenuShareTimeline(data);
  //   window.wx.onMenuShareAppMessage(data);
  // }
}

/**
 * 获取微信用户信息
 * @export
 * @param {String} code 微信授权 code
 * @returns Promise
 */
export function getWeChatUserInfoByCode(code) {
  return new Promise((resolve) => {
    if (weChatUserInfo && JSON.parse(weChatUserInfo)?.openid) {
      resolve(JSON.parse(weChatUserInfo));
    } else {
      code &&
        weixinByCode({ code }).then(({ data } = {}) => {
          localStorage.setItem(SESSION_KEY, data);
          resolve(JSON.parse(data));
        });
    }
  });
}

/**
 * 记录浏览时长，递归调用
 * @export
 * @param {String} id
 * @param {Function} cb
 * @param {number} [minute=1]
 * @returns
 */
let timer = null;
export function handleRecordViewTime(id, cb, minute = 1) {
  console.log('handleRecordViewTime: ========>', id);
  if (minute > 10) {
    return clearTimeout(timer);
  }
  cb && minute > 1 && cb({ id, time: minute });
  timer = setTimeout(() => {
    handleRecordViewTime(id, cb, ++minute);
  }, 1000 * 60);
}

/**
 * 序列号 url 参数
 * @param {Object} params 请求参数对象
 * @returns String
 */
export function serialize(params = {}) {
  return (
    '?' +
    Object.keys(params)
      .reduce(function(acc, key) {
        acc.push(key + '=' + params[key]);
        return acc;
      }, [])
      .join('&')
  );
}

// 转发链接处理
export function transFullPath() {
  return process.env.VUE_APP_SERVICE_URL + location.pathname;
}

// ios后退关闭
export function wxClose() {
  const state = {
    title: 'title',
    url: '#',
  };
  window.history.pushState(state, 'title', '#');
  window.addEventListener(
    'popstate',
    function() {
      window['wx'].closeWindow();
    },
    false,
  );
}

/**
 * 判断是否是安卓
 *
 * @export
 * @returns {boolean}
 */
export function judgingIsAndroid() {
  const ua = window.navigator.userAgent;
  return /Android|Linux/.test(ua);
}

/**
 * 判断是否是 IOS
 *
 * @export
 * @returns {boolean}
 */
export function judgingIsIOS() {
  const ua = window.navigator.userAgent;
  return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua);
}
