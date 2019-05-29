let docEl = document.documentElement;
let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
export const FontUtil = {
  setFontSize (size) {
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth > 640) clientWidth = 640;
    docEl.style.fontSize = 50 * (clientWidth / 360) + 'px';
    window.base = 50 * (clientWidth / 360);
  },
  init () {
    let _this = this;
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, _this.setFontSize, false);
    document.addEventListener('DOMContentLoaded', _this.setFontSize, false);
  }
};
