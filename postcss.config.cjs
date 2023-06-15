module.exports = {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        viewportWidth: 750, // 视口的宽度，对应的时设计稿的宽度/2，一般为750
        viewportHeight: 1334, // 视口的高度，对应的是设计稿的高度（也可以不配置）
        unitPrecision: 3, // 指定‘px’转换为视口单位值的小数位数（很多时候无法整除）
        viewportUnit: 'vw', // 指定需要转换成的视口单位，建议使用vw
        selectorBlankList: ['ignore', 'tab-bar'],
        minPixelValue: 1,
        mediaQuery: false,
        exclude:[/Tabbar/]
      }
    }
  };
  