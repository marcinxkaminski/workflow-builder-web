/* global expect, describe, jest, window */
import { openUrlInNewTab, getWindowWidth } from './windowHelper';

describe('WINDOW HELPER', () => {
  it('doesn\'t open url in new tab when url is empty', async () => {
    const mockUrl = '';

    window.open = jest.fn();
    openUrlInNewTab(mockUrl);
    expect(window.open).not.toBeCalled();
  });

  it('opens url in new tab', async () => {
    const focusMock = jest.fn();
    window.open = jest.fn(() => ({ focus: focusMock }));
    const mockUrl = 'mock-url';

    openUrlInNewTab(mockUrl);
    expect(window.open).toBeCalledWith(mockUrl, '_blank');
    expect(focusMock).toBeCalledTimes(1);
  });

  it('gets window width', async () => {
    const mockWidth = 100;

    window.innerWidth = mockWidth;
    const res = getWindowWidth();
    expect(res).toEqual(mockWidth);
  });
});
