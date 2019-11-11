/* global window */

export function openUrlInNewTab(url) {
  const tab = window.open(url, '_blank');
  return tab ? tab.focus() : null;
}

export function getWindowWidth() {
  return window.innerWidth || window.screen.width || document.documentElement.clientWidth
    || document.body.clientWidth;
}
