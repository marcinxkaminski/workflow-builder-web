import { openUrlInNewTab, getWindowWidth, cannotOpenUrlInNewTabWarning } from './windowHelper';

describe('WINDOW HELPER', () => {
  it('warns that url cannot be opened in the new tab', async () => {
    const mockUrl = 'mockUrl';
    console.warn = jest.fn();

    cannotOpenUrlInNewTabWarning(mockUrl);
    expect(console.warn).toHaveBeenCalledWith(`Cannot open ${mockUrl} in the new tab.`);
  });

  it('doesn\'t open url in new tab when url is empty', async () => {
    const mockUrl = '';

    console.warn = jest.fn();
    window.open = jest.fn();

    openUrlInNewTab(mockUrl);
    expect(window.open).not.toBeCalled();
    expect(console.warn).toHaveBeenCalledWith(`Cannot open ${mockUrl} in the new tab.`);
  });

  it('doesn\'t open url in new tab when window.open returns nothing', async () => {
    const mockUrl = 'someUrl';

    window.open = jest.fn();
    console.warn = jest.fn();
    openUrlInNewTab(mockUrl);

    expect(window.open).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(`Cannot open ${mockUrl} in the new tab.`);
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
