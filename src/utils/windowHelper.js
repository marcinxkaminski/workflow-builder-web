export function openUrlInNewTab(url) {
  window.open(url, '_blank');
}

export function getWindowWidth() {
  return window.innerWidth || window.screen.width || document.documentElement.clientWidth
    || document.body.clientWidth;
}
