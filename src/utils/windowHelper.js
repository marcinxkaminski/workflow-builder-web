export function cannotOpenUrlInNewTabWarning(url) {
  console.warn(`Cannot open ${url} in the new tab.`);
}

export function openUrlInNewTab(url) {
  if (!url) { return cannotOpenUrlInNewTabWarning(url); }

  const tab = window.open(url, '_blank');
  return tab && tab.focus ? tab.focus() : cannotOpenUrlInNewTabWarning(url);
}

export function getWindowWidth() {
  return window.innerWidth;
}
