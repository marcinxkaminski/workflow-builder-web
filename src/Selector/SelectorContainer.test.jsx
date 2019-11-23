
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAvailableWorkflowElements, addWorkflowElement } from './selectorActions';
import SelectorCarousel from './SelectorCarousel';
import { getWindowWidth } from '../utils/windowHelper';
import { SelectorContainer, getVisibleItemsCount } from './SelectorContainer';

jest.mock('../utils/windowHelper', () => ({ getWindowWidth: jest.fn() }));
jest.mock('./SelectorCarousel', () => jest.fn((props) => (<div className="Selector-Carousel" />)));
jest.mock('./selectorActions', () => ({
  getAvailableWorkflowElements: jest.fn(),
  addWorkflowElement: jest.fn(),
}));

describe('SELECTOR CONTAINER', () => {
  let container = null;

  const renderContainer = () => {
    act(() => {
      render(
        <SelectorContainer {...{
          availableWorkflowElements: [],
          addWorkflowElement,
          getAvailableWorkflowElements,
        }}
        />, container,
      );
    });
    return container.querySelector('div');
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

  it('renders carousel', async () => {
    renderContainer();
    expect(!!container.querySelector('.Selector-Carousel')).toBe(true);
  });

  it('should set items count to 1 if window is equal or smaller than 768px, otherwise 3', async () => {
    getWindowWidth
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(768)
      .mockReturnValueOnce(900);

    expect(getVisibleItemsCount()).toEqual(1);

    expect(getVisibleItemsCount()).toEqual(1);

    expect(getVisibleItemsCount()).toEqual(3);
  });
});
