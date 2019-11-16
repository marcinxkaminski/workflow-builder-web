/* global window */

export function openUrlInNewTab(url) {
  const tab = window.open(url, '_blank');
  return tab.focus();
}

export function getWindowWidth() {
  return window.innerWidth;
}
