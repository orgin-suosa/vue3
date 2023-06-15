/** *****************************************************
 * 设置sessionStorage缓存
 * @param  {String}        key   缓存对象key
 * @param  {String/Object} value 缓存对象value
 * @return {Boolean}             是否保存成功 true/false
 *******************************************************/
export const setSStorage = function(key, value) {
  if (arguments.length !== 2) return false;
  let v = value;
  if (typeof v === 'object') {
    v = JSON.stringify(v);
    v = 'ri-obj-' + v;
  } else {
    v = 'ri-str-' + v;
  }
  const ss = sessionStorage;
  if (ss) {
    ss.setItem(key, v);
  } else {
    return false;
  }
  return true;
};

/** *******************************************
 * 获取sessionStorage缓存
 * @param  {String}        key   缓存对象key
 * @return {String/Object}       缓存对象value
 *********************************************/
export const getSStorage = function(key) {
  const ss = sessionStorage;
  if (ss) {
    let v = ss.getItem(key);
    if (!v) {
      return false;
    }
    if (v.indexOf('ri-obj-') === 0) {
      v = v.slice(7);
      return JSON.parse(v);
    } else if (v.indexOf('ri-str-') === 0) {
      return v.slice(7);
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/** *****************************************
 * 删除sessionStorage缓存
 * @param  {String} key  缓存对象key
 * @return {Boolean}     是否删除成功 true/false
 *******************************************/
export const removeSStorage = function(key) {
  const ss = sessionStorage;
  if (ss && key) {
    ss.removeItem(key);
    return true;
  } else {
    return false;
  }
};

/** *************************************
 * 清理sessionStorage缓存
 * @return {Boolean} 是否清理成功 true/false
 ***************************************/
export const clearSStorage = function() {
  const ss = sessionStorage;
  if (ss) {
    ss.clear();
    return true;
  } else {
    return false;
  }
};

/** *****************************************************
 * 设置localStorage缓存
 * @param  {String}        key   缓存对象key
 * @param  {String/Object} value 缓存对象value
 * @return {Boolean}             是否保存成功 true/false
 *******************************************************/
export const setLStorage = function(key, value) {
  if (arguments.length !== 2) return false;
  let v = value;
  if (typeof v === 'object') {
    v = JSON.stringify(v);
    v = 'ri-obj-' + v;
  } else {
    v = 'ri-str-' + v;
  }
  const ls = localStorage;
  if (ls) {
    ls.setItem(key, v);
  } else {
    return false;
  }
  return true;
};

/** *******************************************
 * 获取localStorage缓存
 * @param  {String}        key   缓存对象key
 * @return {String/Object}       缓存对象value
 *********************************************/
export const getLStorage = function(key) {
  const ls = localStorage;
  if (ls) {
    let v = ls.getItem(key);
    if (!v) {
      return false;
    }
    if (v.indexOf('ri-obj-') === 0) {
      v = v.slice(7);
      return JSON.parse(v);
    } else if (v.indexOf('ri-str-') === 0) {
      return v.slice(7);
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/** *****************************************
 * 删除localStorage缓存
 * @param  {String} key  缓存对象key
 * @return {Boolean}     是否删除成功 true/false
 *******************************************/
export const removeLStorage = function(key) {
  const ls = localStorage;
  if (ls && key) {
    ls.removeItem(key);
    return true;
  } else {
    return false;
  }
};

/** *************************************
 * 清理localStorage缓存
 * @return {Boolean} 是否清理成功 true/false
 ***************************************/
export const clearLStorage = function() {
  const ls = localStorage;
  if (ls) {
    ls.clear();
    return true;
  } else {
    return false;
  }
};

/**
 * 复制到剪切板
 * @param {*} txt
 */
export function copeTxt(txt) {
  try {
    const transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = txt; // 这里表示想要复制的内容
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    transfer.blur();
    document.body.removeChild(transfer);
    document.execCommand('');
    return true;
  } catch {
    return false;
  }
}

/**
 * 判断H5环境
 */
export function getEnv() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('micromessenger') !== -1) {
    return 'wx';
  } else {
    return 'other';
  }
}
/**
 * 比较版本号
 *
 * @export
 * @param {string} version1
 * @param {string} version2
 * @returns {number} | -1 | 0 | -1 |
 */
export function compareVersion(version1, version2) {
  const v1 = getVersionNumber(version1);
  const v2 = getVersionNumber(version2);
  const max = Math.max(v1.length, v2.length);
  let i = 0;
  while (i < max) {
    if (v1[i] > v2[i]) {
      return 1;
    } else if (v1[i] < v2[i]) {
      return -1;
    }
    i++;
  }
  return 0;
}

/**
 * 将版本号字符串拆分为数组
 *
 * @param {string} version 1.0.0
 * @returns {Array} [1, 0, 0]
 */
export function getVersionNumber(version) {
  if (!version || !isString(version)) return [];
  return version.split('.').map((n) => Number(n));
}

/**
 * 是否是字符串
 *
 * @param {string} s
 * @returns {boolean}
 */
function isString(s) {
  return typeof s === 'string';
}

/**
 * 根据 userAgent、key 获取版本号
 *
 * @export
 * @param {string} key 关键字
 * @returns {string} 1.0.0
 */
export function getNativeVersion(key) {
  const map = { agent: 'manniuagentapp', client: 'manniuhealthapp' };
  const match = window.navigator.userAgent.match(new RegExp(map[key] + '/([0-9]+).([0-9]+).([0-9]+)'));
  return (match && match.slice(1).join('.')) || '';
}

/**
  埋点调用方法
*/
export function gdpSend(key, data) {
  const gdp = window.gio || window.gdp;
  gdp && gdp('track', key, data);
}

/**
 * @func (Function): 要防抖动的函数。
 * @delay (number): 需要延迟的毫秒数。
 * @options (Object): 选项对象。
 *[options.leading=false] (boolean): 指定在延迟开始前调用。
 *[options.trailing=true] (boolean): 指定在延迟结束后调用。
 *
 */
let timer;
let lastTime;
export function debounce(fn, delay = 0, options = { leading: true, trailing: false }) {
  return (...args) => {
    const th = this;
    let timeInterval = 0;
    if (timer) {
      clearTimeout(timer);
    }
    if (options.trailing) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(th, args);
      }, delay);
      return;
    }

    if (lastTime) {
      const nowTime = new Date().getTime();
      timeInterval = nowTime - lastTime;
    }
    if (options.leading && (!lastTime || timeInterval >= delay)) {
      lastTime = new Date().getTime();
      fn.apply(th, args);
    }
  };
}

/**
  对字符串进行加密
*/
export function compileStr(code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
}

/**
  对字符串进行解密
*/
export function uncompileStr(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}
