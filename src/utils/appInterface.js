import Bridge from 'dsbridge';
import BridgeProvider from '@manniu-core/BridgeProvider';
const native = new BridgeProvider({ nativeName: 'agent' });
const provider = native.createProvider();
// const isDevelopment = process.env.NODE_ENV === 'development';
const appInterface = {
  /**
   * 获取status bar高度, 单位已转vw
   */
  getStatusBarHeight() {
    // let statusBarHeight = window.wondersh5 ? window.wondersh5.getStatusBarHeight() : 75
    let statusBarHeight = Bridge.call('getStatusBarHeight', '');
    if (!statusBarHeight) {
      statusBarHeight = 75;
    }
    return (Number(statusBarHeight - 25) * 2) / 15;
  },
  /**
   * 获取整个头部高度，单位vw
   */
  getHeaderTop() {
    const height = (100 * 2) / 15;
    return height + this.getStatusBarHeight();
  },
  /**
   * 获取整个头部高度，单位vw
   */
  getStatusBar() {
    let h = Bridge.call('getStatusBarHeight', '');
    if (!h) {
      h = 20;
    }
    console.log('getStatusBarHeight==>', h);
    // return Number((h) / window.devicePixelRatio) * 2 / 15;
    return h ? h + 'px' : '20px';
  },
  /**
   * 原生端返回
   */
  goBack() {
    console.log('手机端返回');
    Bridge.call('goBack', '');
  },
  /**
   * 获取原生端用户token
   */
  getToken() {
    console.log('获取token');
    return Bridge.call('getToken', '');
  },
  /**
   * 调用原生端分享
   */
  share(params) {
    console.log('调用原生端分享');
    Bridge.call('share', params);
  },
  shareFile(params) {
    console.log('调用原生端分享文件');
    Bridge.call('shareFile', params);
  },
  // 传给原生调用的方法，保存图片；
  getShareImage(fn) {
    Bridge.register('getShareImage', fn);
  },
  // 分享url链接(title标题, content内容, picture图片, url地址)
  shareUrl(params) {
    console.log('调用原生端分享网页', params);
    Bridge.call('shareUrl', params);
  },
  /**
   * 圈经营 圈子分享
   * @param text 分享文字
   * @param url 分享图片
   */
  shareBCCircle(params) {
    console.log('调用原生端圈子分享', params);
    return new Promise((resovle, reject) => {
      Bridge.call('shareBCCircle', params, function (res) {
        resovle(res);
      });
    });
  },
  /**
   * 圈经营 检测用户信息是否完善
   */
  checkUserInfo() {
    console.log('调用原生端检测用户信息是否完善');
    return Bridge.call('checkUserInfo');
  },
  /**
   * 资讯详情 跳转我的名片
   */
  jumpToMyCard() {
    console.log('调用原生端跳转我的名片');
    Bridge.call('jumpToMyCard');
  },
  /**
   * 资讯详情 刷新数据
   */
  getBusinessCard(fn) {
    Bridge.register('getBusinessCard', fn);
  },

  // 传参
  getParameterValue() {
    // if (isDevelopment) {
    //   return JSON.stringify({
    //     // 咨询详情
    //     // id: '0155ebaf870011ea9a3dfa163e2b2833',
    //     // 邀请函
    //     id: '15827d4217f74e599e315034724b3c4f',
    //     type: '0',
    //     source: '',
    //     date: '2020-06',
    //     wecharPicurl: 'https://manniu-test.oss-cn-shanghai.aliyuncs.com/agent/article/yguo19.png'
    //   });
    // }
    return Bridge.call('getParameterValue', '');
  },
  // 头部标题修改
  setToolBar(params) {
    console.log('调用原生端修改标题');
    Bridge.call('setToolBar', params);
  },
  // 海报代理人信息传参
  getUserInfo() {
    return Bridge.call('getUserInfo', '');
  },
  // 调用原生端下载
  saveImage(params) {
    console.log('调用原生端下载');
    Bridge.call('saveImage', params);
  },
  // 跳转app添加客户
  addCustomer(params) {
    console.log('调取添加客户页面');
    return Bridge.call('addCustomer', params);
  },
  // 跳转至通讯录赠送健康包
  bindingCustomer(params) {
    console.log('跳转至通讯录赠送健康包');
    return Bridge.call('bindingCustomer', params);
  },
  // 健康包点击赠送时先进行实名认证
  realNameAuthentication() {
    console.log('实名认证');
    return Bridge.call('realNameAuthentication');
  },
  // 健康包实名认证状态查询
  realNameStatus() {
    console.log('实名认证状态查询');
    return Bridge.call('realNameStatus');
  },
  // 健康包赠送成功
  cardSendSuccess(fun) {
    Bridge.register('refreshPage', () => {
      fun();
    });
  },

  // 健康包实名认证
  realNameAuthenticationSuccess(fun) {
    Bridge.register('refreshPage', () => {
      fun();
    });
  },
  // 获取代理人id
  getCreateId() {
    return Bridge.call('getCreateId', '');
  },
  // 判断ios、Android
  isAndroid_ios() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isAndroid) {
      return true;
    } else if (isiOS) {
      return false;
    }
  },
  // 调取跳转app登录页面
  jumpLogin() {
    return Bridge.call('jumpLogin');
  },

  /**
   * 处理软键盘问题
   * @param {function} openCallback
   * @param {function} closeCallback
   */
  handleKeyboard(openCallback, closeCallback) {
    const originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.addEventListener('resize', () => {
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const diff = originalHeight - resizeHeight;
      if (resizeHeight < originalHeight) {
        openCallback && openCallback(diff); // 软键盘弹起
      } else {
        closeCallback && closeCallback(); // 软键盘收起
      }
    });
  },
  // 安卓检测软键盘
  setNativeSoftListener(params) {
    if (this.isAndroid_ios()) {
      console.log('安卓软键盘检测');
      return Bridge.call('setNativeSoftListener', params);
    }
  },

  /**
   * 显示导航栏 (sync)
   *
   * @param {Boolean} boolean
   */
  isShowNavBar(boolean) {
    Bridge.call('isShowNavBar', boolean);
  },
  goToH5Page(params) {
    Bridge.call('goToH5Page', params);
  },
  /**
   * 资讯详情 刷新数据
   */
  onResume(fn) {
    Bridge.register('onResume', fn);
  },
  /**
   * 跳转 APP 页面 (async)
   *
   * @export
   * @param {string} serviceName  APP 服务名
   * @param {boolean} needReload  APP 回来是否刷新
   * @param {string} params       传递给具体页面的数据
   *  - interpretReport        报告解读
   *  - intelligentGuidance    智能导诊
   *  - healthCoffer           保险箱
   *  - appHome                首页
   *  - realNameAuth           实名认证页面
   *  - onlineService          在线客服
   *  - myCustomService        我的客服
   *  - myGold                 我的金币
   *  - couponDetails          优惠卷页面
   *  - orderPages             订单页面
   *  - toSafeBox              保险箱首页 ?
   *  - personInfo             个人信息页面
   *  - appSearch              通用搜索
   *  - fileReader             文件浏览
   *                            - 发票抬头 params："{\"fileType\":1, "url": ""}" 1:pdf
   *  - systemPermission       通用设置，系统权限页面
   *  - invoiceManage          发票页面
   *                            - 发票抬头 params："{\"invoiceType\":1}"
   *                            - 发票管理 params："{\"invoiceType\":0}"
   *  - messageInfo            资讯列表页面
   * @returns {promise}
   * cb @param {string} res
   */
  jumpAppPage(serviceName, needReload, params = '') {
    const data = { serviceName, needReload, params };
    return new Promise((resolve) => {
      Bridge.call('jumpAppPage', JSON.stringify(data), (res) => resolve(res));
    });
  },
  // 海报分享(需要的参数:picTitle,picDesc,eCodeUrl)
  sharePoster(params) {
    console.log(params);
    return Bridge.call('sharePoster', params);
  },
  // 监听原生页面退出后台
  onPause(fn) {
    Bridge.register('onPause', fn);
  },

  //   type：下载文件类型
  // 图片FILE_TYPE_PICTURE = 0
  // 视频FILE_TYPE_VIDEO = 1
  // 文件FILE_TYPE_FILE = 2

  // downloadUrl：下载地址
  downloadFiles(downloadFiles, fn) {
    console.log('downloadFiles', JSON.stringify(downloadFiles));
    Bridge.call('downloadFiles', JSON.stringify(downloadFiles), fn);
  },
  // 圈经营  分享新版本
  shareBCCircleV2(params) {
    console.log('调用原生端圈子分享', params);
    return new Promise((resovle, reject) => {
      Bridge.call('shareBCCircleV2', params, function (res) {
        resovle(res);
      });
    });
  },
  /**
   * 判断是否是微信环境
   * true
   * @export
   * @returns {boolean}
   */
  judgingIsWeChart() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.match(/MicroMessenger/i) && userAgent.match(/MicroMessenger/i)[0] === 'micromessenger';
  },
  /*
   * 分享到微信
   * platform: 微信好友 0; 朋友圈 1;
   * shareType: text = 0; image = 1; web = 2;open = 3; miniProgram = 4;
   * isShowDialog: 不显示 0; 显示 1;
   * showType: 全部 0; 微信朋友 1; 朋友圈 2; 全部带相册 3;
   */
  shareWeiXin(params) {
    console.log(params, '分享到微信');
    return Bridge.call('shareWeiXin', params);
  },
  /**
   *
   * 设置分享记录
   * @param {*} fn
   */
  setRightsShareRecords(fn) {
    Bridge.register('setRightsShareRecords', fn);
  },
  /*
   * 复制到剪切版
   *parm:{text:'}
   */
  copyToClipboard(params) {
    Bridge.call('copyToClipboard', params);
  },
  /* 获取app权限
  code_1001 相机
  code_1002 相册
  code_1003通讯录
  code_1004麦克风
  code_1005 定位
  */
  requestPermissions(params, fn) {
    return Bridge.call('requestPermissions', params, fn);
  }
};

Object.keys(appInterface).forEach((key) => (provider[key] = appInterface[key]));

export default provider;
