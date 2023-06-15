import { QUADRANT_SECOND, QUADRANT_FIRST, QUADRANT_THREE, QUADRANT_FOUR } from '@/constants/constants';

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
      let nowTime = new Date().getTime();
      timeInterval = nowTime - lastTime;
    }
    if (options.leading && (!lastTime || timeInterval >= delay)) {
      lastTime = new Date().getTime();
      fn.apply(th, args);
    }
  };
}

/**
 * 检测制定点在另一个点组成的坐标系中的位置
 * @param {Object} pos 指定点
 * @param {Object} reference 参照物
 * @return 1：第一象限；2：第二象限；3：第三象限；4：第四象限
 */
export function checkQuadrant(pos, reference) {
  if (reference.y - pos.y > 0) {
    if (reference.x - pos.x > 0) {
      return QUADRANT_SECOND;
    }
    return QUADRANT_FIRST;
  }
  if (reference.x - pos.x > 0) {
    return QUADRANT_THREE;
  }
  return QUADRANT_FOUR;
}

/**
 * !#zh 将 px 转换为 rem
 * @param {Number} px
 */
const DESIGN_DRAFT_WIDTH = 320;
export function px2Rem(px) {
  const number = Math.pow(10, 6);
  const val = (px / (DESIGN_DRAFT_WIDTH / 10)) * number;
  const rem = Math.round(val) / number + 'rem';
  return rem;
}

/**
 *
 * @param {Number} px 元素的某个属性的像素值，比如 height
 * @param {Boolean} isToRem 是否将 px 转换为 rem
 */
export function parsePx(px, isRem = false) {
  if (isRem) return px2Rem(px);
  return `${px}px`;
}
