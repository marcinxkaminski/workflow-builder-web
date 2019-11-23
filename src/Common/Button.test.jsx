
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import Button, * as btn from './Button';

describe('BUTTON', () => {
  let container = null;

  const renderButton = ({
    onClick = null,
    disabled = null,
    loading = null,
    icon = null,
    shadow = null,
    customClasses = null,
  }) => {
    act(() => {
      render(<Button {...{
        onClick, disabled, loading, icon, shadow, customClasses,
      }}
      />, container);
    });

    return container.querySelector('button');
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders default button without any props', async () => {
    const button = renderButton({});
    expect(button.className).toEqual(btn.DEFAULT_CLASSES);

    const icon = button.querySelector('i');
    expect(icon.innerHTML).toEqual(btn.DEFAULT_ICON);
  });

  it('renders button with custom icon', async () => {
    const mockIcon = 'settings';

    const icon = renderButton({ icon: mockIcon }).querySelector('i');
    expect(icon.innerHTML).toEqual(mockIcon);
  });

  it('renders button with loader', async () => {
    const loaderDiv = renderButton({ loading: true }).querySelector('div');
    expect(loaderDiv.className).toEqual('loader spinner-border');

    const loaderSpan = loaderDiv.querySelector('span');
    expect(loaderSpan.className).toEqual('sr-only');
    expect(loaderSpan.innerHTML).toEqual(btn.LOADING_TEXT);
  });

  it('renders button with shadow', async () => {
    const buttonClasses = renderButton({ shadow: true }).className;
    expect(buttonClasses).toEqual(`${btn.DEFAULT_CLASSES} shadow`);
  });

  it('renders button with custom-class', async () => {
    const customClassMock = 'custom-class';
    const buttonClasses = renderButton({ customClasses: customClassMock }).className;
    expect(buttonClasses).toEqual(`${btn.DEFAULT_CLASSES} ${customClassMock}`);
  });

  it('renders button with shadow and custom class', async () => {
    const customClassMock = 'custom-class';
    const buttonClasses = renderButton({ customClasses: customClassMock, shadow: true }).className;
    expect(buttonClasses).toEqual(`${btn.DEFAULT_CLASSES} shadow ${customClassMock}`);
  });

  it('renders disabled button', async () => {
    const button = renderButton({ disabled: true });
    expect(button.disabled).toBe(true);
  });

  it('renders button with default params and handles on click action', async () => {
    const onClickMocked = jest.fn();

    const button = renderButton({ onClick: onClickMocked });
    button.click();

    expect(onClickMocked).toHaveBeenCalledTimes(1);
  });
});
