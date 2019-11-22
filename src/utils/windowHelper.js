/* global window */

export function cannotOpenUrlInNewTabWarning(url) {
  console.warn(`Cannot open ${url} in the new tab.`);
}

export function openUrlInNewTab(url) {
  if (!url) { return cannotOpenUrlInNewTabWarning(url); }

  const tab = window.open(url, '_blank');
  if (tab && tab.focus) { tab.focus(); } else { return cannotOpenUrlInNewTabWarning(url); }
}

export function getWindowWidth() {
  return window.innerWidth;
}
