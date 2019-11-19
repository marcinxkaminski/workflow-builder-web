/* global window */

export function openUrlInNewTab(url) {
  if (!url) { return; }

  window.open(url, '_blank').focus();
}

export function getWindowWidth() {
  return window.innerWidth;
}
