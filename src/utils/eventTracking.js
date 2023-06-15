/* 埋点h5测试环境配置
Account ID:a7472e10c5947d33
Datasource ID：b5734681f66794e8
host:https://gio-data-test.manniuhealth.com/
 */
/* eslint-disable */

// !function(e,t,n,g,i){
//     let tag = null
//     let n = ''
//     e[i] = e[i] || function() {
//         (e[i].q = e[i].q||[]).push(arguments)
//     },
//     n = t.createElement("script"),
//     tag = t.getElementsByTagName("script")[0],
//     n.async = 1,
//     n.src = g,
//     tag.parentNode.insertBefore(n,tag)
// } (window,document,"script","https://assets.giocdn.com/cdp/1.0/gio.js","gdp");
// //custom page code begin here
// var accountId = 'a7472e10c5947d33'
// var datasourceId = 'b5734681f66794e8'
// gdp('init',accountId,datasourceId,{debug: true,host:'gio-data-test.manniuhealth.com'});
// //custom page code end here
// gdp('send');

/*
 * 埋点h5测试环境配置
 * Account ID:a7472e10c5947d33
 * Datasource ID：b5734681f66794e8
 * host:https://gio-data-test.manniuhealth.com
 * 埋点h5生产环境配置
 * Account ID:bfc5d6a3693a110d
 * Datasource ID：9c343572072b840a
 * host:https://gio-data.manniuhealth.com
 **/
// import md5 from 'blueimp-md5';
// import appInterface from '@/utils/appInterface';
// // 获取 APP 用户 ID
// let createId = null;
// try {
//   const userInfo = JSON.parse(appInterface.getUserInfo());
//   createId = userInfo.createId;
// } catch (error) {
//   console.log('解析 createId 错误');
// }
// const encryptCreateId = md5(createId);

// /* eslint-disable */
// !(function(e, t, n, g, i) {
//   let tag = null;
//   (e[i] =
//     e[i] ||
//     function() {
//       (e[i].q = e[i].q || []).push(arguments);
//     }),
//     (n = t.createElement('script')),
//     (tag = t.getElementsByTagName('script')[0]),
//     (n.async = 1),
//     (n.src = g),
//     tag.parentNode.insertBefore(n, tag);
// })(window, document, 'script', 'https://assets.giocdn.com/cdp/1.0/gio.js', 'gdp');
// //custom page code begin here
// var accountId = process.env.NODE_ENV == 'production' ? 'bfc5d6a3693a110d' : 'a7472e10c5947d33';
// var datasourceId = process.env.NODE_ENV == 'production' ? '9c343572072b840a' : 'b5734681f66794e8';
// var host = process.env.NODE_ENV == 'production' ? 'gio-data.manniuhealth.com' : 'gio-data-test.manniuhealth.com';
// gdp('init', accountId, datasourceId, { debug: false, host: host });
// createId && gdp('setUserId', encryptCreateId);
// //custom page code end here
// gdp('send');

// 前端埋点
export function gdpSend(key, data) {
  console.log(key, data, '埋点');
  const gdp = window.gio || window.gdp;
  gdp && gdp('track', key, data);
}
